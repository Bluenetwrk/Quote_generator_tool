import React, { useRef } from 'react'
import styles from "./Allobs.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import Footer from '../Footer/Footer';
import { Link, useNavigate, useParams } from "react-router-dom";
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
import JoditEditor from 'jodit-react'
import CustomTextEditor from '../Editor/CustomTextEditor';
// import HTMLReactParser from 'html-react-parser'


function Answerdetails(props) {
  const editor=useRef(null)
  
  let userid = JSON.parse(localStorage.getItem("StudId")) || JSON.parse(localStorage.getItem("EmpIdG"))

  const [CommentName, setCommentName] = useState("")
  const [CommentID, setCommentID] = useState()
  // let CommentName = atob(JSON.parse(localStorage.getItem("Snm")))

  async function getProfile() {
    let userId = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userId +" "+ atob(JSON.parse(localStorage.getItem("StudLog"))) };
    await axios.get(`/StudentProfile/getProfile/${userId}`, {headers})
        .then((res) => {
            let result = res.data.result
            // console.log(result.name)
            // localStorage.setItem("Snm", JSON.stringify(btoa(result.name)))
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
    setcomments({ ...comments, comment: e, name:CommentName})
}


async function handleComment(){
  if(!userid){
    alert("Sign in to join the discussion and comment on this question.")
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

  function deleteComment(){

  }

  const [resumeAlert, setresumeAlert]=useState(false)
  const [deletedid, setDeletedid]=useState("")
            const alertRef = useRef(null);
            useEffect(() => {
              const handleClickOutside = (event) => {
                // If clicked outside alert box and it's open
                if (alertRef.current && !alertRef.current.contains(event.target)) {
                  setresumeAlert(false); // close the alert
                }
              };
            
              document.addEventListener('mousedown', handleClickOutside);
            
              return () => {
                document.removeEventListener('mousedown', handleClickOutside);
              };
            }, []);
  
  return (
    <>

        <p class={styles.blogHeading} style={{fontWeight:"800", marginTop:"15px", marginBottom:"25px", fontSize:"30px"}}> Blogs  </p>

    <div class={styles.blogButtonContainer} style={{display:"flex", marginTop:"20px"}}>
                            {/* <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} /> */}
             <button class={styles.blogBackButton} style={{marginTop:"10px", marginLeft:"0%", cursor:"pointer",}} 
             onClick={()=>{navigate(-1)}}>Back</button>
              
    </div>

      {screenSize.width>850 ?

        <>
    
  <h1 class={styles.answerTitle} style={{textAlign:"start", fontSize:"xx-large"}}>{jobs?.jobTitle?jobs.jobTitle.charAt(0).toUpperCase()+jobs.jobTitle.substring(1):"Loading...."}</h1>
<div style={{textAlign:"center"}}>
  <div class={styles.ansPostedDetails}>
  <span>By {jobs.name}</span>
  <span> . {new Date(jobs.createdAt).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                )}</span> . 
</div>
  
</div>

{jobs.comments &&
  jobs.comments.map((com) => {
    return (
      <div key={com.id}>
        <p className={styles.submittedAnsdiv}>
          <div className={styles.submittedAnsDetail}>
            {HTMLReactParser(com.comment.toString())}
          </div>
          <div className={styles.submittedAnsBy}>({com.name})</div>

          {userid === com.id && (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => {
                  setresumeAlert(true);
                  setDeletedid(com.id); // Store this comment ID
                }}
              >
                Delete
              </button>

              {/* Show alert only if this is the comment selected for deletion */}
              {resumeAlert && deletedid === com.id && (
                <div
                ref={alertRef}
                  style={{
                    width: "250px",
                    padding: "20px",
                    backgroundColor: "rgb(40,4,99)",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "5px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(50%, -60%)",
                    zIndex: 9999,
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                  }}
                >
                  Are you sure you want to delete this answer?
                  <div
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <button
                      onClick={() => {
                        deletComment(deletedid);
                        setresumeAlert(false);
                        setDeletedid(null);
                      }}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      OK
                    </button>
                    <button
                      onClick={() => {
                        setresumeAlert(false);
                        setDeletedid(null);
                      }}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </p>
      </div>
    );
  })}



<div class={styles.ansCommentSection}>   
 {  
     jobs.comments?
     jobs.comments.filter((com)=>{
        return(
       userid===com.id
      //  console.log(com.id===userid)
        )
      }).length<1?<>
      {/* <input placeholder='Answer' maxLength={300} style={{height:"30px", marginLeft:"6px", width:"90%"}} type='text' 
      value={comments.comment} onChange={(e)=>{changeComments(e)}} /> */}
{/* <JoditEditor  ref={editor}   onChange={(e)=>{changeComments(e)}} /> */}
<CustomTextEditor
 ref={editor}
 value={comments.comment} 
        onChange={changeComments}
      />

       <button class={styles.ansBtn} onClick={handleComment} style={{height:"30px", marginLeft:"6px"}}>Answer</button> 
       </>
       :""
      :""
} 

</div>
          </>
          :
          <>
    <div id={styles.JobCardWrapper} >


              <>
                <div className={styles.JobCard} >
                <div className={styles.JobTitleDateWrapper}>
        <p className={styles.QuestionjobTitle} >{jobs?.jobTitle?jobs.jobTitle.charAt(0).toUpperCase()+jobs.jobTitle.substring(1):"Loading...."}</p>
        <p className={styles.Date}>{new Date(jobs.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </p></div>
     
     {jobs.comments &&
  jobs.comments.map((com) => {
    return (
      <table key={com.id} style={{ marginLeft: "6px", marginTop: "0px", width: "98.8%" }}>
        <tbody>
          <tr>
            <td colSpan={2}>
              <p>
                {com.name} : {HTMLReactParser(com.comment.toString())}
              </p>

              {userid === com.id && (
                <>
                  <button
                    onClick={() => {
                      setDeletedid(com.id);
                      setresumeAlert(true);
                    }}
                  >
                    Delete
                  </button>

                  {resumeAlert && deletedid === com.id && (
                    <div
                      ref={alertRef}
                      style={{
                        width: "200px",
                        padding: "20px",
                        backgroundColor: "rgb(40,4,99)",
                        color: "white",
                        fontSize: "12px",
                        borderRadius: "5px",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 9999,
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                      }}
                    >
                      Are you sure you want to delete this comment?
                      <div style={{ marginTop: "15px", display: "flex", justifyContent: "center", gap: "5px" }}>
                        <button
                          onClick={() => {
                            deletComment(deletedid);
                            setDeletedid(false);
                            setDeletedid(null);
                          }}
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          OK
                        </button>
                        <button
                          onClick={() => {
                            setresumeAlert(false);
                            setDeletedid(null);
                          }}
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    );
  })}



{  
     jobs.comments?
     jobs.comments.filter((com)=>{
        return(
       userid===com.id
        )
      }).length<1?<>
             
{/* <JoditEditor  ref={editor}   onChange={(e)=>{changeComments(e)}} /> */}
<CustomTextEditor
 ref={editor}
 value={comments.comment} 
        onChange={changeComments}
      />

       <button onClick={handleComment} style={{height:"30px", marginLeft:"6px"}} class={styles.ansBtn}>Comment</button> 
       </>
       :""
      :""
} 


        
                </div>
              </>

            </div>

          </>


              }
                          
        </>

  )
}

      export default Answerdetails