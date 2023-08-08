import stylesMain from '../styles/main.module.css';
import firstPlanStyles from '../styles/firstPlan.module.css';
import * as Animation from "animejs"

const anime = Animation.default;

async function xclick(click_no, target, stageNo, levelObject, levelVariables) {

    function animateTileClick() {
        let rand = Math.floor(Math.random() * 4);
        let colorArr = ['hsla(144, 50%, 55%, .85)', 'hsla(33, 50%, 55%, .85)', 'hsla(178, 50%, 55%, .85)', 'hsla(296, 50%, 55%, .85)' ]
        let svgColorArr = ['hsla(144, 50%, 55%)', 'hsla(33, 50%, 55%)', 'hsla(178, 50%, 55%)', 'hsl(296, 50%, 55%)']

        anime({
            targets: target,
            duration: 650,
            borderColor: `${colorArr[rand]}`,
            borderWidth: '.2rem',
            easing: 'easeOutExpo',
        })

        target.querySelector(`.${stylesMain['tile-back_custom']} svg path`).style.fill = svgColorArr[rand];
    }

    function moveDots() {

        const firstPlanContainer = document.querySelector(`.${firstPlanStyles['firstPlan_custom']}`);
        const rand = Math.floor(Math.random() * 4);
        const randDotType = firstPlanContainer.querySelectorAll(`.${firstPlanStyles[`glowing-${rand}`]}`);

        if(randDotType.length !== 0) {
            if(levelVariables['dotsRotationStep'] % 4 === 0) {  // levelVariables.dotsRotationStep
                anime({
                    targets: randDotType,
                    duration: function(el, ind, length) {
                        return Math.floor(Math.random() * 2000) + 1500; // randomly from 1500 up to 3500 ms
                    },
                    rotate: function(el, ind, length) {
                        return Math.floor(Math.random() * 270) + 90; // Rotate from 90 up to 360 deg
                    },
                    translateX: '-=2rem',
                    translateY: '-=2rem',
                    easing: 'easeOutExpo',

                })
                levelVariables['dotsRotationStep'] += 1;
            }
            else if(levelVariables['dotsRotationStep'] % 4 === 1) {
                anime({
                    targets: randDotType,
                    duration: function(el, ind, length) {
                        return Math.floor(Math.random() * 2000) + 1500; // randomly from 1500 up to 3500 ms
                    },
                    rotate: function(el, ind, length) {
                        return Math.floor(Math.random() * 270) + 90; // Rotate from 90 up to 360 deg
                    },
                    translateX: '+=2rem',
                    translateY: '-=2rem',
                    easing: 'easeOutExpo',

                })
                levelVariables['dotsRotationStep'] += 1;
            }
            else if(levelVariables['dotsRotationStep'] % 4 === 2) {
                anime({
                    targets: randDotType,
                    duration: function(el, ind, length) {
                        return Math.floor(Math.random() * 2000) + 1500; // randomly from 1500 up to 3500 ms
                    },
                    rotate: function(el, ind, length) {
                        return Math.floor(Math.random() * 270) + 90; // Rotate from 90 up to 360 deg
                    },
                    translateX: '+=2rem',
                    translateY: '+=2rem',
                    easing: 'easeOutExpo',

                })
                levelVariables['dotsRotationStep'] += 1;
            }
            else if(levelVariables['dotsRotationStep'] % 4 === 3) {
                anime({
                    targets: randDotType,
                    duration: function(el, ind, length) {
                        return Math.floor(Math.random() * 2000) + 1500; // randomly from 1500 up to 3500 ms
                    },
                    rotate: function(el, ind, length) {
                        return Math.floor(Math.random() * 270) + 90; // Rotate from 90 up to 360 deg
                    },
                    translateX: '-=2rem',
                    translateY: '+=2rem',
                    easing: 'easeOutExpo',

                })
                levelVariables['dotsRotationStep'] += 1;
            }
        }
    }

    async function runXClick() {
        switch(click_no) {
            case 1: {
                animateTileClick();
                break;
            }
    
            case 2: {
                animateTileClick();
                moveDots();
                break;
            }
        }
    }

    await runXClick();

}

export {xclick}