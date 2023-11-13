import React from "react";
import aotTitleLogo from "../Images/Attack-On-Titan-LogoPNG.png";
import { Link } from "react-router-dom";
import "./AotHeader.css";

function AotHeader() {
  return (
    <header className="aot-header">
      <Link to="/" className="card-link">
        <img className="aot-header-image" src={aotTitleLogo} alt="" />
      </Link>
    </header>
  );
}

export default AotHeader;
