import { useNavigate, useParams } from "react-router-dom";
import { useQuizSettings } from "../contexts/QuizSettingsContext";
import { useEffect, useState } from "react";

const QuizSettings = () => {
    const navigate = useNavigate()
    const { appName } = useParams<{ appName: string}>();
    const { questions, setQuestions } = useQuizSettings()
    
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>(questions.map(q => q.description));
    const [includeAllShortcuts, setIncludeAllShortcuts] = useState(true)

    useEffect(() => {
        setSelectedQuestions(questions.map(q => q.description));
    }, [questions]);

    // Handle checkbox change
    const handleCheckboxChange = (description: string, isChecked: boolean) => {
        if (isChecked) {
            setSelectedQuestions((prev) => [...prev, description]);
        } else {
            setSelectedQuestions((prev) => prev.filter((desc) => desc !== description));
        }
    };

    const handleSubmit = () => {
        // 1. Confirm questions to be used in quiz
        const filteredQuestions = questions.filter((question) =>
            selectedQuestions.includes(question.description)
        );
        setQuestions(filteredQuestions); // Update the global questions array

        // 2. Navigate to start quiz
        navigate(`/quiz/${appName}/new`)
    };

    // @TODO:
    //        I feel this page sould be responisble for setting random quesitons not the context. Context sets it to be ALL questions
    //        When choosing a checkbox at that point the state array `selectedQuestions` needs to be ALL questions not just the 5 from the context
    //        Then we need to on submit generate random questions from the number that have been selected
    //        If less than the number of questions (for now hard code to 5) then page can't be submitted

    return <>
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
                {questions.map((question, i) => {
                    return (
                        <li key={i}>
                            <h3>{question.description}</h3>
                            <ul>
                                {question.multipleChoiseOptions.map((option, j) => (
                                    <li key={j}>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                defaultChecked={true} // Checkbox is checked by default
                                                className="mr-2"
                                                onChange={(e) => handleCheckboxChange(question.description, e.target.checked)}
                                                name={question.description}
                                            />
                                            {option}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        )}

        <button onClick={handleSubmit}>Start quiz</button>
    </>
}

export default QuizSettings