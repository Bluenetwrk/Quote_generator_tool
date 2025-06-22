import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import Companylogo from "../img/logo.png"
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import JoditEditor from 'jodit-react'

import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Style from "./postJobs.module.css"
import socketIO from 'socket.io-client';
import CreatableSelect from "react-select"
import useScreenSize from '../SizeHook';
import { jobTags } from "../Tags"

// import CreatableSelect  from 'react-select/creatable';

function AskQuestion(props) {
    const screenSize = useScreenSize();
    const editor = useRef(null)


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
    const [name, setName] = useState("")

    const [concent, setconcent] = useState(true)

    function handleSalary(e) {
        const sanitizedValue = e.target.value.replace(/[A-Za-z]/g, '');
        // if(e.target.value.includes(/[1-9]/g))
        if (sanitizedValue.length > 2) {
            return false
        } else {
            setSalaryRange(sanitizedValue)
        }
    }

    function handleExperiance(e) {
        const sanitizedValue = e.target.value.replace(/[A-Za-z]/g, '');
        // if(e.target.value.includes(/[1-9]/g))
        if (sanitizedValue.length > 2) {
            return false
        } else {
            setExperiance(sanitizedValue)
        }
    }
    let studId = JSON.parse(localStorage.getItem("StudId"))

    let navigate = useNavigate()

    async function getProfile() {
        let userid = JSON.parse(localStorage.getItem("StudId"))
        const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
    await axios.get(`/StudentProfile/getProfile/${studId}`, {headers})
            .then((res) => {
                let result = res.data.result
                let name = res.data.result.name
                setName(name)
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

    // async function getLogo() {
    //     let userid = JSON.parse(localStorage.getItem("EmpIdG"))
    //     const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("EmpLog"))) };
    //     await axios.get(`/EmpProfile/getLogo/${empId}`, { headers })
    //         .then((res) => {
    //             let result = res.data
    //             setLogo(result)
    //         }).catch((err) => {
    //             alert("some thing went wrong")
    //         })
    // }

    // useEffect(() => {
    //     getLogo()
    // }, [])


    async function postJob() {        
    // let userid = JSON.parse(localStorage.getItem("StudId"))
    // const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
let question =true
        let jobTitle = jobtitle.toLowerCase()
        let jobLocation = joblocation.toLowerCase()
        
        if(jobTitle===""){ 
            setErrorMessage("please fill all the fields")
            return
        }
        // await axios.post("/QuestionRoute/questionPost/", {
            await axios.post("/BlogRoutes/blogpost/", {

            Logo, SourceLink, Source, empId, jobTitle, companyName, question, jobDescription, jobtype, 
            salaryRange, jobLocation, qualification, experiance, skills, Tags, name
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
                    setSuccessMessage("Success! successfully posted")
                }
                else if (result == "field are missing") {
                    setSuccessMessage("Alert!... JobTitle, CompanyName JobDescription, Experiance, JobLocation and Skills must be filled")
                }
                // else if (result ==="server issue")
                else {
                    setSuccessMessage("something went wrong, Could not save your post")
                }
            }).catch((err) => {
                alert("server issue occured", err)
            })
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function handlejobtitle(e) {
        setJobTitle(e.target.value)
    }

    function handleRadioTags(e) {
        // setTag([...Tags, e])
        handleTags(e)
        if (e < 10) {
            handleTags("<10L")
        }
        else if (e < 20 && e > 10) {
            handleTags("10 to 20L")
        }
        else if (e < 30 && e > 20) {
            handleTags("20 to 30L")
        }
        else if (e >= 30) {
            handleTags("30 and above")
        }

    }
    function handleExpButton(e) {
        if (e < 5) {
            handleTags("2 to 5 Yrs")
        }
        else if (e > 5 && e < 11) {
            handleTags("6 to 10 Yrs")
        }
        else if (e > 10 && e < 16) {
            handleTags("11 to 15 Yrs")
        }
        else if (e > 15) {
            handleTags("16 and above Yrs")
        }
    }

    const [count, setCount] = useState(1)

    async function handleTags(key) {
        if (key === 'Full Time' || key === 'Contract' || key === 'Internship' || key === 'Part Time') {
            setJobtype(key)
        }
        // setSkills((prev)=>prev ? prev + ", " + key : key)
        // setSkills(Tags)
        const isIndex = Tags.findIndex((present) => {
            return (
                present === key
            )
        })
        if (isIndex < 0) {
            setTag([...Tags, key])
            setSkills((prev) => prev ? prev + ", " + key : key)
            // setSkills([...skills, key])
        } else {
            const IndexId = Tags.filter((present) => {
                return (
                    present !== key
                )
            })
            setTag(IndexId)

            let str = IndexId.toString().split(",").join(", ")
            setSkills(str)

            // setSkills((prev)=>prev.length>=0 ?  IndexId : "," + IndexId)
        }
    }



    return (
        <>


            <h2 style={{marginLeft:"150px", fontWeight:"800", marginTop:"6px", marginBottom:"-15px"}}>Ask Questions </h2>
                            <div>
                                <button className={Style.searchButton} onClick={() => {
                                    navigate(-1)
                                }}>Go Back</button>
                                {/* {Logo ? <img className={Style.logo} src={Logo} /> :
                                    <p style={{ color: "red", marginLeft: "5%", fontStyle: "italic" }}> Alert! You have not updated the Company logo, please update the Company Logo</p>
                                    } */}

                                <div className={Style.postJobPageWrapper} >
                                    <div className={Style.postJobWrapper}>
                                        <p className={successMessage === "Success! successfully posted" ?
                                            Style.successmessage : Style.errormessage}>{successMessage} </p>
                                        {/* <p className={Style.errormessage}>{errorMessage} </p> */}
                                        {errorMessage!==""&&
                                        <p className={Style.errormessage}>{errorMessage} </p>
                                       }
                                        <div style={{display:"flex", alignItems:"center", gap:"90px", marginBottom:"14px"}}>
                                           <h4 className={Style.jobHeadline}  >Ask Question**</h4>
                                           <div className={Style.hint}> 
                                            ( This  will be forwarded to the employers/consultants)
                                            </div>
                                        </div>
                                        <input maxLength="200" className={Style.inputbox} type="text" value={jobtitle} onChange={(e) => { handlejobtitle(e) }} />

                                        <p className={Style.jobHeadline}>Blog Tags  
                                            <span className={Style.hint}> (Select the matching tag for your question)</span></p>

                                        <div className={Style.JobtitleFilterWrapper}>
                                            {
                                                jobTags.map((tags, i) => {
                                                    return (
                                                          
                                                        <button disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                                                            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                                                            className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                                                                tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                                                                Style.TagHeading :
                                                                //  Active === tags.value ? 
                                                                Tags.findIndex((present) => {
                                                                    return (
                                                                        present === tags.value
                                                                    )
                                                                }) >= 0 ?
                                                                    Style.active : Style.JobtitleFilter}
                                                            onClick={() => { handleTags(tags.value) }}
                                                        >{tags.value} </button>

                                                    )
                                                })
                                                
                                            }
                                        </div>
                                        

                                        <p><input type="checkbox" onChange={() => { setconcent((prev) => !prev) }} />
                                            I have read the terms and conditions of ITwalkin.com and I agree to all the
                                            <span style={{ color: "blue", cursor: "pointer" }} onClick={() => (window.open("/TermsAndCondition"))}> terms and conditons</span> before posting my question </p>


                                        {/* {Logo ? <p ><span style={{ color: "blue" }}>Note** :</span> Logo will also be posted with the Job</p> : ""} */}
                                        
                                    </div >
                                    <div className={Style.submitDeleteBtn}>   
                                        <button style={{width:"200px", marginLeft:"-4%px"}} disabled={concent} className={concent? Style.disableButton:Style.button} onClick={postJob}>Submit</button>
                                        {/* <button style={{width:"200px",backgroundColor:"red"}} disabled={concent} className={Style.disableButton} >Delete</button> */}
                                        </div>
                                </div >
                            </div>
             
            {screenSize.width > 750 ?
                ""
                :
                <div style={{ marginTop: "20px" }}>
                    <Footer />
                </div>
            }
        </>

    )
}

export default AskQuestion