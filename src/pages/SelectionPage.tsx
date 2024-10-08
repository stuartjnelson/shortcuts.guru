import { useNavigate } from "react-router-dom";

function SelectionPage() {
  const navigate = useNavigate();

  const selectApp = (appName: string) => {
    // Navigate to the quiz page for the selected app
    navigate(`/quiz/${appName}/new`);
  };

  return (
    <div className="flex flex-col gap-y-10 items-center">
      <h1>Select an App for the Quiz</h1>
      <button onClick={() => selectApp("vscode")}>Visual Studio Code</button>
      {/* Add more apps here in the future */}
    </div>
  );
}

export default SelectionPage;
