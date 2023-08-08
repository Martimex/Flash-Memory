import bgStyles from '../styles/bg.module.css';
import mainStyles from '../styles/main.module.css';
import firstPlanStyles from '../styles/firstPlan.module.css';
import * as Animation from "animejs";
const anime = Animation.default;

async function level_start(stageNo, time, tileShowTime) {

    async function startAnimation() {
        await showTiles()
        await hideTilesAndShowTornados()
            .then(() => { rotateTornados(); rotateBoard(); })
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

    async function hideTilesAndShowTornados() {
        const a2 = anime({
            targets: `.${mainStyles['tile_custom']}`,
            duration: time,
            delay: tileShowTime,
            transitionProperty: 'all',
            rotateY: '0deg',
            easing: 'linear',
            loop: false,
        }).finished;

        const allTornados = document.querySelectorAll(`.${firstPlanStyles['tornado']}`);

        const a3 = anime({
            targets: allTornados,
            duration: 1200,
            delay: anime.stagger(350),
            easing: 'easeInExpo',
            opacity: [0, 1],
        }).finished;

        await Promise.all([a2, a3]);
    }

    function rotateTornados() {
        anime({
            targets: `.${firstPlanStyles['tornado-1']}`,
            duration: 4800,
            rotate: 360,
            easing: 'linear',
            direction: 'alternate',
            loop: true,
        })

        anime({
            targets: `.${firstPlanStyles['tornado-2']}`,
            duration: 6200,
            rotate: -360,
            easing: 'linear',
            direction: 'alternate',
            loop: true,
        })

        anime({
            targets: `.${firstPlanStyles['tornado-3']}`,
            duration: 6200,
            rotate: -360,
            easing: 'linear',
            direction: 'alternate',
            loop: true,
        })

        anime({
            targets: `.${firstPlanStyles['tornado-4']}`,
            duration: 4800,
            rotate: 360,
            easing: 'linear',
            direction: 'alternate',
            loop: true,
        })
    }

    function rotateBoard() {

        let board = document.querySelector(`.${bgStyles['board_custom']}`);

        anime({
            targets: board,
            duration: 12000,
            keyframes:[
                {rotate: [0, 90], easing: 'easeOutExpo', delay: 500},
                {rotate: [90, 180], easing: 'easeInExpo'},
                {rotate: [180, 270], easing: 'easeOutExpo'},
                {rotate: [270, 360], easing: 'easeInExpo'},
            ],
            direction: 'alternate',
            loop: true,
        });
    }

    // Init
    await startAnimation();
}


export {level_start};