import shortcuts from "../../data/vscode.json"; // JSON import for shortcut data
import { ShortcutRawJson, Shortcut } from "../types/quiz.types";

export const getAllShortcutsForQuiz = () : ShortcutRawJson[] => {
  return shortcuts;
}

export const generateRandomQuestions = (numberQuestions: number = 2, questions = shortcuts): Shortcut[] => {
  return Array.from({ length: numberQuestions }, () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return {
      ...questions[randomIndex],
      // 50:50 chance setting the type of question
      isEnterKeyTypeQuestion: Math.random() > 0.5,
    };
  });
};

export const getKeyString = (e: KeyboardEvent): string => {
  const specialKeys: { [key: string]: string } = {
    Control: "Ctrl",
    Meta: "Cmd",
  };
  return specialKeys[e.key] ?? e.key.toUpperCase();
};
