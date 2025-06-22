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

function PostJobs(props) {
    const screenSize = useScreenSize();

    const editor=useRef(null)
    // useEffect(() => {
    //     const socket = socketIO.connect(props.url, {
    //         auth: {
    //             token: JSON.parse(localStorage.getItem("EmpIdG"))
    //         }
    //     });
    // }, [])

    let empId = JSON.parse(localStorage.getItem("EmpIdG"))
    const [jobtitle, setJobTitle] = useState("")
    const [Source, setSource] = useState("")
    const [SourceLink, setSourceLink] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [jobtype, setJobtype] = useState("")
    const [salaryRange, setSalaryRange] = useState("")
    const [joblocation, setJobLocation] = useState("")
    const [qualification, setQualification] = useState("")
    const [experiance, setExperiance] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [Logo, setLogo] = useState()
    const [other, setother] = useState(false)
    const [others, setOthers] = useState(false)
    const [otherJobLocation, setotherJobLocation] = useState(false)

  const [Active, setActive] = useState([])

    const [profileData, setProfileData] = useState([])
    const [Tags, setTag] = useState([])

    const [skills, setSkills] = useState("")
    const [concent, setconcent] = useState(true)

    // function handleChange(tag) {
    //     setTag(tag)
    //     const Tagskills=tag.map((tag,i)=>{
    //         return(
    //             tag.value
    //         )
    //     })
    //     setSkills(Tagskills.toString())        
    // }

    function handleSalary(e){
        const sanitizedValue = e.target.value.replace(/[A-Za-z]/g, '');
        // if(e.target.value.includes(/[1-9]/g))
            if (sanitizedValue.length>2){
            return false
        }else{
            setSalaryRange(sanitizedValue)
        }
    }

    function handleExperiance(e){
        const sanitizedValue = e.target.value.replace(/[A-Za-z]/g, '');
        // if(e.target.value.includes(/[1-9]/g))
            if (sanitizedValue.length>2){
            return false
        }else{
        setExperiance(sanitizedValue)
        }
    }

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

// useEffect(()=>{
//     console.log("job description:-",jobDescription)
// })

    async function postJob() {
        let userid = JSON.parse(localStorage.getItem("EmpIdG"))
        const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("EmpLog"))) };
        // console.log("hdh",jobDescription)
        let jobTitle = jobtitle.toLowerCase()
        let jobLocation = joblocation.toLowerCase()
        await axios.post("/jobpost/jobpost/", {
            Logo, SourceLink, Source, empId, jobTitle, companyName,
            jobDescription, jobtype, salaryRange, jobLocation, qualification, experiance, skills, Tags
        }, { headers })
            .then((res) => {
                let result = (res.data)
                console.log(result)
                if (result == "success") {
                    setJobTitle("")
                    setJobDescription("")
                    // setCompanyName("")
                    setJobtype("")
                    setJobLocation("")
                    setQualification("")
                    setSalaryRange("")
                    setJobLocation("")
                    setExperiance("")
                    setExperiance("")
                    setSkills("")
                    setTag([])
                    setSuccessMessage("Success! job successfully posted")
                }
                else if (result == "field are missing") {
                    setSuccessMessage("Alert!... JobTitle, CompanyName JobDescription, Experience, JobLocation and Skills must be filled")
                }
                // else if (result ==="server issue")
                else
                    {
                    setSuccessMessage("something went wrong, Could not save your Jobs post")
                }
            }).catch((err) => {
                alert("server issue occured", err)
            })
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    
    function handlejobtitle(e){ 
     setJobTitle(e.target.value)                    
    }

    function handleRadioTags(e){
        // setTag([...Tags, e])
        handleTags(e)
        if(e<10){
        handleTags("<10L")
        }
        else if(e<20 && e>10){
        handleTags("10 to 20L")
        }
        else if(e<30 && e>20){
        handleTags("20 to 30L")
        }
       else if(e>=30){
        handleTags("30 and above")
        }
        
    }
    function handleExpButton(e){
        if(e<5){
            handleTags("2 to 5 Yrs")
            }
            else if(e>5 && e<11){
                handleTags("6 to 10 Yrs")
            }
            else if(e>10 && e<16){
                handleTags("11 to 15 Yrs")
            }
            else if(e>15){
                handleTags("16 and above Yrs")
            }
    }

    const [count, setCount]=useState(1)

    async function handleTags(key) {
if(key==='Full Time' ||key=== 'Contract' || key==='Internship' || key==='Part Time'){
    setJobtype(key)
}
        // setSkills((prev)=>prev ? prev + ", " + key : key)
        // setSkills(Tags)
        const isIndex=Tags.findIndex((present)=>{
            return(
              present===key
            )
                })
                if(isIndex<0){
                    setTag([...Tags, key])
                    setSkills((prev)=>prev ? prev + ", " + key : key)
                    // setSkills([...skills, key])
                }else{
                  const IndexId=Tags.filter((present)=>{
                    return(
                      present!==key
                    )
                        })
                        setTag(IndexId)

                      let str=IndexId.toString().split(",").join(", ")
                        setSkills(str)

                    // setSkills((prev)=>prev.length>=0 ?  IndexId : "," + IndexId)
    }
}

