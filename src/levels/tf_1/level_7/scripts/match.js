import mainStyles from '../styles/main.module.css';
import firstPlanStyles from '../styles/firstPlan.module.css';
import { possibleIconColors } from './start';
import * as Animation from "animejs";
const anime = Animation.default;

async function match(isMatch, cardsOpened_parentNodes, stageNo, levelObject, levelVariables) {
    // Fire some animations when we found / do not found a match
    // IF we enable STATIC modifiers, then we are responsible for prepending
    // a checker mechanism on our own - just like below :
    const targets = document.querySelectorAll(`.target`);
    const targets_tileRefs = Array.from(targets).map(tile => tile.dataset['tileRef']);
    const checkRealMatch = checkForMatch();
    prepareForNextTurn(checkRealMatch);
    levelVariables.STATIC.DOESMATCH_MODIFIER = checkRealMatch;

    function checkForMatch() {
        // THIS FUNCTION SHOULD ALWAYS RETURN EITHER TRUE OR FALSE
        // Remeber that for levelVariables.matchTypeHistory the last index is actually the future match type (a.k.a. NEXT) 
        if(levelVariables.matchTypeHistory[levelVariables.matchTypeHistory.length - 2] === 'icons') {
            // It is standard match based on icons. Return whatever our previous standard checker (withing MG component) returned.
            return isMatch; // either true or false
        }
        else if(levelVariables.matchTypeHistory[levelVariables.matchTypeHistory.length - 2] === 'colors') {
            // Colors match type is non-standard match type, so we have to use below checker method
            const isCorrect = targets_tileRefs.every(tileRef => levelVariables.iconsColoring['colorsTable'][+tileRef] === levelVariables.iconsColoring['colorsTable'][+targets_tileRefs[0]]);
            return isCorrect; // either true or false
        }
        else {
            throw new Error(`No such match type name found. Provided argument: ${levelVariables.matchTypeHistory[levelVariables.matchTypeHistory.length - 2]} is incorrect.`);
        }
    }

    function prepareForNextTurn(isMatchFound) {
        if(isMatchFound === true) {
            // Modify levelVariables.iconsColoring.colorsTable
            targets_tileRefs.map((tile_Ref) => levelVariables.iconsColoring.colorsTable[+tile_Ref] = '');
            scenarioChange();
        }   
    }

    async function runIconColorResetMessage() {
        const aContainer = document.querySelector(`.${mainStyles['aContainer_custom']}`);
    
        async function init() {
            const msg1 = `No possible\u00a0matches\u00a0left!\u00a0Resetting\u00a0in\u00a0process...`;
            const msg2 = `Now\u00a0focus\u00a0only\u00a0on\u00a0colors!`
    
            const dimmedScreen = document.createElement('div');
            const textBox = document.createElement('div');
            const text1 = document.createElement('div');
            const text2 = document.createElement('div');
            text1.textContent = msg1;
            text2.textContent = msg2;
    
            text1.classList.add(`${mainStyles['message']}`);
            text2.classList.add(`${mainStyles['message']}`);
            textBox.classList.add(`${mainStyles['message-box']}`);
            dimmedScreen.classList.add(`${mainStyles['dimmed-screen']}`);
            
            textBox.append(text1, text2);
            dimmedScreen.appendChild(textBox);
            aContainer.appendChild(dimmedScreen);
    
            await showDimmedScreen()
            await showMessages()
            await hideMessage()
        }
    
        async function showDimmedScreen() {
            const a1 = anime({
                targets: `.${mainStyles['dimmed-screen']}`,
                duration: 650,
                opacity: { value: [0, 1], easing: 'linear' },
            }).finished;
    
            await Promise.all([a1]);
        }
    
        async function showMessages() {
            const a2 = anime({
                targets: `.${mainStyles['message']}`,
                duration: 600,
                opacity: [0, 1],
                scale: [.75, 1],
                translateY: ['2rem', '0rem'],
                delay: anime.stagger(250),
                endDelay: 3000,
                easing: 'linear',
            }).finished;
    
            await Promise.all([a2]);
        }
    
        async function hideMessage() {
            const a3 = anime({
                targets: `.${mainStyles['message']}`,
                duration: 600,
                opacity: [1, 0],
                translateY: ['0rem', '1.5rem'],
                easing: 'linear',
            }).finished;
    
            const a4 = anime({
                targets: `.${mainStyles['dimmed-screen']}`,
                duration: 750,
                opacity: { value: [1, 0], easing: 'easeInCubic' },
            }).finished;
    
            await Promise.all([a3, a4]);
        }
    
        await init();
    
        // Reassigning colors for the tiles 
        const allTiles = document.querySelectorAll(`.${mainStyles['tile_custom']}`);
        levelVariables.iconsColoring.colorsTable.forEach((new_color, index) => {
            if(new_color !== '') { 
                allTiles[index].querySelector(`.${mainStyles['tile-back_custom']}`).style.color = new_color; 
            }
        })
    }

    function scenarioChange() {
        // Handle checker which will test how many possible match we have for both types
        // 1. Test 'colors' match type
        const availableColorsInActiveTiles_arr = (levelVariables.iconsColoring.colorsTable.filter((color) => color !== ''));
        const possibleMatches_colors = availableColorsInActiveTiles_arr.length - new Set(availableColorsInActiveTiles_arr).size;

        // 2. Test 'icons' match type
        const activeTileRefsArr = levelVariables.iconsColoring.colorsTable.reduce((acc, color, index) => (color !== '' && acc.push(index), acc), []);
        const availableIconsInActiveTiles_arr = activeTileRefsArr.map((tile_ref, ind) => document.querySelector(`.${mainStyles['tile_custom']}[data-tile-ref="${+tile_ref}"`).querySelector(`.${mainStyles['tile-back_custom']} svg`).classList[1]);
        const possibleMatches_icons = availableIconsInActiveTiles_arr.length - new Set(availableIconsInActiveTiles_arr).size;

        // 3. End game case, where there are no longer possible matches both for colors and icons
        if((possibleMatches_colors === 0 || possibleMatches_icons === 0) && levelVariables.iconsColoring.forceColorMatchType === false) {
            // Redefine levelVariables.iconsColoring.colorsTable for new color placements, run animation meanwhile and make ONLY color match possible for the rest of the level !!!
            
            levelVariables.iconsColoring.forceColorMatchType = true;
            const activeTileRefsArr = levelVariables.iconsColoring.colorsTable.reduce((acc, color, index) => (color !== '' && acc.push(index), acc), []);
            const possibleIconColors_copy = [...possibleIconColors];
            const pickedColorsArray = [];
            for(let i=0; i<(activeTileRefsArr.length / levelObject.uncover[stageNo]['count']); i++) {
                const rand = Math.floor(Math.random() * possibleIconColors_copy.length);
                pickedColorsArray.push(possibleIconColors_copy[rand], possibleIconColors_copy[rand]);
                possibleIconColors_copy.splice(rand, 1);
            }
            // Lastly let's modify the levelVariables.iconsColoring.colorsTable for once and for all !
            for(let tileNo = 0; tileNo < activeTileRefsArr.length; tileNo++) {
                const rand = Math.floor(Math.random() * pickedColorsArray.length);
                levelVariables.iconsColoring.colorsTable[+activeTileRefsArr[tileNo]] = pickedColorsArray[rand];
                pickedColorsArray.splice(rand, 1);
            }

            // Now we have recovered the gameplay, so each future match call will be for COLORS until the level finish
            runIconColorResetMessage();
        }

        // 4. Now set a randomizing scenario based on gotten values
        const newScenarioRandNum = Math.floor(Math.random() * (possibleMatches_colors + possibleMatches_icons));
        levelVariables.matchTypeHistory.push(newScenarioRandNum >= possibleMatches_colors? 'icons' : 'colors');
        if(levelVariables.iconsColoring.forceColorMatchType === true) {
            levelVariables.matchTypeHistory[levelVariables.matchTypeHistory.length - 2] = 'colors';
            levelVariables.matchTypeHistory[levelVariables.matchTypeHistory.length - 1] = 'colors';
        } 
        
        animateMachTypeChange();
    }

    async function animateMachTypeChange() {
        const matchInfoBoxes = document.querySelectorAll(`.${firstPlanStyles['match-info-box']}`); 
            
        await anime({
            targets: matchInfoBoxes,
            duration: 450,
            opacity: 0,
            easing: 'linear',
        }).finished;

        document.querySelector(`.${firstPlanStyles['mii-1']}`).dataset['match_type'] = `${levelVariables.matchTypeHistory[levelVariables.matchTypeHistory.length - 2]}_type`;
        document.querySelector(`.${firstPlanStyles['mii-2']}`).dataset['match_type'] = `${levelVariables.matchTypeHistory[levelVariables.matchTypeHistory.length - 1]}_type`;
        document.querySelector(`.${firstPlanStyles['mid-1']}`).textContent = levelVariables.matchTypeHistory[levelVariables.matchTypeHistory.length - 2];
        document.querySelector(`.${firstPlanStyles['mid-2']}`).textContent = levelVariables.matchTypeHistory[levelVariables.matchTypeHistory.length - 1];
        
        await anime({
            targets: matchInfoBoxes,
            duration: 450,
            opacity: 1,
            easing: 'linear',
        }).finished;

    }

    if(isMatch) {
        anime({
            targets: cardsOpened_parentNodes,
            duration: 1300,
            backgroundColor: 'pink',
            easing: 'easeInExpo',
        })
    }
    else {
       //
    }
}

export {match};