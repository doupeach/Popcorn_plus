import Home from "./pages/Home/Home";
import "./base.css";
import "./App.css";
import "../node_modules/react-modal-video/scss/modal-video.scss";
import { Switch, Route } from "react-router-dom";
import Member from "./pages/Member/Member";
import MyList from "./pages/MyList/MyList";
import Search from "./pages/Search/Search";

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
        </Switch>
      </header>
    </div>
  );
}

export default App;
