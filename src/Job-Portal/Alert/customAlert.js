// src/components/CustomAlert.js

import React from 'react';
import styles from './customAlert.module.css';

const CustomAlert = ({ show, title = 'Alert', message, onClose }) => {
  if (!show) return null;

  return (
    <div className={styles.customalertoverlay}>
      <div className={styles.customalertbox}>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose} className={styles.customalertbtn}>OK</button>
      </div>
    </div>
  );
};

export default CustomAlert;
