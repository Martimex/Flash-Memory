import mainStyles from '../styles/main.module.css';
import * as Animation from "animejs"
const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObject, levelVariables) {


    async function runXClick() {
        switch(click_no) {
            case 1: {
                if(levelVariables.isFirstBountyPairTrigerred === false) { markBountyQuestAnswer();}
                resetBountyReward();
                rotateChosenTile();;
                break;
            }
    
            case 2: {
                rotateChosenTile();
                break;
            }
        }
    }

    function markBountyQuestAnswer() {
        // ALSO OUR FIRST TILE SHOULD CONTAIN CLASS OF 'bounty-q'
        if(!target.classList.contains(`${mainStyles['bounty-q']}`) || levelVariables.foundTiles > 0) { return; }
        
        // Change fBPTrigger to true, because this function should fire only once 
        levelVariables.isFirstBountyPairTrigerred = true;

        const bounty = document.querySelector(`.${mainStyles['bounty-q']}`);
        const bountyBack = bounty.querySelector(`.${mainStyles['tile-back_custom']}`);
        const allTiles = document.querySelectorAll(`.${mainStyles['tile_custom']}`);
        let bountyAnswer = [];

        allTiles.forEach(tile => {
            if((!(tile.classList.contains(`${mainStyles['bounty-q']}`))) && (bountyBack.childNodes[0].classList[1] === tile.querySelector(`.${mainStyles['tile-back_custom']}`).childNodes[0].classList[1])) {
                bountyAnswer.push(tile);
            }
        })

        anime({
            targets: bountyAnswer[0],
            duration: 1200,
            borderColor: ['#a7c', 'hsl(122, 30%, 30%)'],
            borderWidth: '.35rem',
            easing: 'linear',
        })
    }

    function rotateChosenTile() {

        const random = Math.floor(Math.random() * 2);

        if(random%2) { 
            anime({
                targets: target,
                duration: 300, /* For this to not interrupt main tileShow animation, this has to be set to something low, as 400 ms */
                rotate: `-90`,
                easing: 'easeOutSine',
            })
        }

        else { 
            anime({
                targets: target,
                duration: 300, /* For this to not interrupt main tileShow animation, this has to be set to something low, as 400 ms */
                rotate: `90`,
                easing: 'easeOutSine',
            })
        }
    }

    function resetBountyReward() {
        levelVariables.STATIC['EXTRATURNS_MODIFIER'] = 1;
    }

    await runXClick();
}

export {xclick}