import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}

      <Route path="/" element={<TodoPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

    </Routes>
  );
}

export default App;