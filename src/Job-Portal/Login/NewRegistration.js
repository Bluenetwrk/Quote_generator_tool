import React, { useState } from 'react';
import styles from "./NewRigister.module.css";

const NewRegistered = () => {
  
  return (
    <>
    <h2>New Registration</h2>
    <div className={styles.FullHeading}>
      <p>Company Name:</p>
      <input type="text"/>
    </div>
    </>
      )
}

export default NewRegistered;
