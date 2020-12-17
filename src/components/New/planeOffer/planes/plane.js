import React from 'react'
import styles from  './plane.module.css'
import fullDate from '../../../../fulldate'

const flight =(props)=>{
    return(
        <div className={styles.Box}>
            
            <div>
            <i className="fas fa-plane-departure"></i>
            <div><p>{props.segment.departure.iataCode}<br/>
            <span className={styles.Date}>
            {fullDate(props.segment.departure.at)}</span></p></div>
            </div>
            <div>
            <i className="fas fa-plane-arrival"></i>
            <div><p>{props.segment.arrival.iataCode}<br/>
            <span className={styles.Date}>{fullDate(props.segment.arrival.at)}</span></p></div>
            </div>
            
                


        </div>
    )
}

export default flight