import * as Animation from "animejs"

const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObject, levelVariables) {

    async function clickAnimation() {
        await anime({
            targets: target,
            duration: 400,
            scale: .8,
            easing: 'easeOutSine',
        }).finished;
    }

    async function runXClick() {
        clickAnimation();
    }

    await runXClick();

}

export {xclick}