import bgStyles from '../styles/bg.module.css';
import mainStyles from '../styles/main.module.css';
import secondPlanStyles from '../styles/secondPlan.module.css';
import * as Animation from "animejs"
const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObject, levelVariables) {

    async function changeAllIconsColors() {
        levelVariables.iconsColoring['usedTurnsCount'] += 1;
        if(levelVariables.iconsColoring['usedTurnsCount'] % levelVariables.iconsColoring['turnsForColorChange'] === 0) {
            
            const lv_background = document.querySelector(`.${bgStyles['background_custom']}`);
            levelVariables.iconsColoring['bgHueRotateDeg'] = levelVariables.iconsColoring['bgHueRotateDeg'] + (Math.floor(Math.random() * 40) + 40);

            await anime({
                targets: lv_background,
                duration: 350,
                filter: `hue-rotate(${levelVariables.iconsColoring['bgHueRotateDeg']}deg)`,
                easing: 'linear',
            }).finished;

            const allTilesBack = document.querySelectorAll(`.${mainStyles['tile-back_custom']}`);

            await anime({
                targets: allTilesBack,
                duration: 350,
                filter: `brightness(130%) saturate(120%) hue-rotate(-${levelVariables.iconsColoring['bgHueRotateDeg']}deg)`,
                easing: 'linear',
            }).finished;
            
        }
    }

    function colorAnimationBoxes(click_no) {
        let targetTile;
        let selector;
        if(click_no === 1) {  // Jeśli kolorujemy większe pudełko
            if(levelVariables.iconsColoring['usedTurnsCount'] % 2 > 0) {  // Jeśli to jest pierwsza, lub każda nieparzysta tura
                targetTile = document.querySelector('.target-1');
                selector = `.${secondPlanStyles['animationBox-1']}`;
            }
            else {
                targetTile = document.querySelector('.target-1');
                selector = `.${secondPlanStyles['animationBox-2']}`;
            }
        }

        else if(click_no === 2) {
            if(levelVariables.iconsColoring['usedTurnsCount'] % 2 > 0) {
                targetTile = document.querySelector('.target-2');
                selector = `.${secondPlanStyles['animationBoxInner-1']}`;
            }
            else {
                targetTile = document.querySelector('.target-2');
                selector = `.${secondPlanStyles['animationBoxInner-2']}`;
            }
        }

        let newColor = targetTile.querySelector(`.${mainStyles['tile-back_custom']}`);
        let color = newColor.style.color;

        anime({
            targets: selector,
            duration: 2000,
            backgroundImage:  `radial-gradient( hsla(29, 80%, 0%, 0%) 35%,  ${color})`,
            filter: `hue-rotate(-${levelVariables.iconsColoring['bgHueRotateDeg']}deg)`,
            loop: false,
            easing: 'linear',
        })
    }

    async function runXClick() {
        switch(click_no) {
            case 1: {
                changeAllIconsColors();
                colorAnimationBoxes(click_no);
                break;
            }
    
            case 2: {
    
                async function chain() {
                    colorAnimationBoxes(click_no);
                }
    
                chain();
                break;
            }
        }
    }

    await runXClick();

}

export {xclick}