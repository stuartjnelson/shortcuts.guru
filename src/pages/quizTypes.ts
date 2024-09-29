// Defines a shortcut type with keys, description, and possible answers
export interface Shortcut {
    keys: string[];
    description: string;
    answers: string[];
    isEnterKeyTypeQuestion: boolean;
}

// The possible states the quiz can be in
export type QuizState = "initalising" | "inProgress" | "questionsComplete" | "results";

// Define additional types if necessary, for example:
export interface QuizQuestionProps {
    question: Shortcut;
    questionIndex: number;
    totalQuestions: number;
    onSaveAnswer: (answer: string) => void;
}

export interface QuizResultsProps {
    correctAnswerCount: number;
    startNewQuiz: () => void;
}
