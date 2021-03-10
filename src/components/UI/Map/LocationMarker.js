const LocationMarker = ({lat, lng, click,type}) => {
    return (
        <div className="location-marker" onClick={click}>
            {type === 'origin'?<i className="fas fa-plane-departure location-icon"></i>:<i className="fas fa-plane-arrival location-icon"></i>}
            
            
        </div>
    )
}

export default LocationMarker
