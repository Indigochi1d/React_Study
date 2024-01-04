import React from 'react';
import styles from './css/Counter.module.css'
const Counter = ({number,onIncrease,onDecrease}) => {
    return (
        <div>
            <h1>Counter!!</h1>
            <h1>{number}</h1>
            <div className={styles.btns}>
                <button className={styles.btn} onClick={onIncrease}>+1</button>
                <button className={styles.btn} onClick={onDecrease}>-1</button>
            </div>
        </div>
    );
};

export default Counter;