import "./MobileNavbar.css";
import searchLogo from "../../images/search_small.png";
import favLogo from "../../images/favBtn.png";
import memberLogo from "../../images/memberLogo.png";
import { Link } from "react-router-dom";
import { swalLoginModal } from "../../utils/swalModal";
import { useHistory } from "react-router-dom";

function MobileNavbar({ user, searchDisplay, setSearchDisplay }) {
  const history = useHistory();
  function handleSearchDisplay() {
    if (!searchDisplay) {
      setSearchDisplay(true);
    } else {
      setSearchDisplay(false);
    }
  }

  function handleVisitMyFav() {
    if (!user) {
      swalLoginModal("visit my favorites!");
    } else {
      history.push("/myfav");
    }
  }

  return (
    <div id="mobile-navbar-btn">
      <img id="mobile-search" src={searchLogo} onClick={handleSearchDisplay} />

      <img id="mobile-fav" src={favLogo} onClick={handleVisitMyFav} />

      <Link to="/login">
        <img id="mobile-member" src={memberLogo} />
      </Link>
    </div>
  );
}

export default MobileNavbar;
