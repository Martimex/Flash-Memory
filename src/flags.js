//import anime from 'animejs/lib/anime.es.js';
//import anime from "animejs"
import levels from './levels.js';

// #1 WINNING CONDITION :  if(foundTiles+2 === tiles) equals true
// #2 IF TWO CARDS MATCH:  if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])
// #3 GET THE RIGHT TILE'S CHILD NODES [NOT #TEXT AND SUCH] BY A TARGET CLASS: 
      /* let target = document.querySelector(.target-1); targetTile.querySelector('.tile-back'); */
// #4 DO SOME STUFF ONLY FOR TILES THAT HAS NOT BEEN FOUND YET : allTiles.forEach(tile => {if(tile.style.visibility !== 'hidden') **some stuff here** })
// #5 BLOCK CLICK EVENTS FOR TILES :  document.querySelector('.board').dataset.animation = 'on';   -> REMEMBER TO CHANGE IT TO 'OFF' AFTER ALL
// #6 GRAB ANIMATION CONTAINER:  const animationContainer = document.querySelector('.animationContainer');

const flags = {
    
    // LVL 1
    loadBorders_1: function() {
        anime({
            targets: '.tile',
            duration: 1600,
            borderColor: ['hsl(4, 87%, 62%)', 'hsl(45, 50%, 80%)'],
            direction: 'alternate',
        })
    },

    markBorders_1: function() {
        anime({
            targets: '.target',
            duration: 400,
            borderColor: 'hsl(45, 50%, 80%)',
        })
    },

    removeBordersMark_1: function() {
        anime({
            targets: '.target',
            delay: 400,
            duration: 2000,
            borderColor: ['hsl(45, 50%, 80%)', 'hsl(4, 87%, 62%)'],
        })
    },

    // LVL 2

    setBackgroundFlood_2: function() {
        let animationContainer = document.querySelector('.animationContainer');

        for(let i=75; i>0; i--) {
            let d = document.createElement('div');
            d.style = `bottom: ${i /2}%`;
            d.classList.add('flood-elem');
            animationContainer.appendChild(d);
        }

        anime({
            targets: '.flood-elem',
            duration: 300,
            delay: anime.stagger(1000, {from: 'last'}),
            opacity: ['0', '0.2'],
            easing: 'easeInSine',
        })
    },

    colorBackground_2: function() {
        anime({
            targets: '.target',
            duration: 3000,
            backgroundColor: 'hsl(199, 70%, 52%)',
        })
    },

    removeColorBackground_2: function() {
        anime({
            targets: '.target',
            delay: 1000,
            duration: 2000,
            backgroundColor: ['hsl(199, 70%, 52%)', 'rgba(72,129,199,0)'],
            easing: 'linear',
        })
    },

    // LVL 3

    animate_3: function() {
        let animationContainer = document.querySelector('.animationContainer');

        for(let i=2; i>0; i--) {
            let d = document.createElement('div');
            d.classList.add('powerball', 'powerball-1');
            let d1 = document.createElement('div');
            d1.classList.add('powerball', 'powerball-2');
            let d2 = document.createElement('div');
            d2.classList.add('powerball', 'powerball-3');
            animationContainer.appendChild(d);
            animationContainer.appendChild(d1);
            animationContainer.appendChild(d2);
        }

        anime({
            targets: ['.powerball-1', '.powerball-2', '.powerball-3'],
            duration: 4000,
            delay: anime.stagger(200),
            keyframes: [
                {translateY: '0vh', opacity: 0, scaleX: '1', scaleY: '1'},
                {translateY: '30vh', opacity: 0.2, backgroundColor: 'hsl(142, 80%, 30%)', scaleX: '2', scaleY: '2'},
                {translateY: '100vh', opacity: 1, backgroundColor: 'hsl(142, 80%, 30%)', scaleX: '3', scaleY: '3'},
                {backgroundColor: 'hsl(299, 50%, 65%)', scaleX:'2', scaleY: '2'},
                {delay: 200},
            ],
            loop: true,
            direction: 'alternate',
            easing: 'easeInQuad',
        })
    },

    fadeTile_3: function() {
        async function waitInverse() {
            const wait = anime ({
                duration: 500,
                targets: '.tile',
            }).finished;
            await Promise.all([wait]);
        } 
        waitInverse().then(() => {
            anime({
                targets: '.target',
                duration: 1000,
                easing: 'linear',
                opacity: '0.1',
            })
        })
    },


    // LVL 4

    blockInverseAnimation_4: function() {
        anime({
            targets: '.tile',
            duration: 3200,
            delay: anime.stagger(85, {from: 'center'}),
            keyframes: [
                {translateX: '10rem', opacity: 0},
                {translateX: '0rem', opacity: 0},
                {opacity: 1, duration: 200}
            ],
            loop: false,
            easing: 'linear',
        });

        anime({
            targets: '.board',
            duration: 3200,
            skewY: '10deg',
            loop: false,
        })
    },

    colorFirstTargetShadow_4: function() {
        anime({ 
            targets: '.target',
            duration: 500,
            boxShadow: ['6px -6px 0px 2px hsla(142, 0%, 0%, 70%)', '6px -6px 0px 2px hsla(50, 90%, 50%, 90%)'],
        })
    },

    colorSecondTargetShadow_4: function() {
        anime({
            targets: '.target',
            duration: 500,
            boxShadow: ['6px -6px 0px 2px hsla(142, 0%, 0%, 70%)', '6px -6px 0px 2px hsla(50, 90%, 50%, 90%)'],
        })
    },

    removeTargetShadow_4: function() {
        anime({
            targets: '.target',
            delay: 700,
            duration: 2000,
            boxShadow: ['6px -6px 0px 2px hsla(50, 90%, 50%, 90%)', '6px -6px 0px 2px hsla(142, 0%, 0%, 70%)'],
        })
    },

    changeRepeatedBg_4: function(cardsOpened, tiles, foundTiles) {
        if(foundTiles+2 === tiles) {  // it's async, so append value right away
            async function waitFinish() {
                const wait = anime ({
                    targets: '.board',
                    duration: 1000,
                    skewY: '0deg',
                    loop: false,
                }).finished;
                await Promise.all([wait]);
            } 
            waitFinish().then(() => {
                anime({
                    targets:'.background',
                    duration: 1200,
                    easing: 'linear',
                    backgroundImage: ['repeating-linear-gradient(80deg, hsl(41, 70%, 50%), hsl(50, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)', 'repeating-linear-gradient(30deg, hsl(70, 70%, 50%), hsl(110, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)'],
                    direction: 'alternate',
                })
            })
        }
        else if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            anime({
                targets:'.background',
                duration: 1500,
                easing: 'linear',
                backgroundImage: ['repeating-linear-gradient(190deg, hsl(41, 70%, 50%), hsl(50, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)', 'repeating-linear-gradient(190deg, hsl(70, 70%, 50%), hsl(110, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)'],
                direction: 'alternate',
            })
        }
        else {
            anime({
                targets:'.background',
                duration: 1600,
                easing: 'linear',
                backgroundImage: ['repeating-linear-gradient(190deg, hsl(41, 70%, 50%), hsl(50, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)', 'repeating-linear-gradient(190deg, hsl(41, 70%, 50%), hsl(15, 70%, 50%) 8%, hsl(0, 0%, 10%) 12%)'],
                direction: 'alternate',
            })
        }
    },


    // LVL 5

    skewTo0Deg_5: function() {
        document.querySelector('.bg-5').style = 'background-image: unset';
        anime({
            targets: '.board',
            duration: 1000,
            skewY: '0deg',
            loop: false,
        })
    },

    addTilesIdentifer_5: function(cardsOpened, tiles, foundTiles) {
        let allTiles = document.querySelectorAll('.tile');
        for(let i=0; i<tiles/2; i++) {
            allTiles[i].classList.add('tileType1');
        }
        for(let j=(tiles/2); j<tiles; j++) {
            allTiles[j].classList.add('tileType2');
        } 
    },

    resetIcons_5: function(cardsOpened, tiles, foundTiles) {
        const allTiles = document.querySelectorAll('.tile');
        let iconsArr = [];
        let tileTypeArr1 = [];
        let tileTypeArr2 = [];
        let randomizedElems1 = [];
        let randomizedElems2 = [];
        for(let a=0; a<allTiles.length; a++) {
            let back = allTiles[a].querySelector('.tile-back');
            iconsArr.push(back.childNodes[0]);
        }
        function sortSvgs(array) {
            let compareArr = [];
            for(let x=0; x<array.length; x++) {
                compare(array[x], compareArr);
            }
            return compareArr;
        }

        function compare(item, compareArr) {
            compareArr.unshift(item);
            if(compare.length > 1) {
                for(let y=1; y<compareArr.length; y++) {
                    if(item.classList[1] > compareArr[y].classList[1]) {
                        let z = compareArr[y];
                        compareArr[y] = compareArr[y-1];
                        compareArr[y-1] = z;
                    }
                }
            } else {
                return compareArr;
            }
        }

        let sortediconsArr = sortSvgs(iconsArr);

        for(let b=0; b<allTiles.length; b++) {
            if(b%2) {
                tileTypeArr1.push(sortediconsArr[b]);
            } else { tileTypeArr2.push(sortediconsArr[b]); }
        }

        const tileType1 = document.querySelectorAll('.tileType1');
        const tileType2 = document.querySelectorAll('.tileType2');

        for(let c=0; c<(tiles/2); c++) {
            let rand = Math.floor(Math.random() * tileTypeArr1.length);
            randomizedElems1.push(tileTypeArr1[rand]);
            tileTypeArr1.splice(rand, 1);
        }
        for(let d=0; d<(tiles/2); d++) {
            let rand = Math.floor(Math.random() * tileTypeArr2.length);
            randomizedElems2.push(tileTypeArr2[rand]);
            tileTypeArr2.splice(rand, 1);
        }  

        for(let h=0; h<allTiles.length; h++) {
            allTiles[h].childNodes[2].childNodes[0].remove();
        }

        tileType1.forEach((tile, index) => {
            tile.childNodes[2].appendChild(randomizedElems1[index])
        })

        tileType2.forEach((tile, index) => {
            tile.childNodes[2].appendChild(randomizedElems2[index])
        })
    },

    createAnimatedDots_5: function() {
        let animationContainer = document.querySelector('.animationContainer');
        let dots = [];
        for(let i=0; i<40; i++) {
            let dot = document.createElement('div');
            let topv = Math.floor(Math.random()*90)+1;
            let leftv = Math.floor(Math.random()*90)+1;
            dot.classList.add('dot-g');
            animationContainer.appendChild(dot);
            let thisdot = document.querySelector(`.dot-g:nth-child(${i+1})`);
            dots.push(thisdot);
            dot.setAttribute('style', `top:${topv}%;left:${leftv}%;`);
        }

        anime({
            targets: '.dot-g',
            duration: 7000,
            backgroundColor: ['hsl(122, 66%, 32%)', 'hsl(352, 86%, 62%)'],
            delay: anime.stagger(120),
            opacity: ['0.4', '0.8'],
            translateY: [0, '16rem'],
            translateX: [0, '10rem'],
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true,
        })
    },

    hideFirstType_5: function(cardsOpened, tiles, foundTiles) {
        const firstType = document.querySelectorAll('.tileType1');
        const secondType = document.querySelectorAll('.tileType2');

        document.querySelector('.board').dataset.animation = 'on';
        document.querySelector('.board').setAttribute('pointerEvents', 'none');

        firstType.forEach(tile => {
            tile.style.pointerEvents = 'none';
        })

        secondType.forEach(tile => {
            tile.style.pointerEvents = 'auto';
        })

        async function wait() {
            const a1 = anime({
                targets: [firstType, 'svg'],
                delay: 1000,
                duration: 1000,
                borderColor: ['hsl(122, 86%, 32%)', 'hsl(0, 0%, 0%)'],
                opacity: 0,
                easing: 'linear',
            })
    
            const a2 = anime({
                targets: [secondType, 'svg'],
                delay: 1000,
                duration: 1000,
                borderColor: ['hsl(0, 0%, 0%)', 'hsl(122, 86%, 32%)'],
                opacity: 1,
                easing: 'linear',
            })

            Promise.all([a1, a2]);
        }

        wait().then(() => {
            setTimeout(() => {
                document.querySelector('.board').dataset.animation = 'off';
                document.querySelector('.board').setAttribute('pointerEvents', 'auto');
            }, 2000);
        })

    },

    hideSecondType_5: function(cardsOpened, tiles, foundTiles) {
        const secondType = document.querySelectorAll('.tileType2');
        const firstType = document.querySelectorAll('.tileType1');

        document.querySelector('.board').dataset.animation = 'on';
        document.querySelector('.board').setAttribute('pointerEvents', 'none');

        secondType.forEach(tile => {
            tile.style.pointerEvents = 'none';
        })
        
        firstType.forEach(tile => {
            tile.style.pointerEvents = 'auto';
        })

        async function wait() {
            const a1 = anime({
                targets: [secondType, 'svg'],
                delay: 1000,
                duration: 1000,
                borderColor: ['hsl(122, 86%, 32%)', 'hsl(0, 0%, 0%)'],
                opacity: 0,
                easing: 'linear',
            })
    
    
            const a2 = anime({
                targets: [firstType, 'svg'],
                delay: 1000,
                duration: 1000,
                borderColor: ['hsl(0, 0%, 0%)', 'hsl(122, 86%, 32%)'],
                opacity: 1,
                easing: 'linear',
            });

            Promise.all([a1, a2]);
        }

        wait().then(() => {
            setTimeout(() => {
                document.querySelector('.board').dataset.animation = 'off';
                document.querySelector('.board').setAttribute('pointerEvents', 'auto');
            }, 2000);
        })
    },

    generateNewDots_5: function(cardsOpened, tiles, foundTiles, iter) {

        let animationContainer = document.querySelector('.animationContainer');
        if((parseInt(tiles/4) <= parseInt(foundTiles)) && (iter.value < 1)) {
            iter.value = 1;
            for(let i=0; i<20; i++) {
                let dot = document.createElement('div');
                let topv = Math.floor(Math.random()*90)+1;
                let leftv = Math.floor(Math.random()*90)+1;
                dot.classList.add('dot-g-4');
                animationContainer.appendChild(dot);
                dot.setAttribute('style', `top:${topv}%;left:${leftv}%;`);
            }
            anime({
                targets: '.dot-g-4',
                duration: 7000,
                backgroundColor: ['hsl(122, 66%, 32%)', 'hsl(352, 86%, 62%)'],
                delay: anime.stagger(120),
                opacity: ['0.4', '0.8'],
                translateY: [0, '-16rem'],
                translateX: [0, '-10rem'],
                direction: 'alternate',
                easing: 'easeInOutSine',
                loop: true,
            })
        }
        else if((parseInt(tiles/2) <= parseInt(foundTiles)) && (iter.value < 2)) {
            iter.value = 2;
            for(let i=0; i<20; i++) {
                let dot = document.createElement('div');
                let topv = Math.floor(Math.random()*90)+1;
                let leftv = Math.floor(Math.random()*90)+1;
                dot.classList.add('dot-g-2');
                animationContainer.appendChild(dot);
                dot.setAttribute('style', `top:${topv}%;left:${leftv}%;`);
            }
            anime({
                targets: '.dot-g-2',
                duration: 5000,
                backgroundColor: ['hsl(22, 66%, 32%)', 'hsl(122, 66%, 32%)'],
                delay: anime.stagger(120),
                opacity: ['0.4', '0.8'],
                translateY: [0, '20rem'],
                translateX: [0, '20rem'],
                rotate: 90,
                direction: 'alternate',
                easing: 'easeInOutSine',
                loop: true,
            })
        }
    }, 



    // LVL 6

    resetBgImg_6: function(cardsOpened, tiles, foundTiles, iter) {
        iter.value = 0;
        document.querySelector('.bg-6').style = '';
    },

    rotateBoard_6: function(cardsOpened, tiles, foundTiles, iter) {
        let game = document.querySelector('.game-6');
        let board = document.querySelector('.board-6');
        let spinningBox = document.createElement('div');
        spinningBox.classList.add('spinning');
        game.appendChild(spinningBox);
        spinningBox.appendChild(board);
        anime({
            targets: spinningBox,
            duration: 14000,
            keyframes:[
                {rotate: [0, 90]},
                {rotate: [90, 180]},
                {rotate: [180, 270]},
                {rotate: [270, 360]},
            ],
            easing: 'easeOutExpo',
            direction: 'alternate',
            loop: true,
        });

    },

    check_6: function(rotation, tiles, foundTiles) {
        if(foundTiles+2 === tiles) {
            rotation.pause();
            document.querySelector('.board-6').onclick = rotation.pause();
        }  
    },

    createTornados_6: function() {
        const animationContainer = document.querySelector('.animationContainer');
        for(let i=0; i<4; i++) {
            let tornado = document.createElement('div');
            tornado.classList.add('tornado', `tornado-${i+1}`);
            animationContainer.appendChild(tornado);
            for(let x=0; x<9; x++) {
                let tornadoElem = document.createElement('div');
                tornadoElem.classList.add('tornado-elem');
                tornado.appendChild(tornadoElem);
            }
        }
    },

    rotateTornados_6: function() {
        anime({
            targets: `.tornado-1`,
            duration: 4800,
            rotate: 360,
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: `.tornado-2`,
            duration: 6200,
            rotate: -360,
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: `.tornado-3`,
            duration: 6200,
            rotate: -360,
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: `.tornado-4`,
            duration: 4800,
            rotate: 360,
            easing: 'linear',
            loop: true,
        })

    },

    animateTarget_6: function() {
        anime({
            targets: '.target',
            duration: 6400,
            keyframes: [
                {backgroundImage: ['radial-gradient(hsl(52, 80%, 60%) 20%, hsl(29, 80%, 60%) 45%, hsl(282, 80%, 40%))', 'radial-gradient(hsl(29, 80%, 60%) 20%, hsl(52, 80%, 60%) 45%, hsl(282, 80%, 40%))']},
                {backgroundImage: 'radial-gradient(hsl(52, 80%, 60%) 20%, hsl(29, 80%, 60%) 45%, hsl(282, 80%, 40%))'},
                {backgroundImage: 'radial-gradient(hsl(29, 80%, 60%) 20%, hsl(52, 80%, 60%) 45%, hsl(282, 80%, 40%))'},
                {backgroundImage: 'radial-gradient(hsl(52, 80%, 60%) 20%, hsl(29, 80%, 60%) 45%, hsl(282, 80%, 40%))'},
            ],
            loop: false,
        })
    },

    animateMatch_6: function(cardsOpened, tiles, foundTiles, iter) {
        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            anime({
                targets: [cardsOpened[0], cardsOpened[1]],
                duration: 1800,
                backgroundImage: 'radial-gradient(hsl(67, 80%, 60%) 20%, hsl(44, 80%, 60%) 45%, hsl(297, 80%, 60%))',
            })
        }
    },

    isGameFinished_6: function(cardsOpened, tiles, foundTiles, iter) {
        if(foundTiles+2 === tiles) {
            anime({
                targets: '.target',
                duration: 500,
                opacity: [0.5, 0],
                easing: 'linear',
            });
            let randomDiv = document.createElement('div');
            let game = document.querySelector('.game');
            let board = document.querySelector('.board');
            game.appendChild(board);
            let spinningBox = document.querySelector('.spinning');
            randomDiv.appendChild(spinningBox);
            randomDiv.remove();
        }
    },



    // LVL 7

    resetRotatingBoard_7: function() {
        // Clean up level 6 styling
        const allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            back.style = '';
        })

        let randomDiv = document.createElement('div');
        let game = document.querySelector('.game');
        let board = document.querySelector('.board');
        game.appendChild(board);
        let spinningBox = document.querySelector('.spinning');
        if(spinningBox !== null) {
            randomDiv.appendChild(spinningBox);
        }
        randomDiv.remove(); 
    },

    changeAllIconColors_7: function(cardsOpened, tiles, foundTiles, iter) {
        iter.value++;
        if(iter.value%4 === 0) {
            let svgs = document.querySelectorAll('svg');
            svgs.forEach(svg => {
                let hue = Math.floor(Math.random() * 360)+1;
                let saturate  = Math.floor(Math.random() * 80)+11;
                let lightness = Math.floor(Math.random() * 80)+11;
                svg.style = `color: hsl(${hue}, ${saturate}%, ${lightness}%);`;
                let back = svg.parentNode;
                back.setAttribute('backgroundImage', `radial-gradient(hsl(52, 80%, 60%) 20%, hsl(29, 80%, 0%) 25%, hsl(${hue}, 50%, 50%))`); 
            });
        }
    },

    addAnimationBoxes_7: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');
        for(let i=0; i<2; i++) {
            let animationBox = document.createElement('div');
            animationBox.classList.add('animationBox', `animationBox-${i+1}`);
            animationContainer.appendChild(animationBox);
        }

        for(let i=0; i<2; i++) {
            let animationBoxInner = document.createElement('div');
            animationBoxInner.classList.add('animationBoxInner', `animationBoxInner-${i+1}`);
            animationContainer.appendChild(animationBoxInner);
        }


        anime({
            targets: '.animationBox-1',
            duration: 14400,
            keyframes: [
                {translateY: 0, translateX: '87vw', scale: ['100%', '200%'], duration: 5000},
                {translateY: '80vh', translateX: '87vw', scale: ['200%', '100%'], duration: 3000},
                {translateY: '80vh', translateX: '0vw',  scale: ['100%', '200%'],  duration: 5000},
                {translateY: 0, translateX: 0,  scale: ['200%', '100%'], duration: 3000},
            ],
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: '.animationBoxInner-1',
            duration: 14400,
            keyframes: [
                {translateY: 0, translateX: '77vw', scale: ['100%', '200%'], duration: 3500},
                {translateY: '70vh', translateX: '77vw', scale: ['200%', '100%'], duration: 2500},
                {translateY: '70vh', translateX: '0vw',  scale: ['100%', '200%'],  duration: 3500},
                {translateY: 0, translateX: 0,  scale: ['200%', '100%'], duration: 2500},
            ],
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: '.animationBox-2',
            duration: 14400,
            keyframes: [
                {translateY: 0, translateX: '-87vw', scale: ['200%', '100%'], duration: 5000},
                {translateY: '-80vh', translateX: '-87vw', scale: ['100%', '200%'], duration: 3000},
                {translateY: '-80vh', translateX: '0vw', scale: ['200%', '100%'], duration: 5000},
                {translateY: 0, translateX: 0,  scale: ['100%', '200%'], duration: 3000},
            ],
            easing: 'linear',
            loop: true,
        })

        anime({
            targets: '.animationBoxInner-2',
            duration: 14400,
            keyframes: [
                {translateY: 0, translateX: '-77vw', scale: ['100%', '200%'], duration: 3500},
                {translateY: '-70vh', translateX: '-77vw', scale: ['200%', '100%'], duration: 2500},
                {translateY: '-70vh', translateX: '0vw',  scale: ['100%', '200%'],  duration: 3500},
                {translateY: 0, translateX: 0,  scale: ['200%', '100%'], duration: 2500},
            ],
            easing: 'linear',
            loop: true,
        })
    },

    colorAnimationBoxes_7: function(cardsOpened, tiles, foundTiles, iter) {
        let targetTile;
        let selector;
        if(cardsOpened.length <= 1) {  // Jeśli kolorujemy większe pudełko
            if(iter.value%2 > 0) {  // Jeśli to jest pierwsza, lub każda nieparzysta tura
                targetTile = document.querySelector('.target-1');
                selector = '.animationBox-1';
            }
            else {
                targetTile = document.querySelector('.target-1');
                selector = '.animationBox-2';
            }
        }

        else {
            if(iter.value%2 > 0) {
                targetTile = document.querySelector('.target-2');
                selector = '.animationBoxInner-1';
            }
            else {
                targetTile = document.querySelector('.target-2');
                selector = '.animationBoxInner-2';
            }
        }

        let newColor = targetTile.querySelector('.tile-back');
        let color = newColor.getAttribute('backgroundImage');
        if(color) {
            color = color.replace('(hsl(52, 80%, 60%)', '(hsla(5, 0%, 0%, 70%)');
        }

        anime({
            targets: selector,
            duration: 2000,
            backgroundImage:  color,
            loop: false,
            easing: 'linear',
        })
    },

    winAnimation_7: function(cardsOpened, tiles, foundTiles, iter) {
        if(foundTiles+2 === tiles) {
            anime({
                targets: ['.animationBox', '.animationBoxInner'],
                duration: 12200,
                keyframes: [
                    {scale: ['0%', '350%'], duration: 4000},
                    {scale: ['350%', '100%'], duration: 8000},
                ],
                delay: anime.stagger(1000),
                opacity: [1, 0],
                easing: 'easeInOutQuint',
            })
        }
    },



    // LVL 8 

    blockRedTilesClick_8: function(cardsOpened, tiles, foundTiles, iter) {
 
        let allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(tile => {
            let svg = tile.querySelector('svg');
            let svgColor = svg.style.color;
            if(svgColor === 'rgb(230, 105, 76)')  { // if red
                tile.style = 'pointer-events: none;';
            }
        })

    },

    setColorfulBorders_8: function(cardsOpened, tiles, foundTiles, iter) {
        let allTiles = document.querySelectorAll('.tile');
        // Remember that all found tiles exists; they are just not visible
        let existingTiles = [];
        allTiles.forEach(tile => {
            if((tile.style.visibility !== 'hidden') && (!(tile.classList.contains('target')))) {
                existingTiles.push(tile);
            }
        })

        // Now spread out existingTiles array between green and red borders (half and half)
        let greenTiles = [];
        let activeTiles = existingTiles.length;
        
        for(let x=0; x<(activeTiles/2); x++) {
            let rand = Math.floor(Math.random() * existingTiles.length);
            greenTiles.push(existingTiles[rand]);
            existingTiles.splice(rand, 1);
        }

        let redTiles = [...existingTiles];

        for(let y=0; y<greenTiles.length; y++) {
            let svg = greenTiles[y].querySelector('svg');
            svg.style = 'color: hsl(110, 75%, 60%); border-color: hsl(110, 75%, 60%);'
            greenTiles[y].style = 'border: .8rem solid hsla(110, 93%, 29%, 20%);';
        }

        for(let z=0; z<redTiles.length; z++) {
            let svg = redTiles[z].querySelector('svg');
            svg.style = 'color: hsl(11, 75%, 60%); border-color: hsl(11, 75%, 60%);';
            redTiles[z].style = 'border: .8rem solid hsla(11, 93%, 29%, 20%); backgroundImage: radial-gradient(hsla(11, 80%, 60%, 80%) 20%, hsl(33, 80%, 80%) 75%, hsla(55, 80%, 60%, 60%));';
        }

        anime({
            targets: greenTiles,
            duration: 1600,
            easing: 'easeInOutCirc',
            backgroundImage: ['radial-gradient(hsla(110, 80%, 60%, 30%) 20%, hsl(33, 80%, 80%) 75%, hsla(55, 80%, 60%, 20%))', 'radial-gradient(hsla(110, 80%, 60%, 80%) 20%, hsl(33, 80%, 80%) 75%, hsla(55, 80%, 60%, 60%))'],
        })

        if((cardsOpened.length < 2) || ((cardsOpened[0].childNodes[0].classList[1] !== cardsOpened[1].childNodes[0].classList[1]))) {
            anime({
                targets: redTiles,
                duration: 1600,
                easing: 'easeInOutCirc',
                rotate: -90,
                filter: 'sepia(30%)',
            })
        }

        else {
            anime({
                targets: redTiles,
                duration: 1600,
                easing: 'easeInOutCirc',
                rotate: 270,
                filter: 'sepia(30%)',
            })
        }

    },

    lastPairTurnGreen_8: function(cardsOpened, tiles, foundTiles, iter) {
        if((foundTiles+4 === tiles) || (foundTiles+2 === tiles)) {  // last pair before win has to be green of course
            let allTiles = document.querySelectorAll('.tile');
            let lastPair = [];
            allTiles.forEach(tile => {
                if(tile.style.visibility !== 'hidden') {
                    lastPair.push(tile);
                }
            })
            for(let m=0; m<lastPair.length; m++) {
                let svg = lastPair[m].querySelector('svg');
                svg.style = 'color: hsl(110, 75%, 60%); border-color: hsl(110, 75%, 60%);'
                lastPair[m].style = 'border: .8rem solid hsla(110, 93%, 29%, 20%); radial-gradient(hsla(110, 80%, 60%, 80%) 20%, hsl(33, 80%, 80%) 75%, hsla(55, 80%, 60%, 60%));';
            }
        }
    },




    // LVL 9
    
    createMutatingBox_9: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');
        

        let mutatingBox = document.createElement('div');
        mutatingBox.classList.add('mutatingBox');

        let mbText = document.createElement('div');
        mbText.classList.add('mbText');


        mutatingBox.appendChild(mbText);
        animationContainer.appendChild(mutatingBox);

        anime({
            targets: mutatingBox,
            duration: 2200,
            scale: '140%',
            easing: 'easeInBounce',
        })
    },

    enlargeIcons_9: function(cardsOpened,tiles,foundTiles, iter) {

        iter.value = 2.5;

        let iconsArr = [];
        let allIcons = document.querySelectorAll('.fa-icon-9');
        allIcons.forEach(icon => iconsArr.push(icon));

        anime({
            targets: iconsArr,
            duration: 2100,
            scale: ['10%', '100%'],
            delay: anime.stagger(50, {from: 'center'}),  // Don't do that at home
            easing: 'easeInOutExpo',
        })
    },

    checkIconModify_9: function(cardsOpened, tiles, foundTiles, iter) {

        let allIcons = document.querySelectorAll('.fa-icon-9');

        function setIconsColor(iter) {
            if(iter.value >= 2) { //blue
                anime({ targets: allIcons, duration: 1000, fontSize: `${iter.value}rem`,
                    color: 'hsla(194, 70%, 30%, 0.6)', 
                })
            } else if(iter.value >= 1.5) {  //green
                anime({ targets: allIcons, duration: 1000, fontSize: `${iter.value}rem`,
                    color: 'hsla(102, 70%, 30%, 0.6)', 
                })
            } else if(iter.value >= 1) {  //yellow
                anime({ targets: allIcons, duration: 1000, fontSize: `${iter.value}rem`,
                    color: 'hsla(45, 70%, 30%, 0.6)', 
                })
            }
            else {  //red
                anime({ targets: allIcons, duration: 1000, fontSize: `${iter.value}rem`,
                    color: 'hsla(7, 70%, 30%, 0.6)', 
                })
            }
        }

        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            
            if(iter.value <= .5) {
                iter.value +=1;
            }

            iter.value+=.25;

            setIconsColor(iter);
            
        }
        else {
            // Minify icons

            if(iter.value <= 0.3) {return;}

            iter.value-=.2;

            setIconsColor(iter);

        }
    },

    mutateBox_9: function(cardsOpened, tiles, foundTiles, iter) {
        let mutatingBox = document.querySelector('.mutatingBox');
        let mbText = mutatingBox.querySelector('.mbText');
        mbText.textContent = Math.ceil(iter.value*10);
        if(iter.value >= 2) { //blue
            anime({ targets: mbText, duration: 1200, opacity: [0.6, 1],
                color: 'hsla(199, 70%, 45%, 0.9)'})
            anime({targets: mutatingBox, duration: 1500, backgroundColor: 'hsla(199, 70%, 45%, 0.5)'})

        } else if(iter.value >= 1.5) {  //green
            anime({ targets: mbText, duration: 1200, opacity: [0.6, 1],
                color: 'hsla(102, 70%, 45%, 0.9)' })
            anime({targets: mutatingBox, duration: 1500, backgroundColor: 'hsla(102, 70%, 45%, 0.5)'})

        } else if(iter.value >= 1) {  //yellow
            anime({ targets: mbText, duration: 1200, opacity: [0.6, 1],
                color: 'hsla(45, 70%, 45%, 0.9)' })
            anime({targets: mutatingBox, duration: 1500, backgroundColor: 'hsla(45, 70%, 45%, 0.5)'})

        }
        else if(iter.value > 0.3){  //red
            anime({ targets: mbText, duration: 1200, opacity: [0.6, 1],
                color: 'hsla(7, 70%, 45%, 0.9)' })
            anime({targets: mutatingBox, duration: 1500, backgroundColor: 'hsla(7, 70%, 45%, 0.5)'})
        }
        mbText.style += `borderRadius: calc(50% - (${iter.value*10});`;
    },

    winAnimation_9: function(cardsOpened, tiles, foundTiles, iter) {
        if(foundTiles+2 === tiles) {
            let board = document.querySelector('.board');
            let mutatingBox = document.querySelector('.mutatingBox');
            let mbFinalColor = mutatingBox.style.backgroundColor;
        
            anime({
                targets: board,
                duration: 3800,
                opacity: [0.6, 1],
                background: mbFinalColor,
                easing: 'easeOutCubic',

            })

            anime({
                targets: mutatingBox,
                duration: 2200,
                scale: '140%',
                easing: 'easeInBounce',
            })
        }
    },




    // LVL 10

    removeLvl9Stylings_10: function(cardsOpened, tiles, foundTiles, iter) {
        document.querySelector('.board').style.background = 'none';
        const allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            back.childNodes[0].style.fontSize = '1.8rem';
            back.childNodes[0].style.color = 'hsla(229, 91%, 52%, .6)';
        })
    },

    animateBorders_10: function(cardsOpened, tiles, foundTiles, iter) {
        let focusedIcon = [];
        let target = document.querySelectorAll('.target');
        target.forEach(el => {
            let back = el.querySelector('.tile-back');
            el.classList.add('focused'); 
            focusedIcon.push(back.childNodes[0]);
        });

        let newBg = {color: 'n'};
        let newBor = {color: 'n'};

        if(iter.amount === 0) {
            newBg.color = 'hsla(229, 50%, 40%, .4)';
            newBor.color = 'hsla(229, 60%, 50%, .5)';
        }


        else if(iter.amount%5 === 0) {
            newBg.color =  `hsla(8, 0%, 0%, .4)`;
            newBor.color =  `hsla(8, 0%, 0%, .5)`;

        }
        else if(iter.amount%4 === 0) {
            newBg.color =  `hsla(8, 50%, 40%, .4)`;
            newBor.color =  `hsla(8, 60%, 50%, .5)`;

        }
        else if(iter.amount%3 === 0) {
            newBg.color =  `hsla(55, 50%, 40%, .4)`;
            newBor.color =  `hsla(55, 60%, 50%, .5)`;

        }
        else if(iter.amount%2 === 0) {
            newBg.color =  `hsla(317, 50%, 40%, .4)`;
            newBor.color =  `hsla(317, 60%, 50%, .5)`;

        }
        else if(iter.amount%1 === 0) {
            newBg.color =  `hsla(266, 50%, 40%, .4)`;
            newBor.color =  `hsla(266, 60%, 50%, .5)`;

        }
        else {
            newBg.color =  `hsla(177, 50%, 40%, .4)`;
            newBor.color =  `hsla(177, 60%, 50%, .5)`;
        }

        anime({
            targets: target,
            duration: 1800,
            borderColor: `${newBor.color}`,
            backgroundColor: `${newBg.color}`,
            easing: 'easeInQuad',
        })

    },

    randomizeIcons_10: function(cardsOpened, tiles, foundTiles, iter) {
        let allTiles = document.querySelectorAll('.tile');
        let activeIcons = [];
        let notFocusedTiles = [];

        iter.value++;

        if(iter.value%7 === 0) { 

            document.querySelector('.board').dataset.animation = 'on';
            iter.amount++;

            setTimeout(() => {

                allTiles.forEach(tile => {
                    if((tile.style.visibility !== 'hidden') && (!(tile.classList.contains('focused')))) {
                        activeIcons.push(tile.childNodes[2].childNodes[0]);
                        tile.childNodes[2].childNodes[0].remove();
                    }
                })
    
                allTiles.forEach(tile => {
                    if((tile.style.visibility !== 'hidden') && (!(tile.classList.contains('focused')))) {
                        let rand = Math.floor(Math.random() * activeIcons.length);
                        let back = tile.querySelector('.tile-back');
                        if(iter.amount%6 === 0) {activeIcons[rand].style = 'color: hsla(8, 0%, 0%, .6);';}
                        else if(iter.amount%5 === 0) {activeIcons[rand].style = 'color: hsla(8, 91%, 52%, .6);';}
                        else if(iter.amount%4 === 0) {activeIcons[rand].style = 'color: hsla(55, 91%, 52%, .6);';}
                        else if(iter.amount%3 === 0) {activeIcons[rand].style = 'color: hsla(317, 91%, 52%, .6);';}
                        else if(iter.amount%2 === 0) {activeIcons[rand].style = 'color: hsla(266, 91%, 52%, .6);';}
                        else if(iter.amount%1 === 0) {activeIcons[rand].style = 'color: hsla(229, 91%, 52%, .6);';}
                       
                        notFocusedTiles.push(tile);

                        back.appendChild(activeIcons[rand]);
                        activeIcons.splice(rand, 1);
                    } else {
                        iter.array.push(tile);
                    }
                })

                let newBg = {color: 'n'};
                let newBor = {color: 'n'};
                let oldBg = {color: 'o'};
                let oldBor = {color: 'o'};
                let gameBg = {color: '?'}

                if(iter.amount%6 === 0) {
                    newBg.color =  `hsla(8, 0%, 0%, .4)`;
                    newBor.color =  `hsla(8, 0%, 0%, .5)`;
                    gameBg.color = `hsla(8, 0%, 0%, .8)`;
                    oldBg.color =  `hsla(8, 50%, 40%, .4)`;
                    oldBor.color =  `hsla(8, 60%, 50%, .5)`;
                }

                else if(iter.amount%5 === 0) {
                    newBg.color =  `hsla(8, 50%, 40%, .4)`;
                    newBor.color =  `hsla(8, 60%, 50%, .5)`;
                    gameBg.color = `hsla(8, 90%, 30%, .8)`;
                    oldBg.color = `hsla(55, 50%, 40%, .4)`;
                    oldBor.color = `hsla(55, 60%, 50%, .5)`;
                }
                else if(iter.amount%4 === 0) {
                    newBg.color =  `hsla(55, 50%, 40%, .4)`;
                    newBor.color =  `hsla(55, 60%, 50%, .5)`;
                    gameBg.color = `hsla(55, 90%, 30%, .8)`;
                    oldBg.color = `hsla(317, 50%, 40%, .4)`;
                    oldBor.color = `hsla(317, 60%, 50%, .5)`;
                }
                else if(iter.amount%3 === 0) {
                    newBg.color =  `hsla(317, 50%, 40%, .4)`;
                    newBor.color =  `hsla(317, 60%, 50%, .5)`;
                    gameBg.color = `hsla(317, 90%, 30%, .8)`;
                    oldBg.color = `hsla(266, 50%, 40%, .4)`;
                    oldBor.color = `hsla(266, 60%, 50%, .5)`;
                }
                else if(iter.amount%2 === 0) {
                    newBg.color =  `hsla(266, 50%, 40%, .4)`;
                    newBor.color =  `hsla(266, 60%, 50%, .5)`;
                    gameBg.color = `hsla(266, 90%, 30%, .8)`;
                    oldBg.color = `hsla(229, 50%, 40%, .4)`;
                    oldBor.color = `hsla(229, 60%, 50%, .5)`;
                }
                else if(iter.amount%1 === 0) {
                    newBg.color =  `hsla(229, 50%, 40%, .4)`;
                    newBor.color =  `hsla(229, 60%, 50%, .5)`;
                    gameBg.color = `hsla(229, 90%, 30%, .8)`;
                    oldBg.color = `hsla(110, 50%, 40%, .4)`;
                    oldBor.color = `hsla(110, 60%, 50%, .5)`;
                }
                else {
                    newBg.color =  `hsla(177, 50%, 40%, .4)`;
                    newBor.color =  `hsla(177, 60%, 50%, .5)`;
                }

                async function wait() {
                    let newGameBackground = document.querySelector('.bg-10');

                    const a1 = anime({
                        targets: notFocusedTiles,
                        duration: 2500,
                        borderColor:  [`${oldBor.color}`, `${newBor.color}`],
                        backgroundColor: [`${oldBg.color}`, `${newBg.color}`], 
                        easing: 'easeOutExpo',       
                    })

                    
                    const a2 = anime({
                        targets: iter.array,
                        duration: 1200,
                        borderColor: [`${oldBor.color}`, `${oldBor.color}`], 
                        backgroundColor: [`${oldBg.color}`, `${oldBg.color}`], 
                        easing: 'easeOutExpo',
                    })

                    const a3 = anime({
                        targets: newGameBackground,
                        duration: 2200,
                        backgroundColor: `${gameBg.color}`,
                        easing: 'linear',
                    })

                    await Promise.all([a1, a2, a3]);

                }

                wait().then(animate())
                .then(() => {
                    setTimeout(() => {
                        while(iter.array.length > 0) {
                            iter.array.pop();
                        }
                        document.querySelector('.board').dataset.animation = 'off';
                    },3000)
                })
                
                async function animate() {
                    let focusedElems = document.querySelectorAll('.focused');
                    focusedElems.forEach(el => el.classList.remove('focused'));
                    let activeTiles = [];
                    let tilesToAnimate = [];
                    allTiles.forEach(tile => {
                        if(tile.style.visibility !== 'hidden') activeTiles.push(tile);
                    })
                    // Tu zrób animację odsłonięcia pewnej części kart (% z obecnej liczby  kart)
                    for(let i=0; i<(levels[`lvl10`].tiles - foundTiles)/2; i++) {  // show only half of all tiles
                        let rand = Math.floor(Math.random() * activeTiles.length);
                        tilesToAnimate.push(activeTiles[rand]);
                        activeTiles.splice(rand, 1);
                    }

                    if(tilesToAnimate.length > 0) {
                        const inverseReverse = anime.timeline({
                            duration: 2000,
                            easing: 'easeInOutQuart',
                        })
                
                        inverseReverse
                        .add ({
                            targets: tilesToAnimate,
                            transitionProperty: 'all',
                            rotateY: '180deg',
                            loop: false,
                        })
                
                        .add ({
                            targets: tilesToAnimate,
                            transitionProperty: 'all',
                            rotateY: '0deg',
                            loop: false,
                        }, '+=600')

                        Promise.all([inverseReverse]);
                    }
                }

            }, 2000);


        }
    },

    styleIconsBack_10: function(cardsOpened, tiles, foundTiles, iter) {
        if(foundTiles+2 === tiles) {
            const allTiles = document.querySelectorAll('.tile');
            allTiles.forEach(tile => {
                let back = tile.querySelector('.tile-back');
                back.childNodes[0].style = '';
            })
        }
    },



    // LVL 11

    createWantedQuestBoxes_11: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');
        for(let i=0; i<2; i++) {  // Generating two Wanted Boxes
            let wBox = document.createElement('div');
            let headerText = document.createElement('div');
            let svgContainer = document.createElement('div');
            
            wBox.classList.add('wBox', `wBox-${i+1}`);
            headerText.classList.add('hText');
            svgContainer.classList.add('svgContainer');

            headerText.textContent = 'WANTED';

            wBox.appendChild(headerText);
            wBox.appendChild(svgContainer);
            animationContainer.appendChild(wBox);
        }

    },

    setBountyQuest_11: function(cardsOpened, tiles, foundTiles, iter) {
        let allTiles = document.querySelectorAll('.tile');
        let svgCont = document.querySelectorAll('.svgContainer');
        let activeTiles = [];

        if(foundTiles+12 >= tiles)  { // Five from last pairs, so it's unnecessary to generate new bounties / +12
            return;
        }

        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            if((tile.style.visibility !== 'hidden') && (!(tile.classList.contains('target')))) {
                if((svgCont[0].childNodes.length <= 0) && (svgCont[1].childNodes.length <= 0)) {activeTiles.push(tile);}
                else if ((back.childNodes[0].classList[1] !== svgCont[0].childNodes[0].classList[1]) && (!(svgCont[1].hasChildNodes()))) {activeTiles.push(tile);}
                else if ((back.childNodes[0].classList[1] !== svgCont[0].childNodes[0].classList[1]) && (back.childNodes[0].classList[1] !== svgCont[1].childNodes[0].classList[1])) {activeTiles.push(tile);}
            } 
        });

        let rand = Math.floor(Math.random() * activeTiles.length);
 
        anime({
            targets: activeTiles[rand],
            duration: 800,
            borderColor: 'hsla(138, 30%, 40%, .7)',
            borderWidth: '.55rem',
            easing: 'linear',
        })

        activeTiles[rand].classList.add('bounty-q');
    
    },

    markBountyQuestAnswer_11: function(cardsOpened, tiles, foundTiles, iter) {
        let bounty = document.querySelector('.bounty-q');
        let bountyBack = bounty.querySelector('.tile-back');
        let allTiles = document.querySelectorAll('.tile');
        let bountyAnswer = [];

        allTiles.forEach(tile => {
            if((!(tile.classList.contains('bounty-q'))) && (bountyBack.childNodes[0].classList[1] === tile.querySelector('.tile-back').childNodes[0].classList[1])) {
                bountyAnswer.push(tile);
            }
        })

        anime({
            targets: bountyAnswer,
            duration: 1200,
            borderColor: ['#a7c', 'hsl(122, 20%, 30%)'],
            easing: 'linear',
        })

    },

    resetBountyReward_11: function(cardsOpened, tiles, foundTiles, iter) {
        iter.extraTurns = 0;
    },

    rotateChosenTile_11: function(cardsOpened, tiles, foundTiles, iter) {
        let currTarget;
        if(cardsOpened.length <= 1) {
            currTarget = document.querySelector('.target-1');
        } else {
            currTarget = document.querySelector('.target-2');
        }

        async function animate() {
            let random = Math.floor(Math.random() * 2);
            document.querySelector('.board').dataset.animation = 'on';
            document.querySelector('.board').setAttribute('pointerEvents', 'none');
            let rotation;
            if(random%2) { 
                rotation = '-90';
                const a1 = anime({
                    targets: currTarget,
                    duration: 400,
                    rotate: `${rotation}`,
                    easing: 'linear',
                })
               await Promise.all([a1]);
            }
            else  { 
                rotation = '270';
                const a1 = anime({
                    targets: currTarget,
                    duration: 1200,
                    rotate: `${rotation}`,
                    easing: 'linear',
                })
               await Promise.all([a1]);
            }
        }

        animate().then(() => {
            setTimeout(() => {
                document.querySelector('.board').dataset.animation = 'off';
                document.querySelector('.board').setAttribute('pointerEvents', 'auto');
            }, 1200)
        })
        

    },

    checkBountyQuestState_11: function(cardsOpened, tiles, foundTiles, iter) {
        let targetBackFirst = document.querySelector('.target-1 .tile-back');
        let targetBackSecond = document.querySelector('.target-2 .tile-back');
        let allSvgConts = document.querySelectorAll('.svgContainer');

        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) { // if pairs match
            // lets check if player found bountyQuest

            iter.extraTurns = 1;

            this.removeWantedQuest_11(cardsOpened, tiles, foundTiles, iter); // Please do not remove it even it's not showin up in levels main obj

            if((cardsOpened[0].parentNode.classList.contains('bounty-q') || (cardsOpened[1].parentNode.classList.contains('bounty-q')))) {
                iter.extraTurns = -4; // 2 extra  turns, since it takes 1 turn to find, and every pair consumes 1 extra turn

                if(cardsOpened[0].parentNode.classList.contains('bounty-q')) {
                    this.setWantedQuest_11(cardsOpened, tiles, foundTiles, iter); // Please do not remove it even it's not showin up in levels main obj
                }

                let foundBounty = document.querySelector('.bounty-q');
                foundBounty.classList.remove('bounty-q');

                // INIT NEW BOUNTY GENERATOR
                this.setBountyQuest_11(cardsOpened, tiles, foundTiles, iter);
            } 
            else if(allSvgConts[1].hasChildNodes()) {
                if((targetBackSecond.childNodes[0].classList[1] !== allSvgConts[1].childNodes[0].classList[1])) {  // else if its not wanted quest 
                    anime({
                        targets: '.target',
                        duration: 1500,
                        borderColor: 'hsla(0, 63%, 48%, .7)',
                        easing: 'easeInQuad',
                    })
                }
            }

            else if(allSvgConts[0].hasChildNodes()) { // if any wanted quest exists
            
                if(targetBackFirst.childNodes[0].classList[1] !== allSvgConts[0].childNodes[0].classList[1]) {  // else if its not wanted quest 
                    anime({
                        targets: '.target',
                        duration: 1500,
                        borderColor: 'hsla(0, 63%, 48%, .7)',
                        easing: 'easeInQuad',
                    })
                }
            }
        }
    },

    removeWantedQuest_11: function(cardsOpened, tiles, foundTiles, iter) {
        // Remove found WANTED icons - if pair match
        let allSvgConts = document.querySelectorAll('.svgContainer');

        if(allSvgConts[1].childNodes.length > 0) {
            if(cardsOpened[0].childNodes[0].classList[1] === allSvgConts[1].childNodes[0].classList[1]) {
                iter.extraTurns = -3; // 1 extra  turns, since it takes 1 turn to find, and every pair consumes 1 extra turn
                async function animation() {
                    const a1 =  anime({
                        targets: allSvgConts[1].childNodes[0],
                        duration: 800,
                        opacity: [1, 0],
                        easing: 'linear',
                    })

                    Promise.all([a1]);
                }

                animation().then(() => allSvgConts[1].childNodes[0].remove());
            }
            else if(cardsOpened[0].childNodes[0].classList[1] === allSvgConts[0].childNodes[0].classList[1]) {
                iter.extraTurns = -3; // 1 extra  turns, since it takes 1 turn to find, and every pair consumes 1 extra turn
                let svgSecond = allSvgConts[1].childNodes[0];
                allSvgConts[0].childNodes[0].remove();
                allSvgConts[0].appendChild(svgSecond);
            }
        }

        else if(allSvgConts[0].childNodes.length > 0) {
            if(cardsOpened[0].childNodes[0].classList[1] === allSvgConts[0].childNodes[0].classList[1]) {
                iter.extraTurns = -3; // 1 extra  turns, since it takes 1 turn to find, and every pair consumes 1 extra turn
                async function animation() {
                    const a1 =  anime({
                        targets: allSvgConts[0].childNodes[0],
                        duration: 800,
                        opacity: [1, 0],
                        easing: 'linear',
                    })

                    Promise.all([a1]);
                }

                animation().then(() => allSvgConts[0].childNodes[0].remove());
            }
        }
    },

    setWantedQuest_11: function(cardsOpened, tiles, foundTiles, iter) {

        let allTiles = document.querySelectorAll('.tile');
        let allSvgConts = document.querySelectorAll('.svgContainer');
        let alreadyWantedIcon_1;

        if(document.querySelector('.svgContainer').childNodes.length > 0) {
            alreadyWantedIcon_1= document.querySelector('.svgContainer svg').classList[1];
        } else {
            alreadyWantedIcon_1 = 'no-class';
        }

        let activeTiles = [];

        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            if((tile.style.visibility !== 'hidden') && (!(tile.classList.contains('target'))) && (alreadyWantedIcon_1 !== back.childNodes[0].classList[1])) {
                activeTiles.push(tile);
            }
        });

        let rand = Math.floor(Math.random() * activeTiles.length);

        let wantedSvg = activeTiles[rand].querySelector('svg');
        let newSvg = wantedSvg.cloneNode(true);

        // Push new WANTED quests to container 

        if(allSvgConts[0].childNodes.length <= 0) {
            allSvgConts[0].appendChild(newSvg);
        } 
        else if(allSvgConts[1].childNodes.length <= 0) {
            allSvgConts[1].appendChild(newSvg);
        }
        else if((allSvgConts[0].childNodes.length > 0) && (allSvgConts[1].childNodes.length > 0)) {
            let svgSecond = allSvgConts[1].childNodes[0];
            allSvgConts[0].childNodes[0].remove();
            allSvgConts[0].appendChild(svgSecond);

            allSvgConts[1].appendChild(newSvg);
        }

        /* 
          Rozważ, czy bounty quest może być tym samym co WANTED quest. Jeśli nie, zrób odpowiedni mechanizm blokujący taką sytuację
        */
    },





    // LVL 12

    prepareIterArray_12: function(cardsOpened, tiles, foundTiles, iter) {
        for(let i=0; i<4; i++) {
            iter.array.push(0);
        }
    },

    createGlowingDots_12: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');
        for(let i=0; i<(levels[`lvl12`].tiles / 2); i++) { //  it stands for number of pairs
            let dot = document.createElement('div');
            dot.classList.add('glowing-dot', `glowing-${(i+1)%4}`);
            animationContainer.appendChild(dot);

            let topv = Math.floor( Math.random() * 80) + 10; // 10 to 90
            let leftv = Math.floor( Math.random() * 80) + 10; // 10 to 90

            dot.setAttribute('style', `top:${topv}%;left:${leftv}%;`);
        }

    },

    animateTileClick_12: function(cardsOpened, tiles, foundTiles, iter) {
        let rand = Math.floor(Math.random() * 4);
        let colorArr = ['hsla(144, 50%, 55%, .85)', 'hsla(33, 50%, 55%, .85)', 'hsla(178, 50%, 55%, .85)', 'hsla(232, 50%, 55%, .85)' ]

        switch (cardsOpened.length) {
            case 1: {
                anime({
                    targets: '.target-1',
                    duration: 1600,
                    borderColor: ['none', `${colorArr[rand]}`],
                    borderWidth: '.2rem',
                })
                anime({
                    targets: '.target-1 div svg',
                    duration: 1600,
                    color: ['none', `${colorArr[rand]}`],
                })
                break;
            }

            case 2: {

                anime({
                    targets: '.target-2',
                    duration: 1600,
                    borderColor: ['none', `${colorArr[rand]}`],
                    borderWidth: '.2rem',
                })
                anime({
                    targets: '.target-2 div svg',
                    duration: 1600,
                    color: ['none', `${colorArr[rand]}`],
                })

                break;
            }

            default: {
                // **EMPTY**
            }
        }
    },


    moveDots_12: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');

        let rand = Math.floor(Math.random() * 4);

        let randDotType = animationContainer.querySelectorAll(`.glowing-${rand}`);

        if(randDotType.length !== 0) {
            if(iter.array[rand] % 4 === 0) {
                anime({
                    targets: randDotType,
                    duration: 1400,
                    translateX: '-=3rem',
                    translateY: '-=3rem',
                    easing: 'easeOutExpo',

                })
                iter.array[rand]++;
            }
            else if(iter.array[rand] % 4 === 1) {
                anime({
                    targets: randDotType,
                    duration: 1400,
                    translateX: '+=3rem',
                    translateY: '-=3rem',
                    rotate: '90deg',
                    easing: 'easeOutExpo',

                })
                iter.array[rand]++;
            }
            else if(iter.array[rand] % 4 === 2) {
                anime({
                    targets: randDotType,
                    duration: 1400,
                    translateX: '+=3rem',
                    translateY: '+=3rem',
                    rotate: '90deg',
                    easing: 'easeOutExpo',

                })
                iter.array[rand]++;
            }
            else if(iter.array[rand] % 4 === 3) {
                anime({
                    targets: randDotType,
                    duration: 1400,
                    translateX: '-=3rem',
                    translateY: '+=3rem',
                    rotate: '90deg',
                    easing: 'easeOutExpo',

                })
                iter.array[rand]++;
            }
        }
    },


    checkDotRemoval_12: function(cardsOpened, tiles, foundTiles, iter) {
        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            const allTiles = document.querySelectorAll('.tile');

            if(foundTiles+14 < tiles) {
                // Remove all visible borders  
                anime({
                    targets: allTiles,
                    duration: 1000,
                    borderColor: 'none',
                    borderWidth: '0rem',
                    easing: 'linear',
                })
            }  else if(foundTiles+8 > tiles) {
                anime({
                    targets: allTiles,
                    duration: 1800,
                    borderColor: ['hsl(0, 0%, 0%)','hsl(15, 40%, 60%)'],
                    borderWidth: ['0rem', '.4rem'],
                    easing: 'linear',
                })
            }   else  {
                // Help finding tiles
                let helpArr = [];
                allTiles.forEach(tile => { if(tile.style.visibility !== 'hidden') {
                    
                    helpArr.push(tile);
                }})

                let rand = Math.floor(Math.random() * helpArr.length);
                let rand2 = Math.floor(Math.random() * helpArr.length);
                let helpTile = helpArr[rand];
                let helpTile2 = helpArr[rand2];

                anime({
                    targets: [helpTile, helpTile2],
                    duration: 1800,
                    borderColor: ['hsl(0, 0%, 0%)','hsl(15, 40%, 60%)'],
                    borderWidth: ['0rem', '.4rem'],
                    easing: 'linear',
                })
            }
            
            // Remove 1 dot from the map

            const animationContainer = document.querySelector('.animationContainer');
            const time = 1800;

            async function fade() {
                const a1 = anime({
                    targets: '.glowing-dot:nth-of-type(1)',
                    duration: time,
                    easing: 'linear',
                    opacity: [1, 0],
                })

                await Promise.all([a1]);
            }

            fade().then(() => {animationContainer.querySelector('.glowing-dot:nth-of-type(1)').remove();})
            
        }
    },





    // LVL 13

    styleElements_13: function(cardsOpened, tiles, foundTiles, iter) {
        let divideNum = levels[`lvl13`].columns;
        const allTiles = document.querySelectorAll('.tile');

        allTiles.forEach((tile, index) => {
            let back = tile.querySelector('.tile-back');
            let icon = back.childNodes[0];

            if(index%divideNum < (divideNum/3)) {
                tile.style = 'border: .3rem solid hsla(23, 40%, 50%, .5); background-image: radial-gradient(hsl(166, 0%, 0%), hsl(23, 40%, 50%), hsl(62, 0%, 0%));';
                icon.style =  'color: hsl(23, 50%, 60%)';
            }

            else if(index%divideNum >= ((divideNum * 2)/3)) {
                tile.style = 'border: .3rem solid hsla(62, 40%, 50%, .5); background-image: radial-gradient(hsl(166, 0%, 0%), hsl(62, 40%, 50%), hsl(23, 0%, 0%));';
                icon.style =  'color: hsl(62, 50%, 60%)';
            }

            else {
                icon.style =  'color: hsl(166, 50%, 60%)';
            }
        })
    },

    createSubstractionVisuals_13: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');
        let substractCounter = document.createElement('div');
        substractCounter.classList.add('substract');
        animationContainer.appendChild(substractCounter);
    },

    startAnimateTiles_13: function(cardsOpened, tiles, foundTiles, iter) {
        const allTiles = document.querySelectorAll('.tile');
        anime({
            targets: allTiles,
            duration: 800,
            rotate: [120, 360],
            translateX: ['1.3rem', '0rem'],
        })
    },

    addInteractiveStrips_13: function(cardsOpened, tiles, foundTiles, iter) {
        const board = document.querySelector('.board');
        const boardbox = document.createElement('div');
        boardbox.classList.add('bbox');
        board.appendChild(boardbox);

        for(let i=0; i<(levels[`lvl13`].columns); i++) {
            let strip = document.createElement('div');
            strip.classList.add('strip');
            let bgcolor;
            if(i < (levels[`lvl13`].columns)/3) {
                bgcolor = 'background-color: hsl(23, 50%, 60%)';
                strip.classList.add('s-brown');
            } else if( i < ((levels[`lvl13`].columns)/1.5)) {
                bgcolor = 'background-color: hsl(166, 50%, 60%)';
                strip.classList.add('s-silver');
            } else {
                bgcolor = 'background-color: hsl(62, 50%, 60%)';
                strip.classList.add('s-gold');
            }
            strip.setAttribute('style', `top:${10}%;left:${i * (100/(levels[`lvl13`].columns))}%; width: ${(100/(levels[`lvl13`].columns))}%; ${bgcolor}; `); //visibility: hidden;

            boardbox.appendChild(strip);
        }
    },

    visibleStrips_13: function(cardsOpened, tiles, foundTiles, iter) {

        if(cardsOpened[1].childNodes[0].style.color === 'rgb(102, 204, 180)') {  // silver
            async function aSerires() {
                const a1 = anime({
                    targets: '.s-silver',
                    duration: 1500,
                    delay: anime.stagger(600, {from: 'center'}),
                    backgroundImage: 'radial-gradient(hsl(23, 0%, 0%), hsl(166, 40%, 50%), hsl(62, 0%, 0%))',
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                }).finished;

                await Promise.all([a1]);
            } 

            async function aFinish() {
                const a2 = anime({
                    targets: '.s-silver',
                    duration: 700,
                    delay: anime.stagger(600, {from: 'center'}),
                    opacity: [1, 0],
                    easing: 'easeInExpo',
                }).finished;

                await Promise.all([a2]);
            }

            async function init() {
                await aSerires();
                await aFinish();
            }

            init();

        } else if(cardsOpened[1].childNodes[0].style.color === 'rgb(204, 141, 102)') { // brown
            async function aSerires() {
                const a1 = anime({
                    targets: '.s-brown',
                    duration: 1500,
                    delay: anime.stagger(600),
                    backgroundImage: 'radial-gradient(hsl(23, 0%, 0%), hsl(23, 40%, 50%), hsl(62, 0%, 0%))',
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                }).finished;

                await Promise.all([a1]);
            } 

            async function aFinish() {
                const a2 = anime({
                    targets: '.s-brown',
                    duration: 700,
                    delay: anime.stagger(600),
                    opacity: [1, 0],
                    easing: 'easeInExpo',
                }).finished;

                await Promise.all([a2]);
            }

            async function init() {
                await aSerires();
                await aFinish();
            }

            init();

        } else { // gold

            async function aSerires() {
                const a1 = anime({
                    targets: '.s-gold',
                    duration: 1500,
                    delay: anime.stagger(600, {from: 'last'}),
                    backgroundImage: 'radial-gradient(hsl(23, 0%, 0%), hsl(62, 40%, 50%), hsl(62, 0%, 0%))',
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                }).finished;

                await Promise.all([a1]);
            } 

            async function aFinish() {
                const a2 = anime({
                    targets: '.s-gold',
                    duration: 700,
                    delay: anime.stagger(600),
                    opacity: [1, 0],
                    easing: 'easeInExpo',
                }).finished;

                await Promise.all([a2]);
            }

            async function init() {
                await aSerires();
                await aFinish();
            }

            init();
        }
    },

    animateCardSide_13: function(cardsOpened, tiles, foundTiles, iter) {
        let currTarget;
        let elemBg = {color: '', newColor: ''};

        if(cardsOpened.length <= 1) {
            currTarget = document.querySelector('.target-1');
        } else {
            currTarget = document.querySelector('.target-2');
        }

        let back = currTarget.querySelector('.tile-back');

        if(back.childNodes[0].style.color === 'rgb(204, 141, 102)') {  // if brown
            elemBg.color = 'radial-gradient(hsl(0, 0%, 0%), hsl(23, 40%, 50%), hsl(0, 0%, 0%))';
            elemBg.newColor = 'radial-gradient(hsl(23, 40%, 50%), hsl(0, 0%, 0%), hsl(23, 40%, 50%))';
        } else if (back.childNodes[0].style.color === 'rgb(102, 204, 180)') {  // if silver
            elemBg.color = 'radial-gradient(hsl(0, 0%, 0%), hsl(166, 40%, 50%), hsl(0, 0%, 0%))';
            elemBg.newColor = 'radial-gradient(hsl(166, 40%, 50%), hsl(0, 0%, 0%), hsl(166, 40%, 50%))';
        } else { // if gold
            elemBg.color = 'radial-gradient(hsl(0, 0%, 0%), hsl(62, 40%, 50%), hsl(0, 0%, 0%))';
            elemBg.newColor = 'radial-gradient(hsl(62, 40%, 50%), hsl(0, 0%, 0%), hsl(62, 40%, 50%))';
        }

        async function first() {
            const a1 = anime({
                targets: currTarget,
                duration: 2200,
                keyframes: [
                    {backgroundImage: `${elemBg.newColor}`, duration: 1600,  easing: 'easeInExpo'},
                    {backgroundImage: `${elemBg.color}`,  easing: 'easeInBounce'},
                ],
            })

            await Promise.all([a1]);
        }

        async function second() { 
            if(cardsOpened.length > 1) {
                anime({
                    targets: '.target',
                    duration: 800,
                    opacity: .1,
                })
            }
        }

        async function init() {
            await first();
            await second();
        }

        init();
    },

    cardsMatchCheckoutAndAnimation_13(cardsOpened, tiles, foundTiles, iter) {
        if(foundTiles+2 === tiles) {
            // Remove strips appended to board comp
            let bbox = document.querySelector('.bbox');
            if(bbox !== null) {
                bbox.remove(); // remove this div with all it's ancestors (strip class)
            }
        }
        else if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            anime({
                targets: [cardsOpened[0].parentNode, cardsOpened[1].parentNode],
                duration: 2000,
                easing: 'linear',
                scale: ['100%', '20%'],
            })
            iter.streak = 0;
            iter.extraTurns = 0;
        }
        else {  // if cards does not match
            let number = 3;
            if(iter.streak > number) {
                iter.extraTurns = iter.streak - number;

                let substract = document.querySelector('.substract');
                substract.textContent = `-${iter.extraTurns+1}`;
    
                anime({
                    targets: substract,
                    duration: 2100,
                    keyframes: [
                        {opacity: 1, translateY: 0, duration: 400},
                        {opacity: .4, translateY: 40, duration: 700},
                        {opacity: 0, translateY: 70, duration: 1000},
                    ],
                })
            }
            iter.streak++;
        }
    },



    // LVL 14

    temporaryRemovalFunction_14: function(cardsOpened, tiles, foundTiles, iter) {
        let bbox = document.querySelector('.bbox');
            if(bbox !== null) {
                bbox.remove(); // remove this div with all it's ancestors (strip class)
            }
    },

    iconsAppear_14: function(cardsOpened, tiles, foundTiles, iter) {
        const allTiles = document.querySelectorAll('.tile');
        anime({
            targets: allTiles,
            duration: 2600,
            backgroundImage: ['none', 'linear-gradient(45deg, hsl(99, 100%, 100%) 10%, hsl(60, 1%, 40%))'],
            easing: 'easeInSine',
        })

        // Plus give their tilebacks identifier class (silver);
        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            back.classList.add('silver');
        })

    },

    tileBackgroundRetrieve_14: function(cardsOpened, tiles, foundTiles, iter) {
        anime({
            targets: '.target-1',
            duration: 1400,
            backgroundImage: 'linear-gradient(45deg, hsl(99, 100%, 100%) 10%, hsl(60, 1%, 40%))',
            easing: 'easeOutSine',
        })
    },

    blockSecondTileReveal_14: function(cardsOpened, tiles, foundTiles, iter) {
        document.querySelector('.target-2').style = 'background-image: none;';

        anime({
            targets: '.target-2',
            duration: 1800,
            easing: 'easeOutInCirc',
            backgroundImage: 'none',
            opacity: [0, 1],
        })
    },

    checkForPairCombo_14(cardsOpened, tiles, foundTiles, iter) {
        const allTiles = document.querySelectorAll('.tile');
        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {

            // Do some operations here//

            let firstBg = cardsOpened[0].classList[cardsOpened[0].classList.length-1];
            let secBg =  cardsOpened[1].classList[cardsOpened[1].classList.length-1];

           if(firstBg === secBg) {
                document.querySelector('.board').dataset.animation = 'on';
                document.querySelector('.board').setAttribute('pointerEvents', 'none');

                let typeArr = [];

                if(firstBg === 'silver') { // Two silvers combined
                    // Reveal only GOLD tiles
                    allTiles.forEach(tile => {
                        let back = tile.querySelector('.tile-back');
                        if(back.classList.contains('gold')) typeArr.push(back.parentNode);
                    })
                }

                else if(firstBg === 'gold') {
                    // Reveal only SILVER tiles
                    allTiles.forEach(tile => {
                        let back = tile.querySelector('.tile-back');
                        if(back.classList.contains('silver')) typeArr.push(back.parentNode);
                    })
                }

                async function reveal() {
                    const typeAppear = anime({
                        targets: typeArr,
                        keyframes: [
                            {rotateY: '+=180deg', duration: 500, easing: 'easeInSine'},
                            {rotateY: '-=180deg', duration: 500, delay: 1250, easing: 'easeOutSine'},
                        ],
                    }).finished;

                   await Promise.all([typeAppear]);
                }

                async function init() {
                    await reveal()
                        .then(() => {
                            document.querySelector('.board').dataset.animation = 'off';
                            document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                        })
                }

                init();
           }

        }

        // And then... //
        cardsOpened[0].classList.replace(cardsOpened[0].classList[cardsOpened[0].classList.length-1], 'silver');
        cardsOpened[1].classList.replace(cardsOpened[1].classList[cardsOpened[1].classList.length-1], 'gold');
    },




    // LVL 15
    darkenBeginningAnimation_15: function(cardsOpened, tiles, foundTiles, iter) {
        const aContainer = document.querySelector('.animationContainer');
        anime({
            targets: aContainer,
            duration: 2700,
            keyframes: [
                {backgroundColor: 'hsla(1, 0%, 0%, 1)'}, 
                {backgroundColor: 'hsla(1, 0%, 0%, .8)', duration: 900},
                {backgroundColor: 'hsla(1, 0%, 0%, .4)', duration: 900},
                {backgroundColor: 'hsla(1, 0%, 0%, .0)', duration: 900},
            ],
            easing: 'easeInSine',
        })
    },

    createSubstractionVisuals_15: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');
        let substractCounter = document.createElement('div');
        substractCounter.classList.add('substract');
        animationContainer.appendChild(substractCounter);
    },

    createAdditionalTiles_15: function(cardsOpened, tiles, foundTiles, iter) {
        const board = document.querySelector('.board');
        for(let i=0; i<levels[`lvl15`].columns; i++) {
            // Front
            let front = document.createElement('div');
            front.classList.add('tile-front', 'tf-15');
            // Back
            let back = document.createElement('div');
            back.classList.add('tile-back', 'tb-15');

            // Img (svg)
            let svg = document.createElement('img');
            svg.alt = 'icon';
            svg.src = `bombicon-${(i%3)+1}.svg`;
            svg.classList.add('fa-icon-15', `fake-${i}`, `scaledImg`); // fake-${i} is NOT styling based class

            let newTile = document.createElement('div');
            newTile.classList.add('tile', 't-15');

            back.appendChild(svg);

            newTile.appendChild(front);
            newTile.appendChild(back);

            board.appendChild(newTile);
        }
    },

    redistributeIcons_15: function(cardsOpened,tiles,foundTiles, iter) {
        const iconsArray = [];
        const colors = {1: 'hsla(25, 50%, 44%, .35)', 2: 'hsla(144, 50%, 44%, .35)', 3: 'hsla(299, 50%, 44%, .35'};
        const allTiles = document.querySelectorAll('.tile');

        // push elems to array & remove it from DOM 
        allTiles.forEach((tile, index) => {
            let back = tile.querySelector('.tile-back');
            iconsArray.push(back.childNodes[0]);
            back.childNodes[0].style = `color: ${colors[(index%3)+ 1]};`;
            back.childNodes[0].remove();
        })

        // now let's randomize order & append it to DOM back
        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            let rand = Math.floor(Math.random() * iconsArray.length);
            back.appendChild(iconsArray[rand]);
            iconsArray.splice(rand, 1);
        })

    },

    animateChosenTile_15: function(cardsOpened,tiles,foundTiles, iter) {
        let currTarget;

        if(cardsOpened.length <= 1) {
            currTarget = document.querySelector('.target-1');
        } else {
            currTarget = document.querySelector('.target-2');
        }

        anime({
            targets: currTarget,
            duration: 700,
            scale: ['100%', '120%'],

        })
    },

    isBombRevealed_15: function(cardsOpened,tiles,foundTiles, iter)  {
        iter.amount = 0;
        iter.extraTurns = 0;
        for(let i=0; i<cardsOpened.length; i++) {
            if(cardsOpened[i].childNodes[0].classList.contains('scaledImg')) {
                iter.extraTurns+=3;
                iter.amount++;

                anime({
                    targets: '.details-item',
                    duration: 1400,
                    color: 'hsl(11, 60%, 40%)',
                    direction: 'alternate',
                }) 
            }
        }

        if(iter.amount >= 2) {
            iter.extraTurns+=3;

            anime({
                targets: '.background',
                duration: 1400,
                backgroundColor: 'hsl(11, 60%, 40%)',
                direction: 'alternate',
            }) 
        }

        if(iter.amount > 0) {
            let substract = document.querySelector('.substract');
            substract.textContent = `-${iter.extraTurns+1}`;
    
            anime({
                targets: substract,
                duration: 2100,
                keyframes: [
                    {opacity: 1, translateY: 0, duration: 400},
                    {opacity: .4, translateY: 40, duration: 700},
                    {opacity: 0, translateY: 70, duration: 1000},
                ],
            })   
        } 

    },

    ifWinRemoveFakeTiles_15: function(cardsOpened,tiles,foundTiles, iter) {
        if(foundTiles+2 === tiles) {
            let allTiles = document.querySelectorAll('.tile');
            let allFakeTiles = [];
            allTiles.forEach(tile => {
                let back = tile.querySelector('.tile-back');
                // If we have img in fact, not svg - so its bomb elem
                if((tile.style.visibility !== 'hidden') && (back.childNodes[0].hasOwnProperty('src'))) {allFakeTiles.push(tile);}
            })

            async function animateWin() {
                const a1 = anime({
                    targets: allFakeTiles,
                    duration: 200, 
                    scale: '0%',
                    easing: 'easeInBounce',
                })
                await Promise.all([a1]);
            }

            async function init() {
                await animateWin()
                .then(() => {
                    while(allFakeTiles.length > 0) {
                        allFakeTiles[0].remove();
                        allFakeTiles.shift();
                    }
                })
            }

            init();
        }

        else if((foundTiles + 4 === tiles) && (cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])){
            const allTiles = document.querySelectorAll('.tile');
            document.querySelector('.board').dataset.animation = 'on';
            document.querySelector('.board').setAttribute('pointerEvents', 'none');
            let bombs = [];

            allTiles.forEach(tile => {
                if(tile.style.visibility !== 'hidden') {
                    let back = tile.querySelector('.tile-back');
                    if(back.childNodes[0].classList.contains('scaledImg')) {
                        bombs.push(tile);
                    }
                }
            })

            async function hideBombs() {
                const a1 = anime({
                    targets: bombs,
                    duration: 1800,
                    scale: [1, 0],
                    easing: 'linear',
                }).finished;

                await Promise.all([a1]);
            }

            async function showInvisibleBombs() {
                const a2 = anime({
                    targets: bombs,
                    duration: 200,
                    scale: [0, 1],
                    easing: 'linear',
                }).finished;

                await Promise.all([a2]);
            }

            async function init() {
                await hideBombs()
                    .then(() => {
                        bombs.forEach(tile => {
                            tile.style.visibility = 'hidden';
                        })

                        document.querySelector('.board').dataset.animation = 'off';
                        document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                    })
                await showInvisibleBombs()
            }
            
            init();
        }
    },


    // LVL 16
    temporaryBombsRemoval_16: function(cardsOpened, tiles, foundTiles, iter) {
        let allBombs = document.querySelectorAll('.scaledImg');
        let bombsArr = [...allBombs];
        if(allBombs.length > 0) {
            while(bombsArr.length > 0) {
                bombsArr[0].parentNode.parentNode.remove();
                bombsArr.shift();
            }
        }
    },

    upgradeBuggedTiles_16: function(cardsOpened, tiles, foundTiles, iter) {
        const allTiles = document.querySelectorAll('.tile');
        const wrong = 15;
        const correct = 16;
        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            if(tile.classList[1] === `t-${wrong}`) {
                tile.classList.remove(`t-${wrong}`);
                back.classList.remove(`tb-${wrong}`);
                tile.classList.add(`t-${correct}`);
                back.classList.add(`tb-${correct}`);
            }
            back.childNodes[0].style = '';
        })
    },

    startingAnimation_16: function(cardsOpened, tiles, foundTiles, iter) {

        document.querySelector('.board').dataset.animation = 'on';
        document.querySelector('.board').setAttribute('pointerEvents', 'none');

        const bg = document.querySelector('.background');

        async function hideBg() {
           const hide = anime ({
               targets: bg,
               duration: 300,
               opacity: [.2, 0],
               easing: 'linear',
           }).finished;

           await Promise.all([hide])
        }

        async function reveal() {
            const reveal = anime({
                targets: '.tile',
                keyframes: [
                    {rotateY: '+=180deg', duration: 1400, delay: 1300, easing: 'easeOutExpo'},
                ],
                direction: 'alternate',
            }).finished;

           await Promise.all([reveal]);
        }

        async function showBg() {
            const show = anime ({
                targets: bg,
                duration: 2500,
                opacity: [0, 1],
                easing: 'linear',
            }).finished;
 
            await Promise.all([show])
         }

        async function init() {
            await hideBg()
            await showBg()
            await reveal()
                .then(() => {
                    document.querySelector('.board').dataset.animation = 'off';
                    document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                })
        }

        init();
    },

    isUnfreezingTime_16: function(cardsOpened, tiles, foundTiles, iter) {
        if(foundTiles+16 >= tiles) {
            iter.amount++;
        }

        if(iter.amount === 1) {

            let unfreezedElems = [];

            while(iter.array.length > 0) {
                iter.array[0].parentNode.style = 'pointer-events: auto;';
                unfreezedElems.push(iter.array[0].parentNode);
                iter.array.shift();
            }

            anime({
                targets: unfreezedElems,
                duration: 2400,
                delay: anime.stagger(200),
                backgroundImage: 'radial-gradient(hsla(0, 0%, 0%, 0) 45%, hsla(0, 100%, 100%, .8)',
                borderWidth: ['.6rem', '.3rem'],
                rotate: 180,
            })
        }

    },

    testFreezingCondition_16: function(cardsOpened, tiles, foundTiles, iter) {
        if(cardsOpened[0].childNodes[0].classList[1] !== cardsOpened[1].childNodes[0].classList[1]) {
            
            if(iter.amount > 0) {return; }

            for(let i=0; i<2; i++) {
                cardsOpened[i].parentNode.style = 'pointer-events: none;';
                iter.array.push(cardsOpened[i]);
            }

            let unfreezedElems = [];

            if(iter.array.length >= 8) {
                while(iter.array.length > 6) {
                    iter.array[0].parentNode.style = 'pointer-events: auto;';
                    unfreezedElems.push(iter.array[0].parentNode);
                    iter.array.shift();
                }

                // Animate unfreezing process
                anime({
                    targets: unfreezedElems,
                    duration: 1900,
                    backgroundImage: 'radial-gradient(hsla(0, 0%, 0%, 0) 45%, hsla(0, 100%, 100%, .8)',
                    borderWidth: ['.6rem', '.3rem'],
                }) 
            }

            // Freeze new elems
            anime({
                targets: '.target',
                duration: 1900,
                backgroundImage: ['radial-gradient(hsla(0, 0%, 0%, 0) 5%, hsl(0, 100%, 100%)', 'radial-gradient(hsla(0, 0%, 0%, 0) 5%, hsl(0, 100%, 100%)'],
                borderWidth: '.6rem',
            })
        } else {
            anime({
                targets: '.target',
                duration: 1900,
                backgroundImage: 'radial-gradient(hsla(0, 0%, 0%, 0) 85%, hsla(0, 100%, 100%, .4)',
                borderWidth: ['.3rem', '.15rem'],
            })
        }
    },





    // LVL 17
    fadeInBoard_17: function(cardsOpened, tiles, foundTiles, iter) {
        anime({
            targets: '.board',
            duration: 600,
            opacity: [0, 1],
        })
    },

    divideIntoPhases_17: function(cardsOpened, tiles, foundTiles, iter) {

        // STEPS / PHASES

        if(iter.streak === 0) iter.value = 48;  // BASE STEP -> 48 , 24 , 12 , 8 , 4
        else if(iter.streak === 1) iter.value = 24;
        else if(iter.streak === 2) iter.value = 12;
        else if(iter.streak === 3) iter.value = 8;
        else if(iter.streak === 4) iter.value = 4;

        iter.streak++;

        iter.amount += iter.value;

        const allTiles = document.querySelectorAll('.tile');
        const board = document.querySelector('.board');
        const animationContainer = document.querySelector('.animationContainer');

        let iconsArray = [];

        if(iter.streak > 1) {  // if it's second and further step
            allTiles.forEach(tile => {
                if(tile.style.display !== 'none') {
                    tile.style.visibility = 'visible';
                    tile.style.opacity = '1';
                    tile.style.transform = 'rotateY(0deg)';
                }
            })
            
        }

        let order = [];

        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            iconsArray.push(back.childNodes[0]);
        })

        iconsArray.sort();
        iconsArray.reverse();
            if(iconsArray[0] === undefined) {
                while(iconsArray[0] === undefined) {
                    iconsArray.shift();
                }
            }
        iconsArray.reverse();

        function sortSvgs(array) {
            let compareArr = [];
            for(let x=0; x<array.length; x++) {
                compare(array[x], compareArr);
            }
            return compareArr;
        }

        function compare(item, compareArr) {
            compareArr.unshift(item);
            if(compare.length > 1) {
                for(let y=1; y<compareArr.length; y++) {
                    if(item.classList[1] > compareArr[y].classList[1]) {
                        let z = compareArr[y];
                        compareArr[y] = compareArr[y-1];
                        compareArr[y-1] = z;
                    }
                }
            } else {
                return compareArr;
            }
        }

        let sortediconsArr = sortSvgs(iconsArray);

        for(let b=0; b<sortediconsArr.length; b++) {
            order.push(sortediconsArr[b].parentNode.parentNode);
        }

        for(let n=0; n<order.length; n++) {
            animationContainer.appendChild(order[n]);
        }

        let tempArr = [];

        let limit = iter.value;

        // 1

        for(let q=0; q<iter.value; q++) {
            let rand = Math.floor(Math.random() * limit);
            tempArr.push(order[rand]);
            order.splice(rand, 1);
            limit = limit - 1;
        }

        // 2

        order.forEach(tile => {
            tile.style.display = 'none';
        })

        // Teraz przenieś wszystkie elementy z tempArr do order

        for(let c=0; c<tempArr.length; c++) {
            order.unshift(tempArr[c]);
        }

        // Na koniec przenieś wszystkie kafelki z animationContainer do board

        for(let z=0; z<order.length; z++) {
            board.appendChild(order[z]);
        }

    },

    tileClickAnimation_17: function(cardsOpened, tiles, foundTiles, iter) {

        let currTarget;

        if(cardsOpened.length <= 1) {
            currTarget = document.querySelector('.target-1');
        } else {
            currTarget = document.querySelector('.target-2');
        }

        anime({
            targets: currTarget,
            duration: 900,
            borderWidth: ['.4rem', '.7rem'],
            borderRadius: ['20% 50% 20% 50%', '50% 20% 50% 20%'],
            direction: 'alternate',

        })
    },

    setCardsOpenedOpacityBack_17: function(cardsOpened, tiles, foundTiles, iter) {
        const allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(tile => {
            if((tile.style.visibility !== 'hidden') && (tile.style.display !== 'none')) {
                tile.style = 'opacity: 1';
            }
        })
    },

    increaseVisualDifficulty_17: function(cardsOpened, tiles, foundTiles, iter) {

        let stepTiles = [];
        const allTiles = document.querySelectorAll('.tile');

        allTiles.forEach((tile) => {
            if(tile.style.visibility !== 'hidden') {
                stepTiles.push(tile);   
            }
        })

        let degs = [20, 40, 60, 80, 100, 120, 140, 160, 200, 220, 240, 260, 280, 300, 320, 340];

        if(iter.streak === 2) {
            stepTiles.forEach(tile => {
                let back = tile.querySelector('.tile-back');
                back.childNodes[0].style = 'color: hsla(0, 0%, 0%, .4)';
            })
        } else if(iter.streak === 3) {
            stepTiles.forEach(tile => {
                let back = tile.querySelector('.tile-back');
                let rand = Math.floor( Math.random() * degs.length);
                back.childNodes[0].style = `color: hsla(0, 100%, 100%, .3); transform: rotate(${degs[rand]}deg)`;
            })
        } else if(iter.streak === 4) {
            stepTiles.forEach(tile => {
                let back = tile.querySelector('.tile-back');
                let rand = Math.floor( Math.random() * degs.length);
                back.childNodes[0].style = `color: hsla(0, 0%, 0%, .2); transform: rotate(${degs[rand]}deg)`;
            })
        }
    },

    animatePairMatch_17: function(cardsOpened, tiles, foundTiles, iter) {
        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            anime({
                targets: '.target',
                duration: 2400,
                backgroundImage: ['radial-gradient(hsl(0, 20%, 20%), hsla(0, 20%, 20%, .7))', 'radial-gradient(hsl(0, 0%, 0%), hsla(0, 0%, 0%, .7))'],
            })
        }
    },

    lookForNextPhase_17: function(cardsOpened, tiles, foundTiles, iter) {
        if((cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) && (foundTiles+2 >= iter.amount)) {
            if(foundTiles + 2 === tiles) {
                const allTiles = document.querySelectorAll('.tile');
                allTiles.forEach(tile => {
                    let back = tile.querySelector('.tile-back');
                    if(back.hasChildNodes()) {
                        back.childNodes[0].style = '';
                    }
                })
                return;
            }
            document.querySelector('.board').dataset.animation = 'on';
            document.querySelector('.board').setAttribute('pointerEvents', 'none');
            setTimeout(() => {
                this.divideIntoPhases_17(cardsOpened, tiles, foundTiles, iter);
                this.increaseVisualDifficulty_17(cardsOpened, tiles, foundTiles, iter);

                document.querySelector('.board').dataset.animation = 'off';
                document.querySelector('.board').setAttribute('pointerEvents', 'auto');
            }, 3000);

            anime({
                targets: [cardsOpened[0].parentNode, cardsOpened[1].parentNode],
                duration: 2400,
                opacity: 1,
            })

            if(iter.streak === 1) {
                anime({
                    targets: '.background',
                    duration: 2400,
                    backgroundColor: '#000',
                   filter: 'blur(10px)',
                    direction: 'alternate',
                })
            } else if(iter.streak === 2) {
                anime({
                    targets: '.background',
                    duration: 2400,
                    backgroundColor: '#000',
                    filter: 'hue-rotate(70deg)',
                })
            } else if(iter.streak === 3) {
                anime({
                    targets: '.background',
                    duration: 2400,
                    backgroundColor: '#fff',
                    filter: 'saturate(190%) invert(90%)',
                    easing: 'easeInSine',
                })
            } else if(iter.streak === 4) {
                anime({
                    targets: '.background',
                    duration: 2400,
                    backgroundColor: '#fff',
                    filter: 'brightness(30%) invert(0%) sepia(35%)',
                    easing: 'easeInSine',
                })
            }

        }
    },




    // LVL 18
    createCombinations_18: function(cardsOpened, tiles, foundTiles, iter) {
        // Before, remove lvl 17 background dummy styling
        const bg = document.querySelector('.background');
        const allTiles = document.querySelectorAll('.tile');
        bg.style = '';

        let iconsArr = [];
        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            if(back.hasChildNodes()) {
                iconsArr.push(back.childNodes[0]);
            }
        })

        for(let i=1; i<=(levels[`lvl18`].rows); i++) {
            iter.array.push(`r${i}`, `c${i}`);
        }
        
    },

    createChallengeCountdown_18: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');

        let countdownBox = document.createElement('div');
        countdownBox.classList.add('countdown-box');

        let countdown = document.createElement('div');
        countdown.classList.add('countdown');

        countdown.textContent = `${iter.value}`;

        countdownBox.appendChild(countdown);
        animationContainer.appendChild(countdownBox);
    },

    setChallenge_18: function(cardsOpened, tiles, foundTiles, iter) {

        iter.nextArr = [];

        // Remove challenge class from remain tiles if challenge has been failed
        let allCTiles = document.querySelectorAll('.tile-challenge');
        if(allCTiles.length > 0) {
            allCTiles.forEach(ctile => {
                ctile.classList.remove('tile-challenge');
            })
        }

        iter.amount = Math.floor(Math.random() * iter.array.length);
        let randomControl = iter.array[iter.amount];
        
        let dimension = randomControl.charAt(0);
        let num = randomControl.charAt(1);

        let allTiles = document.querySelectorAll('.tile');

        if(dimension === 'r') {  // if we want to mark some row
            for(let x=0; x<(levels[`lvl18`].rows); x++) {
                allTiles[((levels[`lvl18`].rows) * (num - 1)) + x].classList.add('tile-challenge');
            }
        }

        else if(dimension === 'c') {  // if we want to mark some column
            for(let y=0; y<(levels[`lvl18`].columns); y++) {
                allTiles[(levels[`lvl18`].columns * y) + (num - 1)].classList.add(`tile-challenge`);
            }
        }

        let allChallengeTiles = document.querySelectorAll('.tile-challenge');
        allChallengeTiles.forEach(ctile => {
            if(ctile.style.visibility !== 'hidden') {
                
            } else {
                ctile.classList.remove(`tile-challenge`);
            }
        })

        let finalChallengeTiles = document.querySelectorAll('.tile-challenge');
        iter.value = finalChallengeTiles.length * 2; // indicates how much turns u have to find all marked tiles

        this.updateCountdown_18(cardsOpened, tiles, foundTiles, iter);
    },

    matchChallengeClassRemoval_18: function(cardsOpened, tiles, foundTiles, iter) {

        // Decrease available turns by one
        iter.value = iter.value - 1;

        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])
        {   
            let isChallengePassed = checkPassCondition(cardsOpened);

            // Here add some animations
            
            if((cardsOpened[0].parentNode.classList.contains('tile-challenge') || (cardsOpened[1].parentNode.classList.contains('tile-challenge'))) && (iter.value === 0) && (isChallengePassed === false)) {
                // If at the last available challenge turn very last challenge tiles did not match
                const comparableClass = cardsOpened[0].childNodes[0].classList[1];
                cardsOpened[0].childNodes[0].classList.replace(comparableClass, 'fake-class');

                setTimeout(() => {
                    let fake = document.querySelector('.fake-class');
                    fake.classList.replace('fake-class', comparableClass);
                }, 2000); 
            }

            else if((cardsOpened[0].parentNode.classList.contains('tile-challenge') || (cardsOpened[1].parentNode.classList.contains('tile-challenge')))) {

                // Next array keeps all the tiles found during the current challenge
                // Every first time let tiles modifier be applied, the second time reset it to 0
                iter.nextArr.push(cardsOpened[0], cardsOpened[1]);

                if(iter.count > 0) {
                    iter.fTilesModifier = 0;
                }

                iter.count++;

                cardsOpened[0].parentNode.classList.remove('tile-challenge');
                cardsOpened[1].parentNode.classList.remove('tile-challenge');  // DONT REMOVE THIS DECLARATIONS PLEASE
            } else {
                // When you found a pair that's not associated with tile challenge by any means
                const comparableClass = cardsOpened[0].childNodes[0].classList[1];
                cardsOpened[0].childNodes[0].classList.replace(comparableClass, 'fake-class');

                setTimeout(() => {
                    let fake = document.querySelector('.fake-class');
                    fake.classList.replace('fake-class', comparableClass);
                }, 2000); 
            }

            function checkPassCondition(cardsOpened) {

                // Czy gdy znaleźliśmy ostatnią parę w ostatniej turze challengu
                let allChallengeTiles = document.querySelectorAll('.tile-challenge');
                let remainCount = 0;
                allChallengeTiles.forEach(ctile => {
                    let ctile_back = ctile.querySelector('.tile-back');
                    if((ctile_back.childNodes[0].classList[1] !==  cardsOpened[0].childNodes[0].classList[1]) && (ctile_back.childNodes[0].classList[1] !==  cardsOpened[1].childNodes[0].classList[1])) {
                        remainCount++;
                    }
                })
                if(remainCount === 0) return true;
                else return false;
            }

        }
    },

    checkChallengeProgress_18: function(cardsOpened, tiles, foundTiles, iter) {
        if(foundTiles + 2 === tiles) {return; }
        let challengeTiles = document.querySelectorAll('.tile-challenge');

        // First, check if player resolved random challenge

        if(challengeTiles.length === 0) {
            iter.array.splice(iter.amount, 1);
            iter.streak++;  // INDICATES CURRENT CHALLENGE No (starting from index 0);

            iter.fTilesModifier = 0;
            const timer = 2200;

            // Anyway, check which iter array combinations are outdated

            setTimeout(() => {
                this.testRemainCombinations_18(iter);
                this.randomizeRemainIcons_18(cardsOpened, tiles, foundTiles, iter);
                this.setChallenge_18(cardsOpened, tiles, foundTiles, iter);
            }, timer);

            async function winCAnimtion() {
                const a1 = anime({
                    targets: '.background',
                    duration: 1000,
                    backgroundColor: '#000',
                    easing: 'linear',
                }).finished;

                const a2 = anime({
                    targets: ['.board', '.countdown-box'],
                    duration: (timer/2),
                    opacity: [1, 0],
                    easing: 'easeOutSine',
                }).finished;

                await Promise.all([a1, a2]);
            }

            async function challengeCompletion() {
                const a1 = anime({
                    targets: '.completion-box',
                    duration: 2200,
                    opacity: [0, 1],
                    easing: 'easeOutQuint',
                    direction: 'alternate',
                }).finished;

                await Promise.all([a1]);
            }

            async function finishAnimation() {
                const a1 = anime({
                    targets: '.background',
                    duration: 1000,
                    backgroundColor: 'hsla(231, 65%, 25%, 0.7)',
                    easing: 'linear',
                }).finished;

                const a2 = anime({
                    targets: ['.board', '.countdown-box'],
                    duration: (timer/2),
                    opacity: [0, 1],
                    easing: 'easeInSine',
                }).finished;

                await Promise.all([a1, a2]);
            }

            async function showRandomizeBox() {
                const show = anime({
                    targets: '.randomize-box',
                    duration: 1100,
                    easing: 'linear',
                    opacity: [0, 1],
                })

                await Promise.all([show]);
            }

            async function animateThreeDots() {
                const animate = anime({
                    targets: '.challenge-dot',
                    keyframes: [
                        {duration: 800,  translateY: '-=8rem', easing: 'linear'},
                        {duration: 800,  translateY: '+=8rem', easing: 'easeOutBounce'},
                        {duration: 800,  translateY: '-=8rem', easing: 'linear'},
                        {duration: 800,  translateY: '+=8rem', easing: 'easeOutBounce'},
                        {duration: 800,  translateY: '-=8rem', easing: 'linear'},
                        {duration: 800,  translateY: '+=8rem', easing: 'easeOutBounce'},

                    ],
                    delay: anime.stagger(400),
                }).finished;

                await Promise.all([animate]);
            }

            async function fadeRandomizeBox() {
                const fade = anime({
                    targets: '.randomize-box',
                    duration: 700,
                    opacity: [1, 0],
                    easing: 'linear',
                }).finished;

                await Promise.all([fade]);
            }

            async function showChallengeTiles() {
                const show = anime({
                    targets: '.tile-challenge',
                    keyframes: [
                        {rotateY: '+=180deg', duration: 900, easing: 'easeInExpo'},
                        {rotateY: '-=180deg', duration: 900, delay: 3200, easing: 'easeOutQuint'},
                    ],
                }).finished;
    
                await Promise.all([show]);
            }

            async function init() {

                document.querySelector('.board').dataset.animation = 'on';
                document.querySelector('.board').setAttribute('pointerEvents', 'none');

                await winCAnimtion()
                .then(() => {
                    const animationContainer = document.querySelector('.animationContainer');
                    const completionBox = document.createElement('div');
                    const completionText = document.createElement('div');
    
                    completionBox.classList.add('completion-box');
                    completionText.classList.add('completion-text', 'completion-success');
    
                    completionText.textContent = 'Challenge completed'

                    completionBox.appendChild(completionText);
                    animationContainer.appendChild(completionBox);

                })
                await challengeCompletion()
                .then(() => {
                    const animationContainer = document.querySelector('.animationContainer');
                    const completionBox = animationContainer.querySelector('.completion-box');
                    completionBox.remove();
                })
                .then(() => {
                    const animationContainer = document.querySelector('.animationContainer');

                    const randomizeBox = document.createElement('div');
                    const randomizeInfo = document.createElement('div');

                    randomizeBox.appendChild(randomizeInfo);

                    for(let i=0; i<3; i++) {
                        let dot = document.createElement('div');
                        dot.classList.add('challenge-dot');
                        randomizeBox.appendChild(dot);
                    }

                    randomizeBox.classList.add('randomize-box');
                    randomizeInfo.classList.add('randomize-info');

                    randomizeInfo.textContent = 'Reset icons';

                    animationContainer.appendChild(randomizeBox);
                })
                await showRandomizeBox()
                await animateThreeDots()
                await fadeRandomizeBox()
                .then(() => {
                    const animationContainer = document.querySelector('.animationContainer');
                    const randomizeBox = animationContainer.querySelector('.randomize-box');
                    randomizeBox.remove();
                })
                await finishAnimation()
                await showChallengeTiles()
                .then(() => {

                    document.querySelector('.board').dataset.animation = 'off';
                    document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                })
            }
            
            init();


        } 
        // Next - if not resolved, check if he has some turns left
        else if(iter.value === 0) {
            // Reset icons and then set new challenge
            const timer = 2200;

            setTimeout(() => {
                this.resetIcons_18(iter, foundTiles);
                this.setChallenge_18(cardsOpened, tiles, foundTiles, iter);
            }, timer);

            async function loseCAnimtion() {
                const a1 = anime({
                    targets: '.background',
                    duration: 1000,
                    backgroundColor: 'hsl(1, 60%, 30%)',
                    easing: 'linear',
                }).finished;

                const a2 = anime({
                    targets: ['.board', '.countdown-box'],
                    duration: (timer/2),
                    opacity: [1, 0],
                    easing: 'easeOutSine',
                }).finished;

                await Promise.all([a1, a2]);
            }

            async function challengeCompletion() {
                const a1 = anime({
                    targets: '.completion-box',
                    duration: 2200,
                    opacity: [0, 1],
                    easing: 'easeOutQuint',
                    direction: 'alternate',
                }).finished;

                await Promise.all([a1]);
            }

            async function finishAnimation() {
                const a1 = anime({
                    targets: '.background',
                    duration: 1000,
                    backgroundColor: 'hsla(231, 65%, 25%, 0.7)',
                    easing: 'linear',
                }).finished;

                const a2 = anime({
                    targets: ['.board', '.countdown-box'],
                    duration: (timer/2),
                    opacity: [0, 1],
                    easing: 'easeInSine',
                }).finished;

                await Promise.all([a1, a2]);
            }

            async function reveal() {
                const appear = anime({
                    targets: '.tile',
                    keyframes: [
                        {rotateY: '+=180deg', duration: 1100, easing: 'easeInSine'},
                        {rotateY: '-=180deg', duration: 1100, delay: 1700, easing: 'easeOutSine'},
                    ],
                    easing: 'easeInExpo',
                }).finished;

            await Promise.all([appear]);
            }

            async function showChallengeTiles() {
                const show = anime({
                    targets: '.tile-challenge',
                    keyframes: [
                        {rotateY: '+=180deg', duration: 900, easing: 'easeInExpo'},
                        {rotateY: '-=180deg', duration: 900, delay: 3200, easing: 'easeOutQuint'},
                    ],
                }).finished;
    
                await Promise.all([show]);
            }

            async function init() {

                document.querySelector('.board').dataset.animation = 'on';
                document.querySelector('.board').setAttribute('pointerEvents', 'none');

                await loseCAnimtion()
                .then(() => {
                    const animationContainer = document.querySelector('.animationContainer');
                    const completionBox = document.createElement('div');
                    const completionText = document.createElement('div');
    
                    completionBox.classList.add('completion-box');
                    completionText.classList.add('completion-text', 'completion-failure');
    
                    completionText.textContent = 'Challenge failed'

                    completionBox.appendChild(completionText);
                    animationContainer.appendChild(completionBox);

                })
                await challengeCompletion()
                .then(() => {
                    const animationContainer = document.querySelector('.animationContainer');
                    const completionBox = animationContainer.querySelector('.completion-box');
                    completionBox.remove();
                })
                await finishAnimation()
                if(iter.streak <= 0) { await reveal() }
                await showChallengeTiles()
                .then(() => {

                    document.querySelector('.board').dataset.animation = 'off';
                    document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                })
            }
            
            init();

        }
    },

    testRemainCombinations_18(iter) {
        for(let m=0; m<iter.array.length; m++) {
            let allTiles = document.querySelectorAll('.tile');
            let testArr = [];
            let dimension = iter.array[m].charAt(0);
            let num = iter.array[m].charAt(1);

            if(dimension === 'r') {
                for(let x=0; x<(levels[`lvl18`].rows); x++) {
                    if(allTiles[((levels[`lvl18`].rows) * (num - 1)) + x].style.visibility === 'hidden') {
                        testArr.push(iter.array[m]);
                    }
                }
            } else if(dimension === 'c') {
                for(let y=0; y<(levels[`lvl18`].columns); y++) {
                    if(allTiles[(levels[`lvl18`].columns * y) + (num - 1)].style.visibility === 'hidden') {
                        testArr.push(iter.array[m]);
                    }
                }
            }

            if((testArr.length >= (levels[`lvl18`].rows)) || (testArr.length >= (levels[`lvl18`].columns))) {
                iter.array.splice(m, 1);
            }
        }
    },

    winChallengeAnimation_18: function(cardsOpened, tiles, foundTiles, iter) {
        document.querySelector('.board').dataset.animation = 'on';
        document.querySelector('.board').setAttribute('pointerEvents', 'none');

        async function showChallengeTiles() {
            const show = anime({
                targets: '.tile-challenge',
                duration: 1800,
                keyframes: [
                    {rotateY: '+=180deg', duration: 900, easing: 'easeInExpo'},
                    {rotateY: '-=180deg', duration: 900, delay: 3200, easing: 'easeOutQuint'},
                ],
            }).finished;

            await Promise.all([show]);
        }

        async function init() {
            await showChallengeTiles()
                .then(() => {
                    document.querySelector('.board').dataset.animation = 'off';
                    document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                })
        }

        init(); 
    },


    resetIcons_18: function(iter, foundTiles) {

        if(iter.nextArr.length > 0) {
            iter.previousStep = iter.nextArr.length;
        }

        iter.fTilesModifier =  (iter.fTilesModifier - iter.nextArr.length);
        if(iter.count === 0) {iter.fTilesModifier = (iter.previousStep * -1);}
        else if(iter.count === 1) {iter.fTilesModifier = -2;}
        iter.count = 0;

        for(let p=0; p<iter.nextArr.length; p++) {
            iter.nextArr[p].parentNode.style.visibility  = 'visible';
            iter.nextArr[p].parentNode.style.opacity  = '1';
            iter.nextArr[p].parentNode.style.transform = 'rotateY(0deg)';
        }

    },

    randomizeRemainIcons_18: function (cardsOpened, tiles, foundTiles, iter) {
        // THIS HAPPENS ONLY WHEN YOU WIN A CHALLENGE
        const allTiles = document.querySelectorAll('.tile');

        let visibleTiles = [];
        let visibleIcons = [];
        
        allTiles.forEach(tile => {
            if((tile.style.visibility !== 'hidden') && (!(tile.classList.contains('target')))) {
                let back = tile.querySelector('.tile-back');
                visibleIcons.push(back.childNodes[0]);
                visibleTiles.push(tile);
            }
        })

        for(let i=0; i<visibleTiles.length; i++) {
            let rand = Math.floor(Math.random() * visibleIcons.length);
            let back = visibleTiles[i].querySelector('.tile-back');
            if(back.hasChildNodes()) {
                back.childNodes[0].remove();
            }
            back.appendChild(visibleIcons[rand]);

            visibleIcons.splice(rand, 1);
        }
    },


    updateCountdown_18: function(cardsOpened, tiles, foundTiles, iter) {
        if(foundTiles + 2 === tiles) {return;}
        let countdown = document.querySelector('.countdown');
        countdown.textContent = `${iter.value}`;
    },




    // LVL 19
    quickFadeInOut_19(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');

        anime({
            targets: animationContainer,
            duration: 700,
            backgroundColor: 'hsla(0, 0%, 0%, 0)',
            easing: 'linear',
        })
    },

    addPseudoClasses_19: function(cardsOpened, tiles, foundTiles, iter) {
        const allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(tile =>  {
            tile.classList.add(`gem-${iter.streak}`);
            tile.style = 'visibility: hidden;';
        })
    },

    createDummyIcons_19: function(cardsOpened, tiles, foundTiles, iter) {
        let allTiles = document.querySelectorAll('.tile');
        const animationContainer = document.querySelector('.animationContainer');
        const board = document.querySelector('.board');
        allTiles.forEach((tile, index) => {
            let back = tile.querySelector('.tile-back');
            iter.array.push(back.childNodes[0]);
        })

        let order = [];

        function sortSvgs(array) {
            let compareArr = [];
            for(let x=0; x<array.length; x++) {
                compare(array[x], compareArr);
            }
            return compareArr;
        }

        function compare(item, compareArr) {
            compareArr.unshift(item);
            if(compare.length > 1) {
                for(let y=1; y<compareArr.length; y++) {
                    if(item.classList[1] > compareArr[y].classList[1]) {
                        let z = compareArr[y];
                        compareArr[y] = compareArr[y-1];
                        compareArr[y-1] = z;
                    }
                }
            } else {
                return compareArr;
            }
        }

        let sortediconsArr = sortSvgs(iter.array);

        for(let u=0; u<sortediconsArr.length; u++) {
            order.push(sortediconsArr[u].parentNode.parentNode);
        }

        for(let y=0; y<order.length; y++) {
            animationContainer.appendChild(order[y]);
        }

        let tempArr = [];

        let limit = (levels[`lvl19`].rows) * (levels[`lvl19`].columns);

        for(let q=0; q<((levels[`lvl19`].rows) * (levels[`lvl19`].columns)); q++) {
            let rand = Math.floor(Math.random() * limit);
            tempArr.push(order[rand]);
            order.splice(rand, 1);
            limit = limit - 1;
        }

        tempArr.forEach(tile => {
            tile.style.visibility = 'visible';
        })

        order.forEach(tile => {
            tile.style.display = 'none';
            tile.style.visibility = 'visible'; // ?
        })

        for(let c=0; c<tempArr.length; c++) {
            order.unshift(tempArr[c]);
        }

        for(let z=0; z<order.length; z++) {
            board.appendChild(order[z]);
        }

        // Now we can empty our dummy array...
        iter.array = [];
        // ... and fill once again

        for(let a=((levels[`lvl19`].rows) * (levels[`lvl19`].columns)); a<sortediconsArr.length; a=a+2) {
            iter.array.push(sortediconsArr[a]);
        }

        // After all we have 1 times every dummy icon (total: 42);

    },

    createProgressBar_19: function(cardsOpened, tiles, foundTiles, iter) {
        const animationContainer = document.querySelector('.animationContainer');
        let progressBar = document.createElement('div');
        progressBar.classList.add('p-bar');
        for(let j=0; j<(((levels[`lvl19`].rows) * (levels[`lvl19`].columns)) / 2); j++) {  // half of tiles, because we are counting pairs !!
            let progressStep = document.createElement('div');
            progressStep.classList.add('p-step');
            progressBar.appendChild(progressStep);
        }
        animationContainer.appendChild(progressBar);
    },

    animateGem_19: function(cardsOpened, tiles, foundTiles, iter) {
        let currTarget;

        if(cardsOpened.length <= 1) {
            currTarget = document.querySelector('.target-1');
        } else {
            currTarget = document.querySelector('.target-2');
        }

        anime({
            targets: currTarget,
            duration: 400,
            opacity: ['.5'],
            direction: 'alternate',
        })
    },

    setCardsOpenedOpacityBack_19: function(cardsOpened, tiles, foundTiles, iter) {
        const allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(tile => {
            if((tile.style.visibility === 'hidden') && (tile.style.opacity === '0') && (tile.style.display === 'none')) {
                tile.style.opacity = '1';
                tile.style.visibility = 'visible';
            }
        })
    },

    appendDummyIcons_19: function(cardsOpened, tiles, foundTiles, iter) {

        // WHAT IS THE MAIN CONDITION TO FIRE THAT FUNCTION ?  ->  TURNS USED, OR TILES FOUND ? let it be tiles, turns used is impossible !!

        if((foundTiles+2 > (((levels[`lvl19`].rows) * (levels[`lvl19`].columns)) / 1.25)) && (iter.streak === 3) && (cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) {
            // if  ftiles > 42 / 1.5 -> if ftiles > 33
            let newDummiesCount = 12; 
            iter.streak++;
            this.modifyGrid_19(iter, newDummiesCount, cardsOpened);
            iter.value += newDummiesCount; // INDICATES FROM WHICH INDEX SHOULD WE GET NEW ICONS ?

            // SOME ASYNC ANIMATIONS HERE
            this.asyncDummyChapter(iter, newDummiesCount);
        }
        else if((foundTiles+2 > (((levels[`lvl19`].rows) * (levels[`lvl19`].columns)) / 2)) && (iter.streak === 2) && (cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) {
            // if  ftiles > 42 / 2 -> if ftiles > 21
            let newDummiesCount = 6;
            iter.streak++;
            this.modifyGrid_19(iter, newDummiesCount, cardsOpened);
            iter.value += newDummiesCount; // INDICATES FROM WHICH INDEX SHOULD WE GET NEW ICONS ?

            // SOME ASYNC ANIMATIONS HERE
            this.asyncDummyChapter(iter, newDummiesCount);
        }
        else if((foundTiles+2 > (((levels[`lvl19`].rows) * (levels[`lvl19`].columns)) / 3)) && (iter.streak === 1) && (cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) {
            // if  ftiles > 42 / 3 -> if ftiles > 14
            let newDummiesCount = 8;
            iter.streak++;
            this.modifyGrid_19(iter, newDummiesCount, cardsOpened);
            iter.value += newDummiesCount; // INDICATES FROM WHICH INDEX SHOULD WE GET NEW ICONS ?

            // SOME ASYNC ANIMATIONS HERE
            this.asyncDummyChapter(iter, newDummiesCount);
        }
        else if((foundTiles+2 > (((levels[`lvl19`].rows) * (levels[`lvl19`].columns)) / 6)) && (iter.streak <= 0) && (cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) { 
            // if  ftiles > 42 / 6 -> if ftiles > 7
            let newDummiesCount = 8;  // it has to be lower or equal yet found tiles in order to place new dummies in grid
            iter.streak++;
            this.modifyGrid_19(iter, newDummiesCount, cardsOpened);
            iter.value += newDummiesCount; // INDICATES FROM WHICH INDEX SHOULD WE GET NEW ICONS ?

            // SOME ASYNC ANIMATIONS HERE
            this.asyncDummyChapter(iter, newDummiesCount);
        }
    },

    updateProgressBar_19: function(cardsOpened, tiles, foundTiles, iter) {
        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            let progressBar = document.querySelector('.p-bar');
            let pBarItem = progressBar.querySelector(`.p-step:nth-of-type(${((foundTiles + 2) / 2)})`);
            
            anime({
                targets: pBarItem,
                duration: 2400,
                backgroundImage: [' inherit', 'linear-gradient(120deg, hsl(185, 30%, 50%), hsl(215, 40%, 50%) 25%, hsl(0, 0%, 0%))'],
                easing: 'easeInSine',
            })
        
        }
    },

    checkLevelProgress_19: function(cardsOpened, tiles, foundTiles, iter) {
        if((foundTiles+4 >= ((levels[`lvl19`].rows) * (levels[`lvl19`].columns))) && (cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1])) {
            if(iter.amount > 0) {return; }

            iter.amount++;

            // ADD STUFF
            iter.fTilesModifier = ((levels[`lvl19`].rows) * (levels[`lvl19`].columns) * 2);

            this.destroyAllFakes(cardsOpened, tiles, foundTiles, iter);
        }
    },


    modifyGrid_19: function(iter, newDummiesCount, cardsOpened) {

        const board = document.querySelector('.board');
        const animationContainer = document.querySelector('.animationContainer');
        let allTiles = document.querySelectorAll('.tile');

        // 1. Weź znalezione ikony w tym kroku

        let alreadyFound = []; // zawiera znalezione w tym kroku kafelki
        let notFoundYet = []; // zawiera dotąd nieznalezione kafelki
        let notExisting = []; // wszystkie pozostałe które nie są nadal na mapie (lub te, które nigdy nie będą)

        let replacementFakeTiles = []; // wybrane przez iter.array kafelki pochodzące z kategorii notExisting
        for(let h=iter.value; h<(iter.value + newDummiesCount); h++) {
            replacementFakeTiles.push(iter.array[h].parentNode.parentNode);
        }

        allTiles.forEach(tile => {

            if(((tile.style.visibility === 'hidden') && (tile.style.display !== 'none')) || (tile === cardsOpened[0].parentNode) || (tile === cardsOpened[1].parentNode)) {
                alreadyFound.push(tile);
            } 
            else if((tile.style.visibility === 'visible') && (tile.style.display !== 'none')) {
                notFoundYet.push(tile);
            }
            else {
                let isIterArrayInstance;
                for(let l=0; l<replacementFakeTiles.length; l++) {
                    if(tile === replacementFakeTiles[l]) {
                        isIterArrayInstance = true;
                    }
                }

                if(isIterArrayInstance !== true) {
                    notExisting.push(tile);
                }
            }
        })

        // 2. Spushuj zgodnie z kolejnością w hierarchii wszystkie kafelki do animationContainer

        let order = [];
        // 2.1 Not Found Yet
        for(let a=0; a<notFoundYet.length; a++) {
            order.push(notFoundYet[a]);
        }
        // 2.2 Replacement Fake Tiles
        for(let b=0; b<replacementFakeTiles.length; b++) {
            order.push(replacementFakeTiles[b]);
            iter.nextArr.push(replacementFakeTiles[b]);
        }
        // 2.3 Not Existing Tiles (excluding replacement fake tiles)
        for(let c=0; c<notExisting.length; c++) {
            order.push(notExisting[c]);
        }
        // 2.4 Already found + zmień ich display na none
        for(let d=0; d<alreadyFound.length; d++) {
            alreadyFound[d].style.display = 'none';
            order.push(alreadyFound[d]);
        }

        // 2.5 Teraz spushuj cały order do animationContainer
        for(let z=0; z<order.length; z++) {
            animationContainer.appendChild(order[z]);
        }


        // 3. Stwórz tempArr i rozlosuj ikonki na mapie
        let tempArr = [];
        let limit = (levels[`lvl19`].rows) * (levels[`lvl19`].columns);
        // 3.1 Do tempArr spushuj całą mapę, która wkrótce się pojawi odnowiona
        for(let v=0; v<((levels[`lvl19`].rows) * (levels[`lvl19`].columns)); v++) {
            let rand = Math.floor(Math.random() * limit);
            tempArr.push(order[rand]);
            tempArr[v].style.display = 'block';
            order.splice(rand, 1);
            limit = limit - 1;
        }
        // 3.2 Dla pewności - wszystkie pozostałe kafle w orderze mają display: none ->
        order.forEach(tile => {
            tile.style.display = 'none';
        })
        // 3.3 Teraz przenieś rozlosowane elementy z tempArr do order
        for(let w=0; w<tempArr.length; w++) {
            order.unshift(tempArr[w]);
        }
        // 3.4 Na koniec przywróć odnowioną planszę z powrotem do board
        for(let p=0; p<order.length; p++) {
            board.appendChild(order[p]);
        }

    },

    asyncDummyChapter: function(iter, newDummiesCount) {
        const board = document.querySelector('.board');

        let content = {
            dummy1: {
                text: 'Do NOT trust all the tiles',
                hueR: '55deg',
                visBg: '55, 46%, 36%',
                gemBackColor: '55',
            },
            dummy2: {
                text: `Let's see what have changed`,
                hueR: '110deg',
                visBg: '344, 46%, 36%',
                gemBackColor: '344',
            },
            dummy3: {
                text: `Already feel exhasuted ?`,
                hueR: '160deg',
                visBg: '107, 46%, 36%',
                gemBackColor: '171',
            },
            dummy4: {
                text: `Good luck :)`,
                hueR: '220deg',
                visBg: '283, 46%, 36%,',
                gemBackColor: '283',
            },
        }

        async function moveBoard() {
            const a1 = anime({
                targets: board,
                duration: 2200,
                translateY: '+=2200',
                easing: 'easeInQuad',
            }).finished;

            await Promise.all([a1]);
        }
        
        async function showVis() {
            const allVis = document.querySelectorAll('.vis-black');

            const a2 = anime({
                targets: allVis,
                duration: 700,
                delay: anime.stagger(300, {from: 'center'}),
                easing: 'linear',
                opacity: [0, 1],
            }).finished;

           await Promise.all([a2]);

        }

        async function showMessageText() {

            const getMsgText = document.querySelector('.msg-text');
            getMsgText.style = 'visibility: visible;';

            const a3 = anime({
                targets: getMsgText,
                duration: 2100,
                opacity: [0, 1],
                visibility: ['visible', 'visible'],
                easing: 'easeInSine',
            }).finished;



           await Promise.all([a3]);
        }

        async function hideVis() {
            const allVis = document.querySelectorAll('.vis-black');
            const getMsgText = document.querySelector('.msg-text');

            const a4  = anime({
                targets: allVis,
                duration: 900,
                easing: 'linear',
                delay: anime.stagger(300),
                opacity: [1, 0],
            }).finished;

            const a4b = anime({
                targets: getMsgText,
                duration: 1800,
                easing: 'easeInCirc',
                filter: `hue-rotate(${content[`dummy${iter.streak}`].hueR})`,
            })

            await Promise.all([a4, a4b]);
        }
        
        async function hideMessageText() {
            const getMsgText = document.querySelector('.msg-text');

            const a5 = anime({
                targets: getMsgText,
                duration: 1500,
                scale: [1, 0],
                easing: 'easeOutCirc',
            }).finished;

            await Promise.all([a5]);
        }
        
        async function retrieveBoard() {
            const a6 = anime({
                targets: board,
                duration: 2200,
                translateY: '-=2200',
                easing: 'easeOutQuad',
            }).finished;

            await Promise.all([a6]);
        }

        async function init() {
            document.querySelector('.board').dataset.animation = 'on';
            document.querySelector('.board').setAttribute('pointerEvents', 'none');

            await moveBoard()
            .then(() => {
                const animationContainer = document.querySelector('.animationContainer');

                const messageDiv = document.createElement('div');
                const messageText = document.createElement('div');

                for(let i=0; i<20; i++) {
                    let vis = document.createElement('div');
                    vis.classList.add('vis-black');
                    messageDiv.appendChild(vis);

                    vis.style = `box-shadow: 0px -1px 5px 17px hsla(${content[`dummy${iter.streak}`].visBg}, 0.81); background:hsla(0, 0%, 0%, 0.9);`;
                }

                messageDiv.classList.add('msg-div');
                messageText.classList.add('msg-text');

                messageText.textContent = content[`dummy${iter.streak}`].text;

                messageDiv.appendChild(messageText);
                animationContainer.appendChild(messageText);
                animationContainer.appendChild(messageDiv);
            })
            await showVis()
            await showMessageText()
            .then(() => {
                const allTiles = document.querySelectorAll('.tile');
                allTiles.forEach(tile =>  {
                    let back = tile.querySelector('.tile-back');
                    back.style = `background-image: radial-gradient(hsla(${content[`dummy${iter.streak}`].gemBackColor}, 40%, 40%, .65), hsla(202, 40%, 40%, .65));`
                    tile.classList.remove(`gem-${iter.streak - 1}`);
                    tile.classList.add(`gem-${iter.streak}`);
                })
            })
            await hideVis()
            await hideMessageText()
            await retrieveBoard()
            .then(() => {
                const messageText = document.querySelector('.msg-text');
                const messageDiv = document.querySelector('.msg-div');

                messageText.remove();
                messageDiv.remove();

                document.querySelector('.board').dataset.animation = 'off';
                document.querySelector('.board').setAttribute('pointerEvents', 'auto');
            })
            .then(() => {
                if(iter.streak === 1) {
                    for(let i=0; i<iter.nextArr.length; i++) {
                        let back = iter.nextArr[i].querySelector('.tile-back');
                        back.childNodes[0].style.color = 'hsla(7, 70%, 40%, .75)';
                    }
                }
                else if((iter.streak === 2) || (iter.streak === 3)) {
                    for(let i=0; i<iter.nextArr.length; i++) {
                        let back = iter.nextArr[i].querySelector('.tile-back');
                        back.childNodes[0].style.color = 'hsla(0, 0%, 00%, .65)';
                    }
                    document.querySelector('.board').dataset.animation = 'on';
                    document.querySelector('.board').setAttribute('pointerEvents', 'none');
            
                    async function showTiles() {
                        const show = anime({
                            targets: '.tile',
                            keyframes: [
                                {rotateY: '+=180deg', duration: 900, easing: 'easeInExpo'},
                                {rotateY: '-=180deg', duration: 900, delay: 1400, easing: 'easeOutQuint'},
                            ],
                        }).finished;
            
                        await Promise.all([show]);
                    }
            
                    async function init2() {
                        await showTiles()
                            .then(() => {
                                document.querySelector('.board').dataset.animation = 'off';
                                document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                            })
                    }
            
                    init2(); 
                }   
            })
        }

        init();
    },

    destroyAllFakes: function(cardsOpened, tiles, foundTiles, iter) {
        document.querySelector('.board').dataset.animation = 'on';
        document.querySelector('.board').setAttribute('pointerEvents', 'none');

        let tilesToHide = [];

        for(let n=0; n<iter.nextArr.length; n++) {
            tilesToHide.push(iter.nextArr[n]);
        }

        async function destroy() {
            const a1 = anime({
                targets: tilesToHide,
                duration: 2400,
                rotate: 360,
                scale: [1, 0],
            }).finished;

            await Promise.all([a1]);
        }

        async function fadeBoard() {
            const a2 = anime({
                targets: '.board',
                duration: 500,
                opacity: [1, 0],
                easing: 'easeInSine',
            }).finished;

            await Promise.all([a2]);
        }

        async function showMsg() {
            const getMsgText = document.querySelector('.msg-text');
            getMsgText.style = 'visibility: visible;';

            const a3 = anime({
                targets: getMsgText,
                duration: 1300,
                opacity: [0, 1],
                translateY: ['-=2200', '+=2200'],
                easing: 'easeInExpo',
            }).finished;

            await Promise.all([a3]);
        }

        async function fadeMsg() {
            const getMsgText = document.querySelector('.msg-text');

            const a4 = anime({
                targets: getMsgText,
                delay: 800,
                duration: 1400,
                backgroundImage: 'linear-gradient(45deg, hsla(0, 0%, 0%, 0), hsla(0, 0%, 0%, 0))',
                textShadow: '0px 0px 0px hsla(0, 0%, 0%, 0)',

            }).finished;

            await Promise.all([a4]);
        }

        async function showBoard() {
            const a5  = anime({
                targets: '.board',
                duration: 1600,
                opacity: [0, 1],
                easing: 'easeInSine',
            }).finished;

            await Promise.all([a5]);
        }

        async function init3() {
            await destroy()
            await fadeBoard()
            .then(() => {
                const animationContainer = document.querySelector('.animationContainer');

                const messageDiv = document.createElement('div');
                const messageText = document.createElement('div');

                messageDiv.classList.add('msg-div');
                messageText.classList.add('msg-text');

                messageText.textContent = 'Surprised ?';

                messageDiv.appendChild(messageText);
                animationContainer.appendChild(messageText);
                animationContainer.appendChild(messageDiv);
            })
            await showMsg()
            await fadeMsg()
            .then(() => {
                for(let f=0; f<tilesToHide.length; f++) {
                    tilesToHide[f].style.visibility = 'hidden';
                }
            })
            await showBoard()
            .then(() => {
                document.querySelector('.board').dataset.animation = 'off';
                document.querySelector('.board').setAttribute('pointerEvents', 'auto');
            })

        }

        init3(); 

    },



    // LVL 20 - Final level !

    levelStartAnimation_20: function(cardsOpened, tiles, foundTiles, iter) {
        // At very beginning - remove default lvl 19 styling from .tile-back elems
        const allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            back.style = '';
        })

        const animationContainer = document.querySelector('.animationContainer');

        animationContainer.style = 'background-color: #000';
        document.querySelector('.board').dataset.animation = 'on';
        document.querySelector('.board').setAttribute('pointerEvents', 'none');

        let shadowTextBox = document.createElement('div');
        let shadowTextBox2 = document.createElement('div');
        animationContainer.appendChild(shadowTextBox);
        animationContainer.appendChild(shadowTextBox2);
        shadowTextBox.classList.add('shadow-textbox');
        shadowTextBox2.classList.add('shadow-textbox-2');

        // Those are for animation chain

        let letterAnimationArr = [];
        let letterAnimationArr2 = [];
        let panelsArr = [];

        // 1

        let shadowMessage = 'THIS ONE IS THE FINAL LEVEL';

        for(let k=0; k<shadowMessage.length; k++) {
            let shadowLetter = document.createElement('div');
            shadowLetter.classList.add('shadow-letter');
            shadowLetter.textContent = shadowMessage[k];
            letterAnimationArr.push(shadowLetter);
            shadowTextBox.appendChild(shadowLetter);
        }

        // 2

        let shadowMessage2 = 'ARE YOU READY ?';

        for(let k=0; k<shadowMessage.length; k++) {
            let shadowLetter = document.createElement('div');
            shadowLetter.classList.add('shadow-letter-2');
            shadowLetter.textContent = shadowMessage2[k];
            letterAnimationArr2.push(shadowLetter);
            shadowTextBox2.appendChild(shadowLetter);
        }

        async function darken() {
            const a1 = anime({
                targets: animationContainer,
                duration: 1700,
                backgroundColor: ['hsla(0, 0%, 0%, 1)', 'hsla(0, 0%, 0%, 1)'],
                easing: 'linear',
            }).finished;

           await Promise.all([a1]);
        }

        async function showMessage() {
            const a2 = anime({
                targets: letterAnimationArr,
                duration: 1100,
                delay: anime.stagger(350),
                opacity: [0, 1],
                color: ['hsla(0, 0%, 20%, 1)'],
                easing: 'easeInSine',
            }).finished;

            await Promise.all([a2]);
        }
  
        async function showMessage2() {
            const a3 = anime({
                targets: letterAnimationArr2,
                duration: 900,
                delay: anime.stagger(260),
                opacity: [0, 1],
                color: ['hsla(0, 0%, 20%, 1)'],
                transform: ['translateY(3rem) translateX(0rem)', 'translateY(0rem) translateX(6.5rem)'],
                rotate: '60deg',
                easing: 'easeInSine',
            }).finished;

            await Promise.all([a3]);
        }

        async function invisiblePanels() {
            const a4 = anime({
                targets: panelsArr,
                duration: 2800,
                translateY: '20%',
                opacity: [0, 1],
                delay: anime.stagger(280),
            }).finished;

            await Promise.all([a4]);
        }

        async function changeSomeBg() {
            const a5 = anime({
                targets: animationContainer,
                duration: 1400,
                backgroundColor: ['hsla(0, 0%, 0%, 1)', 'hsla(0, 0%, 0%, 0)'],
                easing: 'easeOutQuad',
            }).finished;

            const a6 = anime({
                targets: [shadowTextBox, shadowTextBox2],
                duration: 2400,
                opacity: [1, 0],
                easing: 'easeOutExpo',
            }).finished;

            const a7 = anime({
                targets: panelsArr,
                duration: 1300,
                delay: anime.stagger(300),
                translateY: ['20%','100%'],
                backgroundColor: ['hsla(0, 0%, 0%, 1)', 'hsla(0, 0%, 0%, .2)'],
                borderColor: ['hsla(0, 0%, 20%, .8)', 'hsla(60, 100%, 50%, .2)'],
                easing: 'easeOutQuad',
            }).finished;

            await Promise.all([a5, a6, a7]);
        }

        async function showAllTiles() {
            const a8 = anime({
                targets: '.tile',
                transitionProperty: 'all',
                rotateY: '180deg',
                loop: false,
                easing: 'easeInExpo',
            }).finished;

            await Promise.all([a8]);
        }

        async function hideAllTiles() {
            const a9 = anime({
                targets: '.tile',
                delay: 2200,
                transitionProperty: 'all',
                rotateY: '0deg',
                loop: false,
                easing: 'easeOutExpo',
            }).finished;

            await Promise.all([a9]);
        }

        async function init() {
            await darken()
            await showMessage()
            await showMessage2()
            .then(() => {
                let panelsCount = 10;
                for(let t=0; t<panelsCount; t++) {
                    let panel = document.createElement('div');
                    animationContainer.appendChild(panel);
                    let widthV = 100 / panelsCount;
                    let leftV =  widthV * t;
                    panel.classList.add('panel');
                    panel.style = `left: ${leftV}%; width: ${widthV}%;`;
                    panelsArr.push(panel);
                }
            })
            await invisiblePanels()
            await changeSomeBg()
                .then(() => {
                    shadowTextBox.style.display = 'none';
                    shadowTextBox2.style.display = 'none';
                    let allPanels =  document.querySelectorAll('.panel');
                    allPanels.forEach(panel => panel.style.display = 'none');
                })
            await showAllTiles()
            await hideAllTiles()
                .then(() => {
                    // At last unlock game
                    document.querySelector('.board').dataset.animation = 'off';
                    document.querySelector('.board').setAttribute('pointerEvents', 'auto');
                })

        }

        init();
    },

    prepareTilesToPairs_20: function(cardsOpened, tiles, foundTiles, iter) {

        const allTiles = document.querySelectorAll('.tile');
        let iconsArray = [];

        allTiles.forEach(tile => {
            let back = tile.querySelector('.tile-back');
            iconsArray.push(back.childNodes[0]);
        })

        function sortSvgs(array) {
            let compareArr = [];
            for(let x=0; x<array.length; x++) {
                compare(array[x], compareArr);
            }
            return compareArr;
        }

        function compare(item, compareArr) {
            compareArr.unshift(item);
            if(compare.length > 1) {
                for(let y=1; y<compareArr.length; y++) {
                    if(item.classList[1] > compareArr[y].classList[1]) {
                        let z = compareArr[y];
                        compareArr[y] = compareArr[y-1];
                        compareArr[y-1] = z;
                    }
                }
            } else {
                return compareArr;
            }
        }

        iter.array = sortSvgs(iconsArray);
    },

    createSeparateRooms_20: function(cardsOpened, tiles, foundTiles, iter) {

        iter.streak = null;

        const board = document.querySelector('.board');
        const novaGrid = document.createElement('div');
        novaGrid.classList.add('main-grid');
        board.appendChild(novaGrid);
        let allTiles = document.querySelectorAll('.tile');
        let roomsCount = 4;
        let directoriesCount = 5;
        const colorOptions = 2;

        const colorObj = {
            // red, orange, yellow, green, lightblue, darkblue, purple, pink
            a0: ['red', 'green'],
            a1: ['yellow', 'darkblue'],
            a2: ['lightblue', 'purple'],
            a3: ['orange', 'pink'],
        }

        for(let a=0; a<roomsCount; a++) {
            let room = document.createElement('div');
            room.classList.add('room', `room_${a + 1}`);
            board.appendChild(room);

            let substractionCount = 0;
            let colorFirstAmount = 0;
            let colorSecondAmount = 0;
            
            // Color tiles
            for(let z=0; z<(allTiles.length / roomsCount); z = z + 2) {
                let tile = iter.array[z].parentNode.parentNode;
                let tileSibling = iter.array[z+1].parentNode.parentNode;
                let rand = Math.floor( Math.random() * colorOptions);

                if((rand === 0) && ((colorFirstAmount >= (allTiles.length / roomsCount) / colorOptions))) {
                    rand = 1;
                } else if ((rand === 1) && ((colorSecondAmount >= (allTiles.length / roomsCount) / colorOptions))) {
                    rand = 0;
                }

                if(rand === 0) {colorFirstAmount = colorFirstAmount + 2;}
                else if(rand === 1) {colorSecondAmount = colorSecondAmount + 2;}


                let starEffectDiv = document.createElement('div');
                tile.appendChild(starEffectDiv);
                starEffectDiv.classList.add('star-effect', `star_${colorObj[`a${a}`][rand]}`);

                let starEffectDivSibling = document.createElement('div');
                tileSibling.appendChild(starEffectDivSibling);
                starEffectDivSibling.classList.add('star-effect', `star_${colorObj[`a${a}`][rand]}`);

            }

            for(let b=(a * (allTiles.length / roomsCount)); b<((a + 1) * (allTiles.length / roomsCount)); b++) {
                let rand = Math.floor(Math.random() * ((allTiles.length / roomsCount) - substractionCount));
                room.appendChild(iter.array[rand].parentNode.parentNode);
                iter.array.splice(rand, 1);
                substractionCount++;
            }
        }

        for(let c=0; c<directoriesCount; c++) {
            let directory = document.createElement('div');
            directory.classList.add(`directory`, `directory-${c + 1}`);
            board.appendChild(directory);
        }

        let addedRooms = 0;
        let addedDirectories = 0;

        let initialDirections = {
            dir1: 'right',
            dir3: 'up',
            dir4: 'magic',
            dir5: 'down',
            dir7: 'left',
        }

        let qnovaGrid = document.querySelector('.main-grid');

        for(let i=0; i<9; i++) {
            if((i === 0) || (i === 2) || (i === 6) || (i === 8)) {
                let room = document.querySelector(`.room_${addedRooms + 1}`)
                qnovaGrid.appendChild(room);
                addedRooms++;
            } else {
                let directory = document.querySelector(`.directory-${addedDirectories + 1}`)
                let arrow = document.createElement('img');
                arrow.classList.add('directory-arrow', `directory-arrow_${addedDirectories + 1}`);
                arrow.alt = `arrow_${initialDirections[`dir${i}`]}`;
                arrow.src = `arrow_${initialDirections[`dir${i}`]}.svg`;
                directory.appendChild(arrow);
                qnovaGrid.appendChild(directory);
                addedDirectories++;
            }
        }

    },

    blockThreeRoomsAndActivateDirectories_20: function(cardsOpened, tiles, foundTiles, iter) {
        
        // 1. At very beginning pick one starting room and block pointer events on the others

        const roomsCount = 4;
        const colorOptions = 2;
        let animationArray = [];

        for(let i=1; i<=4; i++) {
            let room = document.querySelector(`.room_${i}`);
            room.style = 'pointer-events: none;';
            animationArray.push(room);
        }

        let randomStart = Math.floor( Math.random() * roomsCount) + 1;

        let startRoom = document.querySelector(`.room_${randomStart}`);
        startRoom.style = 'pointer-events: auto;';
        animationArray.splice(randomStart - 1, 1);

        iter.value = startRoom;

        anime({
            targets: animationArray,
            duration: 2400,
            delay: anime.stagger(2400),
            filter: 'grayscale(100%)',
            easing: 'easeOutExpo',
        })

        // 2. Now activate two directoires, based on which room has been chosen

        const directoriesToActivate = {
            r1: ['arrow_1', 'arrow_2'],
            r2: ['arrow_1', 'arrow_4'],
            r3: ['arrow_2', 'arrow_5'],
            r4: ['arrow_4', 'arrow_5'],
        }

        const startRoomClassName = iter.value.classList[1];

        const firstLetter = startRoomClassName[0];
        const lastLetter = startRoomClassName[startRoomClassName.length - 1];


        // PUSH INITIAL ROOMS TO THE ARRAY THEN IN SECONDCLICK FUNCTIONS EXAMINE IF THE ROOMS ARENT EMPTY
        iter.amount = [];

        const allRooms = document.querySelectorAll('.room');
        allRooms.forEach(room => iter.amount.push(room));

        let arrowsToColor = directoriesToActivate[firstLetter + lastLetter];
        let thisRoomColors = [];

        // Get the colors from board elems
        let thisRoom = document.querySelector(`.${startRoomClassName}`);
        let thisRoomTiles = thisRoom.querySelectorAll('.tile');
        thisRoomTiles.forEach((tile, index) => {
            let starEffect = tile.querySelector('.star-effect');
            let color = starEffect.classList[1];

            if(thisRoomColors.length >= colorOptions) {}
            else if(index === 0) {thisRoomColors.push(color);}
            else if(color !== thisRoomColors[0]) {thisRoomColors.push(color);}
        })

        // We ve got proper colors, so now paint out arrows randomly

        // For all arrows add them two additional initial classes
        let allArrows = document.querySelectorAll(`.directory-arrow`);
        allArrows.forEach((arrow) => {
            arrow.classList.add(`arrow-type`, 'no-star');
        })

        for(let n=0; n<colorOptions; n++) {
            let rand = Math.floor(Math.random() * thisRoomColors.length);
            let thisArrow = document.querySelector(`.directory-${arrowsToColor[n]}`);
            thisArrow.classList.remove(thisArrow.classList[thisArrow.classList.length - 1]);
            thisArrow.classList.add(thisRoomColors[rand]);
            thisRoomColors.splice(rand, 1);
        } 
    },

    pickRandomizingScenario_20(cardsOpened, tiles, foundTiles, iter) {
        // Initial object - quite complicated tbh

        const conflict = 'conflict';
        const peaceful = 'peaceful';
        const selfPointing = 'self-pointing';
        const magic = 'magic';

        // Sprawdź tu, czy któryś z pokoi nie jest już pusty, i jeśli jest, to usuń go
        for(let j=0; j<iter.amount.length; j++) {
            let count = 0;
            for(let m=0; m<iter.amount[j].childNodes.length; m++) {
                let tile = iter.amount[j].childNodes[m];
                let back = tile.querySelector('.tile-back');
                if((tile.style.visibility !== 'hidden') && (cardsOpened[0] !== back) && (cardsOpened[1] !== back)) {
                    count++;
                }
            }

            if(count <= 0) { iter.amount.splice(j, 1); j = j - 1;}
        }
        // Usuwanie pustych pokoi zakończone...

        // We have a random number that leads us to the right, random destination - for CONFLICT SCENARIO
        let rand = Math.floor( Math.random() * iter.amount.length);
        let roomIdNo = iter.amount[rand].classList[1];
        let roomIndex = roomIdNo.indexOf('-');
        let random = roomIdNo.substring(roomIndex + 1);

        const behaviourControlObj = {          
            room_1: {
                arrow_1: {
                    // Clockwise order
                    arrow_up:  {
                        scenario: conflict,
                        roomToGo: random,
                    },
                    arrow_right: {
                        scenario: peaceful,
                        roomToGo: 2,
                    },
                    arrow_down: {
                        scenario: conflict,
                        roomToGo: random,
                    },
                    arrow_left:  {
                        scenario: selfPointing,
                        roomToGo: 1,
                    },
                },
                arrow_2: {
                    arrow_up: {
                        scenario: selfPointing,
                        roomToGo: 1,
                    },
                    arrow_right: {
                        scenario: conflict,
                        roomToGo: random,
                    },
                    arrow_down: {
                        scenario: peaceful,
                        roomToGo: 3,
                    },
                    arrow_left:{
                        scenario: conflict,
                        roomToGo: random,
                    },
                    
                },
                arrow_3: { 
                    arrow_magic: {
                        scenario: magic,
                        roomToGo: 4,
                    },

                },
            },
            room_2: {
                arrow_1: {
                    arrow_up: {
                        scenario: conflict,
                        roomToGo: random,
                    },
                    arrow_right: {
                        scenario: selfPointing,
                        roomToGo: 2,
                    },
                    arrow_down: {
                        scenario: conflict,
                        roomToGo: random,
                    },
                    arrow_left: {
                        scenario: peaceful,
                        roomToGo: 1,
                    },
                },
                arrow_3: {
                    arrow_magic:  {
                        scenario: magic,
                        roomToGo: 3,
                    },
                },
                arrow_4: {                    
                    arrow_up: {
                        scenario: selfPointing,
                        roomToGo: 2,
                    },
                    arrow_right: {
                        scenario: conflict,
                        roomToGo: random,
                    },
                    arrow_down: {
                        scenario: peaceful,
                        roomToGo: 4,
                    },
                    arrow_left: {
                        scenario: conflict,
                        roomToGo: random,
                    },
                },
            },
            room_3: {
                arrow_2: {
                    arrow_up: {
                        scenario: peaceful,
                        roomToGo: 1,
                    },
                    arrow_right: {
                        scenario: conflict,
                        roomToGo: random,
                    },
                    arrow_down: {
                        scenario: selfPointing,
                        roomToGo: 3,
                    },
                    arrow_left: {
                        scenario: conflict,
                        roomToGo: random,
                    },
                },
                arrow_3: {
                    arrow_magic: {
                        scenario: magic,
                        roomToGo: 2,
                    },
                },
                arrow_5: {
                    arrow_up: {
                        scenario: conflict,
                        roomToGo: random,
                    },
                    arrow_right: {
                        scenario: peaceful,
                        roomToGo: 4,
                    },
                    arrow_down: {
                        scenario: conflict,
                        roomToGo: random,
                    },
                    arrow_left: {
                        scenario: selfPointing,
                        roomToGo: 3,
                    },
                },
            },
            room_4: {
                arrow_3: {
                    arrow_magic: {
                        scenario: magic,
                        roomToGo: 1,
                    },
                },
                arrow_4: {
                    arrow_up: {
                        scenario: peaceful,
                        roomToGo: 2,
                    },
                    arrow_right: {
                        scenario: conflict,
                        roomToGo: random,
                    },
                    arrow_down: {
                        scenario: selfPointing,
                        roomToGo: 4,
                    },
                    arrow_left: {
                        scenario: conflict,
                        roomToGo: random,
                    },
                },
                arrow_5: {
                    arrow_up: {
                        scenario: conflict,
                        roomToGo: random,
                    },
                    arrow_right: {
                        scenario: selfPointing,
                        roomToGo: 4,
                    },
                    arrow_down: {
                        scenario: conflict,
                        roomToGo: random,
                    },
                    arrow_left: {
                        scenario: peaceful,
                        roomToGo: 3,
                    },
                },
            },
        }

        // WE ARE ALWAYS CERTAIN THAT cardsOpened[0].parentNode's color equals cardsOpened[1].parentNode
        let tile = cardsOpened[0].parentNode;

        // Let's get the room number first
        const room = tile.parentNode;
        let roomId = room.classList[1]; // roomNoFormatted, roomNoUnformatted to teraz roomId

        // Now let's go for arrow identifier

        let starEffect = tile.querySelector('.star-effect');

        let chosenColorPath = starEffect.classList[1];  // star-pink  as an example - so the player chose pink path

        // Now look for that arrow that contains that class - HENCE ITS SO IMPORTANT THAT BOTH ARROWS HAS TO BE COLORED EVERY TIME
        // ONLY ONCE, BECAUSE IT'S PLAYER COLOR CHOICE AND IT CAN BE ONLY 1 OF COURSE
        let arrowToFollow;
        const allArrows = document.querySelectorAll('.directory-arrow');
        allArrows.forEach((arrow) => {
            if(arrow.classList.contains(chosenColorPath)) arrowToFollow = arrow;
        })
        
        let arrowAlt = arrowToFollow.alt; 
        // (replacement for arrowAltFomratted);

        let arrowToFollowNo = arrowToFollow.classList[1];

        let initialIndex = arrowToFollowNo.indexOf('arrow');
        let arrowIdentifier = arrowToFollowNo.substring(initialIndex);
        // (replacement for arrowIdentifierFormatted)

        const endChainProps = behaviourControlObj[roomId][arrowIdentifier][arrowAlt];
        let scenario = endChainProps.scenario; // initially, if it's not then it would be changed at the right time (right below)  
        let roomToGo = endChainProps.roomToGo;  // those have to be set because it causes errors then
        // Czyli: jak nazywa się scenariusz i do którego pokoju zostaniesz teraz przeniesiony

        // Przypilnuj, czy scenariusz nie zostawi lub przeniesie Cię do pustego pokoju
        // Najpierw test, czy taka sytuacja ma miejsce
        let isNewRoomSafe = false;
        for(let v=0; v<iter.amount.length; v++) {
            let className = iter.amount[v].classList[1];
            let index = className.indexOf('_');
            let roomNo = className.substring(index + 1);

            if(parseInt(roomNo) === parseInt(roomToGo)) {
                isNewRoomSafe = true;
                
            }
        }
        if(isNewRoomSafe === false) {
            // Losuj jeden z istniejących pokoi jako nowe miejsce przekierowania (już niezależnie czy konflikt, magic, peaceful czy selfPointing)
            let rand = Math.floor(Math.random() * iter.amount.length);
            let className = iter.amount[rand].classList[1];
            let index = className.indexOf('_');
            let roomNumber = className.substring(index + 1);

            scenario = conflict; // We have to transform player to the separate room, so yeah its conflict
            
            roomToGo = roomNumber;
            random = roomToGo;
        }

        if(scenario === conflict) {
            this.fireConflictScenario_20(cardsOpened, tiles, foundTiles, iter, scenario, roomToGo, random);
        } else if(scenario === peaceful) {
            this.firePeacefulScenario_20(cardsOpened, tiles, foundTiles, iter, scenario, roomToGo);     
        } else if(scenario === selfPointing) {
            this.fireSelfPointingScenario_20(cardsOpened, tiles, foundTiles, iter, scenario, roomToGo);
        } else if(scenario === magic) {
            this.fireMagicScenario_20(cardsOpened, tiles, foundTiles, iter, scenario, roomToGo);
        }

        // At last set two random arrows nearby to a new room location and prepare game for player's new move
        this.setTwoScenariosOptions_20(cardsOpened, tiles, foundTiles, iter, roomToGo, scenario, roomId, behaviourControlObj, random);
    },

    lookForRandomizingScenario_20(cardsOpened, tiles, foundTiles, iter) {
        if(foundTiles+2 === tiles) {
            return;
        }

        else if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            this.pickRandomizingScenario_20(cardsOpened, tiles, foundTiles, iter);
        }
    },

    setTwoScenariosOptions_20: function(cardsOpened, tiles, foundTiles, iter, roomToGo, scenario, roomId, behaviourControlObj, random) {
        // Remove all star colorful classes
        let allArrows = document.querySelectorAll(`.directory-arrow`);

        anime({
            targets: allArrows,
            duration: 100,
            opacity: 0,
            easing: 'linear',
        })

        allArrows.forEach((arrow) => {
            arrow.classList.remove(arrow.classList[arrow.classList.length - 1]);
            arrow.classList.add('no-stars');
        })
        // Make use of behaviourControlObj a LOT !!
        let finalIndex = roomId.indexOf('_');
        let formattedFirstPart = roomId.substring(0, finalIndex + 1);
        
        const currentRoom = formattedFirstPart + roomToGo; // This is the first indent in behaviourControlObj - we know what the current room is

        // First, by roomToGo you can find a room_${roomToGo} - this is the new chosen room we will change its' arrows for !
        let possibleArrows = behaviourControlObj[currentRoom];

        // Now let's set FIRST scenario based on RNG - but it has to consider which rooms are still active
        // Prepare a check code

        // Bierzesz każdą strzałkę i dla każdego możliwej jej kombinacji (up, down, left, right...) sprawdzasz, czy jest ona możliwa
        // Te które są możliwe trzeba jakoś zapisać. Potem dla każdej strzałki losujesz scenariusz (ale na samym początku zrób losowanie RNG
        // czy scenariusz będzie magic (i uprzednio upewnij się że kombinacja jest wgl możliwa). Jeśli nie będzie magic, to wtedy ustawiasz najpierw
        // pierwszą strzałkę - losowy z możliwych scenariuszy (wraz z conflict); na tej podstawie ustawiasz drugą, pozbywając się już zarezerwowanych
        //  / zamkniętych możliwości;  Jeśli jednak 1szy scenariusz będzie magic, to wylosuj drugą strzałkę (która z pozostałych to będzie) i analogicznie
        // ustawiasz jej losowy, jeden z dostępnych już scenariuszy + na końcu daj im kolorki !

        // Check valid option and push them into nextArr

        for(let arrow in possibleArrows) { // konkretny numer strzałki w danym pokoju (arrow_1, arrow_2, arrow_3); // Zawsze są to 3 strzałki
            for(let direction in possibleArrows[arrow]) { // konkretny kierunek w powyższych strzałkach (up, right, down, left || magic - przy arrow_3)
                let directionChecked = possibleArrows[arrow][direction];
                // Szukamy wszystkich możliwych opcji w obrębie jednego pokoju
                iter.nextArr.push(
                {
                    arrow: `${arrow}`,
                    direction: `${direction}`, 
                    scenario: `${directionChecked.scenario}`, 
                    roomToGo: `${directionChecked.roomToGo}`, 
                    
                }); 
            }
        }

        // iter.nextArr holds everyhing that is valid to use for randomizing stuff

        // Randomized first arrow in compare to iter.nextArr possibilities, and second arrow randomize for remain possible cases

        let firstArrowNumber = Math.floor(Math.random() * iter.nextArr.length);
        let firstArrowProps = iter.nextArr[firstArrowNumber];

        let arrowId = iter.nextArr[firstArrowNumber].arrow;  // This one would be useful for our second arrow
        //let scenarioName = iter.nextArr[firstArrowNumber].scenario; // This one would be useful for our second arrow

        // Now adjust chosen arrow with custom properties !
        let firstArrow = document.querySelector(`.directory-${arrowId}`);

        firstArrow.src = `${iter.nextArr[firstArrowNumber].direction}.svg`;
        firstArrow.alt = iter.nextArr[firstArrowNumber].direction;


        for(let h=0; h<iter.nextArr.length; h++) {
            // Jeśli druga strzałka = pierwsza  LUB jeśli scenariusz 1.strz = scenariusz 2. strz ORAZ nie jest to peacful LUB scenario to magic
            if((arrowId === iter.nextArr[h].arrow)  || (iter.nextArr[h].scenario === 'magic')) {
                // Thanks to that, second arrow will not be the same as first !
                iter.nextArr.splice(h, 1);
                h = h-1;
            }
        }

        // Randomized second arrow based on (results of arrow 1) what arrows are just available and remain possible scenarios

        let secondArrowProps;

        // NOW CREATE CUSTOM CONFLICT SCENARIO, APPEND IT TO THE NEXT ARR AND THEN PICK ONE OF THOSE SCENARIOS, ADD TO SECOND ARROW
        // AND FINALLY JUST GIVE THAT ARROWS ITS' ROOM COLORS (PLEASE USE CODE ABOVE FOR THAT IN ONSTARTFUNCTION () )

        // Wzór na konflikt : ARROW: który już istnieje w obiekcie; DIRECTION: który nie istineje w obiekcie; SCENARIO: 'conflict'; roomToGo: ?? -> albo wylosuj teraz albo zostaw funkcji fire_20

        let secondArrowNumber = Math.floor(Math.random() * iter.nextArr.length);
        secondArrowProps = iter.nextArr[secondArrowNumber];

        let secondArrow = document.querySelector(`.directory-${iter.nextArr[secondArrowNumber].arrow}`);

        async function darkenEffectTwo() {
            const a1 = anime({
                targets: [firstArrow, secondArrow],
                duration: 2800,
                opacity: 0,
                easing: 'easeInExpo',
            }).finished;
            await Promise.all([a1]);
        }

        async function removeDarkenEffectTwo() {
            const a2 = anime({
                targets: [firstArrow, secondArrow],
                duration: 2800,
                opacity: 1,
                easing: 'easeOutExpo',
            }).finished;
            await Promise.all([a2]);
        }
 
        async function initSecondArrow() {
            await darkenEffectTwo()
            .then(() => {
                if((iter.nextArr.length - 1) >= (secondArrowNumber)) {
    
                    secondArrow.src = `${iter.nextArr[secondArrowNumber].direction}.svg`;
                    secondArrow.alt = iter.nextArr[secondArrowNumber].direction;
                }
            })
            await removeDarkenEffectTwo()
            .then(() => {
                iter.nextArr = [];
            })
        }

        initSecondArrow();

        // Color new arrows :
        const colorOptions = 2;
        let thisRoomColors = [];
        let arrowsToColor = [firstArrowProps, secondArrowProps];


        // Only count visible ones !
        let thisRoom = document.querySelector(`.${currentRoom}`);
        let visibleTiles = [];
        let thisRoomTiles = thisRoom.querySelectorAll('.tile');
        thisRoomTiles.forEach((tile) => {
            if(tile.style.visibility !== 'hidden') { visibleTiles.push(tile); }
        })

        
        visibleTiles.forEach((tile, index) => {
            let starEffect = tile.querySelector('.star-effect');
            let color = starEffect.classList[1];

            if(thisRoomColors.length >= colorOptions) {}
            else if(index === 0) {thisRoomColors.push(color);}
            else if(color !== thisRoomColors[0]) {thisRoomColors.push(color);}
        })

        // We ve got proper colors, so now paint out arrows randomly
        // ...

        for(let n=0; n<arrowsToColor.length; n++) {
            let rand = Math.floor(Math.random() * thisRoomColors.length);
            let thisArrow = document.querySelector(`.directory-${arrowsToColor[n].arrow}`);

            // Remove the very last class right before adding new one
            thisArrow.classList.remove(thisArrow.classList[thisArrow.classList.length - 1]);
            thisArrow.classList.add(thisRoomColors[rand]);
            thisRoomColors.splice(rand, 1);
        } 

    },

    fireConflictScenario_20: function(cardsOpened, tiles, foundTiles, iter, scenario, roomToGo, roomNoUnformatted, random) {

        const allRooms = document.querySelectorAll('.room');  
        let roomsToBlock = [];
        let roomToVisit;

        let conflictQuotes = ['That leads to nowhere !', `Really want to go here ?`, `#404 Room Not Found`];
        const myQuote = this.pickrandomQuote_20(conflictQuotes);

        allRooms.forEach((room) => {
            if(room.classList[1] === `room_${roomToGo}`) {
                roomToVisit = room;
                room.style = 'pointer-events: none;';
                const allVisitRoomTiles = roomToVisit.querySelectorAll('.tile');
                allVisitRoomTiles.forEach(tile => {
                    if(tile.style.visibility !== 'hidden') {
                        tile.style = 'pointer-events: none';
                    }
                })
            } else {
                room.style = 'pointer-events: none;';
                roomsToBlock.push(room);
            }
        })


        async function blockRooms() {
            const a1 = anime({
                targets: roomsToBlock,
                duration: 1200,
                delay: anime.stagger(500),
                filter: 'grayscale(100%)',
                easing: 'easeOutExpo',
            }).finished;

            await Promise.all([a1]);
        }

        async function unblockVisitRoom() {
            const a2 = anime({
                targets: roomToVisit,
                duration: 1200,
                filter: 'grayscale(0%)',
                easing: 'easeInExpo',
            }).finished;

            await Promise.all([a2]);
        }

        async function showCite() {
            const a4 = anime({
                targets:'.citeDiv',
                duration: 1100,
                opacity: [0, 1],
                easing: 'easeInExpo',
            }).finished;

            await Promise.all([a4]);
        }

        async function hideCite() {
            const a5 = anime({
                targets:'.citeDiv',
                delay: 2200,
                duration: 1100,
                opacity: 0,
                easing: 'easeOutExpo',
            }).finished;

            await Promise.all([a5]);
        }

        async function init() {
            await blockRooms()
            .then(() => {
                const animationContainer = document.querySelector('.animationContainer');
                let citeDiv = document.createElement('div');
                citeDiv.classList.add('citeDiv', 'citeDiv-conflict');
                let cite = document.createElement('div');
                cite.classList.add('cite');

                cite.textContent = myQuote;

                cite.style.visibility = 'visible';

                citeDiv.appendChild(cite);
                animationContainer.appendChild(citeDiv);
            })
            await showCite()
            await hideCite()
            .then(() => {
                const citeDiv = document.querySelector('.citeDiv');
                citeDiv.remove();
            })
            await unblockVisitRoom()
            .then(() => {
                roomToVisit.style = 'pointer-events: auto;';
                const allVisitRoomTiles = roomToVisit.querySelectorAll('.tile');
                allVisitRoomTiles.forEach(tile => {
                    if(tile.style.visibility !== 'hidden') {
                        tile.style = 'pointer-events: auto';
                    }
                })
            })
        }

        // Fire
        init();
    },

    firePeacefulScenario_20: function(cardsOpened, tiles, foundTiles, iter, scenario, roomToGo) {
        const allRooms = document.querySelectorAll('.room');
        let roomsToBlock = [];
        let roomToVisit;

        allRooms.forEach((room) => {
            if(room.classList[1] === `room_${roomToGo}`) {
                roomToVisit = room;
                room.style = 'pointer-events: none;';
                const allVisitRoomTiles = roomToVisit.querySelectorAll('.tile');
                allVisitRoomTiles.forEach(tile => {
                    if(tile.style.visibility !== 'hidden') {
                        tile.style = 'pointer-events: none';
                    }
                })
            } else {
                room.style = 'pointer-events: none;';
                roomsToBlock.push(room);
            }
        })

        // Keep it for other room 
        async function blockRooms() {
            const a1 = anime({
                targets: roomsToBlock,
                duration: 1200,
                delay: anime.stagger(500),
                filter: 'grayscale(100%)',
                easing: 'easeOutExpo',
            }).finished;

            await Promise.all([a1]);
        }

        async function unblockVisitRoom() {
            const a3 = anime({
                targets: roomToVisit,
                duration: 1200,
                filter: 'grayscale(0%)',
                easing: 'easeInExpo',
            }).finished;

            await Promise.all([a3]);
        }

        async function init() {
            await blockRooms()
            await unblockVisitRoom()
            .then(() => {
                roomToVisit.style = 'pointer-events: auto;';
                const allVisitRoomTiles = roomToVisit.querySelectorAll('.tile');
                allVisitRoomTiles.forEach(tile => {
                    if(tile.style.visibility !== 'hidden') {
                        tile.style = 'pointer-events: auto';
                    }
                })
            })
        }

        // Fire
        init();
    },

    fireSelfPointingScenario_20: function(cardsOpened, tiles, foundTiles, iter, scenario, roomToGo) {
        const allRooms = document.querySelectorAll('.room');  
        let roomsToBlock = [];
        let roomToVisit;

        let selfPointingQuotes = ['Got stuck, right ?', `There's no escape from this room !`, `Scared to leave room ${roomToGo} ?`];
        const myQuote = this.pickrandomQuote_20(selfPointingQuotes);

        allRooms.forEach((room) => {
            if(room.classList[1] === `room_${roomToGo}`) {
                roomToVisit = room;
                roomToVisit.style = 'pointer-events: none;';
                const allVisitRoomTiles = roomToVisit.querySelectorAll('.tile');
                allVisitRoomTiles.forEach(tile => {
                    if(tile.style.visibility !== 'hidden') {
                        tile.style = 'pointer-events: none';
                    }
                })
            } else {
                room.style = 'pointer-events: none;';
                roomsToBlock.push(room);
            }
        })

        async function blockRooms() {
            const a1 = anime({
                targets: roomsToBlock,
                duration: 1200,
                delay: anime.stagger(500),
                filter: 'grayscale(100%)',
                easing: 'easeOutExpo',
            }).finished;

            await Promise.all([a1]);
        }

        async function unblockVisitRoom() {
            const a2 = anime({
                targets: roomToVisit,
                duration: 1200,
                filter: 'grayscale(0%)',
                easing: 'easeInExpo',
            }).finished;

            await Promise.all([a2]);
        }

        async function showCite() {
            const a4 = anime({
                targets:'.citeDiv',
                duration: 1100,
                scaleY: '100%',
                easing: 'easeInExpo',
            }).finished;

            await Promise.all([a4]);
        }

        async function hideCite() {
            const a5 = anime({
                targets:'.citeDiv',
                delay: 1400,
                duration: 1100,
                opacity: 0,
                easing: 'easeOutExpo',
            }).finished;

            await Promise.all([a5]);
        }

        async function init() {
            await blockRooms()
            .then(() => {
                const animationContainer = document.querySelector('.animationContainer');
                let citeDiv = document.createElement('div');
                citeDiv.classList.add('citeDiv', 'citeDiv-selfPointing');
                let cite = document.createElement('div');
                cite.classList.add('cite');

                cite.textContent = myQuote;

                cite.style.visibility = 'visible';

                citeDiv.appendChild(cite);
                animationContainer.appendChild(citeDiv);
            })
            await showCite()
            await hideCite()
            .then(() => {
                const citeDiv = document.querySelector('.citeDiv');
                citeDiv.remove();
            })
            await unblockVisitRoom()
            .then(() => {
                roomToVisit.style = 'pointer-events: auto;';
                const allVisitRoomTiles = roomToVisit.querySelectorAll('.tile');
                allVisitRoomTiles.forEach(tile => {
                    if(tile.style.visibility !== 'hidden') {
                        tile.style = 'pointer-events: auto';
                    }
                })
            })
        }

        // Fire
        init();
    },

    fireMagicScenario_20: function(cardsOpened, tiles, foundTiles, iter, scenario, roomToGo) {
        const allRooms = document.querySelectorAll('.room');  
        let roomsToBlock = [];
        let roomToVisit;

        let animateLetters = [];

        let magicQuotes = [`When the magic comes in`, `Room ${roomToGo} is now your destiny`, `Feel tricked a bit ?`];
        const myQuote = this.pickrandomQuote_20(magicQuotes);

        allRooms.forEach((room) => {
            if(room.classList[1] === `room_${roomToGo}`) {
                roomToVisit = room;
                room.style = 'pointer-events: none;';
                const allVisitRoomTiles = roomToVisit.querySelectorAll('.tile');
                allVisitRoomTiles.forEach(tile => {
                    if(tile.style.visibility !== 'hidden') {
                        tile.style = 'pointer-events: none';
                    }
                })
            } else {
                room.style = 'pointer-events: none;';
                roomsToBlock.push(room);
            }
        })

        async function blockRooms() {
            const a1 = anime({
                targets: roomsToBlock,
                duration: 1200,
                delay: anime.stagger(500),
                filter: 'grayscale(100%)',
                easing: 'easeOutExpo',
            }).finished;

            await Promise.all([a1]);
        }

        async function unblockVisitRoom() {
            const a2 = anime({
                targets: roomToVisit,
                delay: 1000,
                duration: 1100,
                filter: 'grayscale(0%)',
                easing: 'easeInExpo',
            }).finished;

            await Promise.all([a2]);
        }

        async function showCite() {
            const a4 = anime({
                targets: animateLetters,
                duration: 1800,
                delay: anime.stagger(160, {from: 'first'}),
                opacity: [0, 1],
                easing: 'linear',
            }).finished;

            await Promise.all([a4]);
        }

        async function wait() {
            const w1 = anime({
                targets: animateLetters,
                duration: 1200,
            }).finished;

            await Promise.all([w1]);
        }

        async function hideCite() {
            const a5 = anime({
                targets: animateLetters,
                duration: 1000,
                delay: anime.stagger(50, {from: 'last'}),
                opacity: 0,
                easing: 'linear',
            }).finished;

            await Promise.all([a5]);
        }

        async function init() {
            await blockRooms()
            .then(() => {
                const animationContainer = document.querySelector('.animationContainer');
                let citeDiv = document.createElement('div');
                citeDiv.classList.add('citeDiv', 'citeDiv-magic');
                let cite = document.createElement('div');
                cite.classList.add('cite', 'letter-container');

                for(let o=0; o<myQuote.length; o++) {
                    let letter = document.createElement('div');
                    letter.textContent = myQuote[o];
                    letter.classList.add('cite-letter');

                    cite.appendChild(letter);
                    animateLetters.push(letter);
                }

                cite.style.visibility = 'visible';

                citeDiv.appendChild(cite);
                animationContainer.appendChild(citeDiv);
            })
            await showCite()
            await wait()
            await hideCite()
            .then(() => {
                const citeDiv = document.querySelector('.citeDiv');
                citeDiv.remove();
            })

            await unblockVisitRoom()
            .then(() => {
                roomToVisit.style = 'pointer-events: auto;';
                const allVisitRoomTiles = roomToVisit.querySelectorAll('.tile');
                allVisitRoomTiles.forEach(tile => {
                    if(tile.style.visibility !== 'hidden') {
                        tile.style = 'pointer-events: auto';
                    }
                })
            })
        }

        // Fire
        init();
    },

    pickrandomQuote_20: function(quoteArr) {
        const randomQuote = quoteArr[Math.floor(Math.random() * quoteArr.length)];
        return randomQuote;
    },

    createStarBinding_20: function(cardsOpened, tiles, foundTiles, iter) {

        let uselessStars = [];

        if(iter.streak === null) {
            iter.streak = cardsOpened[0];
            let starTile = cardsOpened[0].parentNode;
            let starEffect = starTile.querySelector('.star-effect').classList[1];
            let room = starTile.parentNode;
            let allRoomTiles = room.querySelectorAll('.tile');
            allRoomTiles.forEach(tile => {
                let effect = tile.querySelector('.star-effect').classList[1];
                if((starEffect !== effect) && (tile.style.visibility !== 'hidden')) {
                    uselessStars.push(tile);
                    tile.style = 'pointer-events: none;';
                }
            })

            anime({
                targets: uselessStars,
                duration: 500,
                easing: 'easeInSine',
                opacity: [1, 0],
            })

        } else {
            let starsToUnlock = [];
            let boundStar = iter.streak.parentNode;
            let starEffectColor = boundStar.querySelector('.star-effect').classList[1];
            let room = boundStar.parentNode;
            let allRoomTiles = room.querySelectorAll('.tile');
            allRoomTiles.forEach(star => {
                let thisStarEffectColor = star.querySelector('.star-effect').classList[1];
                let back = star.querySelector('.tile-back');

                if((thisStarEffectColor === starEffectColor) && (iter.streak !== back) && (star.style.visibility !== 'hidden')) {
                    starsToUnlock.push(star);
                }
            })

            async function unlock() {
                const a1 = anime({
                    targets: starsToUnlock,
                    duration: 400,
                    easing: 'linear',
                    filter: 'sepia(0%)',
                })
                await Promise.all([a1]);
            }

            async function init() {
                await unlock()
                    .then(() => {
                        for(let u=0; u<starsToUnlock.length; u++) {
                            starsToUnlock[u].style = 'pointer-events: auto;';
                        }
                    })
            }

            init();
        }
    },

    tryToRemoveStarBinding_20: function(cardsOpened, tiles, foundTiles, iter) {
        
        let usefulStars = [];

        if(cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) {
            iter.streak = cardsOpened[0];
            let starTile = cardsOpened[0].parentNode;
            let starEffect = starTile.querySelector('.star-effect').classList[1];
            let room = starTile.parentNode;
            let allRoomTiles = room.querySelectorAll('.tile');
            allRoomTiles.forEach(tile => {
                let effect = tile.querySelector('.star-effect').classList[1];
                if((starEffect !== effect) && (tile.style.visibility !== 'hidden')) {
                    usefulStars.push(tile);
                    tile.style = 'pointer-events: none;';
                    
                } else if(tile.style.visibility !== 'hidden') {
                    tile.style = 'pointer-events: none;';
                }
            })

            anime({
                targets: usefulStars,
                duration: 800,
                easing: 'linear',
                opacity: [0, 1],
            })

            iter.streak = null;
        } else {
            let starsToLock = [];
            let boundStar = iter.streak.parentNode;
            let starEffectColor = boundStar.querySelector('.star-effect').classList[1];
            let room = boundStar.parentNode;
            let allRoomTiles = room.querySelectorAll('.tile');
            allRoomTiles.forEach(star => {
                let thisStarEffectColor = star.querySelector('.star-effect').classList[1];
                let back = star.querySelector('.tile-back');

                if((thisStarEffectColor === starEffectColor) && (iter.streak !== back) && (star.style.visibility !== 'hidden')) {
                    starsToLock.push(star);
                    star.style = 'pointer-events: none;';
                }
            })

            async function unlock() {
                const a1 = anime({
                    targets: starsToLock,
                    duration: 250,
                    easing: 'linear',
                    filter: 'sepia(80%)',
                })
                await Promise.all([a1]);
            }

            async function init() {
                await unlock()
            }

            init();
        }
    },

    checkTimeAddCondition_20: function(cardsOpened, tiles, foundTiles, iter, time) {
        // Gives extra time whenever you complete a room (but not the last one)
        if(!time) return;
        if((cardsOpened[0].childNodes[0].classList[1] === cardsOpened[1].childNodes[0].classList[1]) && (foundTiles+2 !== tiles)) {
            let thisRoom = cardsOpened[0].parentNode.parentNode;
            let activeRoomTilesCount = 0;
            const allRoomTiles = thisRoom.querySelectorAll('.tile');
            allRoomTiles.forEach(tile => {
                let back = tile.querySelector('.tile-back');
                if((tile.style.visibility !== 'hidden') && (back !== cardsOpened[0]) && (back !== cardsOpened[1])) {
                    activeRoomTilesCount++;
                }
            })

            if(activeRoomTilesCount <= 0) {
                iter.timeAddon = (levels[`lvl20`].counter.time - time);
                setTimeout(() => {
                    iter.timeAddon = 0;
                }, 1000);
            }
        }
    },

    redistributeAtLastFoundTiles_20(cardsOpened, tiles, foundTiles, iter) {
        let finalTiles = [];
        if(foundTiles + 2 === tiles) {
            const board = document.querySelector('.board');
            const animationContainer = document.querySelector('.animationContainer');
            const mainGrid = document.querySelector('.main-grid');
            const allRooms = mainGrid.querySelectorAll('.room');
            allRooms.forEach(room => {
                const allRoomTiles = room.querySelectorAll('.tile');
                allRoomTiles.forEach(tile => {
                    finalTiles.push(tile);
                })
            })

            for(let x=0; x<finalTiles.length; x++) {
                board.appendChild(finalTiles[x]);
            }

            animationContainer.appendChild(mainGrid);
        }
    }
}

export default flags; // Bye bye 5453 lines of code  :(