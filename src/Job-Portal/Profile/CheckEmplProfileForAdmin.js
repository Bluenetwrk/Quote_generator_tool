import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from "./StudentProfile.module.css"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import profileDp from "../img/user_3177440.png"
import Swal from "sweetalert2";
import { Puff } from  'react-loader-spinner'
import useScreenSize from '../SizeHook';
import Arrowimage from '../img/icons8-arrow-left-48.png'


function CheckEmpProfileForAdmin() {
    useEffect(()=>{
        let adminLogin= localStorage.getItem("AdMLog")
            if(!adminLogin){
                navigate("/")
            }
        },[])
    
    let navigate= useNavigate()
    const [profileData, setProfileData] = useState([])
const [PageLoader, setPageLoader] = useState(false)
const screenSize = useScreenSize();
const [message, setmessage] = useState("")
    
    async function sendMessage(id){
      await axios.put(`/EmpProfile/sendMessage/${id}`, {message})
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
  const headers = { authorization: 'BlueItImpulseWalkinIn'};
        await axios.get(`/EmpProfile/getProfile/${params.CP}`,{headers})
            .then((res) => {
                let result = res.data.result
                console.log(result)
                setProfileData([result])
  setPageLoader(false)

            }).catch((err) => {
            alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getProfile()
    }, [])

    
    function Reject(Empid , status){
      const isReject=status
      Swal.fire({
        title: "Are You sure?",
        width:"245",
      position:"top",
      customClass:{
        popup:"alertIcon"
      },
        icon:"question",
        showCancelButton:true
      }).then( async (res)=>{
        if(res.isConfirmed){
          await axios.put(`/EmpProfile/isReject/${Empid}`,{isReject})
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
          await axios.put(`/EmpProfile/isReject/${Empid}`,{isReject})
          .then((res)=>{
              getProfile()
  
          }).catch((err)=>{
            alert("backend error occured")
          })
        }
      })
    }

    function Approve(Empid , status){
        const isApproved=status
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
            await axios.put(`/EmpProfile/setApproval/${Empid}`,{isApproved})
            .then((res)=>{
                getProfile()
    
            }).catch((err)=>{
              alert("backend error occured")
            })
          }
        })
      }    
    
      function DisApprove(Empid , status){
        const isApproved=status
    
        Swal.fire({
          title: "Are You sure?",
          width:"245",
      position:"top",
      customClass:{
        popup:"alertIcon"
      },
          // icon:"question",
          showCancelButton:true
        }).then( async (res)=>{
          if(res.isConfirmed){
            await axios.put(`/EmpProfile/setApproval/${Empid}`,{isApproved})
            .then((res)=>{
                getProfile()
    
            }).catch((err)=>{
              alert("backend error occured")
            })
          }
        })
      }
    
      async function DeleteEmpProfile(id) {
        Swal.fire({
          title: 'Are you sure to Delete this Account?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`/EmpProfile/deleteEmployee/${id}`)
              .then((res) => {
                
                navigate("/BIAddmin@AllEmployees")
              }).catch((err) => {
            
    
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
                <li className={styles.li}><b>Company Name</b></li>
                <li className={styles.li}><b>Company Address</b></li>
                <li className={styles.li}><b>CompanyContact</b></li>
                <li className={styles.li}><b>Company Email</b></li>
                <li className={styles.li}><b>Company Website</b></li>
                <li className={styles.li}><b>Company GSTIN</b></li>
                <li className={styles.li}><b>Type of Organisation</b></li>
                <li className={styles.li}><b>Ip Address</b></li>

                <li className={`${styles.li} ${styles.Approval}`}  ><b>Status</b></li>
                {/* <li className={`${styles.li} ${styles.Approval}`}  ><b>Reject</b></li> */}
                {/* <li className={`${styles.li} ${styles.Approval}`} ><b>Delete</b></li> */}
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
                       <li className={` ${styles.Hli}`}>{item.CompanyName?item.CompanyName:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.CompanyAddress?item.CompanyAddress:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.CompanyContact?item.CompanyContact:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.CompanyEmail?item.CompanyEmail:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.CompanyWebsite?item.CompanyWebsite:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.CompanyGSTIN?item.CompanyGSTIN:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.TypeofOrganisation?item.TypeofOrganisation:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.ipAddress?item.ipAddress:<li className={styles.Nli}>could not fetch the Ip Address</li>}</li>
                     
                       <li className={` ${styles.Hli} ${styles.Approval}`}>
                        {
                        item.isApproved?
                  <button className={styles.Approved} onClick={()=>{DisApprove(item._id, false)}}>Approved&#10004;</button>
                  :
                  item.isReject?
                    <button className={styles.Rejected} onClick={()=>{unReject(item._id, false)}}>Rejected&#10004;</button>
                    :
                    <>
                  <button className={styles.Approve} onClick={()=>{Approve(item._id, true)}}>Approve</button>&nbsp;
                  <button className={styles.Approve} onClick={()=>{Reject(item._id, true)}}>Reject</button>
                  </>
                  
                  }
                  </li>

{/* // <li className={` ${styles.Hli} ${styles.Approval}`}>:}
//                   </li> */}
                   


                   {/* <li className={`${styles.Hli}`} >
                    <button className={styles.DeleteButton} onClick={() => { DeleteEmpProfile(item._id) }} >Delete</button></li>                      
                    */}
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
                <div style={{ display: "flex" }}>

                <div className={styles.LeftTable}>
                                                <span className={styles.span} >Name  :   </span><br></br>
                                                <span className={styles.span}>  Email Id :  </span><br></br>
                                                <span className={styles.span}>  Phone number : </span><br></br>
                                                <span className={styles.span}>  Aadhar Id : </span><br></br>
                                                <span className={styles.span} >Pan Card:</span><br></br>
                                                <span className={styles.span}> Company Name: </span><br></br>
                                                <span className={styles.span} > Company Contact:</span><br></br>
                                                <span className={styles.span}> Company Email: </span><br></br>
                                                <span className={styles.span}> Company GSTIN: </span><br></br>
                                                <span className={styles.span}> Company Website: </span><br></br>
                                                <span className={styles.span}> Organisation Type: </span><br></br>
                                                <span className={styles.span}> Ip Address: </span><br></br>
                                            
                                            </div>

                                            <div className={styles.RightTable}>
                                                <span className={styles.span} >  <span style={{ color: "blue" }}  >{job.name}</span> </span><br></br>
                                                <span className={styles.span}> {job.email ? <span style={{ color: "blue" }}  >{job.email} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span}>   {job.phoneNumber ? <span style={{ color: "blue" }}  >{job.phoneNumber} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span}>   {job.Aadhar ? <span style={{ color: "blue" }}  >{job.Aadhar} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span} > {job.panCard ? <span style={{ color: "blue" }}  >{job.panCard} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span}> {job.CompanyName ? <span style={{ color: "blue" }}  >{job.CompanyName} </span> : <span style={{ color: "red" }}>Not updated</span>} </span><br></br>
                                                <span className={styles.span} >  {job.CompanyContact ? <span style={{ color: "blue" }}  >{job.CompanyContact} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span}>  {job.CompanyEmail ? <span style={{ color: "blue" }}  >{job.CompanyEmail}</span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span}>  {job.CompanyGSTIN ? <span style={{ color: "blue" }}  >{job.CompanyGSTIN} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span}> {job.CompanyWebsite ? <span style={{ color: "blue" }}  >{job.CompanyWebsite} </span> : <span style={{ color: "red" }}>Not updated</span>} </span><br></br>
                                                <span className={styles.span}>  {job.TypeofOrganisation ? <span style={{ color: "blue" }}  >{job.TypeofOrganisation} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span}>  {job.ipAddress ? <span style={{ color: "blue" }}  >{job.ipAddress} </span> : <span style={{ color: "red" }}>could not fetch the Ip Address</span>}</span><br></br>
                                            
                                            </div>                                           
                                        </div>

                                        <div className={styles.Down}>
                                        <span className={`${styles.span} ${styles.LastDown}`}> Company Address:  {job.CompanyAddress ? <span className={styles.span} style={{ color: "blue", marginLeft:"5px" }}  >{job.CompanyAddress} </span> : <span style={{ color: "red", marginLeft:"5px" }} >Not updated</span>}</span><br></br>
                                      
                                        <span className={styles.span}> Account Status:  {job.isApproved?
                  <button  className={styles.Approved} onClick={()=>{DisApprove(job._id, false)}}>Approved</button>
                  :<button className={styles.Approve} onClick={()=>{Approve(job._id, true)}}>Approve</button>}</span>
                      
                      <span className={styles.span} > {job.isReject?
                  <button className={styles.Approved} onClick={()=>{unReject(job._id, false)}}>Rejected&#10004;</button>
                  :<button  className={styles.Approve} onClick={()=>{Reject(job._id, true)}}>Reject</button>}</span><br></br>

                  <p className={styles.span}> Message: <input style={{height:"24px", width:"60%", marginLeft:"1%"}}  value ={message} onChange={(e)=>{setmessage(e.target.value)}} />
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

export default CheckEmpProfileForAdmin