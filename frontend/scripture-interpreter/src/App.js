import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [verse, setVerse] = useState("");
  const [interpretation, setInterpretation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Verse submitted:", verse); // Debug log
    try {
      const response = await axios.post("/interpret", { verse });
      console.log("Response received:", response.data); // Debug log
      setInterpretation(response.data.interpretation);
    } catch (error) {
      console.error("There was an error interpreting the verse!", error);
    }
  };

  return (
    <div className="App">
      <h1>AI-Powered Scripture Interpreter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
          placeholder="Enter a verse"
        />
        <button type="submit">Interpret</button>
      </form>
      {interpretation && (
        <div>
          <h2>Interpretation:</h2>
          <p>{interpretation}</p>
        </div>
      )}
    </div>
  );
}

export default App;
