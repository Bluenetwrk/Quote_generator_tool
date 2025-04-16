import React  from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import Footer from './Footer/Footer'
import useScreenSize from './SizeHook';
import HTMLReactParser from 'html-react-parser'


function Contact() {
  const [Contact, setContact]= useState([])
  const screenSize = useScreenSize();

   async function getContact(){
    await axios.get("/admin/getWebsiteDetails")
    .then((res)=>{
        let result = res.data.result
        // console.log(result[0].AboutUs)
        setContact(result[0].Contact)
    })
    }

    useEffect(()=>{
getContact()
    },[])

  return (
    
    <>

        <div style={{marginLeft:"10px"}}>
        <h2 style={{marginLeft:"1px", fontWeight:"800", marginTop:"5px"}}> Contact Us </h2>

        
    <div style={{width:"93%"}}> {HTMLReactParser(Contact.toString())} </div>


        </div>
        


        {screenSize.width > 750 ?
""
:

        <Footer/>   
}
    </>

  )
}

export default Contact

