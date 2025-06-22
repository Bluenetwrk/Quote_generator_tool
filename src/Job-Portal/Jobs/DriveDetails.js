import React, { useRef } from 'react'
import styles from "./Allobs.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import Footer from '../Footer/Footer';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { TailSpin, Puff } from "react-loader-spinner"
import locations from "../img/icons8-location-20.png" 
import Swal from "sweetalert2";
import Styles from "./myPostedjobs.module.css"
import graduation from "../img/icons8-graduation-cap-40.png"
import useScreenSize from '../SizeHook';
import Arrowimage from '../img/icons8-arrow-left-48.png'
import profileDp from "../img/user_3177440.png"
import "./Allobs.module.css"
import HTMLReactParser from 'html-react-parser'
import Down from '../img/icons8-down-button-24.png'
import Up from '../img/icons8-arrow-button-24.png'
import CompanyLogo from '../img/company-logo.png'
import Linkedin from '../img/linkedin.webp'
import Email from '../img/email.webp'
import Whatsapp from '../img/whatsapp.png'
import Share from '../img/share.jpg'

function DriveDetails() {
  const [jobs, setJobs] = useState([])
  const [jobdescription, setjobdescription] = useState([])
  const [jobseekerid, setjobSeekerId] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
const screenSize = useScreenSize();
const [Loader, setLoader] = useState(false)
const[JobSeekerLogin,setJobSeekerLogin]=useState(false);

  const [clickedJobId, setclickedJobId] = useState()
  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))
  let empId = JSON.parse(localStorage.getItem("EmpIdG"))



  const navigate = useNavigate()

  let params = useParams();

//   async function getjobs() {
//     window.scrollTo({
//       top:0,
//       // behavior:"smooth"
//     })
//     const headers = { authorization: 'BlueItImpulseWalkinIn'};
//     await axios.get(`/jobpost/getjobs/${atob(params.id)}`, {headers})
//       .then((res) => {
//         let result = (res.data)
//         console.log(result)
//         setJobs(result)
//         setjobdescription(result.jobDescription)
//         setjobSeekerId(result.jobSeekerId)
//       })
//   }

//   useEffect(() => {
//     getjobs()
//   }, [])
  function showless() {
    navigate(-1)
  }

   useEffect(() => {
      let studentAuth = localStorage.getItem("StudLog")
      if (studentAuth) {
        setJobSeekerLogin(true)
      }
    }, [])

  async function applyforJobasjobseeker(id,link) {
    if(JobSeekerLogin)
      window.open(`${link}`)
    else
     navigate("/JobSeekerLogin", { state: { Jid: id } })
   
  }

  async function applyforOtherJob(Link) {
    // navigate("/JobSeekerLogin", { state: { Jid: id } })
    window.open(`${Link}`)
  }

  // .................delete function............
//   async function deletejob(deleteid) {
//     Swal.fire({
//       title: 'Are you sure?',
//       // icon: 'warning',
//       width:"260",
//       // position:"top",
//       customClass:{
//         popup:"alertIcon"
//       },
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'delete!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios.delete(`/jobpost/deleteProduct/${deleteid}`)
//           .then((res) => {
//             navigate("/postedjobs")
//             // getjobs()
//           })
//           .catch((err) => { alert("server error occured") })
//       }
//     })
//   }
  
  function update(id) {
    navigate("/Updatepostedjobs", { state: { getId: id } })
  }


//   async function applyforJob(jobId) {

//     setclickedJobId(jobId)
//     setLoader(true)
//     setTimeout(async () => {

//       await axios.put(`/jobpost/updatforJobApply/${jobId}`, { jobSeekerId })
//         .then((res) => {
//           setLoader(false)
//           getjobs()

