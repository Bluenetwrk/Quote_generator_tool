import React from 'react';
import './templateTwo.css';
import { generatePDF } from './generatePDF';

const TemplateTwo = ({ data }) => {
  return (
    <>
    <div className="resume-two-container">
      <div id="template-two" className="template-two">
        {/* Header */}
        <div className="resume-header">
          <h1 className="name">{data.name}</h1>
          <p className="contact">{data.email} | {data.phone}</p>
        </div>

        {/* Education Section */}
        <div className="resume-section">
          <h2 className="section-title">Education</h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="education-block">
              <p className="degree"><strong>{edu.degree}</strong></p>
              <p className="university">{edu.university}</p>
              <p className="cgpa">CGPA: {edu.cgpa}</p>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="resume-section">
          <h2 className="section-title">Skills</h2>
          <ul className="skills-list">
            {data.skills.map((skill, i) => (
              <li key={i} className="skill-item">{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    
    <button className="download-btn" onClick={() => generatePDF('template-two', 'template-two-resume.pdf')}>
    Download Template 2 PDF
  </button>
  </>
  );
};

export default TemplateTwo;


