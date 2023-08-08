import bgStyles from '../styles/bg.module.css';
import * as Animation from "animejs";
const anime = Animation.default;

async function match(isMatch, cardsOpened_parentNodes, stageNo, levelObject, levelVariables) {
    // Fire some animations when we found / do not found a match


    if(isMatch) {
        levelVariables[`wasMatch`] = true;

        if(stageNo === 1) {
            // If we are inside second stage of the gameplay
            const background = document.querySelector(`.${bgStyles['background_custom']}`);
            
            // sync
            anime({
                targets: background,
                duration: 1400,
                filter: ['saturate(100%) hueRotate(0deg)', 'saturate(130%) hueRotate(40deg)'],
                easing: 'easeOutExpo',
                direction: 'alternate',
            })
        }
    }
    else {
        levelVariables[`wasMatch`] = false;

        if(stageNo === 1) {
            // If we are inside second stage of the gameplay
            const background = document.querySelector(`.${bgStyles['background_custom']}`);
            
            // sync
            anime({
                targets: background,
                duration: 1400,
                filter: ['saturate(100%) sepia(0%)', 'saturate(30%) sepia(40%)'],
                easing: 'easeOutExpo',
                direction: 'alternate',
            })
        }
    }
}

export {match};