//         }).catch((err) => {
//           alert("server issue occured", err)
//         })
//     }, 1000)
//   }

  function goUp(){
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }
  function goDown(){
    window.scrollTo(50,5000000)

    }
          // const url = "https://www.itwalkin.com/";
          // const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
      const location = useLocation();
      const url = window.location.origin + location.pathname; // Dynamic URL
         
           
      const [shareClicked, setShareClicked] = useState(false);
      const [copied, setCopied] = useState(false);
      const shareRef = useRef(null);
      const buttonRef = useRef(null);
    
      const updateClickStatus = () => {
        setShareClicked((prev) => !prev);
        setCopied(false);
      };
    
      const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      };
    
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            shareRef.current && shareRef.current.contains(event.target)
          ) {
            return;
          }
    
          if (
            buttonRef.current && buttonRef.current.contains(event.target)
          ) {
            return;
          }
    
          setTimeout(() => {
            setShareClicked(false);
          }, 50);
        };
    
        if (shareClicked) {
          document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [shareClicked]);

    const driveItem = location.state?.driveItem;
  return (
    <>
    {screenSize.width>850 ?
    <>
    <img style={{marginLeft:"50%", height: "30px"}}  onClick={()=>{goDown()}} src={Down}/>
        <div class={styles.jobDetailContainer}>

        <div class={styles.jobdetailBtnContainer} style={{display:"flex"}}>
           {/* <button class={styles.jobdetailBackBtn} onClick={()=>{navigate(-1)}}>Back</button> */}
           <button className={styles.jobdetailBackBtn} 
            onClick={() => {
               if (window.history.length > 1) {
                  navigate(-1);
                 } else {
                    navigate('/Walkin-Drives'); 
                  }
             }}>
                 Back
          </button>
           <div style={{display:"flex"}}>
           <button class={styles.jobdetailApplyBtn} style={{marginRight:"9px",display:"flex", gap:"5px",width:"80px"}}onClick={updateClickStatus}>
           <i className="fa-solid fa-share" style={{ fontSize: "medium", cursor: "pointer", marginLeft:"-8px" }}></i>
           <p style={{ margin: "0px",fontWeight:"400" }}>Share</p>
            </button>
           <button class={styles.jobdetailApplyBtn} >Apply</button>
           </div>
        </div>

        {shareClicked && (
        <div ref={shareRef} class={styles.shareContainer} style={{left:"1030px", top:"160px"}}>
          <h1 style={{textAlign:"center",color:"white"}}>Share</h1>

          <div class={styles.shareButtonsContainer}>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
              <img src={Linkedin} style={{borderRadius:"50%",height:"45px",backgroundColor:"white" }}></img>
            </a>

            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
            <img src={Whatsapp} style={{borderRadius:"50%", height:"46px",width:"48px"}}></img>
            </a>

            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=Shared%20Link&body=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
            <img src={Email} style={{borderRadius:"70%", borderRadius:"50%", height:"45px",}}></img>
              </a>
          </div>

          <div className={styles.copyLinkContainer}>
            <input type="text" value={url} readOnly className={styles.urlInput} />
            <button onClick={copyToClipboard} className={styles.copyButton}>
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>

          <div onClick={() => setShareClicked(false)} className={styles.closeButton} style={{position:"absolute", top:"8px", right:"13px",fontSize:"20px", color:"white", cursor:"pointer"}}>X</div>
        </div>
      )}

        <div class={styles.jobDetailsHeading}>
             <div class={styles.jobDetailsImage}>
            {/* <img className={styles.imageV} src={jobs.Logo?jobs.Logo : profileDp}/> */}
            {/* {console.log("jobs",jobs)} */}
              <img className={styles.jobDetailImage} src={CompanyLogo} />
            </div>
          
          
<div class={styles.jobDetailsPosterDesc}>
<h1 style={{textAlign:"center", fontSize:"xx-large"}}>{driveItem.jobTitle}</h1>
<div style={{marginLeft:"30px"}}>
  <span>Company Name : {driveItem.companyName}</span> &nbsp;|  
  &nbsp; <span> Drive Date :
                 {
                    driveItem.driveDate 
                  }
              {/* {new Date(jobs.createdAt).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                )} */}
                </span> &nbsp; |
  &nbsp; <span>Drive Time : {driveItem.driveTime}</span> &nbsp;|
  &nbsp; <span>Experience : {driveItem.experience}</span> &nbsp;|  
  &nbsp; <span>Location : {driveItem.location}</span>&nbsp; |  
  &nbsp; <span>Job Type : {driveItem.jobType}</span>&nbsp;   
  {/* &nbsp; <span>Qualification : {driveItem.qualification}</span>&nbsp;    */}
  {/* &nbsp; <span>Salary : {driveItem.ctc}</span>  */}
  
  
<p>
    <span>Salary : {driveItem.ctc}</span> &nbsp; |
    &nbsp; <span>Qualification : {driveItem.qualification}</span>&nbsp;| 
    &nbsp; <span>Skills : {driveItem.skillsRequired} </span></p>
</div>
</div>
</div>


  <table className={styles.tableDesWrapper} style={{marginLeft:"6px", marginTop:"-40px", flexWrap:"wrap", width:"98.8%", borderCollapse: "collapse",border:"none"}}>         
  {driveItem.details.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
               ))}
  {/* <tr style={{border:"none"}}>
    <td colSpan={2} style={{border:"none"}}>
    {
      jobdescription? HTMLReactParser(jobdescription.toString()) :""
     } 
    </td>

  </tr> */}
  </table>
  </div>
  <img style={{height:"30px",marginLeft:"50%",marginBottom:"50px"}}  onClick={()=>{goUp()}} src={Up}/> 
  
    
    </>
    :
    <>
               <div id={styles.JobCardWrapper} >


