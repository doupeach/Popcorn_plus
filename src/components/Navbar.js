import './Navbar.css';
import logo from '../images/Popcorn_logo.png'
import searchLogo from '../images/search_small.png'
import memberLogo from '../images/user_circle.png'


function Navbar() {
  return (
    <div className="navbar">
      <img id="logo" src={logo} />
      <div id="navbar-link">
        <div>Home</div>
        <div>New & Popular</div>
        <div>My List</div>
      </div>
      <div id="navbar-btn">
        <img id="search" src={searchLogo}></img>
        <img id="member" src={memberLogo}></img>
      </div>
    </div>
  );
}

export default Navbar;
