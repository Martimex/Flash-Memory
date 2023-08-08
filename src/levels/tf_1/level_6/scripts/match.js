import * as Animation from "animejs";
const anime = Animation.default;

async function match(isMatch, cardsOpened_parentNodes, stageNo, levelObject) {
    // Fire some animations when we found / do not found a match
    if(isMatch) {
        anime({
            targets: cardsOpened_parentNodes,
            duration: 1800,
            filter: ['brightness(60%)'],
            backgroundImage: ['radial-gradient(hsl(52, 80%, 60%) 20%, hsl(29, 80%, 60%) 45%, hsl(282, 80%, 40%))', 'radial-gradient(hsl(67, 80%, 60%) 20%, hsl(44, 80%, 60%) 45%, hsl(297, 80%, 60%))'],
            easing: 'easeOutExpo',
        })
    }
    else {
       //
    }
}

export {match};