import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import QuizResults from "./QuizResults";
import type { Shortcut, QuizState, UserAnswer } from "../types/quiz.types"; // Define these types in a `quizTypes.ts` file
import { useQuizSettings } from "../contexts/QuizSettingsContext";

const QuizPage = () => {
  const { appName } = useParams<{ appName: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Shortcut[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [usersAnswers, setUsersAnswers] = useState<UserAnswer>([]);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [quizStageState, setQuizStageState] =
    useState<QuizState>("initalising");
  
  const { questions: randomQuestions } = useQuizSettings(); 

  useEffect(() => {
    if (appName !== "vscode") {
      navigate("/quiz/select");
    } else {
      setQuestions(randomQuestions);

      setQuizStageState("inProgress");
    }
  }, [appName, navigate, randomQuestions]);

  const saveAnswer = (userAnswer: string) => {
    // Add new answer onto array
    setUsersAnswers((prevAnswers) => [...prevAnswers, userAnswer]);

    // If this is not the last question
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    // If is last question
    else {
      setQuizStageState("questionsComplete");
    }
  };

  const submitQuiz = () => {
    const correctCount = questions.reduce((count, question, index) => {
      const { isEnterKeyTypeQuestion, keys, multipleChoiseAnswer } = question;

      const correctAnswer = isEnterKeyTypeQuestion
        ? keys.join(" + ").toLowerCase()
        : multipleChoiseAnswer;
      const userAnswer = (usersAnswers[index] || "").toLowerCase();
      return correctAnswer === userAnswer ? count + 1 : count;
    }, 0);

    setCorrectAnswerCount(correctCount);
    setQuizStageState("results");
  };

  const startNewQuiz = () => {
    navigate(`/quiz/select/`);
  };

  return (
    <>
      <h1>{appName} Quiz</h1>
      {quizStageState === "inProgress" ? (
        <QuizQuestion
          question={questions[currentQuestionIndex]}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onSaveAnswer={saveAnswer}
        />
      ) : quizStageState === "questionsComplete" ? (
        <>
          <p>Congratulations! You've completed the quiz</p>
          <button onClick={submitQuiz}>Get your results</button>
        </>
      ) : (
        <QuizResults
          correctAnswerCount={correctAnswerCount}
          totalQuestions={questions.length}
          startNewQuiz={startNewQuiz}
        />
      )}
    </>
  );
};

export default QuizPage;
