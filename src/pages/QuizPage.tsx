import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import shortcuts from "../../data/vscode.json"; // Assuming you have a proper JSON

interface Shortcut {
  keys: string[];
  description: string;
  answers: string[];
}

function QuizPage() {
  const { appName } = useParams<{ appName: string }>();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Shortcut | null>(null);
  const [isKeyPressMode, setIsKeyPressMode] = useState<boolean>(false);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [keyPressIndex, setKeyPressIndex] = useState<number>(0); // Track the number of keys pressed
  const [usersAnswer, setUsersAnswer] = useState<string>("");
  const [isUserAnswerCorrect, setIsUserAnswerCorrect] = useState<boolean>(false)

  useEffect(() => {
    if (appName !== "vscode") {
      navigate("/quiz/select");
    } else {
      // @TODO: really should set this only once the quiz has started...
      setIsUserAnswerCorrect(true)
      generateRandomQuestion();
    }
  }, [appName, navigate]);

  const generateRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * shortcuts.length);
    const randomQuestion: Shortcut = shortcuts[randomIndex];
    const shouldPressKeys = Math.random() < 0.5;

    setQuestion(randomQuestion);
    setIsKeyPressMode(shouldPressKeys);
    setIsUserAnswerCorrect(false)

    // Resetting all user input values
    setPressedKeys([]);
    setUsersAnswer("")
    setKeyPressIndex(0);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    console.log(e.key)
    const key = getKeyString(e);

    // Check if the pressed key matches the current expected key in the sequence
    if (question && key === question.keys[keyPressIndex]) {
      setPressedKeys((prevKeys) => [...prevKeys, key]);

      // Only increiment if not on last key
      if (keyPressIndex + 1 < question.keys.length) {
        setKeyPressIndex((prevIndex) => prevIndex + 1);
      }

      // If all keys are pressed, check if the answer is correct
      if (keyPressIndex + 1 === question.keys.length) {
        alert("Correct!");
        setIsUserAnswerCorrect(true);
        // generateRandomQuestion(); // Move to next question
      }
    } else {
      // If the wrong key is pressed, reset and notify the user
      alert("Incorrect! Please try again.");
      setPressedKeys([]);
      setKeyPressIndex(0);
    }
  };

  useEffect(() => {
    if (isKeyPressMode && !isUserAnswerCorrect) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [isKeyPressMode, keyPressIndex, question]);

  const getKeyString = (e: KeyboardEvent): string => {
    const speicalKeys: {[key: string]: string} = {
      "Control": "Ctrl",
      // @TODO: Need to consider OS
      Meta: "Cmd"
    } 

    // Casting to uppercase for consitency
    return speicalKeys[e.key] ?? e.key.toUpperCase()
  };

  const submitAnswer = (e:any) => {
    e.preventDefault();

    const isQuestionCorrect:boolean = question?.answers.includes(usersAnswer.toLocaleLowerCase()) || false

    if (isQuestionCorrect) {
      // generateRandomQuestion();
      setIsUserAnswerCorrect(true);
      alert("Correct!");
    } else {
      // @TODO: Make this reuable not hard coded
      alert("Try again")
    }
  }

  const nextQuestion = () => {
    if (isUserAnswerCorrect) {
      generateRandomQuestion()
    } else {
      alert("You must get this question correct before moving on")
    }
  }

  return (
    <div className="flex flex-col gap-y-10 items-center">
      <h1>{appName} Quiz</h1>
      {question ? (
        <>
          {isKeyPressMode ? (
            <div className="flex flex-col gap-y-5 items-center">
              <h2>Press this shortcut: {question.description}</h2>
              <p>Keys pressed: {pressedKeys.join(" + ")}</p>
              <p>Waiting for key {keyPressIndex + 1} of {question.keys.length}</p>
            </div>
          ) : (
            <form className="flex flex-col gap-y-5 items-center">
              <h2>What's this shortcut?</h2>
              <p>{question.keys.join(" + ")}</p>

              <br />

              <label className="flex flex-col">
                Answer

                <input 
                  type="text"
                  required
                  value={usersAnswer}
                  onChange={e => setUsersAnswer(e.target.value)}
                />
              </label>

              <button onClick={submitAnswer}>Submit answer</button>
            </form>
          )}

          {/* @TODO: Ensure questions has been answered before moving on */}
          {/* @TODO: Make this a link? */}
          <button onClick={nextQuestion}>Next Question</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default QuizPage;
