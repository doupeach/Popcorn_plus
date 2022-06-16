import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../images/Popcorn_logo.png";
import mobileLogo from "../../images/P+.png";
import searchLogo from "../../images/search_small.png";
import favLogo from "../../images/favBtn.png";
import deleteLogo from "../../images/deleteBtn.png";
import memberLogo from "../../images/memberLogo.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import AddToCollection from "../AddToCollection/AddToCollection";
import { getRandomNewReleaseMovie } from "../../utils/api";
import { swalLoginModal } from "../../utils/swalModal";

function Navbar({ user, searchDisplay, setSearchDisplay, favInfo }) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [display, setDisplay] = useState("notdisplayed");

  const showButton = (e) => {
    e.preventDefault();
    setDisplay("displayed");
  };

  const hideButton = (e) => {
    e.preventDefault();
    setDisplay("notdisplayed");
  };

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

  function getRandomMovie() {
    let idRange = 600000;
    history.push(`/movie/${getRandomNewReleaseMovie(idRange)}`);
  }

  function handleVisitMyFav() {
    if (!user) {
      swalLoginModal("visit my favorites!");
    } else {
      history.push("/myfav");
    }
  }

  function toMainPage() {
    history.push("/");
  }

  console.log(favInfo);
  console.log(display);
  return (
    <div className="navbar">
      <div id="logo-wrap">
        <img id="logo" src={logo} onClick={toMainPage} />

        <img id="mobile-logo" src={mobileLogo} onClick={toMainPage} />
      </div>
      <div id="navbar-link">
        <Link to="/">
          <div className="home-link">Home</div>
        </Link>

        <div className="release-link" onClick={getRandomMovie}>
          Surprise me!
        </div>

        {user ? (
          <Link to="/mylist">
            <div className="mylist-link">My List</div>
          </Link>
        ) : (
          ""
        )}
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

        <img
          id="fav"
          src={favLogo}
          onClick={handleVisitMyFav}
          onMouseEnter={(e) => showButton(e)}
          onMouseLeave={(e) => hideButton(e)}
        />

        <Link to="/login">
          <img id="member" src={memberLogo} />
        </Link>
      </div>

      {favInfo && (
        <div
          className={display}
          id="popcorn-card-container"
          onMouseEnter={(e) => showButton(e)}
          onMouseLeave={(e) => hideButton(e)}
        >
          {favInfo?.map((data) => {
            console.log(data);
            return (
              <Link
                className="popcorn-card"
                to={`/movie/${data.id}`}
                key={data.id}
              >
                <img
                  className="popcorn-card-img"
                  src={
                    data.image
                      ? data.image
                      : `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
                  }
                />
                <div className="title-date">
                  <div className="popcorn-card-title">{data.title}</div>
                  <div className="popcorn-card-date">{data.release_date}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Navbar;
