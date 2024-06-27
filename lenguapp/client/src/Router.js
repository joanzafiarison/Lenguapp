import React from "react";
import {
    Routes,
    Route
} from "react-router-dom";
import { useAppData, useAppDispatch } from "./Services/ContextProvider";

import Train from "./Container/Train";
import TrainPage from './Container/TrainPage';
import SignUp from "./Container/SignUp"; 
import Login from "./Container/Login";
import UserProfile from "./Container/UserProfile";
import HomePage from "./Container/Homepage";
import Start from "./Container/Start";
import Learn from "./Container/Learn";
import LearnPage from "./Container/LearnPage";
import DashboardAdmin from "./Container/DashboardAdmin";
import DashboardUser from "./Container/DashboardUser";
import CreateCourse from "./Container/Create";
import ForgotPassword from "./Container/ForgotPassword";
import ConditionalRoute from "./Services/ConditionalRoute";
import PayWall from './Container/PayWall';

//isLoggedIn
//isAdmin
//isTeacher
export default function AppRouter () {
    const {user} = useAppData();
    console.log("u",user);
    return(
        <Routes>
            <Route path="/" element={ <HomePage/> }/>
            <Route path="/start" element={ <Start/> }/>
            <Route path="/train/item/:exercise_id" element={ <Train/>}/>
            <Route path="/train/" element={ <TrainPage/> }/>
            <Route path="/courses/item/:course_id" element={<Learn/>}/>
            <Route path="/courses" element={ <LearnPage/> }/>
            <Route path="/forgotpassword" element={ <ForgotPassword/> }/>
            <Route path="/register" element={ <SignUp/> }/>
            <Route path ="/signin" element={ <Login/> }/>
            <Route 
                path="/user"
                element={ 
                    <ConditionalRoute condition={user.isLoggedIn === true && user.role === "user"} redirectTo="/">
                        <UserProfile/>
                    </ConditionalRoute>
                 }
            />
            <Route 
                path="/dashboard/user" 
                element={
                    <ConditionalRoute condition={user.isLoggedIn === true && user.role === "user"} redirectTo="/">
                        <DashboardUser/>
                    </ConditionalRoute>
                }
            />
            <Route 
                path="/dashboard/admin"
                element={ 
                        <ConditionalRoute condition={user.isLoggedIn === true && user.role ==="teacher"} redirectTo="/">
                            <DashboardAdmin/> 
                        </ConditionalRoute>
                    }
            />
            <Route
                path="/create"
                element={
                    <ConditionalRoute condition={user.isLoggedIn === true && user.role === "teacher"} redirectTo="/">
                        <CreateCourse/> 
                    </ConditionalRoute>
                }
            />
          </Routes>
    )
}