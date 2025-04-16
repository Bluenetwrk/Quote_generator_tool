import React  from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import Footer from './Footer/Footer'
import useScreenSize from './SizeHook';
import HTMLReactParser from 'html-react-parser'

function Services() {
  const screenSize = useScreenSize();
    const [Services, setServices]= useState([])

   async function getServices(){
    await axios.get("/admin/getWebsiteDetails")
    .then((res)=>{
        // console.log(res.data)
        let result = res.data.result
        // console.log(result[0].AboutUs)
        setServices(result[0].Services)
    })
    }

    useEffect(()=>{
getServices()
    },[])

  return ( 
        <>
        <div style={{marginLeft:"10px"}}>
        <h2 style={{marginLeft:"1px", fontWeight:"800", marginTop:"5px"}}> Our Services</h2>

    <div style={{width:"93%"}}> {HTMLReactParser(Services.toString())} </div>
       
    {/* <div> {Services} </div> */}
        
        </div>
        {screenSize.width > 750 ?""
        :
        <Footer/>   
}

    </>


  )
}

export default Services

