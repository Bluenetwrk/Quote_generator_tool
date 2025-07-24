
import React, { useRef } from 'react'
import styles from "../AppliedUserProfile/AppliedUserProfile.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import useScreenSize from '../SizeHook';
import profileDp from "../img/user_3177440.png"
import Arrowimage from '../img/icons8-arrow-left-48.png'
import Footer from '../Footer/Footer';
import {jobTags} from '../Tags'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import location from "../img/icons8-location-20.png"


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
    items: 8
  },
  mobile: {
    breakpoint: { max: 864, min: 0 },
    items: 1
  }
};

function AllJobs({nopageFilter,setNoPageFilter,searchKey, setsearchKey,Filtereredjobs, setFiltereredjobs
  ,Result,setResult,Filterjobs, setFilterjobs,jobs, setJobs,count,setCount, Active,setActive,
  PageLoader,setPageLoader,totalCount,settotalCount,searchs,getjobs,gettotalcount,searchIcon
  ,FilCandidate,setFilCandidate,getAllJobSeekers,Candidate,setCandidate
  ,searchClick,setSearchClick,ShowSideNave,setShowSideNave,showMobileSearchIcon,setShowMobileSearchIcon
}) {


  let params = useParams()
  let navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  // const [Candidate, setCandidate] = useState([])
  // const [FilCandidate, setFilCandidate] = useState([])
  // const [nopageFilter, setNoPageFilter] = useState(false)
  // const [Filtereredjobs, setFiltereredjobs] = useState([])

  const [jobSeekers, setjobSeekers] = useState([])
  const [NotFound, setNotFound] = useState("")
  // const [Result, setResult] = useState(false)
  const screenSize = useScreenSize();
  // const [Active, setActive] = useState([])
  
  const Location = ['Bangalore']
  // const [totalCount, settotalCount] = useState()

  // let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageSerachCand"))

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setrecordsPerPage] = useState(10)

  const lastIndex = currentPage * recordsPerPage //10
  const firstIndex = lastIndex - recordsPerPage //0
  const records = Candidate.slice(firstIndex, lastIndex)//0,5
  const npage = Math.ceil(totalCount / recordsPerPage) // last page

  // const number = [...Array(npage + 1).keys()].slice(1)



  async function gettotalcount() {
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get("/StudentProfile/getTotalCount", { headers })
      .then((res) => {
        // console.log(res.data.result)
        settotalCount(res.data.result)
      }).catch((err) => {
        alert("something went wrong")
      })
  }

  async function getAllJobSeekers() {
    setNoPageFilter(false)
    setActive([])
    setJobTagsIds([])

    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get(`/StudentProfile/getLimitJobs/${recordsPerPage}`, { params: { currentPage }, headers })

      .then((res) => {
        let result = (res.data)
        gettotalcount()
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setCandidate(sortedate)
        setFilCandidate(sortedate)
      })
  }
      useEffect(() => {
        if (jobTagsIds.length < 1) {
      getAllJobSeekers()
              // console.log("this")
        } else {
          // console.log("that")
          getTagId();
        }
      }, [currentPage, recordsPerPage])

  // const [searchKey, setsearchKey] = useState()

  async function searchIcon(key) {
    setFiltereredjobs(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...FilCandidate]
      const filteredItems = dubmyjobs.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
      )
      setCandidate(filteredItems)
    } else {
      getAllJobSeekers()
      setResult(false)
    }
  }

  async function search(e) {
    let key = e.target.value
    setsearchKey(key)
    setFiltereredjobs(key)

    if (key) {
      setResult(true)
      let dubmyjobs = [...FilCandidate]

      const filteredItems = dubmyjobs.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
      )
      setCandidate(filteredItems)
    } else {
      getAllJobSeekers()
      setResult(false)

    }
  }

  function CheckProfile(StudID) {
    window.open(`/Check-Profile/${StudID}`, '_blank')
  }



  async function getLocation(jobLocation) {
    setFiltereredjobs(jobLocation)
    setNoPageFilter(true)
    await axios.get(`/StudentProfile/getStuLocation/${jobLocation}`)
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setCandidate(sortedate)
        // setPageLoader(false)
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

  function handleRecordchange(e){  
    // sessionStorage.setItem("recordsperpageSerachCand", JSON.stringify(e.target.value));
    // let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageSerachCand"))
    setrecordsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }
    // const [count, setCount]=useState(1)
  
      const [jobTagsIds, setJobTagsIds] = useState([])

      useEffect(() => {
        if (jobTagsIds.length > 0) {
          // console.log("thisss")
          getTagId();
        }
      }, [jobTagsIds])




      let ids = jobTagsIds.map((id) => {
        return (
          id._id
        )
      })
      const uniqueList = [...new Set(ids)];
      async function getTagId() {
        settotalCount(uniqueList.length)
        await axios.get(`/StudentProfile/jobTagsIds/${uniqueList}`, {
          params: { currentPage, recordsPerPage }
        })
          .then((res) => {
            // console.log("data from uique id's",res.data)
            let result = res.data
            let sortedate = result.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setCandidate(sortedate)
            if (count == 2) {
              setCurrentPage(1)
            }
    
          })
          // console.log("candidate",Candidate)
      }
    
      useEffect(()=>{
        if(Active.length>0){
          changeTags()
        }
      },[Active])
    
  

  async function filterByJobTitle(key) {
    if(count==1){
      setCandidate([])
    }
    setCount(prev=>prev+1)
    const isIndex=Active.findIndex((present)=>{
return(
  present===key
)
    })
    if(isIndex<0){
    var updatedActive = [...Active, key]; 
    setActive(updatedActive);
    }else{
      const IndexId=Active.findIndex((present)=>{
        return(
          present==key
        )
            })
            Active.splice(IndexId,1)
                if(Active.length===0){
                  getAllJobSeekers()
                  return false
    }
    changeTags()
  }}

  async function changeTags(key){

    setNoPageFilter(true)
    setFiltereredjobs(key)
    await axios.get(`/StudentProfile/getTagsJobs/${Active}`)
      .then((res) => {
        let result = (res.data)
        // console.log(result)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
    
      })
  }

      
  function NoticeAscendingOrder() {
    let newjob = [...FilCandidate]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.NoticePeriod, a.NoticePeriod)
    })
    setCandidate(sorted)
  }


  function NoticeDescendingOrder() {
    let newjob = [...FilCandidate]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.NoticePeriod, b.NoticePeriod)
    })
    setCandidate(sorted)
  }

  // .......age Sorting.......
  function AgeDescendingOrder() {
    let newjob = [...FilCandidate]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.age, b.age)
    })
    setCandidate(sorted)
  }
  function AgeAscendingOrder() {
    let newjob = [...FilCandidate]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.age, a.age)
    })
    setCandidate(sorted)
  }


  // .......Experiance Sorting.......
  function ExpDescendingOrder() {
    let newjob = [...FilCandidate]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.Experiance, b.Experiance)
    })
    setCandidate(sorted)
  }
  function ExpAscendingOrder() {
    let newjob = [...FilCandidate]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.Experiance, a.Experiance)
    })
    setCandidate(sorted)
  }

  // .......Curent CTC Sorting.......
  function CurrCTCDescendingOrder() {
    let newjob = [...FilCandidate]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.currentCTC, b.currentCTC)
    })
    setCandidate(sorted)
  }
  function CurrCTCAscendingOrder() {
    let newjob = [...FilCandidate]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.currentCTC, a.currentCTC)
    })
    setCandidate(sorted)
  }

  // .......Expected CTC Sorting.......
  function ExpCTCDescendingOrder() {
    let newjob = [...FilCandidate]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.ExpectedSalary, b.ExpectedSalary)
    })
    setCandidate(sorted)
  }
  function ExpCTCAscendingOrder() {
    let newjob = [...FilCandidate]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.ExpectedSalary, a.ExpectedSalary)
    })
    setCandidate(sorted)
  }

  // .......Last Active Sorting.......
  function LastActDescendingOrder() {
    let newjob = [...FilCandidate]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.updatedAt, b.updatedAt)
    })
    setCandidate(sorted)
  }

  function LastActAscendingOrder() {
    let newjob = [...FilCandidate]
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.updatedAt, a.updatedAt)
    })
    setCandidate(sorted)
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

  return (
    <>
      {screenSize.width > 850 ?
        <>
  <div className={styles.NavConetenetWrapper}>



</div>
         
        </>
        : ""
      }

      {screenSize.width > 850 ?
        <>
          <h2 style={{marginLeft:"10px", fontWeight:"800", marginTop:"54px", marginBottom:"-47px"}}> Seller Home </h2>
            <div className={styles.JobtitleFilterWrapper} style={{marginTop:"55px"}}>
                   <buton className={Active.length===0?styles.active:styles.JobtitleFilter} onClick={() => 
                { getAllJobSeekers() }}>All</buton>
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
                      Active.findIndex(  (present)=>{
                        return(
                          present===tags.value
                        )
                            }) >=0?
                      styles.active : styles.JobtitleFilter} onClick={() => 
                        { filterByJobTitle(tags.value) }}>{tags.value} </button>
                  
                  )
                })
              }
              </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
          
