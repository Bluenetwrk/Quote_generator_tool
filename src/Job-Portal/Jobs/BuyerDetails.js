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


function SellerViewDetails({nopageFilter,setNoPageFilter,searchKey, setsearchKey,Filtereredjobs, setFiltereredjobs
  ,Result,setResult,Filterjobs, setFilterjobs,jobs, setJobs,count,setCount, Active,setActive,
  PageLoader,setPageLoader,totalCount,settotalCount,search,getjobs,gettotalcount,}) 
{

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true)
  const [showJobs, setshowJobs] = useState(false)
  const [showExperiance, setshowExperiance] = useState(false)
  const [showPackage, setshowPackage] = useState(false)
  const [NotFound, setNotFound] = useState("")
  // const [Active, setActive] = useState([])
  const screenSize = useScreenSize();

  let JobLocationTags = ["Bangalore"]

  let navigate = useNavigate()

  let adminLogin = localStorage.getItem("AdMLog")

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

const[submitClicked, setSubmitClicked]=useState(false)
// const[editClicked, setEditClicked]=useState(false)

const handleSubmits=()=>{
  console.log("set exectuted")
  setSubmitClicked(true)
}

const handleEdit=()=>{
   setSubmitClicked(false)
}

  return (
    <>
      {screenSize.width > 850 ?

        <>
          <div className={adminLogin ? styles.HomeNavConetenetWrapperAdmin : styles.HomeNavConetenetWrapper}>
          
          </div>
         
        </>
        : ""
      }

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
         

         <h2 style={{marginLeft:"10px", fontWeight:"800", marginTop:"56px", marginBottom:"-45px"}}>View Details </h2>
          <div className={styles.JobtitleFilterWrapper} style={{marginTop:"60px"}}>
            <buton className={Active.length === 0 ? styles.active : styles.JobtitleFilter} onClick={() => { getjobs() }}>All</buton>
            {
              jobTags.map((tags, i) => {
                return (

                  <button disabled={tags.value === "OFFICE EQUIPMENT" || tags.value === "OFFICE FURNITURE" || tags.value === "STATIONERY & OFFICE SUPPLIES" || tags.value === "FACILITY & MAINTENANCE SUPPLIES" || tags.value === "CORPORATE GIFTING & BRANDING" ||
                    tags.value === "EMPLOYEE &  SAFETY ESSENTIALS" || tags.value === "EVENT & TRAINING MATERIALS" || ""}
                    style={{backgroundColor:
                      tags.value === "OFFICE EQUIPMENT" ? "#ff9999" :
      tags.value === "OFFICE FURNITURE" ? "#99ccff" :
      tags.value === "STATIONERY & OFFICE SUPPLIES" ? "#ccffcc" :
      tags.value === "FACILITY & MAINTENANCE SUPPLIES" ? "#ffff99" :
      tags.value === "CORPORATE GIFTING & BRANDING" ? "#ffccff" :
      tags.value === "EMPLOYEE &  SAFETY ESSENTIALS" ? "#d9b3ff" :
      tags.value === "EVENT & TRAINING MATERIALS" ? "#ffb366" :
     
      "",}}
                    className={tags.value === "OFFICE EQUIPMENT" || tags.value === "OFFICE FURNITURE" || tags.value === "STATIONERY & OFFICE SUPPLIES" || tags.value === "FACILITY & MAINTENANCE SUPPLIES" || tags.value === "CORPORATE GIFTING & BRANDING" ||
                      tags.value === "EMPLOYEE &  SAFETY ESSENTIALS" || tags.value === "EVENT & TRAINING MATERIALS" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                    styles.TagHeading: 
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
    
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select>  rows per page
          </div>

          <div style={{ display:"flex", gap:"12px", marginBottom: "15px", marginTop: "20px", marginLeft: "15px" }}>
               <button className={styles.companyBtn}>Buyer/Purchase  Request 1</button>
               <button className={styles.companyBtn}>Buyer/Purchase  Request 2</button>
          </div>
         
          <div className={styles.Uiwarpper}>
            <ul className={styles.ul} style={{ color: 'white', fontWeight: "bold" }}>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Jtitle}`}>SL.NO</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Source}`}>Description</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.CompanyName}`}>Link</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.JobType}`}>HSN code</li>

              {/* <li className={`${styles.li} ${styles.HliDescription}`}><b>Job description</b></li> */}
              <li style={{ backgroundColor: " rgb(40, 4, 99)", }} className={`${styles.li} ${styles.date}`}>Quantity
                <p className={styles.arrowWrapper} >
                  <i onClick={sortbyNewjobs} className={`${styles.arrow} ${styles.up}`} ></i>
                  <i onClick={sortbyOldjobs} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>
              
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Location}`}>Unit Price</li>

              <li style={{ backgroundColor: " rgb(40, 4, 99)", }} className={`${styles.li} ${styles.Package}`}>Total Price
                <p className={styles.arrowWrapper}>

                  <i onClick={SdescendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                  <i onClick={SascendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>

             

              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Skills}`}>Buyer comments</li>
              
            </ul>
            {PageLoader ?
              <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "49%", marginTop: "50px" }} />
              : ""
            }
            {/* {
              jobs.length > 0 ?
                jobs
                  .map((items, i) => {
                    return ( */}

                      <ul className={styles.ul} >
                         <li className={`${styles.li} ${styles.Jtitle}`} style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>{}</li>
                        <li className={`${styles.li} ${styles.Source}`} ></li>


                        <li style={{ cursor: "pointer", textDecoration: "underline" }} className={`${styles.li} ${styles.CompanyName}`}
                              >       
                        {}
                        </li>

                       

                        <input type='text' className={`${styles.li} ${styles.JobType}`}>{}</input>

                        
                        <li className={`${styles.li} ${styles.date}`}>
                          {/* {new Date(items.createdAt).toLocaleString(
                            "en-US",
                            {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )} */}
                        </li>
                        {/* <li className={`${styles.li} ${styles.Location}`}>{items.jobLocation[0].toUpperCase() + items.jobLocation.slice(1)}</li> */}
                        <input type='text' className={`${styles.li} ${styles.Location}`}>{}</input>
                        <li className={`${styles.li} ${styles.Package}`}>{}</li>
                        <li className={`${styles.li} ${styles.Skills}`}>{}
                        </li>

                       
                      </ul>          
            {/* //         )
            //       })
            //     : <p style={{ marginLeft: "47%", color: "red" }}>No Record Found</p>
            // } */}
          </div>

      <div style={{marginTop:"10px", marginBottom:"10px", marginLeft:"23px",marginRight:"0px", display:"flex", justifyContent:"space-between"}}>
        <div style={{marginTop:"109px",marginBottom:"-32px"}}>
          <h2>TermsAndConditions</h2>
          <textarea  style={{width:"430px",height:"80px", borderRadius:"10px"}}></textarea>
        </div> 
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px', margin: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
        <h3 style={{ margin: 0, width: '100%' }}>Total</h3>
        <input type="text" style={{ flex: 1, padding: '6px' }} disabled />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
        <h3 style={{ margin: 0, width: '100%' }}>Discount</h3>
        <input type="text" style={{ flex: 1, padding: '6px' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
        <h3 style={{ margin: 0, width: '100%' }}> Grand Total</h3>
        <input type="text" style={{ flex: 1, padding: '6px' }} disabled />
      </div>
      </div>  
      </div>

      
        
        <div style={{display:"flex",flexDirection:"row-reverse", marginLeft:"20px", marginTop:"-25px" }}>
            <div style={{display:"flex",gap:"5px", marginRight:"100px"}}>
            <button
        //   onClick={handleSubmits}
          style={{
            padding: '10px 20px',
            backgroundColor: submitClicked ? 'grey' : 'rgb(40,4,99)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            height:'32px',
            marginTop: '16px',
            // marginright: '-150px;'
          }}
          disabled={submitClicked}
        >
         Save
        </button>
        <button
          onClick={handleSubmits}
          style={{
            padding: '10px 20px',
            backgroundColor: submitClicked ? 'grey' : 'rgb(40,4,99)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            height:'32px',
            marginTop: '16px',
            // marginright: '-150px;'
          }}
          disabled={submitClicked}
        >
          Submit
        </button>
        <button
          onClick={handleEdit}
        style={{
          padding: '10px 20px',
          backgroundColor: submitClicked ? 'rgb(40,4,99)' : 'grey',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          height: '32px',
          marginTop: '16px',
          // marginRight: '-150px' // Note: CSS properties are camelCased in React
        }}
        disabled={!submitClicked}
      >
          Edit
        </button>
            </div>
        </div>
 



          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginTop: "14px", marginLeft: "10px" }} >
              Show  <select onChange={(e) => { handleRecordchange(e) }}>
               
                <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
              </select>  rows per page
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
                       </div>
      
        <>
        
          {/* ...................... All Filter for Mobile */}
