import { useState, useEffect } from "react";
import type { Shortcut } from "./quizTypes";
import { getKeyString } from "./quizUtils";

interface QuizQuestionProps {
    question: Shortcut;
    questionIndex: number;
    totalQuestions: number;
    onSaveAnswer: (answer: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, questionIndex, totalQuestions, onSaveAnswer }) => {
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


    const handleSubmit = () => {
        // If there are user entered keys
        if (question.isEnterKeyTypeQuestion) {
            onSaveAnswer(pressedKeys.join(" + "));

            // Clear selection when submitting
            clearKeys()
        } else {
            onSaveAnswer(selectedAnswer);
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
                    <p>{question.keys.join(" + ")}</p>

                    {/* Map over the possible answers to create radio buttons */}
                    {question.multipleChoiseOptions.map((answer, index) => (
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
                    ))}

                    <button onClick={handleSubmit} disabled={!selectedAnswer}>
                        Next Question
                    </button>
                </>
            )}
        </div>
    );
};

export default QuizQuestion;
