import React from 'react'
import styles from "./login.module.css"
import { useState , useEffect} from 'react'
import {useNavigate, useSearchParams} from "react-router-dom"
import axios from 'axios'
import { TailSpin, Puff } from "react-loader-spinner"



function SearchParamsDub() {
//   const [email, setEmail ] = useState("")  
  const[seachParams, setseachParams] = useSearchParams()

  let navigate = useNavigate()
  let email = seachParams.get("q")
  
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
  
    function Adminlogin(){
         setTimeout( async()=>{

    // console.log("funaction called")
    await axios.post("/StudentProfile/loginforAdmin",{email})
    .then((res)=>{      
    //   console.log(res.data)
      let result =res.data  
      let token = result.token
       let Id = result.id 
       if (result.status == "success") { 

        localStorage.setItem("StudLog", JSON.stringify(btoa(token)))
        navigate("/alljobs", {state:{name:result.name}})
        localStorage.setItem("StudId", JSON.stringify(Id))             
        
      }else if(result=="invalid email"){
        alert("invalid email")        
      } else if(result=="user not registered"){
        alert("user not registerd")
      }
      else{
navigate("/BIAdd@Gmail")

      }
       
    }).catch((err)=>{
        alert("some thing went wrong")
    })
navigate("/BIAdd@Gmail")
},1000)


  }
  useEffect(()=>{
    Adminlogin()
  },[])
  
  return (
    <>
    <div id={styles.inputWrapper}>
        <div  style={{marginTop:"90px", marginLeft:"43%" }}>
            {/* <p>searchparams is {email}</p> */}
            <TailSpin color=" rgb(40, 4, 99)" height={80} />


          {/* <input className={styles.inputs} type="mail" placeholder='enter email id'
            value={email} autoComplete="on" onChange={(e) => { setEmail(e.target.value); setseachParams({q:e.target.value}) }} /> */}
           {/* <input className={styles.inputs} type={showPassword?"tex":"password"} placeholder='enter password'
           value={password} onChange={(e) => { setPassword(e.target.value) }} />


<label> <input  type="checkbox" value={showPassword} onClick={()=>{setshowPassword((prev)=>!prev)}}/><span>show password</span></label>
      */}

          {/* <button className={`${styles.button} ${styles.inputs}`} onClick={Adminlogin}>Login</button> */}
          {/* <button className={`${styles.button} ${styles.inputs}`} onClick={AdminRegister}>Register</button> */}
        </div>
      </div>
    </>
  )
}

export default SearchParamsDub
