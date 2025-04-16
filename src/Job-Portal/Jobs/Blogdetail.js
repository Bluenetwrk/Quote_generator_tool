import React, { useRef } from 'react'
import styles from "./Allobs.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import Footer from '../Footer/Footer';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { TailSpin, Puff } from "react-loader-spinner"
import location from "../img/icons8-location-20.png" 
import Swal from "sweetalert2";
import Styles from "./myPostedjobs.module.css"
import graduation from "../img/icons8-graduation-cap-40.png"
import useScreenSize from '../SizeHook';
import Arrowimage from '../img/icons8-arrow-left-48.png'
import profileDp from "../img/user_3177440.png"
import "./Allobs.module.css"
import HTMLReactParser from 'html-react-parser'
import StProfile from "../Profile/StudentProfile"
import EMpProfile from "../Profile/EmployeeProfile"
import Down from '../img/icons8-down-button-24.png'
import Up from '../img/icons8-arrow-button-24.png'
import Linkedinlogo from '../img/linkedin-logo.png'
import Linkedin from '../img/linkedin.webp'
import Email from '../img/email.webp'
import Whatsapp from '../img/whatsapp.png'
import Share from '../img/share.jpg'


function Answerdetails(props) {
  
  let userid = JSON.parse(localStorage.getItem("StudId")) || JSON.parse(localStorage.getItem("EmpIdG"))

  const [CommentName, setCommentName] = useState("")
  const [CommentID, setCommentID] = useState()
  // const [shareClicked, setShareClicked] = useState(false)
  // let CommentName = atob(JSON.parse(localStorage.getItem("Snm")))
  const updateClick=()=>{
    setShareClicked((currenvalue)=>!currenvalue)
  }
  async function getProfile() {
    let userId = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userId +" "+ atob(JSON.parse(localStorage.getItem("StudLog"))) };
    await axios.get(`/StudentProfile/getProfile/${userId}`, {headers})
        .then((res) => {
            let result = res.data.result
           
            setCommentName(result.name)
        }).catch((err) => {
            // alert("some thing went wrong")
        })
}
let empId = JSON.parse(localStorage.getItem("EmpIdG"))
async function getEmpProfile() {
  const headers = { authorization: 'BlueItImpulseWalkinIn'};
  await axios.get(`/EmpProfile/getProfile/${empId}`, {headers})
      .then((res) => {
          let result = res.data.result
          // console.log(result.name)
          setCommentName(result.name)
          // localStorage.setItem("Snm", JSON.stringify(btoa(result.name)))

      }).catch((err) => {
          // alert("some thing went wrong")
      })
}

useEffect(() => {
  if(empId){
    getEmpProfile()
  }else{
    getProfile()
  }
}, [])
  // let empId = JSON.parse(localStorage.getItem("EmpIdG"))
  const [jobdescription, setjobdescription] = useState([])
  const [jobseekerid, setjobSeekerId] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
const screenSize = useScreenSize();
const [Loader, setLoader] = useState(false)
  const [jobs, setJobs] = useState([])
  const [comments, setcomments] = useState({
    id:userid,
    name:"",
    comment:""
  })

  const [clickedJobId, setclickedJobId] = useState() //for single job loader

function changeComments(e){
  // setcomments(comments.comment=e.target.value)
    setcomments({ ...comments, comment: e.target.value, name:CommentName})
}


async function handleComment(){
  if(!userid){
    alert("you must login to comment on question")
    return false
  }
  if(!comments.comment){
    return false
  }
  const headers = { authorization: 'BlueItImpulseWalkinIn'};
  await axios.put(`/BlogRoutes/Addcomment/${atob(params.id)}`,{comments}, {headers})
  .then((res)=>{
    let result=res.data
    if(result==="success"){
      // setcomments("")
    setcomments({ ...comments, comment: ""})
      getjobs()
    }
  })
}

