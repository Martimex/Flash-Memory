import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Router from "next/router";
import styles from '../src/styles/landing.module.css';
import styles_preview from '../src/styles/preview.module.css';
import * as Animation from "animejs";
import ConsentBox from '../src/components/consent_box';
import { tileCodes } from '../src/vars.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as user} from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { useSession, signIn, signOut } from "next-auth/react";

import UserTab from '../src/components/user_tab';


library.add(fab, fas, far);

const usedIcons = [];
const randomizedIcons = [];

const icon_Sets = {
    fas: Object.keys(library.definitions.fas),
    fab: Object.keys(library.definitions.fab), // not working for some reason
    far: Object.keys(library.definitions.far),
}

function getRandomIcons(iconSet, usedIcons, randomizedIcons) {
    let iconSetCopy = [...iconSet]; // Create a copy of fasArray; direct assigning (fasArrayCopy = fasArray) would affect fasArray too!
    for(let i=0; i<(tileCodes.length/2); i++) {
        let random = Math.floor(Math.random() * iconSetCopy.length);
        usedIcons.push(iconSetCopy[random]);
        iconSetCopy.splice(random, 1);
    }
    let duplicate = usedIcons;
    usedIcons.push(...duplicate);

    const usedIconsCopy = [...usedIcons]; // Same here - creating a copy; do not assign values directly(it works for original ref only) !!

    for(let j=0; j<usedIconsCopy.length; j++) {
        randomizedIcons.push(setIcon(usedIcons));
    }
}

function setIcon(usedIcons) {
    let index = Math.floor(Math.random() * usedIcons.length);
    let chosenIcon = usedIcons[index];
    usedIcons.splice(index, 1);
    return chosenIcon;
}

function getBaseColor() {
    return Math.floor(Math.random() * baseColors.length) + 1; // returns 1 to 5
}

const baseColors = [ 'color-1', 'color-2', 'color-3', 'color-4', 'color-5'];

// We need to declare this variable outside of function component, to prevent it from being re-rendered and causing SVG path mismatch between SSR and CSR
let allIcons;

// We are going to store user data just for UserTab (Landing Page one) to display specific data properly
let loggedPlayer = {};

function Landing(props) {
    // DEFINE GLOBAL ASSIGNMENT THAT WILL INDICATE WE WANT TO USE LEGACY anime({}) call exactly as it used to be
    const anime = Animation.default;

    const { data, status } = useSession();

    // We use this hook to apply icon coloring animation (see useLayoutEffect below)
    const [isUserTabOpen, setUserTabOpen] = useState(false);
    const [isAnimationRunning, setAnimationRunning] = useState(false);
    const [isConsentAccepted, setConsentAccepted] = useState(false);

    useEffect(() => {
        // This useEffect happens only once - that is mandatory here !s
        getRandomIcons(icon_Sets[`fas`], usedIcons, randomizedIcons);
        allIcons = Array.from(new Array(16)).map((elem, index) => {
            return ( 
                <div key={'moverow_' + index.toString()} className={styles['move-box__row']}>
                    <div className={styles['move-box__trigger']}>
                        {Array.from(new Array(20)).map((el, ind) => {
                            return (
                                <FontAwesomeIcon  key={'move_' + ind.toString()} icon={randomizedIcons[Math.floor(Math.random() * randomizedIcons.length)]} className={`${styles_preview["icon-user"]} ${styles["fancy-icon"]} ${styles[`fancy-color-${getBaseColor()}`]}`} />
                            )
                        })}
                    </div>
                </div>
            )
        })
    }, []);

    useLayoutEffect(() => {
        fadeAnimation();
    }, []);

    function fadeAnimation() {
        anime({
            targets: 'body',
            duration: 800,
            opacity: [0, 1],
            easing: 'linear',
        }) 
    }

    function checkConsentStauts() {
        // Here we have to check if user accepted the Terms and Conditions (only for users that has not been registered yet)
        if(status === 'authenticated') { return true; /* User has agreed with the TaC */ }
        else return isConsentAccepted;
    }

    async function checkUserSession() {
        if(status === 'authenticated') {
            const screen = document.querySelector(`.${styles['landing-all']}`);
            await anime({
                targets: screen,
                duration: 500,
                opacity: 0,
                easing: 'linear',
            }).finished;
            Router.push("/play");
        } else {
            // Not authenticated yet, need to sign in with Google
            signIn('google');
        }
    }

    async function getUserData() {
        // We need to fetch it all the time user requests for it, as EXP field may change when user wins a level and goes back for landing page
        // to check UserTab Component back again
        const loggedUser = await fetch(`api/user/${data.user.email}`, {
            method: 'GET',
            headers: { 'Content-Type' : 'application/json' },
        })
            .then((res) => res.body)
            .then(rb => {
                const reader = rb.getReader();

                return new ReadableStream({
                    start(controller) {

                        function push() {
                            reader.read().then(({ done, value }) => {
                                if(done)  {
                                    controller.close();
                                    return;
                                }

                                controller.enqueue(value);
                                push();
                            })
                        }

                        push();
                    },
                });
            })
            .then(stream => new Response(stream, { headers: { "Content-Type": "text/html" } }).text())
            .then((result) => JSON.parse(result) );
        
        loggedPlayer = {
            name: loggedUser.name,
            image: loggedUser.image,
            exp: loggedUser.exp,
            registeredAt: loggedUser.registeredAt,
        }

        setUserTabOpen(true);
    }

    if(status === 'loading') { return <h1> Loading, please wait ... </h1>}

    return( 
        <div className={styles['landing-all']} style={{overflow: 'hidden'}}>
            <div className={styles['icons-main']}>
                <div className={styles['content']}>
                    <div className={styles['content-section']}>
                        <div className={styles["game-title"]}>FLASH</div>
                    </div>
                    <div className={styles['content-action']}>
                        <div className={styles['from-author']}>
                            <div className={styles['from-author-section']}> {status === 'authenticated'?  <span> Welcome back again, {data.user.name} </span> : <span> The hardest memory game you will ever play... </span>} </div>
                            <div className={styles['from-author-section']}> {status === 'authenticated'?  <span> Check out the recent updates <a className={styles['redirect-link']} target="_blank" href="https://github.com/Martimex/memory-game"> here </a> </span> : <ConsentBox setConsentAccepted={setConsentAccepted} isConsentAccepted={isConsentAccepted} />} </div>
                        </div>
                        <button className={`${styles['start']} ${checkConsentStauts()? styles['start-active'] : styles['start-inactive']} `} onClick={() => {checkConsentStauts() && checkUserSession()}}> Play </button>
                    </div>
                </div>    
                <div className={styles['move-box']}>
                    {allIcons}
                </div>
            </div>

            {status === 'authenticated' && (
                <div className={`${styles['setup-container']}`} onClick={() => { getUserData(); }}>
                    <div className={styles_preview['follow-me']} >
                        <FontAwesomeIcon icon={user} className={styles_preview["icon-user"]} />
                    </div>    
                </div>  
            )}

            {isUserTabOpen && <UserTab includeUserStats={false} setAnimationRunning={setAnimationRunning} setUserTabOpen={setUserTabOpen} player={loggedPlayer} />}
        </div>
        
    )
}

export default Landing;
export { getRandomIcons, setIcon, icon_Sets };