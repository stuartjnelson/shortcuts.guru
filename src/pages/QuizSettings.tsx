import { useNavigate, useParams } from "react-router-dom";
import { useQuizSettings } from "../contexts/QuizSettingsContext";
import { useEffect, useState } from "react";
import { generateRandomQuestions, getAllShortcutsForQuiz } from "./quizUtils";

const QuizSettings = () => {
  const navigate = useNavigate();
  const { appName } = useParams<{ appName: string }>();
  const { setQuestions } = useQuizSettings();

  const [editShortcutsToInclude, setEditShortcutsToInclude] = useState(true);
  const [allShortcuts, setAllShortcuts] = useState<string[]>([]);
  const [shortcutsToInclude, setShortcutsToInclude] = useState<string[]>([]);

  // @TODO: On the first load we need to set our state
  useEffect(() => {
    setupAllShortcutsState();
  }, []);

  const setupAllShortcutsState = () => {
    // Get all shortcut data for current quiz
    const allQuizQuestionsDescriptions = getAllShortcutsForQuiz().map(
      (q) => q.description
    );

    // Set all shortcut descriptions to be used for creating list of checkboxes to select which shortcuts you want in the quiz
    setAllShortcuts(allQuizQuestionsDescriptions);

    // State for which shortcuts you want included in your quiz
    setShortcutsToInclude(allQuizQuestionsDescriptions);
  };

  // Handle checkbox change
  const handleCheckboxChange = (
    shortcutDescription: string,
    isChecked: boolean
  ) => {
    if (isChecked) {
      // Add `shortcutDescription` to be included in the quiz
      setShortcutsToInclude((prev) => [...prev, shortcutDescription]);
    } else {
      // Remove `shortcutDescription` to be included in the quiz
      setShortcutsToInclude((prev) =>
        prev.filter((prevDesc) => prevDesc !== shortcutDescription)
      );
    }
  };

  const handleSubmit = () => {
    // 1. Check we have enough shortcuts
    if (shortcutsToInclude.length < 5) {
      alert(
        `You must select atleast 5 shortcuts to be included in the quiz. You have only selected ${shortcutsToInclude.length}`
      );

      return;
    }

    // 2. Get all quiz questions
    const allQuestions = getAllShortcutsForQuiz();

    // 3. Filter all quiz questions by selected checkboxes
    const filteredQuestions = allQuestions.filter(({ description }) =>
      shortcutsToInclude.includes(description)
    );

    // 4. Generate random list of quetions
    const randomQuestions = generateRandomQuestions(5, filteredQuestions);

    // 5. Set context state with our random questions
    setQuestions(randomQuestions); // Update the global questions array

    // 6. Navigate to start quiz
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
          onChange={() => setEditShortcutsToInclude(!editShortcutsToInclude)}
        />
        Include all shortcuts
      </label>
      {!editShortcutsToInclude && (
        <ul>
          {allShortcuts.map((question, i) => {
            return (
              <li key={i}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    className="mr-2"
                    onChange={(e) =>
                      handleCheckboxChange(question, e.target.checked)
                    }
                    name={question}
                  />
                  {question}
                </label>
              </li>
            );
          })}
        </ul>
      )}

      <button onClick={handleSubmit}>Start quiz</button>
    </>
  );
};

export default QuizSettings;
