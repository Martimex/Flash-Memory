import styles_firstPlan from './styles/firstPlan.module.css';
import styles_secondPlan from './styles/secondPlan.module.css';

function generateItems(fpClass, spClass, stageNo, levelObject) {
    generateFirstPlanItems(fpClass, stageNo, levelObject);
    generateSecondPlanItems(spClass, stageNo, levelObject);
}

function generateFirstPlanItems(fpClass, stageNo, levelObject) {
    const firstPlan = document.querySelector(`.${fpClass}`);

    if(stageNo === 0) {
        for(let i=0; i<levelObject.tiles[stageNo].count; i++) { //  it stands for number of pairs
            let dot = document.createElement('div');
            dot.classList.add(`${styles_firstPlan['glowing-dot']}`, `${styles_firstPlan[`glowing-${(i+1)%4}`]}`);
            firstPlan.appendChild(dot);
    
            let topv = Math.floor( Math.random() * 80) + 10; // 10 to 90
            let leftv = Math.floor( Math.random() * 80) + 10; // 10 to 90
    
            dot.setAttribute('style', `top:${topv}%;left:${leftv}%;`);
        }
    }

}

function generateSecondPlanItems(spClass, stageNo, levelObject) {
    const secondPlan = document.querySelector(`.${spClass}`);
}

export {generateItems};