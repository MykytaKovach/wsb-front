import React from 'react'
import {useState,useEffect} from 'react'
import styles from './Carousel.module.css'
import Dashed from '../../UI/dashedBox'
import img1 from '../../../assets/img/carousel/car1.jpg'
import img2 from '../../../assets/img/carousel/car2.jpg'
import img3 from '../../../assets/img/carousel/car3.jpg'
import img4 from '../../../assets/img/carousel/car4.jpg'
import img5 from '../../../assets/img/carousel/car5.jpg'

const Carousel = () => {
    const [imgarr,setImgs]=useState([img1,img2,img3,img4,img5])
    const [arrToRender,setArrToRender]=useState([{
        img:imgarr[0],
        size:"300px",
        background:false
    },{
        img:imgarr[1],
        size:"200px",
        background:true
    },{
        img:imgarr[2],
        size:"150px",
        background:true
    },{
        img:imgarr[3],
        size:"125px",
        background:true
    },{
        img:imgarr[4],
        size:"100px",
        background:true
    }])

    const setSettings=arr=>{
        setArrToRender( [{
            img:arr[0],
            size:"50%",
            background:false
        },{
            img:arr[1],
            size:"30%",
            background:true
        },{
            img:arr[2],
            size:"25%",
            background:true
        },{
            img:arr[3],
            size:"20%",
            background:true
        },{
            img:arr[4],
            size:"18%",
            background:true
        }])
    }

const changeCarousel=(arr)=>{
    const copy = [...arr]
    const changedArr=[copy.pop(),...copy]
    setImgs(changedArr)
}
 
    useEffect(()=>{

        console.log('asd')
       setTimeout(()=>{
        changeCarousel(imgarr)
    },4000)},[imgarr])

    useEffect(()=>{
        setSettings(imgarr)
    },[imgarr])
    
    let carousel =<>
    <Dashed key='0' img={arrToRender[0].img} size={arrToRender[0].size} background={arrToRender[0].background}/> 
    <div className={styles.Carousel}>
        {arrToRender.map((img,index)=>index?<Dashed key={index} img={img.img} size={img.size} background={img.background}/>:null)}
        </div></>
    
    //<Dashed img={imgs[1].img} size={imgs[1].size} background={imgs[1].background}/>
    return (
        <div className={styles.Container}>
            {carousel}
        </div>
            
        
    )
}

export default React.memo(Carousel)
