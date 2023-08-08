import mainStyles from '../styles/main.module.css';
import * as Animation from "animejs"

const anime = Animation.default;

async function level_start(stageNo, time, tileShowTime, levelObject, levelVariables) {

    async function startAnimation() {
        if(stageNo === 0 || stageNo === 1) {
            await prepareExtraStyling(stageNo)
            await showTiles()
            await hideTiles()
            await addTileBackGlow(stageNo)
            await prepareGameplay(stageNo);
        }

    }

    async function prepareExtraStyling(stageNo) {
        const allTiles = document.querySelectorAll(`.${mainStyles['tile_custom']}`);
        allTiles.forEach((tile, ind) => ind%2 && tile.classList.add(`${mainStyles[stageNo === 0? 'tile-color-2' : 'radial-color-2']}`));
    }

    async function addTileBackGlow(stageNo) {
        const allTilesBack = document.querySelectorAll(`.${mainStyles['tile-back_custom']}`);
        allTilesBack.forEach((tile_back, ind) => tile_back.classList.add(`${mainStyles[stageNo === 0? `tile-back--glow-${(ind % 2)? 1 : 2}` : `tile-back--radial-glow-${(ind % 2)? 1 : 2}`]}`))
    }

    async function prepareGameplay(stageNo) {
        // 1. Adding special identifiers for the level tiles & filling the targetedTilesTable with initial 0 - representing reveal count for a given tile
        const allTiles = document.querySelectorAll(`.${mainStyles['tile_custom']}`);
        allTiles.forEach((tile, ind) => {
            tile.dataset['tileRef'] = ind;
            (stageNo === 0)? levelVariables.targetedTilesTable.push(0) : levelVariables.targetedTilesTable_no2.push(0);

        });
        // 2. Currently, set the TURNS MODIFIER to the basic value (1) :
        levelVariables.STATIC.EXTRATURNS_MODIFIER = 1;
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
    await startAnimation();
}


export {level_start};