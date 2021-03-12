import styles from './Covid.module.css'
import {useState} from 'react'
import axios from '../../axios'

const Covid = () => {
    const [data,setData]=useState({})
    
    const [country,setCountry]=useState("")

        function changed(e){
            setCountry(e.target.value)
        }
        function getData(e){
            e.preventDefault()
            axios.get(`https://api.covid19api.com/total/country/${country}`)
            .then(res=>{
                console.log(res.data.pop())
                setData(res.data.pop())
            })
        }

        let datael=data.Confirmed?<div className={styles.Data}>
            <div className ={styles.Country}><h2>{data.Country}</h2></div>
        <div className={styles.SingleData}>
                <div className={styles.Icon}><i className="fas fa-disease"></i></div>
                <div className={styles.Text}>
                    <p>
                        confirmed cases
                    </p>
                    <p>
                        {data.Confirmed}
                    </p>
                </div>
            </div>
            <div className={styles.SingleData}>
                <div className={styles.Icon}><i className="fas fa-skull-crossbones"></i></div>
                <div className={styles.Text}>
                    <p>
                        lethal cases
                    </p>
                    <p>
                        {data.Deaths}
                    </p>
                </div>
            </div>
            <div className={styles.SingleData}>
                <div className={styles.Icon}><i className="fas fa-syringe"></i></div>
                <div className={styles.Text}>
                    <p>
                        recovered
                    </p>
                    <p>
                        {data.Recovered}
                    </p>
                </div>
            </div>
            <div className={styles.SingleData}>
                <div className={styles.Icon}><i className="fas fa-calendar-day"></i></div>
                <div className={styles.Text}>
                    <p>
                        Active cases
                    </p>
                    <p>
                        {data.Active}
                    </p>
                </div>
            </div>
        </div>:null
    return (
        <div className={styles.Covid}>
            <div className={styles.Content}>
                <h1>Coronavirus Alert</h1>
                <p>CONSIDERING ACTUAL SITUATION N THE WORLD IT IS IMPORTANT TO STAY SAFE WHILE TRAVELLING 
PLEASE CHECK YOUR DESTINATION ABD DECIDE IF ITS SAFE TO GO THERE</p>
                <h2>type in country of your destination</h2>
            <form>
                <input type="text" value={country} onChange={e=>changed(e)}/>
                <button onClick={e=>getData(e)}>CHECK</button>
            </form>
            {datael}
            </div>
        </div>
    )
}

export default Covid
