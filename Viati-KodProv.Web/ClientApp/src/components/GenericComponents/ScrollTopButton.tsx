import React from 'react'
import styles from './ScrollTopButton.module.scss'

const ScrollTopButton: React.FunctionComponent = () => {

    return <div
        className={styles.scrollTopButton}
        onClick={() => {
            var body = document.querySelector('html body');
            body && body.scrollIntoView({ behavior: 'smooth' })
        }
        }>
        <div></div>
        <div></div>
    </div>
}

export default ScrollTopButton;