import React, { useEffect, useState, useRef } from 'react';
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
import STyles from "../Login/login.module.css"
import GoogleImage from "../img/icons8-google-48.png"
import MicosoftImage from "../img/icons8-windows-10-48.png"
// import { TailSpin, Puff } from "react-loader-spinner"
import { useGoogleLogin } from '@react-oauth/google';

import JoditEditor from 'jodit-react'
import Style from "../PostJobs/postJobs.module.css"
import CustomTextEditor from '../Editor/CustomTextEditor';
import CustomAlert from '../Alert/customAlert';
import linkedIn from "../img/icons8-linked-in-48.png"
function EmployeeUpdateProfile(props) {
  const editor=useRef(null)
// primery email id should be gmail acc
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
  const [loader, setLoader] = useState(false)
  const [RegLoader, setRegLoader] = useState(false)
  const [emailError, setEmailError] = useState("");
  const [compemailError, setCompEmailError] = useState("");

  const [PrimeryuserDesignation, setPrimeryuserDesignation] = useState("");
  const [secondaryuserDesignation, setsecondaryuserDesignation] = useState("");
  const [Secondaryusername, setSecondaryusername] = useState("");
  const [Secondaryuseremailid, setSecondaryuseremailid] = useState("");
  const [Secondaryusercontactnumber, setSecondaryusercontactnumber] = useState("");
  const [CompanyCIN, setCompanyCIN] = useState("");
  const [AboutCompany, setAboutCompany] = useState("");
  

  let navigate = useNavigate()

  let empId = JSON.parse(localStorage.getItem("EmpIdG"))


  const [topMessage, settopMessage] = useState("")

  const [ipAddress, setIPAddress] = useState('')
      const [gmailuser, setGmailuser] = useState("")
    
    
      useEffect(() => {
        fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data => setIPAddress(data.ip))
          .catch(error => console.log(error))
      }, []);
  
  function NoEmailAlert(){
    alert("primary email field must be filled")
  }
  
 function InvalidEmailAlert(){
  alert("Invalid Primary email id")
 }

 const [alertVisible, setAlertVisible] = useState(false);

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

        await axios.post("QgtBuyerProfile/Glogin", { ipAddress, userId, email, name, gtoken, isApproved ,
          PrimeryuserDesignation, Secondaryusername, Secondaryuseremailid,
      Secondaryusercontactnumber, phoneNumber, Aadhar, panCard, CompanyName, CompanyContact, CompanyGSTIN,
      CompanyWebsite,CompanyAddress,CompanyEmail, TypeofOrganisation,CompanyCIN, secondaryuserDesignation,AboutCompany
        })
          .then((response) => {
            let result = response.data
            let token = result.token
            let GuserId = result.id
            // console.log(result)
            if (result.action == "registered") {
              // alert("Registered Successfully")
              setAlertVisible(true)
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
  const [Api, setApi] = useState("")

   const register = async () => {
    if(!name || !email ||  !phoneNumber || !CompanyName){
      alert("details are missing")
      return false
    }
    const url = "https://graph.microsoft.com/v1.0/invitations";
    const token = Api
    const response = await fetch(url, {
      method: "POST",
      headers: {
      "Authorization": `Bearer ${token}`, // Send the Bearer Token
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      invitedUserEmailAddress: email,
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

  
  // ...............upload Image.....................
  async function uploadImage() {
    const formdata = new FormData()
    formdata.append('image', image)

    console.log(formdata)
    await axios.put(`/EmpProfile/uploadImage/${empId}`, formdata)
      .then((res) => {
        window.location.reload()
      }).catch((err) => {
      })
  }

  async function prevewImage(e) {
    setLoader(true)
    setimmage("")
    setFile(URL.createObjectURL(e.target.files[0]))
    // setimage(e.target.files[0])
    const imageFile = e.target.files[0];
    const options = {
      maxSizeMB: 0.08,
      // maxWidthOrHeight: 2000,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setLoader(false)
      setimage(compressedFile)

    } catch (error) {
    }
  }
  async function deletePic() {
    await axios.put(`/EmpProfile/deleteImage/${empId}`, { image })
      .then((res) => {
        window.location.reload()
      }).catch((err) => {
        alert("server issue occured")
      })
  }

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

   function handleChangeCompanyCIN(e){
    setCompanyCIN(e.target.value)
   }

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
      setCompEmailError("");
  } else {
    setCompEmailError("Enter valid Email!");
  }
   }

   function handlesetemail(event){
    const email = event.target.value;
    const sanitizedValue = email.replace(/[^\w\s.@]|_/g, ''); // Regex to remove special characters
    setemail(sanitizedValue);

    if (validator.isEmail(email)) {
      setEmailError("");
  } else {
      setEmailError("Enter valid Email!");
  }
   }
   
   function handlePrimeryuserDesignation(e){
    setPrimeryuserDesignation(e.target.value)
   }
   function handleSecondaryuserDesignation(e){
    setsecondaryuserDesignation(e.target.value)
   }
   


   function handleSecondaryusername(e){
    setSecondaryusername(e.target.value)
   }

   function handleSecondaryuseremailid(e){
    const email = e.target.value;
    const sanitizedValue = email.replace(/[^\w\s.@]|_/g, ''); // Regex to remove special characters
    setSecondaryuseremailid(sanitizedValue)
   }
   function handleSecondaryusercontactnumber(e){

    const sanitizedValue = e.target.value.replace(/[A-Za-z]/g, '');
    // if(e.target.value.includes(/[1-9]/g))
        if (sanitizedValue.length>10){
        return false
    }else{
      setSecondaryusercontactnumber(sanitizedValue)
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

   async function saveMicrosoft(e) {
    if(!email){
      alert("Primary User Email Id is mandatory to fill")
      return false
    }else if(emailError){
      alert("invalid Primary User Email id ")
      return false
    }
    setRegLoader(true)
    if(emailError==="Enter valid Email!"){
      return false
    }
    let userid = JSON.parse(localStorage.getItem("EmpIdG"))
    const headers = { authorization: userid +" "+ atob(JSON.parse(localStorage.getItem("EmpLog"))) };
    // e.preventDefault()
    // console.log("before saving", empId,
    //   name, email, phoneNumber, Aadhar, panCard,CompanyName,CompanyContact, CompanyGSTIN, CompanyWebsite, CompanyAddress,
    //   CompanyEmail, TypeofOrganisation 
    // )
  console.log("dd",PrimeryuserDesignation)
    await axios.post(`QgtBuyerProfile/NewBuyerRegistration`, { PrimeryuserDesignation, Secondaryusername, Secondaryuseremailid,
      Secondaryusercontactnumber,  name, email, phoneNumber, Aadhar, panCard, CompanyName, CompanyContact, CompanyGSTIN,
      CompanyWebsite,CompanyAddress,CompanyEmail, TypeofOrganisation,CompanyCIN, secondaryuserDesignation,AboutCompany},{headers})
      .then(async (res) => {
        let result = res.data
        // console.log(result)
        if(result===11000){
          alert("Primary email id is already registered please try different email id")
        }
        if(result.access_token){
          const url = "https://graph.microsoft.com/v1.0/invitations";
    const token = result.access_token
    const response = await fetch(url, {
      method: "POST",
      headers: {
      "Authorization": `Bearer ${token}`, // Send the Bearer Token
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      invitedUserEmailAddress: email,
      // inviteRedirectUrl: "http://localhost",
      inviteRedirectUrl: "https://www.itwalkin.com/",
      sendInvitationMessage: true,
      }),
    });
    // console.log("Response :", response);
    if (response.ok) {
      const data = await response.json();
      // alert(` You will receive an invitation email from microsoft to your primary email address: ${email} `)
      alert(`You will receive an invitation email from Microsoft at your registered email address shortly.`)
      setname("")
setemail("")
setphoneNumber("")
setAadhar("")
setpanCard("")
setCompanyName("")
setCompanyContact("")
setCompanyGSTIN("")
setCompanyWebsite("")
setCompanyAddress("")
setCompanyEmail("")
setTypeofOrganisation("")
setPrimeryuserDesignation("")
setsecondaryuserDesignation("")
setSecondaryusername("")
setSecondaryuseremailid("")
setSecondaryusercontactnumber("")
setCompanyCIN("")
    } else {
      // console.error("Error:", response.status, response.statusText);
      alert(`some thing went wrong`)

    }
        }
        if (result == "success") {
          settopMessage("Success! Profile updated successfully")
        } else if (result == "feilds are missing") {
          settopMessage("Alert!..name, emailAddress, NoticePeriod, phoneNumber, Qualification, Skills and Experiance should not be empty")
        }

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });


      }).catch((err) => {
      })
    setRegLoader(false)
  }

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
  question: "How to Register as Jobseeker?", 
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
  

  // ---------------------place api-----------------------
  const inputRef = useRef(null);

  useEffect(() => {
    const loadScript = (url, callback) => {
      const existingScript = document.getElementById("googleMaps");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = url;
        script.id = "googleMaps";
        script.async = true;
        script.defer = true;
        script.onload = callback;
        document.body.appendChild(script);
      } else {
        callback();
      }
    };

    const initAutocomplete = () => {
      if (!window.google) return;

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          // Allows all place types: address, establishment, cities, regions
          types: [], // Empty array means no restriction
          fields: ["formatted_address", "geometry", "name", "place_id"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Selected Place:", place);
      
        const address = place.formatted_address;
        setCompanyAddress(address);
      
        console.log("Company :", address, CompanyAddress); // ✅ shows correct value
      
        if (!place.geometry) {
          alert("No details available for: " + place.name);
          return;
        }
  

        // You can access: place.name, place.formatted_address, place.geometry.location, etc.
      });
    };

    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyBJ1-4QU6vh2XuUhENkFLY1YRX5barmKZk&libraries=places`,
      initAutocomplete
    );
  }, []);
  useEffect(() => {
    console.log("Updated Company Address:", CompanyAddress);
  }, [CompanyAddress]);


  // useEffect(()=>{
  //    console.log("about updated",AboutCompany)
  // },[AboutCompany])

  return (
    <>
      <CustomAlert
        show={alertVisible}
        title="Registration successful!"
        message="Start posting jobs and hiring top talent now"
        onClose={() => setAlertVisible(false)}
      />
  
      <div className={styles.pageWrapper}>
        <div className={styles.formCard}>
  
          {/* Header */}
          <div className={styles.header}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
              Back
            </button>
  
            <h2>Buyer Registration Form</h2>
  
            <button
              ref={helpBtnRef}
              className={styles.helpBtn}
              onClick={() => setHelpClicked(prev => !prev)}
            >
              Help
            </button>
  
            {helpClicked && (
              <div className={styles.helpDropdown} ref={helpRef}>
                <p onClick={() => navigate(`/support/help/${btoa(1)}`)}>
                  How to create a new Account
                </p>
                <p onClick={() => navigate("/support/help")}>
                  More help topics
                </p>
              </div>
            )}
          </div>
  
          {/* Form */}
          <div className={styles.formGrid}>
  
            <div className={styles.field}>
              <label>Buyer / Company Name</label>
              <input value={CompanyName} onChange={handleCompanyname} />
            </div>
  
            <div className={styles.field}>
              <label>Buyer Email ID</label>
              <input value={CompanyEmail} onChange={handleCompanyEmail} />
              <span className={styles.error}>{compemailError}</span>
            </div>
  
            <div className={styles.field}>
              <label>Contact Number</label>
              <input value={CompanyContact} onChange={handleCompanyPhoneNumber} />
            </div>
  
            <div className={styles.field}>
              <label>Contact Person Name</label>
              <input value={name} onChange={e => setname(e.target.value)} />
            </div>
  
            <div className={styles.field}>
              <label>Country</label>
              <select value={selectedCountry} onChange={handleCountryChange}>
                <option value="">Select a country</option>
                {countries.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>
  
            <div className={styles.field}>
              <label>Business Type</label>
              <select onChange={e => setTypeofOrganisation(e.target.value)}>
                <option value="">Select business type</option>
                <option value="Pvt.Ltd.">Pvt. Ltd.</option>
                <option value="Firm">Firm</option>
                <option value="Consultancy">Consultancy</option>
                <option value="Individual">Individual</option>
              </select>
            </div>
  
            <div className={styles.field}>
              <label>Products / Services Interested In</label>
              <select>
                <option>Select one or more</option>
              </select>
            </div>
  
            <div className={styles.field}>
              <label>Preferred Currency</label>
              <select>
                <option>Select currency</option>
              </select>
            </div>
  
            <div className={styles.field}>
              <label>GST / Tax ID (optional)</label>
              <input />
            </div>
  
            <div className={`${styles.field} ${styles.full}`}>
              <label>About Buyer (optional)</label>
              <textarea placeholder="Start writing..." />
            </div>
  
          </div>
  
          {/* Social Buttons */}
          <div className={styles.socialRow}>
            <button onClick={saveMicrosoft}>
              <img src={MicosoftImage} alt="" /> Register with Microsoft
            </button>
  
            <button onClick={!email ? NoEmailAlert : emailError ? InvalidEmailAlert : login}>
              <img src={GoogleImage} alt="" /> Register with Google
            </button>
          </div>
  
        </div>
      </div>
    </>
  );
}
  export default EmployeeUpdateProfile;