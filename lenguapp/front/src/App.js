import React from "react";
import Header from "./Components/Header";
import SearchResult from "./Components/SearchResult"
import Train from "./Container/Train";
import "./index.css";

export default class App extends React.Component {

  render() {
    return (
    <>
      <Header/>
      <SearchResult/>
      <Train/>
    </>
    );
  }
}