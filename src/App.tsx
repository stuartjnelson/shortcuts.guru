import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SelectionPage from "./pages/SelectionPage";
import QuizPage from "./pages/QuizPage";
import DefaultLayout from "./layouts/DefaultLayout";
import QuizSettings from "./pages/QuizSettings";
import { QuizSettingsProvider } from "./contexts/QuizSettingsContext";

function App() {
  return (
    <QuizSettingsProvider>
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/quiz/select" element={<SelectionPage />} />
            <Route path="/quiz/:appName/settings" element={<QuizSettings />} />
            <Route path="/quiz/:appName/new" element={<QuizPage />} />
          </Route>
        </Routes>
      </Router>
      <footer className="text-center">
        <p className="flex justify-center items-center gap-2">
          Made by{" "}
          <a className="hover:underline" href="https://northernbadger.co.uk">
            Northern Badger
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            aria-hidden="true"
            role="img"
            className="w-5 h-5 background-white radius-50p"
          >
            <path d="M100 0a100 100 0 10100 100A100.1 100.1 0 00100 0zm43.88 123.93a5.58 5.58 0 11-5.58 5.59 5.58 5.58 0 015.58-5.59zm-87.75 0a5.58 5.58 0 11-5.57 5.59 5.58 5.58 0 015.57-5.59zM36.62 170a94.4 94.4 0 01-21-112.48C29.78 75 47.87 110.25 36.58 170zm63.43 24.5a94 94 0 01-51.07-15c10.09-14.27 46.69-75 13.29-166.15a94.42 94.42 0 0175.57 0c-33.4 91.13 3.19 151.88 13.28 166.15a94 94 0 01-51.11 15zm63.43-24.5c-11.33-59.77 6.73-95 21-112.48a94.38 94.38 0 01-21 112.47zm-39.7 6.64l-1.72-13.82a4.12 4.12 0 00-3.08-3.51l-17.91-4.82a4.43 4.43 0 00-2.17 0L81 159.33a4.16 4.16 0 00-3.08 3.51l-1.72 13.82a4.22 4.22 0 00.41 2.4c.71 1.39 5.14 8.22 23.35 8.31s22.6-6.92 23.34-8.31a4.09 4.09 0 00.48-2.4z"></path>
          </svg>
        </p>
      </footer>
    </QuizSettingsProvider>
  );
}

export default App;
