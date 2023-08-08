import * as Animation from "animejs"

const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObject, levelVariables) {

    async function whiteBorders() {
        const a1 = anime({
            targets: target,
            duration: 400,
            borderColor: ['hsl(45, 50%, 80%)'],
        }).finished;

        await Promise.all([a1]);
    }

    async function whiteBordersFade() {
        const targets = document.querySelectorAll('.target');
        
        const a2 = anime({
            targets: targets,
            duration: 1200,
            borderColor: 'hsl(4, 87%, 62%)',
            easing: 'easeOutExpo',
        }).finished;

        await Promise.all([a2]);
    }

    async function runXClick() {
        switch(click_no) {
            case 1: {
                whiteBorders();
                break;
            }
    
            case 2: {
    
                async function chain() {
                    await whiteBorders()
                    await whiteBordersFade();
                }
    
                chain();
                break;
            }
        }
    }

    await runXClick();

}

export {xclick}