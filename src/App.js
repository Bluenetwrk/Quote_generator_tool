import React, { useEffect } from "react";
import axios from "axios";
import "./App.css"
import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, useSearchParams, useLocation } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import Styles from "./Job-Portal/NaveBar/nav.module.css"

import Cancel from "./Job-Portal/img/icons8-cross-50.png"
import NavIcon from "./Job-Portal/img/icons8-menu-50.png"

import StudentLogin from "./Job-Portal/Login/StudLogin";
import EmployeeLogin from "./Job-Portal/Login/EmpLogin"
import NewRegistered from "./Job-Portal/Profile/NewRegistration";
import StuNewRegistered from "./Job-Portal/Profile/StudentRegistration";
import StudPrivate from "./Job-Portal/Private/OutletStud";
import PostedJobsbyEmp from "./Job-Portal/Jobs/mypostedjobs";
import BlogpostedByEmp from "./Job-Portal/Jobs/mypostedBlogs";
import PostedCareerJobs from "./Job-Portal/Jobs/myPostedCaereerjobs";
import EmpPrivate from "./Job-Portal/Private/OuletEmp";
import PostJobs from "./Job-Portal/PostJobs/postJobs";
import PostBlogs from "./Job-Portal/PostJobs/postBlogs";
import Jobs from "./Job-Portal/Jobs/AllJobs";
import Nav from "./Job-Portal/NaveBar/Nav";
import Jobdetails from "./Job-Portal/Jobs/AllJobdetails"
import Blogdetails from "./Job-Portal/Jobs/Blogdetail"
import Answerdetails from "./Job-Portal/Jobs/Answerdetails";
import CareerJobdetails from "./Job-Portal/Jobs/CareerJobdetails"
import Home from "./Job-Portal/Jobs/AllHomeJobs";
import StudentUpdateProfile from "./Job-Portal/Profile/StudentUpdateProfile";
import EmployeeUpdateProfile from "./Job-Portal/Profile/EmployeeUpdateProfile";
import StudentProfile from "./Job-Portal/Profile/StudentProfile";
import EmployeeProfile from "./Job-Portal/Profile/EmployeeProfile";
import UpdatePostedJobs from "./Job-Portal/PostJobs/updatePostedJobs";
import UpdateCareerPostedJobs from "./Job-Portal/PostJobs/updateCareerPostedJobs";
import UpdatePostedBlogs from "./Job-Portal/PostJobs/updatePostedBlogs";
import MyAppliedJobs from "./Job-Portal/Jobs/MyAppliedJobs"
import CareerAppliedJobs from "./Job-Portal/Jobs/MyCareerAppliedJobs"
import AppliedUserProfile from "./Job-Portal/AppliedUserProfile/AppliedUserProfile";
import CheckStudentProfiel from "./Job-Portal/Profile/CheckStudentProfiel";
import CheckEmpHalfProfile from "./Job-Portal/Profile/CheckEmpHalfProf";
// import SearchParams from "./Job-Portal/Login/SearchParams";
import SearchParams from "./Job-Portal/Login/SearchParams ";
import SearchParamsEmp from "./Job-Portal/Login/SearchParamsEmp";
import SearchParamsDub from "./Job-Portal/Login/SearchParamsDupStuD";
import SearchParamsDubEmp from "./Job-Portal/Login/SearchParamsDupEmp";
import CheckEmpProfileForAdmin from "./Job-Portal/Profile/CheckEmplProfileForAdmin";
import CheckStudentProfileForAdmin from "./Job-Portal/Profile/CheckStuForAdmin";
import CheckArchivedJobSeeker from "./Job-Portal/Profile/CheckArchivedStud";
import SearchCandidate from "./Job-Portal/AppliedUserProfile/SearchCandidat";
import SearchCandHome from "./Job-Portal/AppliedUserProfile/SearchCandHome";
import AllCareerJobs from "./Job-Portal/Jobs/AllCareerJobs";
import Blogs from "./Job-Portal/Jobs/AllBlogs";
import AboutUs from "./Job-Portal/AboutUs"
import Contact from "./Job-Portal/Contact"
import Services from "./Job-Portal/Services"
import TermsAndCondition from "./Job-Portal/TermsAndConditions"
import Footer from "./Job-Portal/Footer/Footer";
import socketIO from 'socket.io-client';
import SidebarNav from "./Job-Portal/BigSideNav";
import useScreenSize from '../src/Job-Portal/SizeHook';
import AskQuestion from "./Job-Portal/PostJobs/postQuesion";
import PostHelp from "./Job-Portal/PostJobs/PostHelp";
import AllHelps from "./Job-Portal/Jobs/AllHelps";
import HelpDetails from "./Job-Portal/Jobs/HelpDetails";
import AllWalkinDrive from "./Job-Portal/Jobs/AllWalkinDrive";
import PostWalkinDrive from "./Job-Portal/PostJobs/PostWalkinDrive";
import DriveDetails from "./Job-Portal/Jobs/DriveDetails";
import location from "./Job-Portal/img/icons8-location-20.png"
axios.defaults.baseURL = "https://itwalkin-backend-testrelease-2-0-1-0824-ns0g.onrender.com" // Render Test

