import React, { useState } from 'react';
import styles from "./Allobs.module.css";

const PostFraudForm = () => {
  const [misuseType, setMisuseType] = useState('');
  const [description, setDescription] = useState('');
  const [evidence, setEvidence] = useState(null);
  const [email, setEmail] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleFileChange = (e) => {
    setEvidence(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !misuseType) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('misuseType', misuseType);
    formData.append('description', description);
    if (evidence) formData.append('evidence', evidence);
    if (email) formData.append('email', email);

    // Simulate form submission
    console.log('Submitted Data:', Object.fromEntries(formData.entries()));

    // Clear form fields
    setMisuseType('');
    setDescription('');
    setEvidence(null);
    setEmail('');

    // Show success message
    setShowSuccessMessage(true);

    // Optionally hide message after a few seconds
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCancel = () => {
    setMisuseType('');
    setDescription('');
    setEvidence(null);
    setEmail('');
    setShowSuccessMessage(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> Report Misuse of ITWalkin</h2>
      
      {showSuccessMessage && (
        <div className={styles.successMessage}>
          ✅ Successfully submitted!
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
           Select Type of Misuse:
          <select
            value={misuseType}
            onChange={(e) => setMisuseType(e.target.value)}
            required
            className={styles.select}
          >
            <option value="">-- Select --</option>
            <option value="Fake job postings">Fake job postings</option>
            <option value="Impersonation">Impersonation</option>
            <option value="Scam">Scam</option>
          </select>
        </label>

        <label className={styles.label}>
           Describe the Issue (Required)
          <textarea
          style={{fontFamily:"serif"}}
            placeholder="Provide details of the misuse..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={styles.textarea}
          />
        </label>

        {/* <label className={styles.label}>
          📎 Upload Evidence (Optional)
          <input type="file" onChange={handleFileChange} />
        </label> */}

        <label className={styles.label}>
           Your Contact Email (Optional)
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className={styles.input}
          />
        </label>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>✅ Submit Report</button>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>❌ Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PostFraudForm;
