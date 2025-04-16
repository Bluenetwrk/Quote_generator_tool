import React, { useEffect, useState } from 'react';
import styles from "./SudentUpdateProfile.module.css"
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import logo from "../img/Blue.jpg"
import { Navigate, useNavigate } from 'react-router-dom';
import profileDp from "../img/user_3177440.png"
import delet from "../img/icons8-delete-48.png"
import { TailSpin } from "react-loader-spinner"
import Companylogo from "../img/logo.png"
import useScreenSize from '../SizeHook';
import socketIO from 'socket.io-client';
import Arrowimage from '../img/icons8-arrow-left-48.png'
import validator from "validator";
import Footer from '../Footer/Footer';
import GoogleImage from "../img/icons8-google-48.png"
import MicosoftImage from "../img/icons8-windows-10-48.png"
import STyles from "../Login/login.module.css"

import { useGoogleLogin } from '@react-oauth/google';



function EmployeeUpdateProfile(props) {

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

        await axios.post("/EmpProfile/Glogin", { ipAddress, userId, email, name, gtoken, isApproved })
          .then((response) => {
            let result = response.data
            let token = result.token
            let GuserId = result.id
            if (result.status == "success") {
              localStorage.setItem("EmpLog", JSON.stringify(btoa(token)))
              localStorage.setItem("EmpIdG", JSON.stringify(GuserId))
              navigate("/Search-Candidate", { state: { gserid: GuserId } })
            }
          }).catch((err) => {
            alert("server issue occured")
          })

      } catch (err) {
        alert("some thing went wrong with google gmail", err)
      }
    }
  })



  // useEffect( ()=>{    
  //   const socket = socketIO.connect(props.url,{
  //     auth:{
  //       token: JSON.parse(localStorage.getItem("EmpIdG"))
  //     }
  //   });
  // },[])
  const [file, setFile] = useState()
  const [uploaded, setUploaded] = useState()
const screenSize = useScreenSize();

