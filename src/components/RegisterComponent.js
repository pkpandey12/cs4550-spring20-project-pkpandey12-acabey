import React from "react";
import {Link, withRouter} from 'react-router-dom'
import "../styles/SearchComponent.css"
import {register, getProfile} from "../services/UserService.js";

class RegisterComponent extends React.Component{
    state = {
        usernameFld: '',
        passwordFld: '',
        firstname: '',
        lastname: ''
    }
    updateForm = (newState) => {
        this.setState(newState)
    }
    handleLogin = async() => {
        var newUser = {
            username: this.state.usernameFld,
            password: this.state.passwordFld,
            first: this.state.firstname,
            last: this.state.lastname
        }
        var response = await register(newUser);
        console.log(response);
        if(response.message===`User ${this.state.usernameFld} already exists`){
            alert("Username already exists, try logging in again or register with a different name");
        }
        else{
            this.props.history.push(`/dashboard`)
        }
    }
    render(){
        return(
            <div className="container">
                <div className="card vertical-center">
                    <div className="card-header heading">
                        Register
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Username</label>
                            <input type="email" 
                                   className="form-control" 
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   placeholder="Enter username"
                                   onChange={(e) => this.updateForm({
                                    usernameFld: e.target.value
                                   })}
                                   value={this.state.usernameFld}
                                   />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder="Password"
                            onChange={(e) => this.updateForm({
                                    passwordFld: e.target.value
                                })}
                            value={this.state.passwordFld}
                            />
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" 
                                   className="form-control" 
                                   placeholder="Enter first name"
                                   onChange={(e) => this.updateForm({
                                    firstname: e.target.value
                                   })}
                                   value={this.state.firstname}
                                   />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" 
                                   className="form-control" 
                                   placeholder="Enter last name"
                                   onChange={(e) => this.updateForm({
                                    lastname: e.target.value
                                   })}
                                   value={this.state.lastname}
                                   />
                        </div>
                    <button className = "btn btn-success centerer" onClick={this.handleLogin}>Register</button>
                    </div>
                    <div className="card-footer">
                        <Link to = {"/login"}>
                            <a>Already have an account? Click here to login</a>
                        </Link>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withRouter(RegisterComponent)