import styles_firstPlan from './styles/firstPlan.module.css';
import styles_secondPlan from './styles/secondPlan.module.css';

function generateItems(fpClass, spClass) {
    generateFirstPlanItems(fpClass);
    generateSecondPlanItems(spClass);
}

function generateFirstPlanItems(fpClass) {
    const firstPlan = document.querySelector(`.${fpClass}`);

    const [finishWallLeft, finishWallRight] = [document.createElement('div'), document.createElement('div')];
    finishWallLeft.classList.add(styles_firstPlan['finishWall'], styles_firstPlan['fw-left']);
    finishWallRight.classList.add(styles_firstPlan['finishWall'], styles_firstPlan['fw-right']);
    firstPlan.append(finishWallLeft, finishWallRight);
}

function generateSecondPlanItems(spClass) {
    const secondPlan = document.querySelector(`.${spClass}`);
}

export {generateItems};