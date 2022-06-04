import React from "react";
import "./Footer.css";
import footerLogo from "../../images/Popcorn_logo.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <Link to='/'><img src={footerLogo} alt="" /></Link>
      <p> © 2022 An Chi Lu. All rights reserved.</p>
    </div>
  );
}

export default Footer;
