import { useNavigate, useParams } from "react-router-dom";
import { useQuizSettings } from "../contexts/QuizSettingsContext";
import { useEffect, useState } from "react";
import { generateRandomQuestions, getAllShortcutsForQuiz } from "./quizUtils";

const QuizSettings = () => {
  const navigate = useNavigate();
  const { appName } = useParams<{ appName: string }>();
  const { numberOfQuestions, setQuestions } = useQuizSettings();

  const [isIncludeAllShortcuts, setIsIncludeAllShortcuts] = useState(true);
  const [availableShortcuts, setAvailableShortcuts] = useState<string[]>([]);
  const [selectedShortcuts, setSelectedShortcuts] = useState<string[]>([]);

  // Set initial state on component load
  useEffect(() => {
    initialiseShortcutsState();
  }, []);

  const initialiseShortcutsState = () => {
    const allShortcutsDescriptions = getAllShortcutsForQuiz().map(
      (q) => q.description
    );

    setAvailableShortcuts(allShortcutsDescriptions);
    // Default to include all shortcuts
    setSelectedShortcuts(allShortcutsDescriptions);
  };

  const handleCheckboxChange = (
    shortcutDescription: string,
    isChecked: boolean
  ) => {
    if (isChecked) {
      setSelectedShortcuts((prev) => [...prev, shortcutDescription]);
    } else {
      setSelectedShortcuts((prev) =>
        prev.filter((desc) => desc !== shortcutDescription)
      );
    }
  };

  const handleSubmit = () => {
    if (selectedShortcuts.length < numberOfQuestions) {
      alert(
        `You must select at least ${numberOfQuestions} shortcuts to be included in the quiz. You have only selected ${selectedShortcuts.length}.`
      );
      return;
    }

    const allQuestions = getAllShortcutsForQuiz();
    const filteredQuestions = allQuestions.filter(({ description }) =>
      selectedShortcuts.includes(description)
    );
    const randomQuestions = generateRandomQuestions(
      numberOfQuestions,
      filteredQuestions
    );

    setQuestions(randomQuestions);
    navigate(`/quiz/${appName}/new`);
  };

  return (
    <>
      <h2>Quiz settings</h2>
      <label className="flex items-center">
        <input
          type="checkbox"
          defaultChecked={true}
          className="mr-2"
          onChange={() => setIsIncludeAllShortcuts(!isIncludeAllShortcuts)}
        />
        Include all shortcuts
      </label>
      {!isIncludeAllShortcuts && (
        <ul>
          {availableShortcuts.map((shortcut, index) => (
            <li key={index}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked={true}
                  className="mr-2"
                  onChange={(e) =>
                    handleCheckboxChange(shortcut, e.target.checked)
                  }
                  name={shortcut}
                />
                {shortcut}
              </label>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleSubmit}>Start quiz</button>
    </>
  );
};

export default QuizSettings;
