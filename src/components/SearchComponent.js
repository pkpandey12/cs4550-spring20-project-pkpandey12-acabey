import React from "react";
import {Link, BrowserRouter as Router, withRouter} from "react-router-dom";
import "../styles/SearchComponent.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from "@fortawesome/free-solid-svg-icons"
import {getProfile} from "../services/UserService.js"

class SearchComponent extends React.Component{
    state={
        editing: false,
        searchQuery: "",
        loggedIn: false
    }
    updateForm = (newState) => {
        this.setState(newState)
    }
    handleEnter = (e) => {
        if(e.key === "Enter"){
            this.props.history.push(`/search/query/`+this.state.searchQuery)
        }
    }  
    componentDidMount = async() => {
        const response = await getProfile()
        console.log(response)
        console.log(this.state.loggedIn)
    }
    render(){
        console.log("Logged in? "+this.state.loggedIn)
        return(
            <div className="container">
                {this.state.loggedIn &&
                    <div className="pb-2 mt-4 mb-2">
                    <div className="float-right">
                    <div className="btn-group" role="group" aria-label="First group">
                            <button className="btn btn-success">
                            <Link to={"/dashboard"}>
                                <span className="colerer">Dashboard</span>
                            </Link>
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
                        BrainCoffee
                    </div>
                    <div className="card-body flexer">
                    <input className= "form-control" onChange={(e) => this.updateForm({
                                    searchQuery: e.target.value
                                })}
                                value={this.state.searchQuery} onKeyPress={this.handleEnter}
                                    placeholder = {this.state.searchQuery}
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

export default withRouter(SearchComponent)