import { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import "./base.css";
import "./App.css";
import "../node_modules/react-modal-video/scss/modal-video.scss";
import "reactjs-popup/dist/index.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Member from "./pages/MemberAndLogin/Member";
import Login from "./pages/MemberAndLogin/Login";
import MyList from "./pages/MyList/MyList";
import MyFav from "./pages/MyFav/MyFav";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MovieInfos from "./pages/MovieInfos/MovieInfos";
import SearchResult from "./pages/SearchResult/SearchResult";
import firebase from "./utils/firebase";
import { fetchCollectionMovies } from "./utils/api";
import NotFound from "./pages/NotFound/NotFound";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import MovieNotFound from "./pages/MovieNotFound/MovieNotFound";
import PersonalList from "./pages/PersonalList/PersonalList";
import { useDispatch } from "react-redux";
import { getCurrentUserInfo } from "./redux/action";
import { getIsLogin } from "./redux/action";

function App() {
  const dispatch = useDispatch();
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const [uid, setUid] = useState();
  const [user, setUser] = useState();
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const [collectionInfo, setCollectionInfo] = useState();
  const [favInfo, setFavInfo] = useState();
  const [searchDisplay, setSearchDisplay] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUid(currentUser.uid);
        dispatch(getIsLogin(true));
      } else {
        dispatch(getIsLogin(false));
      }
    });
  }, []);

  useEffect(() => {
    if (!user) {
      setUid(undefined);
      setFavInfo(undefined);
      setCollectionInfo(undefined);
      setCollectionInfo(undefined);
      dispatch(getCurrentUserInfo(null));
    }
  }, [user]);

  useEffect(() => {
    uid &&
      userRef.doc(uid).onSnapshot((doc) => {
        setCurrentUserInfo(doc.data());
        dispatch(getCurrentUserInfo(doc.data()));
      });
  }, [uid]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      currentUserInfo &&
        fetchCollectionMovies(currentUserInfo.my_list).then((movieInfo) => {
          setCollectionInfo(movieInfo);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [currentUserInfo]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      currentUserInfo &&
        fetchCollectionMovies(currentUserInfo.user_collection).then(
          (movieInfo) => {
            setFavInfo(movieInfo);
          }
        );
    }
    return () => {
      isMounted = false;
    };
  }, [currentUserInfo]);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Navbar
          searchDisplay={searchDisplay}
          setSearchDisplay={setSearchDisplay}
          favInfo={favInfo}
        />

        <Switch>
          <Route path="/" exact>
            <Home collectionInfo={collectionInfo} />
          </Route>

          <Route path="/login" exact>
            {user ? <Redirect to="/member" /> : <Login />}
          </Route>

          <Route path="/member" exact>
            {user ? <Member uid={uid} /> : <Redirect to="/login" />}
          </Route>

          <Route path="/myfav" exact>
            {user ? <MyFav favInfo={favInfo} /> : <Redirect to="/login" />}
          </Route>

          <Route path="/mylist" exact>
            {user ? (
              <MyList collectionInfo={collectionInfo} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/movielist/:id">
            <PersonalList />
          </Route>

          <Route exact path="/movie/:id">
            <MovieInfos />
          </Route>

          <Route exact path="/movienotfound">
            <MovieNotFound />
          </Route>

          <Route exact path="/search/:query">
            <SearchResult />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        <Footer />
        <MobileNavbar
          searchDisplay={searchDisplay}
          setSearchDisplay={setSearchDisplay}
        />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
