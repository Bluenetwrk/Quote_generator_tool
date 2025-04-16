import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from "./StudentProfile.module.css"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import profileDp from "../img/user_3177440.png";
import Swal from "sweetalert2";
import { Puff } from  'react-loader-spinner'
import useScreenSize from '../SizeHook';
import Arrowimage from '../img/icons8-arrow-left-48.png'


function CheckStudentProfileForAdmin() {
  let navigate = useNavigate()

    useEffect(()=>{
        let adminLogin= localStorage.getItem("AdMLog")
            if(!adminLogin){
                navigate("/")
            }
        },[])

    const [profileData, setProfileData] = useState([])
const [PageLoader, setPageLoader] = useState(false)
const screenSize = useScreenSize();

const [message, setmessage] = useState("")

function Reject(Empid , status){
  const isReject=status
  Swal.fire({
    title: "Are You sure?",
    // icon:"question",
    width:"245",
      position:"top",
      customClass:{
        popup:"alertIcon"
      },
    showCancelButton:true
  }).then( async (res)=>{
    if(res.isConfirmed){
      await axios.put(`/StudentProfile/isReject/${Empid}`,{isReject})
      .then((res)=>{
          getProfile()

      }).catch((err)=>{
        alert("backend error occured")
      })
    }
  })
}    

function unReject(Empid , status){
  const isReject=status

  Swal.fire({
    title: "Are You sure ?",
    // icon:"question",
    width:"245",
      position:"top",
      customClass:{
        popup:"alertIcon"
      },
    showCancelButton:true
  }).then( async (res)=>{
    if(res.isConfirmed){
      await axios.put(`/StudentProfile/isReject/${Empid}`,{isReject})
      .then((res)=>{
          getProfile()

      }).catch((err)=>{
        alert("backend error occured")
      })
    }
  })
}



    
    async function sendMessage(id){
      await axios.put(`/StudentProfile/sendMessage/${id}`, {message})
      .then((res)=>{
        if(res.data){
        alert("Message Sent Successfully")
        }
      }).catch((err)=>{
        alert("some thing went wrong")
      })
    }

    let studId = JSON.parse(localStorage.getItem("StudId"))
    let params =useParams()
    
    async function getProfile() {
      setPageLoader(true)
      let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
      const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("AdMLog"))) };
        await axios.get(`/StudentProfile/getProfile/${params.CP}`,{headers})
            .then((res) => {
                let result = res.data.result                
                setProfileData([result])
        setPageLoader(false)

            }).catch((err) => {
               
                alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getProfile()
    }, [])

    function Approve(Empid , status){
        const isApproved = status
        Swal.fire({
          title: "Are You sure?",
          // icon:"question",
          width:"245",
      position:"top",
      customClass:{
        popup:"alertIcon"
      },
          showCancelButton:true
        }).then( async (res)=>{
          if(res.isConfirmed){
            await axios.put(`/StudentProfile/setApproval/${Empid}`,{isApproved})
            .then((res)=>{
                getProfile()
   
            }).catch((err)=>{
              alert("backend error occured")
            })
          }
        })
    
      }
    
      function DisApprove(Empid , status){
        const isApproved = status
        Swal.fire({
          title: "Are You sure?",
          // icon:"question",
          width:"245",
      position:"top",
      customClass:{
        popup:"alertIcon"
      },
          showCancelButton:true
        }).then( async (res)=>{
          if(res.isConfirmed){
            await axios.put(`/StudentProfile/setApproval/${Empid}`,{isApproved})
            .then((res)=>{
                getProfile()
    
            }).catch((err)=>{
              alert("backend error occured")
            })
          }
        })
      }

      async function DeleteProfile(id){
        
        Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {      
         axios.delete(`/StudentProfile/deleteProfile/${id}`)
        .then((res)=>{
          
          navigate("/BIAddmin@AllJobSeekers")
        }).catch((err)=>{
  
          alert("server error occured")
        })
      }
    })
      }



    return (
        <>

<img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} />

