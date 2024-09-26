import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz/select");
  };

  return (
    <div className="flex flex-col gap-y-10 items-center">
      <h1>Welcome to Shortcuts Quiz</h1>
      <button onClick={startQuiz}>Start a New Quiz</button>
    </div>
  );
}

export default Homepage;