const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  const tooltipRef = useRef(null);

  useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          tooltipRef.current && !tooltipRef.current.contains(event.target)
        ) {
          setShowTooltip(false);
        }
       
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
                                        {/* <button className={Style.searchButton} onClick={() => {
                                    navigate("/Search-Candidate")
                                }}>Search Candidate</button> */}

            {
                profileData.map((items, i) => {
                    return (
                        items.isApproved ?

                            <div key={i}>

                                {Logo ? <img className={Style.logo} src={Logo} /> :
                                    <p style={{ color: "red", marginLeft: "5%", fontStyle: "italic" }}> Reminder! Your Company logo is missing,Kindly upload it to complete your profile.</p>}
                                {/* <h3 style={{ color: "blue", marginLeft: "15%" }}>Welcome to Post job Page, Post a Job and get Connected with Job Seekers</h3> */}

                                <div className={Style.postJobPageWrapper} >
                                    <div className={Style.postJobWrapper}>
                                        <p className={successMessage === "Success! job successfully posted" ?
                                            Style.successmessage : Style.errormessage}>{successMessage} </p>
                                        {/* <p className={Style.errormessage}>{errorMessage} </p> */}
                                        <h4 className={Style.jobHeadline}  >Job title**</h4>
                                        <input maxLength="100" className={Style.inputbox} type="text" value={jobtitle} onChange={(e) => { handlejobtitle(e) }} />
                                        {/* <div className={Style.jobHeadline}>
                                        <label><input name="Job-Type" type="radio" value={other}  onClick={(e) => { setother((prev)=>!prev)} } />Select, if Job Source is from other Job Portal Site </label>
</div>
    
                               { other?
                               <>
                                       <h4 className={Style.jobHeadline}  >Source &nbsp;<span className={Style.hint}>(e.g Linkedin, Noukri, indeed etc.)</span></h4>
                                        <input maxLength="20" className={Style.inputbox} type="text" value={Source} onChange={(e) => { setSource(e.target.value) }} />

                                        <h4 className={Style.jobHeadline}  >Source Link</h4>
                                        <input className={Style.inputbox} type="text" value={SourceLink} onChange={(e) => { setSourceLink(e.target.value) }} />
                               </>
                                :""
                                    } */}
                                        <p className={Style.jobHeadline}>Company Name** &nbsp;<span className={Style.hint}>(Company name cannot be edited ,taken automatically from the profile section)</span></p>
                                        <input maxLength="30" className={Style.inputbox} type="text" value={companyName} disabled />


                                        <h4 className={Style.jobHeadline}>Job Description**</h4>
                                        {/* <input maxLength="100" className={Style.inputbox} type="text" value={jobDescription} onChange={(e) => { setJobDescription(e.target.value) }} /> */}
                                        {/* <Editor
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                            wrapperStyle={{ width: "100%", marginLeft: "0px", border: "1px solid black", borderRadius: "4px" }}
                                            className={Style.inputbox}
                                            onChange={(e) => { setJobDescription(e.blocks) }}
                                        /> */}
{/* <JoditEditor  ref={editor} className={Style.inputbox} value={jobDescription.toString()} onChange={(e)=>{setJobDescription(e)}} /> */}
{/* <CustomTextEditor ref={editor} className={Style.inputbox} value={jobDescription.toString()} onChange={(e)=>{setJobDescription(e)}}/> */}
<CustomTextEditor
 ref={editor} className={Style.inputbox} 
        value={jobDescription}
        onChange={setJobDescription}
      />
                                        <p className={Style.jobHeadline}>Job Tags <span className={Style.hint}>(Select multiple Tags to reach the best Matching Candidates)</span></p>

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

                                        <label><input name="Job-Type" type="radio" checked={jobtype === "Full Time" || Tags.filter} value="Full Time" onChange={(e) => { setJobtype(e.target.value) }} />Full Time  </label>
                                        <label><input name="Job-Type" type="radio" checked={jobtype === "Part Time"} value="Part Time" onChange={(e) => { setJobtype(e.target.value) }} />Part Time  </label>
                                        <label><input name="Job-Type" type="radio" checked={jobtype === "Internship"} value="Internship" onChange={(e) => { setJobtype(e.target.value)}} />Internship </label>
                                        <label><input name="Job-Type" type="radio" checked={jobtype === "Contract"} value="Contract" onChange={(e) => { setJobtype(e.target.value) }} />Contract   </label>
                                        <div style={{ position: "relative" }}>
  <h4 className={Style.jobHeadline}>Job Location**</h4>

  <div
    ref={tooltipRef} // ⬅ attach ref to parent of both icon and tooltip
    className={Style.JobAlerti}
    onClick={toggleTooltip}
  >
    i
    {showTooltip && (
      <div
        className={Style.jobIdesc}
      >
        Job Location: Bangalore Only. Kindly ensure that all applications align with this specified location.
      </div>
    )}
  </div>
</div>

                                        <div style={{ marginTop: "-10px" }}>
                                            <label><input name="Location" type="radio" checked={joblocation === "Bangalore"} value="Bangalore" onChange={(e) => { setJobLocation(e.target.value); setotherJobLocation(false) }} />Bangalore </label>
                                            {/* <label><input name="Location" type="radio" checked={joblocation === "Hyderabad"} value="Hyderabad" onChange={(e) => { setJobLocation(e.target.value); setotherJobLocation(false) }} disabled />Hyderabad </label>
                                            <label><input name="Location" type="radio" checked={joblocation === "Chennai"} value="Chennai" onChange={(e) => { setJobLocation(e.target.value); setotherJobLocation(false) }} disabled />Chennai </label>
                                            <label><input name="Location" type="radio" checked={joblocation === "Mumbai"} value="Mumbai" onChange={(e) => { setJobLocation(e.target.value); setotherJobLocation(false) }} disabled />Mumbai </label>
                                            <label><input name="Location" type="radio" checked={joblocation === "Delhi"} value="Delhi" onChange={(e) => { setJobLocation(e.target.value); setotherJobLocation(false) }} disabled />Delhi </label>
                                            <label><input name="Location" type="radio" value="others" onClick={(e) => { setotherJobLocation((prev) => !prev); setJobLocation("") }} />others </label> */}
                                        </div>
                                        {
                                            otherJobLocation ?
                                                <input maxLength="10" className={Style.Otherinputbox} type="text" value={joblocation} onChange={(e) => { setJobLocation(e.target.value) }} />
                                                :
                                                ""
                                        }

                                        <h4 className={Style.jobHeadline}>Qualification Needed**</h4>

                                        <div style={{ marginTop: "-10px" }}>
                                            <label><input name="Qualification" type="radio" checked={qualification === "B.E/CSE"} value="B.E/CSE" onChange={(e) => { setQualification(e.target.value); setOthers(false); }} />B.E(CSE) </label>
                                            <label><input name="Qualification" type="radio" checked={qualification === "B.E/Civil"} value="B.E/Civil" onChange={(e) => { setQualification(e.target.value); setOthers(false); }} />B.E(Civil) </label>
                                            <label><input name="Qualification" type="radio" checked={qualification === "B.E/Mech"} value="B.E/Mech" onChange={(e) => { setQualification(e.target.value); setOthers(false); }} />B.E(Mech) </label>
                                            <label><input name="Qualification" type="radio" checked={qualification === "B.E/ECE"} value="B.E/ECE" onChange={(e) => { setQualification(e.target.value); setOthers(false); }} />B.E(ECE) </label>
                                            <label><input name="Qualification" type="radio" checked={qualification === "B.E/IT"} value="B.E/IT" onChange={(e) => { setQualification(e.target.value); setOthers(false); }} />B.E(IT) </label>
                                            {/* <label><input name="Qualification" type="radio" value="others" onClick={(e) => { setOthers((prev) => !prev); setQualification("") }} />others </label> */}
                                            <label><input name="Qualification" type="radio" value="others" onChange={(e) => { setQualification(e.target.value); setOthers(true); }} />others </label>
                                             {/* {console.log("qualification",qualification)} */}
                                        </div>
                                        {
                                            others ?
                                                <input className={Style.Otherinputbox} type="text" value={qualification} onChange={(e) => { setQualification(e.target.value) }} />

                                                : ""

                                        }
                                       <div style={{position:"relative"}} >
                                           <h4 className={Style.jobHeadline}>Salary Per Annum in Lakhs** &nbsp;<span className={Style.hint}>(e.g 5 or 10)</span></h4>
                                           <input maxLength="3" className={Style.inputbox} type="number" value={salaryRange} onChange={(e) => { handleSalary(e) }} />
                                           <span className={Style.suffix}>{salaryRange===""?"":"LPA"}</span>
                                        </div>

                                        <div style={{position:"relative"}} >
                                        <h4 className={Style.jobHeadline}>Experience Needed** &nbsp;<span className={Style.hint}>(e.g 5 or 10)</span></h4>
                                        <input maxLength="3" className={Style.inputbox} type="number" value={experiance} onChange={(e) => { handleExperiance(e) }} />
                                        <span className={Style.suffix}>{experiance===""?"":"YRS"}</span>
                                        </div>
                                        {/* <h4 className={Style.jobHeadline}>Skill Tags**</h4>
                                        <div>
                                            <CreatableSelect
                                                isMulti={true}
                                                options={jobTags}
                                                value={Tags}
                                                onChange={handleChange}
                                            />
                                        </div> */}
                                        <h4 className={Style.jobHeadline}>Skills Needed**</h4>

<input maxLength="100" value={skills} className={Style.inputbox} disabled type="text"
// onChange={(e)=>{setSkills(e.target.value)}} 
/>
<p><input type="checkbox" onChange={()=>{setconcent((prev)=>!prev)}}/>
I have read and understood the  <span style={{color:"blue", cursor:"pointer"}} onClick={()=>(window.open("/TermsAndCondition"))}>terms and conditions</span> IT Walkin , and I fully agree to them before posting jobs .</p>



                                        {Logo ? <p ><span style={{ color: "blue" }}>Note** :</span> Logo will also be posted with the Job</p> : ""}
                                        <div style={{display:"flex", justifyContent:"center"}}>
                                        <button style={{width:"210px"}} disabled={concent} className={concent? Style.disableButton:Style.button} onClick={postJob}>Post Job</button>
                                        </div>
                                    </div >
                                </div >
                            </div>
                            : <p style={{ color: "red", fontStyle: "italic", marginLeft: "20px" }}>Your account is being verified.Once your account gets verified,then you will be able to post a Job</p>

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

export default PostJobs