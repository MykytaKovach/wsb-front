import React from 'react'
import styles from './planeOffer.module.css'
import Flight from './planes/plane'


const offer = (props)=>{

    let segments = <ul>
        {props.singleFlight.itineraries[0].segments.map(segment=>{
            
         return <li key={segment.number}><Flight segment={segment} /></li>})}
    </ul>
    let overal = <div> <p><b>Total price:</b> {props.singleFlight.price.total} &#8364;</p></div>
    return(<div className={styles.Box} onClick={props.onClick} style={{background: props.selected? 'rgb(109,219,155,0.5)':'rgb(77,190,223,0.5)'}}>
        
        {segments}
        {overal}
        
    </div>
    )
}

export default offer