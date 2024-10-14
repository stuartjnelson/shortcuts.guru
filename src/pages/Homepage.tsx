import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz/select");
  };

  return (
    <>
      <h1 className="text-5xl sm:text-6xl md:text-7xl text-center text-balance">Welcome to Shortcuts.guru</h1>
      <p className="text-xl">An interactive way to become a shortcut poweruser</p>
      <img
        src="./logo.png"
        alt=""
        height="350"
        width="350"
        className="invert"
      />

      <button onClick={startQuiz}>Start a New Quiz</button>
    </>
  );
}

export default Homepage;
