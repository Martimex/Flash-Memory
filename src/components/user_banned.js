import React, {useEffect} from "react";
import styles from "../styles/user_banned.module.css";
import Router from "next/router";
import * as Animation from 'animejs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';


function UserBanned(props) {

    const anime = Animation.default;

    useEffect(() => {
        anime({
            targets: `.${styles['banned-bg']}`,
            duration: 450,
            opacity: [0, 1],
            easing: 'easeOutSine',
        });
    }, [])

    async function fadeOut() {
        await anime({
            targets: `.${styles['banned-bg']}`,
            duration: 450,
            opacity: [1, 0],
            easing: 'easeInSine',
        }).finished;
        Router.push('/');
    }

    return(
        <div className={styles['banned-main']}>
            <div className={styles['banned-bg']}>
                <div className={styles['banned-icon']}>
                    <FontAwesomeIcon icon={faBan} className={styles['icon-user-banned']}></FontAwesomeIcon>
                </div>
                <div className={styles['banned-content-box']}>
                    <p className={styles['banned-title']}> Account suspended </p>
                    <span className={styles['banned-message']}>
                        {props.userName}, your recent behaviour violated the community guidelines of the Flash MG. 
                        Therefore, your account has been temporarily suspended. If you feel like the ban was set by
                        mistake or you want to ask for suspension removal, please contact me directly at: 
                    </span>
                    <span className={styles['banned-contact']}>
                        ____@gmail.com
                    </span>
                    <div className={styles['banned-return-block']} onClick={() => {fadeOut()}}>
                        <span className={styles['banned-return-text']}>
                            Return 
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBanned;