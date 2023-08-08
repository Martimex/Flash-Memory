import mainStyles from '../styles/main.module.css';
import * as Animation from "animejs";
const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObj, levelVariables) {

    const secondType = document.querySelectorAll(`.${mainStyles['tileType2']}`);
    const firstType = document.querySelectorAll(`.${mainStyles['tileType1']}`);

    const halfToHide = (click_no%2)? firstType : secondType;
    const halfToShow = (click_no%2)? secondType : firstType;

    halfToHide.forEach(tile => tile.style.pointerEvents = 'none');

    await runXClick(stageNo, click_no, halfToHide, halfToShow, target, levelObj, levelVariables);

}

async function runXClick(stageNo, click_no, halfToHide, halfToShow, target, levelObj, levelVariables) {
    switch(stageNo) {
        case 0: {
            await runXClickOne(click_no, halfToHide, halfToShow, target, levelObj, levelVariables);
            break;
        }

        case 1: {
            await runXClickTwo(click_no, halfToHide, halfToShow, target, levelObj, levelVariables);
            break;
        }
    }
}

async function runXClickOne(click_no, halfToHide, halfToShow, target, levelObj, levelVariables) {

    const secondType = document.querySelectorAll(`.${mainStyles['tileType2']}`);
    const firstType = document.querySelectorAll(`.${mainStyles['tileType1']}`);

    async function chain1() {
        await wait(halfToHide, halfToShow)
            .then(() => {
                secondType.forEach(tile => {
                    tile.style.pointerEvents = 'auto';
                })
            });

    }

    async function chain2() {
        const tile_back = target.querySelector(`.${mainStyles['tile-back_custom']}`);
        const svg = tile_back.querySelector(`svg`);
        if(levelVariables[`wasMatch`]) { showTargetedTileIcon(svg, target); }
        await wait(halfToHide, halfToShow)
            .then(() => {
                firstType.forEach(tile => {
                    tile.style.pointerEvents = 'auto';
                })
            });
    }

    switch(click_no) {
        case 1: {
            chain1();
            break;
        }

        case 2: {
            chain2();
            break;
        }

        default: {
            throw new Error(`Invalid stage no value ! Provided type is: ${typeof(click_no)} and value is: ${click_no}`)
        }
    }
}

async function runXClickTwo(click_no, halfToHide, halfToShow, target, levelObj, levelVariables) {

    const secondType = document.querySelectorAll(`.${mainStyles['tileType2']}`);
    const firstType = document.querySelectorAll(`.${mainStyles['tileType1']}`);

    async function chain1() {
        await wait(halfToHide, halfToShow)
            .then(() => {
                secondType.forEach(tile => {
                    tile.style.pointerEvents = 'auto';
                })
            });
    }

    async function chain2() {
        const tile_back = target.querySelector(`.${mainStyles['tile-back_custom']}`);
        const svg = tile_back.querySelector(`svg`);
        if(levelVariables[`wasMatch`]) { showTargetedTileIcon(svg, target); }
        await wait(halfToHide, halfToShow)
            .then(() => {
                firstType.forEach(tile => {
                    tile.style.pointerEvents = 'auto';
                })
            });
    }

    async function chain3() {
        await wait(halfToHide, halfToShow)
            .then(() => {
                secondType.forEach(tile => {
                    tile.style.pointerEvents = 'auto';
                })
            });
    }

    async function chain4() {
        const tile_back = target.querySelector(`.${mainStyles['tile-back_custom']}`);
        const svg = tile_back.querySelector(`svg`);
        if(levelVariables[`wasMatch`]) { showTargetedTileIcon(svg, target); }
        await wait(halfToHide, halfToShow)
            .then(() => {
                firstType.forEach(tile => {
                    tile.style.pointerEvents = 'auto';
                })
            });
    }

    switch(click_no) {
        case 1: {
            chain1();
            break;
        }

        case 2: {
            chain2();
            break;
        }

        case 3: {
            chain3();
            break;
        }

        case 4: {
            chain4();
            break;
        }

        default: {
            throw new Error(`Invalid stage no value ! Provided type is: ${typeof(click_no)} and value is: ${click_no}`)
        }
    }
}

async function wait(halfToHide, halfToShow) {
    const a1 = anime({
        targets: [halfToHide],
        pointerEvents: ['none'],
        delay: 900,
        duration: 700,
        opacity: 0,
        easing: 'easeOutSine',
    }).finished;

    const a2 = anime({
        targets: [halfToShow],
        pointerEvents: ['auto'],
        delay: 900,
        duration: 800,
        opacity: 1,
        easing: 'easeInSine',
    }).finished;

    await Promise.all([a1, a2]);
}

function showTargetedTileIcon(svg, target) {
    svg.style.opacity = 1;

    anime({
        targets: target,
        duration: 600,
        easing: 'easeOutCubic',
        borderColor: ['#333', 'hsl(51, 44%, 33%)'],
        direction: 'alternate',
    })
}

export {xclick}