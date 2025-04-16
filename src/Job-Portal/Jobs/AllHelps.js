import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import Footer from "../Footer/Footer";
import useScreenSize from "../SizeHook";
import styles from "./Allobs.module.css"
import { useNavigate } from "react-router-dom";
import {jobTags} from '../Tags'

function AllHelps({ Active, getjobs, setJobs, setActive, count, setCount,nopageFilter,setNoPageFilter
}) {
  const [Contact, setContact] = useState([]);
  const screenSize = useScreenSize();
  const[jobsPerPageValue,setJobsPerPageValue]=useState(10);

  const lastIndex = currentPage * recordsPerPage //10
  const firstIndex = lastIndex - recordsPerPage //5
  // const records = jobs.slice(firstIndex, lastIndex)//0,5
  // const npage = Math.ceil(jobs.length / recordsPerPage) // last page
  const npage=1;
  const number = [...Array(npage + 1).keys()].slice(1)
  const navigate = useNavigate();
//  let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageSearchHome"))

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setrecordsPerPage] = useState(10)


  function handleRecordchange(e) {
    // sessionStorage.setItem("recordsperpageHome", JSON.stringify(e.target.value));
    // let recordsperpage = JSON.parse(sessionStorage.getItem("recordsperpageHome"))
    setJobsPerPageValue(Number(e.target.value));
    setrecordsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  function firstPage() {
    setCurrentPage(1)
  }

  function previous() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function next() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }
  function last() {
    setCurrentPage(npage)
  }


  async function getContact() {
    await axios.get("/admin/getWebsiteDetails").then((res) => {
      let result = res.data.result;
      setContact(result[0].Contact);
    });
  }

  useEffect(() => {
    getContact();
  }, []);

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

     async function filterByJobTitle(key) {

      if(count==1){
        setJobs("")
  
      }
      setCount(prev=>prev+1)
  
      const isIndex=Active.findIndex((present)=>{
  return(
    present===key
  )
      })
      if(isIndex<0){
      setActive([...Active, key])
      }else{
        const IndexId=Active.findIndex((present)=>{
          return(
            present==key
          )
              })
              Active.splice(IndexId,1)
                  if(Active.length===0){
        getjobs()
      }
      if(helpData.length>0){
           let removedItems =helpData.filter((tags)=>{
              return( 
                !tags.Tags.includes(key)
                  
          )
        }) 
        setJobs(removedItems)
        return false
      }
    }
  
      
    }


  return (
    <>
      
      {screenSize.width>850?
      <>
       <h2 style={{marginLeft:"1%", fontWeight:"800", marginTop:"5px", marginBottom:"-15px"}}>Help Questions</h2>
      <div className={styles.JobtitleFilterWrapper}>
            <buton className={ Active.length===0? styles.active:styles.JobtitleFilter} onClick={() => { getjobs() }}>All</buton>
          
            {
              jobTags.map((tags, i) => {
                return (
                                   
                  <button disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                    className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                    styles.TagHeading: 
                    
                    Active.findIndex(  (present)=>{
                      return(
                        present===tags.value
                      )
                          }) >=0?
                     styles.active : styles.JobtitleFilter} onClick={ () => {  filterByJobTitle(tags.value) }}>{tags.value} </button>
                
                  )
              })
            }
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {nopageFilter ?
              <p style={{ fontWeight: 400, marginLeft: "10px" }}>Displaying <span style={{ color: "blue" }}>{helpData.length} </span>Help questions with following matching tags:
              <span style={{ color: "blue" }}>{Active.toString()}</span></p>
              :
              <p style={{ fontWeight: 400, marginLeft: "10px" }}>showing {firstIndex + 1} to {lastIndex} latest helps</p>
            }
            <div className={styles.navigationWrapper}>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward' ></i>
              </button>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={previous}>
                <i class='fas fa-caret-square-left'></i>
              </button>
              <span>{currentPage}</span>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={next}>
                <i class='fas fa-caret-square-right'></i>
              </button>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={last}>
                <i class='fas fa-step-forward'></i>
              </button>
            </div>
          </div>
          <div style={{ marginBottom: "5px", marginTop: "0", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select> Help Questions per page
          </div>


      <div className={styles.Uiwarpper} style={{marginTop:"20px"}}>
            <ul className={styles.ul} style={{ color: 'white', fontWeight: "bold" }}>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.BlogJtitle}`}>Help Title</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.BlogSource}`}>Source</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.BlogCompanyName}`}>Company Name</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.BlogCompanyName}`}>Posted by</li>
              <li style={{ backgroundColor: " rgb(40, 4, 99)", }} className={`${styles.li} ${styles.Blogdate}`}>Posted Date
              </li>
              
              <li style={{ backgroundColor: " rgb(40, 4, 99)" }} className={`${styles.li} ${styles.BlogApply}`}>View Answer</li>

            </ul>

            {helpData.map((item) => (
             <ul key={item.id} className={styles.ul}>
               <li className={`${styles.li} ${styles.BlogJtitle}`} >{item.question}</li>
               <li className={`${styles.li} ${styles.BlogSource}`}>{item.source}</li>
               <li className={`${styles.li} ${styles.BlogCompanyName}`}>{item.companyName}</li>
               <li className={`${styles.li} ${styles.BlogCompanyName}`}>{item.postedby}</li>
               <li className={`${styles.li} ${styles.Blogdate}`}>{item.postedDate}</li>
               <li className={`${styles.li} ${styles.BlogApply}`}>
                 <button   onClick={() => navigate(`/support/help/${btoa(item.id)}`, { state: { helpItem: item } })
}  style={{ cursor: "pointer", padding: "5px 10px", background: "#280463", color: "white", border: "none", borderRadius: "4px" }}>
                   {item.view}
                 </button>
              </li>
         </ul>
  ))}
           
     </div>
     <div style={{display:"flex",marginTop:"30px",justifyContent:"space-between"}}>
     
      <div style={{ marginBottom: "5px", marginTop: "0px", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select> Help Questions per page
     </div>

     <div>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward' ></i>
              </button>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={previous}>
                <i class='fas fa-caret-square-left'></i>
              </button>
              <span>{currentPage}</span>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={next}>
                <i class='fas fa-caret-square-right'></i>
              </button>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={last}>
                <i class='fas fa-step-forward'></i>
              </button>
      </div>
     </div>     
     </>
     :<>
     <h2 style={{marginLeft:"3%", fontWeight:"800", marginTop:"5px", marginBottom:"-15px"}}>Help Questions</h2>
     <div className={styles.JobtitleFilterWrapperMobile}>
            <buton className={ Active.length===0? styles.active:styles.JobtitleFilter} onClick={() => { getjobs() }}>All</buton>
            {
              jobTags.map((tags, i) => {
                return (
                                   
                  <button disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" } 
                    className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" || 
                    tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
                    styles.TagHeading: 
                    //  Active === tags.value ? 
                    Active.findIndex(  (present)=>{
                      return(
                        present===tags.value
                      )
                          }) >=0?
                     styles.active : styles.JobtitleFilter} onClick={ () => {  filterByJobTitle(tags.value) }}>{tags.value} </button>
                
                  )
              })
            }
          </div>
          <div style={{ marginBottom: "5px", marginTop: "10px", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
              
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select>  Help Questions per page
          </div>
          <div className={styles.navigationWrapper} style={{textAlign:"left"}}>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward' ></i>
              </button>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={previous}>
                <i class='fas fa-caret-square-left'></i>
              </button>
              <span>{currentPage}</span>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={next}>
                <i class='fas fa-caret-square-right'></i>
              </button>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={last}>
                <i class='fas fa-step-forward'></i>
              </button>
            </div>
     {helpData.map((item) => (
         <div className={styles.helpCard}>
          <div style={{fontWeight:"500",fontSize:"18px"}}>
            {item.question}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"10px", marginTop:"10px"}}>
            <span>Posted By: {item.postedby}</span>
            <span>Posted On: {item.postedDate}</span>
          {/* </div>
          <div style={{display:"flex",gap:"10px", marginTop:"10px"}}> */}
            <span>Source: {item.source}</span>
            <span>Company name: {item.companyName}</span>
          </div>
          <button   onClick={() => navigate(`/support/help/${btoa(item.id)}`, { state: { helpItem: item } })}  style={{marginTop:"10px", cursor: "pointer", padding: "5px 10px", background: "#280463", color: "white", border: "none", borderRadius: "4px" }}>
                   {item.view}
          </button>
         </div> 

     ))}
      <div style={{ marginBottom: "5px", marginTop: "10px", marginLeft: "10px" }}>
            Show  <select onChange={(e) => { handleRecordchange(e) }}>
             
              <option selected={jobsPerPageValue==10} value={10}>10</option>
              <option selected={jobsPerPageValue==25} value={25}>25</option>
              <option selected={jobsPerPageValue==50} value={50}>50</option>
              <option selected={jobsPerPageValue==100} value={100}>100</option>
            </select> Help Questions per page
          </div>
          <div className={styles.navigationWrapper} style={{textAlign:"left"}}>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={firstPage}>
                <i class='fas fa-step-backward' ></i>
              </button>
              <button disabled={currentPage === 1} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={previous}>
                <i class='fas fa-caret-square-left'></i>
              </button>
              <span>{currentPage}</span>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={next}>
                <i class='fas fa-caret-square-right'></i>
              </button>
              <button disabled={currentPage === npage} style={{ display: "inline", margin: "5px" }} className={styles.navigation} onClick={last}>
                <i class='fas fa-step-forward'></i>
              </button>
            </div>
          <div style={{marginTop:"20px",}}>
            <Footer/>
            </div>    
     </>
   }
    </>
  );
}

export default AllHelps;


