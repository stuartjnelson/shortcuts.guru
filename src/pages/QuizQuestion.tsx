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
    const [userAnswer, setUserAnswer] = useState<string>("");

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
        if (question.keys.length > 0) {
            onSaveAnswer(pressedKeys.join(" + "));

            // Clear selection when submitting
            clearKeys()
        } else {
            onSaveAnswer(userAnswer);
        }
    };

    return (
        <div className="flex flex-col gap-y-5 items-center">
            <h2>
                Question {questionIndex + 1} of {totalQuestions}
            </h2>
            {question?.keys.length > 0 ? (
                <>
                    <p>Press this shortcut: {question.description}</p>
                    <p>Keys pressed: {pressedKeys.join(" + ")}</p>
                    <button onClick={clearKeys}>Clear</button>
                    <button onClick={handleSubmit}>Next Question</button>
                </>
            ) : (
                <>
                    <p>{question.keys.join(" + ")}</p>
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Next Question</button>
                </>
            )}
        </div>
    );
};

export default QuizQuestion;