function App() {

  const screenSize = useScreenSize();
  let size = screenSize.width;

  const [ShowSideNave, setShowSideNave] = useState(false)
   
  const [nopageFilter, setNoPageFilter] = useState(true)
   const [searchKey, setsearchKey] = useState()
   const [Filtereredjobs, setFiltereredjobs] = useState([])
   const [Result, setResult] = useState(false)
   const [Filterjobs, setFilterjobs] = useState([])
   const [jobs, setJobs] = useState([])
   const [count, setCount] = useState(1)
   const [Active, setActive] = useState([])
   const [jobTagsIds, setJobTagsIds] = useState([])
   const [PageLoader, setPageLoader] = useState(false)
  //  let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageHome"))
   const [recordsPerPages, setrecordsPerPageNo] = useState(10)
   const [currentPageNo, setCurrentPages] = useState(1)
   const [totalCount, settotalCount] = useState()

   const [FilCandidate, setFilCandidate] = useState([])
const [Candidate, setCandidate] = useState([])
const [showDriveFlash, setShowDriveFlash] = useState(false);


 async function getAllJobSeekers() {
    setNoPageFilter(false)
    setActive([])
    setJobTagsIds([])

    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get(`/StudentProfile/getLimitJobs/${recordsPerPages}`, { params: { currentPageNo }, headers })

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

  
//----------------------Tags search method starts----------------

 //----------------search by tags(LOGGOUT USER - HOME PAGE) ---------

// async function searchByTags(key) {
//   setPageLoader(true); // Enable loader at the start

//   if (count === 1) {
//     setJobs([]);
//   }
//   setCount(prev => prev + 1);

//   const isIndex = Active.findIndex((present) => present === key);

//   if (isIndex < 0) { 
//     var updatedActive = [...Active, key]; 
//     setActive(updatedActive);

//     setTimeout(() => {
//       setPageLoader(false);
//     }, 1000); 
//     return;
//   } else {
//     const IndexId = Active.findIndex((present) => present === key);
//     Active.splice(IndexId, 1);

//     if (Active.length === 0) {
//       await getjobs(); 
//       setPageLoader(false);
//       return;
//     }

//     await changeTags();
//   }

//   setPageLoader(false); 
// }

//   async function changeTags(key){
     

//     setNoPageFilter(true)
//     setFiltereredjobs(key)
//     await axios.get(`/jobpost/getTagsJobs/${Active}`)
//       .then((res) => {
//         let result = (res.data)
        
//         let sortedate = result.sort((a, b) => {
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         });
//         setJobTagsIds(sortedate)
        
//       })
//   }


  //---------------------blog search tags------------
//   async function BlogSearchTags(key) {
//     setPageLoader(true)
//     if(count==1){
//       setJobs("")

//     }
//     setCount(prev=>prev+1)

//     const isIndex=Active.findIndex((present)=>{
// return(
//   present===key
// )
//     })
//     if(isIndex<0){
//     setActive([...Active, key])
//     setTimeout(() => {
//       setPageLoader(false);
//     }, 1000); 
//     }else{
//       const IndexId=Active.findIndex((present)=>{
//         return(
//           present==key
//         )
//             })
//             Active.splice(IndexId,1)
//                 if(Active.length===0){
//       getjobs()
//     }
//     if(jobs.length>0){
//          let removedItems = jobs.filter((tags)=>{
//             return( 
//               !tags.Tags.includes(key)
                
//         )
//       }) 
//       setJobs(removedItems)
//       return false
//     }
//   }

//     setNoPageFilter(true)
//     setFiltereredjobs(key)
//     await axios.get(`/BlogRoutes/getTagsJobs/${key}`)
//       .then( (res) => {
//         let result = (res.data)
//         let sortedate = result.sort( (a, b) => {
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         });
//         let elements=  sortedate.flatMap(element => {
//           setJobs(oldArray => [...oldArray,element] )
//      });
//       })
//   }
//------------------carrer search tags-----------
// async function carrerSearchTags(key) {
//   setPageLoader(true)
//   if (count == 1) {
//     setJobs([])
//   }
//   setCount(prev => prev + 1)
//   const isIndex = Active.findIndex((present) => {
//     return (
//       present === key
//     )
//   })
//   if (isIndex < 0) {
    
    
//     var updatedActive = [...Active, key];
//     setActive(updatedActive);
//     setTimeout(() => {
//       setPageLoader(false);
//     }, 1000); 
//   } else {
//     const IndexId = Active.findIndex((present) => {
//       return (
//         present == key
//       )
//     })
//     Active.splice(IndexId, 1)
//     if (Active.length === 0) {
//       getjobs()
//       return false
//     }
   
//     changeTags()
    
//   }}
//   async function changeTags(key){
  

