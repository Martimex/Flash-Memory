import bgStyles from '../styles/bg.module.css';
import mainStyles from '../styles/main.module.css';
import styles_global from '../../../../global/global_styles.module.css';
import firstPlanStyles from '../styles/firstPlan.module.css';
import * as Animation from "animejs";
const anime = Animation.default;

async function stagecomplete(stageNo) {

    const game = document.querySelector(`.${bgStyles['background_custom']}`);

    async function init() {
        const msg = `Too\u00a0easy,\u00a0right\u00a0?`;

        const aContainer = document.querySelector(`.${mainStyles['aContainer_custom']}`);
        const darkScreen = document.createElement('div');
        const textBox = document.createElement('div');
        const text = document.createElement('div');

        for(let x=0; x<msg.length; x++) {
            let letter = document.createElement('div');
            letter.classList.add(`${mainStyles['letter']}`);
            letter.textContent = msg[x];
            text.appendChild(letter);
        }

        text.classList.add(`${mainStyles['message']}`);
        textBox.classList.add(`${mainStyles['message-box']}`);
        darkScreen.classList.add(`${mainStyles['dark-screen']}`);
        
        textBox.appendChild(text);
        aContainer.appendChild(textBox);
        aContainer.appendChild(darkScreen);

        await fadeScreen()
        await showMessage()
        await delay()
        await hideMessage()
        await hideDarkScreen()
    }

    async function fadeScreen() {
        const a1 = anime({
            targets: game,
            duration: 1600,
            opacity: .9,
            filter: ['saturate(75%)', 'saturate(125%)'],
            easing: 'easeInBounce',
        }).finished;

        const a1a = anime({
            targets: `.${mainStyles['dark-screen']}`,
            duration: 1200,
            opacity: { value: [0, 1], easing: 'linear' },
            backgroundColor: { value: ['#000', '#0000'], easing: 'easeOutCubic' },
        }).finished;

        await Promise.all([a1, a1a]);
    }

    async function showMessage() {
        const a2 = anime({
            targets: `.${mainStyles['letter']}`,
            duration: 150,
            delay: anime.stagger(80),
            easing: 'linear',
            opacity:  1,
        }).finished;

        await Promise.all([a2]);
    }

    async function delay() {
        // Just wait - let the user read the message
        const a3 = anime({
            targets: '',
            duration: 1200,
            easing: 'linear',
        }).finished;
        

        await Promise.all([a3]);
    }

    async function hideMessage() {
        const a4 = anime({
            targets: `.${mainStyles['message-box']}`,
            duration: 1100,
            easing: 'easeInExpo',
            translateY: ['0', '2rem'],
            opacity: 0,
        }).finished;

        const a4a = anime({
            targets: `.${bgStyles['background_custom']}`,
            duration: 1100,
            backgroundColor: '#000',
            easing: 'linear',
        }).finished;

        const a4b = anime({
            targets: `.${styles_global['game-info']}`,
            duration: 350,
            opacity: 0,
            easing: 'linear',
        }).finished;

        const a4c = anime({
            targets: `.${firstPlanStyles['dot-invisible']}`,
            duration: 1000,
            opacity: [0, 1],
            easing: 'linear',
            scale: [1, 4],
        })

        await Promise.all([a4, a4a, a4b, a4c]);
    }

    async function hideDarkScreen() {
        await anime({
            targets: `.${mainStyles['dark-screen']}`,
            duration: 1100,
            opacity: { value: [1, 0], easing: 'linear' },
            backgroundColor: { value: ['#000', '#0000'], easing: 'easeInCubic' },
            scale: {value: [1, .95], easing: 'easeInBounce' },
        }).finished;
    }

    async function finish() {
        await anime({
            targets: game,
            duration: 2000,
            opacity: .2,
            filter: 'sepia(60%) invert(15%) saturate(140%)',
            easing: 'linear',
        }).finished;
    }

    // Fire
    if(stageNo === 0) {
        await init();
    } 
    else if(stageNo === 1) {
        await finish();
    }

}

export {stagecomplete};