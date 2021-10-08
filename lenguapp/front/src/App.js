import React from "react";
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
    <>
      <Header/>
      <SearchResult/>
      <UserProfile/>
      <Train/>
      <SignUp/> 
      <Login/>
    </>
    );
  }
}