{nopageFilter ?
              <p style={{ fontWeight: 400, marginLeft: "10px" }}>Displaying <span style={{ color: "blue" }}>
                {uniqueList.length} </span>Jobs with following matching tags:
                <span style={{ color: "blue" }}>{Active.toString()}</span></p>
              :
              <p style={{ fontWeight: 400, marginLeft: "10px" }}>showing {firstIndex + 1} to {lastIndex} latest Purchase Requirements</p>
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

          <div style={{marginBottom:"5px", marginTop:"0", marginLeft:"10px"}}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
              <option selected = {lastIndex === 10} value={10}>10</option>
              <option selected = {lastIndex === 25} value={25}>25</option>
              <option selected = {lastIndex === 50} value={50}>50</option>
              <option selected = {lastIndex === 100} value={100}>100</option>
            </select>  rows per page
            </div>

          <div className={styles.AllUiWrapper}>
            <ul className={styles.ul} >
              <li style={{width:"6%", backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.name}`}><b> SL.No</b>
              </li>
              <li style={{width:"18%", backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.NoticePeriod}`}><b>company Name</b>
                <p style={{ display: "inline", marginLeft: "4%" }}>
                  <i onClick={NoticeAscendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                  <i onClick={NoticeDescendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>

              <li style={{width:"51%", backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.Skills}`}> <b>Requirement Title</b> </li>
              <li style={{width:"18%", backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.currentCTC}`}> <b>Posted on</b>
                <p style={{ display: "inline", marginLeft: "2%" }}>
                  <i onClick={CurrCTCAscendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                  <i onClick={CurrCTCDescendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>
        
              <li style={{width:"10%", backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.LastActive}`}><b>View</b>
                <p style={{ display: "inline", marginLeft: "1%" }}>
                  <i onClick={LastActAscendingOrder} className={`${styles.arrow} ${styles.up}`}> </i>
                  <i onClick={LastActDescendingOrder} className={`${styles.arrow} ${styles.down}`}></i>
                </p>
              </li>


            </ul>
           
                      <>
 
                        <ul className={styles.ul} >
                          <li style={{width:"6%"}} className={`${styles.li} ${styles.name} ${styles.onclick}`}  >
                            {} </li>

                          <li style={{width:"18%"}} className={`${styles.li} ${styles.NoticePeriod}`}> {} </li>
                          <li style={{width:"51%"}} className={`${styles.li} ${styles.Skills}`}> {} </li>
                          <li style={{width:"18%"}} className={`${styles.li} ${styles.currentCTC}`}> {} </li>
                         

                          <li style={{width:"10%"}} className={`${styles.li} ${styles.LastActive}`}>
                            
                            <button className={styles.Applybutton} onClick={() => { navigate("/Seller-view-details") }}>View Details</button>

                                           </li>

                        </ul>
                      </>

            
            <div>
            </div>
          </div >
          <div style={{ display: "flex", justifyContent: "space-between"}}>
          <div style={{marginTop:"10px", marginLeft:"10px"}}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
              <option selected = {lastIndex === 10} value={10}>10</option>
              <option selected = {lastIndex === 25} value={25}>25</option>
              <option selected = {lastIndex === 50} value={50}>50</option>
              <option selected = {lastIndex === 100} value={100}>100</option>
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
        :
        <>

       
          <h2 style={{marginLeft:"3%", fontWeight:"800", marginTop:"5px", marginBottom:"-15px"}}>Seller Home</h2>

           <div className={styles.JobtitleFilterWrapper}>
                   <buton className={Active.length===0?styles.active:styles.JobtitleFilter} onClick={() => 
                { getAllJobSeekers() }}>All</buton>
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
                      Active.findIndex(  (present)=>{
                        return(
                          present===tags.value
                        )
                            }) >=0?
                      styles.active : styles.JobtitleFilter} onClick={() => 
                        { filterByJobTitle(tags.value) }}>{tags.value} </button>
                  
                  )
                })
              }
              </div>



          <div id={styles.JobCardWrapper} >

           
                <>
                  <div className={styles.JobCard} >
                    <div style={{ display: "flex" }}>

                      <div className={styles.LeftTable}>
                        <span className={styles.span}>SL No :  </span> <br></br>
                        <span className={styles.span}>Company :</span><br></br>
                        <span className={styles.span}>Requirement Title :</span><br></br>
                        <span className={styles.span}>posted on :</span><br></br>
                      </div>

                      <div className={styles.RightTable}>
                          
                        <span className={styles.span}> <span style={{ color: "red" }}>Not Available</span></span><br></br>
                        <span className={styles.span}> <span style={{ color: "red" }}>Not Available</span></span><br></br>
                         <span className={styles.span}><span style={{ color: "red" }}>Not Available</span></span><br></br>
                        <span className={styles.span}> 
                            NotAvailable
                            
                        </span><br></br>
                      </div>
                      

                    </div>
                    <button className={styles.ApplybuttonMobile} >View Details</button>

                  </div>
                </>
              

          </div>
          <div style={{marginTop:"10px"}}>
          <Footer/>
        </div>
        </>
      }



    </>
  )
}

export default AllJobs;