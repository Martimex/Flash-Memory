import React from "react";
import styles from "../styles/error_template.module.css";
import * as Animation from 'animejs';
import Router from "next/router";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faFile, faBug } from '@fortawesome/free-solid-svg-icons';

export default function ErrorTemplate(props) {

    const anime = Animation.default;

    async function fadeOut(errNo) {
        await anime({
            targets: `.${styles['error-bg']}`,
            duration: 450,
            opacity: [1, 0],
            easing: 'easeInSine',
        }).finished;

        if(errNo === 417) { props.closeError();}
        else Router.push('/'); 
    }

    function errCodesToIcon(errNo) {
        return (errNo === 500) && faDatabase || (errNo === 404) && faFile || (errNo === 417) && faBug;
    }

    return(
        <div className={styles['error-main']}>
            <div className={styles['error-bg']}>
                <div className={styles['error-icon']}>
                    <FontAwesomeIcon icon={errCodesToIcon(props.errNo)} className={styles['icon-user-error']}></FontAwesomeIcon>
                </div>
                <div className={styles['error-content-box']}>
                    <p className={styles['error-title']}> {props.errMessage} </p>
                    <span className={styles['error-message']}>
                        {props.errDesc}
                    </span>
                    {props.errNo === 417 && 
                        <div className={styles['error-stack-box']}>  
                            <span className={styles['error-stack-text']}> {props.errStack? props.errStack : ''} </span>
                        </div>
                    }
                    <div className={styles['error-return-block']} onClick={() => {fadeOut(props.errNo)}}>
                        <span className={styles['error-return-text']}>
                            Return 
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}