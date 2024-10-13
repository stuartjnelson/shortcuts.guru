import { useState, useEffect } from "react";
import type { Shortcut } from "./quizTypes";
import { getKeyString } from "./quizUtils";
import FormRadioGroup from "../components/FromRadioGroup";

interface QuizQuestionProps {
  question: Shortcut;
  questionIndex: number;
  totalQuestions: number;
  onSaveAnswer: (answer: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  questionIndex,
  totalQuestions,
  onSaveAnswer,
}) => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  useEffect(() => {
    if (question.keys.length > 0) {
      const handleKeyPress = (e: KeyboardEvent) => {
        const key = getKeyString(e);
        setPressedKeys((prevKeys) => [...prevKeys, key]);
      };

      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [question]);

  const clearKeys = () => setPressedKeys([]);
  const clearRadioSelection = () => setSelectedAnswer("");

  const resetQuestion = () => {
    clearKeys();

    clearRadioSelection();
  };

  const handleSubmit = () => {
    // If there are user entered keys
    if (question.isEnterKeyTypeQuestion) {
      onSaveAnswer(pressedKeys.join(" + "));

      // Clear selection when submitting
      clearKeys();
    } else {
      onSaveAnswer(selectedAnswer);

      resetQuestion();
    }
  };

  return (
    <div className="flex flex-col gap-y-5 items-center">
      <h2>
        Question {questionIndex + 1} of {totalQuestions}
      </h2>
      {question.isEnterKeyTypeQuestion ? (
        <>
          <p>Press this shortcut: {question.description}</p>
          <p>Keys pressed: {pressedKeys.join(" + ")}</p>
          <button onClick={clearKeys}>Clear</button>
          <button onClick={handleSubmit}>Next Question</button>
        </>
      ) : (
        <>
          <FormRadioGroup
            className="mb-8"
            legend={`What does the shortcut ${question.keys.join(" + ")} do?`}
            // legend={"Testing 123"}
            options={question.multipleChoiseOptions}
          />

          <button onClick={handleSubmit} disabled={!selectedAnswer}>
            Next Question
          </button>
        </>
      )}
    </div>
  );
};

export default QuizQuestion;
