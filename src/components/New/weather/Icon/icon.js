import React from 'react'
import styles from './icon.module.css'

const icon =(props)=>{

let icon = undefined;
switch(props.icon){
    case 'clear-day':
        icon = <i className={styles.Icon + ' far fa-sun'}></i>
        break;
    case 'clear-night':
            icon = <i className={styles.Icon + ' far fa-moon'}></i>
        break;
    case 'rain':
            icon = <i className={styles.Icon + ' fas fa-cloud-showers-heavy'}></i>
        break;
     case 'snow':
            icon = <i className={styles.Icon + ' far fa-snowflake'}></i>
        break;
    case 'sleet':
            icon = <i className={styles.Icon + ' fas fa-cloud-showers-heavy'}></i>
        break;
    case 'wind':
            icon = <i className={styles.Icon + ' fas fa-wind'}></i>
         break;
    case 'fog':
             icon = <i className={styles.Icon + ' fas fa-smog'}></i>
    break;
    case 'cloudy':
            icon = <i className={styles.Icon + ' fas fa-cloud'}></i>
    break;
    case 'partly-cloudy-day':
            icon = <i className={styles.Icon + ' fas fa-cloud-sun'}></i>
    break;
    case 'partly-cloudy-night':
            icon = <i className={styles.Icon + ' fas fa-cloud-moon'}></i>
    break;
    default:
            icon = <i className={styles.Icon + ' fas fa-cloud'}></i>
    

}

return icon;

}


export default icon