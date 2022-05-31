import "./Navbar.css";
import logo from "../images/Popcorn_logo.png";
import searchLogo from "../images/search_small.png";
import favLogo from "../images/favBtn.png";
import memberLogo from "../images/memberLogo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div id="logo-wrap">
        <img id="logo" src={logo} />
      </div>
      <div id="navbar-link">
        <Link to="/">
          <div>Home</div>
        </Link>

        <div>New & Popular</div>

        <Link to="/mylist">
          <div>My List</div>
        </Link>
      </div>
      <div id="navbar-btn">
        <img id="search" src={searchLogo}></img>
        <img id="fav" src={favLogo}></img>
        <Link to="/member">
          <img id="member" src={memberLogo}></img>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