<>
<div style={{display:"flex",marginLeft:"8px",marginTop:"25px",marginRight:"-6px",alignItems:"center", justifyContent:"space-between"}}>
{/* <button class={styles.jobdetailBackBtn} onClick={()=>{navigate(-1)}}>Back</button> */}
<button className={styles.jobdetailBackBtnMobile} 
onClick={() => {
 if (window.history.length > 1) {
    navigate(-1);
   } else {
      navigate('/Walkin-Drives'); 
    }
}}>
   Back
</button>
<img style={{height:"24px"}}  onClick={()=>{goDown()}} src={Down}/>
<div ref={buttonRef} onClick={updateClickStatus} style={{height:"35px", width:"76px"}} className={styles.shareBtnMobile}>
<i className="fa-solid fa-share" style={{ fontSize: "medium", cursor: "pointer",marginLeft: "8px"}}></i>
<p style={{ fontWeight:"400" }}>Share</p>
</div>

{shareClicked && (
<div ref={shareRef} class={styles.shareContainerMob}>
<h1 style={{textAlign:"center",color:"white"}}>Share</h1>

<div class={styles.shareButtonsContainer} style={{marginTop:"16px"}}>
<a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
<img src={Linkedin} style={{borderRadius:"50%",height:"45px",backgroundColor:"white" }}></img>
</a>

<a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
<img src={Whatsapp} style={{borderRadius:"50%", height:"46px",width:"48px"}}></img>
</a>

<a href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=Shared%20Link&body=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
<img src={Email} style={{borderRadius:"70%", borderRadius:"50%", height:"45px"}}></img>
</a>
</div>

<div className={styles.copyLinkContainer} style={{marginTop:"16px"}}>
<input type="text" value={url} readOnly className={styles.urlInput} />
<button onClick={copyToClipboard} className={styles.copyButton}>
{copied ? "Copied!" : "Copy Link"}
</button>
</div>

<div onClick={() => setShareClicked(false)} className={styles.closeButton} style={{position:"absolute", top:"8px", right:"13px",fontSize:"20px", color:"white", cursor:"pointer"}}>X</div>
</div>
)}


</div>
  <div className={styles.JobCard} >
  {/* <p className={styles.readPageDate}>{new Date(jobs.createdAt).toLocaleString(
"en-US",
{
month: "short",
day: "2-digit",
year: "numeric",
}
)} </p> */}
  <div className={styles.JobTitleDateWrapper} style={{marginTop: "-20px"}}>
     <p style={{ width:"100%" ,whiteSpace:"normal", marginRight: "5px" }}className={styles.jobTitle} >{driveItem.jobTitle}      </p>
     {/* <p className={styles.Date}>{new Date(jobs.createdAt).toLocaleString(
     "en-US",
     {
     month: "short",
     day: "2-digit",
     year: "numeric",
     }
     )} </p>  */}
 </div>

  <div className={styles.JobPagecompanyNameLocationWrapper}   >
    {/* <img className={styles.logo} src={jobs.Logo} /> */}
    <img className={styles.jobDetailImageMobile} src={CompanyLogo} />
    <div class={styles.jobDetailTitleCompanyName} style={{marginLeft: "5px"}}>
    {!jobs.Source ?
    
    <span className={styles.companyName} >{driveItem.companyName}  </span> 
    :
    <> <a style={{ fontSize:"15px"}}className={`${styles.skills}`} href={jobs.SourceLink} target="_blank">{driveItem.companyName    }</a><br></br> </>
    
    
    }  
    </div>

