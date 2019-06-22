import React, { Component } from "react";
import "./reg.css";


//fun import from firebase
import { registration, getResturantName } from '../../config/firebase'

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

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      accountType: "User",
      resturantName: "",
      matchingArrayRN: [],

      isLoading: true,

      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpassword: "",
        resturantName: "",

      }
    };
  }


  componentDidMount() {
    this.fetchData()
  }

  async fetchData() {
    try {
      let matchingArrayRN = [];
      const ResturantNameInfo = await getResturantName();
      for (var key in ResturantNameInfo) {
        if (ResturantNameInfo[key].resturantName !== "") {
          //console.log(ResturantNameInfo[key].resturantName)
          matchingArrayRN.push(ResturantNameInfo[key].resturantName)
          continue;
        }
        this.setState({ matchingArrayRN })
      }

    } catch (e) {
      console.log(e)
    }
  }



  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {

      const { firstName, lastName, email, password, accountType, resturantName } = this.state;
      const userData = { firstName, lastName, email, password, accountType, resturantName }
      registration(email, password, userData);

      accountType === "Resturant" ?
        this.props.history.push('/RestOwner')
        :
        this.props.history.push('/User')

    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "confirmpassword":
        formErrors.confirmpassword =
          value !== this.state.password ? "Not Match" : "";
        break;
      case "resturantName":
        let arr = this.state.matchingArrayRN;
        var data = arr.find((element) => {
          return element === value;
        });

        formErrors.resturantName =
          value === data ? `${data} is Already Register` : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors, accountType } = this.state;
    return (<div>
      <button style={{ marginLeft:"10px", position:"absolute" }}  className="but-login btn button:hover" onClick={() => this.props.history.push('/')} >Back</button>
      <div className="wrapper">
      

        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
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
            <div className="passwordNew">
              <label htmlFor="passwordNew">Password</label>
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
            <div className="passwordConfirm">
              <label htmlFor="confirmpassword">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="confirmpassword"
                type="password"
                name="confirmpassword"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.confirmpassword.length > 0 && (
                <span className="errorMessage">{formErrors.confirmpassword}</span>

              )}
            </div>

            <div className="selectFormDiv">
              <label >Select Accout Type</label>
              <select className="selectForm" onChange={e => { this.setState({ accountType: e.target.value }) }}>
                <option value="User">User</option>
                <option value="Resturant">Resturant</option>
              </select>
            </div>

            {accountType === "Resturant" && <div className="resturant">
              <label htmlFor="resturant">Resturant Name</label>
              <input
                className={formErrors.resturantName.length > 0 ? "error" : null}
                placeholder="Resturant Name"
                type="text"
                name="resturantName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.resturantName.length > 0 && (
                <span className="errorMessage">{formErrors.resturantName}</span>
              )}
            </div>}

            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small className="small" onClick={() => this.props.history.push('/Login')}>Sign Up</small>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default RegisterForm;