import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import FoodDiary from "./pages/FoodDiary";
import Analysis from "./pages/Analysis";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";


// 🔒 Protected Route Component
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}



export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />

        <div className="main">
          <Routes>

            {/* Redirect to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" />} />

            {/* 🔒 Protected Pages */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/diary"
              element={
                <ProtectedRoute>
                  <FoodDiary />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analysis"
              element={
                <ProtectedRoute>
                  <Analysis />
                </ProtectedRoute>
              }
            />

            {/* Public Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}