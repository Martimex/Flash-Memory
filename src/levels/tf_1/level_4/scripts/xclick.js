import * as Animation from "animejs";
const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObj) {

    const targets = document.querySelectorAll('.target');

    async function colorTargetShadow() {
        const a1 = anime({ 
            targets: target,
            duration: 700,
            boxShadow: ['.35rem -.35rem .5rem .15rem hsla(142, 0%, 0%, .7)', '.35rem -.35rem .5rem .15rem hsla(44, 50%, 50%, .7)'],
            easing: 'easeInSine',
        }).finished;

        await Promise.all([a1]);
    }

    async function runXClick() {
        switch(click_no) {
            case 1: {
                colorTargetShadow();
                break;
            }
    
            case 2: {
    
                async function chain() {
                    await colorTargetShadow()
                    await removeColorShadow();
                }

                async function removeColorShadow() {
                    const a2 = anime({
                        targets: targets,
                        duration: 700,
                        boxShadow: ['.35rem -.35rem .5rem .15rem hsla(44, 50%, 50%, .7)', '.35rem -.35rem .5rem .15rem hsla(142, 0%, 0%, .7)'],
                        easing: 'linear',
                    }).finished;

                    await Promise.all([a2]);
                }
    
                chain();
                break;
            }
        }
    }

    await runXClick();

}

export {xclick}