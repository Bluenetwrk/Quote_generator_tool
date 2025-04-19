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


function BuyersHome({nopageFilter,setNoPageFilter,searchKey, setsearchKey,Filtereredjobs, setFiltereredjobs
  ,Result,setResult,Filterjobs, setFilterjobs,jobs, setJobs,count,setCount, Active,setActive,
  PageLoader,setPageLoader,totalCount,settotalCount,search,getjobs,gettotalcount,searchIcon
  ,searchClick,setSearchClick,ShowSideNave,setShowSideNave,showMobileSearchIcon,setShowMobileSearchIcon,selectedlocationOption
}) {

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
 
const initialRows = Array.from({ length: 10 }, () => "");

  const [sno, setSno] = useState([...initialRows]);
  const [description, setDescription] = useState([...initialRows]);
  const [reference, setReference] = useState([...initialRows]);
  const [qty, setQty] = useState([...initialRows]);
  const [unitPrice, setUnitPrice] = useState([...initialRows]);
  const [total, setTotal] = useState([...initialRows]);
  const [comments, setComments] = useState([...initialRows]);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleChange = (setter, index, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleInsertRow = (position) => {
    const insertEmpty = (arr) => [
      ...arr.slice(0, position),
      "", // insert an empty value at position
      ...arr.slice(position),
    ];
  
    setSno((prev) => insertEmpty(prev));
    setDescription((prev) => insertEmpty(prev));
    setReference((prev) => insertEmpty(prev));
    setQty((prev) => insertEmpty(prev));
    setUnitPrice((prev) => insertEmpty(prev));
    setTotal((prev) => insertEmpty(prev));
    setComments((prev) => insertEmpty(prev));
  };
  

  const handleDeleteRow = (index) => {
    if (sno.length <= 1) return;
    const removeAt = (arr) => arr.filter((_, i) => i !== index);
    setSno(removeAt);
    setDescription(removeAt);
    setReference(removeAt);
    setQty(removeAt);
    setUnitPrice(removeAt);
    setTotal(removeAt);
    setComments(removeAt);
  };

  const handleSubmit = () => {
    const result = sno.map((_, index) => ({
      sno: sno[index],
      description: description[index],
      reference: reference[index],
      unitPrice: unitPrice[index],
      qty: qty[index],
      total: total[index],
      comments: comments[index],
    }));

    const emptyRows = Array(sno.length).fill("");
    setSno([...emptyRows]);
    setDescription([...emptyRows]);
    setReference([...emptyRows]);
    setUnitPrice([...emptyRows]);
    setQty([...emptyRows]);
    setTotal([...emptyRows]);
    setComments([...emptyRows]);

    console.log("Submitted Data:", result);
  };



  // -----------------------table --------funtion---- starts-------------
  
    const initialData = Array.from({ length: 10 }, () => ({
      description: '',
      referenceLink: '',
      quantity: '',
      unitPrice: '',
      total: '',
      commentToSeller: '',
    }));
  
    const [rows, setRows] = useState(initialData);
    const [hoveredAddArea, setHoveredAddArea] = useState(null);
    const [selectedCell, setSelectedCell] = useState(null);
    const [showDeleteOption, setShowDeleteOption] = useState(null);
    
  
    const handleAddRow = (index) => {
      const newRows = [...rows];
      newRows.splice(index + 1, 0, {
        description: '',
        referenceLink: '',
        quantity: '',
        unitPrice: '',
        total: '',
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
  
    const handleInputChange = (value, rowIndex, fieldName) => {
      const updatedRows = [...rows];
      updatedRows[rowIndex][fieldName] = value;
      setRows(updatedRows);
    };
  
    const handleCellClick = (rowIndex, colIndex) => {
      setSelectedCell({ row: rowIndex, col: colIndex });
      setShowDeleteOption(null);
    };
  
    const handleArrowClick = (rowIndex, colIndex, e) => {
      e.stopPropagation();
      const key = `${rowIndex}-${colIndex}`;
      setShowDeleteOption(showDeleteOption === key ? null : key);
    };
  
    const handleOutsideClick = (e) => {
      if (!e.target.closest('td')) {
        setSelectedCell(null);
        setShowDeleteOption(null);
      }
    };
  
    useEffect(() => {
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }, []);
  
    const handleSubmits = () => {
      const dataToSave = rows.map((row, index) => ({
        sno: index + 1,
        ...row,
      }));
      console.log('Saved Data:', dataToSave);
      setRows(initialData); // clear
    };

   const[terms,setTerms]=useState("")
   const updateterms=(event)=>{
     setTerms(event.target.value)
   }

  //  useEffect(()=>{
  //   console.log("terms",terms)
  //  },[terms])
  //-----------------tabel function ends------------------------
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
         

         <h2 style={{marginLeft:"10px", fontWeight:"800", marginTop:"55px",}}> Buyer Home  </h2>
          <div className={styles.JobtitleFilterWrapper} style={{marginTop:"0px"}}>
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
    
              
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select>  jobs per page
          </div>
         
          <div className={styles.Uiwarpper}>
            {/* {PageLoader ?
              <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "49%", marginTop: "50px" }} />
              : ""
            } */}
            
            <div className={styles.Uiwarpper} style={{ marginTop: "20px", marginLeft: "15px", marginRight: "20px" }}>



  <div className={styles.ul} style={{marginTop:"-30px"}} >
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '1px' }}></th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor:"rgb(40,4,99)",color:"white" }}>SL.No</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor:"rgb(40,4,99)",color:"white" }}>Description</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor:"rgb(40,4,99)",color:"white" }}>Reference Link to Amazon/Flipkart</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor:"rgb(40,4,99)",color:"white" }}>Quantity</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor:"rgb(40,4,99)",color:"white" }}>Unit Price</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor:"rgb(40,4,99)",color:"white" }}>Total Price</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor:"rgb(40,4,99)",color:"white" }}>Comment to Seller</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} onMouseLeave={() => setHoveredAddArea(null)}>
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

              {/* Auto S.No */}
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{rowIndex + 1}</td>

              {['description', 'referenceLink', 'quantity', 'unitPrice', 'total', 'commentToSeller'].map((fieldName, colIndex) => (
  <td
    key={colIndex}
    style={{ position: 'relative', border: '1px solid #ccc', padding: '0px' }}
    onClick={() => handleCellClick(rowIndex, colIndex)}
  >
    <textarea
      value={row[fieldName]}
      onChange={(e) => {
        let value = e.target.value;
        if (fieldName === 'quantity') {
          value = value.replace(/\D/g, ''); // Only digits allowed
        }
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
 


                  {/* Arrow dropdown icon */}
                  {selectedCell?.row === rowIndex && selectedCell?.col === colIndex && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => handleArrowClick(rowIndex, colIndex, e)}
                    >
                      ▼
                    </div>
                  )}

                  {/* Delete Option */}
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
                        zIndex: 1,
                      }}
                    >
                      Delete Row
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <div style={{marginTop:"10px", marginBottom:"10px", marginLeft:"23px",marginRight:"0px", display:"flex", justifyContent:"space-between"}}>
        <div>
          <h2>TermsAndConditions</h2>
          <textarea onChange={(event)=>updateterms(event)} style={{width:"630px",height:"109px", borderRadius:"10px"}}></textarea>
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
            height:'42px',
            marginTop: '16px',
            // marginright: '-150px;'
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
             
          </div>
      
        <>
       
          {/* ...................... All Filter for Mobile */}
<div className={styles.MobLocationFilterWrapper}>
  

          </div>
          <h2 style={{marginLeft:"3%", fontWeight:"800", marginTop:"5px", marginBottom:"-15px"}}>Buyer Home</h2>

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

         
          
          
          <div class={styles.homeMobileNextPrevBtn} style={{ diplay:"flex",flexDirection:"column",marginTop:"15px"}}>
          <div style={{ marginBottom: "5px", marginTop: "0", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select>  jobs per page
          </div>

          <div>
  {rows.map((row, index) => (
    <div
      key={index}
      style={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        marginBottom: '24px',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width:'84%',
        marginLeft:'11px'
      }}
    >
      {[
        { label: 'SL No', value: index + 1, readOnly: true },
        { label: 'Description', value: row.description, name: 'description' },
        { label: 'Reference', value: row.referenceLink, name: 'referenceLink' },
        { label: 'Quantity', value: row.quantity, name: 'quantity' },
        { label: 'Unit Price', value: row.unitPrice, name: 'unitPrice' },
        { label: 'Total Price', value: row.total, name: 'total' },
        { label: 'Comment to Seller', value: row.commentToSeller, name: 'commentToSeller' },
      ].map((field, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            gap:'2px'
          }}
        >
          <div
            style={{
              width: '240px',
              backgroundColor:' rgb(40,4,99)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px 0 0 6px',
              fontWeight: 'bold',
            }}
          >
            {field.label}
          </div>
          <input
            type={field.name === 'quantity' || field.name === 'unitPrice' ? 'number' : 'text'}
            value={field.value}
            readOnly={field.readOnly}
            onChange={(e) =>
              !field.readOnly && handleInputChange(e.target.value, index, field.name)
            }
            // placeholder={!field.readOnly ? `Enter ${field.label.toLowerCase()}` : ''}
            style={{
              flex: 1,
              border: '1px solid black',
              padding: '8px',
              borderRadius: '0 6px 6px 0',
            }}
          />
        </div>
      ))}

      <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
        <button
          onClick={() => handleAddRow(index)}
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          ＋ Add
        </button>
        {rows.length > 1 && (
          <button
            onClick={() => handleDeleteRows(index)}
            style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            － Remove
          </button>
        )}
      </div>
    </div>
  ))}
  
  <div style={{marginLeft:"8px"}}>
          <h2>TermsAndConditions</h2>
          <textarea onChange={(event)=>updateterms(event)} style={{width:"300px",height:"100px", borderRadius:"10px"}}></textarea>
        </div>

  <button
    onClick={handleSubmits}
    style={{
      backgroundColor: '#17a2b8',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      marginLeft:'10px'
    }}
  >
    Submit
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

export default BuyersHome
