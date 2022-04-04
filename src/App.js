import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import firebase from "./firebase";
// import "firebase/database";
// import Peer from "peerjs";
// import "./App.css";
import Room from "./components/Room";
import Login from "./components/Login";
import Register from "./components/Register"
// import "./style.css";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/room" component={Room} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
