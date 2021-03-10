import fulldate from '../../../fulldate'
const locationTag = ({info}) => {
    return (
        <div className="location-tag">
            <h2>{info.name}</h2>
            <ul>
            <li>Country: <strong>{info.country}</strong></li>
    <li>Date of departure/arival: <strong>{fulldate(info.date)}</strong></li>
            </ul>
        </div>
    )
}

export default locationTag
