import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./MyAppliedJobs.module.css"
import Swal from "sweetalert2";
import { Puff } from 'react-loader-spinner'
import useScreenSize from '../SizeHook';
import location from "../img/icons8-location-20.png"
import graduation from "../img/icons8-graduation-cap-40.png"
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import socketIO from 'socket.io-client';
import Footer from '../Footer/Footer';
import HTMLReactParser from 'html-react-parser'


function AppliedDrives(props) {
  useEffect(() => {
    const socket = socketIO.connect(props.url, {
      auth: {
        token: JSON.parse(localStorage.getItem("StudId"))
      }
    });
  }, [])
  let navigate = useNavigate()


const dummyDrives = [
  {
    id: "drive1",
    companyName: "Tata Consultancy Services",
    jobTitle: "Software Engineer",
    jobType: "Full Time",
    postedDate: "2025-06-15",
    appliedDate: "2025-06-16",
    location: "Bangalore",
    ctc: "6 LPA",
    experience: "0-2 years",
    qualification: "B.E/B.Tech - CS/IT",
    skillsRequired: ["Java", "Spring Boot", ],
    action: "Apply Now",
    status: "Pending",
    numberOfApplicants: 40
  },
  {
    id: "drive2",
    companyName: "Infosys",
    jobTitle: "Frontend Developer",
    jobType: "Contract",
    postedDate: "2025-06-18",
    appliedDate: "2025-06-19",
    location: "Hyderabad",
    ctc: "5.5 LPA",
    experience: "1-2 years",
    qualification: "B.Sc/BCA",
    skillsRequired: ["HTML", "CSS", "JavaScript",],
    action: "Apply Now",
    status: "Shortlisted",
    numberOfApplicants: 32
  },
  {
    id: "drive3",
    companyName: "Wipro",
    jobTitle: "Backend Developer",
    jobType: "Full Time",
    postedDate: "2025-06-20",
    appliedDate: "2025-06-21",
    location: "Pune",
    ctc: "6.5 LPA",
    experience: "1-3 years",
    qualification: "B.Tech/M.Tech - CS",
    skillsRequired: ["Node.js", "MongoDB", ],
    action: "Apply Now",
    status: "Interview Scheduled",
    numberOfApplicants: 28
  },
  {
    id: "drive4",
    companyName: "HCL Technologies",
    jobTitle: "Full Stack Developer",
    jobType: "Part Time",
    postedDate: "2025-06-22",
    appliedDate: "2025-06-23",
    location: "Chennai",
    ctc: "7 LPA",
    experience: "2-4 years",
    qualification: "MCA/M.Sc - CS",
    skillsRequired: ["React", "Node.js",],
    action: "Apply Now",
    status: "Rejected",
    numberOfApplicants: 37
  },
  {
    id: "drive5",
    companyName: "Accenture",
    jobTitle: "DevOps Engineer",
    jobType: "Internship",
    postedDate: "2025-06-25",
    appliedDate: "2025-06-26",
    location: "Gurgaon",
    ctc: "7.5 LPA",
    experience: "1-3 years",
    qualification: "B.E/B.Tech - Any Branch",
    skillsRequired: ["Docker", "Kubernetes",],
    action: "Apply Now",
    status: "Offer Released",
    numberOfApplicants: 42
  }
];


  const [MyAppliedjob, setMyAppliedjob] = useState([])
  const [PageLoader, setPageLoader] = useState(false)
  const [NoJobFound, setNoJobFound] = useState("")
  const screenSize = useScreenSize();
  const [Filtereredjobs, setFiltereredjobs] = useState([])
  const [nopageFilter, setNoPageFilter] = useState(false)
  const [transferRecords, setTransferRecords] = useState("AppliedJobs")



  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))


  //   async function getAppliedJob(){   
  //     await axios.get(`http://localhost:8080/jobpost/getAppliedjobs/${ jobSeekerId }`)
  //     .then((res)=>{
  //       console.log("got user",res.data)
  //       // setAppliedUser(res.data)

  //     })
  // }

  // useEffect(()=>{
  //   getAppliedJob()
  // },[])


  
  async function getCareerjobs() {
    let userid = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
    setPageLoader(true)
    setTimeout(async () => {

      await axios.get(`/Careerjobpost/getMyAppliedjobs/${jobSeekerId}`, { headers })
        .then((res) => {
          let result = res.data
          let sortedate = result.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setMyAppliedjob(oldData=>oldData.concat(sortedate))
          setPageLoader(false)
          if (res.data.length == 0) {
            setNoJobFound("You have not applied any jobs yet")
          }

        }).catch((err) => {
          alert("backend arror occured")
        })
    }, 1000)
  }

  // useEffect(() => {
  // }, [])


  async function getjobs() {
    let userid = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
    setPageLoader(true)
    setTimeout(async () => {

      await axios.get(`/jobpost/getMyAppliedjobs/${jobSeekerId}`, { headers })
        .then((res) => {
          let result = (res.data)
          let sortedate = result.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setMyAppliedjob(sortedate)
          setPageLoader(false)
          if (res.data.length == 0) {
            setNoJobFound("You have not applied any jobs yet")
          }

        }).catch((err) => {
          alert("backend arror occured")
        })
    }, 1000)
  }

  useEffect(() => {
    getjobs()

    getCareerjobs()

  }, [])

  async function UndoApply(id) {
    let userid = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
    Swal.fire({
      title: 'Are you sure?',
      // icon: 'warning',      
      width: "260",
      // position:"top",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      width: "245",
      // position:"top",
      customClass: {
        popup: "alertIcon"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`/jobpost/DeleteJobApplied/${id}`, { jobSeekerId }, { headers })
          .then((res) => {
            if(res.data==="success"){
              getjobs()
              getCareerjobs()
            }else{
              alert("some thing wrong")
            }
          }).catch((err) => {
            alert("server error occured")
          })
      }
    })
  }

  function sortbyOldjobs() {
    let newjob = [...MyAppliedjob]
    let oldjobSort = newjob.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    setMyAppliedjob(oldjobSort)

  }
  function sortbyNewjobs() {
    let newjob = [...MyAppliedjob]
    let newjobSort = newjob.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    setMyAppliedjob(newjobSort)

  }

  function SdescendingOrder() {
    let newJobs = [...MyAppliedjob]
    // const desendSort = newJobs.sort(function (a, b) {
    //   return (
    //     b.salaryRange - a.salaryRange
    //   )
    // })
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newJobs.sort((a, b) => {
      return collator.compare(b.salaryRange, a.salaryRange)
    })
    setMyAppliedjob(sorted)
  }

  function SascendingOrder() {
    let newJObs = [...MyAppliedjob]
    // const AscendSort = newJObs.sort(function (a, b) {
    //   return (
    //     a.salaryRange - b.salaryRange
    //   )
    // })
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newJObs.sort((a, b) => {
      return collator.compare(a.salaryRange, b.salaryRange)
    })
    setMyAppliedjob(sorted)
  }

  function EdescendingOrder() {
    let newjob = [...MyAppliedjob]
    // const descend = newjob.sort(function (a, b) {
    //   return (
    //     b.experiance - a.experiance
    //   )
    // })
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.experiance, a.experiance)
    })
    setMyAppliedjob(sorted)

  }

  function EascendingOrder() {
    let newjob = [...MyAppliedjob]
    // const Ascend = newjob.sort(function (a, b) {
    //   return (
    //     a.experiance - b.experiance
    //   )
    // })
    // setMyAppliedjob(Ascend)
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.experiance, b.experiance)
    })
    setMyAppliedjob(sorted)
  }


  let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpage"))

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setrecordsPerPage] = useState(recordsperpage ? recordsperpage : 10)
  const lastIndex = currentPage * recordsPerPage //10
  const firstIndex = lastIndex - recordsPerPage //5
  const records = MyAppliedjob.slice(firstIndex, lastIndex)//0,5
  const npage = Math.ceil(MyAppliedjob.length / recordsPerPage) // last page
  const number = [...Array(npage + 1).keys()].slice(1)

  function firstPage(id) {
    setCurrentPage(1)
  }

  function previous() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  function changeCurrent(id) {
    setCurrentPage(id)
  }
  function next() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }
  function last() {
    setCurrentPage(npage)
  }
  function handleRecordchange(e) {
    sessionStorage.setItem("recordsperpage", JSON.stringify(e.target.value));
    let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpage"))
    setrecordsPerPage(recordsperpage)
    setCurrentPage(1)
  }
