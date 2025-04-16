import React from 'react'
import styles from "./login.module.css"
import { useState , useEffect} from 'react'
import {useNavigate, useSearchParams} from "react-router-dom"
import axios from 'axios'


function SearchParamsEmp() {
  const [email, setEmail ] = useState("")  
  const[seachParams, setseachParams] = useSearchParams()

  let navigate = useNavigate()
  
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
    navigate(`/BIAdd@Gmaile?${seachParams}`)
    }
  return (
    <>
    
    <div className={styles.BothsignUpWrapper}>
      <p>Employee Login</p>

          <input className={styles.inputs} type="mail" placeholder='enter email id'
            value={email} autoComplete="on" onChange={(e) => { setEmail(e.target.value); setseachParams({q:e.target.value}) }} />
           {/* <input className={styles.inputs} type={showPassword?"tex":"password"} placeholder='enter password'
           value={password} onChange={(e) => { setPassword(e.target.value) }} />


<label> <input  type="checkbox" value={showPassword} onClick={()=>{setshowPassword((prev)=>!prev)}}/><span>show password</span></label>
      */}

          <button className={`${styles.button} ${styles.inputs}`} onClick={Adminlogin}  >Login</button>
          {/* <button className={`${styles.button} ${styles.inputs}`} onClick={AdminRegister}>Register</button> */}
      </div>
    </>
  )
}

export default SearchParamsEmp
