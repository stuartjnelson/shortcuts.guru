
interface QuizResultsProps {
    correctAnswerCount: number;
    startNewQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ correctAnswerCount, startNewQuiz }) => {
    return (
        <div className="flex flex-col gap-y-5 items-center">
            <h2>Quiz Completed!</h2>
            <p>You got {correctAnswerCount} answers correct.</p>
            <button onClick={startNewQuiz}>Start a New Quiz</button>
        </div>
    );
};

export default QuizResults;
