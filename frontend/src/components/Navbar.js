import React from "react";
import { Link } from "react-router-dom"; // Correct import of Link from react-router-dom
import "../AppStyle.css";

function Navbar() {
  return (
    <div className="navbar-content">
      <img
        src={require("../images/donation-logo.jpg").default}
        alt="logo"
        width="107px"
        height="112px"
      />
      <div className="logo-text">
        <h2>Charity</h2>
        <h2>Donation</h2>
      </div>

      {/* Links using React Router's Link component */}
      <Link to="/" className="link" activeClass="active" duration={1000}>Home</Link>
      <Link to="/about" className="link" activeClass="active" duration={1000}>About</Link>
      <Link to="/AllCampaigns" className="link" activeClass="active" duration={1000}>Campaigns</Link>
      <Link to="/contact" className="link" activeClass="active" duration={1000}>Contact</Link>
      <Link to="/login" className="link" activeClass="active" duration={1000}>Login</Link>
      <Link to="/signup" className="link" activeClass="active" duration={1000}>Signup</Link>
      
    </div>
  );
}

export default Navbar;
