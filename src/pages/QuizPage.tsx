import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import shortcuts from "../../data/vscode.json"; // Assuming you have a proper JSON

interface Shortcut {
  keys: string[];
  description: string;
  answers: string[];
}

type QuizState = "inProgress" | "questionsComplete" | "results";


function QuizPage() {
  const { appName } = useParams<{ appName: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Shortcut[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [usersAnswers, setUsersAnswers] = useState<string[]>([]);
  const [isKeyPressMode, setIsKeyPressMode] = useState<boolean>(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0)
  const [quizStageState, setQuizStageState] = useState<QuizState>("inProgress")

  useEffect(() => {
    if (appName !== "vscode") {
      navigate("/quiz/select");
    } else {
      initializeQuiz();
    }
  }, [appName, navigate]);

  const initializeQuiz = () => {
    // Randomize or set questions
    const randomQuestions = generateRandomQuestions();
    setQuestions(randomQuestions);
    setIsKeyPressMode(randomQuestions[0].keys.length > 0);
  };

  const generateRandomQuestions = (): Shortcut[] => {
    return Array.from({ length: 5 }, () => {
      const randomIndex = Math.floor(Math.random() * shortcuts.length);
      return shortcuts[randomIndex];
    });
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    const key = getKeyString(e);
    setPressedKeys((prevKeys) => [...prevKeys, key]);
  };

  const getKeyString = (e: KeyboardEvent): string => {
    const specialKeys: { [key: string]: string } = {
      Control: "Ctrl",
      Meta: "Cmd",
    };
    return specialKeys[e.key] ?? e.key.toUpperCase();
  };

  const clearKeys = () => {
    setPressedKeys([]);
  };

  const saveAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = isKeyPressMode
      ? pressedKeys.join(" + ")
      : usersAnswers[currentQuestionIndex] || "";

    const updatedAnswers = [...usersAnswers];
    updatedAnswers[currentQuestionIndex] = userAnswer;
    setUsersAnswers(updatedAnswers);

    // Move to next question
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setPressedKeys([]);
      setIsKeyPressMode(questions[currentQuestionIndex + 1].keys.length > 0);
    } else {
      setQuizStageState("questionsComplete")
    }
  };

  const submitQuiz = () => {
    const results = questions.map((question, index) => {
      const correctAnswer = question.keys.join(" + ").toLowerCase();
      const userAnswer = (usersAnswers[index] || "").toLowerCase();
      return correctAnswer === userAnswer;
    });

    const correctCount = results.filter(Boolean).length;
    setCorrectAnswerCount(correctCount)
    setQuizStageState("results")
    // alert(`You got ${correctCount} out of ${questions.length} correct!`);
  };

  const startNewQuiz = () => {
    // Navigate to the quiz page for the selected app
    navigate(`/quiz/select/`);
  };

  useEffect(() => {
    if (isKeyPressMode) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [isKeyPressMode]);

  return (
    <div className="flex flex-col gap-y-10 items-center">
      <h1>{appName} Quiz</h1>
      {questions.length > 0 && currentQuestionIndex < questions.length - 1 ? (
        <>
          <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
          {isKeyPressMode ? (
            <div className="flex flex-col gap-y-5 items-center">
              <h2>Press this shortcut: {questions[currentQuestionIndex].description}</h2>
              <p>Keys pressed: {pressedKeys.join(" + ")}</p>

              <div className="flex gap-x-3">
                <button onClick={clearKeys}>Clear</button>
                <button onClick={saveAnswer}>Next Question</button>
              </div>
            </div>
          ) : (
            <form className="flex flex-col gap-y-5 items-center">
              <h2>What's this shortcut?</h2>
              <p>{questions[currentQuestionIndex].keys.join(" + ")}</p>

              <input
                type="text"
                value={usersAnswers[currentQuestionIndex] || ""}
                onChange={(e) => {
                  const updatedAnswers = [...usersAnswers];
                  updatedAnswers[currentQuestionIndex] = e.target.value;
                  setUsersAnswers(updatedAnswers);
                }}
              />

              <button onClick={saveAnswer}>Next Question</button>
            </form>
          )}
        </>
      ) : (
        <>
          <h2>Quiz Completed!</h2>
            {quizStageState === "results" ? (
              <>
                <p>You got { correctAnswerCount } answers correct</p>
                <button onClick={startNewQuiz}>Start a new quiz</button>
              </>  
            ) : (
                // Infered that this will be shown when `quizStageState === "questionsComplete"
              <button onClick={submitQuiz}>Get your results Quiz</button>
            )}

        </>
      )}
    </div>
  );
}

export default QuizPage;
