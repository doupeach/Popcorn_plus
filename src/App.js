import { useState, useEffect } from 'react';
import Home from "./pages/Home/Home";
import "./base.css";
import "./App.css";
import "../node_modules/react-modal-video/scss/modal-video.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Member from "./pages/MemberAndLogin/Member";
import Login from "./pages/MemberAndLogin/Login";
import MyList from "./pages/MyList/MyList";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MovieInfos from "./pages/MovieInfos/MovieInfos";
import SearchResult from "./pages/SearchResult/SearchResult";
import firebase from "./utils/firebase";
import {fetchMultiMovies} from './utils/api'

function App() {
  
  // const dispatch = useDispatch();
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const [uid, setUid] = useState(); //儲存uid，要改成redux
  const [user, setUser] = useState(); //儲存uid，要改成redux
  const [userList, setUserList] = useState([]); // 所有user的資料
  const [myCalendarMovies, setMyCalendarMovies] = useState([]); // user_calendar底下所有電影
  const [calendarMoviesInfo, setCalendarMovieInfo] = useState([]); // 根據user_calendar打TMDB回來的電影資料
  const [isLogin, setIsLogin] = useState()

  useEffect(() => {
    // 取得使用者資料為非同步
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUid(currentUser.uid);
        setIsLogin(true)
      } else {
        setIsLogin(false)
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

  console.log(uid)
  console.log(user)

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            {user !== null ? <Redirect to="/member" /> : <Login />}
          </Route>

          <Route path="/member">
          {user !== null ? <Member uid={uid} /> : <Redirect to="/login" />}
          </Route>

          <Route path="/mylist">
            <MyList />
          </Route>

          <Route exact path="/movie/:id">
            <MovieInfos />
          </Route>
          <Route exact path="/search/:query">
            <SearchResult />
          </Route>
        </Switch>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
