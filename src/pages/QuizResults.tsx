
interface QuizResultsProps {
    correctAnswerCount: number;
    totalQuestions: number;
    startNewQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ correctAnswerCount, totalQuestions, startNewQuiz }) => {
    return (
        <div className="flex flex-col gap-y-5 items-center">
            <h2>Quiz Completed!</h2>
            {/* @TODO: Get total numbder */}
            <p>You got <b>{correctAnswerCount}</b>/{totalQuestions} answers correct.</p>
            <button onClick={startNewQuiz}>Start a New Quiz</button>
        </div>
    );
};

export default QuizResults;
