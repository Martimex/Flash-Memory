import * as Animation from "animejs"
import mainStyles from '../styles/main.module.css';

const anime = Animation.default;

async function level_start(stageNo, time, tileShowTime, levelObject, levelVariables) {

    async function startAnimation() {
        await animateTilesMove();
    }

    async function animateTilesMove() {
        await anime({
            targets: `.${mainStyles['tile_custom']}`,
            duration: 800,
            delay: anime.stagger(200, {from: 'center'}),
            opacity: [0, 1],
            translateX: function(el, i, l) {
                return [`${(i%2? -2  : 2) - ((Math.floor(Math.random()) * 40))}rem`, '0rem'];
            },
            translateY: function(el, i, l) {
                return [`${(i%2? -2  : 2) - ((Math.floor(Math.random()) * 40))}rem`, '0rem'];
            },
            easing: 'linear',
        }).finished;
    }

    // Init
    await startAnimation();
}


export {level_start};