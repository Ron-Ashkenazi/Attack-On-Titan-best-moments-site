import React from "react";
import { useEffect } from "react";
import "./App.css";
import AotHomePage from "./pages/AotHomePage";
import AotRankPage from "./pages/AotRankPage";
import AotHeadToHeadPage from "./pages/AotHeadToHeadPage";
import AotHardcoreRank from "./pages/AotHardcoreRank";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const URL = "https://aot-site-server.onrender.com/api/ping";

  useEffect(() => {
    const makePingRequest = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    makePingRequest();
  }, []);

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
