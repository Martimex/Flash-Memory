import * as Animation from "animejs"
import mainStyles from '../styles/main.module.css';
import bgStyles from '../styles/bg.module.css';

const anime = Animation.default;

async function level_start(stageNo, time, tileShowTime, levelObject, levelVariables) {

    async function startAnimation() {
        addTileIdentifiers()
        applyColorfulClasses()
        await makeTilesVisible()
        await showTiles()
        await hideTiles()
    }

    function addTileIdentifiers() {
        // 1. Adding special identifiers for the level tiles & filling the targetedTilesTable with initial 0 - representing reveal count for a given tile
        const allTiles = document.querySelectorAll(`.${mainStyles['tile_custom']}`);
        allTiles.forEach((tile, ind) => { tile.dataset['tileRef'] = ind });
        // 2. Currently, set the TURNS MODIFIER to the basic value (1) :
        levelVariables.STATIC.EXTRATURNS_MODIFIER = 1;
    }

    function applyColorfulClasses() {
        let divideNum = +levelObject[`board`][stageNo].columns;
        const allTiles = document.querySelectorAll(`.${mainStyles['tile_custom']}`);
        allTiles.forEach((tile, index) => {
            if(index%divideNum < (divideNum/3)) {
                tile.classList.add(mainStyles['tile-brown']);
            }
            else if(index%divideNum >= ((divideNum * 2)/3)) {
                tile.classList.add(mainStyles['tile-gold']);
            }
            else {
                tile.classList.add(mainStyles['tile-silver']);
            }
        })
    }

    async function loadBackgroundSVG() {
        document.querySelector(`.${bgStyles['background_custom']}`).style.backgroundImage = `url('./bgs/os_1/bg-13.svg')`;
    }

    async function makeTilesVisible() {
        await anime({
            targets: `.${mainStyles['tile_custom']}`,
            duration: 250,
            delay: anime.stagger(75, {from: 'center'}),
            opacity: [0, 1],
            easing: 'easeOutSine',
        }).finished;
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
    if(stageNo === 0) {
        loadBackgroundSVG();
        await startAnimation();
    }

}


export {level_start};