import React from 'react'
import styles from './error.module.css'

const error = (props)=>{
    return(
        <div className={styles.Error}>{props.msg?<p>{props.msg}</p>:null}</div>
    )
}
export default error