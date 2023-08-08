import * as Animation from "animejs"

const anime = Animation.default;

async function match(isMatch, cardsOpened_parentNodes, stageNo) {
    // Fire some animations when we found / do not found a match

    async function matchAnimation() {
        if(isMatch) {
            const a1 = anime({
                targets: cardsOpened_parentNodes,
                duration: 750,
                borderRadius: '30%',
                saturate: 1.5,
                scale: [1, .85],
                easing: 'easeInOutSine',
            }).finished;
            await Promise.all([a1]);
        }
        else {
           //
        }
    }
   

    matchAnimation();
}

export {match};