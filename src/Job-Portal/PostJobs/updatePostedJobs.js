import React,{useRef} from 'react'
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate , useLocation,} from "react-router-dom";
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; 
import CreatableSelect  from "react-select/creatable"
import Arrowimage from '../img/icons8-arrow-left-48.png';
import Footer from '../Footer/Footer';
import useScreenSize from '../SizeHook';
import {jobTags} from "../Tags"
import JoditEditor from 'jodit-react'


import Style from "./postJobs.module.css"
import CustomTextEditor from '../Editor/CustomTextEditor';

function UpdatePostedJobs() {
  const screenSize = useScreenSize();
  const editor=useRef(null)
   
  const location = useLocation()
  let Jobid = location.state.getId
  let navigate= useNavigate()

  // let SuperAdminLogin = localStorage.getItem("SupAdMLog")
  let adminLogin = localStorage.getItem("AdMLog")


 
    const [jobtitle, setJobTitle] = useState("")
    const [Source, setSource] = useState("")
    const [SourceLink, setSourceLink] = useState("")
        const [SourceCompanyLink, setSourceCompanyLink] = useState("")
    
    const [companyName, setCompanyName] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [jobtype, setJobtype] = useState("")
    const [salaryRange, setSalaryRange] = useState("")
    const [joblocation, setJobLocation] = useState("")
    const [qualification, setQualification] = useState("")
    const [experiance, setExperiance] = useState("")
    const [skills, setSkills] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[successMessage, setSuccessMessage] = useState("")

    const [others, setOthers] = useState(false)
    const [otherJobLocation, setotherJobLocation] = useState(false)

    const [profileData, setProfileData] = useState([])
    const [Tags, setTag] = useState([])
    // const Tags=tag.map((tag,i)=>{
    //     return(
    //         tag.value
    //     )
    // })

    async function handleTags(key) {
        setSkills((prev=>prev+" "+key))
        const isIndex=Tags.findIndex((present)=>{
            return(
              present===key
            )
                })
                if(isIndex<0){
                    setTag([...Tags, key])
                }else{
                  const IndexId=Tags.filter((present)=>{
                    return(
                      present!==key
                    )
                        })
                        setTag(IndexId)
                        // Active.splice(IndexId,1)
    }
}

    function handleChange(tag){
        setTag(tag)
    }

    async function getPostedJobs(){
        // let userid = JSON.parse(localStorage.getItem("EmpIdG"))
        // const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("EmpLog"))) };
    const headers = { authorization: 'BlueItImpulseWalkinIn' };

       await axios.get(`/jobpost/getJobForUpdate/${Jobid}`, {headers})
       .then((res)=>{
        let result=res.data
        // console.log(result)
        if(result){
        setJobTitle(result.jobTitle)
            setJobDescription(result.jobDescription)
            setSalaryRange(result.salaryRange)
            setJobLocation(result.jobLocation[0].toUpperCase()+result.jobLocation.slice(1))
            setQualification(result.qualification)
            setExperiance(result.experiance)
            setSkills(result.skills)
            setJobtype(result.jobtype)
            setCompanyName(result.companyName)
            setTag(result.Tags)
            setSource(result.Source)
            setSourceLink(result.SourceLink)
        }
       }).catch((err)=>{
        alert("server issue occured")
       })
    }

    useEffect(()=>{
        getPostedJobs()
    },[])

    async function updateJob(){
        // let userid = JSON.parse(localStorage.getItem("EmpIdG"))
        // const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("EmpLog"))) };
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
        let jobTitle = jobtitle.toLowerCase()
        let jobLocation = joblocation.toLowerCase()
    await axios.put(`/jobpost/updatPostedJob/${Jobid}`,{ jobTitle, SourceLink, Source, companyName,SourceCompanyLink,
         jobDescription, jobtype, salaryRange, jobLocation, qualification, experiance, skills, Tags},{headers})
    .then((res)=>{
        let result = (res.data)
        if(result=="success"){
            // setJobTitle("")
            // setJobDescription("")
            // setSalaryRange("")
            // setJobLocation("")
            // setQualification("")
            // setExperiance("")
            // setSkills("")
            setSuccessMessage("Job Listing Updated Successfully")
        }
        
    }).catch((err)=>{
        alert("server issue occured", err)
    })
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
}


window.addEventListener('keypress', function(event){
    
    // Get the key code
    let keycode = event.which || event.keyCode;
    
    // Check if key pressed is a special character
    if(keycode < 32 || 
     (keycode > 32 && keycode < 44) || 
     (keycode > 44 && keycode < 48) || 
     (keycode > 57 && keycode < 65) || 
     (keycode > 90 && keycode < 97) ||
     keycode > 122
    ){
        // Restrict the special characters
        event.preventDefault();  
        // alert("special characters are not allowed")
        return false;
    }
  }); 

    return (
        <>
            <div className={Style.postJobPageWrapper}>
          <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} />

                <div className={Style.postJobWrapper}>
                <p className={Style.successmessage}>{successMessage} </p>
                <p className={Style.errormessage}>{errorMessage} </p>

     <h4 className={Style.jobHeadline}>Job title</h4>
    <input maxLength="100" className={Style.inputbox} type="text" value={jobtitle} onChange={(e) => { setJobTitle(e.target.value) }} />
{adminLogin?
<>
 <hr style={{marginTop:"50px"}}></hr>
                                       <h4 className={Style.jobHeadline}  >Job Post Source &nbsp;<span className={Style.hint}>(e.g Linkedin, Noukri, indeed etc.)</span></h4>
                                        <input maxLength="20" className={Style.inputbox} type="text" value={Source} onChange={(e) => { setSource(e.target.value) }} />

                                        <h4 className={Style.jobHeadline}  > Job Post Source Link</h4>
                                        <input className={Style.inputbox} type="text" value={SourceLink} onChange={(e) => { setSourceLink(e.target.value) }} />
                                                                              
                                        <hr style={{marginBottom:"50px", marginTop:"30px"}}></hr>
                              
</>
:""
}

                    <h4 className={Style.jobHeadline}>Company Name**</h4>
                    <input maxLength="30" className={Style.inputbox} type="text" value={companyName} onChange={(e) => { setCompanyName(e.target.value) }} />

                    <h4 className={Style.jobHeadline}>Job Description</h4>
                    {/* <input className={Style.inputbox} type="text" value={jobDescription} onChange={(e) => { setJobDescription(e.target.value) }} /> */}
                    {/* <Editor
         toolbarClassName="toolbarClassName"
         wrapperClassName="wrapperClassName"
         editorClassName="editorClassName"
         wrapperStyle={{ width: "100%", marginLeft:"0px", border: "1px solid black", borderRadius:"4px" }}
         className={Style.inputbox}
         onChange={(e)=>{ setJobDescription(e.blocks) }}
      /> */}
{/* <JoditEditor  ref={editor} className={Style.inputbox} value={jobDescription?jobDescription.toString():""} onChange={(e)=>{setJobDescription(e)}} /> */}
<CustomTextEditor
 ref={editor} className={Style.inputbox} 
        value={jobDescription?jobDescription.toString():""}
        onChange={setJobDescription}
      />

<h4 className={Style.jobHeadline}>Job Tags (Select multiple Tags to reach the best Matching Jobs)</h4>

<div className={Style.JobtitleFilterWrapper}>
            {/* <buton className={ Active.length===0? Style.active:Style.JobtitleFilter} onClick={() => { getjobs() }}>All</buton> */}
            {
              jobTags.map((tags, i) => {
                return (
                                   
                  <button disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                    className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                    Style.TagHeading: 
                    //  Active === tags.value ? 
                    Tags.findIndex(  (present)=>{
                      return(
                        present===tags.value
                      )
                          }) >=0?
                     Style.active : Style.JobtitleFilter} 
                     onClick={ () => {  handleTags(tags.value) }}
                     >{tags.value} </button>
                
                  )
              })
            }
          </div>

