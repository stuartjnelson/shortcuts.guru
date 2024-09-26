import React from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz/select");
  };

  return (
    <div>
      <h1>Welcome to Shortcuts Quiz</h1>
      <button onClick={startQuiz}>Start a New Quiz</button>
    </div>
  );
}

export default Homepage;
