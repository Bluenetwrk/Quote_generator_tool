import { useState, useEffect } from "react"
import React from 'react'
import styles from "./login.module.css"
import axios from "axios"
import Footer from "../Footer/Footer"
import { useNavigate, Link, useLocation } from "react-router-dom";
import GoogleImage from "../img/icons8-google-48.png"
import MicosoftImage from "../img/icons8-windows-10-48.png"
import linkedIn from "../img/icons8-linked-in-48.png"
import github from "../img/icons8-github-50.png"

import { useGoogleLogin } from '@react-oauth/google';
import image from "../img/user_3177440.png"
import { TailSpin } from "react-loader-spinner"
import useScreenSize from '../SizeHook';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../Config";
// import style from "./styles.module.css"

function StudentLogin(props) {
  const { instance } = useMsal();

  const screenSize = useScreenSize();


  const [gmailuser, setGmailuser] = useState("")
  const [topErrorMessage, setTopErrorMessage] = useState("")
  const [PhoneNumber, setPhoneNumber] = useState("")
  const [otp, setotp] = useState("")
  
  const [showotp, setshowotp] = useState(false)
  const [Loader, setLoader] = useState(false)
  
const [ipAddress, setIPAddress] = useState('')

useEffect(() => {
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => setIPAddress(data.ip))
    .catch(error => console.log(error))
}, []);


  let location = useLocation()

  let navigate = useNavigate()

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
        let Gpicture = res.data.picture
        let email = res.data.email
        let name = res.data.name
        let isApproved=false
        // let image= res.data.picture
        // console.log("decoded name :", gemail)
        // console.log(" decoded id :", gname)

        await axios.post("/StudentProfile/Glogin", {ipAddress, userId, email, name, gtoken, isApproved, Gpicture })
          .then((response) => {
            let result = response.data
            let token = result.token
            let Id = result.id
        console.log(result)

            if (result.status == "success") {
              localStorage.setItem("StudLog", JSON.stringify(btoa(token)))
              navigate("/alljobs", {state:{name:result.name}})
              localStorage.setItem("StudId", JSON.stringify(Id))   
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
  const [studloggedin, setStudoggedin] = useState(false)
  const [topuperror, setTopuperror] = useState("")


  useEffect(() => {
    let studentAuth = localStorage.getItem("StudLog")
    if (studentAuth) {
      navigate("/alljobs")
    }
  })
  useEffect(() => {
    // let studentAuth = localStorage.getItem("StudLog")
    let EmployeeAuth = localStorage.getItem("EmpLog")
    if (EmployeeAuth) {
      navigate("/postedjobs")
    }
  }, [])

  useEffect(()=>{
    let adminLogin= localStorage.getItem("AdMLog")
    if(adminLogin){
      navigate("/BIAddmin@Profile")
    }
  },[])

  // async function Studlogin() {
  //   console.log("before sending to backend", email, password)
  //   await axios.post("http://localhost:8080/user/login/", { email, password })
  //     .then((response) => {
  //       console.log(response)
  //       let result = response.data
  //       console.log(result)
  //       if (result.token) {
  //         localStorage.setItem("StudLog", JSON.stringify(result.token))
  //         let sudid = result.id
  //         localStorage.setItem("StudId", JSON.stringify(sudid))
  //         // console.log(result.id)
  //         navigate("/alljobs", {state:{userId : sudid}})
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
    await axios.post("/StudentProfile/otpSignUp", { PhoneNumber })
      .then((res) => {
        if (res.data == "otp sent") {
          setshowotp(true)
        }
      })
  }

  async function confirmOtp() {
    let isApproved = false
    setLoader(true)
    setTimeout( async () => {     

    await axios.post("/StudentProfile/verifyOtp", { ipAddress, otp , isApproved})
      .then((res) => {
        //  console.log(res.data)
        let result = res.data
            let token = result.token
            let Id = result.id
            if(result=="incorrect Otp"){
            alert("incorrect OTP")}
            if (result.status == "success") {
              localStorage.setItem("StudLog", JSON.stringify(token))
              navigate("/alljobs", {state:{name:result.name}})
              localStorage.setItem("StudId", JSON.stringify(Id))
            }     
            setLoader(false)
        
      }).catch((err)=>{
        alert("some thing went wrong")
      })
    }, 1000);

    setLoader(false)
  }

  function microsoftLogin() {
		instance.loginPopup(loginRequest)
			.then(async response => {
				// console.log(response)
				let name = response.account.name
				let email = response.account.username
				let isApproved = false

				await axios.post("/StudentProfile/Glogin", { ipAddress, email, name, isApproved, })
					.then((response) => {
						let result = response.data
            console.log(result)
						let token = result.token
						let Id = result.id
						if (result.status == "success") {
							localStorage.setItem("StudLog", JSON.stringify(btoa(token)))
							navigate("/alljobs", { state: { name: result.name } })
							localStorage.setItem("StudId", JSON.stringify(Id))
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
    {/* <div className={styles.LoginpageWapper}> */}

    
      {/* <p className={styles.topuperror}>{topuperror}</p>
      <div id={styles.inputWrapper}>
        <div id={styles.inputsTag}>

          <input className={styles.inputs} type="mail" placeholder='enter mail address'
            value={email} onChange={(e) => { setEmail(e.target.value) }} />
          {error && !email ? <p >field is missing</p> : ""}

          <input className={styles.inputs} type="name" placeholder='enter password'
            value={password} onChange={(e) => { setPassword(e.target.value) }} />
          {error && !password ? <p >field is missing</p> : ""}

          <button className={`${styles.button} ${styles.inputs}`} >Login</button>
        </div>
      </div>
 */}
 
<div className={styles.BothsignUpWrapper}>
<p className={styles.Loginpage}> Job Seeker Login page  </p>

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
            PhoneNumber.length==10?
            <button className={`${styles.button} ${styles.inputs}`} onClick={sendOtp} disabled>Send OTP</button>
            :
            <button className={`${styles.button} ${styles.inputs}`} onClick={()=>{alert("invalid phone number")}}>Send OTP</button>

          }
           {Loader?
          <div style={{marginLeft:"10%"}}>
                        <TailSpin color=" rgb(40, 4, 99)" height={40} />
                        </div>
                        :""}

            <h4 className={styles.OR}>OR</h4> */}




      <div className={styles.signUpWrapper} onClick={login} >
        <div className={styles.both}>
          <img className={styles.google} src={GoogleImage} />
          <span className={styles.signUpwrap} >Continue with Google</span>
        </div>
       </div>

      <div className={styles.signUpWrapper} onClick={microsoftLogin}  >
        <div className={styles.both}>
          <img className={styles.google} src={MicosoftImage} />
          <span className={styles.signUpwrap} >Continue with Microsoft</span>
        </div>
      </div>

      {/* <div className={styles.signUpWrapper}  >
        <div className={styles.both}>
          <img className={styles.google} src={linkedIn} />
          <span className={styles.signUpwrap} >Continue with Linkedin</span>
        </div>
      </div> */}


      {/* <div className={styles.signUpWrapper}  >
        <div className={styles.both}>
          <img className={styles.google} src={github} />
          <span className={styles.signUpwrap} >Continue with Github</span>
        </div>
      </div> */}


      </div>

      {screenSize.width > 750 ?
  // <div style={{marginTop:"330px", position:"sticky", bottom:0}}>
  //         <Footer/>
  //       </div>
  ""
        :
  <div style={{marginTop:"50px",}}>

        <Footer/>   
        </div>
}

    </>

  )
}

export default StudentLogin