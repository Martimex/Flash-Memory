import * as Animation from "animejs"

const anime = Animation.default;

async function match(isMatch, cardsOpened_parentNodes, stageNo, levelObject, levelVariables) {
    // Fire some animations when we found / do not found a match
    if(isMatch) {
        anime({
            targets: cardsOpened_parentNodes,
            duration: 1300,
            backgroundColor: 'hsla(45, 50%, 60%, .2)',
            easing: 'easeInExpo',
        })
    }
    else {
       //
    }
}

export {match};