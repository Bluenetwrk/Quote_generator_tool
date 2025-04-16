import React, { useEffect, useRef, useState } from 'react';
import styles from "./SudentUpdateProfile.module.css"
import Style  from "../Jobs/Allobs.module.css"
import STyles from "../Login/login.module.css"
import { useGoogleLogin } from '@react-oauth/google';
import validator from "validator";

import imageCompression from 'browser-image-compression';
import axios from 'axios';
import logo from "../img/Blue.jpg"
import { Navigate, useNavigate } from 'react-router-dom';
import profileDp from "../img/user_3177440.png"
import delet from "../img/icons8-delete-48.png"
import { TailSpin } from "react-loader-spinner"
import useScreenSize from '../SizeHook';
import socketIO from 'socket.io-client';
import CreatableSelect  from "react-select/creatable"
import Arrowimage from '../img/icons8-arrow-left-48.png'
import Footer from '../Footer/Footer';
import GoogleImage from "../img/icons8-google-48.png"


import {jobTags} from '../Tags'

function StudentUpdateProfile(props) {
  useEffect(() => {
    const socket = socketIO.connect(props.url, {
      auth: {
        token: JSON.parse(localStorage.getItem("StudId"))
      }
    });
  }, [])

  let colleges=[
    {value:'Others', label: 'Others'},
    {value:'Indian Institute Of Technology, Kharagpur', label: 'Indian Institute Of Technology, Kharagpur'},
    {value:'Indian Institute Of Engineering Science And Technology, Shibpur', label:'Indian Institute Of Engineering Science And Technology, Shibpur' },
    {value:'National Institute Of Technology, Durgapur', label:'National Institute Of Technology, Durgapur' },
    {value:'Institute Of Engineering & Management', label:'Institute Of Engineering & Management' },
    {value:'Bengal Institute Of Technology', label:'Bengal Institute Of Technology' },
    {value:'Indian Institute Of Technology, Roorkee', label:'Indian Institute Of Technology, Roorkee' },
    {value:'Adhiyamaan College Of Engineering & Technology', label:'Adhiyamaan College Of Engineering & Technology' }, 
    {value:'Anand Institute Of Higher Technology', label:'Anand Institute Of Higher Technology' }, 
    {value:'Indian Institute Of Technology, Kanpur', label:'Indian Institute Of Technology, Kanpur' },
    {value:'Indian Institute Of Technology Banaras Hindu University, Varanasi', label:'Indian Institute Of Technology Banaras Hindu University, Varanasi' },
    {value:'Motilal Nehru National Institute Of Technology', label:'Motilal Nehru National Institute Of Technology' },
    {value:'Noida Institute Of Engineering & Technology', label:'Noida Institute Of Engineering & Technology' },
    {value:'National Institute Of Technology, Agartala', label:'National Institute Of Technology, Agartala' }, 
    {value:'Indian Institute Of Technology, Hyderabad', label:'Indian Institute Of Technology, Hyderabad' }, 
    {value:'National Institute Of Technology, Warangal', label:'National Institute Of Technology, Warangal' }, 
    {value:'Chaitanya Bharathi Institute Of Technology', label:'Chaitanya Bharathi Institute Of Technology' }, 
    {value:'Indian Institute Of Technology, Madras', label:'Indian Institute Of Technology, Madras' }, 
    {value:'National Institute Of Technology, Tiruchirappalli', label:'National Institute Of Technology, Tiruchirappalli' }, 
    {value:'Psg College Of Technology-Coimbatore', label:'Psg College Of Technology-Coimbatore' }, 
    {value:'Thiagarajar College Of Engineering-Madurai', label:'Thiagarajar College Of Engineering-Madurai' }, 
    {value:'Coimbatore Institute Of Technology', label:'Coimbatore Institute Of Technology' }, 
    {value:'Kongu Engineering College', label:'Kongu Engineering College' }, 
    {value:'sona College Of Technology-Salem', label:'sona College Of Technology-Salem' }, 
    {value:'Amrita Viswa Vidyapeetham-Amrita Nagar  ,Ettimadai', label:'Amrita Viswa Vidyapeetham-Amrita Nagar ,Ettimadai' },  
    {value:'Kumaraguru College Of Technology-Coimbatore', label:'Kumaraguru College Of Technology-Coimbatore' },  
    {value:'Bannari Amman Institute Of Technology-Sathyamangalam', label:'Bannari Amman Institute Of Technology-Sathyamangalam' },  
    {value:'Indian Institute Of Information Technology, Design & Manufacturing (IIITD&M) Kancheepuram-Chennai', label:'Indian Institute Of Information Technology, Design & Manufacturing (IIITD&M) Kancheepuram-Chennai' },  
    {value:'Sri Ramakrishna Engineering College-Coimbatore', label:'Sri Ramakrishna Engineering College-Coimbatore' }, 
    {value:'Indian Institute Of Technology, Jodhpur', label:'Indian Institute Of Technology, Jodhpur' }, 
    {value:'alaviya National Institute Of Technology, Jaipur', label:'alaviya National Institute Of Technology, Jaipur' }, 
    {value:'College Of Technology And Engineering-Udaipur', label:'College Of Technology And Engineering-Udaipur' }, 
    {value:'Indian Institute Of Technology, Ropar', label:'Indian Institute Of Technology, Ropar' }, 
    {value:'Thapar University-Patiala', label:'Thapar University-Patiala' }, 
    {value:'Dr. B R Ambedkar National Institute Of Technology, Jalandhar', label:'Dr. B R Ambedkar National Institute Of Technology, Jalandhar' }, 
    {value:'Indian Institute Of Science Education & Research, Mohali', label:'Indian Institute Of Science Education & Research, Mohali' }, 
    {value:'Sant Longowal Institute Of Engineering & Technology-Sangrur', label:'Sant Longowal Institute Of Engineering & Technology-Sangrur' }, 
    {value:'Pondicherry Engineering College', label:'Pondicherry Engineering College' }, 
    {value:'National Institute Of Technology, Rourkela', label:'National Institute Of Technology, Rourkela' }, 
    {value:'Indian Institute Of Technology, Bhubaneswar', label:'Indian Institute Of Technology, Bhubaneswar' }, 
    {value:'Kalinga Institue Of Industrial Technology', label:'Kalinga Institue Of Industrial Technology' }, 
    {value:'National Institute Of Science & Technology-Berhampur', label:'National Institute Of Science & Technology-Berhampur' }, 
    {value:'C.V.Raman College Of Engineering-Bhubaneswar', label:'C.V.Raman College Of Engineering-Bhubaneswar' }, 
    {value:'Centurion Institute Of Technology', label:'Centurion Institute Of Technology' }, 
    {value:'National Institute Of Technology, Meghalaya', label:'National Institute Of Technology, Meghalaya' }, 
    {value:'Indian Institute Of Technology, Bombay', label:'Indian Institute Of Technology, Bombay' }, 
    {value:'Visvesvaraya National Institute Of Technology, Nagpur ', label:'Visvesvaraya National Institute Of Technology, Nagpur ' }, 
    {value:'Bharati Vidyapeeth Deemed University College Of Engineering-Pune', label:'Bharati Vidyapeeth Deemed University College Of Engineering-Pune' }, 
    {value:'Vishwakarma Institute Of Technology-Pune', label:'Vishwakarma Institute Of Technology-Pune' }, 
    {value:'University Institute Of Chemical Technology, North Maharashtra University, Jalgaon', label:'University Institute Of Chemical Technology, North Maharashtra University, Jalgaon' }, 
    {value:'Kasegaon Education Societys Rajarambapu Institute Of Technology-Islampur', label:'Kasegaon Education Societys Rajarambapu Institute Of Technology-Islampur' }, 
    {value:'Veermata Jijabai Technological Institute', label:'Veermata Jijabai Technological Institute' }, 
    {value:'K. K. Wagh Institute Of Engineering Education & Research-Nashik', label:'K. K. Wagh Institute Of Engineering Education & Research-Nashik' }, 
    {value:'Shri Ramdeobaba College Of Engineering And Management, Ramdeo Tekdi, Gittikhadan, Nagpur', label:'Shri Ramdeobaba College Of Engineering And Management, Ramdeo Tekdi, Gittikhadan, Nagpur' }, 
    {value:'Shri Guru Gobind Singhji Institute Of Engineering And Technology-Nanded', label:'Shri Guru Gobind Singhji Institute Of Engineering And Technology-Nanded' }, 
    {value:'Yeshwantrao Chavan College Of Engineering-Nagpur', label:'Yeshwantrao Chavan College Of Engineering-Nagpur' }, 
    {value:'Maharashtra Academy Of Engineering And Educational Research, Mit College Of Engineering, Pune', label:'Maharashtra Academy Of Engineering And Educational Research, Mit College Of Engineering, Pune' }, 
    {value:'Government College Of Engineering, Aurangabad ', label:'Government College Of Engineering, Aurangabad ' }, 
    {value:'Indian Institute Of Technology, Indore', label:'Indian Institute Of Technology, Indore' }, 
    {value:'Itm University School Of Engineering & Technology-Gwalior', label:'Itm University School Of Engineering & Technology-Gwalior' }, 
    {value:'Pandit Dwarka Prasad Mishra Indian Institute Of Information Technology, Jabalpur', label:'Pandit Dwarka Prasad Mishra Indian Institute Of Information Technology, Jabalpur' }, 
    {value:'Amrita School Of Engineering', label:'Amrita School Of Engineering' }, 
    {value:'National Institute Of Technology, Calicut', label:'National Institute Of Technology, Calicut' }, 
    {value:'Cochin University Of Science And Technology-Cochin ', label:'Cochin University Of Science And Technology-Cochin ' }, 
    {value:'National Institute Of Technology, Karnataka', label:'National Institute Of Technology, Karnataka' }, 
    {value:'M. S. Ramaiah Institute Of Technology-Bangalore', label:'M. S. Ramaiah Institute Of Technology-Bangalore' }, 
    {value:'R.V. College Of Engineering-Bengaluru', label:'R.V. College Of Engineering-Bengaluru' }, 
    {value:'Manipal Institute Of Technology', label:'Manipal Institute Of Technology' }, 
    {value:'Siddaganga Institute Of Technology-Tumkur', label:'Siddaganga Institute Of Technology-Tumkur' }, 
    {value:'The National Institute Of Engineering', label:'The National Institute Of Engineering' }, 
    {value:'Birla Institute Of Technology', label:'Birla Institute Of Technology' }, 
    {value:'National Institute Of Technology, Jamshedpur', label:'National Institute Of Technology, Jamshedpur' }, 
    {value:'National Institute Of Technology, Srinagar', label:'National Institute Of Technology, Srinagar' }, 
    {value:'Indian Institute Of Technology, Mandi', label:'Indian Institute Of Technology, Mandi' }, 
    {value:'National Institute Of Technology, Hamirpur', label:'National Institute Of Technology, Hamirpur' }, 
    {value:'National Institute Of Technology, Kurukshetra', label:'National Institute Of Technology, Kurukshetra' }, 
    {value:'Indian Institute Of Technology, Gandhinagar', label:'Indian Institute Of Technology, Gandhinagar' }, 
    {value:'Sardar Vallabhbhai National Institute Of Technology', label:'Sardar Vallabhbhai National Institute Of Technology' }, 
    {value:'National Institute Of Technology, Goa', label:'National Institute Of Technology, Goa' }, 
    {value:'Indian Institute Of Technology, Delhi', label:'Indian Institute Of Technology, Delhi' }, 
    {value:'Jamia Millia Islamia A Central University', label:'Jamia Millia Islamia A Central University' }, 
    {value:'National Institute Of Technology, Delhi', label:'National Institute Of Technology, Delhi' }, 
    {value:'National Institute Of Technology, Raipur', label:'National Institute Of Technology, Raipur' }, 
    {value:'Pec University Of Technology - Chandigar', label:'Pec University Of Technology - Chandigar' }, 
    {value:'University Institute Of Chemical Engineering And Technology', label:'University Institute Of Chemical Engineering And Technology' }, 
    {value:'Indian Institute Of Technology, Patna', label:'Indian Institute Of Technology, Patna' }, 
    {value:'National Institute Of Technology, Patna', label:'National Institute Of Technology, Patna' }, 
    {value:'Indian Institute Of Technology, North Guwahati', label:'Indian Institute Of Technology, North Guwahati' }, 
    {value:'National Institute Of Technology, Silchar', label:'National Institute Of Technology, Silchar' }, 
    {value:'Sagi Ramakrishnam Raju Engineering College-Bhimavaram', label:'Sagi Ramakrishnam Raju Engineering College-Bhimavaram' }, 
     ]

     const [file, setFile] = useState()
     const [uploaded, setUploaded] = useState()
     const screenSize = useScreenSize();
     const [image, setimage] = useState()
     const [immage, setimmage] = useState()
     const [name, setname] = useState("")
     const [email, setemail] = useState("")
     const [phoneNumber, setphoneNumber] = useState("")
     const [Aadhar, setAadhar] = useState("")
     const [panCard, setpanCard] = useState("")
     const [NoticePeriod, setNoticePeriod] = useState("")
     const [ExpectedSalary, setExpectedSalary] = useState("")
     const [currentCTC, setcurrentCTC] = useState("")
     const [age, setage] = useState("")
     const [Qualification, setQualification] = useState("")
     const [Experiance, setExperiance] = useState("")
     const [loader, setLoader] = useState(false)
     const [Tags, setTag] = useState([])
     const [college, setcollege] = useState([])
     const [Resulttag, setResulttagTag] = useState()
     const [Skills, setSkills] = useState([])
       const [emailError, setEmailError] = useState("");
     

       const [ipAddress, setIPAddress] = useState('')
           const [gmailuser, setGmailuser] = useState("")
         
         
           useEffect(() => {
             fetch('https://api.ipify.org?format=json')
               .then(response => response.json())
               .then(data => setIPAddress(data.ip))
               .catch(error => console.log(error))
           }, []);


     const login= useGoogleLogin({
      onSuccess: async (response) => {
        try {
  
          const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${response.access_token}`,
              },
            }
          );
          setGmailuser(res.data)
          let gtoken = response.access_token
          let userId = res.data.sub
          let email = res.data.email
          let name = res.data.name
          let isApproved = false
          // let image= res.data.picture
  
          // console.log("decoded name :", gemail)
          // console.log(" decoded id :", gname)
  
          await axios.post("/StudentProfile/Glogin", {
             ipAddress, userId, email, name, gtoken, isApproved, phoneNumber, Aadhar, panCard, city, NoticePeriod, 
             ExpectedSalary, currentCTC, age, Qualification, Skills, Experiance, Tags, college})
            .then((response) => {
              let result = response.data
              let token = result.token
              let GuserId = result.id
              // console.log(result)
              if (result.action == "registered") {
              alert("Registered Successfully")
              }else if(result.action == "login"){
                alert("Primary email id is already registered please try different email id")

              }
            }).catch((err) => {
              alert("server issue occured")
            })
  
        } catch (err) {
          alert("some thing went wrong with google gmail", err)
        }
      }
    })




    function handleTags(key){
      // setTag(tag)   
      const isIndex=Tags.findIndex((present)=>{
        return(
          present===key
        )
            })
            if(isIndex<0){
                setTag([...Tags, key])
      setSkills((prev)=>prev ? prev + ", " + key : key)

            }else{
              const IndexId=Tags.filter((present)=>{
                return(
                  present!==key
                )
                    })
                    setTag(IndexId)

                      let str=IndexId.toString().split(",").join(", ")
                      // setSkills(str)
}  
  }  
    function handleCollege(tag){
      setcollege(tag)    
      setOthers("")  
  }  
    const [city, setcity] = useState([])

    const CTags=[{value:'Bangalore', label: 'Bangalore'},{value:'Chennai', label:'Chennai' },
      {value:'Hyderabad', label: 'Hyderabad'}, {value:'Delhi', label: 'Delhi'},{value:'Mumbai', label: 'Mumbai' }]
    
      function handleChangeCityTag(tag){
      setcity(tag)   
  }    

  let navigate = useNavigate()

  let studId = JSON.parse(localStorage.getItem("StudId"))

  const [topMessage, settopMessage] = useState("")
  const [stuId, setstuId] = useState()

 
  // ...............upload Image.....................
  async function uploadImage() {
    const formdata = new FormData()
    formdata.append('image', image)

    // console.log(formdata)
    await axios.put(`/StudentProfile/uploadImage/${studId}`, formdata)
      .then((res) => {
        window.location.reload()
      }).catch((err) => {
      })
  }

  function NoEmailAlert(){
    alert("primary email field must be filled")
}

function InvalidEmailAlert(){
alert("Invalid Primary email id")
}


  async function saveUpdate(e) {
    let userid = JSON.parse(localStorage.getItem("StudId"))
    const headers = { authorization: userid + " " + atob(JSON.parse(localStorage.getItem("StudLog"))) };
    // e.preventDefault()
    await axios.post(`/StudentProfile/JobseekerRegister`, {
      name, email, phoneNumber, Aadhar, panCard, city, NoticePeriod, 
      ExpectedSalary, currentCTC, age, Qualification, Skills, Experiance, Tags, college
    }, { headers })
      .then(async (res) => {
        let result = res.data
        console.log(result)
        if (result == "success") {
          settopMessage("Success! Profile Registered successfully")
        } else if (result == "feilds are missing") {
          settopMessage("Alert!..name, emailAddress, NoticePeriod, phoneNumber, Qualification, Skills and Experiance should not be empty")
        }else if(result===11000){
          alert("this mail is already registered")
        }

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });


      }).catch((err) => {
        alert("some thing went wrong")
      })
  }
  async function prevewImage(e) {
    setimmage("")
    setLoader(true)
    setFile(URL.createObjectURL(e.target.files[0]))
    // setimage(e.target.files[0])
    const imageFile = e.target.files[0];
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setimage(compressedFile)
      setLoader(false)

    } catch (error) {
    }
  }
  async function deletePic() {
    await axios.put(`/StudentProfile/deleteImage/${studId}`, { image })
      .then((res) => {
        window.location.reload()
      }).catch((err) => {
        alert("server issue occured")
      })
  }

const [showdelete, setShowdelete]=useState(false)

async function DeleteProfile(){
  let confirm = window.confirm("are you sure to delete your Account? your account will be deleted permanently, click on 'Ok', if you wish delete your Account permanently ")
if(confirm){
  await axios.delete(`/StudentProfile/deleteJobSeeker/${stuId }`)
  .then((res)=>{
    if(res.data==="success"){
    alert("Account deleted successfully ")
    navigate("/")
    localStorage.clear()
    }else{
    alert("some thing went wrong try again")

    }
  }).catch((err)=>{
    alert("some thing went wrong try again ")
  })  
}
  }

  function handleAge(e){
    if (e.target.value.length>2){
      return false
  }else{
  setage(e.target.value)
  }
  }

  function handlePhoneNumber(e){
    if (e.target.value.length>10){
      return false
  }else{
  setphoneNumber(e.target.value)
  }
  }
  function handlesetemail(email){
      // const email = event.target.value;
      const sanitizedValue = email.replace(/[^\w\s.@]|_/g, ''); // Regex to remove special characters
      setemail(sanitizedValue);
  
      if (validator.isEmail(email)) {
        setEmailError("");
    } else {
        setEmailError("Enter valid Email!");
    }
     }

  const AadharhandleChange = (event) => {
    if (event.target.value.length>12){
      return false
  }else{
   
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
    setAadhar(sanitizedValue);
  }
  };

  const PanCardhandleChange = (event) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
    setpanCard(sanitizedValue);
  };
  function handleNoticePeriod(e){
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
    setNoticePeriod(sanitizedValue);
  }
  function handleexpectedSalary(e){
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
    setExpectedSalary(sanitizedValue);
  }

  function handleCurrentCTC(e){
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
    setcurrentCTC(sanitizedValue);
  }
  function handleQualification(e){
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^\w\s.]/gi, ''); // Regex to remove special characters
    setQualification(sanitizedValue);
  }
  function handleExperiance(e){
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
    setExperiance(sanitizedValue);
  }

  const [Others, setOthers]=useState("");
  const handleOthersCollege = (e) => {
    setOthers(e.target.value);
    // console.log(e.target.value)
  };
  const [employers, setEmployers] = useState([]); 

  const addEmployer = () => {
    if (employers.length < 3) {
      setEmployers([...employers, ""]);
    }
  };

  const removeEmployer = (index) => {
    const updatedEmployers = [...employers];
    updatedEmployers.splice(index, 1);
    setEmployers(updatedEmployers);
  };

  const handleEmployerChange = (index, value) => {
    const updatedEmployers = [...employers];
    updatedEmployers[index] = value;
    setEmployers(updatedEmployers);
    // console.log(employers)
  };

const[helpClicked, setHelpClicked]=useState(false)
 let helpRef=useRef();
  let helpBtnRef=useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== helpRef.current && e.target !== helpBtnRef.current) {
      setHelpClicked(false)
    }
  })



const helpData = [
  { 
    id: 1, 
    question: "How to Register as an Employer?", 
    source: "ITWalkin", 
    companyName: "ITWalkin", 
    postedby: "ITWalkin", 
    postedDate: "20-03-2025", 
    view: "View",
    details: "1. To register as an employer, follow these steps:\n2. Click on the 'Open an Account' menu in the navigation bar.\n3. A submenu will appear—select 'Employer Registration' from the list.\n4. The Employer Registration Form will open in a new window.\n5. Fill in all the required details in the given fields.\n6. Choose to register using either Microsoft or Google.\n7. Once completed, your registration will be successful."
},
{ 
  id: 2, 
  question: "How to Register as a Jobseeker?", 
  source: "ITWalkin", 
  companyName: "ITWalkin", 
  postedby: "ITWalkin", 
  postedDate: "20-03-2025", 
  view: "View",
  details: "1. To register as a Jobseeker, follow these steps:\n2. Click on the 'Open an Account' menu in the navigation bar.\n3. A submenu will appear—select 'Jobseeker Registration' from the list.\n4. The jobseeker Registration Form will open in a new window.\n5. Fill in all the required details in the given fields.\n6. Choose to register using either Microsoft or Google.\n7. Once completed, your registration will be successful."
},
   ];

   const [selectedCountry, setSelectedCountry] = useState("");
  
  const countries = ["India", "USA", "Singapore", "Australia", "UK"];

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    console.log("selected value",selectedCountry)
  };


  return (
    <>

      {/* <div className={styles.EntireFullWrapperStd} >
        <div className={styles.EntireWrapperStd}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
             <button class={styles.empRegBackButton} style={{cursor:"pointer",height:"40px"}} 
             onClick={()=>{navigate(-1)}}>Back</button>
             <h1 style={{marginRight:"200px"}}>New Jobseeker Registration Form</h1>
         </div> */}

          {/* <h3 style={{ color: "rgb(40, 4, 99)", marginLeft: "2%" }}>Update your Profile</h3> */}
          {/* <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} />
          <div className={styles.imageViewWrapper}>

            <img className={styles.imageView} src={image ? image : profileDp} />
            <img className={styles.fileView} src={file} />
            <div style={{position:"absolute", marginLeft:"50%", marginTop:"40px"}}>
              <input type='checkbox' onClick={()=>{setShowdelete(prev=>!prev)}} />
             <span>delete Profile</span><br></br>
             {showdelete?
<button className={{}} style={{backgroundColor:"red", color:"white", 
border:"none",padding: "4px 8px"}} onClick={DeleteProfile}>Delete</button>
:""
             }


              </div>

            <div className={styles.addfileDiconwrapper}>
              <input className={`${styles.addfile} ${styles.addfileD}`} type="file" accept='.png, .jpg, .jpeg' onChange={prevewImage} />
              <div className={styles.loader}> {loader ? <TailSpin height={"40px"} /> : ""} </div>

            </div>
          </div> */}

          {/* <div className={styles.saveDelete}>
            {file && !loader ? <button className={styles.saveImage} onClick={uploadImage}>Save</button> : ""}
            {immage ? <button className={styles.DeleteImage} onClick={deletePic}>Delete</button> : ""}
          </div> */}

          {/* <p style={{ fontStyle: "italic", color: "green" }}>{topMessage}</p> */}
          {screenSize.width > 850 ?
<>
   <div className={styles.EntireFullWrapperStd} >
     <div className={styles.EntireWrapperStd} style={{height:"100%"}}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
             <button class={styles.empRegBackButton} style={{cursor:"pointer",height:"40px"}} 
             onClick={()=>{navigate(-1)}}>Back</button>
             <h1 >New Jobseeker Registration Form</h1>
             <div>
             <button ref={helpBtnRef} class={styles.empRegBackButton} style={{cursor:"pointer",height:"40px",marginRight:"10px"}} 
             onClick={()=>setHelpClicked((prev)=>!prev)}>Help</button>
    
             {helpClicked &&(
              <div className={styles.jobseekerHelpDropDown} ref={helpRef}>
                <p onClick={()=>{navigate(`/support/help/${btoa(2)}`, { state: { helpItem: helpData[1] } });setHelpClicked(false)}}>How to create a new Account</p>
                <p onClick={()=>{navigate("/support/help");setHelpClicked(false)}}>More help topics</p>
              </div>
             )
            }
            </div>
         </div>
         <p style={{ fontStyle: "italic", color: "green" }}>{topMessage}</p>
         <div className={styles.inputWrapper}>
              <label className={styles.inputName}>
                <h4>Name:</h4>
                <input maxLength="22" className={styles.input} value={name}  onChange={(e) => { setname(e.target.value) }} type="text" />
              </label>

              <label className={styles.inputName}>
                <h4>Email Address:</h4>
                <input placeholder='Enter gmail address' maxLength="30" className={styles.input} value={email}  
                onChange={(e) => { handlesetemail(e.target.value) }} type="text" />
                <br></br> <span style={{color:"red", marginLeft:"5%"}}>{emailError}</span>           
             
              </label>
              <label className={styles.inputName}>
                <h4>City: 
                  {/* <span style={{color:"blue"}}>{city}</span> */}
                </h4>
                {/* <input maxLength="15" className={styles.input} value={city} onChange={(e) => { setCity(e.target.value) }} type="text" /> */}
                <div style={{marginTop:"-7px", width:"81%", marginLeft:"18px"}}>
                           <CreatableSelect  
                  // isMulti={true}
                          options={CTags}
                          value={city}
                          onChange={handleChangeCityTag}     
                        />
                         </div>
            
              </label>

              <label className={styles.inputName}>
                <h4>Country:</h4>
                <select className={styles.input} style={{height:"34px"}}  value={selectedCountry} onChange={handleCountryChange}>
                <option value="" >Select a country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>

             </label>

              <label className={styles.inputName}>
                <h4>Age:</h4>
                <input maxLength="3" className={styles.input} value={age} onChange={(e) => { handleAge(e) }} type="number" />
              </label>

              <label className={styles.inputName}>
                <h4>Phone number:</h4>
                <input maxLength="15" className={styles.input} value={phoneNumber} onChange={(e) => { handlePhoneNumber(e) }} type="number" />
              </label>

              <label className={styles.inputName}>
                <h4>Aadhaar number: &nbsp;<span className={styles.hint}>(Optional)</span></h4>
                <input maxLength="12" className={styles.input} value={Aadhar} onChange={(e) => { AadharhandleChange(e) }} type="number" />
              </label>

              <label className={styles.inputName}>
                <h4>Pan Card Number: &nbsp;<span className={styles.hint}>(Optional)</span></h4>
                <input maxLength="10" className={styles.input} value={panCard} onChange={(e) => { PanCardhandleChange(e) }} type="text" />
              </label>

              <label className={styles.inputName}>
                <h4>Notice Period in days: </h4>
                <input maxLength="6" className={styles.input} value={NoticePeriod} onChange={(e) => { handleNoticePeriod(e) }} type="text" />
              </label>

              <label className={styles.inputName}>
                <h4>Expected Salary: &nbsp;<span className={styles.hint}>(e.g 5L or 10L)</span></h4>
                <input maxLength="3" className={styles.input} value={ExpectedSalary} onChange={(e) => { handleexpectedSalary(e)}} type="text" />
              </label>

              <label className={styles.inputName}>
                <h4>Current CTC: &nbsp;<span className={styles.hint}>(e.g 5L or 10L)</span></h4>
                <input maxLength="3" className={styles.input} value={currentCTC} onChange={(e) => {handleCurrentCTC(e)}} type="text" />
              </label>

              <label className={styles.inputName}>
                <h4>Qualification:</h4>
                <input maxLength="6" className={styles.input} value={Qualification} onChange={(e) => {handleQualification(e) }} type="text" />
              </label>
            
              <label className={styles.inputName}>
                <h4>Experience: &nbsp;<span className={styles.hint}>(e.g 3Y or 10Y)</span></h4>
                <input maxLength="3" className={styles.input} value={Experiance} onChange={(e) => { handleExperiance(e) }} type="text" />
              </label>
              <label className={styles.inputName}>
                <h4>College:</h4>
                <div style={{marginTop:"-7px", width:"81%", marginLeft:"18px"}}>
                <CreatableSelect  
                  options={colleges}
                  value={college}
                  onChange={handleCollege}   
                />
                </div>
              </label>

            {college.value==="Others" &&(
               <label className={styles.inputName} style={{marginTop:"-7px", width:"81%", marginLeft:"18px"}}>
               <h4 style={{marginLeft:"64%"}}>Others: &nbsp;<span className={styles.hint} >(Enter College name)</span></h4>
               <input className={styles.input}  style={{width:"48%", marginLeft:"64%"}}  value={Others} onChange={handleOthersCollege}  type="text" />
             </label>

            )}

              <div style={{display:"flex"}}>
              <label className={styles.inputName}>
                <h4>Skill Tags: </h4>
                {/* <div style={{marginTop:"-7px", width:"81%", marginLeft:"18px"}}>
                   <CreatableSelect  
                  isMulti={true}
                  options={jobTags}
                  value={Tags}
                  onChange={handleChange}   
                />
                         </div> */}
              <div className={Style.JobtitleFilterWrapper} style={{height:"120px",marginBottom:"15px"}}>
            {/* <buton className={ Active.length===0? Style.active:Style.JobtitleFilter} onClick={() => { getjobs() }}>All</buton> */}
            {
              jobTags.map((tags, i) => {
                return (
                                   
                  <button disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                    className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                    Style.TagHeading: 
                    //  Active === tags.value ? 
                    Tags.findIndex(  (present)=>{
                      return(
                        present===tags.value
                      )
                          }) >=0?
                     Style.active : Style.JobtitleFilter} 
                     onClick={ () => {  handleTags(tags.value) }}
                     >{tags.value} </button>
                
                  )
              })
            }
          </div>


              </label>

              <div style={{marginLeft:"15px",width:"328px"}}>

              {/* <label className={styles.inputName}>
                <h4>College:</h4>
                <div style={{marginTop:"-7px", width:"81%", marginLeft:"18px"}}>
                <CreatableSelect  
                  options={colleges}
                  value={college}
                  onChange={handleCollege}   
                />
                </div>
              </label>

            {college.value==="Others" &&(
               <label className={styles.inputName} style={{marginTop:"-7px", width:"81%", marginLeft:"18px"}}>
               <h4>Others: &nbsp;<span className={styles.hint}>(Enter College name)</span></h4>
               <input className={styles.input} value={Others} onChange={handleOthersCollege}  type="text" />
             </label>

            )} */}

   <div style={{ maxWidth: "400px", margin: "auto", padding: "10px",marginleft:"10px" }}>
      <div style={{display:"flex",gap:"16px"}}>
      <h2 style={{ fontSize: "13px", marginBottom: "10px",marginTop:"15px",marginLeft:"10px" }}>Previous Employers</h2>
      {employers.length < 3 && (
        <button
          onClick={addEmployer}
          style={{
            marginTop: "10px",
            backgroundColor: "rgb(40,4,99)",
            color: "white",
            border: "none",
            padding: "6px 10px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px"
          }}
        >
          +
        </button>
      )}
      </div>

      {employers.map((employer, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <input
            type="text"
            placeholder={`Employer ${index + 1}`}
            value={employer}
            onChange={(e) => handleEmployerChange(index, e.target.value)}
            style={{ flex: "1", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <button
            onClick={() => removeEmployer(index)}
            style={{
              background: "red",
              color: "#fff",
              border: "none",
              padding: "6px 10px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            -
          </button>
        </div>
      ))}
    </div>



        <div className={STyles.signUpWrapper} style={{marginLeft:"17px", marginBottom:"20px"}} 
              onClick={!email? NoEmailAlert : emailError? InvalidEmailAlert :login}>
          <div className={STyles.both}>
            <img className={STyles.google} src={GoogleImage} />
            <p className={STyles.signUpwrap} >Register with Google</p>
          </div>
          </div>

            
            </div>

            

            </div>
              {/* <div style={{display:"flex", marginLeft:"50%", marginTop:"-50px"}}> */}

              {/* <div className={STyles.signUpWrapper} style={{marginLeft:"50px", marginBottom:"20px"}} onClick={saveUpdate}>
          <div className={STyles.both}>
            <img className={STyles.google} src={GoogleImage} />
            <p className={STyles.signUpwrap} >Register with Google</p>
          </div>
        </div> */}

              {/* <div className={STyles.signUpWrapper} style={{marginLeft:"50px", marginBottom:"20px"}} 
              onClick={!email? NoEmailAlert : emailError? InvalidEmailAlert :login}>
          <div className={STyles.both}>
            <img className={STyles.google} src={GoogleImage} />
            <p className={STyles.signUpwrap} >Register with Google</p>
          </div>
        </div> */}

              {/* <button className={styles.Save} onClick={(e) => { saveUpdate(e) }}>Save</button> */}
              {/* <button className={styles.cancel} onClick={() => { navigate(-1) }} >cancel</button> */}
             
              {/* </div> */}
            </div>   


      </div>
    </div>  

      
           


             
        </>
            :
            <>
              <div className={styles.EntireFullWrapperStd} >
              <div className={styles.EntireWrapperStd} style={{height:"100%",marginLeft:"7px",width:"95%"}}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
             <button class={styles.empRegBackButton} style={{cursor:"pointer",height:"40px",width:"70px"}} 
             onClick={()=>{navigate(-1)}}>Back</button>
             <button ref={helpBtnRef} class={styles.empRegBackButton} style={{cursor:"pointer",height:"40px",marginRight:"10px"}} 
             onClick={()=>setHelpClicked((prev)=>!prev)}>Help</button>
    
             {helpClicked &&(
              <div className={styles.dropdownwrapperHomeRegistrationMob} ref={helpRef}>
                <p onClick={()=>{navigate(`/support/help/${btoa(2)}`, { state: { helpItem: helpData[1] } });setHelpClicked(false)}}>How to create a new Account</p>
                <p onClick={()=>{navigate("/support/help");setHelpClicked(false)}}>More help topics</p>
              </div>
             )
            }
           </div>
         <h1 style={{marginRight:"0px",fontSize:"21px",marginLeft:"10px"}}>New Jobseeker Registration Form</h1>
 
         <p style={{ fontStyle: "italic", color: "green" }}>{topMessage}</p>
<label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Name:</h4>
                <input maxLength="20" className={styles.Mobileinput} disabled value={name} onChange={(e) => { setname(e.target.value) }} type="text" />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Email Address:</h4>
                <input maxLength="25" className={styles.Mobileinput}  value={email}
                 onChange={(e) => { handlesetemail(e.target.value) }} type="text" />
                 <br></br> <span style={{color:"red", marginLeft:"5%"}}>{emailError}</span>           
              </label>

              <label className={styles.MobileinputName}>
                <h4>City: </h4>
                <div style={{ width:"88%", marginLeft:"10px"}}>

                <CreatableSelect  
                  // isMulti={true}
                          options={CTags}
                          value={city}
                          onChange={handleChangeCityTag}     
                        />
                        </div>
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Country: </h4>
                <select className={styles.Mobileinput} value={selectedCountry} onChange={handleCountryChange}>
                <option value="" >Select a country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>

              </label>


              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Age:</h4>
                <input maxLength="3" className={styles.Mobileinput} value={age} onChange={(e) => { handleAge(e) }} type="text" />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Phone number:</h4>
                <input maxLength="15" className={styles.Mobileinput} value={phoneNumber} onChange={(e) => { handlePhoneNumber(e) }} type="text" />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Aadhaar number:</h4>
                <input maxLength="12" className={styles.Mobileinput} value={Aadhar} onChange={(e) => { AadharhandleChange(e) }} type="number" />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Pan Card Number:</h4>
                <input maxLength="16" className={styles.Mobileinput} value={panCard} onChange={(e) => { PanCardhandleChange(e) }} type="text" />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Notice Period in days: </h4>
                <input maxLength="6" className={styles.Mobileinput} value={NoticePeriod} onChange={(e) => { handleNoticePeriod(e) }} type="text" />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Expected Salary: &nbsp;<span className={styles.hint}>(e.g 5L or 10L)</span></h4>
                <input maxLength="3" className={styles.Mobileinput} value={ExpectedSalary} onChange={(e) => { handleexpectedSalary(e) }} type="nmber" />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Current CTC: &nbsp;<span className={styles.hint}>(e.g 5L or 10L)</span></h4>
                <input maxLength="3" className={styles.Mobileinput} value={currentCTC} onChange={(e) => { handleCurrentCTC(e) }} type="text" />
              </label>

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Qualification:</h4>
                <input maxLength="10" className={styles.Mobileinput} value={Qualification} onChange={(e) => { handleQualification(e) }} type="text" />
              </label>

              {/* <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>College:</h4>
                <input maxLength="100" className={styles.Mobileinput}   type="text" />
              </label> */}

              <label className={styles.MobileinputName}>
                <h4 className={styles.MobileName}>Experience: &nbsp;<span className={styles.hint}>(e.g 2Y or 10Y)</span> </h4>
                <input maxLength="3" className={styles.Mobileinput} value={Experiance} onChange={(e) => { handleExperiance(e) }} type="text" />
              </label>
               {/* <label className={styles.inputName}>
                <h4 className={styles.MobileName}>Skill Tags:</h4>
                <div style={{ width:"88%", marginLeft:"10px"}}>
                           <CreatableSelect  
                          isMulti={true}
                          options={jobTags}
                          value={Tags}
                          onChange={handleChange}     
                        />
                         </div>
              </label> */}
                <div className={Style.JobtitleFilterWrapper}>
            {/* <buton className={ Active.length===0? Style.active:Style.JobtitleFilter} onClick={() => { getjobs() }}>All</buton> */}
            {
              jobTags.map((tags, i) => {
                return (
                                   
                  <button disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                    className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                    Style.TagHeading: 
                    //  Active === tags.value ? 
                    Tags.findIndex(  (present)=>{
                      return(
                        present===tags.value
                      )
                          }) >=0?
                     Style.active : Style.JobtitleFilter} 
                     onClick={ () => {  handleTags(tags.value) }}
                     >{tags.value} </button>
                
                  )
              })
            }
          </div>


               <label className={styles.inputName}>
                <h4 className={styles.MobileName}>College:</h4>
                <div style={{ width:"88%", marginLeft:"10px"}}>
                <CreatableSelect  
                  options={colleges}
                  value={college}
                  onChange={handleCollege}   
                />
                         </div>
              </label>

              {college.value==="Others" &&(
               <label className={styles.inputName} style={{marginTop:"-7px", width:"81%", marginLeft:"18px"}}>
               <h4>Others: &nbsp;<span className={styles.hint}>(Enter College name)</span></h4>
               <input className={styles.input} value={Others} onChange={handleOthersCollege}  type="text" />
             </label>

            )}

<div style={{ maxWidth: "400px", margin: "auto", padding: "10px",marginleft:"10px" }}>
      <div style={{display:"flex",gap:"16px"}}>
      <h2 style={{ fontSize: "13px", marginBottom: "10px",marginTop:"15px",marginLeft:"10px" }}>Previous Employers</h2>
      {employers.length < 3 && (
        <button
          onClick={addEmployer}
          style={{
            marginTop: "10px",
            backgroundColor: "rgb(40,4,99)",
            color: "white",
            border: "none",
            padding: "6px 10px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px"
          }}
        >
          +
        </button>
      )}
      </div>

      {employers.map((employer, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <input
            type="text"
            placeholder={`Employer ${index + 1}`}
            value={employer}
            onChange={(e) => handleEmployerChange(index, e.target.value)}
            style={{ flex: "1", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <button
            onClick={() => removeEmployer(index)}
            style={{
              background: "red",
              color: "#fff",
              border: "none",
              padding: "6px 10px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            -
          </button>
        </div>
      ))}
    </div>


              <div style={{marginTop:"20px"}}>
{/* 
              <button className={styles.MobileSave} onClick={(e) => { saveUpdate(e) }}>Save</button>
              <button className={styles.Mobilecancel} onClick={() => { navigate(-1) }} >cancel</button>
              </div>
              <div style={{marginTop:"60px"}}> */}

              <div className={STyles.signUpWrapper} style={{marginLeft:"50px", marginBottom:"20px"}}
               onClick={!email? NoEmailAlert : emailError? InvalidEmailAlert :login}>
          <div className={STyles.both}>
            <img className={STyles.google} src={GoogleImage} />
            <p className={STyles.signUpwrap} >Register with Google</p>
          </div>
        </div>
          <Footer/>
        </div>
        </div>

</div>
            </>

          }
      


    </>
  )
}
export default StudentUpdateProfile