<h4 className={Style.jobHeadline}>Job Type</h4>
                                 
                                 <label><input name="Job-Type" type="radio" checked={jobtype==="Full Time"} value="Full Time" onChange={(e) => { setJobtype(e.target.value) }} />Full Time  </label>
                                 <label><input name="Job-Type" type="radio" checked={jobtype==="Part Time"} value="Part Time" onChange={(e) => { setJobtype(e.target.value) }} />Part Time  </label>
                                 <label><input name="Job-Type" type="radio" checked={jobtype==="Internship"} value="Internship" onChange={(e) => { setJobtype(e.target.value) }} />Internship </label>
                                 <label><input name="Job-Type" type="radio" checked={jobtype==="Contract"} value="Contract" onChange={(e) => { setJobtype(e.target.value) }} />Contract   </label>


                                 <h4 className={Style.jobHeadline}>Salary Per Annum in Lakhs** &nbsp;<span className={Style.hint}>(e.g 5 or 10)</span></h4>
                                 <input maxLength="3" className={Style.inputbox} type="number" value={salaryRange} onChange={(e) => { setSalaryRange(e.target.value) }} />

                                 <h4 className={Style.jobHeadline}>Job Location**</h4>
                                 <div style={{marginTop:"-10px"}}>
                                 <label><input name="Location" type="radio" checked={joblocation==="Bangalore"} value="Bangalore" onChange={(e) => { setJobLocation(e.target.value) }} />Bangalore </label>
                                 <label><input name="Location" type="radio" checked={joblocation==="Hyderabad"} value="Hyderabad" onChange={(e) => { setJobLocation(e.target.value) }} />Hyderabad </label>
                                 <label><input name="Location" type="radio" checked={joblocation==="Chennai"} value="Chennai" onChange={(e) => { setJobLocation(e.target.value) }} />Chennai </label>
                                 <label><input name="Location" type="radio" checked={joblocation==="Mumbai"} value="Mumbai" onChange={(e) => { setJobLocation(e.target.value) }} />Mumbai </label>
                                 <label><input name="Location" type="radio" checked={joblocation==="Delhi"} value="Delhi" onChange={(e) => { setJobLocation(e.target.value) }} />Delhi </label>
                                 <label><input name="Location" type="radio" value="others" onClick={(e) => { setotherJobLocation((prev)=>!prev) }} />others </label>
                                 </div>
                                 {
                                     otherJobLocation?
                                 <input maxLength="10" className={Style.Otherinputbox} type="text" value={joblocation} onChange={(e) => { setJobLocation(e.target.value) }} />
                                 :
                                 ""
                                 }

                                 <h4 className={Style.jobHeadline}>Qualification Needed**</h4>

                                 <div style={{marginTop:"-10px"}}>
                                 <label><input name="Qualification" type="radio" checked={qualification==="B.E/CSE"} value="B.E/CSE" onChange={(e) => { setQualification(e.target.value) }} />B.E/CSE </label>
                                 <label><input name="Qualification" type="radio" checked={qualification==="B.E/Civil"} value="B.E/Civil" onChange={(e) => { setQualification(e.target.value) }} />B.E/Civil </label>
                                 <label><input name="Qualification" type="radio" checked={qualification==="B.E/Mech"} value="B.E/Mech" onChange={(e) => { setQualification(e.target.value) }} />B.E/Mech </label>
                                 <label><input name="Qualification" type="radio" checked={qualification==="B.E/ECE"} value="B.E/ECE" onChange={(e) => { setQualification(e.target.value) }} />B.E/ECE </label>
                                 <label><input name="Qualification" type="radio" checked={qualification==="B.E/IT"} value="B.E/IT" onChange={(e) => { setQualification(e.target.value) }} />B.E/IT </label>
                                 <label><input name="Qualification" type="radio"  value="others" onClick={(e) => { setOthers((prev)=>!prev) }} />others </label>
                                 </div>
                                 {
                                     others ?
                                         <input className={Style.Otherinputbox} type="text" value={qualification} onChange={(e) => { setQualification(e.target.value) }} />

                                         : ""

                                 }


                                 <h4 className={Style.jobHeadline}>Experience Needed** &nbsp;<span className={Style.hint}>(e.g 5 or 10)</span></h4>
                                 <input maxLength="3" className={Style.inputbox} type="number" value={experiance} onChange={(e) => { setExperiance(e.target.value) }} />

                                 <h4 className={Style.jobHeadline}>Skills Needed**</h4>
                               
                                 <input maxLength="100" className={Style.inputbox} type="text" value={skills} disabled
                                  onChange={(e) => { setSkills(e.target.value) }} 
                                  />
                                
                                 {/* <h4 className={Style.jobHeadline}>Tags</h4>
                  <div>
                    <CreatableSelect  
                   isMulti={true}
                   options={jobTags}
                   value={Tags}
                   onChange={handleChange}     
                 />
                  </div> */}
                    {/* <button className={Style.button} onClick={updateJob}>Update</button> */}
                </div >

                <div style={{display:"flex", justifyContent:"center"}}>
                   <button style={{width:"210px"}} className={Style.button} onClick={updateJob}>Update</button>
                </div>
                
            </div >

            {screenSize.width > 750 ?
""
:
            <div style={{marginTop:"20px"}}>
          <Footer/>
        </div>
}
        </>

    )
}

export default UpdatePostedJobs