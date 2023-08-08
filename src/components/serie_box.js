import React from 'react';
import styles from '../styles/serie_box.module.css';
import { rainbowColors } from '../global/rainbow_colors.js';

import * as Animation from 'animejs';

// DEFINE GLOBAL ASSIGNMENT THAT WILL INDICATE WE WANT TO USE LEGACY anime({}) call exactly as it used to be
const anime = Animation.default;

const colors_number = 4;

const dynamic_classes = {
    serie_block: 'mode-block__serie',
    level_borders: 'mode-block__serie__border',
    level_tile_main: 'mode-block__serie__tile',
    level_tile_front: 'mode-block__serie__level',
    level_tile_back: 'mode-block__serie__back-side',
} 

let currentlyColoredBorders = [

];

let recentShowUpBox = null;

let animationFinishController = 
{
    first: true, 
    second: true,
};


function SerieBox(props) {

    function openUpFire(e) {
        if(!animationFinishController[`first`] || !animationFinishController[`second`]) return; // Dont fire if both animations are not completed
        if(e.target === recentShowUpBox) return; // Dont fire if old and new sections are the same
        if(!e.target.classList.contains(styles[`${dynamic_classes.serie_block}`])) return; // Only section block can be targeted
        const thisSerieTiles = e.target.querySelectorAll(`.${styles[dynamic_classes.level_borders]}`);
        thisSerieTiles.forEach(level_tile => {
            currentlyColoredBorders.push([]); // arr for tile
            const colorsCopy = [...rainbowColors];
            let gradient_String = '';
    
            for(let color_no = 0; color_no < colors_number; color_no++) {
                let rand = Math.floor(Math.random() * colorsCopy.length);
                currentlyColoredBorders[currentlyColoredBorders.length -1].push(colorsCopy[rand]);
                gradient_String+= (color_no !== colors_number - 1)? ` ${colorsCopy[rand]},` : ` ${colorsCopy[rand]}`;
                colorsCopy.splice(rand, 1);
            }
    
    
            level_tile.style.backgroundImage = `linear-gradient(135deg, ${gradient_String})`;
            let ccb = currentlyColoredBorders;
    
            anime({
                targets: level_tile,
                duration: 14000,
                backgroundImage: [
                    `linear-gradient(135deg, ${ccb[ccb.length -1][0]}, ${ccb[ccb.length -1][1]}, ${ccb[ccb.length -1][2]}, ${ccb[ccb.length -1][3]} )`,
                    `linear-gradient(135deg, ${ccb[ccb.length -1][1]}, ${ccb[ccb.length -1][2]}, ${ccb[ccb.length -1][3]}, ${ccb[ccb.length -1][0]} )`,
                    `linear-gradient(135deg, ${ccb[ccb.length -1][2]}, ${ccb[ccb.length -1][3]}, ${ccb[ccb.length -1][0]}, ${ccb[ccb.length -1][1]} )`,
                    `linear-gradient(135deg, ${ccb[ccb.length -1][3]}, ${ccb[ccb.length -1][0]}, ${ccb[ccb.length -1][1]}, ${ccb[ccb.length -1][2]} )`,
                ],
                hueRotate: [
                    '0deg', '20deg', '40deg', '60deg', '40deg', '20deg', '0deg'
                ],
                saturate: '140%',
                loop: true,
                direction: 'alternate',
                easing: 'linear',
            })
        })
    
        animateSectionShowUp(e);
        animateOtherSectionHide(e);
    }
    
    function animateSectionShowUp(e) {
        animationFinishController['first'] = false;
        const section_title = e.target.querySelector(`.${styles['serie-title']}`);
        const section_content = e.target.querySelector(`.${styles['serie-content']}`);
        const section_content_tiles = section_content.querySelectorAll(`.${styles[dynamic_classes.level_borders]}`);
        section_content.classList.remove(styles['invisible']);
    
        async function animationChain() {
            await fadeText()
            .then(() => {
                section_title.classList.add(styles['invisible']);
            })
            await showUpLevels()
            .then(() => {
                animationFinishController[`first`] = true;
            })
        }
    
        async function fadeText() {
            const timing = 400;
            const a1 = anime({
                targets: section_title,
                duration: timing,
                translateX: '30%',
                filter: 'sepia(70%)',
                opacity: 0,
                easing: 'easeOutSine',
            }).finished;
            
            const b1= anime({
                targets: e.target,
                duration: timing,
                filter: ['contrast(100%)', 'contrast(140%)'],
                easing: 'linear',
            }).finished;

            await Promise.all([a1, b1]);
        }
    
        async function showUpLevels() {
            const timing = 300;
            const staggering = 72;
            const total_stagger = timing + (staggering * section_content_tiles.length);
            const a2 = anime({
                targets: section_content_tiles,
                duration: timing,
                delay: anime.stagger(staggering),
                opacity: 1,
                easing: 'easeInCubic',
            }).finished;

            const b2 = anime({
                targets: e.target,
                duration: total_stagger,
                filter: ['constrast(140%)', 'contrast(100%)'],
                easing: 'linear',
            }).finished;

            await Promise.all([a2, b2]);
        }
    
        animationChain();
    }
    
    function animateOtherSectionHide(e) {

        if(recentShowUpBox) {
            animationFinishController[`second`] = false;
            const section_title_old = recentShowUpBox.querySelector(`.${styles['serie-title']}`);
            const section_content_old = recentShowUpBox.querySelector(`.${styles['serie-content']}`);
            const section_content_tiles_old = section_content_old.querySelectorAll(`.${styles[dynamic_classes.level_borders]}`);

            async function animationChain() {
                section_title_old.classList.remove(styles['invisible']);
                await hideLevels()
                await showText()
                .then(() => {
                    section_content_old.classList.add(styles['invisible']);
                    animationFinishController[`second`] = true;
                })
            }

            async function hideLevels() {
                const a1 = anime({
                    targets: section_content_tiles_old,
                    duration: 400,
                    delay: anime.stagger(96, {from: 'last'}),
                    opacity: 0,
                    easing: 'easeOutCubic',
                }).finished;
                await Promise.all([a1]);
            }

            async function showText() {
                const a2 = anime({
                    targets: section_title_old,
                    duration: 520,
                    translateX: 0,
                    filter: 'sepia(0%)',
                    opacity: 1,
                    easing: 'easeInSine',
                }).finished;
                await Promise.all([a2]);
            }

            animationChain(section_content_tiles_old);

        }

        recentShowUpBox = e.target;
    }
    
    function checkSerieNameChange() {
        // Object properties are not updated !
        if((animationFinishController[`first`] === true)  && (animationFinishController[`second`]) === true)  {
            props.setSerieName(props.serie.name)
        }
    }

    return(
        <div className={styles[`${dynamic_classes.serie_block}`]} onClick={(e) => {checkSerieNameChange(); openUpFire(e); } } >
            <div className={styles['serie-title']}> {props.serie.name} </div> 
            <div className={`${styles['serie-content']} ${styles['invisible']}`}>
                {[].concat([...props.serie.Levels]).sort((a, b) => a.number - b.number).map((lv, index) =>
                    <div className={styles[`${dynamic_classes.level_borders}`]} key={lv.name.toString() + lv.number.toString()}
                        onClick={() => {(props.isAnimationRunning === false && animationFinishController[`first`] && animationFinishController[`second`]) && props.setLevelChoose([lv, index+1, props.serie.name_abbr, props.serie.name, props.serie.description])}}
                    >
                        <div className={styles['bg-layer']}>
                            <div className={styles[`${dynamic_classes.level_tile_main}`]}>
                                <div className={styles[`${dynamic_classes.level_tile_front}`]}>

                                    {(index + 1 < 10)? '0'+ (index + 1) : (index + 1)} 


                                </div>   
                                
                                <div className={styles[`${dynamic_classes.level_tile_back}`]} > </div>
                            </div>
                        </div> 
                    </div>
                )}
            </div>
        </div>
    )
}

export { SerieBox }