import mainStyles from '../styles/main.module.css';
import firstPlanStyles from '../styles/firstPlan.module.css';
import * as Animation from "animejs";

const anime = Animation.default;

async function match(isMatch, cardsOpened_parentNodes, stageNo, levelObject, levelVariables) {
    // Fire some animations when we found / do not found a match
    if(isMatch) {
        levelVariables.foundTiles += levelObject.uncover[stageNo].count;
        removeSomeDots();
    }
    else {
       //
    }


    function removeSomeDots() {
        const allTiles = document.querySelectorAll(`.${mainStyles['tile_custom']}`);

        if(levelVariables.foundTiles + 10 < levelObject.tiles[stageNo].count) {
            // Remove all visible borders  
            anime({
                targets: allTiles,
                duration: 750,
                borderColor: 'none',
                borderWidth: '0rem',
                easing: 'linear',
            })
        }  else if(levelVariables.foundTiles + 6 > levelObject.tiles[stageNo].count) {
            anime({
                targets: allTiles,
                duration: 1800,
                borderColor: ['hsl(0, 0%, 0%)','hsla(122, 100%, 100%, .55)'],
                borderWidth: ['0rem', '.25rem'],
                easing: 'linear',
            })
        }   else  {
            // Help finding tiles
            let helpArr = [];
            allTiles.forEach(tile => { if(tile.style.visibility !== 'hidden') {
                helpArr.push(tile);
            }})

            let rand = Math.floor(Math.random() * helpArr.length);
            let rand2 = Math.floor(Math.random() * helpArr.length);
            let helpTile = helpArr[rand];
            let helpTile2 = helpArr[rand2];

            anime({
                targets: [helpTile, helpTile2],
                duration: 1800,
                borderColor: ['hsl(0, 0%, 0%)','hsla(122, 100%, 100%, .55)'],
                borderWidth: ['0rem', '.25rem'],
                easing: 'linear',
            })
        }
        
        // Remove 2 dots from the map

        const firstPlanContainer = document.querySelector(`.${firstPlanStyles['firstPlan_custom']}`);
        const time = 1800;

        async function fade() {
            await anime({
                targets: [`.${firstPlanStyles['glowing-dot']}:nth-of-type(1)`, `.${firstPlanStyles['glowing-dot']}:nth-of-type(2)`],
                duration: time,
                easing: 'linear',
                opacity: [1, 0],
            }).finished;

            // 1 pair = 2 dots  - EXECUTE ORDER STRICTLY IMPORTANT !
            firstPlanContainer.querySelector(`.${firstPlanStyles['glowing-dot']}:nth-of-type(2)`).remove();
            firstPlanContainer.querySelector(`.${firstPlanStyles['glowing-dot']}:nth-of-type(1)`).remove();
        }

        fade();
    }
}

export {match};