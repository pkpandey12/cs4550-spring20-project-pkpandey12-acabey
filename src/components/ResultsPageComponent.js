import React from "react"
import {Link, BrowserRouter as Router} from "react-router-dom"
import test from "../test.json";
import ResultComponent from "./ResultComponent.js"
import TopicResultComponent from "./TopicResultComponent.js"
import UserResultComponent from "./UserResultComponent.js"
import CategoryResultComponent from "./CategoryResultComponent.js"
import { findSearchBytes, getCategories, getPagesInCategory } from "../services/BiteService"
import {findUser} from "../services/UserService"
import "../styles/ResultsPageComponent.css"
import { valueToNode } from "@babel/types";

class ResultsPageComponent extends React.Component{
    state={
        editing: false,
        searchQuery: this.props.keyword,
        bites : [],
        tab: 0,
        topics: [],
        users: [],
        pageId: 0,
        pagesInCategory: []
    }
    updateForm = (newState) => {
        this.setState(newState)
    }
    componentDidMount = async () => {
        const t = this.props.tab
        console.log("t ="+t)
        if(t==3){
            this.setState({
                tab: 3
            })
        }
        const dbgvar = (await findSearchBytes(this.props.keyword)).query
        console.log(dbgvar)
        this.setState({
            pageId: (dbgvar).search[0].pageid
        })
        this.setState ({
            bites: (dbgvar).search,
            topics : (await getCategories(dbgvar.search[0].title)).query.pages[this.state.pageId].categories,
            users: this.findUsers((await findUser(this.props.keyword))),
            pagesInCategory: (await getPagesInCategory(this.props.keyword)).query.categorymembers
        })
        console.log(this.state.pagesInCategory)
    }
    findUsers = (userArray) => {
        const keyword = this.props.keyword
        return userArray.filter(function(u,index){return u.username===keyword})
    }
    updateForm = (newState) => {
        this.setState(newState)
    }
    render(){
        var aClass = "btn btn-light"
        var tClass = "btn btn-light"
        var uClass = "btn btn-light"
        var cClass = "btn btn-light"
        if(this.state.tab===0){
            aClass ="btn btn-success"
        }
        else if(this.state.tab===1){
            tClass = "btn btn-success"
        }
        else if(this.state.tab===2){
            uClass = "btn btn-success"
        }
        else if(this.state.tab===3){
            cClass = "btn btn-success"
        }
        return(
            <div className="container">
                <Link to={"/search"}>
                    <button className="btn btn-danger go-back-link"> Search for Something Else?</button>
                </Link>
                <div className="card">
                    <div className="card-heading heading">Search Results</div>
                <div className="card-body">
                    <div className="btn-group flexer flex-wrap">
                        <button className={aClass} onClick={() => this.updateForm({
                                    tab: 0
                                })}>Articles</button>
                        <button className={tClass} onClick={() => this.updateForm({
                                    tab: 1
                                })}>Related Topics</button>
                        <button className={uClass} onClick={() => this.updateForm({
                                    tab: 2
                                })}>Users</button>
                        <button className={cClass} onClick={() => this.updateForm({
                                    tab: 3
                                })}>Pages in Topic</button>
                    </div>
                </div>
                </div>
                <ul className="list-group">
                    {(this.state.tab===3)&&
                        this.state.pagesInCategory.map(function(t, index){
                            console.log(t)
                            return(
                                <CategoryResultComponent
                                    test={t}
                                />
                            )
                        }

                        )
                    }
                    {(this.state.tab===2)&&(this.state.users.length===0)&&
                        <li className="list-group-item list-group-item-danger">
                            No users found with that username
                        </li>
                    }
                    {(this.state.tab===2)&&(this.state.users)&&
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