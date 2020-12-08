import React , {Component} from 'react'
import styles from './Edit.module.css'
import Aux from '../../hoc/auxilary'
import Calendar from 'react-calendar'
import convert from '../../dateConverter'
import axios from '../../axios'
import Plane from '../loading/Plane'
import Offer from '../New/planeOffer/planeOffer'
import Weather from '../New/weather/weather'
import Error from './../../hoc/error/error'


class Edit extends Component {
    state={
        loading:false,
        to:"",
        from:"",
        dateStart:"",
        dateEnd:"",
        pickingdate:false,
        active:undefined,
        secondStage:false,
        flights:undefined,
        returnFlights:undefined,
        selectedReturnFlight:undefined,
        selectedFlight:undefined,
        error:false
    }


    componentDidMount(){
        this.setState({loading:true})
        axios.get(`https://kovach-db-wsb.herokuapp.com/public/api/trip/${this.props.match.params.tripId}`)
        
        .then(res=>{
            this.setState({loading:false,
            to:res.data.data.to.name,
            from:res.data.data.from.name,
            dateStart:new Date(res.data.data.dateStart),
            dateEnd:new Date(res.data.data.dateEnd),
            createdBy:res.data.data.createdBy,
            created_at:res.data.data.created_at,
            id:res.data.data.id,
            status:res.data.data.status})    
        })
    }
    errorHandler(msg){
        this.setState({error: msg,loading:false})
        setTimeout(()=>{
            this.setState({error:undefined})
        },3000)
    }


    proceedHandler(e){
        e.preventDefault();
        if(this.state.dateStart ==="") {
            return this.errorHandler('Please pick start date!')
        }
        if(this.state.dateEnd ==="") {
            return this.errorHandler('Please pick end date!')
        }
        if(this.state.dateStart-Date.now() <= 0) {
            console.log(this.state.dateStart - Date.now(),Date.now())
            return this.errorHandler('No past dates allowed!')
        }
        if(this.state.dateEnd-this.state.dateStart <= 0) {
            return this.errorHandler('Your trip can not end earlier than it would start')
        }


        this.setState({loading:true})
        axios.get(`https://kovach-proxy-wsb.herokuapp.com/city?city=${this.state.to}`)
        .then(res=>{
            if(res.data.message === "TypeError [ERR_UNESCAPED_CHARACTERS]: Request path contains unescaped characters"){
                return this.errorHandler('Please use only latin symbols')
            }
            if(res.data.error){
                return this.errorHandler(res.data.error)
            }
            this.setState({to:res.data.cities[0]})
            axios.get(`https://kovach-proxy-wsb.herokuapp.com/city?city=${this.state.from}`)
            .then(res=>{
                if(res.data.message === "TypeError [ERR_UNESCAPED_CHARACTERS]: Request path contains unescaped characters"){
                    return this.errorHandler('Please use only latin symbols')
                }
                if(res.data.error){
                    return this.errorHandler(res.data.error)
                }
                this.setState({from:res.data.cities[0]})
                
                axios.get(`https://kovach-proxy-wsb.herokuapp.com/getflight?orig=${this.state.from.code}&dest=${this.state.to.code}&date=${this.state.dateStart.getTime()}`)
                .then(res=>{
                    
                    if(res.data.code === "ClientError") {
                        this.setState({to:this.state.to.name,from:this.state.from.name})
                        return this.errorHandler('No flight for this direction')
                    }
                    this.setState({loading:false,secondStage:true,flights:res})
                }
                    ).catch(er=>{alert('No flight for this direction')
                    console.log(er)})
                })})
            .catch(er=>console.log(er))
    }


    pickingDateHandler(e){
        this.setState({pickingdate:true,active:e.target.placeholder})
        
    }


    dateChangedHandler(date){
        if (this.state.active === "start of journey")return this.setState({dateStart:date,pickingdate:false})
            this.setState({dateEnd:date,pickingdate:false})
    }


    selectedReturnFlightHandler(th){
        this.setState({selectedReturnFlight:th})
    }

    
    selectedFlightHandler(th){
        this.setState({selectedFlight:th,loading:true})
        axios.get(`https://kovach-proxy-wsb.herokuapp.com/getflight?orig=${this.state.to.code}&dest=${this.state.from.code}&date=${this.state.dateEnd.getTime()}`)
        .then(res=>{
            if(res.data.code === "ClientError") {
                return this.setState({loading:false,error:'No flight for this direction'})
                
            }
            this.setState({returnFlights:res,loading:false})
        }).catch(er=>console.log(er))

    }


