import React from "react"
import {Link, BrowserRouter as Router} from "react-router-dom"
import test from "../test.json";
import ResultComponent from "./ResultComponent.js"
import { findSearchBytes } from "../services/BiteService"
import "../styles/ResultsPageComponent.css"

class ResultsPageComponent extends React.Component{
    state={
        editing: false,
        searchQuery: this.props.keyword,
        bites : [],
        tab: "basic search"
    }
    updateForm = (newState) => {
        this.setState(newState)
    }
    componentDidMount = async () => {
        this.setState ({
            bites: (await findSearchBytes(this.props.keyword)).query.search
        })
    }
    render(){
        console.log(this.state.bites)
        return(
            <div className="container">
                <Link to={"/search"}>
                    <button className="btn btn-danger go-back-link"> Search for Something Else?</button>
                </Link>
                <div className="card">
                    <div className="card-heading heading">Search Results</div>
                </div>
                <ul className="list-group">
                    {
                        this.state.bites.map(function(t, index){
                            return(
                                <ResultComponent
                                    test={t}
                                />
                            )
                        }

                        )
                    }
                </ul>
            </div>
            
        )
    }
}

export default ResultsPageComponent