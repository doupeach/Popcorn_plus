import { useState } from "react";
import "./Navbar.css";
import logo from "../../images/Popcorn_logo.png";
import searchLogo from "../../images/search_small.png";
import favLogo from "../../images/favBtn.png";
import deleteLogo from "../../images/deleteBtn.png";
import memberLogo from "../../images/memberLogo.png";
import { Link, useHistory } from "react-router-dom";
import AddToCollection from "../AddToCollection/AddToCollection";
import { fetchSearch } from "../../utils/api";

function Navbar({user}) {
  const [searchDisplay, setSearchDisplay] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const history = useHistory();

  function handleSearchDisplay() {
    if (!searchDisplay) {
      setSearchDisplay(true);
    } else {
      setSearchDisplay(false);
    }
  }

  function handleClearInput() {
    setSearchInputValue("");
  }

  function handleSearchInput(e) {
    setSearchInputValue(e.target.value);
  }

  function keyPressSearch(e) {
    if (e.key === "Enter") {
      setSearchInputValue(e.target.value);
      history.push(`/search/${searchInputValue}`);
    }
  }

  function toNewRelease() {
      // history.push('/');
      window.scrollTo(0, 630)
  }

  // console.log(searchInputValue);
  return (
    <div className="navbar">
      <div id="logo-wrap">
        <img
          id="logo"
          src={logo}
          onClick={() => {
            history.push("/");
          }}
        />
      </div>
      <div id="navbar-link">
        <Link to="/">
          <div className="home-link">Home</div>
        </Link>

        <div className="release-link" onClick={toNewRelease}>New Releases</div>

        {user !== null ? <Link to="/mylist" >
          <div className="mylist-link">My List</div>
        </Link> : '' }

      </div>
      <div id="navbar-btn">
        {searchDisplay ? (
          <div className="search-container">
            <div className="search-box">
              <button className="search-button">
                <img
                  src={searchLogo}
                  alt="search"
                  onClick={handleSearchDisplay}
                />
              </button>

              <input
                value={searchInputValue}
                type="text"
                className="search-input"
                placeholder="Search movie..."
                onBlur={handleSearchDisplay}
                onChange={handleSearchInput}
                onKeyPress={keyPressSearch}
                onClick={handleClearInput}
              />
              <button className="delete-button">
                {searchInputValue && (
                  <img
                    id="delete-img-logo"
                    src={deleteLogo}
                    alt="delete"
                    onClick={handleClearInput}
                  />
                )}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        {!searchDisplay && (
          <img id="search" src={searchLogo} onClick={handleSearchDisplay} />
        )}
        <img id="fav" src={favLogo} />
        <Link to="/login">
          <img id="member" src={memberLogo} />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
