import React, { useState, useEffect } from "react";
import axios from "axios";

const DynamicTable = () => {
  const [period, setPeriod] = useState("yearly");
  const [year, setYear] = useState(new Date().getFullYear());

  const getColumnLabels = () => {
    if (period === "yearly") return ["January - December"];
    if (period === "quarterly") return ["Jan - Mar", "Apr - Jun", "Jul - Sep", "Oct - Dec"];
    if (period === "half-yearly") return ["Jan - Jun", "Jul - Dec"];
    if (period === "monthly") return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return [];
  };

  const columnLabels = getColumnLabels();
  const columns = columnLabels.length;

  const createEmptyTableData = () => Array(3).fill([]).map(() => Array(12).fill(""));

  const [dataTable1, setDataTable1] = useState(createEmptyTableData());
  const [dataTable2, setDataTable2] = useState(createEmptyTableData());

  const rowNamesTable1 = ["Bangalore", "Mumbai", "Chennai"];
  const rowNamesTable2 = ["delhi", "Kolkatta"];

  const handleInputChange = (table, row, col, value) => {
    const newData = table === 1 ? [...dataTable1] : [...dataTable2];
    newData[row][col] = value ? parseFloat(value) || 0 : "";
    table === 1 ? setDataTable1(newData) : setDataTable2(newData);
  };

  const getRowSum = (table, rowIndex) => {
    const data = table === 1 ? dataTable1 : dataTable2;
    return data[rowIndex].slice(0, columns).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  };

  const getTotalSum = (table) => {
    const data = table === 1 ? dataTable1 : dataTable2;
    return data.flat().reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  };

  const getCombinedTotalSum = () => {
    return getTotalSum(1) + getTotalSum(2);
  };

  useEffect(() => {
    setDataTable1(createEmptyTableData());
    setDataTable2(createEmptyTableData());
  }, [period, year]);

  const handleSubmit = async () => {
    const data = {
      year,
      table1Total: getTotalSum(1),
      table2Total: getTotalSum(2),
      combinedTotal: getCombinedTotalSum(),
    };

    try {
      const response = await axios.post("http://localhost:8080/api/submit-data", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Data submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <h2>Dynamic Tables</h2>

      {/* Dropdown to select period */}
      <label>Select Period: </label>
      <select value={period} onChange={(e) => setPeriod(e.target.value)}>
        <option value="yearly">Yearly</option>
        <option value="quarterly">Quarterly</option>
        <option value="half-yearly">Half-Yearly</option>
        <option value="monthly">Monthly</option>
      </select>

      {/* Dropdown to select year */}
      <label style={{ marginLeft: "10px" }}>Select Year: </label>
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        {[...Array(10)].map((_, index) => {
          const yearOption = new Date().getFullYear() - index;
          return (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          );
        })}
      </select>

      {/* Tables */}
      <h3>Table 1</h3>
      <table border="1" style={{ width: "95%", marginTop: "10px", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Location</th>
            {columnLabels.map((label, index) => (
              <th key={index}>{label}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rowNamesTable1.map((rowName, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowName}</td>
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={dataTable1[rowIndex][colIndex]}
                    onChange={(e) => handleInputChange(1, rowIndex, colIndex, e.target.value)}
                    style={{ width: "100%", textAlign: "center" }}
                  />
                </td>
              ))}
              {/* Row Total */}
              <td><strong>{getRowSum(1, rowIndex)}</strong></td>
            </tr>
          ))}
          <tr>
            <td><strong>Total</strong></td>
            {columnLabels.map((_, colIndex) => (
              <td key={colIndex}></td>
            ))}
            <td><strong>{getTotalSum(1)}</strong></td>
          </tr>
        </tbody>
      </table>

      <h3>Table 2</h3>
      <table border="1" style={{ width: "95%", marginTop: "10px", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Location</th>
            {columnLabels.map((label, index) => (
              <th key={index}>{label}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rowNamesTable2.map((rowName, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowName}</td>
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={dataTable2[rowIndex][colIndex]}
                    onChange={(e) => handleInputChange(2, rowIndex, colIndex, e.target.value)}
                    style={{ width: "100%", textAlign: "center" }}
                  />
                </td>
              ))}
              {/* Row Total */}
              <td><strong>{getRowSum(2, rowIndex)}</strong></td>
            </tr>
          ))}
          <tr>
            <td><strong>Total</strong></td>
            {columnLabels.map((_, colIndex) => (
              <td key={colIndex}></td>
            ))}
            <td><strong>{getTotalSum(2)}</strong></td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "20px", fontSize: "16px" }}>
        <strong>Combined Total Sum of Both Tables: {getCombinedTotalSum()}</strong>
      </div>

      {/* Button to submit data */}
      <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Submit Data to Backend
      </button>
    </div>
  );
};

export default DynamicTable;
