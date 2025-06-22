import React from 'react';
import './templateOne.css';
import { generatePDF } from './generatePDF';

const TemplateOne = ({ data }) => {
  return (
    <>
    <div className="resume-container">
      <div id="template-one" className="template-one">
        {/* Header */}
        <header className="resume-header">
          <h1 className="resume-name"> {data?.name}</h1>
          <p className="resume-contact">
            Email: {data?.email} | Phone: {data?.phone}
          </p>
        </header>

        {/* Education Section */}
        <section className="resume-section">
          <h2 className="section-title">Education</h2>
          <ul className="education-list">
            {data?.education.map((edu, index) => (
              <li key={index} className="education-item">
                <strong>{edu.degree}</strong>, {edu.university} <br />
                <span>CGPA: {edu.cgpa}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Skills Section */}
        <section className="resume-section">
          <h2 className="section-title">Skills</h2>
          <p className="skills-list">{data?.skills.join(', ')}</p>
        </section>
      </div>
    </div>
          <button className="download-button" onClick={() => generatePDF('template-one', 'template-one-resume.pdf')}>
          Download Template 1 PDF
        </button>
    </>
  );
};

export default TemplateOne;


