import React, {useContext,useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./Components/Header";
import SearchResult from "./Components/SearchResult"
import Train from "./Container/Train";
import TrainPage from './Container/TrainPage'
import SignUp from "./Container/SignUp"; 
import Login from "./Container/Login";
import UserProfile from "./Container/UserProfile";
import Test from "./Container/Test"
import "./index.css";
import HomePage from "./Container/Homepage";
import Learn from "./Container/Learn";

import ContextProvider from "./Services/ContextProvider"



export default function App() {
  
    return (
    <ContextProvider>
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
            <Train exercise_id="6161a9798b8178d949a87657"/>
          </Route>
          <Route path="/train_page">
            <TrainPage/>
          </Route>
          <Route path="/courses">
            <Learn/>
          </Route>
          <Router path="/signup">
            <SignUp/>
          </Router>
          <Router path ="/signin">
            <Login/>
          </Router>
          <Router path ="/test">
            <Test/>
          </Router>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
        </div>
      </Router>
    </ContextProvider>
    );
}