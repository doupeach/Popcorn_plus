import Home from "./pages/Home/Home";
import "./base.css";
import "./App.css";
import "../node_modules/react-modal-video/scss/modal-video.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Member from "./pages/Member/Member";
import MyList from "./pages/MyList/MyList";
import Search from "./pages/Search/Search";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MovieInfos from "./pages/MovieInfos/MovieInfos";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/member">
            <Member />
          </Route>
          <Route path="/mylist">
            <MyList />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route exact path="/movie/:id">
            <MovieInfos/>
          </Route>
        </Switch>
        <Footer/>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
