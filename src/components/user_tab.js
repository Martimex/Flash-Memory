import React, {useEffect} from "react";
import styles from '../styles/user_tab.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDotCircle as hide_circ, 
    faInfoCircle as info_circ, 
    faTimesCircle as logout_circ
    } from '@fortawesome/free-solid-svg-icons';
import PlayerStats from "./player_stats";
import * as Animation from 'animejs';
import { signOut } from "next-auth/react";
import { getPlayerLevel, getLevelProgress, getFrameColor } from "../global/predefined/exp_to_level";

function UserTab(props) {

    const anime = Animation.default;

    async function handleLogout() {
        props.setAnimationRunning(false);
        signOut({callbackUrl: '/'})
    }

    useEffect(() => {
        const getImageBox = document.querySelector(`.${styles["user-info__image-box"]}`);
        if(getImageBox) {
            getImageBox.src = "https://lh3.googleusercontent.com/a/AGNmyxYdHxpTrqnk-muASXR1wLNGS1O5BwXD6UOoVWxW=s96-c";
        }
        fireUserTabAnimation('show');
    }, [])

    async function fireUserTabAnimation(animation_type) {
        if(animation_type !== 'hide' && animation_type !== 'show') { throw new Error("Invalid animation type value ! Type is neither 'hide' nor 'show'")}
        const userTabAll = document.querySelector(`.${styles['user-tab']}`);
        const userTabBox = document.querySelector(`.${styles['user-tab__box']}`);
        const [tabBox__profile, tabBox__buttons] = [document.querySelector(`.${styles['box__user-profile']}`), document.querySelector(`.${styles['box__action-buttons']}`)];
        const [profile_info, profile_stats] = [tabBox__profile.querySelector(`.${styles['box__user-info']}`), tabBox__profile.querySelector(`.${styles['box__user-stats']}`)];
        const userTabBoxHeight = window.getComputedStyle(userTabBox).getPropertyValue('height');
        
        document.querySelector(`.${styles['box__action-buttons']}`).style.pointerEvents = 'none';
        
        if(animation_type === 'show') { await animateUserTab(); await animateTabBox2(); props.setAnimationRunning(false); }
        else if(animation_type === 'hide') {await animateTabBox()}

        // After animations end, unblock click events for action buttons within UserTab
        const btnBox = document.querySelector(`.${styles['box__action-buttons']}`);
        if(btnBox) {btnBox.style.pointerEvents = 'auto';}

        async function animateUserTab() {
            await anime({
                targets: userTabAll,
                duration: 200,
                opacity: [0, 1],
                easing: 'easeOutSine',
            }).finished;
        }

        async function animateTabBox2() {
            const a1 = anime({
                targets: userTabBox,
                height: {value: ['0px', `${userTabBoxHeight}px`], duration: 300, easing: 'easeOutQuad'},
                opacity: {value: 1, duration: 300, easing: 'linear'},
            }).finished;

            const a2 = anime({
                targets: profile_info,
                opacity: {value: [0, 1], duration: 300, easing: 'linear'},
                translateY: {value: ['-20%', '0%'], duration: 300, easing: 'easeOutSine'},
            }).finished;

            const a3 = anime({
                targets: profile_stats,
                opacity: {value: [0, 1], duration: 300, easing: 'linear'},
                translateY: {value: ['20%', '0%'], duration: 300, easing: 'easeOutSine'},
            }).finished;

            const a4 = anime({
                targets: tabBox__buttons,
                opacity: {value: [0, 1], duration: 300, easing: 'linear'},
                translateX: {value: ['-20%', '0%'], duration: 300, easing: 'easeOutSine'},
            }).finished;

            const a5 = anime({
                targets: tabBox__profile,
                duration: 300,
                opacity: [0, 1],
                easing: 'easeOutSine',
            }).finished;

            await Promise.all([a1, a2, a3, a4, a5]);
        }

        async function animateTabBox() {
            const a1 = anime({
                targets: userTabBox,
                height: {value: [`${userTabBoxHeight}px`, '0px'], duration: 400, easing: 'easeInQuad'},
                opacity: {value: 0, duration: 400, easing: 'easeInSine'},
            }).finished;

            const a2 = anime({
                targets: [tabBox__profile, tabBox__buttons],
                duration: 400,
                opacity: 0,
                translateY: '-20%',
                easing: 'easeInSine',
            }).finished;

            await Promise.all([a1, a2]);
        }

    }

    async function handleUserTabHide() {
        props.setAnimationRunning(true);
        await fireUserTabAnimation('hide');
        props.setUserTabOpen(false)
    }

    return(
        <div className={styles['main-layer']} onClick={(e) => {(e.target.classList.contains(`${styles['main-layer']}`) && !props.isAnimationRunning) && handleUserTabHide()}}>
            <div className={styles['user-tab']}>
                <div className={styles['user-tab__box']}>
                    <div className={`${styles['box__user-profile']} ${(props.includeUserStats !== true && styles['user-profile--adjusted'])}`}>
                        <div className={`${styles['box__user-info']} ${(props.includeUserStats !== true && styles['user-info--adjusted'])}`}> 
                            <div className={`${styles['user-info__image-box']} ${styles[`image-box--${getFrameColor(props.player.exp)}`]}`}>
                                <img className={styles['image-box__image']} src={props.player.image} />
                            </div>
                            <div className={styles['user-info__data']}>
                                <p className={`${styles["data__text"]} ${styles["data__text--large"]}`}> {props.player.name} </p>
                                <p className={`${styles["data__text"]} ${styles["data__text--medium"]}`}> Level {getPlayerLevel(props.player.exp)} ({getLevelProgress(props.player.exp)}%) </p>
                                <p className={`${styles["data__text"]} ${styles["data__text--small"]}`}> Member since: {props.player.registeredAt.split('T')[0].split('-').reverse().join('/')} </p>
                            </div>
                        </div>
                        {props.includeUserStats === true && <PlayerStats levelsCount={props.levelsCount} />}
                    </div>

                    <div className={`${styles['box__action-buttons']} ${(props.includeUserStats !== true && styles['box__action-buttons--adjusted'])}`}>
                        <div className={styles['action-buttons__btn-item']}> 
                            <div className={styles['btn-item__icon']} onClick={() => { handleUserTabHide() }}>
                                <FontAwesomeIcon icon={hide_circ} className={`${styles["icon--btn"]} ${styles["icon-hide"]}`} />
                            </div>
                            <span className={styles['btn-item__text']}>Hide</span>
                        </div>
                        <div className={styles['action-buttons__item']}>
                            <div className={styles['btn-item__icon']}>
                                <a href="https://github.com/Martimex/memory-game" target="_blank">
                                    <FontAwesomeIcon icon={info_circ} className={`${styles["icon--btn"]} ${styles["icon-info"]}`} />
                                </a>
                            </div>
                            <span className={styles['btn-item__text']}>Info</span>
                        </div>
                        <div className={styles['action-buttons__item']}>
                            <div className={styles['btn-item__icon']} onClick={() => {handleLogout()}}>
                                <FontAwesomeIcon icon={logout_circ} className={`${styles["icon--btn"]} ${styles["icon-logout"]}`} />
                            </div>
                            <span className={styles['btn-item__text']}>Log out</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserTab;