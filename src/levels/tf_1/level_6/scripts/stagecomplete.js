import * as Animation from "animejs";
const anime = Animation.default;

async function stagecomplete(stageNo) {

    let game = document.querySelector('.background');

    async function init() {
        await fadeScreen()
    }

    async function fadeScreen() {
        const a1 = anime({
            targets: game,
            duration: 400,
            opacity: .85,
            easing: 'linear',
        }).finished;

        await Promise.all([a1]);
    }

    // Fire
   await init();
}

export {stagecomplete};