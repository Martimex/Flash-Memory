import firstPlanStyles from '../styles/firstPlan.module.css';
import mainStyles from '../styles/main.module.css';
import bgStyles from '../styles/bg.module.css';
import * as Animation from "animejs";
const anime = Animation.default;

const counterFontColors = [
    '#666',
    'hsl(55, 70%, 40%)',
    'hsl(35, 70%, 40%)',
    '#0000', // lastly we want to hide the number shwoing and then hide secret counter box
];

async function match(isMatch, cardsOpened_parentNodes, stageNo, levelObject, levelVariables) {
    // Fire some animations when we found / do not found a match
    const secret_container_q = document.querySelector(`.${firstPlanStyles['secret-container']}`);

    const targets = document.querySelectorAll('.target');
    let tb_arr = [];
    targets.forEach(target => {
        tb_arr.push(target.querySelector(`.${mainStyles['tile-back_custom']}`));
    })

    function modifySecretCounter(doesMatch) {
        if(levelVariables[`secret_solved`]) { return; }
        const secret_counter_q = document.querySelector(`.${firstPlanStyles['secret-container__counter']}`);
        levelVariables[`secret_streak`] = (doesMatch)? levelVariables[`secret_streak`] += 1 : 0;

        anime({
            targets: secret_counter_q,
            duration: 600,
            easing: 'linear',
            color: counterFontColors[parseInt(levelVariables[`secret_streak`])],
            round: 1,
            textContent: levelVariables[`secret_streak`],
        })

    }

    async function removeSecretCounter() {
        const b0 = anime({
            targets: secret_container_q,
            duration: 600,
            opacity: 0,
            easing: 'linear',
        }).finished;

        await Promise.all([b0]);
    }

    if(isMatch) {
        
        levelVariables[`matchCount`] += 1;
        modifySecretCounter(isMatch);


        async function match() {
            await animateMatch()
                .then(() => {
                    if(levelVariables[`matchCount`] >= levelVariables[`matchCountLimit`]) {
                        // You solved too much pairs without finding a secret. It is no longer possible to solve secret in this attempt.
                        removeSecretCounter(); // it can be used sync here !
                    }

                    else if((levelVariables[`secret_streak`] === levelVariables[`secret_streak_requirements`]) && (!levelVariables[`secret_solved`]) ) {
                        document.querySelector(`.${bgStyles['game_custom']}`).style.pointerEvents = 'none'; // TEST IF IT WORKS
                        levelVariables[`secret_solved`] = true;
                        async function hellPrepare() {
                            await removeSecretCounter()
                            await createHell()
                                .then(() => {
                                    animateHell()
                                    document.querySelector(`.${bgStyles['game_custom']}`).style.pointerEvents = 'auto'; // TEST IF IT WORKS
                                })
                        }
                        hellPrepare();
                    }
                })
        }

        function animateHell() {
            // this one should be sync
            anime({
                targets: `.${bgStyles['background_custom']}`,
                duration: 2500,
                delay: 600,
                easing: 'linear',
                backgroundImage: ['repeating-linear-gradient(190deg, hsl(117, 0%, 0%), hsl(188, 0%, 0%) 8%, hsl(55, 40%, 30%) 18%)', 'repeating-linear-gradient(190deg, hsl(11, 0%, 0%), hsl(66, 0%, 0%) 8%, hsl(11, 40%, 30%) 18%)'],
                direction: 'alternate',
                loop: true,
            })
        }

        async function createHell() {
            const b1 = anime({
                targets: `.${bgStyles['background_custom']}`,
                duration: 1500,
                easing: 'linear',
                backgroundImage: ['repeating-linear-gradient(190deg, hsl(22, 70%, 50%), hsl(35, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)', 'repeating-linear-gradient(190deg, hsl(117, 0%, 0%), hsl(188, 0%, 0%) 8%, hsl(55, 40%, 30%) 18%)'],
                // this transition would be a secret for the level - unleashing the secret = a free star
            }).finished;

            const b2 = anime({
                targets: `.${bgStyles['board_custom']}`,
                duration: 1000,
                easing: 'linear',
                keyframes: [
                    {opacity: [1, 0], duration: 1000, easing: 'easeInSine'},
                    {backgroundImage: 'radial-gradient(hsla(2, 31%, 33%, 0%), #111)', filter:'sepia(30%)', duration: 500},
                    {opacity: 1, duration: 500, easing: 'easeOutSine'},
                ]
            }).finished;

            await Promise.all([b1, b2]);
        }

        async function animateMatch() {
            const a1 = anime({
                targets: targets,
                duration: 600,
                easing: 'easeInOutExpo',
                backgroundImage: 'radial-gradient( #3330, #3330)',
                rotate: 0,
            }).finished;
        
            await Promise.all([a1]);
        }
        
        match();

    }
    else {
        modifySecretCounter(isMatch);

        async function noMatch() {
            await animate();
        }

        async function animate() {
            const a1 = anime({
                targets: `.${bgStyles['background_custom']}`,
                duration: 1200,
                easing: 'linear',
                direction: 'alternate',
            }).finished;

            const a2 = anime({
                targets: targets,
                duration: 800,
                rotate: '+=40',
                easing: 'easeInOutSine',
            }).finished;

            await Promise.all([a1, a2]);
        }

        noMatch();
    }
}

export {match};