{

profileData.map((item, i) => {
    return (
        <div key={i}>
        <img className={styles.imageV} src={item.image?item.image : profileDp}/>
        
        </div>
    )

})
    }
                                            {PageLoader?
 <Puff  height="90"  width="90"  color="#4fa94d"  ariaLabel="bars-loading"  wrapperStyle={{marginLeft:"45%", marginTop:"60px"}}/> 
     :""
  }

           {screenSize.width>850?
           
<div className={styles.uiwrapper}>
            <ul className={styles.ul}>
                <li className={styles.li}><b>Name </b></li>
                <li className={styles.li}><b>Email  Address</b></li>
                <li className={styles.li}><b>Phone  Number</b></li>
                <li className={styles.li}><b>Aadhar</b></li>
                <li className={styles.li}><b>Pan  Card</b></li>
                <li className={styles.li}><b>Age</b></li>
                <li className={styles.li}><b>Notice  Period</b></li>
                <li className={styles.li}><b>Expected  Salary</b></li>
                <li className={styles.li}><b>Current  CTC</b></li>
                <li className={styles.li}><b>Qualification</b></li>
                <li className={styles.li}><b>Skills</b></li>
                <li className={styles.li}><b>Experience</b></li>
                <li className={styles.li}><b>Ip Address</b></li>
                <li className={`${styles.li} ${styles.Approval}`}  ><b>Status</b></li>
                {/* <li className={`${styles.li} ${styles.Approval}`}  ><b>Reject</b></li> */}
                {/* <li className={`${styles.li} ${styles.Approval}`}  ><b>Delete</b></li> */}
                <li className={`${styles.li}`} style={{height:"30px"}}><b>Message</b></li>


            </ul>
   

            {

                profileData.map((item, i) => {
                    return (
                        <ul className={styles.ulR} key={i}>
                            <li className={`${styles.Hli}`}>{item.name?item.name:<li className={styles.Nli}>Not Updated</li>}</li>
                            <li className={`${styles.Hli}`}>{item.email?item.email:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.phoneNumber?item.phoneNumber:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Aadhar?item.Aadhar:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.panCard?item.panCard:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.age?item.age:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.NoticePeriod?item.NoticePeriod:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.ExpectedSalary?item.ExpectedSalary:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.currentCTC?item.currentCTC:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Qualification?item.Qualification:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Skills?item.Skills:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Experiance?item.Experiance:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.ipAddress?item.ipAddress:<li className={styles.Nli}>could not fetch the Ip Address</li>}</li>
                      
                       <li className={` ${styles.Hli} ${styles.Approval}`}>
                        {
                        item.isApproved?
                  <button className={styles.Approved} onClick={()=>{DisApprove(item._id, false)}}>Approved&#10004;</button>
                  :
                  item.isReject?
                  <button className={styles.Rejected} onClick={()=>{unReject(item._id, false)}}>Rejected&#10004;</button>
                 : <>
                  <button className={styles.Approve} onClick={()=>{Approve(item._id, true)}}>Approve</button>&nbsp;
                  <button className={styles.Approve} onClick={()=>{Reject(item._id, true)}}>Reject</button>
                  </>

                  }
                  </li>

                    <li style={{height:"30px"}} className={` ${styles.Hli}`}> <input style={{height:"24px", width:"80%", marginLeft:"11%"}}  value ={message} onChange={(e)=>{setmessage(e.target.value)}} />
                     <button onClick={()=>{sendMessage(item._id)}}>Send</button> </li>

                        </ul>
                    )
                })

            }
            </div>
            :
            <>
            <div id={styles.JobCardWrapper} >

{profileData.map((job, i) => {
  return (
    <>
      <div className={styles.JobCard} key={i}>
        <div style={{display:"flex"}}>
        <div className={styles.LeftTable}>
                        <span className={styles.span}>Name :  </span> <br></br>
                        <span className={styles.span}>Age :</span><br></br>
                        <span className={styles.span}> Email Id :</span><br></br>
                        <span className={styles.span}> Phone number :</span><br></br>
                        <span className={styles.span}> Aadhar Id :</span><br></br>
                        <span className={styles.span}> Pand Card :</span><br></br>
                        <span className={styles.span}> Notice Period :</span><br></br>
                        <span className={styles.span}>Qualification :</span><br></br>
                        <span className={styles.span}>Experience : </span><br></br>
                        <span className={styles.span}> Current CTC :</span><br></br>
                        <span className={styles.span}>Expected CTC : </span><br></br>
                        <span className={styles.span}>Ip Address : </span><br></br>
                    </div>
            
                    <div className={styles.RightTable}>
                    <span className={styles.span}><span style={{color:"blue"}}  >{job.name}</span></span><br></br>      
                    <span className={styles.span}>{job.age? <span style={{ color: "blue" }}>{job.age} </span>:<span style={{color:"red"}}>Not updated</span> }</span><br></br>
                    <span className={styles.span}> {job.email?<span style={{ color: "blue" }}>{job.email} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.phoneNumber?<span style={{ color: "blue" }}>{job.phoneNumber} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.Aadhar?<span style={{ color: "blue" }}>{job.Aadhar} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.panCard?<span style={{ color: "blue" }}>{job.panCard} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.NoticePeriod?<span style={{ color: "blue" }}>{job.NoticePeriod} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.Qualification?<span style={{ color: "blue" }}>{job.Qualification} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.Experiance?<span style={{ color: "blue" }}>{job.Experiance} </span>:<span style={{color:"red"}}>Not updated</span>}   </span><br></br>
                    <span className={styles.span}>{job.currentCTC?<span style={{ color: "blue" }}>{job.currentCTC} </span>:<span style={{color:"red"}}>Not updated</span>} </span><br></br>
                    <span className={styles.span}> {job.ExpectedSalary?<span style={{ color: "blue" }}>{job.ExpectedSalary} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>          
                    <span className={styles.span}> {job.ipAddress?<span style={{ color: "blue" }}>{job.ipAddress} </span>:<span style={{color:"red"}}>could not fetch the Ip Address</span>}</span><br></br>          
                    </div>
            
                  </div>

                  <div className={styles.Down}>
                  <span className={styles.span}> Skills : {job.Skills?<span style={{ color: "blue" }}>{job.Skills} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>
                  <span className={styles.span}> Account Status:{job.isApproved?
                  <button   className={styles.Approved} onClick={()=>{DisApprove(job._id, false)}}>Approved</button>
                  :<button  className={styles.Approve} onClick={()=>{Approve(job._id, true)}}>Approve</button>}</span>
                                        <span className={styles.span} > {job.isReject?
                  <button className={styles.Approved} onClick={()=>{unReject(job._id, false)}}>Rejected&#10004;</button>
                  :<button  className={styles.Approve} onClick={()=>{Reject(job._id, true)}}>Reject</button>}</span><br></br>


                  <p  className={styles.span}> Message: <input style={{height:"24px", width:"60%", marginLeft:"1%"}}  value ={message} onChange={(e)=>{setmessage(e.target.value)}} />
                     <button onClick={()=>{sendMessage(job._id)}}>Send</button></p>
                  </div>
     
      </div>
    </>
  )
})}

</div>
            </>

          }         

        </>
    )
}

export default CheckStudentProfileForAdmin