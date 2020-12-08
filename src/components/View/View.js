import React,{Component} from 'react'
import styles from './View.module.css'
import Convert from '../../fulldate'
import {NavLink} from 'react-router-dom'
import Aux from '../../hoc/auxilary'
import Weather from '../New/weather/weather'
import Offer from '../New/planeOffer/planeOffer'
import Plane from '../loading/Plane'
import axios from '../../axios'
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
        status:undefined

    }

    componentDidMount(){
        
        axios.get(`https://kovach-db-wsb.herokuapp.com/public/api/trip/${this.props.match.params.tripId}`)
        .then(res=>{
            this.setState({loading:false,
            to:res.data.data.to,
            from:res.data.data.from,
            dateStart:res.data.data.dateStart,
            dateEnd:res.data.data.dateEnd,
            selectedFlight:res.data.data.selectedFlight,
            selectedReturnFlight:res.data.data.selectedReturnFlight,
            createdBy:res.data.data.createdBy,
            created_at:res.data.data.created_at,
            id:res.data.data.id,
            status:res.data.data.status})    
        })
        .catch(er=>console.log(er))
        
    }
    deleteHandler(){
        this.setState({loading:true})
        axios.delete(`https://kovach-db-wsb.herokuapp.com/public/api/trip/${this.state.id}`)
        .then(()=>{
            this.setState({loading:false})
            this.props.history.push('/')})
    }

    manageStatusHandler(e){
        e.persist()
        this.setState({loading:true})
        axios.put(`https://kovach-db-wsb.herokuapp.com/public/api/trip`,{
            id:""+this.state.id,
            to:this.state.to,
            from:this.state.from,
            dateStart:this.state.dateStart,
            dateEnd:this.state.dateEnd,
            selectedReturnFlight:this.state.selectedReturnFlight,
            selectedFlight:this.state.selectedFlight,
            status:e.target.innerHTML,
            createdBy:this.state.createdBy,
            created_at:this.state.created_at
        }).then((res)=>{

            this.setState({status:res.data.data.status,loading:false})
        })
    }
    render(){
        let status = this.state.status==="Accept"? <div className={styles.Status}><i className="far fa-check-circle" style={{color:'green'}}></i> <p>Congratualtion your trip was accepted</p></div>
    :this.state.status==="undefined"? null
    :<div className={styles.Status}><i className="far fa-times-circle" style={{color:'red'}}></i> <p> We are sorry, your trip was rejected</p></div>
        let Flights =this.state.to?<Aux>

    <div className={styles.Form}>
        <p className={styles.Name}>Created by: <b>{this.state.createdBy}</b><br/> <b>At:</b>  {Convert(new Date(this.state.created_at))}</p>
    <div className={styles.Weather}>
            <Weather town={this.state.from.name}/>
            <Weather town={this.state.to.name}/>
            </div>
            <p className={styles.Status}>Your that way flight:</p>
            <Offer  singleFlight={this.state.selectedFlight} key={this.state.selectedFlight.id} selected={true} onClick={()=>console.log()}/>
            <p className={styles.Status}>Your Return Flight:</p>
            <Offer  singleFlight={this.state.selectedReturnFlight} key={this.state.selectedReturnFlight.id} selected={true} onClick={()=>console.log()}/>
            {status}
            {this.state.status !== "undefined"?null:
            <div style={{width:'100%'}}><button type="submit" className={"btn btn-primary " +styles.Accept} onClick={(e)=>this.manageStatusHandler(e) }>Accept</button>
            <button type="submit" className={"btn btn-primary " +styles.Reject} onClick={(e)=>this.manageStatusHandler(e)} >Reject</button></div>}
            {this.state.status==="undefined"?<NavLink to={`/edit/${this.state.id}`} style={{width:"100%"}}><button type="submit" className={"btn btn-primary " +styles.Button}>Edit</button></NavLink>:null}
            <button type="submit" className={"btn btn-primary "+ styles.Reject+" " +styles.Delete } onClick={(e)=>this.deleteHandler(e)}>Delete</button>
            </div></Aux>:null
        return(
            <Aux>
            {this.state.loading? <Plane/> : null}
            
            <div className={styles.Forms}>
            <p className={styles.Title}>Your Trip </p>
                
                    
                    {Flights}
                    
        

            </div>
            

            
        </Aux>
        )
    }
}

export default View