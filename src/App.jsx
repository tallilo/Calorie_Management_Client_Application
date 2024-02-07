import React, { useEffect, useState } from "react";
import "./app.css";
import MonthlyReport from "./Components/MonthlyReport";
import AddCaloriesForm from "./components/AddCaloriesForm";

import { fetchEntries } from "./hooks/fetchEntries";

function App() {
  const [costItems, setCostItems] = useState([]);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEntries(setEntries, setIsLoading);
  }, [setEntries]); // Depend on refresh to re-run

  return (
    <div className="wrapper">
      <div className="card">
        <h1 className="card__title">Cost Manager App</h1>
        <AddCaloriesForm setEntries={setEntries} />
        <MonthlyReport entries={entries} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
