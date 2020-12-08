import React ,{Component}from 'react'
import styles from './About.module.css'
import Aux from '../../hoc/auxilary'
import Box from './Box/box'

class About extends Component {
    state={
        name:'about'
    }
    render(){
        return(
            <Aux>
        <div className={styles.ShowCase}>
      <div className='container'>
        <h1>Tool, everyone can use</h1>
        <p>This application is not only for business trips.Everyone can use it for their travel needs.</p>
      </div>
    </div>
 <div className={styles.Boxes  +' container'}>
      
       <Box icon={`fas fa-calendar-alt`} 
        title="Plan your trips"
        text="See further.Plan your trips effectively now."/>
        <Box icon={`fas fa-search`} 
        title="Search For Flights"
        text="Using our app you will automaticaly see available flights with prices"/>
        <Box icon={`fas fa-check-circle`} 
        title="Get them confirmed"
        text="You dont need to fill papers and carry them to your boss.Just add trip and he will see it form his account."/>
        
      </div>
    
    </Aux>
        )
        
    }
}

export default About