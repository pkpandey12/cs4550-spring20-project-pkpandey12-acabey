import React from "react"
import {Link, BrowserRouter as Router} from "react-router-dom"
import test from "../test.json";
import ResultComponent from "./ResultComponent.js"
import TopicResultComponent from "./TopicResultComponent.js"
import UserResultComponent from "./UserResultComponent.js"
import { findSearchBytes, getCategories } from "../services/BiteService"
import {findUser} from "../services/UserService"
import "../styles/ResultsPageComponent.css"

class ResultsPageComponent extends React.Component{
    state={
        editing: false,
        searchQuery: this.props.keyword,
        bites : [],
        tab: 0,
        topics: [],
        users: [],
        pageId: 0
    }
    updateForm = (newState) => {
        this.setState(newState)
    }
    componentDidMount = async () => {
        this.setState({
            pageId: (await findSearchBytes(this.props.keyword)).query.search[0].pageid
        })
        this.setState ({
            bites: (await findSearchBytes(this.props.keyword)).query.search,
            topics : (await getCategories(this.props.keyword)).query.pages[this.state.pageId].categories,
            users: (await findUser(this.props.keyword))
        })
    }
    updateForm = (newState) => {
        this.setState(newState)
    }
    render(){
        console.log(this.state.bites)
        var aClass = "btn btn-light"
        var tClass = "btn btn-light"
        var uClass = "btn btn-light"
        if(this.state.tab===0){
            aClass ="btn btn-success"
        }
        else if(this.state.tab===1){
            tClass = "btn btn-success"
        }
        else if(this.state.tab===2){
            uClass = "btn btn-success"
        }
        console.log(aClass)
        return(
            <div className="container">
                <Link to={"/search"}>
                    <button className="btn btn-danger go-back-link"> Search for Something Else?</button>
                </Link>
                <div className="card">
                    <div className="card-heading heading">Search Results</div>
                <div className="card-body">
                    <div className="btn-group flexer">
                        <button className={aClass} onClick={() => this.updateForm({
                                    tab: 0
                                })}>Articles</button>
                        <button className={tClass} onClick={() => this.updateForm({
                                    tab: 1
                                })}>Topics</button>
                        <button className={uClass} onClick={() => this.updateForm({
                                    tab: 2
                                })}>Users</button>
                    </div>
                </div>
                </div>
                <ul className="list-group">
                    {(this.state.tab===2)&&
                        this.state.users.map(function(t, index){
                            return(
                                <UserResultComponent
                                    test={t}
                                />
                            )
                        }

                        )
                    }
                    {(this.state.tab===1)&&
                        this.state.topics.map(function(t, index){
                            return(
                                <TopicResultComponent
                                    test={t}
                                />
                            )
                        }

                        )
                    }
                    {(this.state.tab===0)&&
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