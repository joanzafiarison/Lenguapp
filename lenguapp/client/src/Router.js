import React from "react";
import {
    Routes,
    Route
} from "react-router-dom";

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
export default function AppRouter () {
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
            <Route path="/user" element={ <UserProfile/> }/>
            <Route path="/dashboard/admin" element={ <DashboardAdmin/> }/>
            <Route path="/dashboard/user" element={<DashboardUser/> }/>
            <Route path="/create" element={ <CreateCourse/> }/>
            <Route
                path="/custom-component"
                element={
                    <ConditionalRoute condition={false} redirectTo="/dashboard/admin">
                        <PayWall />
                    </ConditionalRoute>
                }
            />
          </Routes>
    )
}