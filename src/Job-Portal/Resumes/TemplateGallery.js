import React, { useEffect, useRef, useState } from 'react';
import './gallery.css';
import template1 from "../img/template1.png";
import template2 from "../img/template2.png";
import { useNavigate } from 'react-router-dom';

const TemplateGallery = ({ onSelect }) => {
  const [resumeAlert, setResumeAlert] = useState({ show: false, selected: null });
  const alertRef = useRef(null);

  // Close alert when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (alertRef.current && !alertRef.current.contains(event.target)) {
        setResumeAlert({ show: false, selected: null });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log(resumeAlert);
  }, [resumeAlert]);

    const navigate = useNavigate()
  return (
    <div className="template-gallery">
      <div
        style={{ position: "relative" }}
        className="template-card"
        onClick={() => setResumeAlert({ show: true, selected: 'one' })}
      >
        <img src={template1} alt="Template One" className="blurred" />
        <p>Template 1</p>
      </div>

      <div
        style={{ position: "relative" }}
        className="template-card"
        onClick={() => setResumeAlert({ show: true, selected: 'two' })}
      >
        <img src={template2} alt="Template Two" className="blurred" />
        <p>Template 2</p>
      </div>

      {/* Alert Box */}
      {resumeAlert.show && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 9998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            ref={alertRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '300px',
              padding: '20px',
              backgroundColor: 'rgb(40,4,99)',
              color: 'white',
              fontSize: '12px',
              borderRadius: '5px',
              zIndex: 9999,
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
           Ensure your profile is fully completed
            <div style={{ marginTop: '15px', display: "flex", justifyContent: "center", gap: "5px" }}>
              <button
                
                onClick={()=>{setResumeAlert({ show: false, selected: null });navigate("/My-Profile")}}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
               Yes
              </button>
              <button
                
                onClick={() => {
                  onSelect(resumeAlert.selected);
                  setResumeAlert({ show: false, selected: null });
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
               Continue to Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateGallery;
