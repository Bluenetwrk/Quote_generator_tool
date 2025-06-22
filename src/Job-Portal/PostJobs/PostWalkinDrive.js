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

function PostWalkinDrive(props) {
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
    const [applyLink, setApplyLink] = useState("")
    const [concent, setconcent] = useState(true)

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
        //             // setCompanyName("")
        //             setJobtype("")
        //             setJobLocation("")
        //             setQualification("")
        //             setSalaryRange("")
        //             setJobLocation("")
        //             setExperiance("")
        //             setExperiance("")
        //             setSkills("")
        //             setTag([])
        //             setSuccessMessage("Success! job successfully posted")
        //         }
        //         else if (result == "field are missing") {
        //             setSuccessMessage("Alert!... JobTitle, CompanyName JobDescription, Experiance, JobLocation and Skills must be filled")
        //         }
        //         // else if (result ==="server issue")
        //         else
        //             {
        //             setSuccessMessage("something went wrong, Could not save your Jobs post")
        //         }
        //     }).catch((err) => {
        //         alert("server issue occured", err)
        //     })
        // window.scrollTo({
        //     top: 0,
        //     behavior: "smooth"
        // });
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

const [selectedDate, setSelectedDate] = useState("");
const [selectedTime, setSelectedTime] = useState("");


  const venueInputRef = useRef(null);
  const[venue, setVenue]=useState("");
    // useEffect(() => {
    //   if (venueInputRef.current && !venueInputRef.current.autocomplete) {
    //     const autocomplete = new window.google.maps.places.Autocomplete(venueInputRef.current, {
    //       fields: ["formatted_address", "geometry", "address_components", "place_id", "name"],
    //     });
    
    //     autocomplete.addListener("place_changed", () => {
    //       const place = autocomplete.getPlace();
    //       if (place && place.formatted_address) {
    //         const displayValue =
    //           place.name && place.name !== place.formatted_address
    //             ? `${place.name}, ${place.formatted_address}`
    //             : place.formatted_address;
    
    //         setVenue(displayValue);
    //       }
    //     });
    
    //     venueInputRef.current.autocomplete = autocomplete; // attach instance
    //   }
    // }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        if (
          window.google &&
          window.google.maps &&
          window.google.maps.places &&
          venueInputRef.current &&
          !venueInputRef.current.autocomplete
        ) {
          const autocomplete = new window.google.maps.places.Autocomplete(venueInputRef.current, {
            fields: ["formatted_address", "geometry", "address_components", "place_id", "name"],
          });
    
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place && place.formatted_address) {
              const displayValue =
                place.name && place.name !== place.formatted_address
                  ? `${place.name}, ${place.formatted_address}`
                  : place.formatted_address;
    
              setVenue(displayValue);
            }
          });
    
          venueInputRef.current.autocomplete = autocomplete;
          clearInterval(interval); // stop checking once loaded
        }
      }, 300); // check every 300ms
    
      return () => clearInterval(interval);
    }, []);
    
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

            {
                profileData.map((items, i) => {
                    return (
                        items.isApproved ?

                            <div key={i} style={{display:"flex", justifyContent:"center"}}>
                                <div className={Style.dirveContainer}>
                               <h2  >Post Walkin Drive</h2> 
                               {/* <div className={Style.dirveContainer}> */}

                               <p className={successMessage === "Success! job successfully posted" ?
                                            Style.successmessage : Style.errormessage}>{successMessage} </p>
                               <div className={Style.dirvefirstRow}>
                                  <div className={Style.dirvesubContainer}>
                                    <h4 className={Style.heading}>Job title**</h4>
                                    <input className={Style.driveinput} style={{width:"360px"}}maxLength="100"  type="text" value={jobtitle} onChange={(e) => { handlejobtitle(e) }} />          
                                  </div>
                                 <div className={Style.dirvesubContainer}>
                                   <h4 className={Style.heading}>Company Name**</h4>
                                   <input className={Style.driveinput}style={{width:"290px"}} maxLength="100" type="text" value={companyName} disabled />
                                 </div>
                               </div> 

                                <div>
                                   <h4 className={Style.jobHeadline}>Job Description**</h4>      
                                    {/* <JoditEditor  ref={editor} className={Style.inputbox} value={jobDescription.toString()} onChange={(e)=>{setJobDescription(e)}} /> */}
                                 {/* <CustomTextEditor ref={editor} className={Style.inputbox} value={jobDescription.toString()} onChange={(e)=>{setJobDescription(e)}}/> */}
                                 <CustomTextEditor
 ref={editor} className={Style.inputbox} 
        value={jobDescription}
        onChange={setJobDescription}
      />
                                </div>

                               <div style={{display:"flex",flexDirection:"column"}}>
                               <h4 style={{alignContent:"start"}}>Job Tags <span className={Style.hint}>(Select multiple Tags to reach the best Matching Candidates)</span></h4>
                               <div className={Style.driveJobtitleFilterWrapper}>
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
                              </div>
                              <div class={Style.driveRadioRow}>
                                   <div>
                                     <h4 className={Style.jobHeadline}>Job Type</h4>
                                     <div style={{ marginTop: "-10px" }}>
                                     <label><input name="Job-Type" type="radio" checked={jobtype === "Full Time" || Tags.filter} value="Full Time" onChange={(e) => { setJobtype(e.target.value); handleRadioTags(e.target.value) }} />Full Time  </label>
                                     <label><input name="Job-Type" type="radio" checked={jobtype === "Part Time"} value="Part Time" onChange={(e) => { setJobtype(e.target.value); handleRadioTags(e.target.value) }} />Part Time  </label>
                                     <label><input name="Job-Type" type="radio" checked={jobtype === "Internship"} value="Internship" onChange={(e) => { setJobtype(e.target.value); handleRadioTags(e.target.value) }} />Internship </label>
                                     <label><input name="Job-Type" type="radio" checked={jobtype === "Contract"} value="Contract" onChange={(e) => { setJobtype(e.target.value); handleRadioTags(e.target.value) }} />Contract   </label>
                                     </div>
                                    </div>    
                                    <div style={{marginRight:"150px"}}>
                                      <div style={{position:"relative"}}>
                                     <h4 className={Style.jobHeadline}>Job Location**</h4>
                                     <div
    ref={tooltipRef} // ⬅ attach ref to parent of both icon and tooltip
    className={Style.driveAlerti}
    onClick={toggleTooltip}
  >
    i
    {showTooltip && (
      <div
        className={Style.driveIdesc}
      >
        Job Location: Bangalore Only. Kindly ensure that all applications align with this specified location.
      </div>
    )}
  </div>
</div>
    

                                        <div style={{ marginTop: "-10px" }}>
                                            <label><input name="Location" type="radio" checked={joblocation === "Bangalore"} value="Bangalore" onChange={(e) => { setJobLocation(e.target.value); setotherJobLocation(false) }} />Bangalore </label>
                                      </div>

                                      

                                  </div> 

                                 
                              </div>
                              <div>     
                                  <h4 className={Style.jobHeadline}>Qualification Needed**</h4>
                                       <div style={{ marginTop: "-10px" }}>
                                           <label><input name="Qualification" type="radio" checked={qualification === "B.E/CSE"} value="B.E/CSE" onChange={(e) => { setQualification(e.target.value); setOthers(false); }} />B.E(CSE) </label>
                                           <label><input name="Qualification" type="radio" checked={qualification === "B.E/Civil"} value="B.E/Civil" onChange={(e) => { setQualification(e.target.value); setOthers(false); }} />B.E(Civil) </label>
                                           <label><input name="Qualification" type="radio" checked={qualification === "B.E/Mech"} value="B.E/Mech" onChange={(e) => { setQualification(e.target.value); setOthers(false); }} />B.E(Mech) </label>
                                           <label><input name="Qualification" type="radio" checked={qualification === "B.E/ECE"} value="B.E/ECE" onChange={(e) => { setQualification(e.target.value); setOthers(false); }} />B.E(ECE) </label>
                                           <label><input name="Qualification" type="radio" checked={qualification === "B.E/IT"} value="B.E/IT" onChange={(e) => { setQualification(e.target.value); setOthers(false); }} />B.E(IT) </label>
                                           
                                           <label><input name="Qualification" type="radio" value="others" onClick={(e) => { setOthers((prev) => !prev); setQualification("") }} />others </label>
                                       </div>
                                       {
                                           others ?
                                               <input className={Style.Otherinputbox} type="text" value={qualification} onChange={(e) => { setQualification(e.target.value) }} />
                                       
                                               : ""
                                       
                                       }
                                  </div>
                              

                              <div className={Style.driveThirdRow}>
                                <div className={Style.dirvesubContainer} >
                                    <h4 className={Style.heading}>Salary Per Annum in Lakhs** &nbsp;<span className={Style.hint}>(e.g 5 or 10)</span></h4>
                                    <input className={Style.driveinput} style={{width:"32px"}} maxLength="3" type="number" value={salaryRange} onChange={(e) => { handleSalary(e); handleRadioTags(e.target.value) }} />
                                </div>
                                <div className={Style.dirvesubContainer}>
                                    <h4 className={Style.heading} >Experience Needed** &nbsp;<span className={Style.hint}>(e.g 5 or 10)</span></h4>
                                    <input className={Style.driveinput}style={{width:"32px"}} maxLength="3" type="number" value={experiance} onChange={(e) => { handleExperiance(e); handleExpButton(e.target.value) }} />

                                </div>
                              </div>
                              
                            <div className={Style.driveFourthRow}>
                                <div className={Style.dirvesubContainer}>
                                <h4 className={Style.heading}>Skills Needed**</h4>
                                        <input className={Style.driveinput} style={{width:"220px"}}   maxLength="100" value={skills} type="text" onChange={(e)=>{setSkills(e.target.value)}} disabled />

                                </div>
                                <div className={Style.dirvesubContainer}>
                                <h4 className={Style.heading} >Apply Link**</h4>
                                        <input className={Style.driveinput} style={{width:"220px"}} maxLength="100" value={applyLink} type="text" onChange={(e)=>{setApplyLink(e.target.value)}} />
                                         
                                </div>
                            </div>
                              
                            <div  class={Style.driveDateContainer1}>
                                <div>
                                          <label>Select Drive Date: </label>
                                          <input 
                                            className={Style.DriveDate}
                                            type="date" 
                                            value={selectedDate} 
                                            onChange={(e) => setSelectedDate(e.target.value)} 
                                          />
                                          </div>
                                           <div style={{display:"flex", flexDirection:"column", gap:"2px",marginRight:"124px" }}> 
                                          <label>Venue: </label>
                                          <input
                                            type="text"
                                            ref={venueInputRef}
                                            value={venue}
                                            onChange={(e) => setVenue(e.target.value)}
                                            className={Style.driveinput}
                                            style={{ width: "110%", zIndex:"99"}}
                                            placeholder="Search Venue"
                                          />
                                          </div> 
                            </div>

                                        <div class={Style.driveDateContainer}>
                                         <label>Select Time: </label>
                                         <input
                                         className={Style.DriveDate} 
                                           type="time" 
                                           value={selectedTime} 
                                           onChange={(e) => setSelectedTime(e.target.value)} 
                                         />
                                         
                                       </div>
                                       <div>
<p><input type="checkbox" onChange={()=>{setconcent((prev)=>!prev)}}/>
    I have read the terms and conditions of ITwalkin.com and I agree to all the 
     <span style={{color:"blue", cursor:"pointer"}} onClick={()=>(window.open("/TermsAndCondition"))}> terms and conditons</span> before posting the jobs </p>

     </div>
     {Logo ? <p ><span style={{ color: "blue" }}>Note** :</span> Logo will also be posted with the Job</p> : ""}
<div style={{display:"flex", justifyContent:"center" }}>
<button style={{width:"130px",}} disabled={concent} className={concent? Style.disableButton:Style.button} onClick={postJob}>Submit</button>
</div>
                            {/* </div> */}

                               </div> 
                            </div>
                            : <p style={{ color: "red", fontStyle: "italic", marginLeft: "20px" }}>Your account is being verified.Once your account gets verified,then you will be able to post a Walkin Drive</p>

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

export default PostWalkinDrive