//   setNoPageFilter(true)
//   setFiltereredjobs(key)
//   await axios.get(`/Careerjobpost/getTagsJobs/${Active}`)

//     .then((res) => {
//       let result = (res.data)
      
//       let sortedate = result.sort((a, b) => {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       });
     
//       setJobTagsIds(sortedate)
     

//       let elements = sortedate.flatMap(element => {
        
//       });
//     })
// }

// //-----------------Jobseeker login search Tags---------
// async function jobseekerSearchTags(key) {
//   setPageLoader(true)
//   if (count == 1) {
//     setJobs([])
//   }
//   setCount(prev => prev + 1)
//   const isIndex = Active.findIndex((present) => {
//     return (
//       present === key
//     )
//   })
//   if (isIndex < 0) {
//     // setActive([...Active, key])
    
//     var updatedActive = [...Active, key]; 
//     setActive(updatedActive);
//     setTimeout(() => {
//       setPageLoader(false);
//     }, 1000); 
//   } else {
//     const IndexId = Active.findIndex((present) => {
//       return (
//         present == key
//       )
//     })
//     Active.splice(IndexId, 1)
//     if (Active.length === 0) {
//       getjobs()
//       return false
    // }
  //   changeLoginTags()
  // }}
  // async function changeLoginTags(key){
    // console.log("in APi",Active)

  // setNoPageFilter(true)
  // setFiltereredjobs(key)
  // await axios.get(`/jobpost/getTagsJobs/${Active}`)
  //   .then((res) => {
  //     let result = (res.data)
      // console.log("the total id's are", result)
      // let sortedate = result.sort((a, b) => {
      //   return new Date(b.createdAt) - new Date(a.createdAt);
      // });
      // setJobTagsIds(oldjobTagsIds => [...oldjobTagsIds, ...sortedate])
//       setJobTagsIds(sortedate)
//       // getTagId(sortedate)

//       let elements = sortedate.flatMap(element => {
       
//       });
//     })
// }
//--------------employer  tags-------------
// async function searchEmpTags(key) {
//   setPageLoader(false);
//   if(count==1){
//     setCandidate([])
//   }
//   setCount(prev=>prev+1)
//   const isIndex=Active.findIndex((present)=>{
// return(
// present===key
// )
//   })
//   if(isIndex<0){
//   var updatedActive = [...Active, key]; 
//   setActive(updatedActive);
//   setTimeout(() => {
//     setPageLoader(false);
//   }, 1000);
//   }else{
//     const IndexId=Active.findIndex((present)=>{
//       return(
//         present==key
//       )
//           })
//           Active.splice(IndexId,1)
//               if(Active.length===0){
//                 getAllJobSeekers()
//                 return false
//   }
//   changeEmpTags()
// }}

// async function changeEmpTags(key){

//   setNoPageFilter(true)
//   setFiltereredjobs(key)
//   await axios.get(`/StudentProfile/getTagsJobs/${Active}`)
//     .then((res) => {
//       let result = (res.data)
//       // console.log(result)
//       let sortedate = result.sort((a, b) => {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       });
//       setJobTagsIds(sortedate)
//     })
// }


//-------------------------search candidate hoem--------
// async function searchBlurTags(key) {
//   setPageLoader(true);
//   if(count==1){
//     setCandidate([])
//   }
//   setCount(prev=>prev+1)
//   const isIndex=Active.findIndex((present)=>{
// return(
// present===key
// )
//   })
//   if(isIndex<0){
//   var updatedActive = [...Active, key]; 
//   setActive(updatedActive);
//   setTimeout(() => {
//     setPageLoader(false);
//   }, 1000);
//   }else{
//     const IndexId=Active.findIndex((present)=>{
//       return(
//         present==key
//       )
//           })
//           Active.splice(IndexId,1)
//               if(Active.length===0){
//                 getAllJobSeekers()
//                 return false
//   }
//   changeblurTags()
// }}

// async function changeblurTags(key){

//   setNoPageFilter(true)
//   setFiltereredjobs(key)
//   await axios.get(`/StudentProfile/getTagsJobs/${Active}`)
//     .then((res) => {
//       let result = (res.data)
//       // console.log(result)
//       let sortedate = result.sort((a, b) => {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       });
//       setJobTagsIds(sortedate)
//       setTimeout(() => {
//     setPageLoader(false);
//   }, 1000);
//     })
// }



//-------------------------Tags search method ends-----------------  

  const [searchKeyState, setSearchKeyState] = useState(""); 

