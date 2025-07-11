import React, { useState, useEffect, useRef } from 'react';

import Footer from '../Footer/Footer';
import styles from "./Allobs.module.css"
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TailSpin, Puff } from "react-loader-spinner"
import location from "../img/icons8-location-20.png"
import graduation from "../img/icons8-graduation-cap-40.png"
import {jobTags} from '../Tags'
import HTMLReactParser from 'html-react-parser'


import useScreenSize from '../SizeHook';
import socketIO from 'socket.io-client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CompanyLogo from '../img/company-logo.png'

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
    items: 2
  },
  mobile: {
    breakpoint: { max: 864, min: 0 },
    items: 1
  }
};

// import { Bars } from  'react-loader-spinner'
function AllJobs({nopageFilter,setNoPageFilter,searchKey, setsearchKey,Filtereredjobs, setFiltereredjobs
  ,Result,setResult,Filterjobs, setFilterjobs,jobs, setJobs,count,setCount, Active,setActive,
  PageLoader,setPageLoader,totalCount,settotalCount,search,getjobs,gettotalcount,searchIcon,url
  ,searchClick,setSearchClick,ShowSideNave,setShowSideNave,showMobileSearchIcon,setShowMobileSearchIcon
}) {

  useEffect(() => {
    const socket = socketIO.connect(url, {
      auth: {
        token: JSON.parse(localStorage.getItem("StudId"))
      }
    });
  }, [])

  let JobLocationTags = ["Bangalore"]

  // const [jobs, setJobs] = useState([])
  // const [Filterjobs, setFilterjobs] = useState([])
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  // const [nopageFilter, setNoPageFilter] = useState(false)
  // const [Filtereredjobs, setFiltereredjobs] = useState([])

  const [isReadMore, setIsReadMore] = useState(true)
  const [jobapplied, setjobapplied] = useState(false)
  const [userProfile, setuserProfile] = useState([])
  const [showJobs, setshowJobs] = useState(false)
  const [showExperiance, setshowExperiance] = useState(false)
  const [showPackage, setshowPackage] = useState(false)
  // const [PageLoader, setPageLoader] = useState(false)
  // const [Result, setResult] = useState(false)
  const [nojob, setnojob] = useState("")
  const screenSize = useScreenSize();
  // const [Active, setActive] = useState([])

  const [Loader, setLoader] = useState(false)

  const [clickedJobId, setclickedJobId] = useState() //for single job loader
  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))

  // const [totalCount, settotalCount] = useState()

  // let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpage"))

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setrecordsPerPage] = useState(10)
  const[jobsPerPageValue,setJobsPerPageValue]=useState(10);

  const lastIndex = currentPage * recordsPerPage //10
  const firstIndex = lastIndex - recordsPerPage //5
  const records = jobs.slice(firstIndex, lastIndex)//0,5
  // const npage = Math.ceil(jobs.length / recordsPerPage) // last page
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

  const navigate = useNavigate()
  const Location = useLocation()

  async function getjobs() {
    setCount(1)
    setActive([])
    setJobTagsIds([])
    setPageLoader(true)
    setNoPageFilter(false)

    let userid = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
    await axios.get("/jobpost/getjobs", { headers })
      .then((res) => {
        let result = (res.data)
        gettotalcount()

        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        setFilterjobs(sortedate)
        setPageLoader(false)
      }).catch((err) => {
        alert("server issue occured")
      })
  }

    useEffect(() => {
      if (jobTagsIds.length < 1) {
        getjobs()
      } else {
        getTagId();
      }
    }, [currentPage, recordsPerPage])

  async function applyforOtherJob(Link) {
    // navigate("/JobSeekerLogin", { state: { Jid: id } })
    window.open(`${Link}`)
  }

  async function applyforJob(jobId) {
    let date = new Date()
    let userid = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
    setclickedJobId(jobId)
    setLoader(true)
    // setTimeout(async () => {

      await axios.put(`/jobpost/updatforJobApply/${jobId}`, { jobSeekerId, date }, { headers })
        .then((res) => {
          if (res.data) {
            setLoader(false)
            getjobs()
          }
        }).catch((err) => {
          alert("server issue occured", err)
        })
    // }, 5000)
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
    setsearchKey(key)

    setFiltereredjobs(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
      )
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

  // const [jobTitle, setjobTitle] = useState("")
  const [jobLocation, setjobLocation] = useState("AllL")
  const [jobTitle, setjobTitle] = useState("")
  // const [getJobTitle, setgetJobTitle] = useState(true)

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
        // setPageLoader(false)
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }

  async function getBothFiltered(jobTitle) {

    await axios.post(`/jobpost/getBothjobFilter/${jobLocation}`, { jobTitle })
      .then((res) => {
        let result = (res.data)
        // console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        // setPageLoader(false)
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }


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
    // sessionStorage.setItem("recordsperpage", JSON.stringify(e.target.value));
    // let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpage"))
    setJobsPerPageValue(Number(e.target.value));
    setrecordsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  async function getLocation(jobLocation) {
    setCount(1)
    setActive([])

    setFiltereredjobs(jobLocation)
    setNoPageFilter(true)
    await axios.get(`/jobpost/getjobLocation/${jobLocation}`)
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        // setPageLoader(false)
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }

  // const [count, setCount] = useState(1)
  const [jobTagIds, setjobTagIds] = useState([])

  const [jobTagsIds, setJobTagsIds] = useState([])
  // console.log("all dublicate ids", jobTagsIds)
//  useEffect(()=>{
//   setJobTagsIds([])
//   setJobs([])
//   getjobs()
//  },[])
 
  useEffect(() => {
    // console.log("jobTgaids---->",jobTagsIds)
    // setJobTagsIds([])
    if (jobTagsIds.length > 0) {
      // setJobs([])
      // getjobs()
      getTagId();
    }
  }, [jobTagsIds])

// ----------------------exp----------------------  


// ----------------------exp-----------------

  // const [pathChanged, setPathChanged] = useState(false);

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
        // console.log("data from uique id's",res.data)
        let result = res.data
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        if (count == 2) {
          setCurrentPage(1)
        }

      })
      // console.log("sd",jobs)
  }

  useEffect(()=>{
    if(Active.length>0){
      changeTags()
    }
  },[Active])

  async function filterByJobTitle(key) {
// console.log("clicked")
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
      // setActive([...Active, key])
      
      var updatedActive = [...Active, key]; // Add the new key to the array
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
      // console.log("in change",Active)
    }}
    async function changeTags(key){
      // console.log("in APi",Active)

    setNoPageFilter(true)
    setFiltereredjobs(key)
    await axios.get(`/jobpost/getTagsJobs/${Active}`)
      .then((res) => {
        let result = (res.data)
        // console.log("the total id's are", result)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        // setJobTagsIds(oldjobTagsIds => [...oldjobTagsIds, ...sortedate])
        setJobTagsIds(sortedate)
        // getTagId(sortedate)

        let elements = sortedate.flatMap(element => {
         
        });
      })
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
    // useEffect(()=>{
    //   setrecordsPerPage(1)
    // },[])
// const[searchClick,setSearchClick]=useState(false);
// console.log("jobs",jobs,"rcp",recordsPerPage)
const selectedTag=useRef("")
  const updateTag=(tag)=>{
    selectedTag.current=tag
  }

    // -----------------------table --------funtion---- starts-------------
    
    const unitOptions = ['kg', 'ltr', 'm', 'cm', 'box', 'piece'];
  
  
      const [rows, setRows] = useState([]);
       
      useEffect(() => {
        // If rows is empty, create initial rows
        if (rows.length === 0) {
          const initialRows = Array.from({ length: jobsPerPageValue }, () => ({
            description: "",
            referenceLink: "",
            unit: "",
            quantity: "",
            commentToSeller: "",
          }));
          setRows(initialRows);
        }
      }, []); // Run once on mount
    
      // Update rows length when jobsPerPageValue changes, preserving existing data
      useEffect(() => {
        setRows((prevRows) => {
          const currentLength = prevRows.length;
          if (jobsPerPageValue > currentLength) {
            // Add empty rows to extend the array
            const extraRows = Array.from({ length: jobsPerPageValue - currentLength }, () => ({
              description: "",
              referenceLink: "",
              unit: "",
              quantity: "",
              commentToSeller: "",
            }));
            return [...prevRows, ...extraRows];
          } else if (jobsPerPageValue < currentLength) {
            // Trim rows if jobsPerPageValue is less
            return prevRows.slice(0, jobsPerPageValue);
          }
          return prevRows; // same length, no change
        });
      }, [jobsPerPageValue]);
    
      // Handle input changes and update state immutably
      const handleInputChange = (value, rowIndex, field) => {
        setRows((prevRows) => {
          const newRows = [...prevRows];
          newRows[rowIndex] = { ...newRows[rowIndex], [field]: value };
          return newRows;
        });
      };
    
     
      const [hoveredAddArea, setHoveredAddArea] = useState(null);
      const [selectedCell, setSelectedCell] = useState(null);
      const [showDeleteOption, setShowDeleteOption] = useState(null);
      const [unitDropdownIndex, setUnitDropdownIndex] = useState(null);
      // const dropdownRef = useRef(null);
    
      const handleAddRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index + 1, 0, {
          description: '',
          referenceLink: '',
          unit: '',
          quantity: '',
          // unitPrice: '',
          // total: '',
          commentToSeller: '',
        });
        setRows(newRows);
      };
    
      const handleDeleteRows = (index) => {
        if (rows.length <= 1) return;
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
        setShowDeleteOption(null);
      };
    
      // const handleInputChange = (value, rowIndex, fieldName) => {
      //   const updatedRows = [...rows];
      //   updatedRows[rowIndex][fieldName] = value;
      //   setRows(updatedRows);
      // };
    
      const handleCellClick = (rowIndex, colIndex) => {
        setSelectedCell({ row: rowIndex, col: colIndex });
        setShowDeleteOption(null);
      };
    
      function handleArrowClick(rowIndex, colIndex, e) {
        e.stopPropagation();
        const key = colIndex === -1 ? `${rowIndex}-sno` : `${rowIndex}-${colIndex}`;
        setShowDeleteOption((prev) => (prev === key ? null : key));
      }
    
      const handleOutsideClick = (e) => {
        if (!e.target.closest('td')) {
          setSelectedCell(null);
          setShowDeleteOption(null);
          setUnitDropdownIndex(null);
        }
      };
    
      useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
      }, []);
  
      let studentAuth = localStorage.getItem("StudLog")
      // const applyforJob=()=>{
      //     if(studentAuth)
      //       handleSubmits()
      //     else
      //      navigate("/JobSeekerLogin")
      // }
    
      const handleSubmits = () => {
        const tableData = rows.map((row, index) => ({
          sno: index + 1,
          ...row,
        }));
      
        const AllData = {
          tableData: tableData,
          terms: terms
        };
      
        // console.log('Saved Data:', AllData );
      
        // Reset terms and set 10 empty rows
        const emptyRows = Array.from({ length: 10 }, () => ({
          description: "",
          referenceLink: "",
          unit: "",
          quantity: "",
          commentToSeller: "",
        }));
      
        setRows(emptyRows); // reset with 10 empty rows
        setTerms("");       // clear terms
      };
      
    
      const [terms, setTerms] = useState("");
      const updateTerms = (event) => {
        setTerms(event.target.value);
      };
    
      const handleUnitSelect = (rowIndex, unit) => {
        const current = rows[rowIndex].unit;
        const numberPart = current.match(/\d+/)?.[0] || "";
        const updatedRows = [...rows];
        updatedRows[rowIndex].unit = numberPart + unit;
        setRows(updatedRows);
        setUnitDropdownIndex(null);
      };

       const [hTitle, sethTitle] = useState("");
          const updatehTitle = (event) => {
            sethTitle(event.target.value);
          };

      useEffect(() => {
        const draftData = localStorage.getItem("draftApplicationData");
        if (draftData) {
          const parsedData = JSON.parse(draftData);
          console.log(parsedData)
          if (parsedData.tableData) setRows(parsedData.tableData);
          if (parsedData.terms) setTerms(parsedData.terms);
          if (parsedData.hTitle) sethTitle(parsedData.hTitle);
          localStorage.removeItem("draftApplicationData"); // Clean up after restore
        }
      
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
      }, []);
      

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

          <div className={styles.JobtitleFilterWrapper} style={{marginTop:"65px"}} >
            <buton className={Active.length===0?styles.active:styles.JobtitleFilter} onClick={() => { getjobs() }}>All</buton>
            {
              jobTags.map((tags, i) => {
                return (
                  
                  <button disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" 
                    || tags.value==="ROLE"  || tags.value==="COMPANY TYPE" 
                  } 
                    className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS"
                     || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                    styles.TagHeading:
                      // Active === tags.value ? 
                      Active.findIndex( (present)=>{
                        return(
                          present===tags.value
                        )
                            })>=0?
                    styles.active : styles.JobtitleFilter} onClick={() => { filterByJobTitle(tags.value);updateTag(tags.value) }}>{tags.value} </button>
                
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
              <p style={{ fontWeight: 400, marginLeft: "10px" }}>showing {firstIndex + 1} to {lastIndex}  Purchase Requirements</p>
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
              
               <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select>  rows per page
          </div>

          <div className={styles.Uiwarpper}>
           
            <div style={{display:"flex", marginLeft:"4%", gap:"4px", alignItems:"center"}}>
          <h2>Title : </h2>
          <input value={hTitle} onChange={(event) => updatehTitle(event)} style={{ width: "500px", height: "20px" }}></input>
        </div>
            <div className={styles.Uiwarpper} style={{ marginTop: "20px", marginLeft: "15px", marginRight: "20px" }}>
      <div className={styles.ul} style={{ marginTop: "-30px" }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '1px' }}></th>
              <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: "rgb(40,4,99)", color: "white", width:"40px" }}>SL.No</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: "rgb(40,4,99)", color: "white",width:"200px" }}>Title</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: "rgb(40,4,99)", color: "white",width:"200px" }}>Description</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: "rgb(40,4,99)", color: "white",width:"200px" }}>Reference Link to Amazon/Flipkart</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: "rgb(40,4,99)", color: "white",width:"34px" }}>Quantity</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: "rgb(40,4,99)", color: "white",width:"44px" }}>Unit</th>

              <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: "rgb(40,4,99)", color: "white",width:"140px" }}>Comment to Seller</th>
            </tr>
          </thead>
          <tbody>
  {rows.map((row, rowIndex) => (
    <tr key={rowIndex} onMouseLeave={() => setHoveredAddArea(null)}>
      {/* Add Row Button Cell */}
      <td
        style={{
          width: '1px',
          position: 'relative',
          background: hoveredAddArea === rowIndex ? '#f0f0f0' : '#fafafa',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setHoveredAddArea(rowIndex)}
        onMouseLeave={() => setHoveredAddArea(null)}
      >
        {hoveredAddArea === rowIndex && (
          <div
            onClick={() => handleAddRow(rowIndex)}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'black',
              userSelect: 'none',
            }}
          >
            +
          </div>
        )}
      </td>

      {/* S.No Cell with Delete Option */}
      <td
        style={{ border: '1px solid #ccc', padding: '8px', position: 'relative', cursor: 'pointer' }}
        onClick={() => handleCellClick(rowIndex, -1)} // Using -1 as colIndex for S.No
      >
        {rowIndex + 1}

        {/* Arrow icon for S.No cell */}
        {selectedCell?.row === rowIndex && selectedCell?.col === -1 && (
          <div
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleArrowClick(rowIndex, -1, e); // Pass -1 as colIndex for S.No
            }}
          >
            ▼
          </div>
        )}

        {/* Delete Row option for S.No cell */}
        {showDeleteOption === `${rowIndex}-sno` && (
          <div
            onClick={() => handleDeleteRows(rowIndex)}
            style={{
              position: 'absolute',
              top: '25px',
              right: '5px',
              fontSize: '14px',
              background: '#f44336',
              color: '#fff',
              padding: '5px',
              borderRadius: '5px',
              cursor: 'pointer',
              zIndex: 999,
              userSelect: 'none',
            }}
          >
            Delete Row
          </div>
        )}
      </td>

      {/* Other editable cells */}
      {['title','description', 'referenceLink', 'quantity', 'unit', 'commentToSeller'].map((fieldName, colIndex) => (
        <td
          key={colIndex}
          style={{ position: 'relative', border: '1px solid #ccc', padding: '0px' }}
          onClick={() => handleCellClick(rowIndex, colIndex)}
        >
          <textarea
            value={row[fieldName]}
            readOnly={fieldName === 'unit'}
            onClick={() => {
              if (fieldName === 'unit') {
                setUnitDropdownIndex(rowIndex);
              } else {
                setUnitDropdownIndex(null);
              }
            }}
            onChange={(e) => {
              let value = e.target.value;
              if (fieldName === 'quantity') value = value.replace(/\D/g, '');
              else if (fieldName === 'unit') setUnitDropdownIndex(null);
              handleInputChange(value, rowIndex, fieldName);
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            disabled={fieldName === 'unitPrice' || fieldName === 'total'}
            style={{
              width: '97%',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              overflow: 'hidden',
              overflowWrap: 'break-word',
              whiteSpace: 'pre-wrap',
              backgroundColor: fieldName === 'unitPrice' || fieldName === 'total' ? '#f2f2f2' : 'inherit',
              color: fieldName === 'unitPrice' || fieldName === 'total' ? '#555' : 'inherit',
              cursor: fieldName === 'unitPrice' || fieldName === 'total' ? 'not-allowed' : 'text',
            }}
          />
          {/* Arrow icon for editable cells */}
          {selectedCell?.row === rowIndex && selectedCell?.col === colIndex && (
            <div
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                userSelect: 'none',
              }}
              onClick={(e) => handleArrowClick(rowIndex, colIndex, e)}
            >
              ▼
            </div>
          )}
          {/* Delete Row option for editable cells */}
          {showDeleteOption === `${rowIndex}-${colIndex}` && (
            <div
              onClick={() => handleDeleteRows(rowIndex)}
              style={{
                position: 'absolute',
                top: '25px',
                right: '5px',
                fontSize: '14px',
                background: '#f44336',
                color: '#fff',
                padding: '5px',
                borderRadius: '5px',
                cursor: 'pointer',
                zIndex: 999,
                userSelect: 'none',
              }}
            >
              Delete Row
            </div>
          )}
          {/* Unit dropdown */}
          {fieldName === 'unit' && unitDropdownIndex === rowIndex && (
            <div
              ref={dropdownRef}
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                zIndex: 10,
                maxHeight: '100px',
                overflowY: 'auto',
                width: '100%',
              }}
            >
              {unitOptions.map((unit, i) => (
                <div
                  key={i}
                  onClick={() => handleUnitSelect(rowIndex, unit)}
                  style={{ padding: '6px', cursor: 'pointer' }}
                >
                  {unit}
                </div>
              ))}
            </div>
          )}
        </td>
      ))}
    </tr>
  ))}
