import bgStyles from '../styles/bg.module.css';
import * as Animation from "animejs"
const anime = Animation.default;


async function stagecomplete(stageNo, isLevelWin, levelObject, levelVariables) {

    const background_q = document.querySelector(`.${bgStyles['background_custom']}`);

    async function init() {
        if(stageNo === 0) {
            await fadeScreen()
        }
    }

    async function fadeScreen() {
        const a1 = anime({
            targets: background_q,
            duration: 700,
            filter: 'brightness(125%) saturate(110%)',
            easing: 'linear',
        }).finished;

        await Promise.all([a1]);
    }

    // Fire
    await init();
}

export {stagecomplete};