import styles_firstPlan from './styles/firstPlan.module.css';
import styles_secondPlan from './styles/secondPlan.module.css';

function generateItems(fpClass, spClass, stageNo) {
    generateFirstPlanItems(fpClass, stageNo);
    generateSecondPlanItems(spClass, stageNo);
}

function generateFirstPlanItems(fpClass, stageNo) {
    const firstPlan = document.querySelector(`.${fpClass}`);

    if(stageNo === 0) {
        for(let i=0; i<2; i++) {  // Generating two Wanted Boxes
            const text = `WANTED`;
            let wBox = document.createElement('div');
            let headerText = document.createElement('div');
            let svgContainer = document.createElement('div');
            
            wBox.classList.add(`${styles_firstPlan['wBox']}`, `${styles_firstPlan[`wBox-${i+1}`]}`);
            headerText.classList.add(`${styles_firstPlan['hText']}`);
            svgContainer.classList.add(`${styles_firstPlan['svgContainer']}`);

            for(let x=0; x<text.length; x++) {
                let letter = document.createElement('div');
                letter.classList.add(`${styles_firstPlan['hText_letter']}`);
                letter.textContent = `${text[x]}`;
                headerText.appendChild(letter);
            }

            wBox.appendChild(headerText);
            wBox.appendChild(svgContainer);
            firstPlan.appendChild(wBox);
        }
    }

}

function generateSecondPlanItems(spClass, stageNo) {
    const secondPlan = document.querySelector(`.${spClass}`);
}

export {generateItems};