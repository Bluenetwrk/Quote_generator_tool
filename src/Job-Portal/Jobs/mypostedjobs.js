import React from 'react'
import styles from "./myPostedjobs.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Puff } from 'react-loader-spinner'
import useScreenSize from '../SizeHook';
import location from "../img/icons8-location-20.png" 
import graduation from "../img/icons8-graduation-cap-40.png"
import socketIO from 'socket.io-client';
import Footer from '../Footer/Footer';
import HTMLReactParser from 'html-react-parser'



function JoppostedByEmp(props) {
  useEffect( ()=>{    
    const socket = socketIO.connect(props.url,{
      auth:{
        token: JSON.parse(localStorage.getItem("EmpIdG"))
      }
    });
  },[])

  // let location = useLocation()
  // let empName= location.state.gserid 

  const [myjobs, setMyjobs] = useState([])
  const [myjobsforFilter, setmyjobsforFilter] = useState([])
  const [PageLoader, setPageLoader] = useState(false)
  const [Result, setResult] = useState(false)
  const [NoJobFound, setNoJobFound] = useState("")
  const screenSize = useScreenSize();
  const [Filterjobs, setFilterjobs] = useState([])

  const [Filtereredjobs, setFiltereredjobs] = useState([])
  const [nopageFilter, setNoPageFilter]=useState(false)

  const [isReadMore, setIsReadMore] = useState(true)
  const navigate = useNavigate()

  let empId = JSON.parse(localStorage.getItem("EmpIdG"))

  async function getjobs() {
    let userid = JSON.parse(localStorage.getItem("EmpIdG"))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("EmpLog"))) };
    setPageLoader(true)
    setTimeout(async () => {
      await axios.get(`/jobpost/getPostedjobs/${empId}`, {headers})
        .then((res) => {
          let result = (res.data)
          let sortedate = result.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setMyjobs(sortedate)
          setmyjobsforFilter(sortedate)
    setPageLoader(false)
          if (res.data.length == 0) {
            setNoJobFound("Loading....")
          }

        }).catch((err) => {
          alert("back error occured")
        })
    }, 1000)

  }
  useEffect(() => {
    getjobs()
  }, [])
  // .................delete function............
  async function deletejob(deleteid) {
    let userid = JSON.parse(localStorage.getItem("EmpIdG"))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("EmpLog"))) };
    Swal.fire({
      title: 'Are you sure?',
      // icon: 'warning',
      width:"260",
      // position:"top",
      customClass:{
        popup:"alertIcon"
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/jobpost/deleteJob/${deleteid}`, {headers})
          .then((res) => {
            getjobs()
          })
          .catch((err) => { alert("server error occured") })
      }
    })
  }
  function update(id) {
    navigate("/Updatepostedjobs", { state: { getId: id } })
  }

  // ........search ........................search...........................
  const [searchKey, setsearchKey] = useState()

  async function searchIcon(key) {
    if (key) {
      setResult(true)
      let dubmyjobs = [...myjobsforFilter]

      const filteredItems = dubmyjobs.filter((user) =>{
        if(JSON.stringify(user).toLowerCase().includes(key.toLowerCase())){
          return user
        }
    })
      setMyjobs(filteredItems)
    } else {
      getjobs()
      setResult(false)
    }
  }


  async function search(e) {
    let key = e.target.value
    setsearchKey(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...myjobsforFilter]

      const filteredItems = dubmyjobs.filter((user) =>{
        if(JSON.stringify(user).toLowerCase().includes(key.toLowerCase())){
          return user
        }
    })
      setMyjobs(filteredItems)
    } else {
      getjobs()
      setResult(false)
    }

  }

  function seeProfilejobSeekerId(id) {
    window.open(`/Applied-User-Profile/${id}`, '_blank')
  }

  // ..........Sorting.......

  function sortbyOldjobs() {
    let newjob = [...myjobs]
    let oldjobSort = newjob.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    setMyjobs(oldjobSort)
  }

  function sortbyNewjobs() {
    let newjob = [...myjobs]
    let newjobSort = newjob.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })

    setMyjobs(newjobSort)
  }

  
  function SdescendingOrder() {
    let newJobs = [...myjobs]
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
    setMyjobs(sorted)
  }

  function SascendingOrder() {
    let newJObs = [...myjobs]
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
    setMyjobs(sorted)
  }

  function EdescendingOrder() {
    let newjob = [...myjobs]
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
    setMyjobs(sorted)

  }

  function EascendingOrder() {
    let newjob = [...myjobs]

    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.experiance, b.experiance)
    })
    setMyjobs(sorted)
  }

  
  let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpage"))
    
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setrecordsPerPage] = useState(recordsperpage?recordsperpage:10)
  const lastIndex = currentPage * recordsPerPage //10
  const firstIndex = lastIndex - recordsPerPage //5
  const records = myjobs.slice(firstIndex, lastIndex)//0,5
  const npage = Math.ceil(myjobs.length / recordsPerPage) // last page
  const number = [...Array(npage + 1).keys()].slice(1)
  const [transferRecords, setTransferRecords] = useState("PostedJobs")

  function firstPage(id){
    setCurrentPage(1)
  }

function previous(){
  if(currentPage !==1){
    setCurrentPage(currentPage-1)
  }  
}
function changeCurrent(id){
  setCurrentPage(id)
}
function next(){
  if(currentPage !==npage){
    setCurrentPage(currentPage+1)
  }
}
function last(){
    setCurrentPage(npage)
}
function handleRecordchange(e){  
  sessionStorage.setItem("recordsperpage", JSON.stringify(e.target.value));
  let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpage"))
  setrecordsPerPage(recordsperpage)  
  setCurrentPage(1)
}


  return (
    <>
 
 {screenSize.width > 850 ?
        <>
          <div className={styles.searchBothForNavWrapper}>
            <input className={styles.inputboxsearchNav} type="text" placeholder='Search for a Job / Skills / Location / Experience' onChange={(e) => { search(e) }} />

            <i style={{ color: "rgb(40, 4, 99)", fontSize: "18px", cursor: "pointer" }} onClick={() => { searchIcon(searchKey) }}
              class="fa fa-search" ></i>
          </div>
          {Result ?
            <h4 style={{ marginLeft: "40%", marginTop: "20px" }}> {myjobs.length} matching Result Found  </h4>
            : ""
          }
        </>
        : ""
      }      

     {screenSize.width>850?
       <>
       <div style={{display:"flex"}}>
    {/* <button className={styles.searchButton} onClick={() => {
          navigate("/Search-Candidate")
        }}>Search Candidate</button> */}
        <p style={{marginLeft:"38%", marginTop:"30px", fontSize:"large", fontWeight:"bold"}}>My Posted Jobs</p>
        </div>

        <div style={{display:"flex", justifyContent:"space-between"}}>
            {        nopageFilter?
    <p style={{fontWeight:400, marginLeft:"10px"}}>Displaying <span style={{color:"blue"}}>{Filtereredjobs}</span> from All Jobs</p>
    :
    <p style={{fontWeight:400, marginLeft:"10px"}}>showing {firstIndex+1} to {lastIndex} latest jobs</p>
    }
<div className={styles.navigationWrapper}>
  <button disabled={currentPage === 1} style={{display:"inline", margin:"5px"}} className={styles.navigation} onClick={firstPage}>
  <i class='fas fa-step-backward'></i>
  </button>
  <button disabled={currentPage === 1} style={{display:"inline", margin:"5px"}} className={styles.navigation} onClick={previous}>
  <i class='fas fa-caret-square-left'></i>
  </button>
  <span>{currentPage}</span>
  <button disabled={currentPage === npage} style={{display:"inline", margin:"5px"}} className={styles.navigation} onClick={next}>
  <i class='fas fa-caret-square-right'></i>
  </button>
  <button disabled={currentPage === npage} style={{display:"inline", margin:"5px"}} className={styles.navigation} onClick={last}>
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
            </select>  jobs per page
            </div>
      
   <div className={styles.Uiwarpper}>
          <ul className={styles.ul}>
            <li className={styles.li}><b>Company Name</b></li>
            <li className={`${styles.li} ${styles.Jtitle}`}><b>Job Title</b></li>
            {/* <li className={`${styles.li} ${styles.liDescription}`}><b>Job description</b></li> */}
            <li className={`${styles.li} ${styles.Pdate}`}><b>Posted Date</b>
            <p className={styles.arrowWrapper}>
               <i onClick={sortbyNewjobs} className={`${styles.arrow} ${styles.up}`} ></i>
                <i onClick={sortbyOldjobs} className={`${styles.arrow} ${styles.down}`}></i>
            </p>
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
            <li className={`${styles.li} ${styles.Skills}`}><b>Skills Required</b></li>
            <li className={`${styles.li} ${styles.Action}`}><b>Action</b></li>
            <li className={`${styles.li} ${styles.NuApplied}`}><b>No of JobSeeker Applied</b></li>

          </ul>
          {PageLoader ?
           <> <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "49%", marginTop: "50px" }} />
              <div style={{display:"flex",justifyContent:"center", color:"red"}}>
              <h3>Loading...</h3>
              </div>
            </>: <>
          {
            records.length > 0 ?

            records.map((items, i) => {
                return (

                  <ul className={styles.ul} key={i}>

                    <li className={styles.li}>
                     {/* {items.Logo ?  < img style={{ width: "40%", height: "40px" }} src={items.Logo} />
                       : ""}<br></br> */}
                      {items.companyName}
                      </li>

                    <li className={`${styles.li} ${styles.Jtitle}`} style={{ color: "blue", cursor:"pointer" }} onClick={() => navigate(`/Jobdetails/${btoa(items._id)}?index=${i}`, {state: {transferRecords, },})}>{items.jobTitle.toUpperCase()}</li>
                    {/* <li className={`${styles.li} ${styles.liDescription}`}> 
                    {items.jobDescription? HTMLReactParser(items.jobDescription.toString()) :""}
                      <span style={{ color: "blue", cursor:"pointer" }} onClick={() => { navigate(`/Jobdetails/${btoa(items._id)}`) }} >...see more</span>
                    </li> */}
                    <li className={`${styles.li} ${styles.Pdate}`}>
                      {new Date(items.createdAt).toLocaleString(
                        "en-US",
                        {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </li>
                    <li className={`${styles.li} ${styles.Location}`}>{items.jobLocation.toUpperCase()}</li>
                    <li className={`${styles.li} ${styles.Package}`}>{items.salaryRange}L</li>
                    <li className={`${styles.li} ${styles.experiance}`}>{items.experiance}Y</li>
                    <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>
                    <li className={`${styles.li} ${styles.Action}`}>
                      <div className={styles.Acbuttons}>
                        <button onClick={() => { update(items._id) }} className={`${styles.Abutton} ${styles.update}`}>update</button>
                        <button onClick={() => { deletejob(items._id) }} className={`${styles.Abutton} ${styles.delete}`}>delete</button>
                      </div>
                    </li>
                    <li className={`${styles.li} ${styles.NuApplied}`}>
                      {items.jobSeekerId.length > 0 ?
                        <button className={`${styles.viewButton}`} onClick={() => { seeProfilejobSeekerId(btoa(items._id)) }}>{items.jobSeekerId.length}</button>
                        :
                        <button className={`${styles.viewButton}`} >{items.jobSeekerId.length}</button>

                      }
                    </li>
                  </ul>
                )
              })
              // :""
              : <p style={{ marginLeft: "44%", color: "red" }}>No Record Found</p>
          }
          </>
          }
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <div style={{marginTop:"14px", marginLeft:"10px"}} >
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
              <option selected = {lastIndex === 10} value={10}>10</option>
              <option selected = {lastIndex === 25} value={25}>25</option>
              <option selected = {lastIndex === 50} value={50}>50</option>
              <option selected = {lastIndex === 100} value={100}>100</option>
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
            {/* <div style={{marginTop:"200px", position:"sticky", bottom:0}}>
          <Footer/>
        </div> */}
      </>
      :
      <> 

<p style={{marginLeft:"45%"}}>My Posted Jobs</p>
<button className={styles.searchButton} onClick={() => {
          navigate("/Search-Candidate")
        }}>Search Candidate</button>

<p style={{ marginLeft: "4%", color: "blue", fontWeight:"bold" }}> Total {myjobs.length} jobs</p>
        <div className={styles.searchBoth}>
          <p className={styles.p}>Search </p>
          <input className={styles.inputboxsearch} type="text" placeholder='search for a posted job' onChange={(e) => { search(e) }} />
        </div>
        {Result ?
            <h4 style={{ marginLeft: "34%", marginTop: "0px"}}> {myjobs.length} matching Result Found  </h4>
            : ""
          }
      <div id={styles.JobCardWrapper} >

{myjobs.length>0?
myjobs.map((job, i) => {
  return (
    <>
 <div className={styles.JobCard} key={i}>
                        
                        <div className={styles.JobTitleDateWrapper}>
        <p className={styles.jobTitle} onClick={() => {
  window.scrollTo({
    top:0
  })
  navigate(`/Jobdetails/${btoa(job._id)}?index=${i}`, {state: {transferRecords, },})}} >{job.jobTitle.toUpperCase()} </p>                      
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
        
        {/* <br></br> */}
        <div className={styles.companyNameLocationWrapper}  >
          <img className={styles.logo} src={job.Logo} />
          <span className={styles.companyName} >{job.companyName} </span><br></br>
          </div>
          
        <  img className={styles.jobLocationImage} src={location}  /> 
        <span className={styles.jobLocation}>{job.jobLocation[0].toUpperCase()+job.jobLocation.slice(1)} ,</span>
        <span className={styles.qualificationAndExperiance}>
        
        <  img className={styles.graduationImage} src={graduation}  /> 

          {job.qualification}, {job.experiance}Y Exp ,   {job.jobtype}
        {/* <span className={styles.jobtypeAndDate}> {job.jobtype}</span> */}
        </span><br></br>
        
 
                                     
                        <div className={styles.skillWrapper}>
                          <span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}>{job.skills}</span><br></br>
                        </div>

        <span className={styles.NoOfJobSeekersApplied}> No. of Job Seekers Applied:
        {job.jobSeekerId.length > 0 ?
                          <button className={`${styles.MobileviewButton}`} onClick={() => { seeProfilejobSeekerId(btoa(job._id)) }}>{job.jobSeekerId.length}</button>
                          :
                          <button className={`${styles.MobileZeroViewButton}`} >{job.jobSeekerId.length}</button>

                        }
        </span><br></br>


        <div className={styles.ApplyPackage}>
          <span className={styles.salaryRange} style={{ marginLeft: "10px" }}><span>&#8377;</span>{job.salaryRange}L</span>
          <div className={styles.MobileAcbuttons}>
          <button onClick={() => { update(job._id) }} className={` ${styles.MobileUpdate}`}>update</button>
          <button onClick={() => { deletejob(job._id) }} className={` ${styles.MobileDelete}`}>delete</button>
               </div>
        </div>
    <p className={styles.jobDescriptionHeading}>Job Description:</p>

        <p className={styles.jobDescription}> 
        {/* {job.jobDescription} */}
        {
                    job.jobDescription? 
                    HTMLReactParser(job.jobDescription.slice(0,100)
                    .toString())                    
                    :""                
                    }
                  <span style={{ color: "blue", cursor:"pointer" }} onClick={() => { navigate(`/Jobdetails/${job._id}`) }} >...see more</span>
                   
          </p>
      </div>
    </>
  )
})
: <p style={{ marginLeft: "39%", color: "red" }}> No Jobs Found</p>
}

</div>
<div style={{marginTop:"120px"}}>
          <Footer/>
        </div>
      </>
}


    </>

  )
}

export default JoppostedByEmp