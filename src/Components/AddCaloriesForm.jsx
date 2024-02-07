import React, { useEffect, useState } from "react";
import { CalorieDB } from "../idb"; // Adjust the import path as necessary

function AddCalorieForm({ setEntries }) {
  const [category, setCategory] = useState("BREAKFAST");
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");
  const [db, setDb] = useState(null);

  // Initialize the IndexedDB
  useEffect(() => {
    const initDB = async () => {
      const database = new CalorieDB();
      await database.openDB("caloriesdb", 1);
      setDb(database);
    };
    initDB();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (db) {
      try {
        
        const newCategory = {
          category,
          calories: Number(calories),
          description,
          addedDate: new Date().toLocaleString(undefined, { timeZone: "UTC" }), // Corrected line
        };

        await db.addCalories(newCategory);
        setEntries((entries) => [...entries, newCategory]);
        console.log("Entry added");
        // Reset form or show a success message
        setCalories("");
        setDescription("");
      } catch (error) {
        console.error("Error adding entry", error);
        // Optionally, show an error message
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Calorie Intake</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="BREAKFAST">BREAKFAST</option>
            <option value="LUNCH">LUNCH</option>
            <option value="DINNER">DINNER</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="calories">Calories</label>
          <input
            type="number"
            className="form-control"
            id="calories"
            value={calories}
            placeholder="Enter calorie amount"
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddCalorieForm;
