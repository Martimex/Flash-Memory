import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import * as Animation from "animejs";
import styles_confirm from '../styles/confirm.module.css';
import {level_end_messages} from '../global/predefined/level_end_messages.js';
import { faStar as star_empty} from '@fortawesome/free-regular-svg-icons';
import { faStar as star_full} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { equation } from '../global/predefined/stars_equation.js';
import { exp_for_difficulty } from '../global/predefined/exp_to_level';

const anime = Animation.default;

const static_classes = {  // Simply classes which are unaffected by game result (win / lost) ?
    bg: styles_confirm[`confirmation-bg`],
    box: styles_confirm[`confirm-box`],
    title: styles_confirm[`info-title`],
    info: styles_confirm[`confirm__info`],
    param: styles_confirm[`info-param`],
    param_name: styles_confirm[`param-name`],
    param_value: styles_confirm[`param-value`],
    highscore: styles_confirm[`info-highscore`],
    highscore_value: styles_confirm[`highscore-value`],
    star_box: styles_confirm[`info-stars`],
    star: styles_confirm[`icon-star`],
    star_empty: styles_confirm[`icon-star_empty`],
    star_full: styles_confirm[`icon-star_full`],
    action_container: styles_confirm[`action_container`],
    win_btn: styles_confirm[`win-btn`],
    lost_btn: styles_confirm[`lost-btn`],
}

