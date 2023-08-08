import * as Animation from "animejs";
const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObj) {

    function animateTarget() {
        anime({
            targets: target,
            duration: 5000,
            keyframes: [
                {backgroundImage: ['radial-gradient(hsl(29, 80%, 60%) 20%, hsl(52, 80%, 60%) 45%, hsl(282, 80%, 40%))', 'radial-gradient(hsl(29, 80%, 60%) 20%, hsl(52, 80%, 60%) 45%, hsl(282, 80%, 40%))']},
                {backgroundImage: 'radial-gradient(hsl(52, 80%, 60%) 20%, hsl(29, 80%, 60%) 45%, hsl(282, 80%, 40%))'},
                {backgroundImage: 'radial-gradient(hsl(29, 80%, 60%) 20%, hsl(52, 80%, 60%) 45%, hsl(282, 80%, 40%))'},
                {backgroundImage: 'radial-gradient(hsl(52, 80%, 60%) 20%, hsl(29, 80%, 60%) 45%, hsl(282, 80%, 40%))'},
            ],
            easing: 'linear',
        })
    }

    async function runXClick() {
        switch(click_no) {
            case 1: {
                animateTarget();
                break;
            }
    
            case 2: {
                animateTarget();
                break;
            }
        }
    }

    await runXClick();

}

export {xclick}