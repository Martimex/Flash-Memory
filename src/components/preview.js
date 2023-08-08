import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/preview.module.css';
import * as Animation from 'animejs';
import Router from "next/router";

import { LevelInfo } from './level_info.js';
import { SerieBox } from './serie_box.js';
import UserTab from './user_tab.js';

import { faUserCircle as user, faChevronCircleLeft as home} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// We need to make sure it is a non-mutable value. We are going to use it for TopBar showUp animation, and we have to have reference 100% value
let topBarHeight;

function Preview( props ) {
    // DEFINE GLOBAL ASSIGNMENT THAT WILL INDICATE WE WANT TO USE LEGACY anime({}) call exactly as it used to be
    const anime = Animation.default;

    const [[levelChoose, lv_index, serie_abbr, serie_name, serie_desc], setLevelChoose] = useState([null, null, null, null, null]);
    const [chosenSerie, setChosenSerie] = useState(null);
    const [chosenSerieName, setChosenSerieName] = useState(null);
    const [isUserTabOpen, setUserTabOpen] = useState(null);
    const [isAnimationRunning, setAnimationRunning] = useState(true);

    const currSerie = useRef(null);
    const topBarRef = useRef(null);

    const levels_showcase = props.data.map((serie, index) => 
        <SerieBox serie={serie} setSerieName={setChosenSerie} setLevelChoose={setLevelChoose} isAnimationRunning={isAnimationRunning} key={serie.index.toString() + serie.name} />
    ) 

    useEffect(() => {
        if(levelChoose !== null) {
            document.body.style.overflow = 'hidden';
        } else if(!levelChoose) {
            //
        }

    }, [levelChoose]);

    useEffect(() => {
        async function fade() {
            await animate()
                .then(() => setChosenSerieName(chosenSerie))
        }
        
        async function animate() {
            const a1 = anime({
                targets: `.${styles['title-name']}`,
                duration: 500,
                opacity: [1, 0],
                easing: 'linear',
            }).finished;

            await Promise.all([a1]);
        }

        fade();

    }, [chosenSerie])

    useEffect(() => {
        anime({
            targets: `.${styles['title-name']}`,
            duration: 500,
            opacity: [0, 1],
            easing: 'linear',
        })
    }, [chosenSerieName])

    useEffect(() => {
        window.addEventListener('scroll', checkStickyBar); 

        return () => {
            window.removeEventListener('scroll', checkStickyBar);
        }
    });

    function checkStickyBar() {
        if(!topBarRef.current) {return;} // Solves weird bug when using "home button", which later indicates that topBarRef.current.classList is not defined
        const isSticky_before = topBarRef.current.classList.contains(styles['sticky']);
        topBarRef.current.classList.toggle(styles['sticky'], window.scrollY > 0);
        const isSticky_after = topBarRef.current.classList.contains(styles['sticky']);

        if(isSticky_before !== isSticky_after) {
            if(isSticky_after === true) {
                // Enter sticky mode
                anime({
                    targets: topBarRef.current,
                    duration: 500,
                    backgroundColor: ['#2223', '#222f'],
                    easing: 'linear',
                })
            }

            else {
                // Close sticky mode
                anime({
                    targets: topBarRef.current,
                    duration: 500,
                    backgroundColor: ['#222f', '#2223'],
                    easing: 'linear',
                })
            }
        }
    }

    async function asyncTopBarReturn() {
        const topBar = document.querySelector(`.${styles['top-bar']}`);
        topBar.style.height = `${topBarHeight}px`;
        await anime({
            targets: topBar,
            // We need to keep this animation for around 500 ms to prevent from possible bug when user exits UserTab and immediately starts clicking a level square (w/ colorful borders)
            opacity: {value: 1, duration: 500, easing: 'easeInCubic'}, 
        }).finished;
        setAnimationRunning(false); 
    } 

    useEffect(() => {
        if(isUserTabOpen === false) {
            asyncTopBarReturn();
        }
    }, [isUserTabOpen]);

    useEffect(() => {
        showUpAnimation();
    }, [])

    async function showUpAnimation() {
        await anime({
            targets: 'body',
            duration: 400,
            opacity: [0, 1],
            easing: 'linear',
        }).finished;
        setAnimationRunning(false);
    }

    async function animateTransition() {
        const topBar = document.querySelector(`.${styles['top-bar']}`);
        topBarHeight = (topBarHeight)? topBarHeight : topBar.offsetHeight; // Prevents from a bug that a bar grows 2px every animation cycle
        await anime({
            targets: topBar,
            height: {value: 0, duration: 400, easing: 'easeOutCubic'},
            opacity: {value: 0, duration: 300, easing: 'easeOutCubic'},
        }).finished;
        setAnimationRunning(true);
        setUserTabOpen(true);
    }

    async function animateReturn() {
        await anime({
            targets: 'body',
            duration: 400,
            opacity: [1, 0],
            easing: 'linear',
        }).finished;

        Router.push('/');
    }

    return (
        <div className={styles['bg-main']}>
            <div className={styles['seizure-flexbox']}>
                <div className={styles['top-bar']} ref={topBarRef}>
                    <div className={styles['top-bar__return']}>
                        <div className={styles['return-back']} onClick={() => {setAnimationRunning(true); animateReturn(); }}> 
                            <FontAwesomeIcon icon={home} className={styles["icon-home"]} />
                        </div>
                    </div>

                    <div className={styles['top-bar__title']}>
                        <div className={styles['title-name']} ref={currSerie}> {chosenSerieName ? chosenSerieName : `Choose a serie` } </div>
                    </div>

                    <div className={styles['top-bar__follow']}>
                        <div className={styles['follow-me']} onClick={() => {setAnimationRunning(true); animateTransition();}}>
                            <FontAwesomeIcon icon={user} className={styles["icon-user"]} />
                        </div>    
                    </div>

                </div>

                <div className={styles['showcase-block']}>
                    {levels_showcase}
                </div>


            </div>

            { isUserTabOpen && (
                <UserTab includeUserStats={true} player={props.player} levelsCount={props.levelsCount} setUserTabOpen={setUserTabOpen} setAnimationRunning={setAnimationRunning} isAnimationRunning={isAnimationRunning} />
            )}   

            { (levelChoose && !isAnimationRunning) && (
                <LevelInfo serie_name={serie_name} serie_abbr={serie_abbr} serie_desc={serie_desc} level_details={levelChoose} lv_index={lv_index} closeLevelInfo={setLevelChoose} 
                    changeComponent={props.changeComponent} user_progresses={props.user_progresses} playerId={props.player.id} playerName={props.player.name}
                    setLevelData={props.setLevelData} setLevelProgressRecord={props.setLevelProgressRecord} setGameCounters={props.setGameCounters} 
                    serieInfo={props.data.find((lv) => chosenSerieName === lv.name)}
                />
            )}
        </div>
        
    )

}

export default Preview;