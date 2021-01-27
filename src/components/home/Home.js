import React ,{Component}from 'react'
import Axios from '../../axios'
import styles from './Home.module.css'
import Trip from './Trip/trip'
import {NavLink} from 'react-router-dom'
import Plane from '../loading/Plane'
import Aux from '../../hoc/auxilary'

class Home extends Component {
    //puste danne 
    state={
        trips:undefined,
        loading:true

    }
    componentDidMount(){
        
        Axios.get('https://wsb-backend.herokuapp.com/trips',{
            headers:{
                'Authorization': 'Bearer ' +localStorage.getItem("token")
            }
        })
        .then(res=>{
            console.log(res.data)
            console.log(res.data.length?'+':"-")

            this.setState(
                {
                    trips:res.data.reverse(),
                    loading:false
                })
            
        }).catch(er=>console.log(er))
    }

    render(){
        
        let trips = this.state.trips?
        <div>
            {this.state.trips.map(trip=>
            <Trip flight={trip} key={trip.dateStart}/>)}
        </div>:null
        let text = this.state.trips&&this.state.trips.length?"Your Trips":"You dont have any trips yet"
        let box = this.state.trips&&this.state.trips.length?<div className={styles.Box}>
        <hr/>
    {trips}
    </div>:null
        
        return(
            <Aux>
                 
             {this.state.loading?<Plane/>:null}
            <div className={styles.Home}>
        <p className={styles.Title}>{text}</p> 
            {box}
            <NavLink to="/new"><div className={styles.Button}><i className="fas fa-plus"></i></div></NavLink>
            </div>
            </Aux>
        )
    }
}

export default Home