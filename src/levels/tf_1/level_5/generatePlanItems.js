import styles_firstPlan from './styles/firstPlan.module.css';

function generateItems(fpClass, spClass, stageNo) {
    generateFirstPlanItems(fpClass, stageNo);
    generateSecondPlanItems(spClass, stageNo);
}

const glowingColors = [
    `green`, 
    `yellow`,
    `blue`,
    `violet`,
]

function generateFirstPlanItems(fpClass, stageNo) {
    const firstPlan = document.querySelector(`.${fpClass}`);

    if(stageNo === 0) {
        for(let i=0; i<60; i++) {
            let dot = document.createElement('div');
            let topv = Math.floor(Math.random()*90)+1;
            let leftv = Math.floor(Math.random()*90)+1;
            dot.classList.add(`${styles_firstPlan['dot-g']}`, `${styles_firstPlan[`version--${glowingColors[i % glowingColors.length]}`]}`);
            dot.setAttribute('style', `top:${topv}%;left:${leftv}%;`);
            firstPlan.appendChild(dot);
        }

        // Create yet invisible glowing dots (will be visible after passing the first stage)
        for(let i=0; i<40; i++) {
            let dot = document.createElement('div');
            let topv = Math.floor(Math.random()*90)+1;
            let leftv = Math.floor(Math.random()*90)+1;
            dot.classList.add(`${styles_firstPlan['dot-invisible']}`, `${styles_firstPlan['dot-g']}`, `${styles_firstPlan[`version--${glowingColors[i % glowingColors.length]}--invis`]}`);
            dot.setAttribute('style', `top:${topv}%;left:${leftv}%;`);
            firstPlan.appendChild(dot);
        }
    }
}

function generateSecondPlanItems(spClass, stageNo) {
    const secondPlan = document.querySelector(`.${spClass}`);
}

export {generateItems};