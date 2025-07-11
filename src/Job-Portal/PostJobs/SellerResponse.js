import React, { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import { jsPDF } from "jspdf";
import Style from "./postJobs.module.css"

const SellerResponse = (props) => {
  // useEffect(() => {
  //   const socket = socketIO.connect(props.url, {
  //     auth: {
  //       token: JSON.parse(localStorage.getItem("StudId"))
  //     }
  //   });
  // }, [props.url]);

  const [sellers, setSellers] = useState([
    { name: "Seller 1", description: "", link: "", hsnCode: "", quantity: 1, unitPrice: 0, buyerComments: "", totalPrice: 0 },
    { name: "Seller 2", description: "", link: "", hsnCode: "", quantity: 1, unitPrice: 0, buyerComments: "", totalPrice: 0 },
    { name: "Seller 3", description: "", link: "", hsnCode: "", quantity: 1, unitPrice: 0, buyerComments: "", totalPrice: 0 }
  ]);

  const generatePDF = (seller) => {
    const doc = new jsPDF();
    doc.text(`${seller.name}:`, 20, 30);
    doc.text(seller.description, 20, 40);
    doc.text(`Quantity: ${seller.quantity}`, 20, 50);
    doc.text(`Unit Price: ${seller.unitPrice}`, 20, 60);
    doc.text(`Total Price: ${seller.totalPrice}`, 20, 70);
    doc.text(`HSN Code: ${seller.hsnCode}`, 20, 80);
    doc.text(`Buyer Comments: ${seller.buyerComments}`, 20, 90);
    doc.save(`${seller.name}_quote.pdf`);
  };

  const createMailtoLink = (seller) => {
    const url = `https://example.com/quote/${seller.name}`;
    const subject = `Your Quote from ${seller.name}`;
    const body = `${seller.name} has provided the following response: \n\n${seller.description}\n\nQuantity: ${seller.quantity}\nUnit Price: ${seller.unitPrice}\nTotal Price: ${seller.totalPrice}\nHSN Code: ${seller.hsnCode}\nBuyer Comments: ${seller.buyerComments}\n\nView more at: ${url}`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className={Style.sellerContainer}>
      {sellers.map((seller, index) => (
        <div className={Style.sellerRow} key={index}>
          <div className={Style.sellerBox}>{seller.name}</div>

          <div className={Style.sellerResponse}>
            {seller.description && (
              <>
                <div><strong>Description:</strong> {seller.description}</div>
                <div>Quantity: {seller.quantity}</div>
                <div>Unit Price: {seller.unitPrice}</div>
                <div>Total Price: {seller.totalPrice}</div>
                <div>HSN Code: {seller.hsnCode}</div>
                <div>Buyer Comments: {seller.buyerComments}</div>
              </>
            )}
          </div>

          <div className={Style.sellerBox} onClick={() => generatePDF(seller)}>
            DOWNLOAD PDF
          </div>

          <a
            href={createMailtoLink(seller)}
            target="_blank"
            rel="noopener noreferrer"
            className={Style.sellerBox}
          >
            SHARE BY MAIL
          </a>
        </div>
      ))}
    </div>
  );
};

export default SellerResponse;


