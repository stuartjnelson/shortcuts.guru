import { useNavigate, useParams } from "react-router-dom";

const QuizSettings = () => {
    const navigate = useNavigate()
    const { appName } = useParams<{ appName: string}>();

    return <>
        <p>I am quiz settings</p>
        <button onClick={() => navigate(`/quiz/${appName}/new`)}>Start quiz</button>
    </>
}

export default QuizSettings