function Confirm(props) {

    const [endMessage, setEndMessage] = useState(null);
    const [allStars, setAllStars] = useState(
        <FontAwesomeIcon icon={star_empty} className={`${static_classes['star']} ${static_classes[`star_empty`]}`}></FontAwesomeIcon>
    ); // we use this initial value as a placeholder - to hold space for dynamically rendered stars

    const table = useRef(null);
    const confBtn = useRef(null);
    const actionBox_ref = useRef(null);

    let sub;
    if(props.turns !== null) {
        sub = (props.score + (props.turns * props.msv));
    } else if(props.time !== null) {
        sub = (props.score + (props.time * props.tsv));
    }

    async function callEndAnimation() {
        if(props.value) {
            const stars_full_count = checkGottenStars(props.starConditions);
            makeStars(stars_full_count);
        }
        fireEndAnimation();
    }

    async function fadeScreen() {
        await anime({
            targets: `.${styles_confirm[`confirmation-bg`]}`,
            duration: 1000,
            opacity: [0, 1],
            easing: 'linear',
        }).finished;
    }

    function fireEndAnimation() {
        const valuesArr = [props.time, props.turns, [props.score]]; // props.score is within array because is the only numeric value (and we need to ensure each param is type of array)
        const allParamNames = document.querySelectorAll(`.${static_classes[`param_name`]}`);
        const allParamValues = document.querySelectorAll(`.${static_classes[`param_value`]}`)

        if(props.value) {

            // Win animation
            async function winAnimation() {
                await fadeScreen()
                await showTitle()
                for(let arr_ind=0; arr_ind<valuesArr.length; arr_ind++) {
                    await showParams(arr_ind)
                }
                await showHighscore()
                await removeParamValue(allParamValues)
                    .then(() => { document.querySelector(`.${static_classes['star_box']}`).style.opacity = 1; }) // condition: if(props.value)
                await showGottenStars()
                await showWinButton()
                    .then(() => {
                        document.querySelector(`.${static_classes['win_btn']}`).style.pointerEvents = 'auto';
                    })
            }

            async function showTitle() {
                const a1 = anime({
                    targets: `.${static_classes['title']}`,
                    duration: 1200,
                    translateX: ['-15%', '0%'],
                    opacity: [0, 1],
                    easing: 'linear',
                }).finished;
                await Promise.all([a1]);
            }

            async function showParams(index) {
                await showParamName(allParamNames[index])
                await showParamValue(allParamValues[index], valuesArr[index])
            }

            async function showParamName(el) {
                const a2 = anime({
                    targets: el,
                    duration: 500,
                    opacity: [0, 1],
                    translateX: ['-20%', '0%'],
                    easing: 'linear',
                }).finished;
                await Promise.all([a2]);
            }

            async function showParamValue(el, valueArr) {
                await fadeInParamValue(el)
                for(let x=0; x<valueArr.length; x++) {
                    await addParamsValue(el, valueArr[x]);
                }
            }

            async function fadeInParamValue(el) {
                const a3 = anime({
                    targets: el,
                    duration: 300,
                    opacity: [0, 1],
                    easing: 'linear',
                }).finished;
                await Promise.all([a3]);
            }

            async function addParamsValue(el, currValue) {
                const a4 = anime({
                    targets: el,
                    duration: 500,
                    delay: 300,
                    textContent: [el.textContent, `+=${currValue}`],
                    round: 1,
                    easing: 'linear',
                }).finished;
                await Promise.all([a4]);
            }

            async function showHighscore() {
                const a5 = anime({
                    targets: `.${static_classes['highscore']}`,
                    duration: 450,
                    opacity: [0, 1],
                    easing: 'easeInSine',
                }).finished;
                await Promise.all([a5]);
            }

            async function removeParamValue(el) {
                const duration_time = 1600;
                const delay_time = 600;
                let baseValue = 0;
                const totalRemainingTime = props.time.reduce((accumVariable, curValue) => accumVariable + curValue , baseValue);
                const totalRemainingTurns = props.turns.reduce((accumVariable, curValue) => accumVariable + curValue , baseValue);

                const a6 = anime({
                    targets: el,
                    duration: duration_time,
                    delay: delay_time,
                    textContent: 0,
                    round: 1,
                    easing: 'linear',
                }).finished;

                const a7 = anime({
                    targets: `.${static_classes[`highscore_value`]}`,
                    duration: duration_time,
                    delay: delay_time,
                    textContent: [0, ((props.tsv * totalRemainingTime) + (props.msv * totalRemainingTurns) + (props.score))],
                    round: 1,
                    easing: 'linear',
                }).finished;

                await Promise.all([a6, a7]);
            }

            async function showGottenStars() {
                const a8 = anime({
                    targets: `.${static_classes['star']}`,
                    duration: 1200,
                    delay: anime.stagger(600),
                    scale: ['0%', '100%'],
                    rotate: ['180deg', '0deg'],
                    opacity: [0, 1],
                    easing: 'easeInOutBounce',
                }).finished;
                await Promise.all([a8]);
            }

            async function showWinButton() {
                const a9 = anime({
                    targets: `.${static_classes['win_btn']}`,
                    duration: 600,
                    opacity: [0, 1],
                    scale: ['0%', '100%'],
                    easing: 'easeInSine',
                }).finished;
                await Promise.all([a9]);
            }

            winAnimation();
        } else {

            document.querySelectorAll(`.${static_classes[`lost_btn`]}`).forEach((el) => el.style.transform = 'scale(0%)');
            document.querySelectorAll(`.${static_classes[`lost_btn`]}`).forEach((el) => el.style.pointerEvents = 'none');

            // Lost animation

            async function lostAnimation() {
                await fadeScreen()
                await showLostTitle()
                for(let arr_ind=0; arr_ind<valuesArr.length; arr_ind++) {
                    await showParams(arr_ind)
                }
                await showLostButtons()
                .then(() => {
                    document.querySelectorAll(`.${static_classes[`lost_btn`]}`).forEach((el) => el.style.pointerEvents = 'auto');
                })
            }

            async function showLostTitle() {
                const a1= anime({
                    targets: `.${static_classes['title']}`,
                    duration: 1200,
                    opacity: [0, 1],
                    translateY: ['-12%', 0],
                    easing: 'easeOutBounce',
                }).finished;
                await Promise.all([a1]);
            }

            async function showParams(index) {
                await showParamName(allParamNames[index])
                await showParamValue(allParamValues[index])
            }

            async function showParamName(el) {
                const a2 = anime({ 
                    targets: el,
                    duration: 500,
                    opacity: [0, 1],
                    translateY: ['-10%', '0%'],
                    easing: 'linear',
                }).finished;
                await Promise.all([a2]);
            }

            async function showParamValue(el) {
                const a3 = anime({ 
                    targets: el,
                    duration: 500,
                    opacity: [0, 1],
                    translateY: ['10%', '0%'],
                    easing: 'linear',
                }).finished;
                await Promise.all([a3]);
            }

            async function showLostButtons() {
                const a4 = anime({
                    targets: `.${static_classes[`lost_btn`]}`,
                    duration: 1200,
                    delay: anime.stagger(600),
                    opacity: [0, 1],
                    scale: ['0%', '100%'],
                    easing: 'easeOutExpo',
                }).finished;
                await Promise.all([a4]);
            }

            lostAnimation();
        }
    }

    
    function checkGottenStars(star_conditions) {
        // 1. We can assume that each level has 3 stars, therefore star_conditions array of object is length of 3
        // 2. It also should be noted, that each sooner star have more severe obtain conditions than the previous one
        for(let star_no = 0; star_no < 3; star_no++) {
            let areConditionsMet = checkStarCondition(star_conditions[star_no]);
            if(!areConditionsMet) return star_no; 
        }

        return 3;

        function checkStarCondition(conditionSet) {
            // 1. props name has to be IDENTICAL as for each starCondition condition element
            // 2. currently only one parameter can be set inside key of Object property name (eg. time can have 'moreThan' prop, but cannot have 'lessThan' simultaneously)
            // 3. Currently supported props: turns & time + level variables
            // 4. NOTE: When using variables, only one condition property can be supported. Correct pattern is:
            //  ->   variables: {secret_solved: {equal: true}} - variables refer to property name of newLevel obj, which should be always typed as it is,
            //  + next - secret_solved is example of one and only property that can be used inside variables. No more are allowed atm. However this property
            //  could be a result of other variables values, which are previously checked inside other level specific functions. Fe: if some variables have
            //  desired values, we can set the property (fe. secret_solved) to true, and based on that provide a star at the end level.
            let index = 0;
            for(let key in conditionSet) {
                const checkConditionPass = (props[`${Object.keys(conditionSet)[index]}`] instanceof Array)?
                    equation(props[`${Object.keys(conditionSet)[index]}`].reduce((accumVariable, curValue) => accumVariable + curValue , 0), Object.values(conditionSet[key]), ...Object.keys(conditionSet[key]))
                    :
                    equation(props[key][`${Object.keys(conditionSet[key])}`], ...Object.values(...Object.values(conditionSet[key])), ...Object.keys(...Object.values(conditionSet[key])));
                index++;
                if(!checkConditionPass) { return false; }
            }

            return true;
        }
    }

    function makeStars(stars_full_count) {
        let starArr = ['', '', '']; // has always to be of length: 3
        let stars = starArr.map((el, index) => {
            return <FontAwesomeIcon key={'star_' + index} icon={(index < stars_full_count)? star_full : star_empty} className={(index < stars_full_count)? `${static_classes['star']} ${static_classes[`star_full`]}` : `${static_classes['star']} ${static_classes[`star_empty`]}`}></FontAwesomeIcon>
        }) 
        setAllStars(stars);
    }

    function calculateFailureProgress() {
        const allLevelPoints = props.level.win.reduce((accumVariable, currentWinObj) => accumVariable + currentWinObj.value, 0);
        const receivedLevelPoints = props.level.win.filter((el, ind) => ind < props.stageNo).reduce((accumVariable, currentWinObj) => accumVariable + currentWinObj.value, 0);
        const progressOnFailedStage = props.pointsInStage;
        return Math.floor(parseFloat((100 / allLevelPoints) * (receivedLevelPoints + progressOnFailedStage).toFixed()));
    }

    function checkAnyProgress(oldValues, newValues) {
        // We assume here that both arguments are NUMBER[] and their length is exact same (and also corresponding categories are set inside a specific index)
        return oldValues.some((el, ind) => el < newValues[ind])
    }

    async function checkLevelProgress([new_progress, new_highscore, new_stars]) {
        // 1. Check if user made any progress on this level (compare current Progress record with highscore, stars and completion %)
        // 2. If at all criterias user did not make any progress, return the function and DO NOT UPDATE ANYTHING
        // 3. If any given criteria get better, let's update current Progress record but only update those fields, where the progress was made
        const oldProgressValues = [props.currentProgress.lv_progress, props.currentProgress.highscore, props.currentProgress.stars];
        const newProgressValues = [new_progress, new_highscore, new_stars];
        
        const isAnyProgress = checkAnyProgress(oldProgressValues, newProgressValues);
        if(isAnyProgress) { 
            // Now we know player did some progress, so update the Progress record with higher values ONLY !
            const progressCompared = {
                lv_progress: (props.currentProgress.lv_progress < new_progress)? new_progress : props.currentProgress.lv_progress,
                highscore: (props.currentProgress.highscore < new_highscore)? new_highscore : props.currentProgress.highscore,
                stars: (props.currentProgress.stars < new_stars)? new_stars : props.currentProgress.stars,
            }

            props.setCurrentProgress(progressCompared);

            await fetch(`/api/progress/${props.progressRecordId}`, {
                method: 'PUT',
                headers:  { 'Content-Type' : 'application/json' },
                body: JSON.stringify(progressCompared)
            })
        }

        // Check if player Won level (if so, he will be rewarded with some extra EXP); 
        if(new_progress >= 100) {
            // it is
            const expObj = {
                oldExp: props.playerExp,
                exp_to_add: (props.currentProgress.lv_progress < 100)? exp_for_difficulty[props.level.difficulty].firstVictory : exp_for_difficulty[props.level.difficulty].win
            } 

            await fetch(`/api/user/${props.playerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expObj)
            })
        }
    }

    function getLevelResult() {
        const progress = (props.value)? 100 : calculateFailureProgress();
        const highscore = (props.value)? props.time.reduce((accumVariable, curValue) => accumVariable + curValue , 0) * props.tsv + props.turns.reduce((accumVariable, curValue) => accumVariable + curValue , 0) * props.msv + props.score : 0;
        const stars_full_count = (props.value)? checkGottenStars(props.starConditions) : 0;
        return [progress, highscore, stars_full_count];
    }

    useEffect(() => {
        const [new_progress, new_highscore, new_stars] = getLevelResult(); 
        let end = (props.value)? 'win' : 'lose';
        let rand = Math.floor(Math.random() * level_end_messages[`${end}`].length);
        setEndMessage(level_end_messages[`${end}`][rand]);
        callEndAnimation();
        checkLevelProgress([new_progress, new_highscore, new_stars]);
    }, [])

    useLayoutEffect(() => {
        // Hide confirmbox elements
        document.querySelector(`.${static_classes['action_container']}`).style.pointerEvents = 'none';
        if(props.value) {
            document.querySelector(`.${static_classes['win_btn']}`).style.transform = 'scale(0%)';
            document.querySelector(`.${static_classes['highscore']}`).style.opacity = 0;
        }
    }, [])

    useEffect(() => {
        document.querySelectorAll(`.${static_classes['star']}`).forEach(el => el.style.opacity = 0);
    }, [allStars])

    function fadeAnimation() {
        anime({
            targets: 'body',
            duration: 1200,
            opacity: [0, 1],
            easing: 'linear',
        })
    }

    return (
        <div className={`${static_classes['bg']}`}>
            <div className={`${static_classes['box']}`}>
                <div className={(props.value) ? `${styles_confirm['confirm']} ${styles_confirm['confirm-win']}` : `${styles_confirm['confirm']} ${styles_confirm['confirm-lost']}`}>
                    <div className={`${static_classes['info']}`}>
                        <div className={(props.value) ? `${static_classes['title']} ${styles_confirm['info-title-win']}` : `${static_classes['title']} ${styles_confirm['info-title-lost']}`}>
                            {endMessage}
                        </div>

                        <div className={`${styles_confirm['param-box']}`}>
                            <div className={`${static_classes['param']}`}>
                                <div className={`${static_classes['param_name']}`}> Time: </div>
                                <div className={`${static_classes['param_value']}`}> {(props.value) ? 0 :  props.time}</div>
                            </div>

                            <div className={`${static_classes['param']}`}>
                                <div className={`${static_classes['param_name']}`}> Turns: </div>
                                <div className={`${static_classes['param_value']}`}> {(props.value) ? 0 : props.turns} </div>
                            </div>

                            <div className={`${static_classes['param']}`}>
                                <div className={`${static_classes['param_name']}`}> Score: </div>
                                <div className={`${static_classes['param_value']}`}> {(props.value) ? 0 : props.score} </div>
                            </div>
                        </div>

                        {(props.value) && (
                            <div className={`${styles_confirm['win-summary']}`}>
                                <div className={`${static_classes['highscore']}`}>
                                    <div className={`${styles_confirm['highscore-name']}`}> Highscore: </div>
                                    <div className={`${static_classes['highscore_value']}`}> 0 </div>
                                </div> 
                                <div className={`${static_classes['star_box']}`}>
                                    {allStars}
                                </div>
                            </div>
                        )}

                    </div>

                </div>

                <div className={`${styles_confirm['action']}`}>
                    <div className={`${static_classes['action_container']}`} ref={actionBox_ref}>
                        {(props.value) ?
                            <div className={`${styles_confirm['action_container--win']}`} ref={table} >
                                <div className={`${static_classes[`win_btn`]}`}  onClick={() => {props.start();}} ref={confBtn} > Go to menu </div>
                            </div>
                            :
                            <div className={`${styles_confirm['action_container--lost']}`} ref={table} >
                                <div className={`${static_classes[`lost_btn`]}`} onClick={() => {props.restart(); fadeAnimation() }} ref={confBtn} > Retry </div>
                                <div className={`${static_classes[`lost_btn`]}`} onClick={() => {props.start();}} ref={confBtn} > Back </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Confirm;