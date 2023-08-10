import React, {useState, useEffect} from "react";
import styles from "../styles/player_stats.module.css";
import player_stats_pages from "../global/player_stats_pages";
import * as Animation from 'animejs';
import {pages_titles} from "../global/player_stats_pages";
import barStyles from '../styles/player_stats.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretLeft as arrow_left,
    faCaretRight as arrow_right,
} from '@fortawesome/free-solid-svg-icons';
import { getLevelsCount } from "../global/predefined/exp_to_level";

let isAnimationRunning = false;

function PlayerStats(props) {

    const anime = Animation.default;
    const [[pageNo, pageMaxIndex, prevPageNo], setPageNo] = useState([0, 2, 0]);

    async function handleStatsChange(newPageNo) {
        if(isAnimationRunning) { return; }
        isAnimationRunning = true;
        const allProgressBars = document.querySelectorAll(`.${barStyles['stats-item']}`);
        await anime({
            targets: allProgressBars,
            translateY: {value: '20%', delay: anime.stagger(90), duration: 150, easing: 'linear'},
            opacity: {value: 0, delay: anime.stagger(90), duration: 150, easing: 'linear'}
        }).finished;
        setPageNo([newPageNo, pageMaxIndex, pageNo]);
    }

    useEffect(() => {
        progressBarShowUp();
    }, [pageNo])

    async function progressBarShowUp() {
        const allProgressBars = document.querySelectorAll(`.${barStyles['stats-item']}`);
        await anime({
            targets: allProgressBars,
            translateY: {value: '0%', duration: 0, easing: 'linear'},
            opacity: {value: 1, duration: 150, delay: anime.stagger(90), easing: 'linear'},
        }).finished;
        isAnimationRunning = false;
    }

    const pagesLimit = pageMaxIndex + 1;
    const statsRows = Array.from(new Array(pagesLimit)).map((el, ind) => {
        const [userStat, gameStat] = connectObj(props.levelsCount, player_stats_pages[pageNo][ind].connect_name);
        const getPercentageValue = Math.floor((100 / (gameStat || 1 /* AVOIDING POSSIBLE DIVISION BY 0 */)) * userStat);
        return(
            <div key={ind.toString()} className={styles['stats-item']}> 
                <div className={styles['stats-item-box']}> 
                    <p className={styles['item-box__text']}> {player_stats_pages[pageNo][ind].stat_name}: </p>
                </div>
                <div className={styles['stats-item-box']}> 
                    <div className={styles['item-box__bar--outer']}>
                        <div className={styles['item-box__bar-text']}> {(getPercentageValue > 100)? 100 : getPercentageValue}% </div>
                        <div className={`${styles['item-box__bar--inner']} ${styles[player_stats_pages[pageNo][ind].color_bar_class]}`} style={{'width': `${getPercentageValue}%`}} >  </div>
                    </div>
                </div>
                <div className={styles['stats-item-box']}> 
                    <p className={styles['item-box__text']}> {userStat} / {gameStat} </p>
                </div>
            </div>
        );
    })

    return (
        <div className={styles['box__user-stats']}> 
            <div className={`${styles["user-stats__switch-btn"]} ${styles["switch-btn-left"]}`} onClick={() => {handleStatsChange((pageNo > 0)? pageNo - 1 : pageMaxIndex);}}> 
                <FontAwesomeIcon icon={arrow_left} className={`${styles["icon-arrow"]} ${styles["icon-arrow-left"]}`} />
            </div>
            <div className={styles['user-stats__stats-table']}> 
                <div className={styles['user-stats__stats-title-box']}>
                    <p className={styles['user-stats__stats-title']}> {pages_titles[pageNo]} </p>
                </div>
                <div className={styles['stats-table']}>
                    {statsRows}
                </div>
            </div>
            <div className={`${styles["user-stats__switch-btn"]} ${styles["switch-btn-right"]}`} onClick={() => {handleStatsChange((pageNo !== pageMaxIndex)? pageNo + 1 : 0);}}> 
                <FontAwesomeIcon icon={arrow_right} className={`${styles["icon-arrow"]} ${styles["icon-arrow-right"]}`} />
            </div>
        </div>
    )
}

function connectObj(obj, connect) { // WE WILL INVOKE THIS FUNCTION LIKE THAT:  connectObj(props.levelsCount) - below connector variable assumes that;

    const connector = {
        'main-exp':  [obj.user_exp, getLevelsCount()],
        'main-stars': [obj.user_stars, +obj.levelsAmount['inGame'] * 3],
        'main-levels': [obj.levelsAmount['userWin'], obj.levelsAmount['inGame']],
        'diff-easy': [obj.user_completed['easy'], obj.all['easy']],
        'diff-medium': [obj.user_completed['medium'], obj.all['medium']],
        'diff-hard': [obj.user_completed['hard'], obj.all['hard']],
        'diff-insane': [obj.user_completed['insane'], obj.all['insane']],
        'diff-extreme': [obj.user_completed['extreme'], obj.all['extreme']],
        'diff-legend': [obj.user_completed['legend'], obj.all['legend']],
    }

    return testConnectValues(connector[connect]);
}

function testConnectValues([val1, val2]) {
    // This function is only used to replace undefined / null values with 0
    return [val1 || 0, val2 || 0];
}

export default PlayerStats;