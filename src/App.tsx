import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SelectionPage from "./pages/SelectionPage";
import QuizPage from "./pages/QuizPage";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Homepage />} />
        <Route path="/quiz/select" element={<SelectionPage />} />
        <Route path="/quiz/:appName/new" element={<QuizPage />} /> */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/quiz/select" element={<SelectionPage />} />
          <Route path="/quiz/:appName/new" element={<QuizPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
