import React from "react";
import "./App.css";
import AotHomePage from "./pages/AotHomePage";
import AotRankPage from "./pages/AotRankPage";
import AotHeadToHeadPage from "./pages/AotHeadToHeadPage";
import AotHardcoreRank from "./pages/AotHardcoreRank";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app-root" style={{ height: "100%" }}>
      <Router>
        <Routes>
          <Route path="/" element={<AotHomePage />} />
          <Route path="/aot-rank" element={<AotRankPage />} />
          <Route path="/aot-head-to-head" element={<AotHeadToHeadPage />} />
          <Route path="/aot-hardcore-rank" element={<AotHardcoreRank />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
