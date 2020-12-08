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
        links:undefined,
        meta:undefined,
        loading:true

    }
    componentDidMount(){
        
        Axios.get('https://kovach-db-wsb.herokuapp.com/public/api/trips')
        .then(res=>{
            this.setState(
                {
                    trips:res.data.data,
                    links:res.data.links,
                    meta:res.data.meta,
                    loading:false
                })
            
        }).catch(er=>console.log(er))
    }
    paginatehandler(url){
        url="https"+ url.slice(4)
        if (!url) return
        this.setState({loading:true})
        Axios.get(url)
        .then(res=>{
            this.setState(
                {
                trips:res.data.data,
                links:res.data.links,
                meta:res.data.meta,
                loading:false
            })
            
        }).catch(er=>console.log(er))

    }
    render(){
        let pagination=this.state.meta?this.state.meta.total>1?<div className={styles.Paginate}>
            <i className="fas fa-arrow-left" onClick={()=>this.paginatehandler(this.state.links.prev?this.state.links.prev:null)}></i> Page {this.state.meta.current_page} of {this.state.meta.last_page} <i className="fas fa-arrow-right" onClick={()=>this.paginatehandler(this.state.links.next?this.state.links.next:null)}></i>
            
        </div>:null:null
        let trips = this.state.trips?
        <div>
            {this.state.trips.map(trip=><Trip flight={trip} key={trip.id}/>)}
        </div>:null
        return(
            <Aux>
                 
             {this.state.loading?<Plane/>:null}
            <div className={styles.Home}>
            <p className={styles.Title}>Trips</p> 
            <div className={styles.Box}>
                {pagination}
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