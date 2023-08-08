import mainStyles from '../styles/main.module.css';
import * as Animation from "animejs";

const anime = Animation.default;

async function match(isMatch, cardsOpened_parentNodes, stageNo, levelObject, levelVariables) {
    // Fire some animations when we found / do not found a match
    if(isMatch) {
        anime({
            targets: cardsOpened_parentNodes,
            duration: 1300,
            backgroundColor: 'hsla(45, 50%, 60%, .2)',
            easing: 'easeInExpo',
        })
        levelVariables.STATIC.EXTRATURNS_MODIFIER = 1;
    }
    else {
        if(stageNo === 0 || stageNo === 1) { runMatchFail(stageNo); }

        function runMatchFail(stageNo) {
            const aContainer = document.querySelector(`.${mainStyles['aContainer_custom']}`);

            if(stageNo === 0) {
                const cardsOpened_tileFronts = cardsOpened_parentNodes.map((el => el.querySelector(`.${mainStyles['tile-front_custom']}`)));
                anime({
                    targets: cardsOpened_tileFronts,
                    duration: 800,
                    opacity: 1,
                    easing: 'linear',
                })
            }
            
            levelVariables.STATIC.EXTRATURNS_MODIFIER = (stageNo === 0)? 
                Array.from(cardsOpened_parentNodes).map((cardOpened => levelVariables.targetedTilesTable[[+cardOpened.dataset['tileRef']]])).reduce((acc, val) => +acc + +val, 0)
                :
                Array.from(cardsOpened_parentNodes).map((cardOpened => levelVariables.targetedTilesTable_no2[[+cardOpened.dataset['tileRef']]])).reduce((acc, val) => +acc + +val, 0)
            ;
            const turnsPerTile = (stageNo === 0)? 
                [...cardsOpened_parentNodes].map((tile, ind) => levelVariables.targetedTilesTable[+tile.dataset['tileRef']])
                :
                [...cardsOpened_parentNodes].map((tile, ind) => levelVariables.targetedTilesTable_no2[+tile.dataset['tileRef']])
            ;
            
            for(let i=0; i<turnsPerTile.length; i++) {
                const decreaseBox = document.createElement('div');
                decreaseBox.textContent = `-${turnsPerTile[i]}`;
                decreaseBox.classList.add(mainStyles['turn-decrease-box']);
                decreaseBox.dataset.ref = `ref-${i}`;
                aContainer.appendChild(decreaseBox);
                console.log(cardsOpened_parentNodes[i].getBoundingClientRect());
                const decreaseBoxQuery = aContainer.querySelector(`div[data-ref='ref-${i}']`);
                const [currentCardOpened_Top, currentCardOpened_Left] = [cardsOpened_parentNodes[i].getBoundingClientRect().y, cardsOpened_parentNodes[i].getBoundingClientRect().x];
                decreaseBoxQuery.style.setProperty('top', `${currentCardOpened_Top}px`);
                decreaseBoxQuery.style.setProperty('left', `${currentCardOpened_Left}px`);
            }
    
            animateAsync(aContainer);
    
            async function animateAsync(aContainer) {
                const allDecreaseBoxes = aContainer.querySelectorAll(`.${mainStyles['turn-decrease-box']}`);
    
                await anime({
                    targets: allDecreaseBoxes,
                    duration: 900,
                    delay: anime.stagger(150),
                    translateY: '-2rem',
                    opacity: [1, 0],
                    easing: 'linear',
                }).finished;
    
                allDecreaseBoxes.forEach((el) => el.remove());
            }
        }

    }
}

export {match};