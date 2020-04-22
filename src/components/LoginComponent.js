import React from "react";
import {Link, withRouter} from 'react-router-dom'
import {withCookies} from 'react-cookie'
import "../styles/SearchComponent.css"
import {login, getProfile} from "../services/UserService.js";

class LoginComponent extends React.Component{
    state = {
        usernameFld: '',
        passwordFld: ''
    }
    updateForm = (newState) => {
        this.setState(newState)
    }
    handleLogin = async() => {
        var ltkn = {
            username: this.state.usernameFld,
            password: this.state.passwordFld
        }
        var response = await login(ltkn);
        if(response.message===`User ${this.state.usernameFld} not found`){
            alert("Login failed, username or password invalid");
        }
        else{
            this.props.cookies.set('currentUser', response, { path: '/', maxAge: 3600 });
            this.props.history.push(`/profile`)
        }
    }
    render(){
        console.log(this.props.cookies.get('currentUser'))
        return(
            <div className="container">
                <div className="card vertical-center">
                    <div className="card-header heading">
                        Login
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
                    <button className = "btn btn-success centerer" onClick={this.handleLogin}>Login</button>
                    </div>
                    <div className="card-footer">
                        <Link to = {"/register"}>
                            <a href="#">New to BrainCoffee? Create a new account!</a>
                        </Link>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withCookies(withRouter(LoginComponent))