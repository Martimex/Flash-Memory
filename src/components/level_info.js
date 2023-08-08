import styles from '../styles/level_info.module.css';
import { background_gradients } from '../global/exceptions/background_gradients.js';
import LevelDescription from "./level_description";
import React, { useState, useEffect, useRef } from 'react';
import { faStar as star_full, faPlus as icon_plus, faMinus as icon_minus, faPlay as play } from '@fortawesome/free-solid-svg-icons';
import { faStar as star_empty} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Animation from 'animejs';

// DEFINE GLOBAL ASSIGNMENT THAT WILL INDICATE WE WANT TO USE LEGACY anime({}) call exactly as it used to be
const anime = Animation.default;
let progressRecord = ''; // We will update this variable with initial useEffect call

function LevelInfo(props) {
    const [viewRepaint, setViewRepaint] = useState(false);
    const [isLevelDescOpened, setLevelDescOpened] = useState(false);
    const bg_placeholder_ref = useRef(null);
    const levelInfoAll_ref = useRef(null);
    const levelBox_ref = useRef(null);

    function checkCloseCondition(e) {
        if(e.target.classList.contains(`${styles['level-info-box']}`)) {
            closeLevelInfo();
        }
    }

    function closeLevelInfo() {
        async function init() {
            await animation()
            await props.closeLevelInfo([null, null]);
        }

        async function animation() {
            document.body.style.pointerEvents = 'none';
            await anime({
                targets: levelBox_ref.current,
                translateX: { value: '-=1.5%', duration: 150, easing: 'easeInSine' },
                opacity: {value: [1, .9], duration: 150, easing: 'easeInSine'},
            }).finished;
            const a1 = anime({
                targets: levelBox_ref.current,
                duration: 400,
                opacity: 0,
                easing: 'easeInSine',
            }).finished;

            const a2 = anime({
                targets: levelInfoAll_ref.current,
                duration: 400,
                opacity: [1, 0],
                easing: 'easeInSine',
            }).finished;

            await Promise.all([a1, a2]);
            document.body.style.pointerEvents = 'auto';
            document.body.style.overflowY = 'auto';
        }

        init();
    }

    function loadBackground_preview(url) {
        return new Promise((resolve, reject) => {
            const bg_image = new Image();
            bg_image.addEventListener('load', () => {
                resolve(bg_image);
            })
            bg_image.addEventListener('error', (err) => {reject(err)});

            bg_image.src = url;
        })

    }

    function applyDifficultyTextColors(difficulty) {
        const difficulty_Dynamic_Elems = document.querySelectorAll(`.${styles['dynamic-text']}`);
        for(let x=0; x< difficulty_Dynamic_Elems.length; x++) {
            const styles = getComputedStyle(difficulty_Dynamic_Elems[x]);
            const main_diff_col = styles.getPropertyValue(`--color_${difficulty}_main`);
            const sec_diff_col = styles.getPropertyValue(`--color_${difficulty}_sec`);
            difficulty_Dynamic_Elems[x].style.backgroundImage  = `-webkit-linear-gradient(135deg, ${main_diff_col}, ${sec_diff_col})`;
            difficulty_Dynamic_Elems[x].style.backgroundClip = `text`;
            difficulty_Dynamic_Elems[x].style.textShadow = `.15rem .15rem .2rem ${sec_diff_col}`;
        }

        // For play button border
        const play_btn = document.querySelector(`.${styles['play']}`);
        const play_btn_styles = getComputedStyle(play_btn);
        const border_col_2 = play_btn_styles.getPropertyValue(`--border-color_${difficulty}`);
        play_btn.style.borderColor = border_col_2;

        // For play button icon
        const play_icon = document.querySelector(`.${styles['icon-play']}`);
        const play_icon_styles = getComputedStyle(play_icon);
        const col = play_icon_styles.getPropertyValue(`--playIcon-color_${difficulty}`);
        play_icon.style.color = col;

    }

    function setLevelBoxPosition(newScreen) {
        const scrolled = window.scrollY;
        newScreen.style.top = `${scrolled}px`;
        levelBox_ref.current.style.opacity = 1; // That prevents form initial flickering (combined with CSS style for opacity: 0)
    }

    async function fadeScreenAnimation() {
        const screen = document.querySelector(`.${styles['level-info-blurred']}`); 
        const level_info_box = document.querySelector(`.${styles['level-info-box']}`);
        const a1 = anime({
            targets: screen,
            duration: 350,
            background: '#000',
            easing: 'linear',
        }).finished;
        const a2 = anime({
            targets: level_info_box,
            duration: 350,
            opacity: [1, 0],
            easing: 'linear',
        }).finished;
        await Promise.all([a1, a2]);
    }

    function blockClicking() {
        document.body.style.pointerEvents = 'none';
    }

    function getProgressRecord() {
        if(!props.user_progresses.length) return;
        return props.user_progresses.find((record, ind) => props.level_details.id === record.levelId)
    }

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        progressRecord = getProgressRecord();
        setViewRepaint(!viewRepaint);
        setLevelBoxPosition(levelInfoAll_ref.current);
        applyDifficultyTextColors(props.level_details.difficulty);
        const img_url = `bgs/${props.serie_abbr}/bg-${props.level_details.number}.svg`
        loadBackground_preview(img_url)
            .then(() => {
                bg_placeholder_ref.current.style.backgroundImage = `url(${img_url})`;
                anime({
                    targets: bg_placeholder_ref.current,
                    duration: 350,
                    opacity: [0, 1],
                    easing: 'linear',
                })

                // A tiny workaround for the levels 1 - 6 (The Flash serie), since they are based on linear-gradients rather than on SVG images
                if((props.serie_abbr === 'tf_1') && (parseInt(props.level_details.number) <= 6)) {
                    bg_placeholder_ref.current.style.backgroundImage = background_gradients[props.serie_abbr][props.level_details.number];
                    
                    anime({
                        targets: bg_placeholder_ref.current,
                        duration: 500,
                        opacity: [0, 1],
                        easing: 'linear',
                    })
                }
            })
            .catch((error) => {
                throw new Error(error);
            }) 
    }, [])

    async function handleLevelDesc() {
        if(isLevelDescOpened) {
            await asyncDescriptionShowUp(false);
            setLevelDescOpened(!isLevelDescOpened)
        }
        else {
            setLevelDescOpened(!isLevelDescOpened)
        }
    }

    useEffect(() => {
        if(isLevelDescOpened) {
            asyncDescriptionShowUp(true);
        }
    }, [isLevelDescOpened])

    async function asyncDescriptionShowUp(shouldBeShown) {
        // DONT FORGET TO BLOCK CLICK EVENTS
        document.body.style.pointerEvents = 'none';
        const description__box = document.querySelector(`.${styles['lv-description__box']}`);
        const description__text = document.querySelector(`.${styles['lv-description__text']}`);
        const box_content = document.querySelector(`.${styles['box__content']}`);
        const a1 = anime({
            targets: description__box,
            duration: shouldBeShown? 450 : 600,
            opacity: shouldBeShown? 1 : 0,
            easing: shouldBeShown? 'linear' : 'easeInQuad',
        }).finished;
        const a2 = anime({
            targets: box_content,
            duration: shouldBeShown? 600 : 450,
            opacity: shouldBeShown? 0 : 1,
            easing: shouldBeShown? 'easeInQuad' : 'linear',
        }).finished;
        const a3 = anime({
            targets: description__text,
            duration: shouldBeShown? 650 : 350,
            opacity: shouldBeShown? [0, 1] : 0,
            easing: shouldBeShown? 'linear' : 'linear',
        }).finished;
        await Promise.all([a1, a2, a3]);
        // AND TO UNBLOCK THEM AFTERWARDS
        document.body.style.pointerEvents = 'auto';
    }

    const startLevel = async function(e) {
        e.preventDefault();

        const user_id = props.playerId;
        const level_id = props.level_details.id;
        const level_difficulty = props.level_details.difficulty;
        try {
            // WE CAN ALSO FETCH A LEVEL FROM HERE
            const level = await fetch(`api/level/${level_id}`, {
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

            let sampleObj = {};

            for(let key in level) {
                if(level[key] instanceof Object && Boolean(level[key][key])) {
                    // Level specific settings (such as win conditions, animation times, limitation, tile sizings FALL HERE BELOW) :
                    sampleObj[key] = JSON.parse(level[key][key].replace(/'/ig, `"`).replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {  // convert String({} with own properties) to an array
                        return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
                    }))
                }
                else if(level[key] instanceof Number || String) {
                    // All the props that are used to identify the level from others
                    sampleObj[key] = level[key];
                }
            }

            if(Boolean(Object.keys(level).length === Object.keys(sampleObj).length) === false) {
                throw new Error(`Rewriting object properties left new object version with less than expected properties. Old version had ${Object.keys(level).length} properties, while new version has ${Object.keys(sampleObj).length} properties included.`);
            }

            const body = { user_id, level_id, level_difficulty };
            if(Boolean(props.user_progresses.find(el => el.levelId === props.level_details.id)) === false) {
                // Create new progress record ONLY IF the player have not played the level yet
                await fetch('api/progress', {
                    method: 'POST',
                    headers:  { 'Content-Type' : 'application/json' },
                    body: JSON.stringify(body)
                });
            }
            else { /* User already played the level, no need to duplicate records */ };

            const lv_progress = await fetch(`api/progress/${level_id}/${props.playerId}`, {
                method: 'GET',
                headers:  { 'Content-Type' : 'application/json' },
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
            
            const currentProgress = {
                id: lv_progress.id,
                stars: lv_progress.stars_got,
                lv_progress: lv_progress.lv_progress,
                highscore: lv_progress.highscore
            }

            const allGameCounters = {
                cardsOpened: [],
                spreeCount: 0,
                totalRemainingTime: [],
                totalRemainingTurns: [],
            }

            props.setLevelProgressRecord(currentProgress);
            props.setGameCounters(allGameCounters);

            // Push the level data as props and this way initialize the Game Component
            await fadeScreenAnimation();
            props.setLevelData(sampleObj);
        }
        catch(err) { throw new Error(err) }
    }

    return (
        <div className={styles["level-info-blurred"]} ref={levelInfoAll_ref} onClick={(e) => checkCloseCondition(e)} >
            <div className={styles["level-info-box"]} ref={levelBox_ref}>
                <div className={styles["box__background"]} ref={bg_placeholder_ref} >
                    <div className={styles['level-button-box']}>
                        <div className={styles['level-button-box__item']} onClick={() => handleLevelDesc()}>
                            <FontAwesomeIcon  icon={icon_plus} className={styles['icon-plus']}></FontAwesomeIcon>
                        </div>
                        <div className={styles['level-button-box__item']} onClick={() => closeLevelInfo()}>
                            <FontAwesomeIcon icon={icon_minus} className={styles['icon-minus']}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className={styles["box__content"]} >
                        <div className={styles["content__serie"]}>
                            <div className={styles["serie__title-box"]}>
                                <span className={styles["serie__title-box-text"]}> SERIE </span>
                            </div>
                            <div className={styles["serie__info-box"]}>
                                <div className={styles["serie__info-box__about"]}>
                                    <div className={styles["info-box__about-box"]}>
                                        <span className={styles["info-box__about-box-main"]}>{props.serie_name}</span>
                                    </div>
                                    <span className={styles["info-box__about-text"]}>Ref: {props.serie_abbr}</span>
                                    <span className={styles["info-box__about-text"]}>Levels: {props.serieInfo.Levels.length}</span>
                                </div>
                                <div className={styles["serie__info-box__desc"]}>
                                    <span className={styles["info-box__desc-text"]}>
                                        {props.serie_desc}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles["content__level"]}>
                            <div className={styles["level__title-box"]}>
                                <span className={`${styles["level__title-box-text"]} ${styles['dynamic-text']}`}> {props.level_details.name} </span>
                            </div>
                            <div className={styles["level__info-box"]}>
                                <div className={styles["level__info-box__about"]}>
                                    <span className={`${styles["info-box__about-text-2"]} ${styles['dynamic-text']}`}>ID: #{props.level_details.number}</span>
                                    <span className={`${styles["info-box__about-text-2"]} ${styles['dynamic-text']}`}>Author: {props.level_details.Created_By.name}</span>
                                    <span className={`${styles["info-box__about-text-2"]} ${styles['dynamic-text']}`}>Difficulty: {props.level_details.difficulty}</span>
                                    <span className={`${styles["info-box__about-text-2"]} ${styles['dynamic-text']}`}>Released: {props.level_details.createdAt.split('T')[0].split('-').reverse().join('/')}</span>
                                </div>
                                <div className={styles["level__info-box__play"]}>
                                    <form onSubmit={startLevel}>
                                        <button className={styles['play']} type="submit" value="Create" onClick={() => { blockClicking(); } } >
                                                <div className={styles['play-level']} > 
                                                    <FontAwesomeIcon icon={play} className={styles['icon-play']}> </FontAwesomeIcon>
                                                </div>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className={styles["content__progress"]}>
                            <div className={styles["progress__title-box"]}>
                                <span className={styles["progress__title-box-text"]}> PROGRESS </span>
                            </div>
                            <div className={styles["progress__info-box"]}>
                                <div className={styles["progress__info-box__about"]}>
                                    <div className={styles["info-box__about-box-2"]}>
                                        <span className={styles["info-box__about-box-2-main"]}> {props.playerName} </span>
                                    </div>
                                    <span className={styles["info-box__about-text"]}>Best run: {progressRecord? `${progressRecord.lv_progress}%` : `0%` } </span>
                                    <span className={styles["info-box__about-text"]}>Score: {progressRecord? progressRecord.highscore : 0}</span>
                                </div>
                                <div className={styles["progress__info-box__stats"]}>
                                    <div className={styles["info-box__stats-item"]}>
                                        <div className={styles["info-box__stats-item-bar"]}>
                                            {  progressRecord? 
                                                (Array.from(new Array(3)).map((el, ind) => {
                                                    return (progressRecord.stars_got > ind)?
                                                        <FontAwesomeIcon key={ind.toString()} icon={star_full} className={styles['icon-star_full']}></FontAwesomeIcon>
                                                        :
                                                        <FontAwesomeIcon key={ind.toString()} icon={star_empty} className={styles['icon-star_empty']}></FontAwesomeIcon> 
                                                }))
                                                :
                                                (Array.from(new Array(3)).map((el, ind) => {
                                                    return <FontAwesomeIcon key={ind.toString()} icon={star_empty} className={styles['icon-star_empty']}></FontAwesomeIcon>
                                                }))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isLevelDescOpened && (
                            <div className={styles["lv-description__box"]} >
                                <div className={styles["lv-description__text"]}>
                                    <p className={styles["lv-description__text-intro"]}> [#{props.level_details.number}] - {props.level_details.name} </p>
                                    <LevelDescription serie_abbr={props.serie_abbr} lv_id={props.level_details.number} />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={styles["bg-placeholder"]} >

            </div>
        </div>
    )
}

export { LevelInfo };