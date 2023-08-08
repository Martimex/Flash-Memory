import bgStyles from '../styles/bg.module.css';
import mainStyles from '../styles/main.module.css';
import * as Animation from "animejs"
const anime = Animation.default;


async function stagecomplete(stageNo, isLevelWin, levelObject, levelVariables) {

    let game = document.querySelector(`.${bgStyles['background_custom']}`);

    async function init() {
        if(stageNo === 0) {
            await fadeScreen()
            await createAndHideMessage()
            modifyBackgroundImagesForTiles();
        }
        if(isLevelWin) {
            showWinScreen()
            await animateEndScreenShowUp()
            await lightenScreen()
        }
    }

    async function animateEndScreenShowUp() {
        const endContainer = document.querySelector(`.${mainStyles['end-container']}`);
        const endScreen = document.querySelector(`.${mainStyles['end-screen']}`);
        await anime({
            targets: endContainer,
            duration: 700,
            opacity: [0, 1],
            easing: 'linear',
        }).finished;
        
        await anime({
            targets: endScreen,
            duration: 400,
            opacity: [0, 1],
            translateX: ['-2.2rem', '0rem'],
            easing: 'linear',
        }).finished;
    }

    function showWinScreen() {
        const animationContainer_q = document.querySelector(`.${mainStyles['aContainer_custom']}`);
        const endContainer = document.createElement('div');
        endContainer.classList.add(`${mainStyles['end-container']}`);
        const endScreen = document.createElement('div');
        endScreen.classList.add(mainStyles['end-screen']);
        endContainer.appendChild(endScreen);
        animationContainer_q.appendChild(endContainer);
    }

    async function lightenScreen() {
        const a1 = anime({
            targets: game,
            duration: 500,
            endDelay: 3200,
            opacity: '1', 
            easing: 'linear',
        }).finished;

        await Promise.all([a1]);
    }

    async function fadeScreen() {
        const a1 = anime({
            targets: game,
            duration: 400,
            opacity: '-=.25', 
            easing: 'linear',
        }).finished;

        await Promise.all([a1]);
    }

    function modifyBackgroundImagesForTiles() {
        const allEvenTiles = document.querySelectorAll(`.${mainStyles['tile-color-2']}`);
        allEvenTiles.forEach(el => {
            el.style.setProperty('background-image', 'none');
        })
    }

    async function createAndHideMessage() {
        const animationContainer_q = document.querySelector(`.${mainStyles['aContainer_custom']}`)
            const messageBox = document.createElement('div');
            messageBox.classList.add(mainStyles['message-box']);
                const messageText1 = document.createElement('div');
                messageText1.classList.add(mainStyles['message-text-1']);
                messageText1.textContent = `The lights are going down`;
                const messageText2 = document.createElement('div');
                messageText2.classList.add(mainStyles['message-text-2']);
                messageText2.textContent = `The factory is dimmed by a smoke...`;
                messageBox.append(messageText1, messageText2);
            animationContainer_q.appendChild(messageBox);
        //
        const a1 = anime({
            targets: [messageText1, messageText2],
            duration: 1200,
            delay: anime.stagger(900),
            opacity: [0, 1],
            easing: 'easeOutSine', 
        }).finished;

        const a2 = anime({
            targets: messageBox,
            duration: 1100,
            opacity: [0, 1],
            easing: 'linear',
        }).finished;

        await Promise.all([a1, a2]);

        // Hide message part

        await anime({
            targets: [messageText1, messageText2],
            delay: 1600,
            duration: 600,
            scaleY: ['100%', '185%'],
            opacity: 0,
            easing: 'easeInSine',
        }).finished;

        const darkBox = document.createElement('div');
        darkBox.classList.add(mainStyles['dark-box']);
        animationContainer_q.appendChild(darkBox);

        const b1 = anime({
            targets: messageBox,
            duration: 700,
            filter: 'saturate(125%) sepia(80%)',
            easing: 'easeInExpo',
        }).finished;

        const b2 =  anime({
            targets: darkBox,
            duration: 550,
            opacity: [0, 1],
            easing: 'linear',
        }).finished;

        await Promise.all([b1, b2, fadeScreen()]);

        document.querySelector(`.${mainStyles['message-box']}`).remove();
    }


    // Fire
    await init();
}

export {stagecomplete};