import { useState } from "react";

export default function InputTable() {
  const [rows, setRows] = useState([
    { id: 1, name: "", age: "" },
    { id: 2, name: "", age: "" },
    { id: 3, name: "", age: "" },
  ]);

  const handleChange = (id, field, value) => {
    console.log(id, field, value)
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <div className="p-4">
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{row.id}</td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => handleChange(row.id, "name", e.target.value)}
                  className="border p-1 w-full"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={row.age}
                  onChange={(e) => handleChange(row.id, "age", e.target.value)}
                  className="border p-1 w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
