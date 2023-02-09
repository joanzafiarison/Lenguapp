import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./index.scss";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Train from "./Container/Train";
import TrainPage from './Container/TrainPage'
import SignUp from "./Container/SignUp"; 
import Login from "./Container/Login";
import UserProfile from "./Container/UserProfile";
import HomePage from "./Container/Homepage";
import Learn from "./Container/Learn";
import LearnPage from "./Container/LearnPage";
import DashboardAdmin from "./Container/DashboardAdmin";
import DashboardUser from "./Container/DashboardUser";
import CreateCourse from "./Container/Create";
import ContextProvider from "./Services/ContextProvider"




export default function App() {
  
    return (
    <ContextProvider>
      <Router>
        <Header/>
        <div className="mainContainer">
          <Switch>
            <Route path="/user" component={UserProfile}/>
            <Route path="/train/item" component={Train}/>
            <Route path="/train/" component={LearnPage}/>
            <Route path="/courses/item" component={Learn}/>
            <Route path="/courses" component={LearnPage}/>
            <Route path="/create" component={CreateCourse}/>
            <Route path="/dashboard/admin" component={DashboardAdmin}/>
            <Route path="/dashboard/user" component={DashboardUser}/>
            <Route path="/register" component={SignUp}/>
            <Route path ="/signin" component={Login}/>
            <Route path="/" component={HomePage}/>
          </Switch>
        </div>
        <Footer/>
      </Router>
    </ContextProvider>
    );
}