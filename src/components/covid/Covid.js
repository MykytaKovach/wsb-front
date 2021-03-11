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
            let obj = {}
            let code = ''
            axios.get(`https://kovach-proxy-wsb.herokuapp.com/city?city=${country}`)
            .then(res=>{
                code = res.data.cities[0].country
                axios.get(`https://covid19-api.org/api/status/${code}`)
                .then(res=>{
                    obj={...res.data}
                    // console.log(`https://covid19-api.org/api/diff/${code}`)
                    // axios.get(`https://covid19-api.org/api/diff/${code.toLowerCase()}`)})
                    // .then(res=>{
                    //     console.log(res)
                    //     // obj={...obj,...res.data}
                    //  
                       setData(obj)
                     })
            })
            .catch(e=>console.log(e))
            
            
        }

        let datael=data.country?<div className={styles.Data}>
        <div className={styles.SingleData}>
                <div className={styles.Icon}><i className="fas fa-disease"></i></div>
                <div className={styles.Text}>
                    <p>
                        confirmed cases
                    </p>
                    <p>
                        {data.cases}
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
                        {data.deaths}
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
                        {data.recovered}
                    </p>
                </div>
            </div>
            <div className={styles.SingleData}>
                <div className={styles.Icon}><i className="fas fa-sort-down"></i></div>
                <div className={styles.Text}>
                    <p>
                        new cases
                    </p>
                    <p>
                        {data.new_cases}
                    </p>
                </div>
            </div>
            <div className={styles.SingleData}>
                <div className={styles.Icon}><i className="fas fa-sort-up"></i></div>
                <div className={styles.Text}>
                    <p>
                        new recovered
                    </p>
                    <p>
                        {data.new_recovered}
                    </p>
                </div>
            </div>
            <div className={styles.SingleData}>
                <div className={styles.Icon}><i className="fas fa-times"></i></div>
                <div className={styles.Text}>
                    <p>
                        new lethal cases
                    </p>
                    <p>
                        {data.new_deaths}
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