async function deletComment(id){  
  const headers = { authorization: 'BlueItImpulseWalkinIn'};
  await axios.put(`/BlogRoutes/deletComment/${atob(params.id)}`,{id}, {headers})
  .then((res)=>{
    let result=res.data
    if(result==="success"){
      // setcomments("")
    // setcomments({ ...comments, comment: ""})
      getjobs()
    }
  })
}


  const navigate = useNavigate()

  let params = useParams();
 //-----------------prev next starts--------
 const location = useLocation(); 
 const urlParams = new URLSearchParams(window.location.search);
 let indexing = parseInt(urlParams.get("index"), 10);
 const [index, setIndex]=useState(indexing)
 let lastIndex=useRef(0)
 const userTags = location.state?.selectedTag;
 console.log(userTags)
 const allJobs=useRef([])

 async function getAllHomejobs() {
     const headers = { authorization: 'BlueItImpulseWalkinIn' };
     await axios.get("/BlogRoutes/getAllBlogs", { headers })
      .then((res) => {
        let result = (res.data)
         // console.log(result)
        let sortedate = result.sort(function (a, b) {
         return new Date(b.createdAt) - new Date(a.createdAt);
        });
        lastIndex.current=sortedate.length; 
        allJobs.current=sortedate
       //  console.log("jobs-",allJobs,"lastIndex",lastIndex)
       }).catch((err) => {
       //  console.log(err)
        alert("some thing went wrong")
     })
   }


   async function getTagValue(){
       // console.log("executing-->",userTags.current)
       await axios.get(`/BlogRoutes/getTagsJobs/${userTags.current}`)
         .then((res) => {
           let result = (res.data)
           
           let sortedate = result.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
           });
           lastIndex.current=sortedate.length;  
           allJobs.current=sortedate 
           // allTagJobs.current=sortedate;
           // console.log("tags-",allJobs,"lastIndex",lastIndex)
         })
     } 
     
     useEffect(()=>{
         console.log("userTags",userTags)
         if(userTags.current===""||userTags.current===undefined){
          getAllHomejobs()
         //  console.log("exe home")
         }
         else{ 
          getTagValue() 
        } 
       },[])   


       const incIndex=()=>{
           if(index<lastIndex.current-1)
            setIndex((prev)=>prev+1)
           // console.log("inc",index)
         }
         const descIndex=()=>{
           if(index>0)
            setIndex((prev)=>prev-1)
         //  console.log("dec",index)
         }
  
         async function getNextPrevJobs() {
             window.scrollTo({
               top:0,
               // behavior:"smooth"
             })
             // console.log("aal jobs current",allJobs.current[index]._id)
             const headers = { authorization: 'BlueItImpulseWalkinIn'};
             await axios.get(`/BlogRoutes/getjobs/${allJobs.current[index]._id}`, {headers})
               .then((res) => {
                 let result = (res.data)
                 // console.log(result)
                 setJobs(result)
                 setjobdescription(result.jobDescription)
                 setjobSeekerId(result.jobSeekerId)
               })
           }

           useEffect(()=>{
               if (allJobs.current.length > 0) {
                getNextPrevJobs();
              }
             },[index])


 //-----prev next ends---------
  
  async function getjobs() {
    
    const headers = { authorization: 'BlueItImpulseWalkinIn'};
    await axios.get(`/BlogRoutes/getjobs/${atob(params.id)}`, {headers})
      .then((res) => {
        let result = (res.data)
        // console.log(result)
        setJobs(result)
        setjobdescription(result.jobDescription)
        setjobSeekerId(result.jobSeekerId)
      })
  }

  useEffect(() => {
    getjobs()
  }, [])

  function goUp(){
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }
  function goDown(){
    window.scrollTo(50,5000000)

    }  
    
   
    // const location = useLocation();
    const url = window.location.origin + location.pathname; // Dynamic URL
      // const url = "https://www.itwalkin.com/Blogs";
      // const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
     
    //  console.log("url",url);  
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

  const convertToIST = (utcTimestamp) => {
    if (!utcTimestamp) return "Loading...";
    const date = new Date(utcTimestamp); 
    const istOffset = 5.5 * 60 * 60 * 1000; 
    const istDate = new Date(date.getTime() + istOffset); 

    let hours = istDate.getUTCHours(); 
    let minutes = istDate.getUTCMinutes();
    let seconds = istDate.getUTCSeconds();

    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; 

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`;
};

  
  
  return (
    <>
        
    {/* <div style={{display:"flex", marginTop:"20px"}}> */}
                            {/* <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} /> */}
             {/* <button style={{  color:"grey", marginTop:"10px", marginLeft:"8%", cursor:"pointer",}} 
             onClick={()=>{navigate(-1)}}>Back</button> */}
             {/* <button class={styles.jobdetailBackBtn} onClick={()=>{navigate(-1)}}>Back</button> */}
              
    {/* </div> */}

      {screenSize.width>850 ?

        <>
    {/* <div class={ styles.blogArrow} style={{display:"flex", height:"50px", alignItems:"center",justifyContent:"space-between",}}>
           <h2 style={{fontSize:"25px",marginLeft:"120px", fontWeight:"800", marginTop:"-15px", marginBottom:"-15px"}}> Blogs  </h2>
          <img style={{ height: "30px"}}  onClick={()=>{goDown()}} src={Down}/>
          <div style={{ display: "flex", justifyContent: "space-between", marginRight:"110px" }}>
            <div className={styles.navigationWrapperbtn}>
              <button style={{ display: "flex",gap:"10px", alignItems:"center", padding: "6px", paddingLeft:"0px" }} className={styles.navigationbtn}> 
              <i class='fas fa-step-backward' > </i> First
              </button>
              <button style={{ display: "flex",gap:"10px", alignItems:"center", padding: "6px", paddingLeft:"0px" }}className={styles.navigationbtn} >
              <i class='fas fa-caret-square-left'></i>Prev
              </button>
              <div style={{display:"flex",alignItems:"center"}}>1</div>
              <button style={{ display: "flex", alignItems:"center", padding: "6px" }} className={styles.navigationbtn} >
               Next<i class='fas fa-caret-square-right'></i>
              </button> */}
              {/* <button style={{ display: "flex", alignItems:"center", padding: "6px" }} className={styles.navigationbtn} >
                Last<i class='fas fa-step-forward'></i>
               
              </button>
            </div>
          </div>
        </div> */}
        <img style={{marginLeft:"50%", height: "30px"}}  onClick={()=>{goDown()}} src={Down}/>
    <div class={styles.readPageContainer}>
       <div class={styles.ReadPageBtnTitleContainer} style={{display:"flex"}}>
           {/* <button class={styles.readPageBackBtn} onClick={()=>{navigate(-1)}}>Back</button> */}
           <button className={styles.readPageBackBtn} 
            onClick={() => {
               if (window.history.length > 1) {
                  navigate(-1);
                 } else {
                    navigate('/Blogs'); 
                  }
             }}>
                 Back
          </button>

          <div style={{display:"flex",height:"55px"}}>
          <button onClick={descIndex}  className={styles.readPageBackBtn}>
          <i class='fas fa-caret-square-left' style={{fontSize:"small",marginLeft:"-2px"}}></i>   Prev
          </button>
          <h2 style={{display:"flex",alignItems:"center"}}>{index +1}</h2>
          <button onClick={incIndex} className={styles.readPageBackBtn} style={{marginLeft:"2px"}}>
                 Next <i class='fas fa-caret-square-right' style={{fontSize:"small",marginLeft:"4px"}}></i>
          </button>
          </div>
          {/* {console.log("history length",window.history.length)} */}
          {/* <div class={ styles.blogArrow} style={{display:"flex", height:"50px", alignItems:"center",justifyContent:"space-between",}}>
                 <div style={{ display: "flex", justifyContent: "space-between", marginRight:"0px" }}>
            <div className={styles.navigationWrapperbtn}>
             
              <button onClick={descIndex} style={{ display: "flex",gap:"10px", alignItems:"center", padding: "6px", paddingLeft:"0px" }}className={styles.navigationbtn} >
              <i class='fas fa-caret-square-left'></i>Prev
              </button>
              <div style={{display:"flex",alignItems:"center"}}>{index +1}</div>
              <button onClick={incIndex} style={{ display: "flex", alignItems:"center", padding: "6px" }} className={styles.navigationbtn} >
               Next<i class='fas fa-caret-square-right'></i>
              </button>
             
            </div>
          </div>
        </div> */}

              <h1 style={{textAlign:"center", fontSize:"40px", whiteSpace:"no", marginTop:"10px",marginRight:"0px"}}>{jobs?.jobTitle?jobs.jobTitle.charAt(0).toUpperCase()+jobs.jobTitle.substring(1):"Loading..."}</h1>
           {/* <div style={{display:" flex",flexDirection:"column"}}> */}
           {/* <button style={{ marginRight:"4px"}}class={styles.readPageBackBtn} onClick={updateClick} >Share</button> */}
           {/* <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img  class={styles.linkedinLogoDesktop} src={Linkedinlogo} />
      </a> */}
      {/* </div> */}
    <div style={{position:"relative"}}>
    <div ref={buttonRef} onClick={updateClickStatus} style={{ marginRight: "4px" }} className={styles.shareBtnBlog}>
  <i className="fa-solid fa-share" style={{marginLeft:"6px", fontSize: "small", cursor: "pointer" }}></i>
  <p style={{ margin: "0px",fontWeight:"400" }}>Share</p>
</div>

      {shareClicked && (
        <div ref={shareRef} class={styles.shareContainer}>
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
</div>


      </div>    
              <div style={{marginLeft:"12px"}}>
                <span>Posted by {jobs.name}</span> |  
                <span> Posted on : {new Date(jobs.createdAt).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                )}</span> |
                <span> Updated Time : {convertToIST(jobs.updatedAt)}</span>.
                {/* {console.log(jobs)}  */}
              
     </div>
     {/* <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img class={styles.linkedinLogoDesktop} src={Linkedinlogo} style={{visibility:shareClicked?"visible":"hidden"}}/>
      </a> */}



  <table style={{marginLeft:"6px", marginTop:"0px", width:"98.8%", borderCollapse: "collapse",border:"none"}}>         
  
  <tr style={{border:"none"}}>
    <td colSpan={2} style={{border:"none"}}>
    {
      jobdescription? HTMLReactParser(jobdescription.toString()) :""
     } 
    </td>

  </tr>
  </table>
  </div>
  <img style={{marginLeft:"50%",height:"30px",marginBottom:"20px" }}  onClick={()=>{goUp()}} src={Up}/>
          </>
          :
          <>
    <div id={styles.JobCardWrapper} >

              <>
              <div style={{display:"flex",marginLeft:"8px",marginTop:"25px",marginRight:"-6px",alignItems:"center", justifyContent:"space-between"}}>
      
              {/* <div class={styles.mobileReadTopbtnsContainer} style={{backgroundColor:"red"}}> */}
              {/* <button class={styles.readPageBackBtn} onClick={()=>{navigate(-1)}}>Back</button> */}
              <button className={styles.jobdetailBackBtnMobile} 
            onClick={() => {
               if (window.history.length > 1) {
                  navigate(-1);
                 } else {
                    navigate('/Blogs'); 
                  }
             }}>
                 Back
          </button>
              <img style={{height:"30px"}}  onClick={()=>{goDown()}} src={Down}/>
              <div style={{position:"relative"}}>
              <div ref={buttonRef} onClick={updateClickStatus} className={styles.shareBtnMobile}>
  <i className="fa-solid fa-share" style={{ fontSize: "small", cursor: "pointer",marginLeft: "8px"}}></i>
  <p style={{fontWeight:"400" }}>Share</p>
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
 </div>

 <div style={{display:"flex",marginLeft:"8px",marginTop:"11px",marginRight:"-6px",alignItems:"center", gap:"2px"}}>
              {/* <button class={styles.jobdetailBackBtn} onClick={()=>{navigate(-1)}}>Back</button> */}
              <button onClick={descIndex} className={styles.jobdetailBackBtnMobile} style={{fontWeight:"100"}} >
              <i class='fas fa-caret-square-left' style={{ color: "white",marginLeft:"0px", marginLeft:"-2px" }}></i>    Prev
          </button>
          <h2 style={{display:"flex",alignItems:"center",margin:"1px",marginTop:"2px"}}>{index+1}</h2>
          <button onClick={incIndex} className={styles.jobdetailBackBtnMobile} 
            >
             <i class='fas fa-caret-square-right' style={{ color: "white",marginLeft:"0px", marginLeft:"-2px" }}></i>    Next
          </button>
 </div>

                <div className={styles.JobCard} style={{marginTop:"8px"}} >
                {/* <p className={`${styles.Date} ${styles.readPageDate}`}>{new Date(jobs.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </p> */}
                <div className={styles.JobTitleDateWrapper} style={{marginTop:"-4px",display:"flex",gap:"8px"}}>
        <p className={styles.QuestionjobTitle} style={{fontSize:"26px" , marginTop:"2px"}}>{jobs?.jobTitle?jobs.jobTitle.charAt(0).toUpperCase()+jobs.jobTitle.substring(1):"Loading..."}</p>
        <p className={styles.Date} style={{marginTop:"12px",marginRight:"-20px"}}>{new Date(jobs.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </p>
        </div>
     
     <table style={{marginLeft:"6px", marginTop:"0px", width:"95.5%"}}>         
  
  <tr >
    <td colSpan={2} >
    {
      jobdescription? HTMLReactParser(jobdescription.toString()) :""
     } 
    </td>


  </tr>
  </table>  

                </div>
                <img style={{marginLeft:"50%",height:"30px",marginTop:"10px" }}  onClick={()=>{goUp()}} src={Up}/>
             
              </>

            </div>

          </>


              }
                          
        </>

  )
}

      export default Answerdetails