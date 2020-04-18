import React from "react";
import {Link, BrowserRouter as Router, withRouter} from "react-router-dom";
import "../styles/SearchComponent.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from "@fortawesome/free-solid-svg-icons"

class SearchComponent extends React.Component{
    state={
        editing: false,
        searchQuery: "Search for a Bite?"
    }
    updateForm = (newState) => {
        this.setState(newState)
    }
    handleEnter = (e) => {
        if(e.key === "Enter"){
            this.props.history.push(`/search/query/`+this.state.searchQuery)
        }
    }
    render(){
        return(
            <div className="container">
                <div className="card vertical-center">
                    <div className="card-header heading">
                        BrainCoffee
                    </div>
                    <div className="card-body flexer">
                    <input className= "form-control" onChange={(e) => this.updateForm({
                                    searchQuery: e.target.value
                                })}
                                value={this.state.searchQuery} onKeyPress={this.handleEnter}/>
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