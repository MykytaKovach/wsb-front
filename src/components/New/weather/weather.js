import React , {Component} from 'react'
import styles from './weather.module.css'
import axios from '../../../axios'
import Aux from '../../../hoc/auxilary'
import Icon from './Icon/icon'

class Weather extends Component{

    state={
        weather:undefined
    }
    componentDidMount(){
        
        axios.get(`https://kovach-proxy-wsb.herokuapp.com/weather?adress=${this.props.town}`)
        .then(res=>{
            this.setState({weather:res})
        })
        .catch(er=>console.log(er))
        
    }
   
    render(){
        
           
        let weatherBlock = this.state.weather?
            <div className={styles.Weather}>
                <div>
        <p className={styles.Town}>{this.props.town}</p>
            <p>Temperature:<br/><b>{this.state.weather.data.body.temperature} C</b></p></div>
            <div>
            <Icon icon={this.state.weather.data.body.icon}/>
        <p>{this.state.weather.data.body.icon.split('-').join(' ')}</p></div>
        

</div>:<p>Loading</p>

        
        
        return(
            <Aux>
                {weatherBlock}
            </Aux>
        )
    }
}

export default Weather