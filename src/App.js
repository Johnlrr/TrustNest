import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./login";
import Dashboard from "./dashboard";
import InsurerDashboard from "./insurerDashboard"; // Import InsurerDashboard
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/insurer-dashboard"
            element={<InsurerDashboard />}
          />{" "}
          {/* Add InsurerDashboard route */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
