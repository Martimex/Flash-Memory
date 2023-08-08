import globalStyles from '../../../../global/global_styles.module.css';
import * as Animation from "animejs";
const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObj) {

    function reduceOpacity() {
        const targets = document.querySelectorAll(`.target`);
        const delayCount = +levelObj[`tile_animation`][stageNo][`compareTime`];
        anime({
            targets: targets,
            delay: delayCount,
            duration: 1000,
            easing: 'linear',
            opacity: .4,
        })
    }

    async function runXClick() {
        switch(click_no) {
            case 1: {
                
                break;
            }
    
            case 2: {
                reduceOpacity();
                break;
            }
        }
    }

    await runXClick();

}

export {xclick}