//--------------------SEARCH METHODS---------------------------------

  // ---------------home page search methods-------------------
  async function search(e) {
    setNoPageFilter(true)
    let key = e.target.value
    setFiltereredjobs(key)
    setsearchKey(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) => {
        if (JSON.stringify(user).toLowerCase().includes(key.toLowerCase())) {
          return user
        }
      })
      setJobs(filteredItems)
    } else {
      getjobs()
      setResult(false)
    }
    // if(e===""){
    //   getjobs()
    //   setResult(false)
    //   setPageLoader(false)
    //   return
    // }
    // setPageLoader(true)
    // setJobTagsIds([]) 
    // setJobs([])
    // setNoPageFilter(true)

    // let key = e.target.value
    // setFiltereredjobs(key)
    // setsearchKey(key)
    // setSearchKeyState(key);

  //   const currentSearchKey = key;

  // if (!key) {
  //   console.log("Input cleared, ignoring old API calls.");
  //   setPageLoader(false);
  //   setResult(false);
  //   getjobs(); 
  //   return;
  // }

    // if (key) { 
      // console.log("executed after else") 
    // setResult(true) 
    //  -------------all new search-------------
    // const headers = { authorization: 'BlueItImpulseWalkinIn' };
    // await axios.get("/jobpost/getHomejobs", { headers })
    // .then((res) => {
    //   if (currentSearchKey !== e.target.value.trim()) {
    //     console.log("Ignored stale API response for:", currentSearchKey);
    //     return;
    //   }
  
    //   let result = (res.data)

    //   let filteredData = result.filter(job => 
    //     (Array.isArray(job.Tags) && job.Tags.some(tag =>tag.toString().toLowerCase().includes(key.toLowerCase()))) || 
    //     (job.jobTitle && job.jobTitle.toString().toLowerCase().includes(key.toLowerCase()))
    //   );
  
    //   // let sortedData = filteredData.sort((a, b) => 
    //   //   new Date(b.createdAt) - new Date(a.createdAt)
    //   // );
    
    //   // console.log("Filtered Data:", sortedData);
    //   setJobTagsIds(filteredData)  
    //   setPageLoader(false)
    // })

    //-----------all new search ends ----------

    //-------old search method-------------
    //   setResult(true)
    //   let dubmyjobs = [...Filterjobs]
    //   const filteredItems = dubmyjobs.filter((user) => {
    //     if (JSON.stringify(user).includes(key.toLowerCase())) {
    //       return user
    //     }
    //   })
    //   setJobs(filteredItems)
    // } else {
    //   getjobs()
    //   setResult(false)
    //   setPageLoader(false)
    //   return
    // }
  
  }

  async function getjobs() {
    setCount(1)
    setActive([])
    setJobTagsIds([])

    setPageLoader(true)
    setNoPageFilter(false)
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    // await axios.get("/jobpost/getHomejobs", { headers })
    await axios.get(`/jobpost/getLimitJobs/${recordsPerPages}`, { params: { currentPageNo }, headers })
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
// ------------home page search method ends------------------

// ------------blog page search method starts------------------
  async function searchBlog(e) {
    if(e===""){
      getblogs()
      setResult(false)
      return
    }
    // console.log("tyty xhxbc",e.target.value)
    setNoPageFilter(true)
    let key = e.target.value
    setFiltereredjobs(key)
    setsearchKey(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...Filterjobs]
      const filteredItems = dubmyjobs.filter((user) => {
        if (JSON.stringify(user).toLowerCase().includes(key.toLowerCase())) {
          return user
        }
      })
      setJobs(filteredItems)
    } else {
      getblogs()
      setResult(false)
    }
  }
  async function getblogs() {
    setCount(1)
    setActive([])
    setPageLoader(true)
    setNoPageFilter(false)
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get("/BlogRoutes/getAllBlogs", { headers })
      .then((res) => {
        let result = res.data
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        setFilterjobs(sortedate)
        setPageLoader(false)
      }).catch((err) => {
        alert("some thing went wrong")
      })
  }
  async function blogsearchIcon(key) {
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
      getblogs()
      setResult(false)
    }
  }

  // ------------blog page search method ends---------------

  // ------------carrer page search method starts---------------
  async function searchcarrer(e) {
    if(e===""){
      // console.log("carrer executed")
      getcarrer()
      setResult(false)
      getcarrer()
      return
    }
    // console.log("tyty xhxbc",e.target.value)
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
      getcarrer()
      setResult(false)
    }
  }

  
  async function getcarrer() {
    setCount(1)
    setActive([])
    setJobTagsIds([])

    setPageLoader(true)
    setNoPageFilter(false)
   
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    await axios.get("/Careerjobpost/getCareerjobs", { headers })
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

  async function searchCarrerIcon(key) {
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
      getcarrer()
      setResult(false)
    }
  }

  //  ----------------carrer home page search method ends---------------- 

