import bgStyles from '../styles/bg.module.css';
import * as Animation from "animejs";

const anime = Animation.default;

async function stagecomplete(stageNo, isLevelCompleted, levelObj) {

    let game = document.querySelector(`.${bgStyles['background_custom']}`);

    async function init() {
        await fadeScreen()
    }

    async function fadeScreen() {

        const bg = document.querySelector(`.${bgStyles['background_custom']}`);

        anime.remove(bg);

        const a1 = anime({
            targets: game,
            duration: 2000,
            opacity: .75,
            easing: 'easeInQuad',
            filter: 'hue-rotate(360deg) contrast(80%) brightness(125%)',
        }).finished;

        await Promise.all([a1]);
    }

    // Fire
   await init();
}

export {stagecomplete};