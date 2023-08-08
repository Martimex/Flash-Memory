import styles_firstPlan from './styles/firstPlan.module.css';

function generateItems(fpClass, spClass) {
    generateFirstPlanItems(fpClass);
    generateSecondPlanItems(spClass);
}

function generateFirstPlanItems(fpClass) {
    const firstPlan = document.querySelector(`.${fpClass}`);

    for(let i=0; i<2; i++) {

        let lantern = document.createElement('div');
        lantern.classList.add(styles_firstPlan[`lantern`], styles_firstPlan[`lantern-${i + 1}`]);
        firstPlan.appendChild(lantern);

        for(let j=0; j<3; j++) {
            let d = document.createElement('div');
            d.classList.add(styles_firstPlan['powerball'], styles_firstPlan[`powerball-${(i * 3) + (j + 1)}`]);
            firstPlan.appendChild(d);
        }
    }



}

function generateSecondPlanItems(spClass) {
    const secondPlan = document.querySelector(`.${spClass}`);
}

export {generateItems};