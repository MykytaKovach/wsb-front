import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationTag from './locationTag'
import { useState} from 'react'

const Map = ({origin,destination,closeMap,dateStart,dateEnd}) => {
    const [info, setInfo] = useState(null)
   
       const markers = origin?destination? 
        [<LocationMarker 
            key={Math.random()*100000}
            lat={origin.latitude} 
            lng={origin.longitude}
            type="origin"
            click={()=>setInfo({...origin,date:dateStart})}/>,
            <LocationMarker 
            click={()=>setInfo({...destination,date:dateEnd})}
            key={Math.random()*100000}
            lat={destination.latitude} 
            lng={destination.longitude}
            type="destination"/>]
            :null:null
           const  center = origin? {
                lat:origin.latitude,
                lng:origin.longitude
            }:null
 
    
   
            let map = <GoogleMapReact
            bootstrapURLKeys={{key:
                'AIzaSyA_eO3J_VITl8xED2ryuLZQB_nznOT9V9A'
                }}
                defaultCenter={{lat:52.237049,lng: 21.017532}}
                center={center}
                defaultZoom={6}
        >
            {markers}
        </GoogleMapReact>
    return (
        <div className="map">
            {map}
            <p className="closeMap" onClick={closeMap}>Close Map</p>
 {info? <LocationTag info={info}/>:null}
        </div>
    )
    
}


export default Map
