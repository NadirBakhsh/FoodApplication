import React from 'react';
import NabigationBar from '../Components/NavBar/NavigationBar';
import Login from '../Components/Login/LoginForm';
import RegisterForm from '../Components/SignUp/RegisterForm';
import RestOwner from '../Components/RestDashboard/RestOwner';
import User from '../Components/UserDashboard/User';



import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Navigations() {
    return (
        //this.props.history.push('/dashboard')
        <Router>             
            <div>                
                <Route exact path="/" component={NabigationBar} />
                <Route exact path="/Login" component={Login} />
                <Route exact path="/RegisterForm" component={RegisterForm} />
                <Route exact path="/RestOwner" component={RestOwner} />
                <Route exact path="/User" component={User} />
               
            </div>            
        </Router>
    );
}

export default Navigations;