import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "./index.scss";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Train from "./Container/Train";
import TrainPage from './Container/TrainPage';
import SignUp from "./Container/SignUp"; 
import Login from "./Container/Login";
import UserProfile from "./Container/UserProfile";
import HomePage from "./Container/Homepage";
import Learn from "./Container/Learn";
import LearnPage from "./Container/LearnPage";
import DashboardAdmin from "./Container/DashboardAdmin";
import DashboardUser from "./Container/DashboardUser";
import CreateCourse from "./Container/Create";

import ContextProvider from "./Services/ContextProvider";
//import ProtectedRoute from "./Services/ProtectedRoute";

export default function App() {
  
    return (
    <ContextProvider>
      <Router>
        <Header/>
        <div className="mainContainer">
          <Routes>
            <Route path="/" element={ <HomePage/> }/>
            <Route path="/train/item" element={ <Train/>}/>
            <Route path="/train/" element={ <TrainPage/> }/>
            <Route path="/courses/item" element={<Learn/>}/>
            <Route path="/courses" element={ <LearnPage/> }/>
            <Route path="/register" element={ <SignUp/> }/>
            <Route path ="/signin" element={ <Login/> }/>
            <Route path="/user" element={ <UserProfile/> }/>
            <Route path="/dashboard/admin" element={ <DashboardAdmin/> }/>
            <Route path="/dashboard/user" element={<DashboardUser/> }/>
            <Route path="/create" element={ <CreateCourse/> }/>
          </Routes>
        </div>
        <Footer/>
      </Router>
    </ContextProvider>
    );
}