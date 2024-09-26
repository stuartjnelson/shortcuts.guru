import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SelectionPage from "./pages/SelectionPage";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quiz/select" element={<SelectionPage />} />
        <Route path="/quiz/:appName/new" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
