import mainStyles from '../styles/main.module.css';
import * as Animation from "animejs";
const anime = Animation.default;

async function level_start(stageNo, time, tileShowTime) {
    
    async function startAnimation() {
        prepareGame()
        await showTiles()
        await hideTiles()
        await changeTileTypesOpacity()
    }

    async function showTiles() {
        const a1 = anime({
            targets: `.${mainStyles['tileType2']}`,
            duration: time,
            transitionProperty: 'all',
            rotateY: '180deg',
            easing: 'linear',
            loop: false,
        }).finished;

        await Promise.all([a1]);
    }

    async function hideTiles() {
        const a2 = anime({
            targets: `.${mainStyles['tileType2']}`,
            duration: time,
            delay: tileShowTime,
            transitionProperty: 'all',
            rotateY: '0deg',
            easing: 'linear',
            loop: false,
        }).finished;

        await Promise.all([a2]);
    }

    async function changeTileTypesOpacity() {
        const showTileType1 = anime({
            targets: `.${mainStyles['tileType1']}`,
            duration: 1200,
            easing: 'linear',
            opacity: [0, 1],
        }).finished;

        const hideTileType2 = anime({
            targets: [`.${mainStyles['tileType2']}`, `.${mainStyles['tileType2']} svg`],
            duration: 1200,
            easing: 'linear',
            opacity: [1, 0],
        }).finished;

        await Promise.all([showTileType1, hideTileType2]);
    }


    // Init
    await startAnimation();
}

function prepareGame() {
    addTileIdentifiers();
    resetIcons();
    const firstType = document.querySelectorAll(`.${mainStyles['tileType1']}`);
    firstType.forEach(tile => tile.style.opacity = 0);
    const secondType = document.querySelectorAll(`.${mainStyles['tileType2']}`);
    secondType.forEach(tile => tile.style.pointerEvents = 'none');
}

function addTileIdentifiers() {
    let allTiles = document.querySelectorAll(`.${mainStyles['tile_custom']}`);
    for(let i=0; i<allTiles.length/2; i++) {
        allTiles[i].classList.add(`${mainStyles['tileType1']}`);
    }
    for(let j=(allTiles.length/2); j<allTiles.length; j++) {
        allTiles[j].classList.add(`${mainStyles['tileType2']}`);
    } 
}

function resetIcons() {
    const allTiles = document.querySelectorAll(`.${mainStyles['tile_custom']}`);
    let iconsArr = [];
    let tileTypeArr1 = [];
    let tileTypeArr2 = [];
    let randomizedElems1 = [];
    let randomizedElems2 = [];
    for(let a=0; a<allTiles.length; a++) {
        let back = allTiles[a].querySelector(`.${mainStyles['tile-back_custom']}`);
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

    const tileType1 = document.querySelectorAll(`.${mainStyles['tileType1']}`);
    const tileType2 = document.querySelectorAll(`.${mainStyles['tileType2']}`);

    for(let c=0; c<(allTiles.length/2); c++) {
        let rand = Math.floor(Math.random() * tileTypeArr1.length);
        randomizedElems1.push(tileTypeArr1[rand]);
        tileTypeArr1.splice(rand, 1);
    }
    for(let d=0; d<(allTiles.length/2); d++) {
        let rand = Math.floor(Math.random() * tileTypeArr2.length);
        randomizedElems2.push(tileTypeArr2[rand]);
        tileTypeArr2.splice(rand, 1);
    }  

    for(let h=0; h<allTiles.length; h++) {
        // Remove svgs
        allTiles[h].childNodes[2].childNodes[0].remove();
    }

    // Add new svg's
    tileType1.forEach((tile, index) => {
        tile.childNodes[2].appendChild(randomizedElems1[index])
    })

    tileType2.forEach((tile, index) => {
        tile.childNodes[2].appendChild(randomizedElems2[index])
    })
}

export {level_start};