import React, { useEffect, useState } from 'react'
import Styles from "./nav.module.css"
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
// import { jobTags } from '../Tags';


function SidebarNav(props) {
  const[show,setShow]=useState(false)
  let navigate = useNavigate()
  const [empHome, setEmpHome] = useState(false);
  const location = useLocation(); 
  // const[pathName,setPathName]=useState(location.pathname)
  // console.log("pathnameees",pathName)

  useEffect(() => {
    // console.log("Current Path:", location.pathname); 

    if (location.pathname === "/Search-Candidate") {
      setEmpHome(true);
    } else {
      setEmpHome(false); 
    }

    const inputField = document.querySelector(`.${Styles.blogInputboxsearch}`);
    if (inputField) {
      inputField.value = ""; 
      props.setShowMobileSearchIcon(true)

    //   if(empHome){
    //     // props.searchs("")
    //     setQuery("")   
    //   }
    //  else if(location.pathname==="/Blogs"){
    //     props.searchBlog("")     
    //     setQuery("")   
    //   }
    //   else if(location.pathname==="/AllCareerJobs"){
    //     props.searchcarrer("")    
    //     setQuery("")    
    //    }
    //    else if(location.pathname==="/alljobs"){
    //     props.jobSeekersearch("")
    //     setQuery("")   
    //    }
    //    else if(location.pathname==="/Search-Candidate-Home"){
    //     props. empSearchNoLogin("") 
    //     setQuery("")         
    //    }
    //    else{
    //     props.search("")  
    //     setQuery("")  
    //    }
    }
  }, [location.pathname]); 
  let EmployeeAuth = localStorage.getItem("EmpLog")

// const [query, setQuery] = useState("");
// const [suggestions, setSuggestions] = useState([]);

//   const handleInputChange = (event) => {
//     if(empHome)
//       props.searchs(event)
//    else if(location.pathname==="/Blogs"){
//         props.searchBlog(event)        
//     }
//    else if(location.pathname==="/AllCareerJobs"){
//     props.searchcarrer(event)        
//    }
//    else if(location.pathname==="/alljobs"){
//     props.jobSeekersearch(event)
//    }
//    else if(location.pathname==="/Search-Candidate-Home"){
//     props. empSearchNoLogin(event)       
//    }
//    else{
//     props.search(event)   
//    }

//     const values = event.target.value;
//     setQuery(values)  
//     if (values) {
//       const filteredTags = jobTags.filter((tag) =>
//        tag.value.toLowerCase().includes(values.toLowerCase())
//      );
//      setSuggestions(filteredTags);
//     } else {
//      setSuggestions([]);
//     }
//   };

//    const handleSuggestionClick = (tag) => {
   
//    if(empHome)
//     props.searchEmpTags(tag)
//   else if(location.pathname==="/Blogs"){
//       props.BlogSearchTags(tag)       
//   }
//  else if(location.pathname==="/AllCareerJobs"){
//   props.carrerSearchTags(tag)        
//  }
//  else if(location.pathname==="/alljobs"){
//   props.jobseekerSearchTags(tag)
//  }
//  else if(location.pathname==="/Search-Candidate-Home"){
//   props.searchBlurTags(tag)     
//  }
//  else{
//   props.searchByTags(tag)
//  }

//    setQuery(tag);
//    setSuggestions([]); 
//  };





  return (
  <>
  
      <div  >
      {/* <p style={{marginLeft:"80%"}} onClick={()=>{props.setShowSideNaveProps((prev)=>!prev)}}> &#10005;</p> */}
      <div style={{ marginTop:"-15px", zIndex:1000}}>
      <div style={{display:"flex",marginTop:"10px",marginRight:"6px"}} >
            {/* <input style={{height:"18px",width:"84%",marginLeft:"2px"}}className={Styles.blogInputboxsearch}  type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => { props.search(e) }} /> */}
            {/* <input style={{height:"18px",width:"84%",marginLeft:"2px"}}className={Styles.blogInputboxsearch} value={query}  type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={handleInputChange} /> */}
            <input style={{height:"18px",width:"84%",marginLeft:"2px"}}className={Styles.blogInputboxsearch}  type="text" placeholder='Search for a Job / Skills / Location / Experiance' onChange={(e) => {  
                                                                                                                                                                            if(empHome)
                                                                                                                                                                                props.searchs(e)
                                                                                                                                                                             else if(location.pathname==="/Blogs"){
                                                                                                                                                                                  props.searchBlog(e)
                                                                                                                                                                                  console.log("s-screen blogs entered")          
                                                                                                                                                                              }
                                                                                                                                                                             else if(location.pathname==="/AllCareerJobs"){
                                                                                                                                                                              props.searchcarrer(e)
                                                                                                                                                                              console.log(" s-screen carrer entered")          
                                                                                                                                                                             }
                                                                                                                                                                             else if(location.pathname==="/alljobs"){
                                                                                                                                                                              props.jobSeekersearch(e)
                                                                                                                                                                              console.log("s-screen jobseeker home entered") 
                                                                                                                                                                             }
                                                                                                                                                                             else if(location.pathname==="/Search-Candidate-Home"){
                                                                                                                                                                              props. empSearchNoLogin(e)
                                                                                                                                                                              console.log("emp entered",e.target.value)          
                                                                                                                                                                             }
                                                                                                                                                                             
                                                                                                                                                                             else{
                                                                                                                                                                              props.search(e)
                                                                                                                                                                              console.log("s-screen else entered")   
                                                                                                                                                                             } }} />
           
            <i style={{marginLeft:"2px",fontSize:"16px",marginTop:"6px"}} class="fa fa-search" onClick={() => { props.searchIcon(props.searchKey);props.setShowSideNaveProps();props.setShowMobileSearchIcon(true)}}></i>
          </div>
          {/* {suggestions.length > 0 && (
        <div
          style={{
            border: "1px solid #ccc",
            maxHeight: "150px",
            overflowY: "auto",
            position: "absolute",
            width: "92%",
            background: "white",
            zIndex: 1000,
            marginTop: "2px",
            borderRadius: "4px",
            left:"2px"
          }}
        >
          {suggestions.map((tag, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(tag.value)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                color:"black"
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f0f0f0")}
              onMouseLeave={(e) => (e.target.style.background = "white")}
            >
              {tag.value}
            </div>
          ))}
        </div>
      )} */}



        <p onClick={()=>{navigate("/"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>Home </p>
       {EmployeeAuth&&(
        <p onClick={()=>{navigate("/Post-Help-Questions"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>Post Help Questions </p>
       )

       }
                <p onClick={()=>{navigate("/support/help"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>Help/Support </p>
        <p onClick={()=>{setShow(prev=>!prev)}} className={`${Styles.textinMobileSodeBar} `}>Open an account
       {
        show?
        <i  className={`${Styles.arrow} ${Styles.down}`} ></i>
        :
        <i  className={`${Styles.arrow} ${Styles.up}`} ></i>     
       }
        </p>
       {
        show?
        <div style={{marginLeft:"10px"}}>
<p onClick={() => { navigate("/New-Registration");props.setShowSideNaveProps(false);setShow(false); window.scrollTo({top:0}) }} className={`${Styles.textinMobileSodeBar} `}>Employer Registration </p>
<p onClick={() => { navigate("/Jobseeker-New-Registration");props.setShowSideNaveProps(false);setShow(false); window.scrollTo({top:0}) }}className={`${Styles.textinMobileSodeBar} `} >Job Seeker Registration</p>
        </div>
        :""
       }
        <p onClick={()=>{navigate("/Blogs"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>Blogs </p>
        <p onClick={()=>{navigate("/AllCareerJobs"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>ITwalkin Career</p>
        <p onClick={()=>{navigate("/Walkin-Drives"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>Walkin Drive</p>
        <p onClick={()=>{navigate("/AboutUs"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>About Us</p>
        <p onClick={()=>{navigate("/Services"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>Our Services</p>
        <p onClick={()=>{navigate("/Contact"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>Contact Us</p>
       
        <p onClick={()=>{navigate("/TermsAndCondition"); props.setShowSideNaveProps(false);props.setShowMobileSearchIcon(true)}} className={`${Styles.textinMobileSodeBar} `}>Terms & Conditions</p>
        </div>
      </div>
      </>
  )
}

export default SidebarNav