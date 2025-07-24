import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, NavLink, useSearchParams } from "react-router-dom";
import Styles from "./nav.module.css"
import logo from "../img/Blue.jpg"
import Itwalkinlogo from "../img/ItwalkInLogo.jpg"
import logIn from "../img/user_3177440.png"
import NavIcon from "../img/icons8-menu-50.png"
import Cancel from "../img/icons8-cross-50.png"
import HomeIcon from "../img/icons8-home-30.png"
import EmpNotification from "../img/icons8-notification-33.png"
import JobseekerNotification from "../img/icons8-notification-30.png"
import useScreenSize from '../SizeHook';
import SidebarNav from "./SidebarNav"
import BigSidebarNav from '../BigSideNav'
import loginuser from "../img/icons8-user-96.png"
import StudentUpdateProfile from '../Profile/StudentUpdateProfile';
import location from "../img/icons8-location-20.png"
import Modal from "../Login/EmpLogModal";
import StuModal from "../Login/StudLogModal";

function Nav(props) {

  // const[empHomeClicked, setEmpHomeClicked]=useState(false)

  // const updateEmpClicked=()=>{
  //   setEmpHomeClicked((currentValue)=>!currentValue)
  // }

  const [showprofile, setShowprofile] = useState(false)
  // const [ShowSideNave, setShowSideNave] = useState(false)
  // const [searchClick, setSearchClick] = useState(false)
  const navigate = useNavigate()

  let StudentAuth = localStorage.getItem("StudLog")
  let EmployeeAuth = localStorage.getItem("EmpLog")
  let adminLogin = localStorage.getItem("AdMLog")
  let SuperAdminLogin = localStorage.getItem("SupAdMLog")
  const screenSize = useScreenSize();

  const StudlogOut = () => {
    navigate("/")
    localStorage.clear("StudLog")
  }
  const logutEmp = () => {
    navigate("/")
    localStorage.clear("EmpLog")
  }
  const AdminlogOut = () => {
    navigate("/BIAdd@Logg")
    localStorage.clear("AdMLog")
  }

  let menuRef = useRef();
  let imgRef = useRef();

  let SmenuRef = useRef();
  let SimgRef = useRef();
  let newReg = useRef();
  let Reg = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== newReg.current && e.target !== Reg.current) {
      setShowRegister(false)
    }
  })
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setShowprofile(false)
    }
  })

