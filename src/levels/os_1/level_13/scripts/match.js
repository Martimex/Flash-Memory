import mainStyles from '../styles/main.module.css';
import bgStyles from '../styles/bg.module.css';
import * as Animation from "animejs"

const anime = Animation.default;

async function match(isMatch, cardsOpened_parentNodes, stageNo, levelObject, levelVariables) {
    
    // Global query for background
    const background_q = document.querySelector(`.${bgStyles['background_custom']}`);
    
    // Fire some animations when we found / do not found a match
    async function asyncMatchHide() {

        // Reset notFoundStreak back to 0
        if(levelVariables.notFoundStreak > levelVariables.notFoundAllowed) {

            // A night, dimmed background appeared - animate scenario and set secret_solved to false (Failed !)
            levelVariables.secret_solved = false;

            anime({
                targets: background_q,
                duration: 1000,
                filter: ['brightness(50%) saturate(50%)', 'brightness(100%) saturate(100%)'],
                easing: 'linear',
            })
        }

        levelVariables.notFoundStreak = 0;
        levelVariables.STATIC.EXTRATURNS_MODIFIER = 1;

        await anime({
            targets: cardsOpened_parentNodes,
            duration: 500,
            borderWidth: '1.5rem',
            filter: ['invert(0%)', 'invert(30%)'],
            opacity: [1, .6],
            easing: 'easeInExpo',
        }).finished;

        await anime({
            targets: cardsOpened_parentNodes,
            duration: 150,
            opacity: [.6, 0],
            easing: 'linear',
        }).finished;
    }

    if(isMatch) {
        asyncMatchHide();
    }
    else {
        // Player did not find a match. Increase notFoundStreak by 1 
        levelVariables.notFoundStreak += 1;

        if(levelVariables.notFoundStreak > levelVariables.notFoundAllowed) {
            
            if(levelVariables.notFoundStreak === levelVariables.notFoundAllowed + 1) {
                // Apply this animation ONLY if we are the first time exceeding the allowed streak
                anime({
                    targets: background_q,
                    duration: 1000,
                    filter: ['brightness(100%) saturate(100%)', 'brightness(50%) saturate(50%)'],
                    easing: 'linear',
                })
            }
            
            levelVariables.STATIC.EXTRATURNS_MODIFIER =  (1 + levelVariables.notFoundStreak) - levelVariables.notFoundAllowed;

            const aContainer = document.querySelector(`.${mainStyles['aContainer_custom']}`);

            const decreaseBox = document.createElement('div');
            decreaseBox.textContent = `-${levelVariables.STATIC.EXTRATURNS_MODIFIER}`;
            decreaseBox.classList.add(mainStyles['turn-decrease-box']);
            aContainer.appendChild(decreaseBox);
            const decreaseBoxQuery = aContainer.querySelector(`.${mainStyles['turn-decrease-box']}`);
            const [gdTurns_Top, gdTurns_Left] = [document.querySelector(`.${mainStyles['gd-turns_custom']}`).getBoundingClientRect().y, document.querySelector(`.${mainStyles['gd-turns_custom']}`).getBoundingClientRect().x];
            decreaseBoxQuery.style.setProperty('top', `${gdTurns_Top + (+document.querySelector(`.${mainStyles['gd-turns_custom']}`).getBoundingClientRect().height / 2)}px`);
            decreaseBoxQuery.style.setProperty('left', `${gdTurns_Left + (+document.querySelector(`.${mainStyles['gd-turns_custom']}`).getBoundingClientRect().width / 1.25)}px`);
    
            animateAsync(aContainer);
    
            async function animateAsync(aContainer) {
                const decreaseBox = aContainer.querySelector(`.${mainStyles['turn-decrease-box']}`);
    
                await anime({
                    targets: decreaseBox,
                    duration: 700,
                    translateY: '1.2rem',
                    opacity: [1, 0],
                    easing: 'linear',
                }).finished;
    
                decreaseBox.remove();
            }
        }
    }
}

export {match};