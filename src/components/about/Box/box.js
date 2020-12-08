import React from 'react'
import styles from './box.module.css'

const box =(props)=>
    <div className={styles.Box}>
    <i className={props.icon}></i>
    <h3>{props.title}</h3>
    <p>{props.text}</p>
    
  </div>


export default box