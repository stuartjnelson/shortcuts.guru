import React, { createContext, useContext, useState, ReactNode } from "react";
import { Shortcut } from "../types/quiz.types";
import { generateRandomQuestions } from "../pages/quizUtils";

// Define the shape of the context for quiz settings
interface QuizSettingsContextType {
  numberOfQuestions: number;
  questions: Shortcut[];
  setQuestions: (questions: Shortcut[]) => void;
}

// Create the context with an initial value
const QuizSettingsContext = createContext<QuizSettingsContextType | undefined>(
  undefined
);

// The provider component to wrap your app and provide global state
export const QuizSettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const numberOfQuestions = 5;
  // @TODO: This will need to be dynamic based on URL param `:appName` as currently hardcoded to be VSCode
  const randomQuestions = generateRandomQuestions(numberOfQuestions);
  //   const [questions, setQuestions] = useState<Shortcut[]>([]); // Initialize with all questions from JSON
  const [questions, setQuestions] = useState<Shortcut[]>(randomQuestions); // Initialize with all questions from JSON

  return (
    <QuizSettingsContext.Provider
      value={{ numberOfQuestions, questions, setQuestions }}
    >
      {children}
    </QuizSettingsContext.Provider>
  );
};

// Custom hook to use the QuizSettings context
// eslint-disable-next-line react-refresh/only-export-components
export const useQuizSettings = () => {
  const context = useContext(QuizSettingsContext);
  if (!context) {
    throw new Error(
      "useQuizSettings must be used within a QuizSettingsProvider"
    );
  }
  return context;
};
