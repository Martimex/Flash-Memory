import * as Animation from "animejs"
import mainStyles from '../styles/main.module.css';
import firstPlanStyles from '../styles/firstPlan.module.css';
import { setBountyQuest } from './start';
const anime = Animation.default;

async function match(isMatch, cardsOpened_parentNodes, stageNo, levelObject, levelVariables) {
    // Fire some animations when we found / do not found a match
    if(isMatch) {
        levelVariables.foundTiles += levelObject.uncover[stageNo].count;
        checkBountyQuestState();
    }
    else {
       //
    }

    function checkBountyQuestState() {
        let targetBackFirst = document.querySelector(`.target-1 .${mainStyles['tile-back_custom']}`);
        let targetBackSecond = document.querySelector(`.target-2 .${mainStyles['tile-back_custom']}`);
        let allSvgConts = document.querySelectorAll(`.${firstPlanStyles['svgContainer']}`);

        removeWantedQuest(cardsOpened_parentNodes);

        if((cardsOpened_parentNodes[0].classList.contains(`${mainStyles['bounty-q']}`) || (cardsOpened_parentNodes[1].classList.contains(`${mainStyles['bounty-q']}`)))) {
    
            // Reward the player only when shown tile is targeted first !
            if(cardsOpened_parentNodes[0].classList.contains(`${mainStyles['bounty-q']}`)) {
                
                anime({
                    targets: '.target',
                    duration: 650,
                    scale: .85,
                    borderWidth: '.55rem',
                    borderStyle: 'solid',
                    borderColor: 'hsla(122, 0%, 0%, 0.68)',
                    easing: 'easeInExpo',
                })
                
                levelVariables.STATIC['EXTRATURNS_MODIFIER'] = -3; // 2 extra  turns, since it takes 1 turn to find, and every pair consumes 1 extra turn
                setWantedQuest();
            }

            let foundBounty = document.querySelector(`.${mainStyles['bounty-q']}`);
            foundBounty.classList.remove(`${mainStyles['bounty-q']}`);

            // INIT NEW BOUNTY GENERATOR
            setBountyQuest(levelObject, levelVariables, stageNo);
        } 
        else if(allSvgConts[1].hasChildNodes()) {
            if((targetBackSecond.childNodes[0].classList[1] !== allSvgConts[1].childNodes[0].classList[1])) {  // else if its not wanted quest 
                anime({
                    targets: '.target',
                    duration: 1500,
                    borderColor: 'hsla(0, 63%, 48%, .7)',
                    easing: 'easeInQuad',
                })
            }
        }

        else if(allSvgConts[0].hasChildNodes()) { // if any wanted quest exists
        
            if(targetBackFirst.childNodes[0].classList[1] !== allSvgConts[0].childNodes[0].classList[1]) {  // else if its not wanted quest 
                anime({
                    targets: '.target',
                    duration: 1500,
                    borderColor: 'hsla(0, 63%, 48%, .7)',
                    easing: 'easeInQuad',
                })
            }
        }
    }

    function removeWantedQuest(cardsOpened_parentNodes) {
        // Remove found WANTED icons - if pair match
        let allSvgConts = document.querySelectorAll(`.${firstPlanStyles['svgContainer']}`);

        if(allSvgConts[1].childNodes.length > 0) {
            if(cardsOpened_parentNodes[0].querySelector(`.${mainStyles['tile-back_custom']}`).childNodes[0].classList[1] === allSvgConts[1].childNodes[0].classList[1]) {
                levelVariables.STATIC['EXTRATURNS_MODIFIER'] -= 2; // 1 extra  turns, since it takes 1 turn to find, and every pair consumes 1 extra turn
                colorWantedLetter(levelVariables);
                async function animation() {
                    await anime({
                        targets: allSvgConts[1].childNodes[0],
                        duration: 400,
                        opacity: [1, 0],
                        easing: 'linear',
                    }).finished;
                    allSvgConts[1].childNodes[0].remove();
                }
                animation();
            }
            else if(cardsOpened_parentNodes[0].querySelector(`.${mainStyles['tile-back_custom']}`).childNodes[0].classList[1] === allSvgConts[0].childNodes[0].classList[1]) {
                levelVariables.STATIC['EXTRATURNS_MODIFIER'] -= 2; // can stack up if somehow bounty quest was the same as wanted quest 
                colorWantedLetter(levelVariables);
                let svgSecond = allSvgConts[1].childNodes[0];
                allSvgConts[0].childNodes[0].remove();
                allSvgConts[0].appendChild(svgSecond);
            }
        }

        else if(allSvgConts[0].childNodes.length > 0) {
            if(cardsOpened_parentNodes[0].querySelector(`.${mainStyles['tile-back_custom']}`).childNodes[0].classList[1] === allSvgConts[0].childNodes[0].classList[1]) {
                levelVariables.STATIC['EXTRATURNS_MODIFIER'] -= 2; // can stack up if somehow bounty quest was the same as wanted quest 
                colorWantedLetter(levelVariables);
                async function animation() {
                    await anime({
                        targets: allSvgConts[0].childNodes[0],
                        duration: 400,
                        opacity: [1, 0],
                        easing: 'linear',
                    }).finished;
                    allSvgConts[0].childNodes[0].remove();
                }
                animation();
            }
        }
    }

    function colorWantedLetter(levelVariables) {
        // If you already solved the secret, just return - we don't have any available letters to color anyways !
        if(levelVariables.secret_solved === true) {return; }
        levelVariables.secretBase['foundWantedQuests'] += 1;
        const wantedTextBoxes = document.querySelectorAll(`.${firstPlanStyles['hText']}`);
        let currentLettersArr = [];
        wantedTextBoxes.forEach(textBox => {
            currentLettersArr.push(textBox.querySelector(`.${firstPlanStyles['hText_letter']}:nth-of-type(${levelVariables.secretBase['foundWantedQuests']})`));
        })
        if(levelVariables.secretBase['requiredWantedQuests'] <= levelVariables.secretBase['foundWantedQuests']) {
            levelVariables.secret_solved = true;
            runSecretSolved(currentLettersArr, wantedTextBoxes);
        } else {
            anime({
                targets: currentLettersArr,
                duration: 800,
                color: 'hsla(132, 73%, 49%, 0.68)',
                easing: 'linear',
            })
        }
    }

    async function runSecretSolved(currentLettersArr, wantedTextBoxes) {
        await anime({
            targets: currentLettersArr,
            duration: 800,
            color: 'hsla(132, 73%, 49%, 0.68)',
            easing: 'linear',
        }).finished;

        anime({
            targets: wantedTextBoxes,
            duration: 1200,
            scale: 1.1,
            filter: 'saturate(130%) brightness(120%)',
            easing: 'easeOutSine',
        })
    }

    function setWantedQuest() {
        const allTiles = document.querySelectorAll(`.${mainStyles['tile_custom']}`);
        const allSvgConts = document.querySelectorAll(`.${firstPlanStyles['svgContainer']}`);
        let alreadyWantedIcon_1;

        if(document.querySelector(`.${firstPlanStyles['svgContainer']}`).childNodes.length > 0) {
            alreadyWantedIcon_1= document.querySelector(`.${firstPlanStyles['svgContainer']} svg`).classList[1];
        } else {
            alreadyWantedIcon_1 = 'no-class';
        }

        let activeTiles = [];

        allTiles.forEach(tile => {
            let back = tile.querySelector(`.${mainStyles['tile-back_custom']}`);
            if((tile.style.visibility !== 'hidden') && (!(tile.classList.contains('target'))) && (alreadyWantedIcon_1 !== back.childNodes[0].classList[1]) 
                && Boolean([...allSvgConts].map((cont) => cont.children[0] && cont.children[0].classList[1]).find(wantedClass => back.children[0].classList[1] === wantedClass)) === false) 
            {
                activeTiles.push(tile);
            }
        });

        let rand = Math.floor(Math.random() * activeTiles.length);

        let wantedSvg = activeTiles[rand].querySelector(`svg`);
        let newSvg = wantedSvg.cloneNode(true);

        levelVariables.recentlyAddedWantedQuestClass = wantedSvg.classList[1];

        // Push new WANTED quests to container 

        if(allSvgConts[0].childNodes.length <= 0) {
            if(newSvg) { allSvgConts[0].appendChild(newSvg); }
            animateWantedQuestShowUp([allSvgConts[0]]);
        } 
        else if(allSvgConts[1].childNodes.length <= 0) {
            if(newSvg) { allSvgConts[1].appendChild(newSvg); }
            animateWantedQuestShowUp([allSvgConts[1]]);
        }
        else if((allSvgConts[0].childNodes.length > 0) && (allSvgConts[1].childNodes.length > 0)) {
            runWantedQuestsChange();
        }

        async function runWantedQuestsChange() {
            await animateWantedQuestFade([allSvgConts[0], allSvgConts[1]])
            let svgSecond = allSvgConts[1].childNodes[0];
            allSvgConts[0].childNodes[0].remove();
            allSvgConts[0].appendChild(svgSecond);
            allSvgConts[1].appendChild(newSvg);
            await animateWantedQuestShowUp([allSvgConts[0], allSvgConts[1]]);
        }

        async function animateWantedQuestFade(target) {
            await anime({
                targets: target,
                duration: 600,
                opacity: 0,
                easing: 'linear',
            }).finished;
        }

        async function animateWantedQuestShowUp(target) {
            await anime({
                targets: target,
                delay: 200,
                duration: 400,
                opacity: [0, 1],
                easing: 'linear',
            }).finished;
        }
    }
}

export {match};