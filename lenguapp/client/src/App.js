import React from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import AppRouter  from "./Router";
import "./index.scss";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


import ContextProvider from "./Services/ContextProvider";

export default function App() {
  
    return (
    <ContextProvider>
      <Router>
        <Header/>
        <div className="mainContainer">
          <AppRouter/>
        </div>
        <Footer/>
      </Router>
    </ContextProvider>
    );
}

/**
 *           <Routes>
            <Route path="/" element={ <HomePage/> }/>
            <Route path="/train/item/:exercise_id" element={ <Train/>}/>
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
 */