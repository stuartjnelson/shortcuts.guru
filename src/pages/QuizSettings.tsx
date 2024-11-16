import { useNavigate, useParams } from "react-router-dom";
import { useQuizSettings } from "../contexts/QuizSettingsContext";
import { useEffect, useState } from "react";
import { generateRandomQuestions, getAllShortcutsForQuiz } from "./quizUtils";

const QuizSettings = () => {
  const navigate = useNavigate();
  const { appName } = useParams<{ appName: string }>();
  const { questions, setQuestions } = useQuizSettings();

  const [selectedQuestions, setSelectedQuestions] = useState<string[]>(
    questions.map((q) => q.description)
  );
  const [includeAllShortcuts, setIncludeAllShortcuts] = useState(true);

  useEffect(() => {
    // When we want to select shortcuts we need to get ALL of them THEN
    // return just the description
    debugger;
    if (!includeAllShortcuts) {
      const allShortcuts = getAllShortcutsForQuiz();

      //   setSelectedQuestions(allShortcuts.map((q) => q.description));
      setSelectedQuestions(allShortcuts.map((q) => q.description));
    }
  }, [includeAllShortcuts]);

  // @TODO: On the first load we need to set our state
  useEffect(() => {
    setSelectedQuestions(questions.map((q) => q.description));
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (description: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedQuestions((prev) => [...prev, description]);
    } else {
      setSelectedQuestions((prev) => {
        const filteredPrev = prev.filter((desc) => desc !== description);
        debugger;

        return filteredPrev;
      });
    }
  };

  const handleSubmit = () => {
    // 1. Confirm questions to be used in quiz
    // const filteredQuestions = questions.filter((question) =>
    //   selectedQuestions.includes(question.description)
    // );

    const allQuestions = getAllShortcutsForQuiz();
    const filteredQuestions = allQuestions.filter(({ description }) =>
      selectedQuestions.includes(description)
    );

    debugger;

    const randomQuestions = generateRandomQuestions(5, filteredQuestions);

    // Need to add in check that we have minimum number of questions

    setQuestions(randomQuestions); // Update the global questions array

    debugger;

    // 2. Navigate to start quiz
    navigate(`/quiz/${appName}/new`);
  };

  // @TODO:
  //        I feel this page sould be responisble for setting random quesitons not the context. Context sets it to be ALL questions
  //        When choosing a checkbox at that point the state array `selectedQuestions` needs to be ALL questions not just the 5 from the context
  //        Then we need to on submit generate random questions from the number that have been selected
  //        If less than the number of questions (for now hard code to 5) then page can't be submitted

  //   @TODO
  //   1. How does this component have access to all shortcuts without importing the JSON?
  //   2. ~~`selectedQuestions` should be all questions minus any that have been unselcected~~
  //   3. ~~THEN we can on submit randonly set 5 questions to be choosen from the filtered list~~~
  //   4. Now need to ensure that de-couple selected items from the list of checkboxes as currently when unselect a checkbox it is removed from the list

  return (
    <>
      <h2>Quiz settings</h2>
      <label className="flex items-center">
        <input
          type="checkbox"
          defaultChecked={true} // Checkbox is checked by default
          className="mr-2"
          onChange={() => setIncludeAllShortcuts(!includeAllShortcuts)}
        />
        Include all shortcuts
      </label>
      {!includeAllShortcuts && (
        <ul>
          {selectedQuestions.map((question, i) => {
            return (
              <li key={i}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={true} // Checkbox is checked by default
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
