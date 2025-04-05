import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import EventListPage from "./pages/EventListPage";
import EventDetailPage from "./pages/EventDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage"; // Ensure file name matches
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  // Get authentication status from Redux
  const token = useSelector((state) => state.auth?.token);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Protect Event Pages - Redirect to Login if not authenticated */}
        <Route
          path="/events"
          element={token ? <EventListPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/events/:id"
          element={token ? <EventDetailPage /> : <Navigate to="/login" replace />}
        />

        {/* Redirect logged-in users away from Login/Register */}
        <Route path="/login" element={token ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/register" element={token ? <Navigate to="/" replace /> : <RegisterPage />} />

        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
