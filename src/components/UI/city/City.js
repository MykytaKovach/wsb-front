import React,{useEffect,useState} from 'react'
import Box from '../dashedBox'
import Placeholder from '../../../assets/img/placeholder.png'
import axios from '../../../axios'

const City = ({town}) => {
    const [img,setImg] = useState(Placeholder)
    useEffect(()=>{
        axios.get(`https://customsearch.googleapis.com/customsearch/v1?cx=b417aa46d494aec03&q=${town}&searchType=image&key=AIzaSyDdmO9RKsg4LCwqeJsz27yn_MFePGKAiF0`)
        .then(res=>setImg(res.data.items[0].link))
        .catch(err=>console.log(err))
    },[town])
    return (
        <Box img={img} size="350px"/>
    )
}

export default City
