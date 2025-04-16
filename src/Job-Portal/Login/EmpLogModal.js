// Modal.js
import { useState, useEffect, createContext } from "react"
import React from 'react'
import styles from "./login.module.css"
import axios from "axios"
import GoogleImage from "../img/icons8-google-48.png"
import MicosoftImage from "../img/icons8-windows-10-48.png"
import linkedIn from "../img/icons8-linked-in-48.png"
import github from "../img/icons8-github-50.png"

import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import image from "../img/user_3177440.png"
import { TailSpin } from "react-loader-spinner"
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../Config";

const Modal = ({ isOpen, onClose, children }) => {
	const { instance } = useMsal();
	
	const [gmailuser, setGmailuser] = useState("")
	const [topErrorMessage, setTopErrorMessage] = useState("")
	const [PhoneNumber, setPhoneNumber] = useState("")
	const [otp, setotp] = useState("")
  
	const [showotp, setshowotp] = useState(false)
	const [Loader, setLoader] = useState(false)
	const [ipAddress, setIPAddress] = useState('')

	const url = 'https://login.microsoftonline.com/ae4ae520-4db7-4149-ad51-778e540d8bec/oauth2/v2.0/token';

//   const params = new URLSearchParams();
//   params.append('client_id', '097b08ff-185e-4153-aedc-0e5814e0570c');
//   params.append('client_secret', 'D1k8Q~yOxTISdb_LB1tW118c4827PN~c7PK6...');
//   params.append('scope', 'https://graph.microsoft.com/.default');
// async function getToken(){
	  
  // ......Modal....
	const [open, setOpen] = React.useState(false);
   
	  const handleClose = () => {
		  setOpen(false);
	  };
   
	  const handleOpen = () => {
		  setOpen(true);
	  };
  
  
  
	useEffect(() => {
	  fetch('https://api.ipify.org?format=json')
		.then(response => response.json())
		.then(data => setIPAddress(data.ip))
		.catch(error => console.log(error))
	}, []);
  
  
  
	const login = useGoogleLogin({
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
				onClose()
			  }
			}).catch((err) => {
			  alert("server issue occured")
			})
  
		} catch (err) {
		  alert("some thing went wrong with google gmail", err)
		}
	  }
	})
  
  
  
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false)
	const [a, setA] = useState("")
	const [topuperror, setTopuperror] = useState("")
	// const [empidinstate, setEmpidinstate] = useState("inital")
  
  
  
	let navigate = useNavigate()
  
	useEffect(() => {
	  // let studentAuth = localStorage.getItem("StudLog")
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
  
	useEffect(() => {
	  let adminLogin = localStorage.getItem("AdMLog")
	  if (adminLogin) {
		navigate("/BIAddmin@Profile")
	  }
	}, [])
  
	// .................login from Registration.............
	// async function Emplogin() {
	//   console.log("before sending to backend", email, password)
	//   await axios.post("http://localhost:8080/EmpProfile/login/", { email, password })
	//     .then((response) => {
	//       console.log(response.data)
	//       let result = response.data
	//       if (result.token) {
	//         navigate("/postedjobs")
	//         localStorage.setItem("EmpLog", JSON.stringify(result.token))
	//         let empId = result.id
	//         localStorage.setItem("emId", JSON.stringify(empId))
  
  
	//       } else if (result == "incorrect password") {
	//         setTopuperror("! incorrect passord")
	//       } else if (result == "no user found") {
	//         setTopuperror("! no user exist with this mail id")
  
	//       }
	//     }).catch((err) => {
	//       alert("server issue occured")
	//       console.log("server issue occured")
	//     })
  
	// }
  
	// function login() {
	//   window.open(
	//     `http://localhost:8080/auth/google/callback`,
	//     "_self"
  
	//   );
	// }
	async function sendOtp() {
	  await axios.post("/EmpProfile/otpSignUp", { PhoneNumber })
		.then((res) => {
		  if (res.data == "otp sent") {
			setshowotp(true)
		  }
		})
	}
  
	async function confirmOtp() {
	  let isApproved = false
	  setLoader(true)
	  setTimeout(async () => {
  
		await axios.post("/EmpProfile/verifyOtp", { ipAddress, otp, isApproved })
		  .then((res) => {
			let result = res.data
			if (result == "incorrect Otp") {
			  alert("incorrect OTP")
			}
			if (result.token) {
			  navigate("/Search-Candidate")
			  localStorage.setItem("EmpLog", JSON.stringify(result.token))
			  let empId = result.id
			  localStorage.setItem("EmpIdG", JSON.stringify(empId))
			  // localStorage.setItem("EmpIdG", JSON.stringify(GuserId))
  
			}
			setLoader(false)
  
		  }).catch((err) => {
			alert("some thing went wrong")
		  })
	  }, 1000);
	  setLoader(false)
	}

	if (!isOpen) return null;

	function microsoftLogin() {
		instance.loginPopup(loginRequest)
			.then(async response => {
				// console.log(response)
				let name = response.account.name
				let email = response.account.username
				let isApproved = false
				await axios.post("/EmpProfile/Glogin", { ipAddress, email, name, isApproved })
				.then((response) => {
				  let result = response.data
				  let token = result.token
				  let GuserId = result.id
				  if (result.status == "success") {
					localStorage.setItem("EmpLog", JSON.stringify(btoa(token)))
					localStorage.setItem("EmpIdG", JSON.stringify(GuserId))
					navigate("/Search-Candidate", { state: { gserid: GuserId } })
					onClose()
				  }

					}).catch((err) => {
						alert("server issue occured")
					})
			})
			.catch(error => {
				// console.log("Login error", error);
				// alert("some thing went wrong")
			});
	}


	return (
		<>
		{/* <div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				background: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex:100
			}}
		> */}
				 <div className={styles.ModelWrapper}>
			
<p onClick={onClose} style={
					{position:"absolute", marginLeft:"85%", marginTop:"0px", cursor:"pointer", display:"inline"}}>
					
                    <i className="fas fa-times" style={{fontSize:"large"}}></i>
				</p>

				{/* {children} */}
                <>

      <div className={styles.BothsignUpWrapperModel}>
        <p className={styles.Loginpage}>Employer Login </p>


        {/* <input maxLength="10" className={styles.inputs} type="number" placeholder='enter phone Number'
          value={PhoneNumber} autoComplete="on" onChange={(e) => { setPhoneNumber(e.target.value) }} />

        {showotp ?
          <>
            <input className={styles.inputs} placeholder='enter OTP'
              value={otp} onChange={(e) => { setotp(e.target.value) }} />
            <button className={`${styles.button} ${styles.inputs}`} onClick={confirmOtp}>Confirm OTP</button>

            <p style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => { setshowotp(false); setPhoneNumber(""); setotp("") }}>Want to change the number?</p>


          </>
          :
          PhoneNumber.length == 10 ?
            <button className={`${styles.button} ${styles.inputs}`} onClick={sendOtp} disabled>Send OTP</button>
            :
            <button className={`${styles.button} ${styles.inputs}`} onClick={() => { alert("invalid phone number") }}>Send OTP</button>

        }
        {Loader ?
          <div style={{ marginLeft: "10%" }}>
            <TailSpin color=" rgb(40, 4, 99)" height={40} />
          </div>
          : ""}
        
        <h4 className={styles.OR}>OR</h4> */}


        <div className={styles.signUpWrapper} onClick={login} >
          <div className={styles.both}>
            <img className={styles.google} src={GoogleImage} />
            <p className={styles.signUpwrap} >Continue with Google</p>
          </div>
        </div>
        

        {/* <div className={styles.signUpWrapper} onClick={getToken} >
          <div className={styles.both}>
            <img className={styles.google} src={MicosoftImage} />
            <p className={styles.signUpwrap} >Get Microsoft Token</p>
          </div>
        </div> */}

        <div className={styles.signUpWrapper} onClick={microsoftLogin} >
          <div className={styles.both}>
            <img className={styles.google} src={MicosoftImage} />
            <p className={styles.signUpwrap} >Continue with Microsoft</p>
          </div>
        </div>
        {/* <div className={styles.signUpWrapper}  >
          <div className={styles.both}>
            <img className={styles.google} src={linkedIn} />
            <p className={styles.signUpwrap} >Continue with Linkedin</p>
          </div>
        </div>
        <div className={styles.signUpWrapper} onClick={register} >
          <div className={styles.both}>
            <img className={styles.google} src={linkedIn} />
            <p className={styles.signUpwrap} >register microsoft</p>
          </div>
        </div> */}
		
		
        {/* <div className={styles.signUpWrapper}  >
          <div className={styles.both}>
            <img className={styles.google} src={github} />
            <p className={styles.signUpwrap} >Continue with Github</p>
          </div>
        </div> */}
		
      </div>

				</>
                
			</div>
		{/* </div> */}
		</>
	);
};

export default Modal;
