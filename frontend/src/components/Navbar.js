import React from "react";
import { Link } from "react-router-dom"; // Correct import of Link from react-router-dom
import "../AppStyle.css";
import Logout from "./Logout";
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
        <h1>Charity Donation</h1>
      </div>

      {/* Links using React Router's Link component */}
      <div>
      <Link to="/home" className="link" activeClass="active" duration={1000}>Home</Link>
      <Link to="/about" className="link" activeClass="active" duration={1000}>About</Link>
      <Link to="/AllCampaigns" className="link" activeClass="active" duration={1000}>Campaigns</Link>
      <Link to="/contact" className="link" activeClass="active" duration={1000}>Contact</Link>
      <Link to="/logout" className="link" activeClass="active" duration={1000}>Logout</Link>
      </div>
      
    </div>
  );
}

export default Navbar;
