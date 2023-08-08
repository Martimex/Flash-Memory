import bgStyles from '../styles/bg.module.css';
import firstPlanStyles from '../styles/firstPlan.module.css';
import * as Animation from "animejs"
const anime = Animation.default;


async function stagecomplete(stageNo, isLevelWin, levelObject, levelVariables) {

    let game = document.querySelector(`.${bgStyles['background_custom']}`);

    async function init() {
        if(stageNo === 0) {
            const bgSepiaSwitch = anime({
                targets: game,
                duration: 1200,
                endDelay: 200,
                filter: ['sepia(0%) brightness(100%)', 'sepia(75%) brightness(110%)'],
                easing: 'linear',
            }).finished;

            const wallLeftMove = anime({
                targets: `.${firstPlanStyles['fw-left']}`,
                duration: 1200,
                width: ['0%', '50%'],
                opacity: [0, 1],
                easing: 'linear',
            }).finished;

            const wallRightMove = anime({
                targets: `.${firstPlanStyles['fw-right']}`,
                duration: 1200,
                width: ['0%', '50%'],
                opacity: [0, 1],
                easing: 'linear',
            }).finished;

            await Promise.all([bgSepiaSwitch, wallLeftMove, wallRightMove]);
        }
    }

    // Fire
    await init();
}

export {stagecomplete};