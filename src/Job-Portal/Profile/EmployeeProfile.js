import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from "./StudentProfile.module.css"
import Companylogo from "../img/logo.png"
import { Puff } from  'react-loader-spinner'
import useScreenSize from '../SizeHook';
import image from '../img/icons8-arrow-button-24.png'
import Arrowimage from '../img/icons8-arrow-left-48.png'
import socketIO from 'socket.io-client';
import Footer from '../Footer/Footer'
import { Link, useNavigate, NavLink } from "react-router-dom";


function EmployeeProfile(props) {

    const navLinkStyles=({isActive})=>{
        return{
            color: isActive? "rgb(40, 4, 99)" : "",
            backgroundColor: isActive? "white" :""
        }
    }
    // useEffect( ()=>{    
    //     const socket = socketIO.connect(props.url,{
    //       auth:{
    //         token: JSON.parse(localStorage.getItem("EmpIdG"))
    //       }
    //     });
    //   },[])

    const [profileData, setProfileData] = useState([])
const [PageLoader, setPageLoader] = useState(false)
const screenSize = useScreenSize();

let navigate = useNavigate()

  let empId = JSON.parse(localStorage.getItem("EmpIdG"))

    async function getProfile() {
        const headers = { authorization: 'BlueItImpulseWalkinIn'};
        setPageLoader(true)
        await axios.get(`/EmpProfile/getProfile/${empId}`, {headers})
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
    function updateEmployeeProfile() {
        navigate("/UpdateProfile")
      }


    return (
        <>
      
        <div style={{display:"flex"}}>
        {/* <button style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"40px", cursor:"pointer", width:"50px"}}
         onClick={()=>{navigate(-1)}} >Back</button> */}
            <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} />
        <h3 style={{color:"rgb(40, 4, 99)", marginLeft:"35%"}}>My Profile</h3>
        </div>
         {
profileData.map((item, i) => {
    return (
        <div key={i} style={{}}>
            {console.log(profileData)}
        <img style={{}} className={styles.EmpImage} src={item.image?item.image : Companylogo}/>
        
        </div>
    )

})
    }
            {screenSize.width>800?

profileData.length>0?<button className={styles.updateProfile} onClick={updateEmployeeProfile}>Update Profile</button>:""
    :
    profileData.length>0?<button className={styles.MobupdateProfile} onClick={updateEmployeeProfile}>Update Profile</button>:""

            }

            {screenSize.width>850?
           <>
<div className={styles.uiwrapper}>
            <ul className={styles.ul}>
                <li className={styles.li}><b>Name </b></li>
                <li className={styles.li}><b>Email  Id</b></li>
                <li className={styles.li}><b>Phone  Number</b></li>
                <li className={styles.li}><b>Aadhar Id</b></li>
                <li className={styles.li}><b>Pan Card ID</b></li>
                <li className={styles.li}><b>Company Name</b></li>
                <li className={styles.li}><b>Company Contact No</b></li>
                <li className={styles.li}><b>Company Email id</b></li>
                <li className={styles.li}><b>Company GSTIN</b></li>
                <li className={styles.li}><b>Company Website</b></li>
                <li className={styles.li}><b>Company Address</b></li>
                <li className={styles.li}><b>Type of Organisation</b></li>
                <li className={styles.li}><b>Account status</b></li>
               
            </ul>
    
 {PageLoader?
 <Puff  height="80"  width="80"  color="#4fa94d"  ariaLabel="bars-loading"  wrapperStyle={{marginLeft:"22%", marginTop:"60px"}}/> 
     :""
  }

            {

                profileData.map((item, i) => {
                    return (
                        <>

                        <ul className={styles.ulR} key={i}>
 {/* <Puff  height="200"  width="200"  color="#4fa94d"  ariaLabel="bars-loading"  wrapperStyle={{marginLeft:"70%", marginTop:"80px"}}/>  */}
                      {item.name?         <li className={` ${styles.Hli}`}>{item.name}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Name yet</li>}
                      {item.email?         <li className={` ${styles.Hli}`}>{item.email}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Email yet</li>}
                      {item.phoneNumber?         <li className={` ${styles.Hli}`}>{item.phoneNumber}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your phone Number yet</li>}
                         {item.Aadhar?           <li className={` ${styles.Hli}`}>{item.Aadhar}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Aadhar Id yet</li>}
                         {item.panCard?          <li className={` ${styles.Hli}`}>{item.panCard}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your pan Id yet</li>}
                         {item.CompanyName?     <li className={` ${styles.Hli}`}>{item.CompanyName}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated  Company Name yet</li>}
                         {item.CompanyContact?     <li className={` ${styles.Hli}`}>{item.CompanyContact}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated  Company Number yet</li>}
                         {item.CompanyEmail?     <li className={` ${styles.Hli}`}>{item.CompanyEmail}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated  Company Email yet</li>}
                         {item.CompanyGSTIN?     <li className={` ${styles.Hli}`}>{item.CompanyGSTIN}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated  CompanyGSTIN yet</li>}
                         {item.CompanyWebsite?   <li className={` ${styles.Hli}`}>{item.CompanyWebsite}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated  Company Website yet</li>}
                         {item.CompanyAddress?     <li className={` ${styles.Hli}`}>{item.CompanyAddress}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated CompanyAddress yet</li>}
                         {item.TypeofOrganisation?   <li className={` ${styles.Hli}`}>{item.TypeofOrganisation}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated  Organisation Type yet</li>}                        
                         {item.isApproved?   <li className={` ${styles.Hli}`} style={{color:"blue"}}>Congrats! Your account has been Approved, You can start posting Jobs</li>: <li className={` ${styles.Hli} ${styles.Nli}`} style={{fontStyle:"italic"}}>"Your account is in under Verfication process"</li>}                        
                                                
{item.message?<p style={{width:"450%",  marginLeft:"-70%"}}><b> Message :</b><span style={{color:"red"}}> {item.message}! </span></p>:""}
                        
                       
                        </ul>

                        </>
                    )
                })

            }
            </div>

                   </>
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
                                                <span className={styles.span} > Company Contact:</span><br></br>
                                                <span className={styles.span}> Company Name: </span><br></br>
                                                <span className={styles.span}> Company Email: </span><br></br>
                                                <span className={styles.span}> Company GSTIN: </span><br></br>
                                                <span className={styles.span}> Company Website: </span><br></br>
                                                <span className={styles.span}> Organisation Type: </span><br></br>
                                            
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
                                            
                                            </div>
                                           
                                        </div>
                                        <div className={styles.Down}>
                                        <span className={`${styles.span} ${styles.LastDown}`}> Company Address:  {job.CompanyAddress ? <span className={styles.span} style={{ color: "blue" }}  >{job.CompanyAddress} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                        <span className={`${styles.span} ${styles.LastDown}`}> Account Status:  {job.isApproved ? <span style={{ color: "blue" }}>Congrates! Your account has been Approved, Start posting Jobs</span> : <span style={{ color: "red" }}>"Your account is under Verfication process"</span>}</span><br></br>
                                        {job.message?<span style={{}} className={styles.span}> Message :<span style={{color:"red"}}> {job.message}! </span></span>:""}
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                    <div style={{marginTop:"10px"}}>
                      <Footer/>
                    </div>
                </>
        
}

        </>
    )
}

export default EmployeeProfile