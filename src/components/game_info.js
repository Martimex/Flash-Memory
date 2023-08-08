import styles_global from '../global/global_styles.module.css';

let styles_main = '';

function GameInfo(props) {
    async function loadItemsStyling() {
        if(props.newSerie && props.level) {
            styles_main = await import(`../levels/${props.newSerie}/level_${props.level}/styles/main.module.css`) 
        }
    }
    
    loadItemsStyling();

    return (
        <div className={`${styles_global['game-details']}`}>
            <div className={`${styles_main && styles_main[`gd-level_custom`]} ${styles_global['details-item']}`}> Level: {props.level}</div>  
            {(props.moves >= -1) &&  (<div className={`${styles_main && styles_main[`gd-turns_custom`]} ${styles_global['details-item']}`}> Turns: {parseInt(props.moves)} </div>) }
            {(props.time >= -1) &&  (<div className={`${styles_main && styles_main[`gd-time_custom`]} ${styles_global['details-item']}`}> Time:  {parseInt(props.time)} s </div>) }
            <div className={`${styles_main && styles_main[`gd-score_custom`]} ${styles_global['details-item']}`}> Score: {props.score} </div>
        </div>
    )
}

export default GameInfo;