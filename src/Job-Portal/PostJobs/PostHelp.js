import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import Companylogo from "../img/logo.png"
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import JoditEditor from 'jodit-react'
import HTMLReactParser from 'html-react-parser'
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Style from "./postJobs.module.css"
import socketIO from 'socket.io-client';
import CreatableSelect from "react-select"
import useScreenSize from '../SizeHook';
import {jobTags} from "../Tags"
import CustomTextEditor from '../Editor/CustomTextEditor'

// import CreatableSelect  from 'react-select/creatable';

function PostHelp(props) {
    const screenSize = useScreenSize();

    const editor=useRef(null)
    

    let empId = JSON.parse(localStorage.getItem("EmpIdG"))
    const [helptitle, setHelpTitle] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [helpDescription, setHelpDescription] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [Logo, setLogo] = useState()
    const [profileData, setProfileData] = useState([])
 
   const [concent, setconcent] = useState(true)


    let navigate = useNavigate()

    async function getProfile() {
        const headers = { authorization: 'BlueItImpulseWalkinIn' };

        await axios.get(`/EmpProfile/getProfile/${empId}`, { headers })
            .then((res) => {
                let result = res.data.result
                let companyName = res.data.result.CompanyName
                setProfileData([result])
                setCompanyName(companyName)
            }).catch((err) => {
                alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getProfile()
    }, [])

    async function getLogo() {
        let userid = JSON.parse(localStorage.getItem("EmpIdG"))
        const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("EmpLog"))) };
        await axios.get(`/EmpProfile/getLogo/${empId}`, { headers })
            .then((res) => {
                let result = res.data
                setLogo(result)
            }).catch((err) => {
                alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getLogo()
    }, [])

    async function postHelp() {
        // console.log(helptitle)
        // console.log(helpDescription)
    }
    async function postJob() {
        // let userid = JSON.parse(localStorage.getItem("EmpIdG"))
        // const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("EmpLog"))) };

        // let jobTitle = jobtitle.toLowerCase()
        // let jobLocation = joblocation.toLowerCase()
        // await axios.post("/jobpost/jobpost/", {
        //     Logo, SourceLink, Source, empId, jobTitle, companyName,
        //     jobDescription, jobtype, salaryRange, jobLocation, qualification, experiance, skills, Tags
        // }, { headers })
        //     .then((res) => {
        //         let result = (res.data)
        //         console.log(result)
        //         if (result == "success") {
        //             setJobTitle("")
        //             setJobDescription("")
                    // setCompanyName("")
                //     setJobtype("")
                //     setJobLocation("")
                //     setQualification("")
                //     setSalaryRange("")
                //     setJobLocation("")
                //     setExperiance("")
                //     setExperiance("")
                //     setSkills("")
                //     setTag([])
                //     setSuccessMessage("Success! job successfully posted")
                // }
                // else if (result == "field are missing") {
                //     setSuccessMessage("Alert!... JobTitle, CompanyName JobDescription, Experiance, JobLocation and Skills must be filled")
                // }
                // else if (result ==="server issue")
                // else
                //     {
                //     setSuccessMessage("something went wrong, Could not save your Jobs post")
                // }
        //     }).catch((err) => {
        //         alert("server issue occured", err)
        //     })
        // window.scrollTo({
        //     top: 0,
        //     behavior: "smooth"
        // });
    }
    
    function handlehelptitle(e){ 
     setHelpTitle(e.target.value)                    
    }

  
    return (
        <>

            {
                profileData.map((items, i) => {
                    return (
                        items.isApproved ?

                            <div key={i}>
                                  <h2 style={{marginLeft:"10%"}}  class={Style.helpHeading} >Post Help Questions</h2>   
                                <div className={Style.postJobPageWrapper} >
                                    <div className={Style.postJobWrapper} style={{marginBottom:"-220px"}}>
                                        <p className={successMessage === "Success! job successfully posted" ?
                                            Style.successmessage : Style.errormessage}>{successMessage} </p>
                                    
                                        <h4 className={Style.jobHeadline}  >Help Question</h4>
                                        <input maxLength="100" className={Style.inputbox} type="text" value={helptitle} onChange={(e) => { handlehelptitle(e) }} />
                                        
 <div style={{marginTop:"20px",display:"flex",flexDirection:"column"}}>  
    <h4 style={{marginLeft:"7PX"}}>Help Descriptions</h4> 
    <div className={`screen3`}>                                 
   {/* <JoditEditor  ref={editor} className={Style.inputbox} value={helpDescription.toString()} onChange={(e)=>{setHelpDescription(e)}} /> */}
   <CustomTextEditor
 ref={editor} className={Style.inputbox} 
        value={helpDescription}
        onChange={setHelpDescription}
      />
   </div>
</div>  
<p><input type="checkbox" onChange={()=>{setconcent((prev)=>!prev)}}/>
    I have read the terms and conditions of ITwalkin.com and I agree to all the 
     <span style={{color:"blue", cursor:"pointer"}} onClick={()=>(window.open("/TermsAndCondition"))}> terms and conditons</span> before posting the Help Questions </p>


                                        {Logo ? <p ><span style={{ color: "blue" }}>Note** :</span> Logo will also be posted with the Job</p> : ""}
                                        <div style={{display:"flex", justifyContent:"center"}}>      
                                        <button style={{width:"25%"}} disabled={concent} className={concent? Style.disableButton:Style.button} onClick={postHelp}>Submit</button>
                                        </div>
                                    </div >
                                </div >
                            </div>
                            : <p style={{ color: "red", fontStyle: "italic", marginLeft: "20px" }}>Your account is in under verification process, Once your account gets verified, then you will be able to post a Job</p>

                    )

                })
            }
           {screenSize.width > 750 ?
""
:
            <div style={{marginTop:"250px"}}>
          <Footer/>
        </div>
}
        </>

    )
}

export default PostHelp