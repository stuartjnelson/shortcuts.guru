import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import type { Shortcut } from "./quizTypes";
import { getKeyString } from "./quizUtils";
import FormRadioGroup from "../components/FromRadioGroup";
import useCreateInlineCodeFromStr from "../hooks/UseCreateInlineCodeFromStr";

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

  // FormRadioGroup
  //           className="mb-8"
  //           legend={`What does the shortcut \`${question.keys.join(
  //             "` + `"
  //           )}\` do?`}
  //           onChange={setSelectedAnswer}
  //           options={question.multipleChoiseOptions}
  //         />

  const formattPressedKeys = (): string => {
    const keysPressedStr = `Keys pressed: \`${pressedKeys.join("` + `")}\``;

    return useCreateInlineCodeFromStr(keysPressedStr);
  };

  return (
    <div className="flex flex-col gap-y-5 items-center">
      <h2>
        Question {questionIndex + 1} of {totalQuestions}
      </h2>
      {question.isEnterKeyTypeQuestion ? (
        <>
          <p>
            Press this shortcut: <strong>{question.description}</strong>
          </p>
          <p>
            <span dangerouslySetInnerHTML={{ __html: formattPressedKeys() }} />
          </p>
          <button onClick={clearKeys}>Clear</button>
          <button onClick={handleSubmit}>Next Question</button>
        </>
      ) : (
        <>
          {/* <p>What does the shortcut {question.keys.join(" + ")} do?</p> */}

          {/* Map over the possible answers to create radio buttons */}
          {/* {question.multipleChoiseOptions.map((answer, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`answer-${index}`}
                name="quizAnswer"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              <label htmlFor={`answer-${index}`}>{answer}</label>
            </div>
          ))} */}
          <FormRadioGroup
            className="mb-8"
            legend={`What does the shortcut \`${question.keys.join(
              "` + `"
            )}\` do?`}
            onChange={setSelectedAnswer}
            options={question.multipleChoiseOptions}
          />

          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={clsx({
              "bg-gray-500 text-slate-950 cursor-not-allowed": !selectedAnswer,
              "bg-green-700 text-white": selectedAnswer,
            })}
          >
            Next Question
          </button>
        </>
      )}
    </div>
  );
};

export default QuizQuestion;
