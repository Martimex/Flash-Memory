import mainStyles from '../styles/main.module.css';
import firstPlanStyles from '../styles/firstPlan.module.css';
import * as Animation from "animejs"
const anime = Animation.default;
//--------------------------------------

async function level_start(stageNo, time, tileShowTime, levelObject, levelVariables) {

    async function startAnimation() {
        setBountyQuest(levelObject, levelVariables, stageNo);
        await runLevelStartMessage()
        await showTiles()
        await hideTiles()
    }

    async function runLevelStartMessage() {
        const aContainer = document.querySelector(`.${mainStyles['aContainer_custom']}`);
        const screen = document.createElement('div');
        const textBox = document.createElement('div');
        const heading = document.createElement('span');
        const text1 = document.createElement('span');

        screen.classList.add(`${mainStyles['initial-screen']}`);
        textBox.classList.add(`${mainStyles['initial-textbox']}`);
        heading.classList.add(`${mainStyles['initial-heading']}`);
        text1.classList.add(`${mainStyles['initial-text']}`);

        heading.textContent = 'Objective';
        text1.textContent = 'Complete bounty quests by targeting the marked tile FIRST, before finding a pair';

        textBox.append(heading, text1);
        screen.appendChild(textBox);
        aContainer.appendChild(screen);

        const a1 = anime({
            targets: [heading, text1],
            duration: 1500,
            delay: anime.stagger(500),
            endDelay: 1800,
            transform: ['translateY(-2rem)', 'translateY(0rem)'],
            opacity: [0, 1],
            easing: 'easeOutSine',
        }).finished;

        const a2 = anime({
            targets: screen,
            duration: 1000,
            opacity: [0, 1],
            easing: 'linear',
        }).finished;

        await Promise.all([a1, a2]);

        const b1 = anime({
            targets: [heading, text1],
            duration: 750,
            delay: anime.stagger(250),
            transform: ['translateY(0rem)', 'translateY(-2rem)'],
            opacity: [1, 0],
            easing: 'easeInSine',
        }).finished;

        const b2 = anime({
            targets: screen,
            duration: 1000,
            opacity: 0,
            filter: 'sepia(75%)',
            easing: 'easeInExpo',
        }).finished;

        await Promise.all([b1, b2]);
    }

    async function showTiles() {
        const a1 = anime({
            targets: `.${mainStyles['tile_custom']}`,
            duration: time,
            transitionProperty: 'all',
            rotateY: '180deg',
            easing: 'linear',
            loop: false,
        }).finished;

        await Promise.all([a1]);
    }

    async function hideTiles() {
        const a2 = anime({
            targets: `.${mainStyles['tile_custom']}`,
            duration: time,
            delay: tileShowTime,
            transitionProperty: 'all',
            rotateY: '0deg',
            easing: 'linear',
            loop: false,
        }).finished;

        await Promise.all([a2]);
    }

    // Init
    if(stageNo === 0) { await startAnimation(); }
}

function setBountyQuest(levelObject, levelVariables, stageNo) {
    const allTiles = document.querySelectorAll(`.${mainStyles['tile_custom']}`);
    const svgCont = document.querySelectorAll(`.${firstPlanStyles['svgContainer']}`);
    let activeTiles = [];
    
    // Don't remove this endgame condition, since this function is used also inside MATCH
    const lastPairsWithNoBounty = 5;
    if(levelVariables.foundTiles >= levelObject.tiles[stageNo].count - (lastPairsWithNoBounty * levelObject.uncover[stageNo].count)) {
        // Five from last pairs, so it's unnecessary to generate new bounties
        return;
    }
    
    allTiles.forEach(tile => {
        let back = tile.querySelector(`.${mainStyles['tile-back_custom']}`);
        if((tile.style.visibility !== 'hidden') && (!(tile.classList.contains('target')))) {
            if((svgCont[0].childNodes.length <= 0) && (svgCont[1].childNodes.length <= 0)) {activeTiles.push(tile);}
            else if ((levelVariables.recentlyAddedWantedQuestClass !== back.querySelector('svg').classList[1]) && (back.querySelector('svg').classList[1] !== svgCont[0].querySelector('svg').classList[1]) && (!(svgCont[1].hasChildNodes()))) {activeTiles.push(tile);}
            else if ((levelVariables.recentlyAddedWantedQuestClass !== back.querySelector('svg').classList[1]) && (back.querySelector('svg').classList[1] !== svgCont[0].querySelector('svg').classList[1]) && (back.querySelector('svg').classList[1] !== svgCont[1].querySelector('svg').classList[1])) {activeTiles.push(tile);}
        } 
    });
    
    const rand = Math.floor(Math.random() * activeTiles.length);
    
    anime({
        targets: activeTiles[rand],
        duration: 800,
        borderColor: ['#a7c', 'hsl(122, 30%, 30%)'],
        borderWidth: '.4rem',
        easing: 'linear',
    })
    
    activeTiles[rand].classList.add(`${mainStyles['bounty-q']}`); 
}

export {level_start, setBountyQuest};