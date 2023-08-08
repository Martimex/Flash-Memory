import styles_firstPlan from './styles/firstPlan.module.css';

function generateItems(fpClass, spClass) {
    generateFirstPlanItems(fpClass);
    generateSecondPlanItems(spClass);
}

function generateFirstPlanItems(fpClass) {
    const firstPlan = document.querySelector(`.${fpClass}`);

    const flood = document.createElement('div');

    for(let i=75; i>0; i--) {
        let d = document.createElement('div');
        d.style = `bottom: ${(i - 1) / 1.25}%`;
        d.classList.add(styles_firstPlan['flood-elem']);
        flood.appendChild(d);
    }

    flood.classList.add(styles_firstPlan['flood']);
    firstPlan.appendChild(flood);
}

function generateSecondPlanItems(spClass) {
    const secondPlan = document.querySelector(`.${spClass}`);
}

export {generateItems};