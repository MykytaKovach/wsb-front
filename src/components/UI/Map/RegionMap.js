import Map from './Map'
import {useState ,useEffect} from 'react'
import axios from 'axios'
import Loader from './Loader'

function RegionMap(props) {


  const[origin, setOrigin] = useState(null)
  const[destination, setDestination] = useState(null)
  const[loading, setLoading] = useState(true)

  useEffect(()=>{
    const getData = ()=>{
      setLoading(true)
      axios.get(`https://kovach-proxy-wsb.herokuapp.com/city?city=${props.from.name}`)
      .then(res=>{
        setOrigin(res.data.cities[0])
        setLoading(false)
      })
      .catch(e=>{
      console.log(e)
      setLoading(false)
      })
      axios.get(`https://kovach-proxy-wsb.herokuapp.com/city?city=${props.to.name}`)
      .then(res=>{
        setDestination(res.data.cities[0])
        setLoading(false)
      })
      .catch(e=>{
      console.log(e)
      setLoading(false)
      })
    }
    getData()
    
  },[props.to,props.from])


  return (
    <div className="map-container" >
  {!loading ? <Map origin={origin} 
                  destination={destination} 
                  closeMap={props.click}
                  dateStart={props.originDate}
                  dateEnd={props.destinationDate}/> : <Loader /> }
    
    </div>
  );
}

export default RegionMap;