//  ----------------employer home page search method starts---------------- 
  async function searchs(e) {
    // console.log("e is loading",e.target.value)
    if(e===""){
      getAllJobSeekers()
      setResult(false)
      return
    }
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

  // ---------------employer home page search method ends---------------

  // ---------------jobseeker home page search method starts---------------
  async function jobSeekersearch(e) {
    if(e===""){
      getJobseekerjobs()
      setResult(false)
      return
    }
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
      getJobseekerjobs()
      setResult(false)
    }
  }
  async function getJobseekerjobs() {
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

  async function searchJobseekerIcon(key) {
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
      getJobseekerjobs()
      setResult(false)
    }
  }

  // -----------------jobseeker home page search ends----------------

  //------------------Employer Home page (without Login) starts---------
  async function empSearchNoLogin(e) {
    if(e===""){
      // console.log("js")
      getAllJobSeekerss()
      setResult(false)
      getAllJobSeekerss()
      return
    }
    // console.log("xhxbc",e)
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
      getAllJobSeekerss()
      setResult(false)
    }
  }
  async function getAllJobSeekerss() {
    setCount(1)
    setActive([])
    setJobTagsIds([])

    setNoPageFilter(false)
    const headers = { authorization: 'BlueItImpulseWalkinIn' };
    // await axios.get("StudentProfile/getAllJobseekers", { headers })
    await axios.get(`/StudentProfile/getLimitJobs/${recordsPerPages}`, { params: { currentPageNo }, headers })

      .then((res) => {
        let result = (res.data)
        // console.log(result)
        gettotalcount()
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setCandidate(sortedate)
        setFilCandidate(sortedate)
      })
  }
//------------------Employer Home page (without Login) ends---------

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


  const [searchClick, setSearchClick] = useState(false)
