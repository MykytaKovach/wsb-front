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
            this.setState(
                {
                    trips:res.data,
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
        return(
            <Aux>
                 
             {this.state.loading?<Plane/>:null}
            <div className={styles.Home}>
            <p className={styles.Title}>Trips</p> 
            <div className={styles.Box}>
                <hr/>
            {trips}
            </div>
            <NavLink to="/new"><div className={styles.Button}><i className="fas fa-plus"></i></div></NavLink>
            </div>
            </Aux>
        )
    }
}

export default Home