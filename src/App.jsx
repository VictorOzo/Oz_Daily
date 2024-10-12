import "./App.css";
import NewsList from "./components/NewsList";
import ArticleDetails from "./components/ArticleDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/news/:id" element={<ArticleDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
