import bgStyles from '../styles/bg.module.css';
import mainStyles from '../styles/main.module.css';
import firstPlanStyles from '../styles/firstPlan.module.css';
import * as Animation from "animejs"
const anime = Animation.default;

async function level_start(stageNo, time, tileShowTime, levelObj) {

    async function startAnimation() {
        await showTiles()
        await hideTiles()
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

    const bg = document.querySelector(`.${bgStyles['background_custom']}`);
    const board = document.querySelector(`.${bgStyles['board_custom']}`);
    const oddTiles = board.querySelectorAll(`.${mainStyles['tile_custom']}:nth-of-type(odd)`);
    const evenTiles = board.querySelectorAll(`.${mainStyles['tile_custom']}:nth-of-type(even)`);

    // Run infinite background animation

    anime({
        targets: bg,
        duration: +levelObj.limitations[stageNo].time * 1000,
        filter: ['hue-rotate(0deg) contrast(80%) brightness(125%)', 'hue-rotate(240deg) contrast(80%) brightness(125%)'],
        easing: 'linear',
    })

    anime({
        targets: evenTiles,
        duration: 9000,
        background: [`linear-gradient(90deg, hsla(252, 50%, 40%, .6), hsla(142, 80%, 30%, .6))`, `linear-gradient(90deg, hsla(142, 80%, 30%, .6), hsla(252, 50%, 40%, .6))`],
        direction: 'alternate',
        easing: 'linear',
        loop: true,
    })

    anime({
        targets: oddTiles,
        duration: 7500,
        background: [`linear-gradient(90deg, hsla(142, 80%, 30%, .6), hsla(252, 50%, 40%, .6))`, `linear-gradient(90deg, hsla(252, 50%, 40%, .6), hsla(142, 80%, 30%, .6))`],
        direction: 'alternate',
        easing: 'linear',
        loop: true,
    })

    anime({
        targets: [`.${firstPlanStyles['powerball']}`],
        duration: 6200,
        delay: anime.stagger(930),
        keyframes: [
            {translateY: '0%', opacity: 0, scale: 1, rotate: 0},
            {translateY: '30%', opacity: 0.2, scale: 2, roatate: 120},
            {translateY: '60%', opacity: .8,  scale: 1, rotate: 240},
            {translateY: '45%', rotate: 360, scale: 1.4},
        ],
        loop: true,
        direction: 'alternate',
        easing: 'linear',
    })
    
    anime({
        targets: [`.${firstPlanStyles['lantern-1']}`, `.${firstPlanStyles['lantern-2']}`],
        delay: 1800,
        duration: 5500,
        scale: [.4, 1],
        opacity: [0, 1],
        rotate: ['0deg', '90deg'],
        borderColor: ['hsl(222, 40%, 50%)', 'hsl(252, 50%, 60%)'],
        translateX: ['0rem', '-5rem'],
        saturate: ['100%', '50%'],
        easing: 'linear',
        direction: 'alternate',
        loop: true,
    })
}

export {level_start};