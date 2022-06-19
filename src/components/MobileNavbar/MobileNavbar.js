import "./MobileNavbar.css";
import searchLogo from "../../images/search_small.png";
import favLogo from "../../images/favBtn.png";
import memberLogo from "../../images/memberLogo.png";
import { Link } from "react-router-dom";
import { swalLoginModal } from "../../utils/swalModal";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function MobileNavbar({ searchDisplay, setSearchDisplay }) {
  const history = useHistory();
  const isLogin = useSelector((state) => state.isLogin);

  function handleSearchDisplay() {
    if (!searchDisplay) {
      setSearchDisplay(true);
    } else {
      setSearchDisplay(false);
    }
  }

  function handleVisitMyFav() {
    if (!isLogin) {
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