</div>
{/* <img className={styles.jobLocationImage} src={location}  /> 
<span className={styles.jobLocation}>{jobs.jobLocation}</span>   */}

<div style={{display:"flex" ,gap:"8px"}}>
    <div style={{display:"flex",alignItems:"center"}}>
       <img className={styles.jobLocationImage} src={locations}  /> 
       <span className={styles.jobLocation}>{driveItem.location}</span> 
    </div>
    <div style={{display:"flex",alignItems:"center"}}>
      < img className={styles.graduationImage} src={graduation}  /> 
      {driveItem.qualification}
    </div>
</div>

<div style={{display:"flex", flexDirection:"column",gap:"4px",marginTop:"4px"}}>
<div className={styles.skillWrapper}>
<span className={styles.skillsHeading}>Job Type: </span><span className={styles.skills}>{driveItem.jobType}</span><br></br>
</div>
<div className={styles.skillWrapper}>
<span className={styles.skillsHeading}>Drive Time: </span><span className={styles.skills}>{driveItem.driveTime}</span><br></br>
</div>
<div className={styles.skillWrapper}>
<span className={styles.skillsHeading}>Drive Date: </span><span className={styles.skills}>{driveItem.driveDate}</span><br></br>
</div>

<div className={styles.skillWrapper}>
<span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}>{driveItem.skillsRequired}</span><br></br>
</div>

</div>
<div className={styles.applyDrivePackage}>
<p className={styles.salaryRange}><span>&#8377;</span>{driveItem.ctc}</p>        


{
jobSeekerId?
(
jobseekerid.find((jobseeker) => {
return (
jobseeker == jobSeekerId
)
}) ?
<button className={styles.MobileAppliedButton}  > Applied <span style={{ fontSize: '13.8px', marginBottom:"3px", marginLeft:"2px" }}>&#10004;</span></button>

// job .isApproved?

:
// <button className={styles.ApplyMobile} onClick={() => { applyforJob(jobs._id) }}>Apply
<button className={styles.ApplyDriveMobile} >Apply
<span className={styles.Loader} >{Loader && jobs._id == clickedJobId ?
<TailSpin color="white" height={20} />
: ""}</span></button>
)
:
empId?

// <div className={styles.ApplyPackage}>
//      <span className={styles.salaryRange} style={{ marginLeft: "10px" }}><span>&#8377;</span>{job.salaryRange}</span>
{/* <div className={Styles.MobileAcbuttons}>
<button style={{marginTop:"-10px"}} onClick={() => { update(jobs._id) }} className={` ${Styles.MobileUpdate}`}>update</button>
<button style={{marginTop:"-10px"}} onClick={() => { deletejob(jobs._id) }} className={` ${Styles.MobileDelete}`}>delete</button>
 </div> */}
// </div>
:  jobs.SourceLink?
<button  className={styles.ApplyDriveMobile} >Apply</button>
:
<button className={styles.ApplyDriveMobile} ><b>Apply</b></button>



}
    </div>
<p className={styles.jobDescriptionHeading}>Job Description:</p>
<p className={styles.jobDescription}> 
{/* { 
jobdescription? HTMLReactParser(jobdescription.toString()) :""
} */}
 {driveItem.details.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
               ))}
 </p>
  </div>
</>

</div>
<img style={{height:"24px",marginLeft:"45%",marginBottom:"40px"}}  onClick={()=>{goUp()}} src={Up}/>
    </>
    }
                          
    </>

  )
}

      export default DriveDetails