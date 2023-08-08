import styles_firstPlan from './styles/firstPlan.module.css';

function generateItems(fpClass, spClass, stageNo) {
    generateFirstPlanItems(fpClass, stageNo);
    generateSecondPlanItems(spClass, stageNo);
}

function generateFirstPlanItems(fpClass) {
    const firstPlan = document.querySelector(`.${fpClass}`);

    for(let i=0; i<4; i++) {
        let tornado = document.createElement('div');
        tornado.classList.add(`${styles_firstPlan['tornado']}`, `${styles_firstPlan[`tornado-${i+1}`]}`);
        firstPlan.appendChild(tornado);
        for(let x=0; x<9; x++) {
            let tornadoElem = document.createElement('div');
            tornadoElem.classList.add(`${styles_firstPlan['tornado-elem']}`);
            tornado.appendChild(tornadoElem);
        }
    };
}

function generateSecondPlanItems(spClass) {
    const secondPlan = document.querySelector(`.${spClass}`);
}

export {generateItems};