    townProvidedHandler(e){
        if(e.target.placeholder ==="Origin")return this.setState({from:e.target.value})
        this.setState({to:e.target.value})
    }

    createTripHandler(){
        this.setState({loading:true})
        axios.put('https://kovach-db-wsb.herokuapp.com/public/api/trip',
        {
            id:""+this.state.id,
            to:this.state.to,
            from:this.state.from,
            dateStart:this.state.dateStart,
            dateEnd:this.state.dateEnd,
            selectedReturnFlight:this.state.selectedReturnFlight,
            selectedFlight:this.state.selectedFlight,
            status:this.state.status,
            createdBy:"Mykyta Kovach"

        })
    .then(res=>{this.setState({loading:false})
    this.props.history.push(`/trip/${this.state.id}`)
    
    })
        .catch(er=>console.log(er))
    }

    
    render(){


        let form = <form className={styles.Form} onSubmit={(e)=>this.proceedHandler(e)} style={{
            transform: this.state.secondStage?'translateX(-102vw)':'translateX(0)',
            position: this.state.secondStage?'absolute':'relative'
                
        }}>
            <div className={styles.Inputs}>
            <input type="text" placeholder="Origin" required value={typeof(this.state.to) === 'object'?this.state.to.name:this.state.to} onChange={(e)=>this.townProvidedHandler(e)}/>
            <i className="fas fa-plane-departure"></i>
            <input type="text" placeholder="Destination" required value={typeof(this.state.from) === 'object'?this.state.from.name:this.state.from} onChange={(e)=>this.townProvidedHandler(e)}/>
            </div>
            <div className={styles.Inputs}>
            <input type="text" placeholder="start of journey" readOnly value={this.state.dateStart?convert(this.state.dateStart):""} onClick={(e)=>this.pickingDateHandler(e)}/>
            <i className="fas fa-calendar-alt"></i>
            <input type="text" placeholder="end of journey"readOnly value={this.state.dateEnd?convert(this.state.dateEnd):"" } onClick={(e)=>this.pickingDateHandler(e)}/>
            </div>
            
           {this.state.pickingdate?
            <Calendar onChange={(date)=>this.dateChangedHandler(date)}  />:null}
            
            <button type="submit" className={"btn btn-primary " +styles.Button}>Search Flights</button>
            </form>
        let Flights= this.state.flights?<div className={styles.Form}style={{
            transform: this.state.secondStage?'translateX(0)':'translateX(102vw)',
            position: this.state.secondStage?'relative':'absolute',
                
        }} >
            <div className={styles.Weather}>
            <Weather town={this.state.from.name}/>
            <Weather town={this.state.to.name}/>
            </div>
            {this.state.returnFlights?<Aux>
                
                <p className={styles.Paragraph}>Your that way flight:</p>
                <Offer  singleFlight={this.state.selectedFlight} key={this.state.selectedFlight.id} selected={true} onClick={()=>console.log()}/>
                {!this.state.selectedReturnFlight?<Aux><p className={styles.Paragraph}>Please select your return flight:</p>
                {this.state.returnFlights.data.map(flight=><Offer singleFlight={flight} key={flight.id} selected={this.state.selectedReturnFlight? this.state.selectedReturnFlight.id === flight.id:false} onClick={()=>this.selectedReturnFlightHandler(flight)}/>)}
                </Aux>:<Aux>
                    <p className={styles.Paragraph}>Your Return Flight:</p>
                    <Offer  singleFlight={this.state.selectedReturnFlight} key={this.state.selectedReturnFlight.id} selected={true} onClick={()=>console.log()}/>
                    <button type="submit" className={"btn btn-primary " +styles.Button} onClick={()=>this.createTripHandler()}>Edit Trip</button>
                </Aux>}
            </Aux>:<Aux>
            <p className={styles.Paragraph}>Please select your Flight:</p>
        {this.state.flights.data.map(flight=><Offer singleFlight={flight} key={flight.id} selected={this.state.selectedFlight? this.state.selectedFlight.id === flight.id:false} onClick={()=>this.selectedFlightHandler(flight)}/>)}
            </Aux>}</div>:null
        return(
            <Aux>
                {this.state.loading? <Plane/> : null}
                {<Error msg = {this.state.error} style={{height: this.state.error? 'auto':"0px",transition:'1s'}}/>}
                <div className={styles.Forms}>
                <p className={styles.Title}>Edit trip</p>    
                {form}
                {Flights}
                </div>
            </Aux>
        )
    }
}

export default Edit