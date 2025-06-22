import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from "./StudentProfile.module.css"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import profileDp from "../img/user_3177440.png"
import Swal from "sweetalert2";
import { Puff } from  'react-loader-spinner'
import useScreenSize from '../SizeHook';
import Arrowimage from '../img/icons8-arrow-left-48.png'
import Footer from '../Footer/Footer';
import { BsStarFill, BsStarHalf, BsStar, BsFillStarFill, BsStars } from "react-icons/bs";

function CheckEmpHalfProfile() {
    
    let navigate= useNavigate()
    const [profileData, setProfileData] = useState([])
const [PageLoader, setPageLoader] = useState(false)
const screenSize = useScreenSize();

    
    let studId = JSON.parse(localStorage.getItem("StudId"))
    let params =useParams()

    async function getProfile() {
        window.scrollTo({
            top:0
        })
  setPageLoader(true)
  const headers = { authorization: 'BlueItImpulseWalkinIn'};
        await axios.get(`/EmpProfile/getProfile/${atob(params.empId)}`, {headers})
            .then((res) => {
                let result = res.data.result  
                setProfileData([result])
  setPageLoader(false)

            }).catch((err) => {
            alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getProfile()
    }, [])

    function goback (e){
    e.preventDefault();

    }
    
    const[verification , setVerification]=useState(false)

  const [companyName, setCompanyName] = useState("");
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(()=>{
      console.log("abc", profileData[0]?.CompanyName);
      setCompanyName(profileData[0]?.CompanyName)
  },[profileData])

  const getCompanyRating = () => {
    setPageLoader(true)
    setLoading(true);
    setError("");
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      query: companyName,
      fields: ["name", "rating", "user_ratings_total"],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      setLoading(false);

      // Delay for 3 seconds before updating rating and hiding loader
      setTimeout(() => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results.length > 0
        ) {
          const place = results[0];
          setRating({
            name: place.name,
            rating: place.rating,
            total: place.user_ratings_total,
          });
        } else {
          setError("Company not found or no rating available.");
        }
        setPageLoader(false);
      }, 2000); // 3-second delay
    });
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25 && rating % 1 <= 0.75;
    const totalStars = 5;
    const stars = [];
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsFillStarFill key={`full-${i}`} color="#FFD700" size={20} />);
    }
  
    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" color="#FFD700" size={20} />);
    }
  
    const remaining = totalStars - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(<BsStars key={`empty-${i}`} color="#ccc" size={20} />);
    }
  
    return <div style={{ display: "inline-flex", gap: "2px" }}>{stars}</div>;
  };
  
    return (
        <>
         
        <div style={{display:"flex"}}>
          <img style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"8%", cursor:"pointer",
             width:"28px"}} onClick={(e)=>{navigate(-1); goback(e)}}  src={Arrowimage} />
    {/* <p style={{marginLeft:"30%"}}><b>Company Details </b></p> */}
    </div>

