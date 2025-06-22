import React, { useRef } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from "./StudentProfile.module.css"
import profileDp from "../img/user_3177440.png"
import { Puff } from  'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import useScreenSize from '../SizeHook';
import Arrowimage from '../img/icons8-arrow-left-48.png'
import socketIO from 'socket.io-client';
import Footer from '../Footer/Footer'


function StudentProfile(props) {

    // useEffect( ()=>{    
    //     const socket = socketIO.connect(props.url,{
    //       auth:{
    //         token: JSON.parse(localStorage.getItem("StudId"))
    //       }
    //     });
    //   },[])
    const [showConsent, setShowConsent] = useState(false);
    const [consent, setConsent] = useState('');
    const [signature, setSignature] = useState('');
    const [date, setDate] = useState('');
  
    const toggleConsent = () => {
      setShowConsent(!showConsent);
    };
  

    const [profileData, setProfileData] = useState([])
const [PageLoader, setPageLoader] = useState(false)
const screenSize = useScreenSize();
// props.sendingName(profileData)
let navigate = useNavigate()

    let studId = JSON.parse(localStorage.getItem("StudId"))
    async function getProfile() {
        let userid = JSON.parse(localStorage.getItem("StudId"))
        const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("StudLog"))) };
        setPageLoader(true)
        await axios.get(`/StudentProfile/getProfile/${studId}`, {headers})
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

    function updateprofile() {
        navigate("/Update-Profile")
      }
         

      const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  const tooltipRef = useRef(null);
  const consentRef = useRef(null);
  const consentBtnRef = useRef(null); 
  const tooltipBtnRef = useRef(null);
  // const toggleTooltip = () => setShowTooltip(prev => !prev);
  // const toggleConsent = () => setShowConsent(prev => !prev);

  // Detect outside click for both tooltip and consent
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Tooltip: hide only if clicked outside BOTH the tooltip and the "i" button
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        tooltipBtnRef.current &&
        !tooltipBtnRef.current.contains(event.target)
      ) {
        setShowTooltip(false);
      }
  
      // Consent: hide only if clicked outside BOTH the consent box and the button
      if (
        consentRef.current &&
        !consentRef.current.contains(event.target) &&
        consentBtnRef.current &&
        !consentBtnRef.current.contains(event.target)
      ) {
        setShowConsent(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
    return (
        <>
        <div style={{display:"flex"}}>
        {/* <button style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"40px", cursor:"pointer", width:"50px"}} onClick={()=>{
            navigate(-1)}} >back</button> */}
            
                        <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} />

        <h3 style={{color:"rgb(40, 4, 99)", marginLeft:"41%"}}>My Profile</h3>
        </div>

        <div style={{display:"flex", justifyContent:"space-between", marginLeft:"3%", marginRight:"10%"}}>
          <div>
            {
              profileData.map((item, i) => {
               return (
                 <div key={i}>
                   <img className={styles.imageV} src={item.image?item.image : profileDp}/>
                 </div>
              )})
             }
         </div>
         <div className={styles.updatebgvContainer}>
          <div>
            {
            screenSize.width>800?

             profileData.length>0?
             <>
             <button className={styles.updateProfileStd} onClick={updateprofile}>Update Profile</button><br></br>

             </>

             :""

             :
             profileData.length>0?<button className={styles.updateProfileStd} onClick={updateprofile}>Update Profile</button>:""
          }
          </div>
          <div style={{position:"flex"}}>
            <div style={{ position: "relative" }}>
            <div
            ref={tooltipBtnRef}
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          backgroundColor: 'rgb(40,4,99)',
          color: 'white',
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          position:'absolute',
          display:'flex',
          justifyContent: 'center',
          textAlign:"center",
          right: "-15%",
        }}
        onClick={toggleTooltip}      >
        i
        {showTooltip && (
        <div
        ref={tooltipRef}
          style={{
            position: 'absolute',
            top: '50px',
            right: 0,
            width: '260px',
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px',
            borderRadius: '6px',
            fontSize: '13px',
            zIndex: 10,
          }}
        >
         The background verification feature on ITWALKIN.COM allows employers to authenticate your profile using the details provided in the profile section. By opting in, you grant consent to ITWALKIN.COM to perform background checks based on the information shared on this platform and other relevant source.
        </div>
      )}
      </div>
      
            
            <button ref={consentBtnRef} onClick={toggleConsent} className={styles.updateProfileStd} style={{width:"150px"}} >Background Check</button>
            
      {showConsent && (
        <div
        ref={consentRef}
          style={{
            position:"absolute",
            marginTop: '5px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            textAlign: 'left',
            backgroundColor: '#f9f9f9',
            fontSize: '14px',
            marginBottom:"50px",
            right: "0px",
            width:"244px"
          }}
        >
          <p style={{ marginBottom: '10px' }}>
             I consent to the background check and authorize the verification of my details.
          </p>

          <div style={{ marginBottom: '0px' }}>
            <label>
              <input
                type="radio"
                name="consent"
                value="yes"
                checked={consent === 'yes'}
                onChange={() => setConsent('yes')}
              />
              {' '}Yes, I agree
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="consent"
                value="no"
                checked={consent === 'no'}
                onChange={() => setConsent('no')}
              />
              {' '}No, I decline
            </label>
          </div>
        </div>
      )}
      </div>
          </div>
          </div>
        </div>
        
         {/* {

profileData.map((item, i) => {
    return (
        <div key={i}>
        <img className={styles.imageV} src={item.image?item.image : profileDp}/>
        
        </div>
    )})
    } */}

           
            {screenSize.width>850?
      <>      
          
<div className={styles.uiwrapper}>
            <ul className={styles.ul}>
                <li className={styles.li}><b>Name </b></li>
                <li className={styles.li}><b>Email Address</b></li>
                <li className={styles.li}><b>City</b></li>
                <li className={styles.li}><b>Phone Number</b></li>
                <li className={styles.li}><b>Aadhaar Id</b></li>
                <li className={styles.li}><b>Pan Card Id</b></li>
                <li className={styles.li}><b>Age</b></li>
                <li className={styles.li}><b>Notice  Period</b></li>
                <li className={styles.li}><b>Expected  Salary</b></li>
                <li className={styles.li}><b>Current  CTC</b></li>
                <li className={styles.li}><b>Qualification</b></li>
                <li className={styles.li}><b>Skill Tags</b></li>
                <li className={styles.li}><b>Experience</b></li>
                <li className={styles.li}><b>Account status</b></li>
                <li className={styles.li}><b>HRs/Employer FeedBack</b></li>



            </ul>
            {PageLoader?
 <Puff  height="80"  width="80"  color="#4fa94d"  ariaLabel="bars-loading"  wrapperStyle={{marginLeft:"22%", marginTop:"60px"}}/> 
     :""
  }

            {
                profileData.map((item, i) => {
                    return (
                        <ul className={styles.ulR} key={i}>
                          
                            {/* <li className={`${styles.Hli}`}>{item.name}</li>
                            <li className={`${styles.Hli}`}>{item.email}</li> */}
                      {item.name?         <li className={` ${styles.Hli}`}>{item.name}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your phone Name yet</li>}
                      {item.email?         <li className={` ${styles.Hli}`}>{item.email}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Email yet</li>}
                      {item.city?         <li className={` ${styles.Hli}`}>{item.city.value}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your City yet</li>}
                      {item.phoneNumber?         <li className={` ${styles.Hli}`}>{item.phoneNumber}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your phone Number yet</li>}
                         {item.Aadhar?           <li className={` ${styles.Hli}`}>{item.Aadhar}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Aadhar Id yet</li>}
                         {item.panCard?          <li className={` ${styles.Hli}`}>{item.panCard}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your pan Id yet</li>}
                         {item.age?              <li className={` ${styles.Hli}`}>{item.age}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your age yet</li>}
                         {item.NoticePeriod?     <li className={` ${styles.Hli}`}>{item.NoticePeriod}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your NoticePeriod yet</li>}
                         {item.ExpectedSalary?  <li className={` ${styles.Hli}`}>{item.ExpectedSalary}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Expected Salary yet</li>}
                         {item.currentCTC?       <li className={` ${styles.Hli}`}>{item.currentCTC}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your current CTC yet</li>}
                         {item.Qualification?    <li className={` ${styles.Hli}`}>{item.Qualification}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Qualification yet</li>}
                         {item.Skills?           <li className={` ${styles.Hli}`}>{item.Skills}&nbsp;
                         {/* => typeof e === 'string' */}
                         </li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Skills yet</li>}
                         {item.Experiance?       <li className={` ${styles.Hli}`}>{item.Experiance}</li>:  <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your experiance yet</li> }
                         {item.isApproved?   <li className={` ${styles.Hli}`} style={{color:"blue"}}> Congrats !  Your account has been Approved</li>: <li className={` ${styles.Hli} ${styles.Nli}`} style={{fontStyle:"italic"}}>"Your account is in under Verfication process"</li>}                        
                         {item.message?<p style={{width:"450%",  marginLeft:"-70%"}}><b> Message :</b><span style={{color:"red"}}> {item.message}! </span></p>:""}
                         {item.Experiance?       <li className={` ${styles.Hli}`}>{item.Experiance}</li>:  <li className={` ${styles.Hli} ${styles.Nli}`}>No FeedBack</li> }
                        </ul>
                    )

                })

            }

         </div>
         <div style={{ marginTop: '20px', textAlign: 'center',}}>
      {/* Notch-style 'i' icon */}
      {/* <div
        onClick={toggleConsent}
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          backgroundColor: 'rgb(40,4,99)',
          color: 'white',
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          position:'relative',
          display:'flex',
          justifyContent: 'center',
          textAlign:"center",
          marginLeft:"60px",
          marginBottom:"20px"
        }}
        title="Consent Info"
      >
        i
      </div> */}
        
      {/* Consent Box */}
      {/* <div style={{marginBottom:"90px"}}>
      {showConsent && (
        <div
          style={{
            position:"absolute",
            marginTop: '1px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            width: '90%',
            marginLeft: '60px',
            marginRight: 'auto',
            textAlign: 'left',
            backgroundColor: '#f9f9f9',
            fontSize: '14px',
            marginBottom:"50px"
          }}
        >
          <p style={{ marginBottom: '10px' }}>
             I consent to the background check and authorize the verification of my details.
          </p>

          <div style={{ marginBottom: '0px' }}>
            <label>
              <input
                type="radio"
                name="consent"
                value="yes"
                checked={consent === 'yes'}
                onChange={() => setConsent('yes')}
              />
              {' '}Yes, I agree
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="consent"
                value="no"
                checked={consent === 'no'}
                onChange={() => setConsent('no')}
              />
              {' '}No, I decline
            </label>
          </div> */}

          {/* <p style={{ margin: '10px 0 5px' }}><strong>Jobseeker Signature:</strong></p> */}

          {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '13px' }}>
              Signature:
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Type name"
                style={{
                  width: '100%',
                  padding: '4px',
                  fontSize: '13px',
                  marginTop: '3px',
                }}
              />
            </label>
            <label style={{ fontSize: '13px' }}>
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '4px',
                  fontSize: '13px',
                  marginTop: '3px',
                }}
              />
            </label>
          </div> */}
        {/* </div>
      )}
      </div> */}

    </div>
    <div style={{marginBottom:"-5px"}}></div>
        </>

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
                        <span className={styles.span}> Pan Card Id :</span><br></br>
                        <span className={styles.span}> Notice Period :</span><br></br>
                        <span className={styles.span}>Qualification :</span><br></br>
                        <span className={styles.span}>Experience : </span><br></br>
                        <span className={styles.span}> Current CTC :</span><br></br>
                        <span className={styles.span}>Expected CTC : </span><br></br>
                        
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

                    </div>
            
                  </div>

                  <div className={styles.Down} style={{marginLeft:"6px"}}>
                  <span className={styles.span}> Skills : {job.Skills?<span style={{ color: "blue" }}>{job.Skills} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>
                  <span className={styles.span}> Account Status:  {job.isApproved ? <span style={{ color: "blue" }}> Congrats ! Your account has been Approved</span> : <span style={{ color: "red" }}>"Your account is under Verfication process"</span>}</span><br></br>
                  {job.message?<span style={{}} className={styles.span}> Message :<span style={{color:"red"}}> {job.message}! </span></span>:""}
                  <span className={styles.span}> HRs/Employer FeedBack : {job.Skills?<span style={{ color: "blue" }}>{job.Skills} </span>:<span style={{color:"red"}}>No FeedBack</span>}</span><br></br>
                  </div>
      </div>
      {/* <div style={{ marginTop: '20px', textAlign: 'center' }}> */}
      {/* Notch-style 'i' icon */}
      {/* <div
        onClick={toggleConsent}
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          backgroundColor: 'rgb(40,4,99)',
          color: 'white',
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          position:'relative',
          display:'flex',
          justifyContent: 'center',
          textAlign:"center",
          marginLeft:"20px",
          marginBottom:"20px"
        }}
        title="Consent Info"
      >
        i
      </div> */}

      {/* Consent Box */}
      {/* {showConsent && (
        <div
          style={{
            position:"absolute",
            marginTop: '15px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '350px',
            marginLeft: '60px',
            marginRight: 'auto',
            textAlign: 'left',
            backgroundColor: '#f9f9f9',
            fontSize: '14px',
            marginTop:"-20px"
          }}
        >
          <p style={{ marginBottom: '10px' }}>
             I consent to the background check and authorize the verification of my details.
          </p>

          <div style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="radio"
                name="consent"
                value="yes"
                checked={consent === 'yes'}
                onChange={() => setConsent('yes')}
              />
              {' '}Yes, I agree
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="consent"
                value="no"
                checked={consent === 'no'}
                onChange={() => setConsent('no')}
              />
              {' '}No, I decline
            </label>
          </div>

          <p style={{ margin: '10px 0 5px' }}><strong>Jobseeker Signature:</strong></p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '13px' }}>
              Signature:
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Type name"
                style={{
                  width: '100%',
                  padding: '4px',
                  fontSize: '13px',
                  marginTop: '3px',
                }}
              />
            </label>
            <label style={{ fontSize: '13px' }}>
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '4px',
                  fontSize: '13px',
                  marginTop: '3px',
                }}
              />
            </label>
          </div>
        </div>
      )}
    </div> */}
    </>
  )
})}

</div>
<div style={{marginTop:"30px"}}>
<Footer/>
</div>
            </>
      }


        </>
    )
}

export default StudentProfile
