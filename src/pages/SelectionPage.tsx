import { useNavigate } from "react-router-dom";
import useGetApplicationData from "../hooks/UseGetApplicationData";
import type { ApplicationData } from "../types/applications.types";
import Icon from "../components/Icon";

function SelectionPage() {
  const navigate = useNavigate();

  const selectApp = (appName: string) => {
    // Navigate to the quiz page for the selected app
    navigate(`/quiz/${appName}/settings`);
  };

  const applications = useGetApplicationData();

  return (
    <div className="flex flex-col gap-y-10 items-center">
      <h1>Select an App for the Quiz</h1>
      {applications.map(({ id, name, slug, logo }: ApplicationData) => {
        return (
          <button
            className="flex gap-3"
            key={id}
            onClick={() => selectApp(slug)}
          >
            <span>{name}</span>
            {logo && (
              <div>
                <Icon />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default SelectionPage;
