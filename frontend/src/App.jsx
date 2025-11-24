import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FlashcardPage from "./pages/FlashcardPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import AnalyticsDashboard from "./pages/dashboard/AnalyticsDashboard";
import PracticeHome from "./pages/practice/PracticeHome";
import PracticeCategory from "./pages/practice/PracticeCategory";
import PracticeQuestion from "./pages/practice/PracticeQuestion";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";

function AppWrapper() {
  const location = useLocation();

  // Hide navbar on home, login, and register pages
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={`${hideNavbar ? "" : "pt-16"} bg-gray-100 min-h-screen`}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <AnalyticsDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/flashcards/:categoryId"
            element={
              <PrivateRoute>
                <FlashcardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/flashcards"
            element={
              <PrivateRoute>
                <FlashcardsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <PrivateRoute>
                <PracticeHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/practice/category"
            element={
              <PrivateRoute>
                <PracticeCategory />
              </PrivateRoute>
            }
          />
          <Route
            path="/practice/questions/:categoryId"
            element={
              <PrivateRoute>
                <PracticeQuestion />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
