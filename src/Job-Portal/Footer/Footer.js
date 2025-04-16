import React from 'react'
import Styles from "./footer.module.css"
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Itwalkinlogo from "../img/ItwalkInLogo.jpg"




function Footer() {
  const navigate = useNavigate()

  function Linkedin(e){
    window.open("https://www.linkedin.com/company/104886917/admin/dashboard/", '_blank');
              
                
  }

  return (
    <>
      <div className={Styles.footerWraper}>

          <div style={{display:"flex", marginLeft:"20px", flexWrap:"wrap"}}>
          <div style={{}}>
             <img className={Styles.MobIwalkinLogologo} style={{width:"140px"}} src={Itwalkinlogo} />
            </div>
            <div className={Styles.brands}>
              {/* <a> <i className='fa-brands fa-facebook-square'></i> </a>
              <a> <i className='fa-brands fa-twitter-square'></i> </a>
              <a onClick={Linkedin}> <i class='fa-brands fa-linkedin'></i> </a> */}
               <i className="fa-brands fa-linkedin" style={{ fontSize: "xx-large", marginBottom: "30px" }}  onClick={Linkedin}></i>
            </div>
            </div>


            <div className={Styles.Bottom}>
<div className={Styles.h4Wrapper}>

              <h4>   
                 <a onClick={()=>{
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
      navigate ("/Services")}}>Our Services</a></h4>
              

              <h4>
                <a onClick={()=>{
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
      navigate ("/AboutUs")}}>About us</a></h4>
              
              <h4> <a
              onClick={()=>{
                window.scrollTo({
                  top:0,
                  behavior:"smooth"
                })
                navigate ("/Contact")}}>Contact Us</a></h4>
</div>
<div style={{marginLeft:"25%"}}>
              <h4> <a
              onClick={()=>{
                window.scrollTo({
                  top:0,
                  behavior:"smooth"
                })
                navigate ("/AllCareerJobs")}}>Career</a></h4>
              
              <h4> 
              <a
              onClick={()=>{
                window.scrollTo({
                  top:0,
                  // behavior:"smooth"
                })
                navigate ("/TermsAndCondition")}}>Terms and Conditions</a></h4>
              <h4> 
              <a
              onClick={()=>{
                window.scrollTo({
                  top:0,
                  // behavior:"smooth"
                })
                navigate ("/Blogs")}}>Blogs</a></h4>              
            </div>
            </div>
          </div>



    </>
  )
}

export default Footer