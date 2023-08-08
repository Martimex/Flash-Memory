import styles_firstPlan from './styles/firstPlan.module.css';
import styles_secondPlan from './styles/secondPlan.module.css';

function generateItems(fpClass, spClass, stageNo) {
    generateFirstPlanItems(fpClass, stageNo);
    generateSecondPlanItems(spClass, stageNo);
}

function generateFirstPlanItems(fpClass, stageNo) {
    const firstPlan = document.querySelector(`.${fpClass}`);

    if(stageNo === 0) {
        for(let i=1; i<=2; i++) {
            const matchInfoContainer = document.createElement('div');
            matchInfoContainer.classList.add(styles_firstPlan['match-info-container'], styles_firstPlan[`mic-${i}`]);
                
                const matchInfoTitle = document.createElement('span');
                matchInfoTitle.classList.add(styles_firstPlan['match-info-title'], styles_firstPlan[`mit-${i}`], styles_firstPlan['unselectable']);
                matchInfoContainer.appendChild(matchInfoTitle);

                const matchInfoBox = document.createElement('div');
                matchInfoBox.classList.add(styles_firstPlan['match-info-box'], styles_firstPlan[`mib-${i}`]);
                matchInfoContainer.appendChild(matchInfoBox);

                    const matchInfoBox_icon = document.createElement('div');
                    matchInfoBox_icon.classList.add(styles_firstPlan['match-info-icon'], styles_firstPlan[`mii-${i}`]);
                    matchInfoBox.appendChild(matchInfoBox_icon);

                    const matchInfoBox_descritpion = document.createElement('span');
                    matchInfoBox_descritpion.classList.add(styles_firstPlan['match-info-description'], styles_firstPlan[`mid-${i}`], styles_firstPlan['unselectable']);
                    matchInfoBox.appendChild(matchInfoBox_descritpion);
    
            firstPlan.appendChild(matchInfoContainer);
        }
    }

}

function generateSecondPlanItems(spClass, stageNo) {
    const secondPlan = document.querySelector(`.${spClass}`);

    if(stageNo === 0) {
        for(let i=0; i<2; i++) {
            const animationBox = document.createElement('div');
            animationBox.classList.add(styles_secondPlan['animationBox'], styles_secondPlan[`animationBox-${i+1}`]);
            secondPlan.appendChild(animationBox);
        }

        for(let i=0; i<2; i++) {
            const animationBoxInner = document.createElement('div');
            animationBoxInner.classList.add(styles_secondPlan['animationBoxInner'], styles_secondPlan[`animationBoxInner-${i+1}`]);
            secondPlan.appendChild(animationBoxInner);
        }
    }
}

export {generateItems};