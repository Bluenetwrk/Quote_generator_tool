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
import JoditEditor from 'jodit-react'
import CustomTextEditor from '../Editor/CustomTextEditor';


function EmployeeUpdateProfile(props) {
  const editor=useRef(null)

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

  async function getUser() {
    const headers = { authorization: 'BlueItImpulseWalkinIn'};

    await axios.get(`/EmpProfile/getProfile/${empId}`, {headers})
      .then((res) => {
        let result = res.data.result
        if (result) {
          setname(result.name)
          setemail(result.email)
          // result.image? setimage(result.image):setimage(Companylogo)
          setimage(result.image)
          setimmage(result.image)
          setphoneNumber(result.phoneNumber)
          setAadhar(result.Aadhar)
          setpanCard(result.panCard)
          setCompanyName(result.CompanyName)
          setCompanyContact(result.CompanyContact)
          setCompanyGSTIN(result.CompanyGSTIN)
          setCompanyWebsite(result.CompanyWebsite)
          setCompanyAddress(result.CompanyAddress)
          setTypeofOrganisation(result.TypeofOrganisation)
          setCompanyEmail(result.CompanyEmail)
        }
      }).catch((err) => {
        alert("server issue occured", err)
      })
  }
  useEffect(() => {
    getUser()
  }, [])

  const [emailError, setEmailError] = useState("");

  async function saveUpdate(e) {
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
    await axios.put(`/EmpProfile/updatProfile/${empId}`, { PrimeryuserDesignation, secondaryuserDesignation, Secondaryusername,
      Secondaryuseremailid, Secondaryusercontactnumber, CompanyCIN, AboutCompany, name, email, phoneNumber, Aadhar, panCard, 
      CompanyName, CompanyContact, CompanyGSTIN, CompanyWebsite, CompanyAddress, CompanyEmail, TypeofOrganisation}, {headers})
      .then(async (res) => {
        let result = res.data
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
  }

  // ...............upload Image.....................
  async function uploadImage() {
    const formdata = new FormData()
    formdata.append('image', image)

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


  return (
    <>

      <div className={styles.EntireFullWrapper}>
        <div className={styles.EntireWrapper} style={{height:"100%"}}>
        {/* <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={()=>{navigate(-1)}}  src={Arrowimage} /> */}
              <button className={styles.readPageBackBtn} 
            onClick={() => {
               if (window.history.length > 1) {
                  navigate(-1);
                 } else {
                    navigate('/Blogs'); 
                  }
             }}>
                 Back
          </button>
        {/* <h3 style={{color:"rgb(40, 4, 99)", marginLeft:"2%"}}>Update your Profi</h3> */}


          <div className={styles.EmpimageViewWrapper} style={{height:"76px",width:"94px"}}>
            {file?"":<img className={styles.EmpimageView} src={image ? image : Companylogo} />}
            {file?<img className={styles.EmpfileView} src={file} />:""}

            <div className={styles.EmpaddfileDiconwrapper}>
              <input className={`${styles.addfile} ${styles.EmpaddfileD}`} type="file" accept='.png, .jpg, .jpeg' onChange={prevewImage} />
              <div className={styles.Emploader}> {loader ? <TailSpin height={"40px"} /> : ""} </div>

              {/* <img style ={{color:"blue" , marginTop:"4px", width:"15%"}} src={delet} onClick={deletePic}/> */}
            </div>

          </div>
          <div className={styles.saveDelete}>
            {file && !loader ? <button className={styles.EmpsaveImage} onClick={uploadImage}>Save</button> : ""}
            {immage ? <button className={styles.EmpDeleteImage} onClick={deletePic}>Delete</button> : ""}
          </div>

          <p style={{ fontStyle: "italic", color: "green" }}>{topMessage}</p>
{screenSize.width>850?

<>
          <div className={styles.inputWrapper}>


            <label className={styles.inputName}>
              <h4>Company Name: </h4>
              <input maxLength="40" className={styles.input} value={CompanyName} onChange={(e) => {handleCompanyname(e) }} type="text" />
            </label>

            <div className={styles.inputName}>
              <h4>Type of Organisation:</h4>
              {/* <input className={styles.input} value={TypeofOrganisation} onChange={(e) => { setTypeofOrganisation(e.target.value) }} type="text" /> */}
           
            <select className={styles.input } style={{height:"35px"}}onChange={(e)=>{setTypeofOrganisation(e.target.value)}}>
            {/* {TypeofOrganisation? <option style={{color:"blue"}} >{TypeofOrganisation}</option>
            :<option value="" >Select Company type</option>
            } */}
              <option value="Pvt.Ltd.">Pvt. Ltd.</option>
              <option value="Firm">Firm</option>
              <option value="Consultancy">Consultancy</option> 
              <option value="Individual">Individual</option> 
            </select>                                 
            </div>  

            <label className={styles.inputName}>
              <h4>Company Email id:</h4>
              <input maxLength="25" className={styles.input} value={CompanyEmail} onChange={(e) => { handleCompanyEmail(e) }} type="text" /><br></br>
              <span style={{color:"red", marginLeft:"5%"}}>{compemailError}</span>
            </label>

            <label className={styles.inputName}>
              <h4>Company Contact No:</h4>
              <input maxLength="15"  className={styles.input} value={CompanyContact} onChange={(e) => { handleCompanyPhoneNumber(e) }} type="number" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Pan Card Number:</h4>
              <input maxLength="12" className={styles.input} value={panCard} onChange={(e) => {PanCardhandleChange(e)} } type="text" />
            </label>
            <label className={styles.inputName}>
              <h4>Company CIN Number:</h4>
              <input maxLength="21" className={styles.input} value={CompanyCIN} onChange={(e) => {handleChangeCompanyCIN(e)} } type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company GSTIN: </h4>
              <input maxLength="15" className={styles.input} value={CompanyGSTIN} onChange={(e) => { handleGstn(e) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Website:</h4>
              <input maxLength="40" className={styles.input} value={CompanyWebsite} onChange={(e) => { handleCompanyWebsite(e) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Address:</h4>
              <input maxLength="200" className={styles.input} value={CompanyAddress} onChange={(e) => { handleCompanyAddress(e) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Primary User Name : <span style={{fontWeight:800, fontSize:"medium"}} title='(primary user will have the admin right for your
                company, primary user can add or remove multiple secondary user)'><i class="fa-solid fa-circle-info"></i></span></h4>
              <input maxLength="40" className={styles.input}  value={name}  onChange={(e) => { setname(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Primary User Email Id:</h4>
              <input maxLength="25" className={styles.input} value={email}  onChange={(e) => { handlesetemail(e) }} type="text" />
              <span style={{color:"red", marginLeft:"5%"}}>{emailError}</span>
            </label>
            
            <label className={styles.inputName}>
              <h4>Primary user Designation:</h4>
              <input maxLength="90" className={styles.input} value={PrimeryuserDesignation} onChange={(e) => {handlePrimeryuserDesignation(e) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Aadhaar number:
              <span style={{fontWeight:800, fontSize:"medium"}} title='(Applicable for individual job posters)'>
                <i class="fa-solid fa-circle-info"></i></span> </h4>
              <input maxLength="12" className={styles.input} value={Aadhar} onChange={(e) => {AadharhandleChange(e)} } type="number" />
            </label>

            <label className={styles.inputName}>
              <h4>Primary User Phone number:</h4>
            <input maxLength="15" className={styles.input}  value={phoneNumber} onChange={(e) => { handlephoneNumber(e) }} type="number" />
            </label>
            

            <label className={styles.inputName}>
              <h4>Secondary user name : <span style={{fontWeight:800, fontSize:"medium"}} 
            title='(The secondary user can post jobs and find candidates.)'><i class="fa-solid fa-circle-info"></i></span></h4>
              <input maxLength="90" className={styles.input} value={Secondaryusername} onChange={(e) => {handleSecondaryusername(e) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Secondary user Designation:</h4>
              <input maxLength="90" className={styles.input} value={secondaryuserDesignation} onChange={(e) => {handleSecondaryuserDesignation(e) }} type="text" />
            </label>

            
            <label className={styles.inputName}>
              <h4>Secondary user email id:</h4>
              <input maxLength="90" className={styles.input} value={Secondaryuseremailid} onChange={(e) => {handleSecondaryuseremailid(e) }} type="text" />
            </label>
            <label className={styles.inputName}>
              <h4>Secondary user contact number:</h4>
              <input maxLength="90" className={styles.input} value={Secondaryusercontactnumber} onChange={(e) => {handleSecondaryusercontactnumber(e) }} type="text" />
            </label>
            <div className={styles.Editor}>
            <h4 style={{marginTop:"38px", marginBottom:"10px"}}>About Company:</h4>
{/* <JoditEditor  ref={editor}  value={AboutCompany.toString()} onChange={(e)=>{setAboutCompany(e)}} /> */}
<div style={{marginLeft:"12px"}}>
<CustomTextEditor
 ref={editor} 
        value={AboutCompany.toString()}
        onChange={setAboutCompany}
      />
      </div>
             
</div>

<div style={{ display:"flex", margin:"10px 20px"}}>

            <button className={styles.Save} onClick={(e) => { saveUpdate(e) }}>Save</button>
            <button className={styles.cancel} onClick={() => { navigate(-1) }} >Cancel</button>
</div>

          </div>

</>
          :
          <>
           
           <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Primary User Name : <span style={{fontWeight:800, fontSize:"medium"}} title='(primary user will have the admin right for your
                company, primary user can add or remove multiple secondary user)'><i class="fa-solid fa-circle-info"></i></span></h4>
              <input maxLength="40" className={styles.Mobileinput}  value={name}  onChange={(e) => { setname(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Primary User Email Id:</h4>
              <input maxLength="25" className={styles.Mobileinput} value={email}  onChange={(e) => { setemail(e.target.value) }} type="text" />
            </label>
            
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Primary user Designation:</h4>
              <input maxLength="90" className={styles.Mobileinput} value={PrimeryuserDesignation} onChange={(e) => {handlePrimeryuserDesignation(e) }} type="text" />
            </label>
            
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Aadhaar number:</h4>
              <input maxLength="16" className={styles.Mobileinput} value={Aadhar} onChange={(e) => { AadharhandleChange(e) }} type="number" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Pan Card Number:</h4>
              <input className={styles.Mobileinput} value={panCard} onChange={(e) => { PanCardhandleChange(e) }} type="text" />
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

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Contact No:</h4>
              <input maxLength="15" className={styles.Mobileinput} value={CompanyContact} onChange={(e) => { handleCompanyPhoneNumber(e) }} type="number" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company GSTIN: </h4>
              <input maxLength="15" className={styles.Mobileinput} value={CompanyGSTIN} onChange={(e) => { handleGstn(e) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Website:</h4>
              <input maxLength="25" className={styles.Mobileinput} value={CompanyWebsite} onChange={(e) => { handleCompanyWebsite(e)}} type="text" />
            </label>
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>About us:</h4>
              <input maxLength="25" className={styles.Mobileinput} value={CompanyWebsite} onChange={(e) => { handleCompanyWebsite(e)}} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Address:</h4>
              <input maxLength="90" className={styles.Mobileinput} value={CompanyAddress} onChange={(e) => {handleCompanyAddress(e) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Secondary user name : <span style={{fontWeight:800, fontSize:"medium"}} 
            title='(The secondary user can post jobs and find candidates.)'><i class="fa-solid fa-circle-info"></i></span></h4>
              <input maxLength="90" className={styles.Mobileinput} value={Secondaryusername} onChange={(e) => {handleSecondaryusername(e) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Secondary user Designation:</h4>
              <input maxLength="90" className={styles.Mobileinput} value={PrimeryuserDesignation} onChange={(e) => {handleSecondaryuserDesignation(e) }} type="text" />
            </label>

            
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Secondary user email id:</h4>
              <input maxLength="90" className={styles.Mobileinput} value={Secondaryuseremailid} onChange={(e) => {handleSecondaryuseremailid(e) }} type="text" />
            </label>
            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Secondary user contact number:</h4>
              <input maxLength="90" className={styles.Mobileinput} value={Secondaryusercontactnumber} onChange={(e) => {handleSecondaryusercontactnumber(e) }} type="text" />
            </label>
           
            <div className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Type of Organisation :</h4>          
            <select className={styles.Mobileinput } style={{height:"35px"}}onChange={(e)=>{setTypeofOrganisation(e.target.value)}}>
            {/* {TypeofOrganisation? <option style={{color:"blue"}} >{TypeofOrganisation}</option>
            :<option value="" >Select Company type</option>
            } */}
              <option value="Pvt.Ltd.">Pvt. Ltd.</option>
              <option value="Firm">Firm</option>
              <option value="Consultancy">Consultancy</option> 
              <option value="Individual">Individual</option> 

            </select>  
            {/* </div> */}
            <button className={styles.MobileSave} onClick={(e) => { saveUpdate(e) }}>Save</button>
            <button className={styles.Mobilecancel} onClick={() => { navigate(-1) }} >Cancel</button>                               
            </div>
            <div style={{marginTop:"60px"}}>
          <Footer/>
        </div>
          </>
}
        </div>

      </div>

    </>
  )
}
export default EmployeeUpdateProfile