</tbody>
        </table>
      </div>
      <div style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "23px", marginRight: "0px", display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2>Terms And Conditions</h2>
          <textarea value={terms} onChange={(event) => updateTerms(event)} style={{ width: "630px", height: "109px", borderRadius: "10px" }}></textarea>
        </div>
        <button
          onClick={handleSubmits}
          style={{
            padding: '10px 20px',
            backgroundColor: 'rgb(40,4,99)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            height: '42px',
            marginTop: '16px'
          }}
        >
          Submit
        </button>
      </div>
    </div>
 
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginTop: "14px", marginLeft: "10px" }} >
              Show  <select onChange={(e) => { handleRecordchange(e) }}>
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
        :
        // Mobile View
        <>
           
          
          <>
          <div className={styles.JobtitleFilterWrapper}>
            <buton className={Active.length===0?styles.active:styles.JobtitleFilter} onClick={() => { getjobs() }}>All</buton>
            {
              jobTags.map((tags, i) => {
                return (
                  // <buton className={Active === tags.value ? styles.active : styles.JobtitleFilter} onClick={() => { filterByJobTitle(tags.value) }}>{tags.value} </buton>
                  <button disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" 
                    || tags.value==="ROLE"  || tags.value==="COMPANY TYPE" 
                  } 
                    className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS"
                     || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                    styles.TagHeading:
                      // Active === tags.value ? 
                      Active.findIndex( (present)=>{
                        return(
                          present===tags.value
                        )
                            })>=0?
                    styles.active : styles.JobtitleFilter} onClick={() => { filterByJobTitle(tags.value);updateTag(tags.value) }}>{tags.value} </button>
                
                )
              })
            }
          </div>

         

          
          
          <div style={{ marginBottom: "5px", marginTop: "10px", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
              
              <option selected={lastIndex === 100} value={100}>100</option> 
               <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select>  jobs per page
          </div>
          <div className={styles.navigationWrapper} style={{textAlign:"left"}}>
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

            {PageLoader ?
            <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "40%", marginTop: "50px" }} />
            : ""
          }

          <div id={styles.JobCardWrapper} >

            {
             
                records.length > 0 ?
                records.map((job, i) => {
                  return (
                    <>
                      <div className={styles.JobCard} key={i}>
                     
                        <div className={styles.JobTitleDateWrapper} style={{marginTop:"-16px", display:"flex",gap:"18px"}}>
                          <p className={styles.jobTitle} onClick={() => {
                            window.scrollTo({
                              top: 0
                            })
                            navigate(`/Jobdetails/${btoa(job._id)}?index=${i}`, {state: {selectedTag, },})
                          }}style={{ width:"100%",whiteSpace:"normal"}} >{job?.jobTitle?.charAt(0).toUpperCase()+job.jobTitle.substring(1)}</p>
                          <p className={styles.Date}>{new Date(job.createdAt).toLocaleString(
                            "en-US",
                            {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )} </p>
                          </div>
                        
                        <div className={styles.JobPagecompanyNameLocationWrapper} >
                          
                          <img className={styles.homePageCompanyLogo} src={CompanyLogo} />
                          <div class={styles.jobTitleCompanyName}>
                          {!job.Source ?

                            <> <span className={styles.companyName} onClick={() => { navigate(`/CheckEmpHalfProfile/${btoa(job.empId)}`) }} >{job.companyName} </span><br></br></>
                            :
                           
                            <> <a className={`${styles.companyName}`} href={job.SourceLink} target="_blank">{job.Source}</a><br></br> </>
                          }
                          </div>

                        </div>

                        <  img className={styles.jobLocationImage} src={location} />
                       
                        <span className={styles.jobLocation}>{job?.jobLocation[0]?.toUpperCase() + job.jobLocation.slice(1)}</span>
                       
                        <span className={styles.qualificationAndExperiance}>
                          <  img className={styles.graduationImage} src={graduation} />

                          {job.qualification},   {job.experiance}Y Exp, {job.jobtype}
                          
                        </span><br></br>
                        <span className={styles.jobtypeAndDate}>Source</span> :

                        
                        <> <span className={styles.skills}>ItWalkin</span><br></br></>
                      

                       
                        <div className={styles.skillWrapper}>
                          <span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}>{job.skills}</span><br></br>
                        </div>

                        <div className={styles.ApplyPackageJobseeker}>
                          <p style={{marginLeft: "20px"}} className={styles.salaryRangeJobseeker}><span>&#8377;</span>{job.salaryRange==="" ? "Not Disclosed":job.salaryRange+"L" }</p>

                          {job.jobSeekerId.find((jobseeker) => {
                            return (
                              jobseeker.jobSeekerId == jobSeekerId
                            )
                          }) ?
                            <button className={styles.MobileAppliedButton} > Applied <span style={{ fontSize: '13.8px', marginBottom: "3px", marginLeft: "2px" }}>&#10004;</span></button>
                            :
                            // job .isApproved?
                            job.SourceLink ?
                              <button style={{marginRight: "13px"}} className={styles.ApplyMobileJobseeker} onClick={
                                handleSubmits
                              }>Apply</button>
                              :
                              <button style={{marginRight: "13px"}} className={styles.ApplyMobileJobseeker} onClick={ handleSubmits}>Apply
                                <span className={styles.Loader} >{Loader && job._id == clickedJobId ?
                                  <TailSpin color="white" height={20} />
                                  : ""}</span></button>
                            // :      <button className={styles.ApplyMobile} onClick={()=>{alert("You can not Apply for the job, Your account is under Approval Process")}} > Apply </button>

                          }
                        </div>
                        <p className={styles.jobDescriptionHeading}>Job Description:</p>
                        <p className={styles.jobDescription}>
                          {
    job.jobDescription? HTMLReactParser(job.jobDescription.slice(0,100).toString()) :""

                          }
                          <span onClick={() => {
                            window.scrollTo({
                              top: 0
                            })
                            navigate(`/Jobdetails/${btoa(job._id)}?index=${i}`, {state: {selectedTag, },})
                          }} className={styles.seeMore}>
                            ...read more
                          </span>
                        </p>
                      </div>
                    </>
                  )
                })
                : <p style={{ marginLeft: "35%", color: "red" }}>No Record Found</p>

            }

          </div>
          <div style={{ marginBottom: "5px", marginTop: "10px", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
               <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select>  jobs per page
          </div>
          <div className={styles.navigationWrapper} style={{textAlign:"left"}}>
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

          <div style={{marginTop:"20px",}}>
            <Footer/>
            </div>
        </>
        </>
      }

    </>

  )
}

export default AllJobs


