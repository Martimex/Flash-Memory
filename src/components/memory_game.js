import  React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styles_global from '../../src/global/global_styles.module.css';
import useMediaQuery from '../../src/virtual_hooks/useMediaQuery';

import * as Animation from "animejs"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import GameInfo from '../../src/components/game_info.js';
import Confirm from '../../src/components/confirm.js';

// Level based stuff
import {uncoverPatterns} from '../../src/global/predefined/uncover_patterns.js';
import { checkForLevelModifiers, applyLevelModifier } from '../../src/global/predefined/level_modifiers.js';
import {scoreExtras} from '../../src/global/predefined/score_extras.js';

import { setIcon, icon_Sets } from '../../pages/landing.js';


library.add(fab, fas);

const moveScoreValue = 150; // Don't momdify aswell - it calculates score for every remaining move after you've succeded
const timeScoreValue = 50; // Don't momdify aswell - it calculates score for every remaining second after you've succeded, it's calculated twice, so add '/2' value

const classes = {
    firstPlan: styles_global['firstPlanContainer'],
    secondPlan: styles_global['secondPlanContainer'],
    animationPlan: styles_global['animationContainer'],
}

const duplicateIcons = {
    pairs: 2,
    triplets: 3,
    quads: 4,
    sixes: 6,
    eights: 8,
    nines: 9,
}

function setRandomIcons(iconSet, tiles, pattern) { 

    let iconSetCopy = [...iconSet]; 
    let usedIcons = [];
    let randomizedIcons = [];

    for(let i=0; i<(tiles/duplicateIcons[pattern]); i++) { 
        let random = Math.floor(Math.random() * iconSetCopy.length);
        usedIcons.push(iconSetCopy[random]);
        iconSetCopy.splice(random, 1);
    }

    let duplicate = [];

    for(let g=0; g<duplicateIcons[pattern]; g++) {
        duplicate.push(...usedIcons);
    }

    const usedIconsCopy = [...duplicate]; 

    for(let j=0; j<usedIconsCopy.length; j++) {
        randomizedIcons.push(setIcon(duplicate));
    }

    return randomizedIcons;
}

async function loadOtherModules(serieName, levelNumber) {
    const start = await import(`../../src/levels/${serieName}/level_${levelNumber}/scripts/start.js`);
    const xclick = await import(`../../src/levels/${serieName}/level_${levelNumber}/scripts/xclick.js`);
    const match = await import(`../../src/levels/${serieName}/level_${levelNumber}/scripts/match.js`);
    const stagecomplete = await import(`../../src/levels/${serieName}/level_${levelNumber}/scripts/stagecomplete.js`);
    
    return {
        start: start,
        xclick: xclick,
        match: match,
        stagecomplete: stagecomplete,
    }
}

const cssModules = {
    // We are going to use it to assign styles to dynamic imports. They will be used as style object within JSX 
    main: '',
    bg: '',
    firstPlan: '',
    secondPlan: '',
}

let otherModules = null; // we can use it to access our scripts
let pointsInStage = 0; // determines how many points player gets during current stage of the level
let turns = 0; // detaermines how much turns player used in current stage
let arr = []; // for applying proper number of tiles that has to be rendered for current stage
let randomizedIconsArray = []; // array which holds random icons for newly created tiles 

//INIT
let allTiles;

const anime = Animation.default;

