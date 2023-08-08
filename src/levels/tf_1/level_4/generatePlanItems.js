import styles_firstPlan from './styles/firstPlan.module.css';
import styles_main from './styles/main.module.css';

function generateItems(fpClass, spClass) {
    generateFirstPlanItems(fpClass);
    generateSecondPlanItems(spClass);
}

function generateFirstPlanItems(fpClass) {
    const firstPlan = document.querySelector(`.${fpClass}`);

    const secret_container = document.createElement('div');
    secret_container.classList.add(styles_firstPlan['secret-container'], styles_main['tile_custom_alt']);

    const secret_container_block = document.createElement('div');
    secret_container_block.classList.add(styles_firstPlan['secret-container__block']);

    const secret_counter = document.createElement('div');
    secret_counter.textContent = 0;

    secret_counter.classList.add(styles_firstPlan['secret-container__counter']);

    secret_container.appendChild(secret_container_block);
    secret_container_block.appendChild(secret_counter);

    firstPlan.appendChild(secret_container);
}

function generateSecondPlanItems(spClass) {
    const secondPlan = document.querySelector(`.${spClass}`);
}

export {generateItems};