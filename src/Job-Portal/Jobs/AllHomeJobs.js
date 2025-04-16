import React, { useState, useEffect, useRef } from 'react';
import CompanyLogo from '../img/company-logo.png'
import styles from "./Allobs.module.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Puff } from 'react-loader-spinner'
import location from "../img/icons8-location-20.png"
import graduation from "../img/icons8-graduation-cap-40.png"
import useScreenSize from '../SizeHook';
// import {SwipeableViews} from 'react-swipeable-views-v18';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Footer from '../Footer/Footer';
import { jobTags } from '../Tags'
import HTMLReactParser from 'html-react-parser'

const options = [
  { value: "bangalore", label: "Bangalore, India", img:location},
  { value: "san Francisco", label: "San Francisco, USA", img:location},
  { value: "new york", label: "New York, USA", img:location},
  { value: "sydney", label: "Sydney, Australia", img:location},
  { value: "london", label: "London, UK", img:  location},
  { value: "berlin", label: "Berlin, Germany", img:location},
];


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 14
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


function Home({nopageFilter,setNoPageFilter,searchKey, setsearchKey,Filtereredjobs, setFiltereredjobs
  ,Result,setResult,Filterjobs, setFilterjobs,jobs, setJobs,count,setCount, Active,setActive,
  PageLoader,setPageLoader,totalCount,settotalCount,search,getjobs,gettotalcount,searchIcon
  ,searchClick,setSearchClick,ShowSideNave,setShowSideNave,showMobileSearchIcon,setShowMobileSearchIcon,selectedlocationOption
}) {

  // const [jobs, setJobs] = useState([])
  // const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  // const [nopageFilter, setNoPageFilter] = useState(true)
  // const [Filtereredjobs, setFiltereredjobs] = useState([])
  

  // const [Filterjobs, setFilterjobs] = useState([])

  const [isReadMore, setIsReadMore] = useState(true)
  const [showJobs, setshowJobs] = useState(false)
  const [showExperiance, setshowExperiance] = useState(false)
  const [showPackage, setshowPackage] = useState(false)
  // const [PageLoader, setPageLoader] = useState(false)
  // const [Result, setResult] = useState(false)
  const [NotFound, setNotFound] = useState("")
  // const [Active, setActive] = useState([])
  const screenSize = useScreenSize();

  let JobLocationTags = ["Bangalore"]

  let navigate = useNavigate()

  let adminLogin = localStorage.getItem("AdMLog")

  useEffect(() => {
    let EmployeeAuth = localStorage.getItem("EmpLog")
    if (EmployeeAuth) {
      navigate("/Search-Candidate")
    }
  }, [])

  useEffect(() => {
    let studentAuth = localStorage.getItem("StudLog")
    if (studentAuth) {
      navigate("/alljobs")
    }
  }, [])

  // const [totalCount, settotalCount] = useState()
  // let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageHome"))

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setrecordsPerPage] = useState( 10)
  const[jobsPerPageValue,setJobsPerPageValue]=useState(10);
 
  const lastIndex = currentPage * recordsPerPage //10
  const firstIndex = lastIndex - recordsPerPage //5
  const records = jobs.slice(firstIndex, lastIndex)//0,5

  const npage = Math.ceil(totalCount / recordsPerPage) // last page
  

  async function gettotalcount() {
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get("/jobpost/getTotalCount", { headers })
      .then((res) => {
        // console.log(res.data.result)
        settotalCount(res.data.result)
      }).catch((err) => {
        alert("something went wrong")
      })
  }

  async function getjobs() {
    setCount(1)
    setActive([])
    setJobTagsIds([])

    setPageLoader(true)
    setNoPageFilter(false)
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    // await axios.get("/jobpost/getHomejobs", { headers })
    await axios.get(`/jobpost/getLimitJobs/${recordsPerPage}`, { params: { currentPage }, headers })
      .then((res) => {
        let result = (res.data)
        gettotalcount()

        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      
        setJobs(sortedate)
        setFilterjobs(sortedate)
        setPageLoader(false)
      }).catch((err) => {
        console.log(err)
        alert("some thing went wrong")
      })
  }

  useEffect(() => {
    if (jobTagsIds.length < 1) {
      getjobs()
    } else {
      getTagId();
    }
  }, [currentPage, recordsPerPage])



  async function applyforJob(id) {
    navigate("/JobSeekerLogin", { state: { Jid: id } })
   
  }
  async function applyforOtherJob(Link) {
    
    window.open(`${Link}`)
  }


  // const [searchKey, setsearchKey] = useState()
  // const [jobs, setJobs] = useState([])  
  async function searchIcon(key) {
    setNoPageFilter(true)
    setFiltereredjobs(key)
    setsearchKey(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) => {
        if (JSON.stringify(user).includes(key.toLowerCase())) {
          return user
        }
      })
      setJobs(filteredItems)
    } else {
      getjobs()
      setResult(false)
    }
  }



  async function search(e) {
    setNoPageFilter(true)
    let key = e.target.value
    setFiltereredjobs(key)
    setsearchKey(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) => {
        if (JSON.stringify(user).includes(key.toLowerCase())) {
          return user
        }
      })
      setJobs(filteredItems)
    } else {
      getjobs()
      setResult(false)
    }
  }

  function sortbyOldjobs() {
    let newjob = [...jobs]
    let oldjobSort = newjob.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    setJobs(oldjobSort)
  }

  function sortbyNewjobs() {

    let newjob = [...jobs]
    let newjobSort = newjob.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    setJobs(newjobSort)
  }


  function SdescendingOrder() {
    let newJobs = [...jobs]
  
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newJobs.sort((a, b) => {
      return collator.compare(b.salaryRange, a.salaryRange)
    })
    setJobs(sorted)
  }

  function SascendingOrder() {
    let newJObs = [...jobs]
    
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newJObs.sort((a, b) => {
      return collator.compare(a.salaryRange, b.salaryRange)
    })
    setJobs(sorted)
  }

  function EdescendingOrder() {
    let newjob = [...jobs]
    
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.experiance, a.experiance)
    })
    setJobs(sorted)

  }

  function EascendingOrder() {
    let newjob = [...jobs]
    
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.experiance, b.experiance)
    })
    setJobs(sorted)
  }
  function checkEmpHalf(empId, e) {

    navigate(`/CheckEmpHalfProfile/${empId}`)

  }


  
  const [jobLocation, setjobLocation] = useState("AllL")
  const [jobTitle, setjobTitle] = useState("")
  
  async function getjobTitleAll(all) {
    await axios.get("/jobpost/getjobs")
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)

      })
  }
  async function getjobsAllLoc(all) {
    await axios.get("/jobpost/getjobs")
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
      })
  }

  async function JobtitleFilter(jobTitle) {
    await axios.get(`/jobpost/getjobTitle/${jobTitle}`)
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }


  async function getBothFiltered(jobTitle) {

    await axios.post(`/jobpost/getBothjobFilter/${jobLocation}`, { jobTitle })
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }


  function firstPage() {
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
    // sessionStorage.setItem("recordsperpageHome", JSON.stringify(e.target.value));
    // let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageHome"))
    setJobsPerPageValue(Number(e.target.value));
    setrecordsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  // const [count, setCount] = useState(1)
  const [jobTagIds, setjobTagIds] = useState([])

  const [jobTagsIds, setJobTagsIds] = useState([])


  useEffect(() => {
    if (jobTagsIds.length > 0) {
      getTagId();
    }
  }, [jobTagsIds])

  // const [pathChanged, setPathChanged] = useState(false); // Track if path changed

// Run getjobs() only if path changes
// useEffect(() => {
  // console.log("Path changed, executing getjobs...");
  // setPathChanged(true); // Mark that getjobs() was executed
  // getjobs();

  // Reset after a delay to allow normal execution of getTagId() in future updates
//   setTimeout(() => setPathChanged(false), 500); 
// }, [location.pathname]);

// Run getTagId() only if path didn't change recently
// useEffect(() => {
//   if (!pathChanged && jobTagsIds.length > 0) {
//     // console.log("jobtagsids", jobTagsIds);
//     getTagId();
//   }
// }, [jobTagsIds]);

  let ids = jobTagsIds.map((id) => {
    return (
      id._id
    )
  })
  const uniqueList = [...new Set(ids)];
  async function getTagId() {
    settotalCount(uniqueList.length)
    await axios.get(`/jobpost/jobTagsIds/${uniqueList}`, {
      params: { currentPage, recordsPerPage }
    })
      .then((res) => {
        
        let result = res.data
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        if (count == 2) {
          setCurrentPage(1)
        }

      })
  }

  useEffect(()=>{
    if(Active.length>0){
      changeTags()
    }
  },[Active])


  async function filterByJobTitle(key) {

    if (count == 1) {
      setJobs([])
    }
    setCount(prev => prev + 1)
    const isIndex = Active.findIndex((present) => {
      return (
        present === key
      )
    })
    if (isIndex < 0) {
      
      
      var updatedActive = [...Active, key]; 
      setActive(updatedActive);

    } else {
      const IndexId = Active.findIndex((present) => {
        return (
          present == key
        )
      })
      Active.splice(IndexId, 1)
      if (Active.length === 0) {
        getjobs()
        return false
      }
    
      changeTags()
    }}
    async function changeTags(key){
     

    setNoPageFilter(true)
    setFiltereredjobs(key)
    await axios.get(`/jobpost/getTagsJobs/${Active}`)
      .then((res) => {
        let result = (res.data)
        
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobTagsIds(sortedate)
        
      })
  }

  async function getLocation(jobLocation) {
    setCount(1)
    setActive(["Banglore"])
    setFiltereredjobs(jobLocation)
    setNoPageFilter(true)

    await axios.get(`/jobpost/getjobLocation/${jobLocation}`)
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
      
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }


  const [checkBoxValue, setCheckBoxValue] = useState([])
  const [check, setCheck] = useState(true)

  async function ArchiveCheckBoxArray() {
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    await axios.delete(`/jobpost/ArchiveCheckBoxArray/${checkBoxValue}`, { headers })
      .then((res) => {
        if (res.data === "success") {
          getjobs()
          alert("Archived succesfully")
          window.location.reload()
        }
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }
  async function deleteCheckedJobs() {
    let userid = atob(JSON.parse(localStorage.getItem("IdLog")))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("AdMLog"))) };
    await axios.delete(`/jobpost/deleteCheckBoxArray/${checkBoxValue}`, { headers })
      .then((res) => {
        if (res.data === "success") {
          getjobs()
          alert("deleted succesfully")
          window.location.reload()
        }
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }


  function checkBoxforDelete(id) {

    const checkedid = checkBoxValue.findIndex((checkedid) => {
      return (
        checkedid === id
      )
    })
    if (checkedid < 0) {
      setCheckBoxValue([...checkBoxValue, id])
    } else {
      
      let removeId = checkBoxValue.filter((foundId) => {
        return (
          foundId !== id
        )
      })
      setCheckBoxValue(removeId)
    }
  }
 

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
 
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  //  const[searchClick,setSearchClick]=useState(false)
  const selectedTag=useRef("")
  const updateTag=(tag)=>{
    selectedTag.current=tag
  }

  useEffect(()=>{
       console.log("location",selectedOption)
  },[selectedlocationOption])


  return (
    <>
      {screenSize.width > 850 ?

        <>
          <div className={adminLogin ? styles.HomeNavConetenetWrapperAdmin : styles.HomeNavConetenetWrapper}>
            {/* <div className={styles.LocationFilterWrapper}> */}
              {/* {
                JobLocationTags.map((location, i) => {
                  return (
                    <> */}
        {/* <div ref={dropdownRef} style={{ position: "relative" }}>
      
      <div style={{ display: "flex", marginLeft: "-40px", marginTop: "-5px" }}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: "#007bff",
          }}
        >
          <img className={styles.jobLocationImage} src={location} alt="Location" />
        </button>
        <p style={{ marginTop: "17px", fontWeight: "bold", color: "white" }}>
          {selectedOption?.label}
        </p>
      </div>

     
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "45px",
            left: "-43px",
            background: "white",
            color: "black",
            borderRadius: "20px",
            width: "160px",
            padding: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
         
          <div
            style={{
              position: "absolute",
              top: "-9px",
              left: "25px",
              width: "0",
              height: "0",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "10px solid white",
            }}
          ></div>

        
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={option.img}
                  alt={option.label}
                  style={{ width: "22px", height: "22px", marginRight: "12px" }}
                />
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div> */}

      {/* <p style={{ marginTop: "10px", fontWeight: "bold" }}>{selectedOption.label}</p> */}
   
                      {/* <label className={styles.JobLocationFilter}>
                        <input type="radio" checked disabled={location == "Chennai" ||
                          location == "Hyderabad" || location == "Mumbai" || location == "Delhi"} name="filter" onClick={() => { getjobs() }} />{location}</label><br></br> */}
                    {/* </>
                  )
                })
              } */}
            {/* </div> */}
            {/* <div className={styles.HomesearchBothForNavWrapper}>
              <input className={styles.inputboxsearchNav} type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => { search(e) }} />

              <i style={{ color: "rgb(40, 4, 99)", fontSize: "18px", cursor: "pointer", marginLeft: "2%" }} onClick={() => { searchIcon(searchKey) }}
                class="fa fa-search" ></i>
            </div> */}
          </div>
          {/* {Result ?
            <h4 style={{ marginLeft: "40%", marginTop: "20px" }}> {jobs.length} matching Result Found  </h4>
            : ""
          } */}
        </>
        : ""
      }
      {/* <h1>Nikita is working on this development</h1> */}
      {checkBoxValue.length > 0 ?
        <>
          <button style={{
            backgroundColor: "blue", border: "none", color: "white",
            padding: "5px 10px", fontWeight: "bold", cursor: "pointer"
          }} onClick={() => { ArchiveCheckBoxArray() }}>Archive</button>

          <button style={{
            backgroundColor: "red", border: "none", color: "white", marginLeft: "5px",
            padding: "5px 10px", fontWeight: "bold", cursor: "pointer"
          }} onClick={() => { deleteCheckedJobs() }}>Delete</button>
        </>
        : ""
      }

      {screenSize.width > 850 ?
        <>
         


          <div className={styles.JobtitleFilterWrapper} style={{marginTop:"60px"}}>
            <buton className={Active.length === 0 ? styles.active : styles.JobtitleFilter} onClick={() => { getjobs() }}>All</buton>
            {
              jobTags.map((tags, i) => {
                return (

                  <button disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                    tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                    className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                      styles.TagHeading :
                      //  Active === tags.value ? 
                      Active.findIndex((present) => {
                        return (
                          present === tags.value
                        )
                      }) >= 0 ?
                        styles.active : styles.JobtitleFilter} onClick={() => { filterByJobTitle(tags.value);updateTag(tags.value)  }}>{tags.value} </button>

                )
              })
            }
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {nopageFilter ?
              // <p style={{ fontWeight: 400, marginLeft: "10px" }}>Displaying <span style={{ color: "blue" }}>
              //   {uniqueList.length} </span>Jobs with following matching tags:
              //   <span style={{ color: "blue" }}>{Active.toString()}</span></p>
              <p style={{ fontWeight: 400, marginLeft: "10px" }}>Displaying <span style={{ color: "blue" }}>
                {jobs.length} </span>Jobs with following matching tags:
                <span style={{ color: "blue" }}>{Active.toString()}</span></p>
              :
              <p style={{ fontWeight: 400, marginLeft: "10px" }}>showing {firstIndex + 1} to {lastIndex} latest jobs</p>
            }
            <div className={styles.navigationWrapper}>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward' ></i>
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
    
              {/* <option selected={lastIndex === 10} value={10}>10</option>
              <option selected={lastIndex === 25} value={25}>25</option>
              <option selected={lastIndex === 50} value={50}>50</option>
              <option selected={lastIndex === 100} value={100}>100</option> */}
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select>  jobs per page
          </div>
         
          <div className={styles.Uiwarpper}>
            <ul className={styles.ul} style={{ color: 'white', fontWeight: "bold" }}>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Jtitle}`}>Job Title</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Source}`}>Posted By</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.CompanyName}`}>Company Name</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.JobType}`}>JobType</li>

              {/* <li className={`${styles.li} ${styles.HliDescription}`}><b>Job description</b></li> */}
              <li style={{ backgroundColor: " rgb(40, 4, 99)", }} className={`${styles.li} ${styles.date}`}>Posted Date
                <p className={styles.arrowWrapper} >
                  <i onClick={sortbyNewjobs} className={`${styles.arrow} ${styles.up}`} ></i>
                  <i onClick={sortbyOldjobs} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>
              
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Location}`}>Location</li>

              <li style={{ backgroundColor: " rgb(40, 4, 99)", }} className={`${styles.li} ${styles.Package}`}>CTC
                <p className={styles.arrowWrapper}>

                  <i onClick={SdescendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                  <i onClick={SascendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>

              <li style={{ backgroundColor: " rgb(40, 4, 99)", }} className={`${styles.li} ${styles.experiance}`}>Experience
                <p className={styles.arrowWrapper}>

                  <i onClick={EdescendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                  <i onClick={EascendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.qualification}`}>Qualification</li>


              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Skills}`}>Skills Required</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Apply}`}>Apply</li>

            </ul>
            {PageLoader ?
              <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "49%", marginTop: "50px" }} />
              : ""
            }
            {
              jobs.length > 0 ?
                jobs
                  .map((items, i) => {
                    return (

                      <ul className={styles.ul} key={i}>
                        {/* } */}

                       
                       {/* <li className={`${styles.li} ${styles.Jtitle}`} onClick={() => navigate(`/Jobdetails/${btoa(items._id)}`)} style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>{items.jobTitle.charAt(0).toUpperCase()+items.jobTitle.substring(1)}</li> */}
                       
                       <li className={`${styles.li} ${styles.Jtitle}`} onClick={() => navigate(`/Jobdetails/${btoa(items._id)}?index=${i}`, {state: {selectedTag, },})} style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>{items.jobTitle.charAt(0).toUpperCase()+items.jobTitle.substring(1)}</li>
                        <li className={`${styles.li} ${styles.Source}`} >Itwalkin</li>

                        {
                          !items.Source ?

                            <li style={{ cursor: "pointer", textDecoration: "underline" }} className={`${styles.li} ${styles.CompanyName}`}
                              onClick={(e) => { checkEmpHalf(btoa(items.empId)) }}  >

                             
                              {items.companyName}</li>
                            :
                            <a style={{ cursor: "pointer", textDecoration: "underline" }} className={`${styles.li} ${styles.CompanyName}`} href={items.SourceLink} target="_blank" >
                             
                              {items.Source}

                            </a>

                        }

                       

                        <li className={`${styles.li} ${styles.JobType}`}>{items.jobtype}</li>

                        
                        <li className={`${styles.li} ${styles.date}`}>
                          {new Date(items.createdAt).toLocaleString(
                            "en-US",
                            {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </li>
                        {/* <li className={`${styles.li} ${styles.Location}`}>{items.jobLocation[0].toUpperCase() + items.jobLocation.slice(1)}</li> */}
                        <li className={`${styles.li} ${styles.Location}`}>{items?.jobLocation[0]?.toUpperCase() + items.jobLocation.slice(1)}</li>
                        <li className={`${styles.li} ${styles.Package}`}>{items.salaryRange==="" ? "Not Disclosed":items.salaryRange+"L" }</li>
                        <li className={`${styles.li} ${styles.experiance}`}>{items.experiance}Y</li>
                        {/* {console.log("qualifications - ",items)} */}
                        <li className={`${styles.li} ${styles.qualification}`}>{items.qualification}</li>
                        <li className={`${styles.li} ${styles.Skills}`}>{items.skills}
                        </li>

                        <li className={`${styles.li} ${styles.Apply}`}>
                          {
                            adminLogin ?
                              
                              <input type="checkbox" onClick={() => { checkBoxforDelete(items._id) }} />

                              :
                            
                                <button className={styles.Applybutton} onClick={() => { applyforJob(items._id) }}>Apply</button>

                          }
                        </li>
                      </ul>          
                    )
                  })
                : <p style={{ marginLeft: "47%", color: "red" }}>No Record Found</p>
            }
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginTop: "14px", marginLeft: "10px" }} >
              Show  <select onChange={(e) => { handleRecordchange(e) }}>
                {/* <option selected={lastIndex === 10} value={10}>10</option>
                <option selected={lastIndex === 25} value={25}>25</option>
                <option selected={lastIndex ==
                <option selected={lastIndex === 100} value={100}>100</option> */}
                <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
              </select>  jobs per page
            </div>

            <div className={styles.navigationWrapper}>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward' ></i>
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
         

        </>
        // Mobile View
        :
        <>
         <div className={styles.blogSearchContainer}>
             {/* <i style={{ visibility:showMobileSearchIcon?"visible":"hidden", color: "white", fontSize: "18px", cursor: "pointer" , marginLeft:"41px",marginTop:"-38px", position:"fixed",zIndex:"999"}} onClick={() => { searchIcon(searchKey) ;setSearchClick((currentvalue)=>!currentvalue);setShowMobileSearchIcon((currentvalue)=>!currentvalue);setShowSideNave((currentvalue)=>!currentvalue)}}
              class="searchicon fa fa-search" ></i> */}
            {/* <input style={{visibility:searchClick?"visible":"hidden"}} className={styles.blogInputboxsearch} type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => { search(e) }} /> */}
          </div>
       {/* <div style={{position:"fixed",zIndex:"999",top:"-4px",left:"175px"}}> */}
       {/* <div ref={dropdownRef} style={{ position: "relative" }}>
   <div style={{ display: "flex", marginLeft: "-45px", marginTop: "11px",position:"fixed" }}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          style={{background: "none",border: "none",cursor: "pointer",fontSize: "24px",color: "#007bff",}}>
          <img className={styles.jobLocationImage} src={location} alt="Location" />
        </button>
        <p style={{ marginTop: "17px", fontWeight: "bold", color: "white",width:"113px" }}>
          {selectedOption?.label}
        </p>
      </div>

     
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "57px",
            left: "126px",
            background: "white",
            color: "black",
            borderRadius: "20px",
            width: "154px",
            padding: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          
          <div
            style={{
              position: "absolute",
              top: "-9px",
              left: "25px",
              width: "0",
              height: "0",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "10px solid white",
            }}
          ></div>

        
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={option.img}
                  alt={option.label}
                  style={{ width: "22px", height: "22px", marginRight: "12px" }}
                />
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
        </div>  */}
        <>
        {/* <div style={{display:"flex"}}> */}
    {/* <h2 style={{marginLeft:"3%", fontWeight:"800", marginTop:"5px", marginBottom:"-15px"}}>Home</h2> */}
            {/* {console.log("show",ShowSideNave)} */}
          {/* <div className={styles.blogSearchContainer}>
             <i style={{ visibility:showMobileSearchIcon?"visible":"hidden", color: "white", fontSize: "18px", cursor: "pointer" , marginLeft:"41px",marginTop:"-38px", position:"absolute",zIndex:"999"}} onClick={() => { searchIcon(searchKey) ;setSearchClick((currentvalue)=>!currentvalue);setShowMobileSearchIcon((currentvalue)=>!currentvalue);setShowSideNave((currentvalue)=>!currentvalue)}}
              class="searchicon fa fa-search" ></i> */}
            {/* <input style={{visibility:searchClick?"visible":"hidden"}} className={styles.blogInputboxsearch} type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => { search(e) }} /> */}
          {/* </div> */}
          {/* </div> */}
          {/* <div className={styles.searchBoth}>
            <p className={styles.p}>Search </p>
            <input className={styles.inputboxsearch} type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => { search(e) }} />
          </div> */}
          {/* {Result ?
            <h4 style={{ marginLeft: "18.5%", marginTop: "10px" }}> {jobs.length} matching Result Found  </h4>
            : ""
          } */}
          {/* ...................... All Filter for Mobile */}
<div className={styles.MobLocationFilterWrapper}>
   {/* <div ref={dropdownRef} style={{ position: "relative" }}>
   <div style={{ display: "flex", marginLeft: "-45px", marginTop: "11px",position:"fixed" }}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          style={{background: "none",border: "none",cursor: "pointer",fontSize: "24px",color: "#007bff",}}>
          <img className={styles.jobLocationImage} src={location} alt="Location" />
        </button>
        <p style={{ marginTop: "17px", fontWeight: "bold", color: "white",width:"113px" }}>
          {selectedOption?.label}
        </p>
      </div>

     
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "57px",
            left: "126px",
            background: "white",
            color: "black",
            borderRadius: "20px",
            width: "154px",
            padding: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          
          <div
            style={{
              position: "absolute",
              top: "-9px",
              left: "25px",
              width: "0",
              height: "0",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "10px solid white",
            }}
          ></div>

        
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={option.img}
                  alt={option.label}
                  style={{ width: "22px", height: "22px", marginRight: "12px" }}
                />
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div> */}

         
            {/* {
              JobLocationTags.map((location, i) => {
                return (
                  <label> <input className={styles.MobJobtitleFilter} checked type="radio" disabled={location == "Chennai" || location == "Hyderabad" || location == "Mumbai" || location == "Delhi"} name="filter" onClick={() => { getLocation(location.toLowerCase()) }} />{location}</label>

                )
              })
            } */}
          </div>
          <div className={styles.JobtitleFilterWrapperMobile} style={{height:"101px", marginLeft:"9px"}}>
            <buton className={Active.length === 0 ? styles.active : styles.JobtitleFilter} onClick={() => { getjobs() }}>All</buton>
            {
              jobTags.map((tags, i) => {
                return (

                  <button disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                    tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                    className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                      styles.TagHeading :
                      //  Active === tags.value ? 
                      Active.findIndex((present) => {
                        return (
                          present === tags.value
                        )
                      }) >= 0 ?
                        styles.active : styles.JobtitleFilter} onClick={() => { filterByJobTitle(tags.value);updateTag(tags.value) }}>{tags.value} </button>

                )
              })
            }
          </div>

          {/* <Carousel
            swipeable={true}
            draggable={false}
            responsive={responsive}
            autoPlay={false}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            containerClass="carousel-container"
            infinite={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          > */}

            {/* <div style={{ display: "flex" }}> */}


              {/* <div className={styles.MobFilterJobTitleWrapper}>
                <label><input className={styles.MobJobtitleFilter} type="radio" name="Rfilter" onClick={() => { getjobs() }} />All</label>
                {
                  jobTags.map((tags, i) => {
                    return (
                      <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                        className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                          styles.TagHeading : styles.MobJobtitleFilter}
                        type="radio" name="Rfilter"
                        onClick={() => { filterByJobTitle(tags.value) }}
                      />{tags.value}</label>

                    )
                  }).slice(0, 4)
                }

              </div> */}

              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(4, 9)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(9, 14)
                }
              </div>
            </div> */}

            {/* ....up to here is 1st div i.e button in 1st display and now from down here is 2nd div..i.e 2nd display..................................... */}
            {/* <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(14, 19)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(19, 24)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(24, 29)
                }
              </div>
            </div> */}
            {/* ....from down here is 3rd div..i.e 3rd display..................................... */}
            {/* <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(29, 34)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(34, 39)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(39, 44)
                }
              </div>
            </div> */}
            {/* .................from down here is 4th div..i.e 4th display....................... */}
            {/* <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(44, 49)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(49, 54)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(54, 59)
                }
              </div>
            </div> */}
            {/* .................from down here is 5th div..i.e 5th display....................... */}

            {/* <div style={{ display: "flex" }}>

              <div className={styles.MobFilterJobTitleWrapper}>
                {
                  jobTags.map((tags, i) => {
                    return (
                      <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                        className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                          styles.TagHeading : styles.MobJobtitleFilter}
                        type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                    )
                  }).slice(59, 64)
                }
              </div> */}

              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(64, 69)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(69, 74)
                }
              </div>
            </div> */}

            {/* ....ufrom down here is 6th div..i.e 6th display..................................... */}
            {/* <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(74, 79)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(79, 84)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(84, 89)
                }
              </div>
            </div> */}
            {/* ....from down here is 7th div..i.e 7th display..................................... */}
            {/* <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(89, 94)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(94, 99)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(99, 104)
                }
              </div>
            </div> */}
            {/* .................from down here is 8th div..i.e 8th display....................... */}
            {/* <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(104, 109)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(109, 114)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(114, 119)
                }
              </div>
            </div> */}
            {/* .................from down here is 9th div..i.e 9th display....................... */}

            {/* <div style={{ display: "flex" }}>

              <div className={styles.MobFilterJobTitleWrapper}>
                {
                  jobTags.map((tags, i) => {
                    return (
                      <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                        className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                          styles.TagHeading : styles.MobJobtitleFilter}
                        type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                    )
                  }).slice(119, 124)
                }
              </div> */}

              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(124, 129)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(129, 134)
                }
              </div>
            </div> */}

            {/* ....from down here is 10th div..i.e 10th display..................................... */}
            {/* <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(134, 139)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(139, 144)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(144, 149)
                }
              </div>
            </div> */}
            {/* ....from down here is 11th div..i.e 11th display..................................... */}
            {/* <div style={{ display: "flex" }}>
              <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(149, 154)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(154, 159)
                }
              </div> */}
              {/* <div className={styles.MobFilterJobTitleWrapper}>
                {jobTags.map((tags, i) => {
                  return (
                    <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                      tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
                      className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
                        tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                        styles.TagHeading : styles.MobJobtitleFilter}
                      type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

                  )
                }).slice(159, 164)
                }
              </div>
            </div> */}


          {/* </Carousel> */}
          
          
          
          <div class={styles.homeMobileNextPrevBtn} style={{ diplay:"flex",flexDirection:"column",marginTop:"15px"}}>
          <div style={{ marginBottom: "5px", marginTop: "0", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
             
              {/* <option selected={lastIndex === 10} value={10}>10</option>
              <option selected={lastIndex === 25} value={25}>25</option>
              <option selected={lastIndex === 50} value={50}>50</option>
              <option selected={lastIndex === 100} value={100}>100</option> */}
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select>  jobs per page
          </div>
          
          <div className={styles.navigationWrapper} style={{textAlign:"left",marginLeft:"6px"}}>
              <button disabled={currentPage === 1} style={{ display: "inline", marginLeft: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward' ></i>
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
            {PageLoader ?
            <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "40%", marginTop: "50px" }} />
            : ""
          }
          <div id={styles.JobCardWrapper} >
            {
              jobs.length > 0 ?

                jobs.map((job, i) => {
                  return (
                    <>
                      <div className={styles.JobCard} key={i}>
                      {/* <p className={styles.readPageDate}>{new Date(job.createdAt).toLocaleString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                          } </p> */}
                          <div style={{marginTop:"-12px"}}>
                        <div className={styles.JobTitleDateWrapper} style={{display:"flex",gap:"16px"}}>
                          <p className={styles.jobTitle} onClick={() => {
                            window.scrollTo({
                              top: 0
                            })
                            navigate(`/Jobdetails/${btoa(job._id)}?index=${i}`, {state: {selectedTag, },})
                          }} style={{width:"100%", whiteSpace:"normal"}}>{job.jobTitle.charAt(0).toUpperCase()+job.jobTitle.substring(1)} </p>
                           <p className={styles.Date}>{new Date(job.createdAt).toLocaleString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                          } </p> 

                        </div>
                         
                       
                        <div className={styles.JobPagecompanyNameLocationWrapper}   >
                          {/* <img className={styles.logo} src={job.Logo} /> */}
                          {/* {console.log("home obj",job)} */}
                          <img className={styles.homePageCompanyLogo} src={ CompanyLogo} />

                          <div class={styles.jobTitleCompanyName}>
                          {!job.Source ?
                            
                            <> <span className={styles.companyName} onClick={() => { checkEmpHalf(btoa(job.empId)) }} >{job.companyName} </span><br></br></>
                            :
                            
                            <> <a className={`${styles.companyName}`} href={job.SourceLink} target="_blank">{job.Source}</a><br></br> </>
                          }
                          </div>
                        </div>
                        <  img className={styles.jobLocationImage} src={location} />
                        {/* <span className={styles.jobLocation}>{job.jobLocation[0].toUpperCase() + job.jobLocation.slice(1)} ,</span> */}
                        <span className={styles.jobLocation}>{job?.jobLocation[0]?.toUpperCase() + job.jobLocation.slice(1)} ,</span>
                    
                        <span className={styles.qualificationAndExperiance}>

                          <  img className={styles.graduationImage} src={graduation} />

                          {job.qualification}, {job.experiance}Y Exp ,   {job.jobtype}
                          {/* <span className={styles.jobtypeAndDate}> {job.jobtype}</span> */}
                        </span><br></br>

                        <span className={styles.jobtypeAndDate}>Source</span> :

                        <> <span className={styles.skills}>ItWalkin</span><br></br></>
                        {/* } */}

                        <div className={styles.skillWrapper}>
                          <span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}>{job.skills}</span><br></br>
                        </div>
                        <div className={styles.homeApplyPackage}>
                          <p className={styles.salaryRange}><span>&#8377;</span>{job.salaryRange===""? "Not Disclosed":job.salaryRange+"L"}</p>
                          {
                          
                            <button className={styles.homeApplyMobileBtn} onClick={() => { navigate("/JobSeekerLogin") }}><b>Apply</b></button>
                          }
                        </div>

                        <p className={styles.jobDescriptionHeading}>Job Description:</p>
                        <p className={styles.jobDescription}>
                          {
                            job.jobDescription ? HTMLReactParser(job.jobDescription.slice(0, 100).toString()) : ""
                          }
                          <span onClick={() => {
                            window.scrollTo({
                              top: 0
                            })
                            navigate(`/Jobdetails/${btoa(job._id)}`)
                          }} className={styles.seeMore}>
                            ...read more
                          </span>
                        </p>


                      </div>
                      </div>
                    </>
                  )
                })
                : <p style={{ marginLeft: "35%", color: "red" }}>No Record Found</p>

            }

          </div>
          <div class={styles.homeMobileNextPrevBtn} style={{ diplay:"flex",flexDirection:"column",marginTop:"15px"}}>
          <div style={{ marginBottom: "5px", marginTop: "0", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
             
              {/* <option selected={lastIndex === 10} value={10}>10</option>
              <option selected={lastIndex === 25} value={25}>25</option>
              <option selected={lastIndex === 50} value={50}>50</option>
              <option selected={lastIndex === 100} value={100}>100</option> */}
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select>  jobs per page
          </div>
          
          <div className={styles.navigationWrapper} style={{textAlign:"left",marginLeft:"6px"}}>
              <button disabled={currentPage === 1} style={{ display: "inline", marginLeft: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward' ></i>
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
          <div style={{ marginTop: "20px", }}>
            <Footer />
          </div>
        </>
        </>
      }

    </>

  )
}

export default Home