function Game(props) {

    const isDesktop = useMediaQuery('(min-width: 941px)');

    const [level, setLevel] = useState(props.level);

    const [testValue, setTestValue] = useState(false);
    const [confirmValue, setConfirmValue] = useState(null); // ALWAYS SET IT TO NULL (INITIAL) ||  true / false (is level fully Completed ?)
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [clickNo, setClickNo] = useState(0); // use to calculate click number (mostly for xClick script)
    const [stageNo, setStageNo] = useState(0); // use to switch stages (if level has few stages)
    const [boardState, setBoardState] = useState(null);
    const [boardGridParams, setBoardGridParams] = useState(null);
    const [levelVariables, setLevelVariables] = useState(JSON.parse(JSON.stringify(props.level.variables)));
    // Below prevents from overriding 'better progress record' with worse one, in cases when player uses 'Retry button' instead of 'Back' when saving progress on 'level lose' scenario 
    const [progressData, setProgressData] = useState({highscore: props['progress']['highscore'], lv_progress: props['progress']['lv_progress'], stars: props['progress']['stars']}); 

    const all = useRef(null);
    const bg = useRef(null);
    const gameboard = useRef(null);
    const game = useRef(null);
    const gameinfo_ref = useRef(null);
    const animationBox = useRef(null);

    function conditionsAreMet(e) {
        if(gameboard.current.dataset.animation !== 'off') {return false;}
        if(!e.target.classList.contains(styles_global['tile'])) {return false;}
        const isNotAlreadyOpened = checkTilesOrigin(props.gameCounters.cardsOpened, e.target);
        if(!isNotAlreadyOpened) {  return false; }

        return true;
    }

    function clickable(e)  {

        const tile_back = e.target.querySelector(`.${styles_global['tile-back']}`);
        props.gameCounters.cardsOpened.push(tile_back);
        props.gameCounters.cardsOpened[props.gameCounters.cardsOpened.length - 1].parentNode.classList.add(`target`, `target-serie-${stageNo}`, `target-${props.gameCounters.cardsOpened.length}`); // classcheck

        keepCardOpen(e);
    }

    function checkTilesOrigin(cardsOpened, new_tile) {
        // Everything here in fact refer to props.gameCounters.cardsOpened
        for(let n=0; n<cardsOpened.length; n++) {
            if(cardsOpened[n].parentNode === new_tile) return false;
        }
        return true;
    }

    useEffect(() => {

        if(props.level.limitations[stageNo][`time`]) { 
            // Each level has to have time counting !!!
            if((time === 0) || (confirmValue !== null)) {return;} // We have a separate setTime call which sets time to 1 after initial animation finish 

            const stopwatch = setInterval(() => {
                if(pointsInStage < props.level.win[stageNo][`value`]) {
                    setTime((time + 1));
                }
            }, 1000);
    
            if((props.level.limitations[stageNo][`time`] - time < 0) && (pointsInStage < props.level.win[stageNo][`value`])) {
                setConfirmValue(false);
                clearInterval(stopwatch);
            }
    
            return () => clearInterval(stopwatch);
        } else {
            throw new Error('TIME COUNTDOWN NOT ADDED TO THE LEVEL !');
        }

    }, [time]);

    useEffect(() => {
        // FIRES AFTER EVERY STAGE CHANGE

        // 0. Reset all gameCounters - we will use it now for props.gameCounters*
        resetGameCounters();
        setBoardGridParams({gridTemplateColumns: `repeat(${props.level.board[stageNo]['columns']}, ${(props.level.tiles[stageNo]['size'])/10}rem)`, gridTemplateRows: `repeat(${props.level.board[stageNo]['rows']}, ${(props.level.tiles[stageNo]['size'])/10}rem)`})

        // 1. Reset turns / time / stageScore variables first
        setTime(0);
        turns = 0;
        pointsInStage = 0;
        if(props.gameCounters.cardsOpened.length) { props.gameCounters.cardsOpened = [] };

        if(arr.length > 0) {
            while(arr.length > 0) {
                arr.pop();
            }
        }
    
        for(let i=0; i<props.level.tiles[stageNo]['count']; i++) {
            arr.push('');
        };

        randomizedIconsArray = setRandomIcons(icon_Sets[`${props.level.tiles[stageNo]['icon_set']}`], props.level.tiles[stageNo]['count'], props.level.uncover[stageNo][`pattern`]);

        allTiles =  arr.map((tile, index) =>  {
            return <div data-get={'tile'} className={`${styles_global['tile']} ${stageNo >= 0 && cssModules.main[`tile_custom--stage-${stageNo}`]} ${cssModules.main && cssModules.main[`tile_custom`]}`} key={`tile-s${stageNo}-${index.toString()}`}><div className={`${styles_global[`tile-front`]} ${stageNo >= 0 && cssModules.main[`tile-front_custom--stage-${stageNo}`]} ${cssModules.main && cssModules.main[`tile-front_custom`]}`}></div> <div className={`${styles_global[`tile-back`]} ${stageNo >= 0 && cssModules.main[`tile-back_custom--stage-${stageNo}`]} ${cssModules.main && cssModules.main[`tile-back_custom`]}`}>{<FontAwesomeIcon icon={`${randomizedIconsArray[index]}`} className={`${stageNo >= 0 && cssModules.main[`fa-icon_custom--stage-${stageNo}`]} ${cssModules.main && cssModules.main[`fa-icon_custom`]}`}/>}</div></div>
        });

        setBoardState(allTiles);
        appendPlansElems(stageNo);
        loadDynamic();

    }, [stageNo, testValue])

    // Add proper styling based on device used by end user
    
    /* if(isDesktop) {  UNCOMMENT AND MAKE A DEVELOPMENT LATER WHEN WORKING WITH MEDIA QUERIES !!!
        boardGridParams = {gridTemplateColumns: `repeat(${props.newLevel.columns}, ${(props.newLevel.tile_size)/10}rem)`, gridTemplateRows: `repeat(${props.newLevel.rows}, ${(props.newLevel.tile_size)/10}rem)`};
    } else {
        boardGridParams = {gridTemplateColumns: `repeat(${props.newLevel.columns}, ${(props.newLevel.tile_size_mobile)/10}rem)`, gridTemplateRows: `repeat(${props.newLevel.rows}, ${(props.newLevel.tile_size_mobile)/10}rem)`};
    } */

    async function keepCardOpen(e) {
        // Open up the tile
        async function openUp() {
            const a1 = anime({
                targets: e.target,
                duration: props.level.tile_animation[stageNo][`duration`],
                transitionProperty: 'all',
                easing: props.level.tile_animation[stageNo][`easing`],
                rotateY: 180,
            }).finished;

            await Promise.all([a1]);
        }

        setClickNo(clickNo + 1);

        if(props.gameCounters.cardsOpened.length === props.level.uncover[stageNo][`count`]) {
            gameboard.current.dataset.animation = 'on';
            const doesMatch = uncoverPatterns[props.level.uncover[stageNo][`pattern`]](props.gameCounters.cardsOpened);  // doesMatch can be either TRUE or FALSE (it follows basic uncover pattern for levels)
            const cardsOpened_parentNodes = setParentNodes(props.gameCounters.cardsOpened);
        
            await openUp()
            await otherModules[`match`].match(doesMatch, cardsOpened_parentNodes, stageNo, props.level, levelVariables) // doesMatch determines whether player meets required condition to remove tiles
            turns = turns + (checkForLevelModifiers(props.level.others, levelVariables, 'EXTRATURNS_MODIFIER')? applyLevelModifier('EXTRATURNS_MODIFIER', levelVariables) : 1);
            doCardsMatch(checkForLevelModifiers(props.level.others, levelVariables, 'DOESMATCH_MODIFIER')? applyLevelModifier('DOESMATCH_MODIFIER', levelVariables) : doesMatch, props.gameCounters.cardsOpened);
        } else {
            await openUp();
        }
    }

    function doCardsMatch(doesMatch, cardsOpened) {

        // EVERY cardsOpened statement here refers to props.gameCounters.cardsOpened
        manageValuesAndCounters(doesMatch);

        if(props.level.limitations[stageNo][`time`]) {
            if(props.level.limitations[stageNo][`time`] - time <= 0) {
                // We need to block winning condition when player is left with too little time
                setConfirmValue(false);
                return;
            }
        }

        setTimeout(() => {

            const cardsOpened_parentNodes = setParentNodes(cardsOpened);

            if(doesMatch) {

                setScore(score + props.level.score[stageNo][`count`] 
                    + ((props.level.score[stageNo][`extras`])?  scoreExtras[`${props.level.score[stageNo][`extras`]}`](props.gameCounters, props.level.score[stageNo][`count`]) : 0)
                );

                async function fade() {
                    const a1 = anime({
                        targets: cardsOpened_parentNodes,
                        duration: props.level.tile_animation[stageNo][`duration`],
                        easing: props.level.tile_animation[stageNo][`easing`],
                        opacity: 0,
                    }).finished;

                    await Promise.all([a1]);
                }

                fade().then(() => {
                    cardsOpened_parentNodes.forEach((parent, index) => {
                        parent.style = 'visibility: hidden';
                        parent.classList.remove(`target`, `target-serie-${stageNo}`, `target-${index + 1}`); //classcheck
                    })

                    while(cardsOpened.length) {cardsOpened.pop();}

                    // Check game progress - do player finish level or stage ?
                    checkStageSuccess(pointsInStage);

                    setClickNo(0);
                    gameboard.current.dataset.animation = 'off';
                })
            }

            else {

                for(let i=0; i<cardsOpened.length; i++) {
                    // cardsOpened.length is ALWAYS equal to cardsOpened_parentNodes.length
                    cardsOpened_parentNodes[i].classList.remove(`target`, `target-serie-${stageNo}`, `target-${i+1}`); //classcheck
                }

                while(cardsOpened.length) {cardsOpened.pop();}

                setClickNo(0);
                gameboard.current.dataset.animation = 'off';
                flipBack(cardsOpened_parentNodes);

                async function flipBack(cardsOpened_parentNodes) {
                    const a1 = anime({
                        targets: cardsOpened_parentNodes,
                        duration: props.level.tile_animation[stageNo][`duration`],
                        rotateY: [180, 0],
                        easing: props.level.tile_animation[stageNo][`easing`],
                    }).finished;

                    await Promise.all([a1]);
                }        
                
            }

            checkLosingConditions();

        }, props.level.tile_animation[stageNo]['compareTime'])
    }

    function manageValuesAndCounters(doesMatch) {
        // This function is used for managing all counters in one place (to make things cleaner)
        if(doesMatch) {
            pointsInStage += props.level.win[stageNo][`pointsPerMatch`];
            props.gameCounters['spree'] += 1;
        } else {
            props.gameCounters['spree'] = 0;
        }
    }

    function resetGameCounters() {
        props.gameCounters['spree'] = 0;
    }

    function checkLosingConditions() {
        if(props.level.limitations[stageNo][`turns`]) { // if this stage take care of turns used
            if( (props.level.limitations[stageNo][`turns`] - turns <= 0) && (pointsInStage < props.level.win[stageNo][`value`]) && (confirmValue === null) ) { 
                // if we have no turns left, and still didnt complete current stage
                setConfirmValue(false);
            }
        }
    }

    function checkStageSuccess(pointsInStage) {

        if( (pointsInStage >= props.level.win[stageNo][`value`]) ) {
            // Update gameCounters for accumulative remaining turns / time
            if(props.level.limitations[stageNo][`turns`]) props.gameCounters[`totalRemainingTurns`].push(props.level.limitations[stageNo][`turns`] - turns);
            if(props.level.limitations[stageNo][`time`])  props.gameCounters[`totalRemainingTime`].push(props.level.limitations[stageNo][`time`] - time); 


            if(stageNo + 1 === props.level.stages) {
                // Level completed !
                async function finishGame() {
                    await otherModules[`stagecomplete`].stagecomplete(stageNo, true, props.level, levelVariables)
                    setConfirmValue(true);
                }
                finishGame();
            } 
            else if(stageNo + 1 !== props.level.stages) {
                // Move to the new stage + block pointer events just during new stage animations
                document.body.style.pointerEvents = 'none';
                nextStageTransition()
            }
        }
    }

    async function nextStageTransition() {
        await otherModules[`stagecomplete`].stagecomplete(stageNo, false, props.level, levelVariables);
        await newStageFadeOut()
            .then(() => {
                newStageFadeIn()
                setStageNo(stageNo + 1);
            })
    }

    function setParentNodes(cardsOpened) {
        // EVERY cardsOpened statement in fact refers to props.gameCounters.cardsOpened 
        let parentsNodeArr = [];
        cardsOpened.forEach(tile => {
            parentsNodeArr.push(tile.parentNode);
        })
        return parentsNodeArr;
    }

    async function loadDynamic() {
        // 0. First let's import some level-based styling
        await loadStyles();
        // 1. Init icons 
        allTiles = arr.map((tile, index) =>  {
            return <div data-get={'tile'} className={`${styles_global['tile']} ${stageNo >= 0 && cssModules.main[`tile_custom--stage-${stageNo}`]} ${cssModules.main && cssModules.main[`tile_custom`]}`} key={`tile-s${stageNo}-${index.toString()}`}><div className={`${styles_global[`tile-front`]} ${stageNo >= 0 && cssModules.main[`tile-front_custom--stage-${stageNo}`]} ${cssModules.main && cssModules.main[`tile-front_custom`]}`}></div> <div className={`${styles_global[`tile-back`]} ${stageNo >= 0 && cssModules.main[`tile-back_custom--stage-${stageNo}`]} ${cssModules.main && cssModules.main[`tile-back_custom`]}`}>{<FontAwesomeIcon icon={`${randomizedIconsArray[index]}`} className={`${stageNo >= 0 && cssModules.main[`fa-icon_custom--stage-${stageNo}`]} ${cssModules.main && cssModules.main[`fa-icon_custom`]}`}/>}</div></div>
        });
        // 2. Now perform DOM repaint by fire useState hook
        setBoardState(allTiles);
    }

    useEffect(() => {
        if(boardState) {
            async function run() {
                let loadStart = await import(`../../src/levels/${props.level.Serie.name_abbr}/level_${props.level.number}/scripts/start.js`);
                loadStart.level_start(stageNo, props.level.starting_animation[stageNo][`duration`], props.level.starting_animation[stageNo][`tileShowTime`], props.level, levelVariables)
                    .then(() => {
                        // After animation is completed...
                        setTime(1);
                        document.body.style.pointerEvents = 'auto'; // unlock clicking (previously blocked in level_info *play btn onClick*)
                    })
                otherModules = await loadOtherModules(props.level.Serie.name_abbr, props.level.number);    
            }
            run();
        }
    }, [boardState])

    function restartLevel() {
        gameboard.current.dataset.animation = 'off'; // prevents from bug happening when player opens 2 tiles, which are not closed again before time runs out
        resetPlanItems();
        resetInlineStyles();
        resetAllGameCounters(props.gameCounters);
        setTestValue(!testValue);
        setBoardState(null);
        setClickNo(0); // Setting back to 0 prevents from bug, where clicking first turn for already restarted level make animations not runnings
        setStageNo(0);
        setScore(0); // reset score value to 0 after lose
        setConfirmValue(null);
        setLevelVariables(JSON.parse(JSON.stringify(props.level.variables)))
    }

    function resetInlineStyles() {
        // Clear inline styles when user restarts the level (to maintain its' basic state correctly)
        anime.remove(document.querySelector(`.${styles_global[`background`]}`));
        anime.remove(document.querySelector(`.${styles_global['game-info']}`));
        anime.remove(document.querySelector(`.${styles_global[`board`]}`));
        // DO NOT RESET STYLES FOR styles_global[`board`] , BECAUSE TILES BOARD DISPLAY RELIES ON THIS
        setBoardGridParams({}); // don't remove this declaration, as this helps trigerring things properly
        document.querySelector(`.${styles_global[`board`]}`).removeAttribute('style');
        document.querySelector(`.${styles_global[`background`]}`).removeAttribute('style');
        document.querySelector(`.${styles_global['game-info']}`).removeAttribute('style');
        document.querySelector(`.${classes[`firstPlan`]}`).removeAttribute('style');
        document.querySelector(`.${classes[`secondPlan`]}`).removeAttribute('style');
        document.querySelector(`.${classes[`animationPlan`]}`).removeAttribute('style');
    }

    function resetPlanItems() {
        const [getFirstPlan, getSecondPlan, getAnimationPlan] = 
            [   document.querySelector(`.${classes[`firstPlan`]}`),
                document.querySelector(`.${classes[`secondPlan`]}`),
                document.querySelector(`.${classes[`animationPlan`]}`),
            ];
        getFirstPlan.replaceChildren();
        getSecondPlan.replaceChildren();
        getAnimationPlan.replaceChildren();
    }

    function resetAllGameCounters(allGameCounters) {
        for(let key in allGameCounters) {
            if(typeof(allGameCounters[key]) === 'string') { allGameCounters[key] = ''}
            else if(typeof(allGameCounters[key]) === 'number') { allGameCounters[key] = 0}
            else if(allGameCounters[key] instanceof Array) { allGameCounters[key] = []}
            else { throw new Error(`DETECTED UNSUPPORTED KEY TYPE WHEN RESETTING COUNTER VALUES. FOUND TYPE: ${typeof(key)} for counter: ${key} with value of: ${allGameCounters[key]} `) };
        }
    }

    async function newStageFadeIn() {
        const a1 = anime({
            targets: [gameboard.current, gameinfo_ref.current],
            opacity: 1,
            duration: props.level.fade[stageNo]['duration'],
            easing: props.level.fade[stageNo]['easing'],
        }).finished;

        await Promise.all([a1]);
    }

    async function newStageFadeOut() {
        const a1 = anime({
            targets: [gameboard.current, gameinfo_ref.current],
            opacity:  0,
            duration: props.level.fade[stageNo]['duration'],
            easing: props.level.fade[stageNo]['easing'],
        }).finished;
        
        await Promise.all([a1]);
    }


    useEffect(() => {
        if(clickNo > 0) {
            otherModules[`xclick`].xclick(clickNo, props.gameCounters.cardsOpened[props.gameCounters.cardsOpened.length - 1].parentNode, stageNo, props.level, levelVariables/* props.newLevel */);
        } else {
            // X Click event is not fired ... ClickNo is: clickNo;
        }
    }, [clickNo])

    useLayoutEffect(() => {
        // Prevents from initial screen flickering when a couple of frames were suddenly showing a level, interrupted by the fadeIn animation (below one)
        anime({
            targets: document.body,
            duration: 1200,
            opacity: [0, 1],
            easing: 'linear',
        })
    }, []);

    useEffect(() => {
        document.body.style.overflowY = 'auto';
        setBoardState(null);
    }, []);

    async function loadStyles() {
        cssModules.main = await import(`../../src/levels/${props.level.Serie.name_abbr}/level_${props.level.number}/styles/main.module.css`); // for styling tiles
        cssModules.firstPlan = await import(`../../src/levels/${props.level.Serie.name_abbr}/level_${props.level.number}/styles/firstPlan.module.css`); // for first plan fancy elements
        cssModules.secondPlan = await import(`../../src/levels/${props.level.Serie.name_abbr}/level_${props.level.number}/styles/secondPlan.module.css`); // for second plan fancy elements
        cssModules.bg =  await import(`../../src/levels/${props.level.Serie.name_abbr}/level_${props.level.number}/styles/bg.module.css`); // for adding background to the level
    }

    async function appendPlansElems(stageNo) {
        const plansElems = await import(`../../src/levels/${props.level.Serie.name_abbr}/level_${props.level.number}/generatePlanItems.js`);
        plansElems.generateItems(classes[`firstPlan`], classes[`secondPlan`], stageNo, props.level);
    }

    return(
        <div className={styles_global['all']} ref={all}>
            <div className={`${styles_global[`background`]} ${cssModules.bg && cssModules.bg[`background_custom`]}`} ref={bg}>
                <div className={styles_global['game-info']} ref={gameinfo_ref} >
                    <GameInfo newSerie={props.level.Serie.name_abbr} level={props.level.number} moves={props.level.limitations[stageNo]['turns'] - turns} time={props.level.limitations[stageNo]['time'] - time} score={score}  />
                </div>

                <div className={`${styles_global[`game`]} ${cssModules.bg && cssModules.bg[`game_custom`]}`} ref={game}>
                    <div className={`${styles_global[`board`]} ${cssModules.bg && cssModules.bg[`board_custom`]}`} ref={gameboard} data-animation='off' onClick={(e) => { if(conditionsAreMet(e)) { clickable(e); setClickNo(clickNo + 1); }}}  style={boardGridParams}>
                        {boardState}
                    </div>
                </div>
                
                <div className={`${classes[`firstPlan`]} ${cssModules.firstPlan && cssModules.firstPlan[`firstPlan_custom`]}`}> </div>
                <div className={`${classes[`secondPlan`]} ${cssModules.secondPlan && cssModules.secondPlan[`secondPlan_custom`]}`}> </div>
                <div className={`${classes[`animationPlan`]} ${cssModules.main && cssModules.main[`aContainer_custom`]}`} ref={animationBox}></div>
            </div>

            {confirmValue !== null && (
                <Confirm value={confirmValue} level={level} level_no={props.level.number} newSerie={props.level.Serie.name_abbr} score={score} tsv={timeScoreValue} msv={moveScoreValue} 
                    turns={(confirmValue)? props.gameCounters[`totalRemainingTurns`] : (props.level.limitations[stageNo][`turns`])? props.level.limitations[stageNo][`turns`] - turns : 0} 
                    time={(confirmValue) ? props.gameCounters[`totalRemainingTime`] : (props.level.limitations[stageNo][`time`])? props.level.limitations[stageNo][`time`] - time : 0} 
                    start={() => {props.changeComponent('preview') }}  restart={() => { restartLevel(); }}
                    variables={props.level.variables} progressRecordId={props.progress.id} currentProgress={progressData} setCurrentProgress={setProgressData} starConditions={props.level.star_conditions} pointsInStage={pointsInStage} stageNo={stageNo}
                    playerId={props.playerId} playerExp={props.playerExp}
                />
            )}
        </div>
    )
} 

export default Game;