{

profileData.map((item, i) => {
    return (
        <div class={styles.imgBgv} key={i}>
          <img className={styles.imageV} src={item.image?item.image : profileDp}/>
                      {verification&&(
                        <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
                        <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginTop: "20px" }} />
                        <p>Verification in progress</p>
                        </div>)
                        
                      }
            <button onClick={getCompanyRating} disabled={!companyName || loading} style={{marginRight:"1%",marginTop:"0px"}} className={styles.validateBtnMobile}>
                         {loading ? "Validating" : "Background Check"}
              </button>            
           {/* {PageLoader ? (
            <div style={{display:"flex", flexDirection:"column"}}>
  <Puff
  height="90"
  width="90"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperClass="puff-loader"
/>

  <p style={{marginLeft:"-20px"}}>Verification in progress</p>
  </div>
) : (
  rating && (
    <div style={{ marginTop: "20px", marginRight: "10px" }}>
      <p style={{display:"flex", alignItems:"center", gap:"10px"}}>
        Rating: {rating.rating}
        {" "}
        {renderStars(rating.rating)}
      </p>
    </div>
  )
  
)} */}
      
                   
                        
        </div>
    )

})
    }

                                          
{screenSize.width>850?

           <>
<div className={styles.uiwrapper}>
            <ul className={styles.ul}>
                {/* <li className={styles.li}><b>Name </b></li> */}
                <li className={styles.li} style={{backgroundColor:"rgb(40, 4, 99)", color:"rgb(40, 4, 99)"}}>`</li>
                <li className={styles.li}><b>H.R Name</b></li>
                <li className={styles.li}><b>Company Address</b></li>
                <li className={styles.li}><b>Company Website</b></li>
                {PageLoader ? (
                  <div style={{display:"flex", justifyContent:"center", width:"100vw", marginLeft:"-140px"}}>
            <div style={{display:"flex", flexDirection:"column", marginLeft: "120px" }}>
  <Puff
  height="90"
  width="90"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperClass="puff-loader"
/>

  <p style={{marginLeft:"-20px"}}>Verification in progress</p>
  </div>
  </div>
) : (
  rating && (
    
    <div style={{ marginTop: "20px", marginLeft: "90px",width:"347px" }}>
      <p style={{display:"flex", alignItems:"center", gap:"10px"}}>
        Rating: {rating.rating}
        {" "}
        {renderStars(rating.rating)}(as per google reviews)
      </p>
    </div>
  )
  
)} 

                {/* <li className={styles.li}><b>Email  Address</b></li>
                <li className={styles.li}><b>Phone  Number</b></li>
                <li className={styles.li}><b>Aadhar</b></li>
                <li className={styles.li}><b>Pan  Card</b></li>
                <li className={styles.li}><b>CompanyContact</b></li>
                <li className={styles.li}><b>Company Email</b></li>
                <li className={styles.li}><b>Company GSTIN</b></li>
                <li className={styles.li}><b>Type of Organisation</b></li>
                <li className={styles.li}><b>Ip Address</b></li>

                <li className={`${styles.li} ${styles.Approval}`}  ><b>Status</b></li> */}
                {/* <li className={`${styles.li} ${styles.Approval}`}  ><b>Reject</b></li> */}
                {/* <li className={`${styles.li} ${styles.Approval}`} ><b>Delete</b></li> */}
                {/* <li className={`${styles.li}`} style={{height:"30px"}}><b>Message</b></li> */}

                                </ul>
   
            {

                profileData.map((item, i) => {
                    return (
                        <ul className={styles.ulR} key={i}>
                       <li className={` ${styles.Hli}`} style={{backgroundColor:"rgb(40, 4, 99)"}}> 
                        <div style={{color:"white", marginLeft:"-160px", fontWeight:"bold"}}>{item.CompanyName?item.CompanyName:<li className={styles.Nli}>Not Updated</li>} </div></li>
                            <li className={`${styles.Hli}`}>{item.name?item.name:<li className={styles.Nli} >Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.CompanyAddress?item.CompanyAddress:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.CompanyWebsite?item.CompanyWebsite:<li className={styles.Nli}>Not Updated</li>}</li>
                             
                            {/* <li className={`${styles.Hli}`}>{item.email?item.email:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.phoneNumber?item.phoneNumber:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Aadhar?item.Aadhar:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.panCard?item.panCard:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.CompanyContact?item.CompanyContact:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.CompanyEmail?item.CompanyEmail:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.CompanyGSTIN?item.CompanyGSTIN:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.TypeofOrganisation?item.TypeofOrganisation:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.ipAddress?item.ipAddress:<li className={styles.Nli}>could not fetch the Ip Address</li>}</li>
                     
                       <li className={` ${styles.Hli} ${styles.Approval}`}>
                        {
                        item.isApproved?
                  <button className={styles.Approved} onClick={()=>{DisApprove(item._id, false)}}>Approved&#10004;</button>
                  :
                  item.isReject?
                    <button className={styles.Rejected} onClick={()=>{unReject(item._id, false)}}>Rejected&#10004;</button>
                    :
                    <>
                  <button className={styles.Approve} onClick={()=>{Approve(item._id, true)}}>Approve</button>&nbsp;
                  <button className={styles.Approve} onClick={()=>{Reject(item._id, true)}}>Reject</button> 
                  </>                  
                  }
                  </li>*/}

{/* // <li className={` ${styles.Hli} ${styles.Approval}`}>:}
//                   </li> */}              
                   {/* <li className={`${styles.Hli}`} >
                    <button className={styles.DeleteButton} onClick={() => { DeleteEmpProfile(item._id) }} >Delete</button></li>                      
                    */}
                                        {/* <li style={{height:"30px"}} className={` ${styles.Hli}`}> <input style={{height:"24px", width:"80%", marginLeft:"11%"}}  value ={message} onChange={(e)=>{setmessage(e.target.value)}} />
                     <button onClick={()=>{sendMessage(item._id)}}>Send</button> </li> */}

                        </ul>
                    )
                })

            }
            </div>
                          
        </>
            :
            <>
            <div id={styles.JobCardWrapper} >

{profileData.map((job, i) => {
    return (
        <>
            <div className={styles.JobCard} key={i}>
                <div style={{ display: "flex" }}>

                <div className={styles.LeftTable}>
                                                <span className={styles.span} >Name  :   </span><br></br>
                                                <span className={styles.span}> Company Name: </span><br></br>
                                                <span className={styles.span}> Company Website: </span><br></br>
                                                {/* <span className={styles.span}>  Email Id :  </span><br></br>
                                                <span className={styles.span}>  Phone number : </span><br></br>
                                                <span className={styles.span}>  Aadhar Id : </span><br></br>
                                                <span className={styles.span} >Pan Card:</span><br></br>
                                                <span className={styles.span} > Company Contact:</span><br></br>
                                                <span className={styles.span}> Company Email: </span><br></br>
                                                <span className={styles.span}> Company GSTIN: </span><br></br>
                                                <span className={styles.span}> Organisation Type: </span><br></br>
                                                <span className={styles.span}> Ip Address: </span><br></br>
                                             */}
                                            </div>

                                            <div className={styles.RightTable}>
                                                <span className={styles.span} >  <span style={{ color: "blue" }}  >{job.name}</span> </span><br></br>
                                                <span className={styles.span}> {job.CompanyName ? <span style={{ color: "blue" }}  >{job.CompanyName} </span> : <span style={{ color: "red" }}>Not updated</span>} </span><br></br>
                                                <span className={styles.span}> {job.CompanyWebsite ? <span style={{ color: "blue" }}  >{job.CompanyWebsite} </span> : <span style={{ color: "red" }}>Not updated</span>} </span><br></br>
                                                {/* <span className={styles.span}> {job.email ? <span style={{ color: "blue" }}  >{job.email} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span}>   {job.phoneNumber ? <span style={{ color: "blue" }}  >{job.phoneNumber} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span}>   {job.Aadhar ? <span style={{ color: "blue" }}  >{job.Aadhar} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span} > {job.panCard ? <span style={{ color: "blue" }}  >{job.panCard} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span} >  {job.CompanyContact ? <span style={{ color: "blue" }}  >{job.CompanyContact} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span}>  {job.CompanyEmail ? <span style={{ color: "blue" }}  >{job.CompanyEmail}</span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span}>  {job.CompanyGSTIN ? <span style={{ color: "blue" }}  >{job.CompanyGSTIN} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span}>  {job.TypeofOrganisation ? <span style={{ color: "blue" }}  >{job.TypeofOrganisation} </span> : <span style={{ color: "red" }}>Not updated</span>}</span><br></br>
                                                <span className={styles.span}>  {job.ipAddress ? <span style={{ color: "blue" }}  >{job.ipAddress} </span> : <span style={{ color: "red" }}>could not fetch the Ip Address</span>}</span><br></br>
                                             */}
                                            </div>                                           
                                        </div>

                                        <div className={styles.Down}>
                                        <span className={`${styles.span} ${styles.LastDown}`}>Company Address:  {job.CompanyAddress ? <span className={styles.span} style={{ color: "blue", marginLeft:"5px" }}  >{job.CompanyAddress} </span> : <span style={{ color: "red", marginLeft:"5px" }} >Not updated</span>}</span><br></br>
                        
{/*                                       
                                        <span className={styles.span}> Account Status:  {job.isApproved?
                  <button  className={styles.Approved} onClick={()=>{DisApprove(job._id, false)}}>Approved</button>
                  :<button className={styles.Approve} onClick={()=>{Approve(job._id, true)}}>Approve</button>}</span>
                      
                      <span className={styles.span} > {job.isReject?
                  <button className={styles.Approved} onClick={()=>{unReject(job._id, false)}}>Rejected&#10004;</button>
                  :<button  className={styles.Approve} onClick={()=>{Reject(job._id, true)}}>Reject</button>}</span><br></br>

                  <p className={styles.span}> Message: <input style={{height:"24px", width:"60%", marginLeft:"1%"}}  value ={message} onChange={(e)=>{setmessage(e.target.value)}} />
                     <button onClick={()=>{sendMessage(job._id)}}>Send</button></p>  */}
                                        </div>                                    
            </div>
            {PageLoader ? (
            <div style={{display:"flex", flexDirection:"column", marginLeft: "120px" }}>
  <Puff
  height="90"
  width="90"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperClass="puff-loader"
/>

  <p style={{marginLeft:"-20px"}}>Verification in progress</p>
  </div>
) : (
  rating && (
    
    <div style={{ marginTop: "20px", marginLeft: "32px",width:"318px" }}>
      <p style={{display:"flex", alignItems:"center", gap:"10px"}}>
        Rating: {rating.rating}
        {" "}
        {renderStars(rating.rating)}
      </p>
      <p>(as per google reviews)</p>
    </div>
  )
  
)} 
        </>
    )
})}

</div>
<div style={{marginTop:"90px"}}>
                      <Footer/>
                    </div>
            </>

          }
                          

        </>
    )
}

export default CheckEmpHalfProfile