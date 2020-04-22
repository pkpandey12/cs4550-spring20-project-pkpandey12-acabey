import React from "react";
import {Link, BrowserRouter as Router, withRouter} from "react-router-dom";
import {withCookies} from 'react-cookie';
import "../styles/SearchComponent.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch, faCoffee} from "@fortawesome/free-solid-svg-icons"
import {getProfile} from "../services/UserService.js"

class SearchComponent extends React.Component{
    state={
        editing: false,
        searchQuery: "",
        loggedIn: false,
        user: {}
    }
    updateForm = (newState) => {
        this.setState(newState)
    }
    handleEnter = (e) => {
        if(e.key === "Enter"){
            this.props.history.push(`/search/query/`+this.state.searchQuery)
        }
    }
    componentDidMount = () => {
        var hasUser = this.props.cookies.get('currentUser')
        if(hasUser){
            this.setState({
                user: hasUser,
                loggedIn: true
            })
        }
        else{
            this.setState({
                user: {},
                loggedIn: false
            })
        }
    }
    handleLogout = () =>{
        this.props.cookies.remove('currentUser', { path: '/', maxAge: 3600 });
        this.props.history.push(`/`)
        console.log(this.props.cookies.get('currentUser'))
    }
    render(){
        return(
            <div className="container">
                {this.state.loggedIn &&
                    <div className="pb-2 mt-4 mb-2">
                    <div className="float-right">
                    <div className="btn-group" role="group" aria-label="First group">
                            <button className="btn btn-success">
                            <Link to={"/profile"}>
                                <span className="colerer">{this.state.user.first}'s Dashboard</span>
                            </Link>
                            </button>
                            <button className="btn btn-danger" onClick={()=>this.handleLogout()}>
                                    <span className="colerer">Log out</span>
                            </button>
                    </div>
                    </div>
                </div>
                }
                {!this.state.loggedIn && 
                <div className="pb-2 mt-4 mb-2">
                    <div className="float-right">
                    <div className="btn-group" role="group" aria-label="First group">
                            <button className="btn btn-success">
                            <Link to={"/login"}>
                                <span className="colerer">Login</span>
                            </Link>
                            </button>
                            <button className="btn btn-primary">
                            <Link to={"/register"}>
                                <span className="colerer">Register</span>
                            </Link>
                            </button>
                    </div>
                    </div>
                </div>
                }
                <div className="card vertical-center">
                    <div className="card-header heading">
                        BrainCoffee <FontAwesomeIcon icon={faCoffee}></FontAwesomeIcon>
                    </div>
                    <div className="card-body flexer">
                    <input className= "form-control" onChange={(e) => this.updateForm({
                                    searchQuery: e.target.value
                                })}
                                value={this.state.searchQuery} onKeyPress={this.handleEnter}
                                    placeholder = "Search for a bite?"
                                />
                    <Link to={`/search/query/`+this.state.searchQuery}>          
                    <button className="btn btn-success"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                    </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default withCookies(withRouter(SearchComponent))