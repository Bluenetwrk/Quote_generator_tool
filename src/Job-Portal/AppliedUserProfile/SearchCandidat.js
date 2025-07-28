
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

function SearchCandidate({nopageFilter,setNoPageFilter,searchKey, setsearchKey,Filtereredjobs, setFiltereredjobs
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
  const[jobsPerPageValue,setJobsPerPageValue]=useState(10);

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

    //-----------------Buyer codes------------------------
    
           const [hTitle, sethTitle] = useState("");
             const [creationDate, setCreationDate] = useState(''); 
              const updatehTitle = (event) => {
                sethTitle(event.target.value);
              };

              

              const unitOptions = [
                { name: "Inch" },
                { name: "Job" },
                { name: "Kilograms" },
                { name: "Meter" },
                { name: "Millimeter" },
                { name: "Minute" },
                { name: "Month" },
                { name: "Pair" },
                { name: "Pound" },
                { name: "Year" },
                { name: "Cubic Cm" },
                { name: "Day" },
                { name: "Drop" },
                { name: "Drum" },
                { name: "Each" },
                { name: "Foot" },
                { name: "Hour" }
              ];
                
                
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
                      updatedRows[rowIndex].unit = numberPart + " " + unit.name;  // or unit.display, etc.
                      setRows(updatedRows);
                      setUnitDropdownIndex(null);
                    };
                    

                    useEffect(() => {
                            const draftData = localStorage.getItem("draftApplicationData");
                            if (draftData) {
                              const parsedData = JSON.parse(draftData);
                              // console.log("sdsd",parsedData)
                              if (parsedData.tableData) setRows(parsedData.tableData);
                              // console.log("sdsd",parsedData.tableData)
                              if (parsedData.terms) setTerms(parsedData.terms);
                              if (parsedData.hTitle) sethTitle(parsedData.hTitle);
                              if (parsedData.creationDate) setCreationDate(parsedData.creationDate);
                              localStorage.removeItem("draftApplicationData"); // Clean up after restore
                            }
                          
                            document.addEventListener('click', handleOutsideClick);
                            return () => document.removeEventListener('click', handleOutsideClick);
                          }, []);

                          useEffect(()=>{
console.log("rows",rows)
                          },[rows])

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
          <h2 style={{marginLeft:"10px", fontWeight:"800", marginTop:"54px", marginBottom:"-47px"}}>Buyer Home </h2>
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

            <div className={styles.Uiwarpper}>
           
           <div style={{display:"flex", marginLeft:"1%", gap:"4px", alignItems:"center"}}>
         <h2>Title : </h2>
         <input value={hTitle} onChange={(event) => updatehTitle(event)} style={{ width: "500px", height: "20px" }}></input>
       </div>

       <div style={{ marginBottom: '20px' ,marginLeft:"1%", }}>
        <label style={{ fontWeight: 'bold' }}>Date of Creation of Purchase Requirements:</label>
        <input
          type="date"
          value={creationDate}
          onChange={(e) => setCreationDate(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
           {/* <div className={styles.Uiwarpper} style={{ marginTop: "20px", marginLeft: "15px", marginRight: "20px" }}> */}
     <div className={styles.ul} style={{ marginTop: "-30px", marginLeft:"-1%" }}>
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
            left: '-97px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            zIndex: 10,
            maxHeight: '200px',
            overflowY: 'auto',
            width: '26vw',
          }}
        >
         
          <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            padding: '10px'
          }}
        >
          {unitOptions.map((unit, i) => (
            <div
              key={i}
              onClick={() => handleUnitSelect(rowIndex, unit)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: '#f9f9f9',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e6f7ff'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f9f9f9'}
            >
              {unit.name}
            </div>
          ))}
        </div>
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
   {/* </div> */}

         </div>
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

       
          <h2 style={{marginLeft:"3%", fontWeight:"800", marginTop:"5px", marginBottom:"-15px"}}>Buyer Home</h2>

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
{/* 


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
              

          </div> */}
          <div style={{marginTop:"10px"}}>
          <Footer/>
        </div>
        </>
      }



    </>
  )
}

export default SearchCandidate;