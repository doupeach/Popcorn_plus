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

function App() {
  // const dispatch = useDispatch();
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const [uid, setUid] = useState(); //儲存uid，要改成redux
  const [user, setUser] = useState(); //儲存uid，要改成redux
  const [currentUserInfo, setCurrentUserInfo] = useState(); //儲存uid，要改成redux
  const [collectionInfo, setCollectionInfo] = useState();
  const [favInfo, setFavInfo] = useState();
  const [userList, setUserList] = useState([]); // 所有user的資料
  const [isLogin, setIsLogin] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchDisplay, setSearchDisplay] = useState(false);

  useEffect(() => {
    // 取得使用者資料為非同步
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUid(currentUser.uid);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  useEffect(() => {
    userRef
      .get()
      .then((snapshot) => {
        let userArr = [];
        snapshot.docs.forEach((user) => {
          userArr.push(user.data());
        });
        setUserList(userArr);
      })
      .catch((err) => {
        console.err(err);
      });
  }, []);

  useEffect(() => {
    uid &&
      userRef.doc(uid).onSnapshot((doc) => {
        setCurrentUserInfo(doc.data());
      });
  }, [uid]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      currentUserInfo &&
        fetchCollectionMovies(currentUserInfo.my_list).then((movieInfo) => {
          setCollectionInfo(movieInfo);
          setIsLoading(false);
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
            setIsLoading(false);
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
          user={user}
          searchDisplay={searchDisplay}
          setSearchDisplay={setSearchDisplay}
          favInfo={favInfo}
        />

        <Switch>
          <Route path="/" exact>
            <Home uid={uid} collectionInfo={collectionInfo} />
          </Route>

          <Route path="/login" exact>
            {user !== null ? <Redirect to="/member" /> : <Login />}
          </Route>

          <Route path="/member" exact>
            {user !== null ? <Member uid={uid} /> : <Redirect to="/login" />}
          </Route>

          <Route path="/myfav" exact>
            {user !== null ? (
              <MyFav
                currentUserInfo={currentUserInfo}
                favInfo={favInfo}
                uid={uid}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/mylist" exact>
            {user !== null ? (
              <MyList
                currentUserInfo={currentUserInfo}
                uid={uid}
                collectionInfo={collectionInfo}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/mylist/:id">
            {user !== null ? <PersonalList /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/movie/:id">
            <MovieInfos uid={uid} />
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
          user={user}
          searchDisplay={searchDisplay}
          setSearchDisplay={setSearchDisplay}
        />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
