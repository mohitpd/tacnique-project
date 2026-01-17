import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { QuizPage } from "./pages/QuizPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminRoute } from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
        <Route path="/" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
