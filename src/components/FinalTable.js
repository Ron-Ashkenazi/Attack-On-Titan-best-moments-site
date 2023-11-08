import React, { useState } from "react";
import "./Table.css";

const FinalTable = (props) => {
  const [data, setData] = useState(props?.table);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = () => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.column5 - b.column5;
      } else {
        return b.column5 - a.column5;
      }
    });
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Moment</th>
            <th>Season</th>
            <th>Episode</th>
            <th>Vote</th>
            <th onClick={handleSort}>
              Rank
              {sortOrder === "asc" ? "↑" : "↓"}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.column1}</td>
              <td>{item.column2}</td>
              <td>{item.column3}</td>
              <td>{item.column4}</td>
              <td>{item.column5}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinalTable;
