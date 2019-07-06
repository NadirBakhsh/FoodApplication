import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Silder from '../slider'
import "./navbar.css"

class NavigationBar extends Component {

    render() {
        return (
            <div>
            <h1 className="titleHeading">Food Delivery App</h1> 
            <div className="navBarDiv"> 
                          
                <button className="but-login btn button:hover" onClick={() => this.props.history.push('/Login')} >Login</button>
                <button className="but-signup"  onClick={() => this.props.history.push('/RegisterForm')} >Sign Up</button> 

           </div>
           <div style={{marginTop:"8px"}}>
            <Divider />
           </div>
           <div>
               <Silder />
           </div>
          </div>
        );
    }
}

export default NavigationBar;