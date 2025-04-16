import React from 'react'
import styles from "./Allobs.module.css"
import { useLocation, useNavigate } from 'react-router-dom';


const HelpDetails = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const helpItem = location.state?.helpItem;



  return (
    <>         
    <div class={styles.helpPageContainer}>
       <div class={styles.ReadPageBtnTitleContainer} style={{display:"flex"}}>
           <button className={styles.readPageBackBtn} 
            onClick={() => {
               if (window.history.length > 1) {
                  navigate(-1);
                 } else {
                    navigate('/support'); 
                  }
             }}>
                 Back
          </button>
          <h2 className={styles.helpTitle}>{helpItem?.question}</h2>        
         </div>   

         <div style={{marginLeft:"12px"}}>
                <span>Posted by {helpItem.postedby}</span> |  
                <span> Posted on :{helpItem.postedDate}</span>.         
         </div>
         <div style={{marginLeft:"12px",marginTop:"20px"}}>Steps :- </div>
         <div style={{marginLeft:"12px"}}>      
            {helpItem.details.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
               ))}
         </div>
     </div>   
    </>
  )
}

export default HelpDetails