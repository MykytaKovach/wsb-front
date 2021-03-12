import React,{Component} from 'react'
import styles from './View.module.css'
import Convert from '../../fulldate'
import {NavLink} from 'react-router-dom'
import Aux from '../../hoc/auxilary'
import Weather from '../New/weather/weather'
import Offer from '../New/planeOffer/planeOffer'
import Plane from '../loading/Plane'
import axios from '../../axios'
import City from '../UI/city/City'
import RegionMap from '../UI/Map/RegionMap'
import last from '../../last'
class View extends Component{
    state={
        id:undefined,
        loading:true,
        to:undefined,
        from:undefined,
        dateStart:"",
        dateEnd:"",
        selectedReturnFlight:undefined,
        selectedFlight:undefined,
        createdBy:undefined,
        created_at:undefined,
        status:undefined,
        role:'',
        showMap:false

    }
    

    componentDidMount(){
        console.log(this.props.match.params)
         this.setState({role:JSON.parse(localStorage.getItem('user')).role})
        console.log(this.state.role)
        axios.get(`https://wsb-backend.herokuapp.com/trip/${this.props.match.params.tripId}`,{headers:{
            'Authorization': 'Bearer ' +localStorage.getItem("token")
        }})
        .then(res=>{
            this.setState({loading:false,
            to:res.data.to,
            from:res.data.from,
            dateStart:res.data.dateStart,
            dateEnd:res.data.dateEnd,
            selectedFlight:res.data.selectedFlight,
            selectedReturnFlight:res.data.selectedReturnFlight,
            createdBy:res.data.createdBy,
            created_at:res.data.createdAt,
            id:res.data._id,
            status:res.data.status}) 

        })
        .catch(er=>console.log(er))
        
    }
    deleteHandler(){
        this.setState({loading:true})
        axios.delete(`https://wsb-backend.herokuapp.com/trip/${this.state.id}`,{headers:{
            'Authorization': 'Bearer ' +localStorage.getItem("token")
        }})
        .then(()=>{
            this.setState({loading:false})
            this.props.history.push('/')})
    }

    showMapHandler(){
        this.setState({showMap:true})
    }
    closeMapHandler(){
        this.setState({showMap:false})
    }
    manageStatusHandler(e){
        e.persist()
        this.setState({loading:true})
        axios.patch(`https://wsb-backend.herokuapp.com/trip/${this.state.id}`,{
            status:e.target.innerHTML
        },{headers:{
            'Authorization': 'Bearer ' +localStorage.getItem("token")
        }}).then((res)=>{

            this.setState({status:res.data.status,loading:false})
        })
    }
    
    render(){
        let form =null;
        if(this.state.status === "undefined"&&this.state.role==="owner"){
            form = <Aux><div style={{width:'100%'}}><button type="submit" className={"btn btn-primary " +styles.Accept} onClick={(e)=>this.manageStatusHandler(e) }>Accept</button>
            <button type="submit" className={"btn btn-primary " +styles.Reject} onClick={(e)=>this.manageStatusHandler(e)} >Reject</button></div></Aux>
        } else if(this.state.status === "undefined"&& this.state.role!=="owner" ){
            form=<NavLink to={`/edit/${this.state.id}`} style={{width:"100%"}}><button type="submit" className={"btn btn-primary " +styles.Button}>Edit</button></NavLink>
        } else form = null
        let status = this.state.status==="Accept"? <div className={styles.Status}><i className="far fa-check-circle" style={{color:'green'}}></i> <p>Congratualtion your trip was accepted</p></div>
    :this.state.status==="undefined"? null
    :<div className={styles.Status}><i className="far fa-times-circle" style={{color:'red'}}></i> <p> We are sorry, your trip was rejected</p></div>
        let Flights =this.state.to?<Aux>

    <div className={styles.Form}>
        <p className={styles.Name}>Created by: <b>{`${this.state.createdBy.firstName.charAt(0).toUpperCase() + this.state.createdBy.firstName.slice(1)} ${this.state.createdBy.lastName.charAt(0).toUpperCase()+this.state.createdBy.lastName.slice(1)}`} </b><br/> <b>At:</b>  {Convert(new Date(this.state.created_at))}</p>
    <div className={styles.Weather}>
            <Weather town={this.state.from.name}/>
            <Weather town={this.state.to.name}/>
            </div>
            <p className={styles.Status}>Your that way flight:</p>
            <Offer  singleFlight={this.state.selectedFlight} key={this.state.selectedFlight.id} selected={true} onClick={()=>console.log()}/>
            <p className={styles.Status}>Your Return Flight:</p>
            <Offer  singleFlight={this.state.selectedReturnFlight} key={this.state.selectedReturnFlight.id} selected={true} onClick={()=>console.log()}/>
            <button type="submit" className={"btn btn-primary " +styles.Button} onClick ={()=>this.showMapHandler()}>See on map</button>
            {status}
           {form}
            <button type="submit" className={"btn btn-primary "+ styles.Reject+" " +styles.Delete } onClick={(e)=>this.deleteHandler(e)}>Delete</button>
            </div></Aux>:null
        return(
            <Aux>
            
            {this.state.loading? <Plane/> : null}
            
            <div className={styles.Forms}>
            {this.state.showMap?<RegionMap 
                                originDate={this.state.selectedFlight.itineraries[0].segments[0].departure.at} 
                                destinationDate={last(this.state.selectedFlight.itineraries[0].segments).arrival.at} 
                                to={this.state.to} from={this.state.from} 
                                click={()=>this.closeMapHandler()}/>:null}
            <p className={styles.Title}  style={{display:this.state.showMap?"none":"block"}}>Your Trip </p>
            <div style={{display:this.state.showMap?"none":"flex"}}>
            {this.state.from?<City town={this.state.from.name}/>:null}
                    {Flights}
            {this.state.to?<City town={this.state.to.name} />:null}
            </div>
            </div>
            
            

            
        </Aux>
        )
    }
}

export default View