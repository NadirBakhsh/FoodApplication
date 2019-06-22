import React, { Component } from "react";
import {login,checkAccountTpye} from '../../config/firebase'
import { update_user } from '../../store/action';
import { connect } from 'react-redux';

import "./loginform.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      email: null,
      password: null,
      
      formErrors: {
       
        email: "",
        password: "",
       
        
      }
    };

    this.onLogin = this.onLogin.bind(this)

  }



  async onLogin() {
    const { email, password } = this.state;

    try {
         if (email !== undefined && password !== undefined) {
            const userData = await login(email, password)
            const Uid = await userData.user.uid
            if( Uid !== null){
              const getAccountType = await checkAccountTpye(Uid)
              //console.log(getAccountType,"<<<<< this acount type check")<<<<<<< redux use
              this.props.store_user(getAccountType);
              getAccountType.accountType === "User" ? 
              this.props.history.push('/User') : this.props.history.push('/RestOwner')
            }
            //console.log(userData.user.uid);
        } else {
            alert("Emty Field Email And Password")
        }
    } catch (e) {

        console.log(e)
    }
}

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      this.onLogin()



      //this.props.history.push('/User')
      // console.log(`
      //   --SUBMITTING-- 
      //   Email: ${this.state.email}
      //   Password: ${this.state.password}
      // `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div>
      <button style={{ marginLeft:"10px", position:"absolute" }}  className="but-login btn button:hover" onClick={() => this.props.history.push('/')} >Back</button>
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Login Form</h1>
          <form onSubmit={this.handleSubmit} noValidate>         
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>    
        
            <div className="createAccount">
              <button type="submit">Login</button>
              <small className="small" onClick={() => this.props.history.push('/RegisterForm')}>Sign Up</small>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      store_user: (user) => dispatch(update_user(user))
  }
}

export default connect(null, mapDispatchToProps)(LoginForm);
