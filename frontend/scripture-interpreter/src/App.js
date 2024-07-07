import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const verses = [
  "1 Nephi 1:1",
  "1 Nephi 3:7",
  "2 Nephi 2:25",
  // Add more verses as needed
];

function App() {
  const [selectedVerse, setSelectedVerse] = useState(verses[0]);
  const [question, setQuestion] = useState("");
  const [interpretation, setInterpretation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Verse submitted:", selectedVerse, "Question:", question); // Debug log
    try {
      const response = await axios.post("/interpret", {
        verse: selectedVerse,
        question,
      });
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
        <label>
          Select Verse:
          <select
            value={selectedVerse}
            onChange={(e) => setSelectedVerse(e.target.value)}
          >
            {verses.map((verse) => (
              <option key={verse} value={verse}>
                {verse}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ask a Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
          />
        </label>
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
