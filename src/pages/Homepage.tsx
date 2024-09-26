import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz/select");
  };

  return (
    <div className="flex flex-col gap-y-10 items-center p-5">
      <h1>Welcome to Shortcuts.guru</h1>
      <p>An interactive way to become a shortcut poweruser</p>

      <img src="./logo.png" alt="" height="350" width="350" className="invert" />

      <button onClick={startQuiz}>Start a New Quiz</button>
    </div>
  );
}

export default Homepage;