const [image, setimage] = useState()
const [immage, setimmage] = useState()
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [Inemail, setInemail] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [Aadhar, setAadhar] = useState("")
  const [panCard, setpanCard] = useState("")
  const [CompanyName, setCompanyName] = useState("")
  const [CompanyContact, setCompanyContact] = useState("")
  const [CompanyGSTIN, setCompanyGSTIN] = useState("")
  const [CompanyWebsite, setCompanyWebsite] = useState("")
  const [CompanyAddress, setCompanyAddress] = useState("")
  const [CompanyEmail, setCompanyEmail] = useState("")
  const [TypeofOrganisation, setTypeofOrganisation] = useState("")
  const [Api, setApi] = useState("")
  const [loader, setLoader] = useState(false)

  let navigate = useNavigate()

  let empId = JSON.parse(localStorage.getItem("EmpIdG"))


  const [topMessage, settopMessage] = useState("")

   const [emailError, setEmailError] = useState("");

  function handlephoneNumber(e){

    const sanitizedValue = e.target.value.replace(/[A-Za-z]/g, '');
        // if(e.target.value.includes(/[1-9]/g))
            if (sanitizedValue.length>10){
            return false
        }else{
          setphoneNumber(sanitizedValue)
        }
   }

  const AadharhandleChange = (event) => {
    if (event.target.value.length > 12){
      return false
  }else{
  // setphoneNumber(e.target.value)
  const value = event.target.value;
  const sanitizedValue = value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
  setAadhar(sanitizedValue);
  }

   };
   
  const PanCardhandleChange = (event) => {
    if (event.target.value.length> 10){
      return false
  }else{
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
    setpanCard(sanitizedValue);
  }
   };

   function  handleCompanyname(e){    
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^\w\s.]|_/g, ''); // Regex to remove special characters
    setCompanyName(sanitizedValue);

   }

   function handleCompanyEmail(event){
    const email = event.target.value;
    const sanitizedValue = email.replace(/[^\w\s.@]|_/g, ''); // Regex to remove special characters
    setCompanyEmail(sanitizedValue);

    if (validator.isEmail(email)) {
      setEmailError("");
  } else {
      setEmailError("Enter valid Email!");
  }

   }

   function handleCompanyPhoneNumber(e){

    if (e.target.value.length > 10){
      return false
  }else{
  setCompanyContact(e.target.value)
  }
   }

   function handleGstn(e){
    if (e.target.value.length > 15){
      return false
  }else{
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^\w\s]|_/g, ''); // Regex to remove special characters
    setCompanyGSTIN(sanitizedValue);
  }
   }
   function handleCompanyWebsite(event){
    const email = event.target.value;
    const sanitizedValue = email.replace(/[^\w\s.@/]|_/g, ''); // Regex to remove special characters
    setCompanyWebsite(sanitizedValue);
   }
   function handleCompanyAddress(event){
    const email = event.target.value;
    const sanitizedValue = email.replace(/[^\w\s,.]|_/g, ''); // Regex to remove special characters
    setCompanyAddress(sanitizedValue);
   }

   const getToken = async () => {
		const url = "https://login.microsoftonline.com/ae4ae520-4db7-4149-ad51-778e540d8bec/oauth2/v2.0/token";
		const data = {
		  grant_type: "client_credentials",
		  client_id: "097b08ff-185e-4153-aedc-0e5814e0570c",
		  client_secret: "D1k8Q~yOxTlSdb_LB1tW118c4827PN~c7PK6JcMr",
		  scope: "https://graph.microsoft.com/.default"
		};	  
		try {
		  const response = await axios.post(url, new URLSearchParams(data), {
			headers: {
			  "Content-Type": "application/x-www-form-urlencoded" 	}
		  });
		  console.log("Access Token Response:", response.data);
		  return response.data;
		} catch (error) {
		  console.error("Error fetching access token:", error);
		}
    
      // const config = { 
      //   method: 'post', url: 'https://login.microsoftonline.com/ae4ae520-4db7-4149-ad51-778e540d8bec/oauth2/v2.0/token', 
      //  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      //   data: new URLSearchParams({ 
      //     grant_type: 'client_credentials', 
      //    client_id: '097b08ff-185e-4153-aedc-0e5814e0570c', 
      //    client_secret: 'D1k8Q~yOxTlSdb_LB1tW118c4827PN~c7PK6JcMr', 
      //    scope: 'https://graph.microsoft.com/.default'
      //    }) }; try { const response = await axios(config);
      //     //  setAccessToken(response.data.access_token); 
      //      console.log(response)
      //    } catch (error) { 
      //     // setError(error.message);
      //     console.log(error)
      //     }
	  };

   const register = async () => {
    if(!name || !email ||  !phoneNumber || !CompanyName){
      alert("details are missing")
      return false
    }
    const url = "https://graph.microsoft.com/v1.0/invitations";
    const token = Api
    // setInemail(email)
    const response = await fetch(url, {
      method: "POST",
      headers: {
      "Authorization": `Bearer ${token}`, // Send the Bearer Token
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      // Add your request body here
      invitedUserEmailAddress: email,
      // invitedUserEmailAddress: "blueimpulse9@outlook.com",
      // inviteRedirectUrl: "http://localhost",
      inviteRedirectUrl: "https://www.itwalkin.com/",
      sendInvitationMessage: true,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Response data:", data);
    } else {
      console.error("Error:", response.status, response.statusText);
    }

  }  
console.log(process.env.name)



    // const url = "https://login.microsoftonline.com/ae4ae520-4db7-4149-ad51-778e540d8bec/oauth2/v2.0/token";
    // const data = {
    //   grant_type: "client_credentials",
    //   client_id: "097b08ff-185e-4153-aedc-0e5814e0570c",
    //   client_secret: "D1k8Q~yOxTlSdb_LB1tW118c4827PN~c7PK6JcMr",
    //   scope: "https://graph.microsoft.com/.default"
    // };	  
    // try {
    //   const response = await axios.post(url, new URLSearchParams(data), {
    // 	headers: {
    // 	  "Content-Type": "application/x-www-form-urlencoded" 	}
    //   });
    //   console.log("Access Token Response:", response.data);
    //   return response.data;
    // } catch (error) {
    //   console.error("Error fetching access token:", error);
    // }
    
      // const config = { 
      //   method: 'post', url: 'https://login.microsoftonline.com/ae4ae520-4db7-4149-ad51-778e540d8bec/oauth2/v2.0/token', 
      //  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      //   data: new URLSearchParams({ 
      //     grant_type: 'client_credentials', 
      //    client_id: '097b08ff-185e-4153-aedc-0e5814e0570c', 
      //    client_secret: 'D1k8Q~yOxTlSdb_LB1tW118c4827PN~c7PK6JcMr', 
      //    scope: 'https://graph.microsoft.com/.default'
      //    }) }; try { const response = await axios(config);
      //      console.log(response)
      //    } catch (error) { 
      //     console.log(error)
      //     }
    


  return (
    <>

      {/* <div className={styles.EntireFullWrapper}> */}
        {/* <div className={styles.EntireWrapper}> */}
        <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} />
        {/* <h3 style={{color:"rgb(40, 4, 99)", marginLeft:"2%"}}>Update your Profi</h3> */}
{screenSize.width>850?

<>
          <div className={styles.inputWrapper}>

          <label className={styles.inputName}>
              <h4>Company Name: </h4>
              <input maxLength="20" className={styles.input} value={CompanyName} onChange={(e) => {handleCompanyname(e) }} type="text" />
            </label>
            <label className={styles.inputName}>
              <h4>Email Id:</h4>
              <input maxLength="25" className={styles.input} value={email}  onChange={(e) => { setemail(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Name:</h4>
              <input maxLength="20" className={styles.input}  value={name}  onChange={(e) => { setname(e.target.value) }} type="text" />
            </label>


            <label className={styles.inputName}>
              <h4>Phone number:</h4>
            <input maxLength="15" className={styles.input}  value={phoneNumber} onChange={(e) => { handlephoneNumber(e) }} type="number" />
            </label>
   <p>Primery user name (primary user will have the admin right for your company, primary user can add or remove multiple secondary user) </p> 
   <p>Primery user Designation </p>
   <p>Primery user email id </p>
   <p>Primery user contact number </p>

   <p>Secondary user name (secondary user will be able to post a job search candidates) </p>
   <p>Secondary user Designation </p>
   <p>Secondary user email id </p>
   <p>Secondary user contact number </p>

            {/* <label className={styles.inputName}>
              <h4>Company Email id:</h4>
              <input maxLength="25" className={styles.input} value={CompanyEmail} onChange={(e) => { handleCompanyEmail(e) }} type="text" /><br></br>
              <span style={{color:"red", marginLeft:"5%"}}>{emailError}</span>
              </label>
              <label className={styles.inputName}>
              <h4>Company Contact No:</h4>
              <input maxLength="15"  className={styles.input} value={CompanyContact} onChange={(e) => { handleCompanyPhoneNumber(e) }} type="number" />
              </label> */}

            <div className={STyles.signUpWrapper} style={{marginLeft:"10px"}} onClick={register} >
          <div className={STyles.both}>
            <img className={STyles.google} src={MicosoftImage} />
            <p className={STyles.signUpwrap} >Rigister with Microsoft</p>
          </div>
        </div>

            <div className={STyles.signUpWrapper} style={{marginLeft:"10px"}} onClick={login}>
          <div className={STyles.both}>
            <img className={STyles.google} src={GoogleImage} />
            <p className={STyles.signUpwrap} >Continue with Google</p>
          </div>
        </div>
          </div>
        <button onClick={getToken}>Get Token</button>
              <input placeholder='get token from postman & enter' onChange={(e)=>{setApi(e.target.value)}} 
              style={{marginLeft:"10px", width:"20%"}}/>

</>
          :
          <>
           
<label className={styles.MobileinputName}>
              <h4  className={styles.MobileName}>Name:</h4>
              <input maxLength="22" className={styles.Mobileinput} value={name} disabled onChange={(e) => { setname(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4  className={styles.MobileName}>Email Id:</h4>
              <input maxLength="25" className={styles.Mobileinput} value={email} disabled onChange={(e) => { setemail(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Name: </h4>
              <input maxLength="25" className={styles.Mobileinput} value={CompanyName} onChange={(e) => { handleCompanyname(e) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Email id:</h4>
              <input maxLength="25" className={styles.Mobileinput} value={CompanyEmail} onChange={(e) => { handleCompanyEmail(e) }} type="text" />
           <br></br>
           <span style={{color:"red", marginLeft:"5%"}}>{emailError}</span>

            </label>
  
            <div style={{marginTop:"60px"}}>
          <Footer/>
        </div>
          </>
}
        {/* </div> */}

      {/* </div> */}

    </>
  )
}
export default EmployeeUpdateProfile