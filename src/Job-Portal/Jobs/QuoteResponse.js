import React, { useState, useRef } from 'react';
import styles from "./Allobs.module.css";

// Sample data
const products = [
  { slno: 1, description: 'Item A', link: '#', hsn: '1234', quantity: 2 },
  { slno: 2, description: 'Item B', link: '#', hsn: '5678', quantity: 1 },
  { slno: 3, description: 'Item C', link: '#', hsn: '9012', quantity: 4 }
];

const quotes = [
  { id: 'Quote1', prices: [100, 200, 150] },
  { id: 'Quote2', prices: [110, 190, 140] },
  { id: 'Quote3', prices: [105, 210, 135] },
  { id: 'Quote4', prices: [115, 195, 145] },
  { id: 'Quote5', prices: [100, 200, 150] },
  { id: 'Quote6', prices: [110, 190, 140] },
  { id: 'Quote7', prices: [105, 210, 135] }
];

const QuoteResponse = () => {
  const [selectedQuoteId, setSelectedQuoteId] = useState('Quote1');
  const scrollRef = useRef(null);

  const selectedQuote = quotes.find(q => q.id === selectedQuoteId);

  // Scroll horizontally by offset
  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  // Select first quote & scroll to start
  const goFirst = () => {
    setSelectedQuoteId(quotes[0].id);
    if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
  };

  // Select last quote & scroll to end
  const goLast = () => {
    setSelectedQuoteId(quotes[quotes.length - 1].id);
    if (scrollRef.current) scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth, behavior: 'smooth' });
  };

  // SVG arrow icons
  const LeftDoubleArrow = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 18 9 12 17 6" />
      <polyline points="11 18 3 12 11 6" />
    </svg>
  );

  const LeftArrow = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );

  const RightArrow = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );

  const RightDoubleArrow = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="7 18 15 12 7 6" />
      <polyline points="17 18 9 12 17 6" />
    </svg>
  );

  const btnStyle = {
    cursor: 'pointer',
    padding: '6px 12px',
    margin: '0 4px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div className={styles.Uiwarpper}>
      {/* Top Controls */}
      <div className={styles.topBar}>
        <h2 className={styles.buyerRequest}>Buyer Request</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={goFirst} style={btnStyle} aria-label="First Quote">
             <i class='fas fa-step-backward' ></i>
          </button>
          <button onClick={() => scroll(-100)} style={btnStyle} aria-label="Previous Quotes">
             <i class='fas fa-caret-square-left'></i>
          </button>

          <div
            className={styles.quoteScrollWrapper}
            ref={scrollRef}
            style={{
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              maxWidth: '400px',
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none' /* IE 10+ */
            }}
          >
            <div style={{marginTop:"-10px"}}>
            {quotes.map((quote, index) => (
              <button 
                key={index}
                className={styles.quotebtn}
                onClick={() => setSelectedQuoteId(quote.id)}
                style={{
                  display: 'inline-block',
                  marginRight: '6px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  backgroundColor: quote.id === selectedQuoteId ? 'green' : '',
                  color: quote.id === selectedQuoteId ? 'white' : '',
                }}
              >
                {quote.id}
              </button>
            ))}
            </div>
          </div>

          <button onClick={() => scroll(100)} style={btnStyle} aria-label="Next Quotes">
            {/* <RightArrow /> */}
            <i class='fas fa-caret-square-right'></i>
          </button>
          <button onClick={goLast} style={btnStyle} aria-label="Last Quote">
             <i class='fas fa-step-forward'></i>
          </button>
        </div>
      </div>

      {/* Header Row */}
      <ul className={styles.ul} style={{ color: 'white', fontWeight: 'bold' }}>
        <li className={`${styles.li} ${styles.Jtitle}`} style={{ backgroundColor: 'rgb(40, 4, 99)' }}>SL.NO</li>
        <li className={`${styles.li} ${styles.Source}`} style={{ backgroundColor: 'rgb(40, 4, 99)' }}>Description</li>
        <li className={`${styles.li} ${styles.CompanyName}`} style={{ backgroundColor: 'rgb(40, 4, 99)' }}>Link</li>
        <li className={`${styles.li} ${styles.JobType}`} style={{ backgroundColor: 'rgb(40, 4, 99)' }}>HSN code</li>
        <li className={`${styles.li} ${styles.date}`} style={{ backgroundColor: 'rgb(40, 4, 99)' }}>Quantity</li>
        <li className={`${styles.li} ${styles.Location}`} style={{ backgroundColor: 'rgb(40, 4, 99)' }}>Unit Price</li>
        <li className={`${styles.li} ${styles.Package}`} style={{ backgroundColor: 'rgb(40, 4, 99)' }}>Total Price</li>
        <li className={`${styles.li} ${styles.Skills}`} style={{ backgroundColor: 'rgb(40, 4, 99)' }}>Buyer Comments</li>
      </ul>

      {/* Quote Rows */}
      {products.map((item, idx) => {
        const unitPrice = selectedQuote?.prices[idx] ?? 0;
        return (
          <ul className={styles.ul} key={idx} >
            <li className={`${styles.li} ${styles.Jtitle}`}>{item.slno}</li>
            <li className={`${styles.li} ${styles.Source}`}>{item.description}</li>
            <li className={`${styles.li} ${styles.CompanyName}`}>
              <a href={item.link} target="_blank" rel="noreferrer">View</a>
            </li>
            <li className={`${styles.li} ${styles.JobType}`}>{item.hsn}</li>
            <li className={`${styles.li} ${styles.date}`}>{item.quantity}</li>
            <li className={`${styles.li} ${styles.Location}`}>{unitPrice}</li>
            <li className={`${styles.li} ${styles.Package}`}>{item.quantity * unitPrice}</li>
            <li className={`${styles.li} ${styles.Skills}`}></li>
          </ul>
        );
      })}

      {/* Submit Button */}
      <div style={{ display: "flex", justifyContent: "end", marginRight: "10px" }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: 'rgb(40,4,99)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            height: '32px',
            marginTop: '16px',
            marginLeft: "20px"
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuoteResponse;


