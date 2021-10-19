import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./Components/Header";
import SearchResult from "./Components/SearchResult"
import Train from "./Container/Train";
import SignUp from "./Container/SignUp"; 
import Login from "./Container/Login";
import UserProfile from "./Container/UserProfile";
import "./index.css";


export default class App extends React.Component {

  render() {
    return (
    <Router>
      <Header/>
      <div className="mainContainer">
      <Switch>
        <Route path="/users">
          <SearchResult/>
        </Route>
        <Route path="/user">
          <UserProfile />
        </Route>
        <Route path="/train">
          <Train/>
        </Route>
        <Route path="/courses">
          <Train/>
        </Route>
        <Router path="/signup">
          <SignUp/>
        </Router>
        <Router path ="/signin">
          <Login/>
        </Router>
      </Switch>
      </div>
    </Router>
    );
  }
}