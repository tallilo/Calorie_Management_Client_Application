import React, { useState } from "react";

function MonthlyReport({ entries, isLoading }) {
  const [date, setDate] = useState("");

  const filteredEntries = entries.filter((entry) => {
    // Parse the entry's addedDate to extract the year and month

    const entryMonth = entry.addedDate.split(".")[1];

    const entryYear = parseInt(entry.addedDate.split(".")[2].split(",")[0], 10); // Correctly parse the year
    // Already correctly parsed as an integer

    // Parse the selected date to extract the year and month
    const [selectedYear, selectedMonth] = date
      .split("-")
      .map((num) => parseInt(num, 10));

    // Compare the year and the month

    return entryYear == selectedYear && entryMonth == selectedMonth;
  });

  return (
    <div className="container mt-5">
      <h2>Monthly Report</h2>
      <input
        type="date"
        id="start"
        name="trip-start"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : filteredEntries.length > 0 ? (
        <ul>
          {filteredEntries.map((entry, index) => (
            <li key={index}>
              {`${entry.category}: ${entry.calories} calories - ${entry.description}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No entries found.</p>
      )}
    </div>
  );
}

export default MonthlyReport;
