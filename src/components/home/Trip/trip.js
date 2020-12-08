import React from 'react'
import styles from './trip.module.css'
import Convert from '../../../dateConverter'
import {NavLink} from 'react-router-dom'


const trip=(props)=>{
    
    let start = new Date(props.flight.dateStart)
    let end = new Date(props.flight.dateEnd)
    let duration = new Date (start.getTime() - end.getTime())
    let status = props.flight.status==="Accept"? <i className="far fa-check-circle" style={{color:'green'}}></i>
    :props.flight.status==="undefined"? <i className="far fa-question-circle" style={{color:'grey'}}></i>
    :<i className="far fa-times-circle" style={{color:'red'}}></i>
        
    return(
        <div className={styles.Trip}>
            <p className={styles.Name}><b>{props.flight.createdBy}</b> - {Convert(new Date(props.flight.created_at))}</p>
            <div className={styles.Flights}>
            <div className={styles.Dates}>
            <div>
                
                <p className={styles.Date}>{Convert(new Date(props.flight.dateStart))}</p>
                <div className={styles.OneWay}>
                <p>{props.flight.from.name}</p>
             <i className="fas fa-arrow-right"></i>
                 <p>{props.flight.to.name}</p> 
            </div>
                </div>

                <div>
                <p className={styles.Date}>{Convert(new Date(props.flight.dateEnd))}</p>
                <div className={styles.OneWay}>
                <p>{props.flight.to.name}</p>
             <i className="fas fa-arrow-right"></i>
                 <p>{props.flight.from.name}</p> 
            </div>
                </div>
                </div>
                <div className={styles.Sum}>
                <div style={{textAlign:'start'}}>
                <p><b>Total price:</b> {(+props.flight.selectedFlight.offerItems[0].price.total + +props.flight.selectedReturnFlight.offerItems[0].price.total).toFixed(2)}&#8364;</p>
                 <p><b>Total trip duration:</b> {duration/86400000*-1 }</p>
                 </div>
                 <div style={{textAlign:'start'}}>
                <p className={styles.Paragraph}> Preview: <NavLink to={`/trip/${props.flight.id}`}><i className="far fa-eye" ></i></NavLink></p>
                 <p className={styles.Paragraph}>Status: {status}</p>
                 </div>
                 </div>
            
            </div>
            <hr/>
        </div>
    )
}

export default trip