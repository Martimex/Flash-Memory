import mainStyles from '../styles/main.module.css';
import firstPlanStyles from '../styles/firstPlan.module.css';
import secondPlanStyles from '../styles/secondPlan.module.css';;
import * as Animation from "animejs"
const anime = Animation.default;
//--------------------------------------

const possibleIconColors = ["hotpink", "lightsalmon", "orangered", "aquamarine", "saddlebrown", "lightskyblue", "yellowgreen", "thistle", "darkorchid", "olive",
    "maroon", "mediumblue", "navajowhite", "midnightblue", "gold", "darkorange", "darkmagenta", "springgreen", "darkgreen", "rosybrown"
];

async function level_start(stageNo, time, tileShowTime, levelObject, levelVariables) {

    async function startAnimation() {
        setInitialMatchTypes();
        addMatchInfoTitles();
        addTilesIdentifiers();
        await showTiles()
        await hideTiles()
            .then(() => {
                animateBoxes();
            })
    }

    function setInitialMatchTypes() {
        // Here we are setting match types for the first and the second turn in the level - they have UI, so it is essential
        // First one will be always: 'ICON'
        levelVariables.matchTypeHistory.push('icons');
        // Second could be 50% 'ICON' and 50% 'COLOR' - it's random
        levelVariables.matchTypeHistory.push(Boolean(Math.floor(Math.random() * 2))? 'icons' : 'colors');
    }

    function addMatchInfoTitles() {
        document.querySelector(`.${firstPlanStyles['mit-1']}`).textContent = 'LOOK FOR';
        document.querySelector(`.${firstPlanStyles['mit-2']}`).textContent = 'NEXT';
        document.querySelector(`.${firstPlanStyles['mii-1']}`).dataset['match_type'] = `${levelVariables.matchTypeHistory[levelVariables.matchTypeHistory.length - 2]}_type`;
        document.querySelector(`.${firstPlanStyles['mii-2']}`).dataset['match_type'] = `${levelVariables.matchTypeHistory[levelVariables.matchTypeHistory.length - 1]}_type`;
        document.querySelector(`.${firstPlanStyles['mid-1']}`).textContent = levelVariables.matchTypeHistory[levelVariables.matchTypeHistory.length - 2];
        document.querySelector(`.${firstPlanStyles['mid-2']}`).textContent = levelVariables.matchTypeHistory[levelVariables.matchTypeHistory.length - 1];
    }

    function addTilesIdentifiers() {
        // 1. Adding special identifiers for the level tiles
        const allTiles = document.querySelectorAll(`.${mainStyles['tile_custom']}`);
        allTiles.forEach((tile, ind) => tile.dataset['tileRef'] = ind);
        // 2. Apply initial colors and add them to levelVariables.iconsColoring['colorsTable']
        const pickedColorsArray = [];
        let possibleIconColors_copy = [...possibleIconColors];
        for(let i=0; i < levelObject.tiles[stageNo]['count'] / levelObject.uncover[stageNo]['count']; i++) {
            const rand = Math.floor(Math.random() * possibleIconColors_copy.length);
            pickedColorsArray.push(possibleIconColors_copy[rand], possibleIconColors_copy[rand]);
            possibleIconColors_copy.splice(rand, 1);
        }
        for(let j=0; j < levelObject.tiles[stageNo]['count']; j++) {
            const rand = Math.floor(Math.random() * pickedColorsArray.length);
            levelVariables.iconsColoring['colorsTable'].push(pickedColorsArray[rand]);
            allTiles[j].querySelector(`.${mainStyles['tile-back_custom']}`).style.color = levelVariables.iconsColoring['colorsTable'][j];
            pickedColorsArray.splice(rand, 1);
        }
        
    }

    async function showTiles() {
        const a1 = anime({
            targets: `.${mainStyles['tile_custom']}` /* divs */,
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
            targets: `.${mainStyles['tile_custom']}` /* divs */,
            duration: time,
            delay: tileShowTime,
            transitionProperty: 'all',
            rotateY: '0deg',
            easing: 'linear',
            loop: false,
        }).finished;

        await Promise.all([a2]);
    }

    function animateBoxes() {
        anime({
            targets: `.${secondPlanStyles['animationBox-1']}`,
            duration: 14400,
            keyframes: [
                {translateY: 0, translateX: '80vw', scale: ['100%', '200%'], duration: 5000},
                {translateY: '80vh', translateX: '80vw', scale: ['200%', '100%'], duration: 3000},
                {translateY: '80vh', translateX: '0vw',  scale: ['100%', '200%'],  duration: 5000},
                {translateY: 0, translateX: 0,  scale: ['200%', '100%'], duration: 3000},
            ],
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: `.${secondPlanStyles['animationBoxInner-1']}`,
            duration: 14400,
            keyframes: [
                {translateY: 0, translateX: '70vw', scale: ['100%', '200%'], duration: 3500},
                {translateY: '70vh', translateX: '70vw', scale: ['200%', '100%'], duration: 2500},
                {translateY: '70vh', translateX: '0vw',  scale: ['100%', '200%'],  duration: 3500},
                {translateY: 0, translateX: 0,  scale: ['200%', '100%'], duration: 2500},
            ],
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: `.${secondPlanStyles['animationBox-2']}`,
            duration: 14400,
            keyframes: [
                {translateY: 0, translateX: '-80vw', scale: ['200%', '100%'], duration: 5000},
                {translateY: '-80vh', translateX: '-80vw', scale: ['100%', '200%'], duration: 3000},
                {translateY: '-80vh', translateX: '0vw', scale: ['200%', '100%'], duration: 5000},
                {translateY: 0, translateX: 0,  scale: ['100%', '200%'], duration: 3000},
            ],
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: `.${secondPlanStyles['animationBoxInner-2']}`,
            duration: 14400,
            keyframes: [
                {translateY: 0, translateX: '-70vw', scale: ['100%', '200%'], duration: 3500},
                {translateY: '-70vh', translateX: '-70vw', scale: ['200%', '100%'], duration: 2500},
                {translateY: '-70vh', translateX: '0vw',  scale: ['100%', '200%'],  duration: 3500},
                {translateY: 0, translateX: 0,  scale: ['200%', '100%'], duration: 2500},
            ],
            easing: 'linear',
            loop: true,
        })
    }

    // Init
    if(stageNo === 0) { await startAnimation(); }

}


export {level_start, possibleIconColors};