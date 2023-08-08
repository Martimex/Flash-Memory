import * as Animation from "animejs";
import mainStyles from "../styles/main.module.css";
const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObj) {

    async function waterTile() {
        target.classList.toggle(mainStyles['dark-bubble']);

        const a1 = anime({
            targets: target,
            duration: 1000,
            backgroundImage: ['radial-gradient(hsl(212, 40%, 30%), hsl(232, 40%, 30%))', 'radial-gradient(hsl(232, 40%, 30%), hsl(212, 40%, 30%))'],
        }).finished;

        await Promise.all([a1]);
    }

    async function unWaterTile() {
        const targets = document.querySelectorAll('.target');

        const a2 = anime({
            targets: targets,
            duration: 2000,
            backgroundImage: ['radial-gradient(hsl(232, 40%, 30%), hsl(212, 40%, 30%))', 'radial-gradient(hsl(212, 40%, 30%), hsl(232, 40%, 30%))'],
            borderColor: 'hsla(199, 60%, 52%, .8)',
            easing: 'linear',
        }).finished;

        await Promise.all([a2]);
    }

    async function initXClick() {
        switch(click_no) {
            case 1: {
                waterTile();
                break;
            }
    
            case 2: {
    
                async function chain() {
                    await waterTile()
                    await unWaterTile()
                }
    
                chain();
                break;
            }
        }
    }
    
    await initXClick();
}

export {xclick}