<div className={styles.MobLocationFilterWrapper}>
  
          </div>
          <div className={styles.JobtitleFilterWrapperMobile} style={{height:"101px", marginLeft:"9px"}}>
            <buton className={Active.length === 0 ? styles.active : styles.JobtitleFilter} onClick={() => { getjobs() }}>All</buton>
            {
              jobTags.map((tags, i) => {
                return (

                  <button disabled={tags.value === "OFFICE EQUIPMENT" || tags.value === "OFFICE FURNITURE" || tags.value === "STATIONERY & OFFICE SUPPLIES" || tags.value === "FACILITY & MAINTENANCE SUPPLIES" || tags.value === "CORPORATE GIFTING & BRANDING" ||
                    tags.value === "EMPLOYEE &  SAFETY ESSENTIALS" || tags.value === "EVENT & TRAINING MATERIALS" || ""}
                    style={{backgroundColor:
                      tags.value === "OFFICE EQUIPMENT" ? "#ff9999" :
      tags.value === "OFFICE FURNITURE" ? "#99ccff" :
      tags.value === "STATIONERY & OFFICE SUPPLIES" ? "#ccffcc" :
      tags.value === "FACILITY & MAINTENANCE SUPPLIES" ? "#ffff99" :
      tags.value === "CORPORATE GIFTING & BRANDING" ? "#ffccff" :
      tags.value === "EMPLOYEE &  SAFETY ESSENTIALS" ? "#d9b3ff" :
      tags.value === "EVENT & TRAINING MATERIALS" ? "#ffb366" :
     
      "",}}
                    className={tags.value === "OFFICE EQUIPMENT" || tags.value === "OFFICE FURNITURE" || tags.value === "STATIONERY & OFFICE SUPPLIES" || tags.value === "FACILITY & MAINTENANCE SUPPLIES" || tags.value === "CORPORATE GIFTING & BRANDING" ||
                      tags.value === "EMPLOYEE &  SAFETY ESSENTIALS" || tags.value === "EVENT & TRAINING MATERIALS" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
                    styles.TagHeading: 
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
            </select> rows per page
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

export default SellerViewDetails
