import React, { Fragment } from "react";
import styles from "../styles/landing.module.css";

function ConsentBox(props) {

    return(
        <Fragment>
            <label htmlFor="consent" className={styles["consent_container"]}>
                <input name="consent" title="consent" placeholder="" id={styles["consent_input"]} type="checkbox" onClick={() => props.setConsentAccepted(!props.isConsentAccepted)} />
                I have read and accept the <a className={styles['redirect-link']} target="_blank" href='https://github.com'> Terms and Conditions </a>
            </label>
        </Fragment>
    )
}

export default ConsentBox;