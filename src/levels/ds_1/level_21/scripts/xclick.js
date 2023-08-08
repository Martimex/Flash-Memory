import * as Animation from "animejs"

const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObject, levelVariables) {

    function markTileAsOpened(stageNo) {
        if(stageNo === 0) {
            levelVariables.targetedTilesTable[+target.dataset['tileRef']] = levelVariables.targetedTilesTable[+target.dataset['tileRef']] + 1;
        }
        else if(stageNo === 1) {
            levelVariables.targetedTilesTable_no2[+target.dataset['tileRef']] = (levelVariables.targetedTilesTable_no2[+target.dataset['tileRef']] === 0)? levelVariables.targetedTilesTable_no2[+target.dataset['tileRef']] + 1 : levelVariables.targetedTilesTable_no2[+target.dataset['tileRef']] + 2;
        }
    
    }

    async function runXClick() {
        switch(click_no) {
            case 1: {
                markTileAsOpened(stageNo);
                break;
            }
    
            case 2: {
                markTileAsOpened(stageNo);
                break;
            }

            case 3: {
                // Will never happen in stage_1 
                markTileAsOpened(stageNo);
                break;
            }
        }
    }

    await runXClick();

}

export {xclick}