console.log(records)

const handleStart = () => {
  navigate("/scanner");
};

  return (
    <>

<p className={styles.h3} style={{ textAlign: "center" }}><b>My applied WalkinDrives</b></p>
{/* <p className={styles.h3}><b>You’ve successfully submitted applications for {MyAppliedjob.lengths} positions.Stay tuned for updates.  </b></p> */}

      {/* <button onClick={()=>{navigate("/MyCareer-Applied-Jobs")}} style={{ backgroundColor:"rgb(40, 4, 99)",
         marginLeft:"10px", fontWeight:600, color:"white", border:"none",
          cursor:"pointer", padding:"5px 10px"}}>Career Jobs
      </button> */}

      {screenSize.width > 850 ?
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {nopageFilter ?
              <p style={{ fontWeight: 400, marginLeft: "10px" }}>Displaying <span style={{ color: "blue" }}>{Filtereredjobs}</span> from All Jobs</p>
              :
              <p style={{ fontWeight: 400, marginLeft: "10px" }}>showing {firstIndex + 1} to {lastIndex} latest jobs</p>
            }
            <div className={styles.navigationWrapper}>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward'></i>
              </button>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={previous}>
                <i class='fas fa-caret-square-left'></i>
              </button>
              <span>{currentPage}</span>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={next}>
                <i class='fas fa-caret-square-right'></i>
              </button>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={last}>
                <i class='fas fa-step-forward'></i>
              </button>
            </div>
          </div>
          <div style={{ marginBottom: "5px", marginTop: "0", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
              <option selected={lastIndex === 10} value={10}>10</option>
              <option selected={lastIndex === 25} value={25}>25</option>
              <option selected={lastIndex === 50} value={50}>50</option>
              <option selected={lastIndex === 100} value={100}>100</option>
            </select>  jobs per page
          </div>

          <div className={styles.Uiwarpper}>

            <ul className={styles.ul}>
              <li className={styles.li}><b>Company Name</b></li>
              <li className={`${styles.li} ${styles.Jtitle}`}><b>Job Title</b></li>
              <li className={`${styles.li} ${styles.JobType}`}><b>JobType</b></li>

              {/* <li className={`${styles.li} ${styles.liDescription}`}><b>Job description</b></li> */}
              <li className={`${styles.li} ${styles.Pdate}`}><b>Posted Date</b>
                <p className={styles.arrowWrapper} >
                  <i onClick={sortbyNewjobs} className={`${styles.arrow} ${styles.up}`}> </i>
                  <i onClick={sortbyOldjobs} className={`${styles.arrow} ${styles.down}`}></i>
                </p >
              </li>
              <li className={`${styles.li} ${styles.Pdate}`}><b>Applied Date</b>

              </li>

              <li className={`${styles.li} ${styles.Location}`}><b>Location</b></li>
              <li className={`${styles.li} ${styles.Package}`}><b>CTC </b>
                <p className={styles.arrowWrapper}>
                  <i onClick={SdescendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                  <i onClick={SascendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>
              <li className={`${styles.li} ${styles.experiance}`}><b>Experience </b>
                <p className={styles.arrowWrapper}>
                  <i onClick={EdescendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                  <i onClick={EascendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>
              <li className={`${styles.li} ${styles.Qualif}`}><b>Qualification </b></li>

              <li className={`${styles.li} ${styles.Skills}`}><b>Skills Required</b></li>
              <li className={`${styles.li} ${styles.DeleteAction}`}><b>Action</b></li>
              <li className={`${styles.li} ${styles.Status}`}><b>Status</b></li>
            </ul>
            {PageLoader ?
              <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
              <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginTop: "100px" }} />
              <p style={{color:"red"}}>Loading...</p>
              </div>
              : 
            (
              dummyDrives.length > 0 ?

                dummyDrives.map((items, i) => {
                  return (
                
                    <ul className={styles.ul} key={i}>
                      <li style={{ cursor: "pointer", textDecoration: "underline" }} className={styles.li}  >
                        {items.companyName}</li>

                      <li className={`${styles.li} ${styles.JtitleR}`}>{items.jobTitle.toUpperCase()}</li>
                      <li className={`${styles.li} ${styles.JobType}`}>{items.jobType}</li>

                      {/* <li className={`${styles.li} ${styles.Pdate}`}>
                        {new Date(items.createdAt).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </li> */}
                      <li className={`${styles.li} ${styles.Pdate}`}>
  {items.postedDate}
</li>

                      {/* <li className={`${styles.li} ${styles.Pdate}`}>
                        {new Date(
                          items.jobSeekerId.find((id) => {
                            return (
                              id.jobSeekerId == jobSeekerId
                            )
                          }).date
                        ).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "2-digit",
                          }
                        )}
                      </li> */}
                      <li className={`${styles.li} ${styles.Pdate}`}>
  {items.appliedDate
    }
</li>
                      <li className={`${styles.li} ${styles.Location}`}>{items.location}</li>
                      <li className={`${styles.li} ${styles.Package}`}>{items.ctc}L</li>
                      <li className={`${styles.li} ${styles.experiance}`}>{items.experiences}Y</li>
                      <li className={`${styles.li} ${styles.Qualif}`}>{items.qualification} </li>

                      <li className={`${styles.li} ${styles.Skills}`}>{items.skillsRequired}</li>
                      <li className={`${styles.li} ${styles.DeleteAction}`}>
                        <button className={styles.DeleteButton} >Delete</button>
                        <button className={styles.qrButton}>QR Scanner</button>
                        </li>
                      <li className={`${styles.li} ${styles.Status}`}>

                       

                      </li>

                    </ul>
                  )
                })

                : 
                // <p style={{ marginLeft: "42%", color: "red" }}> {NoJobFound} </p>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <p style={{ color: "red" }}> No records found</p>
                </div>
            )
            }
          </div>
        </>
        :
        <>
        {PageLoader ? (
  <div style={{ display: "flex", justifyContent: "center", alignItems:"center", flexDirection:"column" }}>
    <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginTop: "100px" }} />
    <p style={{color:"red"}}>Loading....</p>
  </div>
) : (
  <>
    <div id={styles.JobCardWrapper}>
      {dummyDrives.length > 0 ? (
        dummyDrives.map((job, i) => {
          // const matched = job.jobSeekerId.find(id => id.jobSeekerId == jobSeekerId);
          // const appliedDate = matched?.date ? new Date(matched.date) : null;
          // const formattedAppliedDate = appliedDate
          //   ? `${appliedDate.getDate()}${(() => {
          //       const d = appliedDate.getDate();
          //       if (d > 3 && d < 21) return 'th';
          //       switch (d % 10) {
          //         case 1: return 'st';
          //         case 2: return 'nd';
          //         case 3: return 'rd';
          //         default: return 'th';
          //       }
          //     })()} ${appliedDate.toLocaleString('en-US', { month: 'short' })}, ${appliedDate.getFullYear()}`
          //   : '';

          return (
            <div className={styles.JobCard} key={i}>
              <div className={styles.JobTitleDateWrapper}>
                <p
                  className={styles.jobTitle}   
                >
                  {job.jobTitle.toUpperCase()}
                </p>
                <p className={styles.Date}>
                  {job.postedDate}
                </p>
              </div>

              <div
                className={styles.companyNameLocationWrapper}
                
              >
                <img className={styles.logo} src={job.Logo} alt="Logo" />
                <span className={styles.companyName}>{job.companyName}</span><br />
              </div>

              <img className={styles.jobLocationImage} src={location} alt="Location" />
              <span className={styles.jobLocation}>
                {job.location},
              </span>
              <span className={styles.qualificationAndExperiance}>
                <img className={styles.graduationImage} src={graduation} alt="Graduation" />
                {job.qualification}  
              </span><br />
              <span style={{ marginBottom: "3px", display: "inline" }}>
                <span style={{ marginLeft: "15px", fontWeight: "450" }}>Experience: </span>
                {job.experience}Y Exp,
              </span><br/>
              <span style={{ marginBottom: "-3px", display: "inline" }}>
                <span style={{ marginLeft: "15px", fontWeight: "450" }}>Job Type: </span>
                {job.jobType}
              </span><br/>
              

              {/* <span className={styles.jobtypeAndDate}>Source</span> :
              {job.Source ? (
                <>
                  <a className={styles.skills} href={job.SourceLink} target="_blank" rel="noopener noreferrer">
                    {job.Source}
                  </a><br />
                </>
              ) : (
                <span className={styles.skills}>ItWalkin</span>
              )} */}

              <span style={{ marginBottom: "-3px", display: "inline" }}>
                <span style={{ marginLeft: "14px", fontWeight: "450" }}>Applied Date: </span>
                {job.appliedDate}
              </span>

              <div className={styles.skillWrapper}>
                <span className={styles.skillsHeading}>Skills: </span>
                <span className={styles.skills}>{job.skillsRequired}</span><br />
              </div>

              <div className={styles.driveMobBtnContainer}>
                <h3 style={{ marginLeft: "10px", marginTop: "23px" }}>
                  <span>&#8377;</span>{job.ctc}
                </h3>
                <div style={{display:"flex"}}>
                  <button className={styles.MobileDelete} style={{width:"100%"}} >Delete</button>
                  <button className={styles.Mobileqr}  onClick={handleStart} >QR Scanner</button>
                </div>
              </div>

              <p className={styles.MobileResult}>Result:</p>
              <span>
                
              </span>

              <p className={styles.jobDescriptionHeading}>Job Description:</p>
              <p className={styles.jobDescription}>
                {job.jobDescription ? HTMLReactParser(job.jobDescription.slice(0, 70)) : ""}
                <span
                  
                  className={styles.seeMore}
                  style={{ color: "blue" }}
                >
                  ...read more
                </span>
              </p>
            </div>
          );
        })
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p style={{ marginLeft: "25%", color: "red" }}>No Record Found</p>
        </div>
      )}
    </div>

    <div style={{ marginTop: "80px" }}>
      <Footer />
    </div>
  </>
)}

        </>
}
</>
  )
}

export default AppliedDrives