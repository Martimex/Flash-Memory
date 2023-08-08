import secondPlanStyles from '../styles/secondPlan.module.css';
import firstPlanStyles from '../styles/firstPlan.module.css';
import * as Animation from "animejs"
const anime = Animation.default;


async function stagecomplete(stageNo, isLevelWin, levelObject, levelVariables) {

    async function init() {
        if(stageNo === 0) {
            await SplashBoxes()
        }
    }

    async function SplashBoxes() {
        const a0 = anime({
            targets: [`.${secondPlanStyles['animationBox']}`, `.${secondPlanStyles['animationBoxInner']}`],
            duration: /* 12200 */ 2400,
            keyframes: [
                {scale: ['100%', '125%'], duration:  600, easing: 'easeInQuint'},
                {scale: ['125%', '0%'], rotate: ['0deg', '275deg'], opacity: [1, 0], duration: 1200, endDelay: 900},
                {opacity: [0, 1], duration: 550},
            ],
        }).finished;

        const a1 = anime({
            targets:  [`.${firstPlanStyles['match-info-container']}`],
            duration: 550,
            delay: anime.stagger(275),
            scale: [1, 0],
            easing: 'easeInSine',
        }).finished;

        await Promise.all([a0, a1]);
    }

    // Fire
    await init();
}

export {stagecomplete};