// window.addEventListener("click", (e) => {
  //   if (e.target !== SmenuRef.current && e.target !== SimgRef.current) {
  //     setShowSideNave(false)
  //   }
  // })

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "rgb(40, 4, 99)" : "",
      // textDecoration: isActive ? "underline" : "",
      // position: isActive ? "absolute" : "",
      // padding: isActive ? "3px" : "",
      backgroundColor: isActive ? "white" : "",
      // textDecoration: isActive ? "underline" : "",

    }
  }
  function myprofile() {
    navigate("/My-Profile")
  }
  function updateprofile() {
    navigate("/Update-Profile")
  }

  function mySubmittedQuote() {
    navigate("/My-Submitted-jobs")
  }
  
  function MyDrivesApplied() {
    navigate("/My-Applied-Drives")
  }
  function AskQuestion() {
    navigate("/AskQuestion")
  }

  function updateEmployeeProfile() {
    navigate("/UpdateProfile")
  }
  function mypostedjob() {
    navigate("/postedjobs")
  }

  function myposteddrive() {
    navigate("/posteddrives")
  }

  function mypostedArticle() {
    navigate("/posted-Blogs")
  }
  function PostBlogs() {
    navigate("/PostBlogs")
  }

  function EmployeeProfile() {
    navigate("/MyProfile")
  }
  // ......Modal....
  const [open, setOpen] = useState(false);
  const [Stuopen, setStuopen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmpOpen = () => {
    setOpen(true);
  };
  const handleStuOpen = () => {
    setStuopen(true);
  };

  const handleStuClose = () => {
    setStuopen(false);
  };


  const [ShowBigSideNave, setShowBigSideNave] = useState(false)

  function ChangeSideNaveBar() {
    props.chandinmargin((prev) => !prev)
    setShowBigSideNave((prev) => !prev)
  }
  function ChangeSideNaveMobile() {
    props.setShowSideNave((prev) => !prev)
  }
  const [ShowRegister, setShowRegister] = useState(false)

  function handleOpenAccont(){
    setShowRegister((prev)=>!prev)
  }

  // const [showMessage, setShowMessage] = useState(false);
  const [showDriveMenu, setShowDriveMenu]=useState(false)
  let driveRef=useRef();
  let driveImgRef=useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== driveRef.current && e.target !== driveImgRef.current) {
      setShowDriveMenu(false)
    }
  })

   const [value , setValue] = useState("")

   const reDirecttoDrive=()=>{
      setValue("AllWalkinDrive")
      navigate("/Walkin-Drives")
   }
  
   const reDirecttoFraud=()=>{
    // setValue("AllWalkinDrive")
    navigate("/fraud-form")
 }

    const [isOpen, setIsOpen] = useState(false);
    const handleSelect = (option) => {
      // props.setSelectedlocationOption(option);
      setIsOpen(false);
    };
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
        // let StudentAuth = localStorage.getItem("StudLog")
        // let EmployeeAuth = localStorage.getItem("EmpLog")
          const bgvCheck=()=>{
             if(StudentAuth){
              navigate("/My-Applied-Jobs")
             }
             else{
              navigate("/JobSeekerLogin")
             }
          }

          const [resumeAlert, setresumeAlert]=useState(false)
          const alertRef = useRef(null);
          useEffect(() => {
            const handleClickOutside = (event) => {
              // If clicked outside alert box and it's open
              if (alertRef.current && !alertRef.current.contains(event.target)) {
                setresumeAlert(false); // close the alert
              }
            };
          
            document.addEventListener('mousedown', handleClickOutside);
          
            return () => {
              document.removeEventListener('mousedown', handleClickOutside);
            };
          }, []);

        return (
    <>

      {

        //  ............................................Jobseeker Login...............................................   
        screenSize.width > 750 ?

          StudentAuth ?
            <>
              <div className={Styles.fullnavewrapper}>
                <div className={Styles.fullnavewrapperLS} >
                  <div style={{display:"flex"}}>
                  <i style={{ fontSize: "Large", color: "white", zIndex: "1000",  }}
                    className={ShowBigSideNave ? "fas fa-times" : "fas fa-bars"} onClick={()=>{ChangeSideNaveBar();props.setSearchClick((currentValue)=>!currentValue)}}>
                  </i>
                  <i style={{color:"white", fontSize:"18px",visibility:props.searchClick?"hidden":"visible"}}
                  class=" fa fa-search" onClick={() => {ChangeSideNaveBar();props.setSearchClick((currentValue)=>!currentValue)}} ></i>
                 </div>
                 <div>
                        <div style={{color:"white",marginLeft:"10px",fontWeight:"600", fontSize:"22px"}}>  Get Quote </div>
                      </div>
                <div style={{display:"flex"}}>
                  <div><NavLink to="/alljobs" className={Styles.AllJobJobSeeker}  style={navLinkStyles}>Seller Home</NavLink>
                  </div>
                  
                  
                  </div>
                  {/* <div><NavLink to="/resumes" className={Styles.AllJobJobSeeker}  style={navLinkStyles}>AI Resume Builder </NavLink></div> */}
                  <div ref={dropdownRef} style={{ position: "relative" }}>
                            
                            <div style={{ display: "flex", marginTop: "-5px" }}>
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
                                <img className={Styles.jobLocationImage} src={location} alt="Location" />
                              </button>
                              <p style={{ marginTop: "17px", fontWeight: "bold", color: "white" }}>
                                {props.selectedlocationOption?.label}
                              </p>
                            </div>
                      
                           
                            {isOpen && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "45px",
                                  left: "-18px",
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
                                  {props.options.map((option) => (
                                    <li
                                      key={option.value}
                                      onClick={() => handleSelect(option)}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "10px",
                                        cursor: option.value === "Bangalore" ? "pointer" : "default",
                                        borderRadius: "10px",
                                        color: option.value !== "Bangalore" ? "gray" : "black",
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
                  
                </div>

                <div className={Styles.fullnavewrapperRS} >
                <div>
                      <NavLink to="/My-Applied-Jobs" className={` ${Styles.HomeSearchCandidate}`} style={navLinkStyles}>Background check</NavLink>
                      </div>
                <div>
                <img className={`${Styles.Icon} ${Styles.JobSeekerprofileIcon

}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

{showprofile ?
<div className={Styles.Alldownwrapper} >
  <div className={Styles.JobSeekerdropdownwrapper} ref={menuRef} >
    <p className={Styles.text} ref={menuRef} onClick={myprofile}>My profile</p>

    <p className={Styles.text} ref={menuRef} onClick={mySubmittedQuote}>My Submitted<br></br> Quotes</p>
    <p className={Styles.text} ref={menuRef} onClick={MyDrivesApplied}>Registered <br></br>Walkin Drives</p>
    <p className={Styles.text} ref={menuRef} onClick={AskQuestion}>Ask Question</p>
    <p className={Styles.text} ref={menuRef} onClick={StudlogOut}>Logout</p>

  </div>
</div>
: ""}      
                </div>
                {/* <div>
                {props.flashVisible && (
                       <div className={Styles.blast}>
                         <img
                           onClick={reDirecttoDrive}
                           src="/drive.png"
                           alt="Walk-in Drive"
                           style={{ width: "60px", borderRadius: "5px", marginTop: "-10px" }}
                         />
                       </div> */}
                     {/* )} */}
                {/* </div> */}
                <div>
                      {
                       <div className={Styles.blast}>
                         <img
                           onClick={reDirecttoFraud}
                           src="/report-fraud.png"
                           alt="Walk-in Drive"
                           ref={driveImgRef}
                           style={{ width: "60px", borderRadius: "5px", marginTop: "-10px" }}
                         />
                       </div>
                     }
                      </div>
                </div>
              </div> 
              <div className="BigNavWrapper" style={{
  marginTop: "-6px",
  marginLeft: ShowBigSideNave ? "-5px" : "-215px"
}}>
                
                    <BigSidebarNav  jobSeekersearch={props.jobSeekersearch} searchcarrer={props.searchcarrer} searchBlog={props.searchBlog} setSearchClick={props.setSearchClick} searchs={props.searchs} search={props.search} searchKey={props.searchKey} searchIcon={props.searchIcon} ChangeSideNaveBar={ChangeSideNaveBar}/>
                  </div> 
              

            </>

            // ..........................................Emplyee login.......................................................              
            :
            
            (EmployeeAuth) ?
              <>
              <div className={Styles.fullnavewrapper}>
                <div className={Styles.empFullnavewrapperLS}>
                   <div>
                     <div style={{display:"flex"}}>
                      <i style={{ fontSize: "Large", color: "white", zIndex: "1000",  }}
                       className={ShowBigSideNave ? "fas fa-times" : "fas fa-bars"} onClick={()=>{ChangeSideNaveBar();props.   setSearchClick((currentValue)=>!currentValue)}}>
                     </i>
                     <i style={{color:"white", fontSize:"18px",visibility:props.searchClick?"hidden":"visible"}}
                     class=" fa fa-search" onClick={() => {ChangeSideNaveBar();props.setSearchClick((currentValue)   =>!currentValue)}} ></i>
                     </div>
                     <div className="BigNavWrapper" style={{ marginLeft: ShowBigSideNave ?"-5px" : "-215px"}}>
                   <BigSidebarNav  jobSeekersearch={props.jobSeekersearch} searchcarrer={props.searchcarrer} searchBlog={props.searchBlog} setSearchClick={props.setSearchClick} searchs={props.searchs} search={props.search} searchKey={props.searchKey} searchIcon={props.searchIcon} ChangeSideNaveBar={ChangeSideNaveBar}/> 
                    </div>
                   </div>
                   <div>
                        <div style={{color:"white",marginLeft:"10px",fontWeight:"600",fontSize:"22px"}}>  Get Quote </div>
                      </div>
                   <div>
                      <NavLink to="/PostJobs" className={Styles.PostJobLink} style={navLinkStyles}>Post a Job</NavLink>
                   </div>
                   <div><NavLink to="/seller-response" className={Styles.AllJobJobSeeker}  style={navLinkStyles}>Seller response</NavLink>
                  </div>
                  <div><NavLink to="/quote-response" className={Styles.AllJobJobSeeker}  style={navLinkStyles}>Quote response</NavLink>
                  </div>
                   {screenSize.width > 850 && 
                   <div ref={dropdownRef} style={{ position: "relative" }}>
                            
                            <div style={{ display: "flex", marginTop: "-5px" }}>
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
                                <img className={Styles.jobLocationImage} src={location} alt="Location" />
                              </button>
                              <p style={{ marginTop: "17px", fontWeight: "bold", color: "white" }}>
                                {props.selectedlocationOption?.label}
                              </p>
                            </div>
                      
                           
                            {isOpen && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "45px",
                                  left: "-18px",
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
                                  {props.options.map((option) => (
                                    <li
                                      key={option.value}
                                      onClick={() => handleSelect(option)}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "10px",
                                        cursor: option.value === "Bangalore" ? "pointer" : "default",
                                        borderRadius: "10px",
                                        color: option.value !== "Bangalore" ? "gray" : "black",
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
                          }
                </div>
                <div className={Styles.empFullnavewrapperRS}>
                 <div>
                  <NavLink to="/Post-Help-Questions" className={Styles.PostHelpLink} style={navLinkStyles}>Post Help Questions</NavLink>
                 </div>
                 <div>
                 <NavLink to="/PostDrives" className={Styles.PostDriveLink} style={navLinkStyles}>Post Walkin Drive</NavLink>
                 </div>
                 <div> 
                  <NavLink to="/Search-Candidate" className={Styles.SearchCandidates} style={navLinkStyles}>Buyer Home</NavLink>
                  </div>
                 <div>
                    <img className={`${Styles.Icon} ${Styles.EmpProfileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />       
                    {showprofile ?
                        <div className={Styles.Alldownwrapper} >
                          <div className={Styles.Empdropdownwrapper} ref={menuRef} >
                            <p className={Styles.text} ref={menuRef} onClick={EmployeeProfile} >My profile</p>
                            <p className={Styles.text} ref={menuRef} onClick={mypostedjob}>My Posted <br></br>Purchase requests</p>
                            <p className={Styles.text} ref={menuRef} onClick={myposteddrive}>My posted Drives</p>
                            <p className={Styles.text} ref={menuRef} onClick={mypostedArticle}>Posted Articles</p>
                            <p className={Styles.text} ref={menuRef} onClick={PostBlogs}>Write Article</p>
                            <p className={Styles.text} ref={menuRef} onClick={logutEmp}>Logout</p>
                          </div>
                        </div>
                        : ""}
                 </div> 
                 {/* <div>
                 {props.flashVisible && (
                       <div className={Styles.blast}>
                         <img
                           onClick={reDirecttoDrive}
                           src="/drive.png"
                           alt="Walk-in Drive"
                           ref={driveImgRef}
                           style={{ width: "60px", borderRadius: "5px", marginTop: "-10px" }}
                         />
                       </div>
                     )}
                 </div>  */}
                 <div>
                      {
                       <div className={Styles.blast}>
                         <img
                           onClick={reDirecttoFraud}
                           src="/report-fraud.png"
                           alt="Walk-in Drive"
                           ref={driveImgRef}
                           style={{ width: "60px", borderRadius: "5px", marginTop: "-10px" }}
                         />
                       </div>
                     }
                      </div>          
                </div>
                         
             </div>

              </>
              // ............Admin Login...................... SuperAdminLogin
              :
              (adminLogin) ?
                <>
                  <div className={Styles.fullnavewrapper}>
                    <div className={Styles.logoWrapper}>
                      <NavLink > <img className={Styles.logo} src={logo} /> </NavLink>
                    </div>
                    <div className={Styles.linkWrapper}>
                      {/* <NavLink to="/BIAddmin@Profile" className={Styles.link} style={navLinkStyles}>All </NavLink> */}
                      <NavLink to="/" className={Styles.HomeJobs} style={navLinkStyles}><i style={{ marginLeft: 0, marginRight: "5px" }} class="fa-solid fa-house"></i>Buyer Home</NavLink>

                      <NavLink to="/AboutUs" className={`${Styles.Aboutlink}`} style={navLinkStyles} >About Us</NavLink>
                      <NavLink to="/Services" className={Styles.link} style={navLinkStyles}>Services</NavLink>
                      <NavLink to="/BIAddmin@PostJob" className={Styles.link} style={navLinkStyles}> Post Job</NavLink>
                      <NavLink to="/BIAddmin@AdminCareerPostJobs" className={Styles.link} style={navLinkStyles}>Career Job Post</NavLink>
                      <NavLink to="/Blogs" className={Styles.link} style={navLinkStyles}>Blogs</NavLink>
        {/* <p onClick={()=>{navigate("/Blogs")}} className={`${Styles.textinMobileSodeBar} `}>Blogs </p> */}

                      <div className={`${Styles.link} ${Styles.IconeWrapper}`}>
                        <img className={`${Styles.Icon} ${Styles.profileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
                      </div >
                    </div>
                  </div>
                  {/* .....................drop down............ */}
                  {showprofile ?
                    <div className={Styles.Alldownwrapper} >

                      <div style={{ marginLeft: "-11%" }} className={Styles.Admindropdownwrapper} ref={menuRef} >
                        {/* <p className={Styles.text} ref={menuRef} >My profile</p>

                      <p className={Styles.text} ref={menuRef} >Update BIAdd@PostedCareerJobs</p> */}
                        <p className={Styles.text} ref={menuRef} onClick={() => { navigate("BIAdd@PostedCareerJobs") }}>Posted Career Jobs</p>
                        <p className={Styles.text} ref={menuRef} onClick={() => { navigate("BIAdd@AdminPostedJobs") }}>Admin Posted Jobs</p>

                        <p className={Styles.text} ref={menuRef} onClick={AdminlogOut}>Logout</p>

                      </div>
                    </div>
                    : ""}
                  {/* .........only for Super Admin */}
                  {SuperAdminLogin ?
                    <div className={Styles.Supfullnavewrapper}>
                      <div className={Styles.linkWrapper} style={{ marginLeft: "1%" }}>

                        {/* <NavLink to="/BIAddmin@AllJobs" style={navLinkStyles} className={Styles.linkSuperAdmin}>Buyer Home </NavLink> */}
                        <NavLink to="BIAddmin@AllEmployees" className={Styles.linkSuperAdmin} style={navLinkStyles}>All Employers</NavLink>
                        <NavLink to="BIAddmin@AllJobSeekers" className={Styles.linkSuperAdmin} style={navLinkStyles}>Buyer Homeeekers</NavLink>
                        <NavLink to="BIAddmin@AdminUpdate" className={Styles.linkSuperAdmin} style={navLinkStyles}> UpdateWebsite</NavLink>
                        <NavLink to="BIAddmin@AllIds" className={Styles.linkSuperAdmin} style={navLinkStyles}> All Email Id's</NavLink>
                        <NavLink to="BIAddAdminAccess" className={Styles.linkSuperAdmin} style={navLinkStyles}> Admin Access</NavLink>
                        <NavLink to="BIAddmin@ArchivedUser" className={Styles.linkSuperAdmin} style={navLinkStyles}> Archive Jobseeker</NavLink>
                        <NavLink to="BIAddmin@ArchiveJobs" className={Styles.linkSuperAdmin} style={navLinkStyles}> Archived Jobs</NavLink>
                        <NavLink to="BIAddmin@DeletedJobs" className={Styles.linkSuperAdmin} style={navLinkStyles}> Deleted Jobs</NavLink>
                        <NavLink to="BIAddmin@DeletedBlogs" className={Styles.linkSuperAdmin} style={navLinkStyles}> Deleted Blogs</NavLink>
                      </div>
                    </div>
                    : ""}

                </>
                // ............................................Home Nave....................................................      
                :
                <>
                  <div className={Styles.fullnavewrapper}>
                    <div className={Styles.fullnavewrapperLS}>
                      <div>
                          <div style={{display:"flex"}}>
                          <i style={{ fontSize: "Large", color: "white", zIndex: "1000",  }}
                          className={ShowBigSideNave ? "fas fa-times" : "fas fa-bars"} onClick={() => {ChangeSideNaveBar();props.setSearchClick((currentValue)=>!currentValue)}}>
                          </i>
                           <i style={{color:"white", fontSize:"18px",visibility:props.searchClick?"hidden":"visible"}}
                           class=" fa fa-search" onClick={() => {ChangeSideNaveBar();props.setSearchClick((currentValue)=>!currentValue)}} ></i>
                           </div>
                           <div className="BigNavWrapper" style={ShowBigSideNave ? { marginLeft: "-5px" } : { marginLeft: "-215px" }} >
                           <BigSidebarNav  empSearchNoLogin={props.empSearchNoLogin} jobSeekersearch={props.jobSeekersearch} searchcarrer={props.searchcarrer} searchBlog={props.searchBlog} setSearchClick={props.setSearchClick} setShowMobileSearchIcon={props.setShowMobileSearchIcon} search={props.search} searchKey={props.searchKey} searchIcon={props.searchIcon} ChangeSideNaveBar={ChangeSideNaveBar}/>
                           </div>
                      </div>
                      <div>
                      <div>
                        <div style={{color:"white",marginLeft:"10px",fontWeight:"600", fontSize:"22px"}}>  Get Quote </div>
                      </div>
                      </div>
                      <div>
                      <NavLink to="/" className={Styles.HomeJobs} style={navLinkStyles}><i style={{ marginLeft: 0, marginRight: "5px" }}></i>Buyer Home</NavLink>   
                      </div>
                      {/* <div ref={alertRef} style={{position:"relative"}}> */}
                        {/* <div onClick={()=>setresumeAlert((prev)=>prev=!prev)} className={Styles.AllJobJobSeeker} style={{cursor:"pointer"}}>AI Resume Builder </div>
                         {resumeAlert&&
                         <>
                            <div
        style={{
          width: '300px',
          padding: '20px',
          backgroundColor: 'rgb(40,4,99)',
          color: 'white',
          fontSize: '12px',
          borderRadius: '5px',
          position: 'fixed',
          top: '17%',
          left: '32%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
        
        > 
        
        Login as a Jobseeker to explore opportunities and create a strong resume!
          <div  style={{ marginTop: '15px', display:"flex", justifyContent:"center", gap:"5px" }}>
            <button
              onClick={() => {navigate("/JobSeekerLogin"); setresumeAlert(false)}}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Ok
            </button>
            <button
              onClick={()=> setresumeAlert(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
                         </>

                         } */}
                        {/* </div> */}
            

                      <div ref={dropdownRef} style={{ position: "relative" }}>
                            
                            <div style={{ display: "flex", marginTop: "-5px" }}>
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
                                <img className={Styles.jobLocationImage} src={location} alt="Location" />
                              </button>
                              <p style={{ marginTop: "17px", fontWeight: "bold", color: "white" }}>
                                {props.selectedlocationOption?.label}
                              </p>
                            </div>
                      
                           
                            {isOpen && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "45px",
                                  left: "-18px",
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
                                  {props.options.map((option) => (
                                    <li
                                      key={option.value}
                                      onClick={() => handleSelect(option)}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "10px",
                                        cursor: option.value === "Bangalore" ? "pointer" : "default",
                                        borderRadius: "10px",
                                        color: option.value !== "Bangalore" ? "gray" : "black",
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
                    </div>
                    <div className={Styles.fullnavewrapperRS}>
                    {/* <div>
                      <NavLink to="/fraud-form" className={` ${Styles.HomeSearchCandidate}`} style={navLinkStyles}>Fraud </NavLink>
                      </div> */}
                      <div>
                      <NavLink to="/JobSeekerLogin" className={` ${Styles.HomeSearchCandidate}`} style={navLinkStyles}>Background check</NavLink>
                      </div>
                      <div>
                      <NavLink to="/Search-Candidate-Home" className={` ${Styles.HomeSearchCandidate}`} style={navLinkStyles}>Seller Home </NavLink>
                      </div>
                      <div>
                         <p className={` ${Styles.openAccount}`} onClick={handleOpenAccont} ref={Reg} >Open an Account</p>
                         {
                           ShowRegister?
                           <div className={Styles.dropdownwrapperHomeRegistration} ref={newReg} >
                           <p onClick={()=>{navigate("/New-Registration");setShowRegister(false)}}>Buyer Registration</p>
                           <p onClick={()=>{navigate("/Jobseeker-New-Registration");setShowRegister(false)}}>Seller Registration</p>
                           </div>
                           :""
                         }
                      </div>
                      <div>
                      <img className={` ${Styles.HomeprofileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
                    {showprofile ?
                    <div className={Styles.Alldownwrapper} >

                      <div style={{  }} className={Styles.dropdownwrapperHome} ref={menuRef} >
                        <p onClick={() => { handleEmpOpen(); handleStuClose() }}>Buyer Login</p>
                        <p onClick={() => { handleStuOpen(); handleClose() }}>Seller Login</p>
                      </div>
                    </div>

                    : ""}
                      </div>
                      {/* <div>
                      {props.flashVisible && (
                       <div className={Styles.blast}>
                         <img
                           onClick={reDirecttoDrive}
                           src="/drive.png"
                           alt="Walk-in Drive"
                           ref={driveImgRef}
                           style={{ width: "60px", borderRadius: "5px", marginTop: "-10px" }}
                         />
                       </div>
                     )}
                      </div> */}
                      <div>
                      {
                       <div className={Styles.blast}>
                         <img
                           onClick={reDirecttoFraud}
                           src="/report-fraud.png"
                           alt="Walk-in Drive"
                           ref={driveImgRef}
                           style={{ width: "60px", borderRadius: "5px", marginTop: "-10px" }}
                         />
                       </div>
                     }
                      </div>
                    </div>                                     
                  </div>
                  
                  <>
                    <StuModal isStuOpen={Stuopen} onClose={() => { handleStuClose() }} />
                    <Modal isOpen={open} onClose={() => { handleClose() }} />
                  </>


                </>

          :    //OR  mobile Nave


          //  ............................................Jobseeker Login...Mobile view............................................   
          StudentAuth ?
            <>
              <div className={Styles.fullnavewrapper}>
                <div className={Styles.fullnavewrapperLSMobile} style={{marginRight:"0px"}}>
                  <div>
                    <div style={{display:"flex"}}>
                    <i style={{ fontSize: "Large", color: "white", zIndex: "1000",  }}
                     className={props.ShowSideNave ? "fas fa-times" : "fas fa-bars"} ref={SimgRef} onClick=                     {() => { props.setShowSideNave((prev) => !prev);props.setSearchClick((currentValue)                     =>!currentValue);props.setShowMobileSearchIcon((currentValue)=>!currentValue)}}>
                     </i>
                     <i style={{ visibility:props.showMobileSearchIcon?"visible":"hidden", color: "white", fontSize: "18px", cursor: "pointer" ,zIndex:"999"}} onClick=                     {() => { props.setShowSideNave((prev) => !prev);props.setSearchClick((currentValue)                     =>!currentValue);props.setShowMobileSearchIcon((currentValue)=>!currentValue)}}
                      class="searchicon fa fa-search" ></i>
                        </div>
                  </div>
                  
                <div className={Styles.ITwalkinWrapper} style={{marginTop:"13px", width:"96px", position:"relative"}}> 
 
                  {/* <img className={Styles.MobIwalkinLogologo} src={Itwalkinlogo}  /> */}
                  <div style={{display:"flex", alignItems:"center"}}>
                  <h2 style={{color:"white", textAlign:"center", marginTop:"-2px", marginLeft:"6px"}}>Get <br></br>Quote</h2>
                  </div>
                  {showprofile ?
                  <div className={Styles.Alldownwrapper} >
                  <div className={Styles.MobJobseekerDropdownwrapperlogin} ref={menuRef} >
                    <p className={Styles.text} ref={menuRef} onClick={myprofile}>My profile</p>
                    <p className={Styles.text} ref={menuRef} onClick={mySubmittedQuote}>My Submitted <br></br> Quote</p>
                    <p className={Styles.text} ref={menuRef} onClick={MyDrivesApplied}>Registered <br></br>Walkin Drives</p>
                    <p className={Styles.text} ref={menuRef} onClick={AskQuestion}>Ask Question</p>

                    <p className={Styles.text} ref={menuRef} onClick={StudlogOut}>Logout</p>

                  </div>
                </div>
                : ""}
                </div>
                  
                </div>
                 
                <div className={Styles.fullnavewrapperRSMobile} style={{marginRight:"11px"}}>
                 <div>
                  <NavLink to="/alljobs" className={`${Styles.Moblink} ${Styles.AlllJobs}`} >Buyer Home </NavLink>
                  </div>
                <div>
                  
                <img className={`${Styles.Icon} ${Styles.MobJobseekerProfileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                </div>
                <div>
                {props.flashVisible && (
                       <div className={Styles.blast} style={{cursor:"pointer"}}>
                         <img
                           onClick={reDirecttoDrive}
                           src="/drive.png"
                           alt="Walk-in Drive"
                           style={{zIndex:"999", width: "50px", borderRadius: "5px",marginTop:"-10px" }}
                         />
                       </div>
                     )}
                </div>
                </div>
                 </div>

                 <div ref={SmenuRef} className={`${Styles.MovileNavOptions} `}
                    style={props.ShowSideNave ? { marginLeft: "0px" } : { marginLeft: "-380px" }} >
                   
                  <SidebarNav  jobSeekersearch={props.jobSeekersearch} searchcarrer={props.searchcarrer} searchBlog={props.searchBlog} setShowMobileSearchIcon={props.setShowMobileSearchIcon} setShowSideNaveProps={props.setShowSideNave} search={props.search} searchKey={props.searchKey} searchIcon={props.searchIcon}/>
              
                  </div>

              {/* <div style={{ width:"30px"}}>

<i style={{ fontSize: "Large", color: "white", zIndex: "1000",  }}
className={props.ShowSideNave ? "fas fa-times" : "fas fa-bars"} ref={SimgRef} onClick={() => { props.setShowSideNave((prev) => !prev);props.setSearchClick((currentValue)=>!currentValue);props.setShowMobileSearchIcon((currentValue)=>!currentValue)}}>
</i>
</div>
               
                <div className={Styles.ITwalkinWrapper} style={{marginTop:"10px"}}>
                
                        <img className={Styles.MobIwalkinLogologo} src={Itwalkinlogo} />

                </div>
              
                <div className={Styles.linkWrapper}>

                  <NavLink to="/alljobs" className={`${Styles.Moblink} ${Styles.AlllJobs}`} >Buyer Home </NavLink>
                  {props.flashVisible && (
                       <div className={Styles.blast} style={{cursor:"pointer",marginLeft:"21%"}}>
                         <img
                           onClick={reDirecttoDrive}
                           src="/drive.png"
                           alt="Walk-in Drive"
                           style={{zIndex:"999", width: "50px", borderRadius: "5px",marginTop:"-10px" }}
                         />
                       </div>
                     )}
                 

                  <div className={`${Styles.link} ${Styles.MobileIconeWrapper}`}>

                   
                    <img className={`${Styles.Icon} ${Styles.MobJobseekerProfileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                  </div >

                </div>
              </div>
             
              {showprofile ?
                <div className={Styles.Alldownwrapper} >

                  <div className={Styles.MobJobseekerDropdownwrapper} ref={menuRef} >
                    <p className={Styles.text} ref={menuRef} onClick={myprofile}>My profile</p>

                   

                    <p className={Styles.text} ref={menuRef} onClick={MyJobApplied}>Jobs Applied</p>
                    <p className={Styles.text} ref={menuRef} onClick={AskQuestion}>Ask Question</p>

                    <p className={Styles.text} ref={menuRef} onClick={StudlogOut}>Logout</p>

                  </div>
                </div>
                : ""}
                <div ref={SmenuRef} className={`${Styles.MovileNavOptions} `}
                    style={props.ShowSideNave ? { marginLeft: "0px" } : { marginLeft: "-380px" }} >
                   
                  <SidebarNav  jobSeekersearch={props.jobSeekersearch} searchcarrer={props.searchcarrer} searchBlog={props.searchBlog} setShowMobileSearchIcon={props.setShowMobileSearchIcon} setShowSideNaveProps={props.setShowSideNave} search={props.search} searchKey={props.searchKey} searchIcon={props.searchIcon}/>
              
                  </div> */}
            </>

            // ..........................................Emplyee login......Mobile View.................................................              
            :
            (EmployeeAuth) ?
              <>
                <div className={Styles.MobilEmployeeFullnavewrapper}>
                  <div className={Styles.empFullnavewrapperLSMobile}>
                        <div>
                          <div style={{display:"flex"}}> 
                        <i style={{ fontSize: "Large", color: "white", zIndex: "1000",  }}
                       className={props.ShowSideNave ? "fas fa-times" : "fas fa-bars"} ref={SimgRef} onClick={() => { props.setShowSideNave((prev) => !prev);props.setSearchClick((currentValue)=>!currentValue);props.setShowMobileSearchIcon((currentValue)=>!currentValue)}}>
                       </i>
                        <i style={{ visibility:props.showMobileSearchIcon?"visible":"hidden", color: "white", fontSize: "18px", cursor: "pointer",zIndex:"999"}} onClick={() => { props.setShowSideNave((prev) => !prev);props.setSearchClick((currentValue)=>!currentValue);props.setShowMobileSearchIcon((currentValue)=>!currentValue)}} class="searchicon fa fa-search" ></i>
                        </div> 
                        
                  </div>
                  
                  <div style={{display:"flex", alignItems:"center"}}>
                        <div style={{color:"white",marginLeft:"10px",fontWeight:"600", fontSize:"16px"}}>  Get Quote </div>
                      
                    <div>
                    <NavLink to="/PostJobs" className={`${Styles.Moblink} ${Styles.PostJob}`} >Post a Job</NavLink>
                    </div>
                    </div>
                  </div>

                  <div className={Styles.empFullnavewrapperRSMobile}>
                    <div>
                    <img style={{marginLeft:"23px",position:"relative"}} className={`${Styles.Icon} ${Styles.EmpMobileProfileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
                      {showprofile ?
                     <div  className={Styles.EmpMobDropdownwrapperMobile} ref={menuRef} >
                    <p className={Styles.text} ref={menuRef} onClick={EmployeeProfile} >My profile</p>
                    <NavLink to="/postedjobs" className={`${Styles.text} `} > Posted jobs</NavLink>
                    <p className={Styles.text} ref={menuRef} onClick={myposteddrive}>Posted Drives</p>
                    <p className={Styles.text} ref={menuRef} onClick={mypostedArticle}>Posted Articles</p>
                    <p className={Styles.text} ref={menuRef} onClick={PostBlogs}>Write Article</p>
                    <p className={Styles.text} ref={menuRef} onClick={logutEmp}>Logout</p>
                    </div>
                     : ""}
                    </div>
                    <div>
                    {props.flashVisible && (
                       <div className={Styles.blast} style={{cursor:"pointer",marginLeft:"21%"}}>
                         <img
                           onClick={reDirecttoDrive}
                           src="/drive.png"
                           alt="Walk-in Drive"
                           style={{ width: "50px", borderRadius: "5px",marginTop:"-10px" }}
                         />
                       </div>
                     )}
                    </div>
                  </div>
                  
                  </div>
                  <div ref={SmenuRef} className={`${Styles.MovileNavOptions} `}
                    style={props.ShowSideNave ? { marginLeft: "0px" } : { marginLeft: "-380px" }} >
                        
                    <SidebarNav  jobSeekersearch={props.jobSeekersearch} searchcarrer={props.searchcarrer} searchBlog={props.searchBlog}  setShowMobileSearchIcon={props.setShowMobileSearchIcon} setShowSideNaveProps={props.setShowSideNave} searchs={props.searchs} search={props.search} searchKey={props.searchKey} searchIcon={props.searchIcon} ChangeSideNaveBar={ChangeSideNaveBar} />
                       </div>
               
                

              </>
              // ............Admin Login............Mobile View..........
              :
              (adminLogin) ?
                <>
                  <div className={Styles.fullnavewrapper}>
                    {/* <div className={Styles.logoWrapper}> */}
                    {/* <NavLink to="/" > <img className={Styles.Moblogo} src={logo} /> </NavLink> */}
                    <div>
                        <div style={{color:"white",marginLeft:"10px",fontWeight:"600"}}>  Get Quote </div>
                      </div>
                    {/* </div> */}
                    <div className={Styles.linkWrapper}>
                      <NavLink to="/BIAddmin@Profile" className={`${Styles.link} ${Styles.All}`} style={navLinkStyles}>All </NavLink>
                      <NavLink to="/BIAddmin@AllJobs" style={navLinkStyles} className={`${Styles.AllJobs} ${Styles.link}`}>AllJobs </NavLink>
                      <NavLink to="BIAddmin@AllEmployees" className={`${Styles.link} ${Styles.AllEmploy}`} style={navLinkStyles}> Employer</NavLink>
                      <NavLink to="BIAddmin@AllJobSeekers" className={`${Styles.link} ${Styles.AllJobseeker}`} style={navLinkStyles}> Jobseekers</NavLink>

                      <div className={`${Styles.link} ${Styles.IconeWrapper} ${Styles.AdminUser}`}>
                        <img className={`${Styles.Icon} ${Styles.profileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
                      </div >
                    </div>
                  </div>
                  {/* .....................drop down...Mobile View......... */}
                  {showprofile ?
                    <div style={{ marginLeft: "-2%" }} className={Styles.Admindropdownwrapper} ref={menuRef} >
                      {/* <p className={Styles.text} ref={menuRef} >My profile</p> */}
                      {/* <p className={Styles.text} ref={menuRef} >Update profile</p> */}
                      <p className={Styles.text} ref={menuRef} onClick={AdminlogOut}>Logout</p>

                    </div>
                    : ""}
                </>
                // ............................................Home Nave....Mobile View................................................      
                :

                <>

                  <div className={Styles.fullnavewrapperMobile}>
                    <div className={Styles.fullnavewrapperRSMobile}>
                      <div>
                        <div style={{display:"flex"}}>
                         <i style={{ fontSize: "Large", color: "white", zIndex: "1000",  }}
                       className={props.ShowSideNave ? "fas fa-times" : "fas fa-bars"} ref={SimgRef} onClick={() => { props.setShowSideNave((prev) => !prev);props.setSearchClick((currentValue)=>!currentValue);props.setShowMobileSearchIcon((currentValue)=>!currentValue)}}>
                        </i>
                        <i style={{ visibility:props.showMobileSearchIcon?"visible":"hidden", color: "white", fontSize: "18px", cursor: "pointer",zIndex:"999", marginLeft:"6px"}} onClick={() => { props.setShowSideNave((prev) => !prev);props.setSearchClick((currentValue)=>!currentValue);props.setShowMobileSearchIcon((currentValue)=>!currentValue)}} class="searchicon fa fa-search" ></i>
                        </div>
                      </div>
                      <div>
                        {/* <img className={Styles.MobIwalkinLogologo} src={Itwalkinlogo} /> */}
                        <div>
                        <div style={{color:"white",marginLeft:"10px",fontWeight:"600", fontSize:"16px"}}>  Get Quote </div>
                      </div>
                      </div>
                       <div ref={dropdownRef} style={{ position: "relative" }}>
                         <div style={{ display: "flex", marginTop: "11px"}}>
                              <button
                                onClick={() => setIsOpen((prev) => !prev)}
                                style={{background: "none",border: "none",cursor: "pointer",fontSize: "24px",color: "#007bff",}}>
                                <img className={Styles.jobLocationImage} src={location} alt="Location" />
                              </button>
                              <p style={{ marginTop: "17px", fontWeight: "bold", color: "white",width:"113px" }}>
                              {props.selectedlocationOption?.label}
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
                                  {props.options.map((option) => (
                                    <li
                                      key={option.value}
                                      onClick={() => handleSelect(option)}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "10px",
                                        cursor: option.value === "Bangalore" ? "pointer" : "default",
                                        borderRadius: "10px",
                                        color: option.value !== "Bangalore" ? "gray" : "black",
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
                    </div>

                    <div className={Styles.fullnavewrapperLSMobile}>
                      <div>
                          {props.flashVisible && (
                         <div className={Styles.blast} style={{cursor:"pointer"}}>
                          <img onClick={reDirecttoDrive} src="/drive.png" alt="Walk-in Drive" ref={driveImgRef} class={Styles.flashDriveHome}/>
                         </div>
                          )}
                      </div>
                       <div>
                         <img className={`${Styles.MobloginLogo} `} src={logIn} ref={imgRef} onClick={() =>    setShowprofile((prev) => !prev)} />
                         {showprofile ?
                           <div className={Styles.MobHomeDropdownwrapper} ref={menuRef} >
                             <p onClick={() => { navigate("/EmployeeLogin") }}>Buyer Login </p>
                             <p onClick={() => { navigate("/JobSeekerLogin") }}>Seller Login </p>
                           </div>
                           : ""}
                       </div>           
                    </div>
                    
                    
                  </div>                 
                {/* <div style={{ width:"30px"}}>

                    <i style={{ fontSize: "Large", color: "white", zIndex: "1000",  }}
                    className={props.ShowSideNave ? "fas fa-times" : "fas fa-bars"} ref={SimgRef} onClick={() => { props.setShowSideNave((prev) => !prev);props.setSearchClick((currentValue)=>!currentValue);props.setShowMobileSearchIcon((currentValue)=>!currentValue)}}>
                  </i>
                </div>
                                     
                    <div className={Styles.ITwalkinWrapperHomeMobile}>
                      
                        <img className={Styles.MobIwalkinLogologo} src={Itwalkinlogo} />
                       
                         {props.flashVisible && (
                       <div className={Styles.blast} style={{cursor:"pointer", marginLeft:"69%" }}>
                         <img
                           onClick={reDirecttoDrive}
                           src="/drive.png"
                           alt="Walk-in Drive"
                           ref={driveImgRef}
                           class={Styles.flashDriveHome}
                          
                         />
                       </div>
                     )}
                       
                    </div>

                   
                    <div className={Styles.MobileLoginIconWrapper}>

                      <img className={`${Styles.MobloginLogo} `} src={logIn} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
                      {showprofile ?
                        <div className={Styles.MobHomeDropdownwrapper} ref={menuRef} >
                          <p onClick={() => { navigate("/EmployeeLogin") }}>Seller Login </p>
                          <p onClick={() => { navigate("/JobSeekerLogin") }}>Buyer Login</p>
                        </div>
                        : ""}
                    </div>
                  </div> */}
                  {/* {ShowSideNave? */}
                  <div ref={SmenuRef} className={`${Styles.MovileNavOptions} `}
                    style={props.ShowSideNave ? { marginLeft: "0px" } : { marginLeft: "-380px" }} >
                    <SidebarNav empSearchNoLogin={props.empSearchNoLogin} jobSeekersearch={props.jobSeekersearch} searchcarrer={props.searchcarrer} searchBlog={props.searchBlog} setSearchClick={props.setSearchClick} setShowMobileSearchIcon={props.setShowMobileSearchIcon} setShowSideNaveProps={props.setShowSideNave} search={props.search} searchKey={props.searchKey} searchIcon={props.searchIcon}/>
                  </div>
                  {/* {props.flashVisible && (
                       <div className={Styles.blast} style={{cursor:"pointer", marginLeft:"69%" }}>
                         <img
                           onClick={reDirecttoDrive}
                           src="/drive.png"
                           alt="Walk-in Drive"
                           ref={driveImgRef}
                           class={Styles.flashDriveHome}
                          
                         />
                       </div>
                     )} */}
                </>
      }

    </>

  )
}
export default Nav;