const [showMobileSearchIcon, setShowMobileSearchIcon]= useState(true)

 const driveJobs = [
    { id:1001,
      jobTitle: "Software Engineer",
      postedBy: "HR Manager",
      companyName: "xyz",
      jobType: "Full-Time",
      driveTime: "9:00 AM",
      driveDate: "2025-04-10",
      location: "Koramangala,Bengaluru",
      ctc: "10 LPA",
      experience: "2-4 years",
      qualification: "B.Tech/MCA",
      skillsRequired: "React, Node.js, MongoDB",
      link: "https://www.microsoft.com/en-in",
      details: "1. To participate in the Walk-In Drive for Software Development, follow these steps:\n2. Click on the 'Career' section on the company's official website.\n3. A submenu will appear—select 'Walk-In Drive' from the list.\n4. The Walk-In Drive details page will open in a new window.\n5. Check the eligibility criteria, date, time, and venue of the drive.\n6. Prepare your updated resume along with necessary documents (ID proof, educational certificates, experience letters, etc.).\n7. Visit the venue on the scheduled date and complete the registration process.\n8. Appear for the technical assessment or coding test, followed by interviews.\n9. If shortlisted, attend further rounds as per the company's selection process.\n10. Await final confirmation from the recruitment team regarding the results."

    },
    {
      id:2002,
      jobTitle: "Frontend Developer",
      postedBy: "Recruiter",
      companyName: "Abc",
      jobType: "Remote",
      driveTime: "10:00 AM",
      driveDate: "2025-04-20",
      location: "WhiteField,Bengaluru",
      ctc: "8 LPA",
      experience: "1-3 years",
      qualification: "B.Tech/BCA",
      skillsRequired: "HTML, CSS, JavaScript",
      link: "",
      details: "1. To participate in the Walk-In Drive for Software Development, follow these steps:\n2. Click on the 'Career' section on the company's official website.\n3. A submenu will appear—select 'Walk-In Drive' from the list.\n4. The Walk-In Drive details page will open in a new window.\n5. Check the eligibility criteria, date, time, and venue of the drive.\n6. Prepare your updated resume along with necessary documents (ID proof, educational certificates, experience letters, etc.).\n7. Visit the venue on the scheduled date and complete the registration process.\n8. Appear for the technical assessment or coding test, followed by interviews.\n9. If shortlisted, attend further rounds as per the company's selection process.\n10. Await final confirmation from the recruitment team regarding the results."

    },
    { id:3003,
      jobTitle: "Data Analyst",
      postedBy: "HR Lead",
      companyName: "xyz",
      jobType: "Contract",
      driveTime: "11:00 AM",
      driveDate: "2025-04-20",
      location: "Mumbai",
      ctc: "6 LPA",
      experience: "1-2 years",
      qualification: "B.Sc/M.Sc",
      skillsRequired:"Python, SQL, Power BI",
      link: "",
      details: "1. To participate in the Walk-In Drive for Software Development, follow these steps:\n2. Click on the 'Career' section on the company's official website.\n3. A submenu will appear—select 'Walk-In Drive' from the list.\n4. The Walk-In Drive details page will open in a new window.\n5. Check the eligibility criteria, date, time, and venue of the drive.\n6. Prepare your updated resume along with necessary documents (ID proof, educational certificates, experience letters, etc.).\n7. Visit the venue on the scheduled date and complete the registration process.\n8. Appear for the technical assessment or coding test, followed by interviews.\n9. If shortlisted, attend further rounds as per the company's selection process.\n10. Await final confirmation from the recruitment team regarding the results."

    },
  ];
  
  const processDriveJobs = (driveJobs) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date for comparison
  
    return driveJobs
      .map((job) => ({
        ...job,
        dateObj: new Date(job.driveDate), // Convert driveDate string to Date object
      }))
      .sort((a, b) => a.dateObj - b.dateObj) // Sort by driveDate
      .filter((job) => job.dateObj >= today) // Keep only today or future drive dates
      .map(({ dateObj, ...rest }) => rest); // Remove temporary dateObj
  };
  
  const sortedFilteredDriveJobs = processDriveJobs(driveJobs);
     const options = [
      { value: "bangalore", label: "Bangalore, India", img:location},
      { value: "san Francisco", label: "San Francisco, USA", img:location},
      { value: "new york", label: "New York, USA", img:location},
      { value: "sydney", label: "Sydney, Australia", img:location},
      { value: "london", label: "London, UK", img:  location},
      { value: "berlin", label: "Berlin, Germany", img:location},
    ];
   const [selectedlocationOption, setSelectedlocationOption] = useState(options[0]);
  return (
    <>

      <BrowserRouter>
        <Nav options={options} selectedlocationOption={selectedlocationOption}  setSelectedlocationOption={setSelectedlocationOption} sortedFilteredDriveJobs={sortedFilteredDriveJobs} showDriveFlash={showDriveFlash} setShowDriveFlash={setShowDriveFlash} empSearchNoLogin={empSearchNoLogin} jobSeekersearch={jobSeekersearch} searchBlog={searchBlog} searchcarrer={searchcarrer} setSearchClick={setSearchClick} showMobileSearchIcon={showMobileSearchIcon} 
        setShowMobileSearchIcon={setShowMobileSearchIcon} ShowSideNave={ShowSideNave} setShowSideNave={setShowSideNave}   searchClick={searchClick}  chandinmargin={setShowSideNave} 
         search={search} searchKey={searchKey} searchIcon={searchIcon} searchs={searchs}/>
        
        <div style={ShowSideNave && screenSize.width > 850 ? { marginLeft: "210px", transition: " ease-in-out 0.6s" } : { marginLeft: "-3px", transition: " ease-in-out 0.5s" }}>
        {/* <div style={ShowSideNave && screenSize.width > 850 ? { marginLeft: "210px" } : { marginLeft: "-3px"}}> */}
      
          <Routes>

            <Route path="/" element={
              <Home 
              selectedlocationOption={selectedlocationOption}
              showMobileSearchIcon={showMobileSearchIcon} setShowMobileSearchIcon={setShowMobileSearchIcon}
              ShowSideNave={ShowSideNave} setShowSideNave={setShowSideNave}
              searchClick={searchClick} setSearchClick={setSearchClick}
              nopageFilter={nopageFilter} setNoPageFilter={setNoPageFilter} 
              searchKey={searchKey} setsearchKey={setsearchKey}
              Filtereredjobs={Filtereredjobs} setFiltereredjobs={setFiltereredjobs}
              Result={Result} setResult={setResult}
              Filterjobs={Filterjobs} setFilterjobs={setFilterjobs}
              jobs={jobs} setJobs={setJobs}
              count={count} setCount={setCount}
              Active={Active} setActive={setActive}
              jobTagsIds={jobTagsIds} setJobTagsIds={setJobTagsIds}
              PageLoader={PageLoader} setPageLoader={setPageLoader}
              totalCount={totalCount} settotalCount={settotalCount}
              search={search}
              getjobs={getjobs}
              gettotalcount={gettotalcount}
              searchIcon={searchIcon}
              />
            } />
            <Route path="/Walkin-Drives" element={
              <AllWalkinDrive 
              sortedFilteredDriveJobs={sortedFilteredDriveJobs}
              showMobileSearchIcon={showMobileSearchIcon} setShowMobileSearchIcon={setShowMobileSearchIcon}
              ShowSideNave={ShowSideNave} setShowSideNave={setShowSideNave}
              searchClick={searchClick} setSearchClick={setSearchClick}
              nopageFilter={nopageFilter} setNoPageFilter={setNoPageFilter} 
              searchKey={searchKey} setsearchKey={setsearchKey}
              Filtereredjobs={Filtereredjobs} setFiltereredjobs={setFiltereredjobs}
              Result={Result} setResult={setResult}
              Filterjobs={Filterjobs} setFilterjobs={setFilterjobs}
              jobs={jobs} setJobs={setJobs}
              count={count} setCount={setCount}
              Active={Active} setActive={setActive}
              jobTagsIds={jobTagsIds} setJobTagsIds={setJobTagsIds}
              PageLoader={PageLoader} setPageLoader={setPageLoader}
              totalCount={totalCount} settotalCount={settotalCount}
              search={search}
              getjobs={getjobs}
              gettotalcount={gettotalcount}
              searchIcon={searchIcon}
              />
            } />
            <Route path="/Blogs" element={<Blogs 
            showMobileSearchIcon={showMobileSearchIcon} setShowMobileSearchIcon={setShowMobileSearchIcon}
            ShowSideNave={ShowSideNave} setShowSideNave={setShowSideNave}
            searchClick={searchClick} setSearchClick={setSearchClick} 
             nopageFilter={nopageFilter} setNoPageFilter={setNoPageFilter} 
             searchKey={searchKey} setsearchKey={setsearchKey}
             Filtereredjobs={Filtereredjobs} setFiltereredjobs={setFiltereredjobs}
             Result={Result} setResult={setResult}
             Filterjobs={Filterjobs} setFilterjobs={setFilterjobs}
             jobs={jobs} setJobs={setJobs}
             count={count} setCount={setCount}
             Active={Active} setActive={setActive}
             jobTagsIds={jobTagsIds} setJobTagsIds={setJobTagsIds}
             PageLoader={PageLoader} setPageLoader={setPageLoader}
             totalCount={totalCount} settotalCount={settotalCount}
             search={search}
             getjobs={getjobs}
             gettotalcount={gettotalcount}
             searchIcon={searchIcon}
            />} />

              <Route path="/Updatepostedjobs" element={<UpdatePostedJobs url={axios.defaults.baseURL} />} />
            {/* ..........Employee Private component i,e can not search in URL......... */}
            <Route element={<EmpPrivate />}>
              <Route path="/PostJobs" element={<PostJobs url={axios.defaults.baseURL} />} />
              <Route path="/Post-Help-Questions" element={<PostHelp url={axios.defaults.baseURL} />} />
              <Route path="/PostDrives" element={<PostWalkinDrive url={axios.defaults.baseURL}/>} />
              <Route path="/PostBlogs" element={<PostBlogs url={axios.defaults.baseURL} />} />
              <Route path="/postedjobs" element={<PostedJobsbyEmp url={axios.defaults.baseURL} />} />
              <Route path="/posted-Blogs" element={<BlogpostedByEmp url={axios.defaults.baseURL} />} />
              <Route path="/UpdatePosted-Blogs" element={<UpdatePostedBlogs url={axios.defaults.baseURL} />} />
              <Route path="/Applied-User-Profile/:jid" element={<AppliedUserProfile url={axios.defaults.baseURL} />} />
              <Route path="/Check-Profile/:CP" element={<CheckStudentProfiel url={axios.defaults.baseURL} />} />
              <Route path="/UpdateProfile" element={<EmployeeUpdateProfile url={axios.defaults.baseURL} />} />
              <Route path="/MyProfile" element={<EmployeeProfile url={axios.defaults.baseURL}/>} />
              {/* <Route path="Search-Candidate" element={<SearchCandidate url={axios.defaults.baseURL} */}
              <Route path="Search-Candidate" element={<SearchCandidate url={axios.defaults.baseURL}
         showMobileSearchIcon={showMobileSearchIcon} setShowMobileSearchIcon={setShowMobileSearchIcon}
         ShowSideNave={ShowSideNave} setShowSideNave={setShowSideNave}
         searchClick={searchClick} setSearchClick={setSearchClick}     
          nopageFilter={nopageFilter} setNoPageFilter={setNoPageFilter} 
          searchKey={searchKey} setsearchKey={setsearchKey}
          Filtereredjobs={Filtereredjobs} setFiltereredjobs={setFiltereredjobs}
          Result={Result} setResult={setResult}
          Filterjobs={Filterjobs} setFilterjobs={setFilterjobs}
          jobs={jobs} setJobs={setJobs}
          count={count} setCount={setCount}
          Active={Active} setActive={setActive}
          jobTagsIds={jobTagsIds} setJobTagsIds={setJobTagsIds}
          PageLoader={PageLoader} setPageLoader={setPageLoader}
          totalCount={totalCount} settotalCount={settotalCount}
          searchs={searchs}
          getjobs={getjobs}
          gettotalcount={gettotalcount}
          searchIcon={searchIcon}
          FilCandidate={FilCandidate}
          setFilCandidate={setFilCandidate}
          getAllJobSeekers={getAllJobSeekers}
          Candidate={Candidate}
          setCandidate={setCandidate}
               />} />

            </Route>
            {/* ..........Jobseeker Private component i,e can not search in URL......... */}
            <Route element={<StudPrivate />}>
              <Route path="/alljobs" element={<Jobs url={axios.defaults.baseURL} 
               showMobileSearchIcon={showMobileSearchIcon} setShowMobileSearchIcon={setShowMobileSearchIcon}
               ShowSideNave={ShowSideNave} setShowSideNave={setShowSideNave}
               searchClick={searchClick} setSearchClick={setSearchClick}
              nopageFilter={nopageFilter} setNoPageFilter={setNoPageFilter} 
              searchKey={searchKey} setsearchKey={setsearchKey}
              Filtereredjobs={Filtereredjobs} setFiltereredjobs={setFiltereredjobs}
              Result={Result} setResult={setResult}
              Filterjobs={Filterjobs} setFilterjobs={setFilterjobs}
              jobs={jobs} setJobs={setJobs}
              count={count} setCount={setCount}
              Active={Active} setActive={setActive}
              jobTagsIds={jobTagsIds} setJobTagsIds={setJobTagsIds}
              PageLoader={PageLoader} setPageLoader={setPageLoader}
              totalCount={totalCount} settotalCount={settotalCount}
              searchs={searchs}
              getjobs={getjobs}
              gettotalcount={gettotalcount}
              searchIcon={searchIcon}
              FilCandidate={FilCandidate}
              setFilCandidate={setFilCandidate}
              getAllJobSeekers={getAllJobSeekers}
              Candidate={Candidate}
              setCandidate={setCandidate}
              />} />
              <Route path="/AskQuestion" element={<AskQuestion  />} />
              <Route path="/Update-Profile" element={<StudentUpdateProfile url={axios.defaults.baseURL} />} />
              <Route path="/My-Profile" element={<StudentProfile />} />
              <Route path="/My-Applied-Jobs" element={<MyAppliedJobs url={axios.defaults.baseURL} />} />
              <Route path="/MyCareer-Applied-Jobs" element={<CareerAppliedJobs url={axios.defaults.baseURL} />} />
            </Route>
            <Route path="/AllCareerJobs" element={<AllCareerJobs 
            showMobileSearchIcon={showMobileSearchIcon} setShowMobileSearchIcon={setShowMobileSearchIcon}
            ShowSideNave={ShowSideNave} setShowSideNave={setShowSideNave}
            searchClick={searchClick} setSearchClick={setSearchClick}
            nopageFilter={nopageFilter} setNoPageFilter={setNoPageFilter} 
            searchKey={searchKey} setsearchKey={setsearchKey}
            Filtereredjobs={Filtereredjobs} setFiltereredjobs={setFiltereredjobs}
            Result={Result} setResult={setResult}
            Filterjobs={Filterjobs} setFilterjobs={setFilterjobs}
            jobs={jobs} setJobs={setJobs}
            count={count} setCount={setCount}
            Active={Active} setActive={setActive}
            jobTagsIds={jobTagsIds} setJobTagsIds={setJobTagsIds}
            PageLoader={PageLoader} setPageLoader={setPageLoader}
            totalCount={totalCount} settotalCount={settotalCount}
            search={search}
            getjobs={getjobs}
            gettotalcount={gettotalcount}
            searchIcon={searchIcon}
            />} />
            <Route path="/JobSeekerLogin" element={<StudentLogin />} />
            <Route path="/New-Registration" element={<NewRegistered />} />
            <Route path="/Jobseeker-New-Registration" element={<StuNewRegistered />} />
            <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
            <Route path="/JobDetails/:id" element={<Jobdetails />} />
            <Route path="/Blogdetails/:id" element={<Blogdetails />} />
            <Route path="/Answerdetails/:id" element={<Answerdetails />} />
            <Route path="/CareerJobdetails/:id" element={<CareerJobdetails />} />
            <Route path="/CheckEmpHalfProfile/:empId" element={<CheckEmpHalfProfile />} />
            <Route path="/DriveDetails/:id" element={<DriveDetails />} />

            <Route path="/Search-Candidate-Home" element={<SearchCandHome url={axios.defaults.baseURL}
            FilCandidate={FilCandidate} setFilCandidate={setFilCandidate}
            Candidate={Candidate} setCandidate={setCandidate} 
              showMobileSearchIcon={showMobileSearchIcon} setShowMobileSearchIcon={setShowMobileSearchIcon}
              ShowSideNave={ShowSideNave} setShowSideNave={setShowSideNave}
              searchClick={searchClick} setSearchClick={setSearchClick}
              nopageFilter={nopageFilter} setNoPageFilter={setNoPageFilter} 
              searchKey={searchKey} setsearchKey={setsearchKey}
              Filtereredjobs={Filtereredjobs} setFiltereredjobs={setFiltereredjobs}
              Result={Result} setResult={setResult}
              Filterjobs={Filterjobs} setFilterjobs={setFilterjobs}
              jobs={jobs} setJobs={setJobs}
              count={count} setCount={setCount}
              Active={Active} setActive={setActive}
              jobTagsIds={jobTagsIds} setJobTagsIds={setJobTagsIds}
              PageLoader={PageLoader} setPageLoader={setPageLoader}
              totalCount={totalCount} settotalCount={settotalCount}
              search={search}
              getjobs={getjobs}
              gettotalcount={gettotalcount}
              searchIcon={searchIcon} />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/support/help" element={<AllHelps   
            Active={Active} setActive={setActive} 
            getjobs={getjobs}  setJobs={setJobs} 
            count={count} setCount={setCount}
            nopageFilter={nopageFilter} setNoPageFilter={setNoPageFilter}
            />} />
            <Route path="/support/help/:id" element={<HelpDetails/>} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/TermsAndCondition" element={<TermsAndCondition />} />

            <Route path="*" element={<h2 style={{ marginLeft: "43%", marginTop: "10%", color: " rgb(40, 4, 99)" }}>Page Not Found</h2>} />

          </Routes>


        </div>
      
      </BrowserRouter>
    </>
  );
}

export default App

