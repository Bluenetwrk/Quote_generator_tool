import React, { useState } from "react";
import styles from "./SudentUpdateProfile.module.css";
import GoogleImage from "../img/icons8-google-48.png";

function SellerRegistration() {
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productServiceTag, setProductServiceTag] = useState("");
  const [city, setCity] = useState("");
  const [gst, setGst] = useState("");
  const [country, setCountry] = useState("");
  const [businessRegNo, setBusinessRegNo] = useState("");
  const [yearsInBusiness, setYearsInBusiness] = useState("");
  const [website, setWebsite] = useState("");
  const [deliveryLocations, setDeliveryLocations] = useState("");
  const [aboutSeller, setAboutSeller] = useState("");
  const [productCatalog, setProductCatalog] = useState(null);

  // ✅ Product / Service Tag options
  const productServiceTagOptions = [
    "B2B",
    "B2C",
    "SaaS",
    "Wholesale",
    "Retail",
    "Manufacturing",
    "E-commerce",
    "IT Services",
    "Logistics",
    "Consulting",
  ];

  const handleCatalogUpload = (e) => {
    const file = e.target.files[0];
    setProductCatalog(file);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formCard}>
        <h2>New Seller Registration Form</h2>

        <div className={styles.formGrid}>
          {/* Row 1 */}
          <div>
            <label>Seller / Company Name</label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div>
            <label>Business Type</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            >
              <option value="">Select business type</option>
              <option>Manufacturer</option>
              <option>Distributor</option>
              <option>Retailer</option>
              <option>Service Provider</option>
            </select>
          </div>

          {/* Row 2 */}
          <div>
            <label>Email Address</label>
            <input
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Product Category</label>
            <input
              placeholder="e.g. Electronics, Furniture, Software"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            />
          </div>

          {/* Row 3 */}
          <div>
            <label>Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label>Product / Service Tags</label>
            <select
              value={productServiceTag}
              onChange={(e) => setProductServiceTag(e.target.value)}
            >
              <option value="">Select</option>
              {productServiceTagOptions.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Row 4 */}
          <div>
            <label>City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <label>GST / Tax ID</label>
            <input
              value={gst}
              onChange={(e) => setGst(e.target.value)}
            />
          </div>

          {/* Row 5 */}
          <div>
            <label>Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select country</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>
          </div>

          <div>
            <label>Business Registration No. (optional)</label>
            <input
              value={businessRegNo}
              onChange={(e) => setBusinessRegNo(e.target.value)}
            />
          </div>

          {/* Row 6 */}
          <div>
            <label>Years in Business</label>
            <input
              value={yearsInBusiness}
              onChange={(e) => setYearsInBusiness(e.target.value)}
            />
          </div>

          <div>
            <label>Company Website (optional)</label>
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          {/* Row 7 – Textareas */}
          <div className={styles.textareaGrid}>
            <div>
              <label>Delivery Capability / Locations Served</label>
              <textarea
                value={deliveryLocations}
                onChange={(e) => setDeliveryLocations(e.target.value)}
              />
            </div>

            <div>
              <label>About Seller</label>
              <textarea
                value={aboutSeller}
                onChange={(e) => setAboutSeller(e.target.value)}
              />
            </div>
          </div>

          {/* Upload Product Catalog */}
          <div className={styles.uploadRight}>
            <label>Upload Product Catalog</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
              onChange={handleCatalogUpload}
            />
            {productCatalog && (
              <p className={styles.fileName}>
                Selected file: {productCatalog.name}
              </p>
            )}
          </div>
        </div>

        {/* Google Button */}
        <button className={styles.googleBtn}>
          <img src={GoogleImage} alt="Google" />
          Register with Google
        </button>
      </div>
    </div>
  );
}

export default SellerRegistration;
