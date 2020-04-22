import React from "react";
import {Link, BrowserRouter as Router} from "react-router-dom";
import {withCookies} from "react-cookie"
import "../styles/BiteComponent.css"
import { getPageExtract, getCategories, findSearchBytes, saveBite } from "../services/BiteService"
class BiteComponent extends React.Component{
    state = {
        categories : [],
        bite : {},
        pageId : 0,
        extract: ""
    }
    componentDidMount = async() =>{
        const dbgvar = await findSearchBytes(this.props.biteId)
        console.log(dbgvar)
        this.setState({
            pageId: (dbgvar).query.search[0].pageid
        })
        this.setState({
            bite : (await getPageExtract(this.props.biteId)).query.pages[this.state.pageId],
            categories : (await getCategories(this.props.biteId)).query.pages[this.state.pageId].categories
        })
        this.setState({
            extract: this.state.bite.extract
        })
        console.log(this.props.biteId)
        console.log(await getPageExtract(this.props.biteId))
        console.log(this.state.bite)
        console.log(this.state.categories)
    }
    handleSave = async() => {
        if(this.props.cookies.get('currentUser')) {
        var userId = this.props.cookies.get('currentUser')._id
        const newBite = {
            name: this.state.bite.title,
            topics: this.simplifyCategories,
            userIds: [userId],
            hits: 0
        }
        const response = await saveBite(newBite)
        console.log(response)
        alert(response.name+" has been saved!")
        }
        else{
            alert("You must login to save a bite, go back to home page to do that")
        }
    }
    simplifyCategories = () => {
       return this.state.categories.map(function(t,index) {return (t.title.substring(9))})
    }
    render() {
        const biteName = this.props.biteId.replace(/ /g, "%20")
        return(
        <div className="container">
                <Link to={`/search/query/${biteName}`}>
                    <button className="btn btn-danger go-back-link"> Back to Search Results </button>
                </Link>
            <div className="card">
                <h1 className="card-header aligner-bite">
                    {this.state.bite.title}
                </h1>
                <div className="card-body"> {this.state.extract.split('\n')[0] } </div>
                <div className="card-body">
                    <button className="btn btn-success" onClick={this.handleSave}>
                        Save this Byte for later
                    </button>
                </div>
                <ul className="list-group">
                    {(Array.isArray(this.state.categories) && this.state.categories.length) &&
                    <li className="list-group-item list-group-item-success">
                        Relevant Categories
                    </li>}
                    {
                        this.state.categories.map(function(t, index){
                            return(
                                <Link to={`/search/query/${t.title.substring(9)}/3`}>
                                <li className="list-group-item">
                                    {t.title.substring(9)}
                                </li>
                                </Link>
                            )
                        }

                        )
                    }
                </ul>
            </div>
        </div>
        ) 
    }

}

export default withCookies(BiteComponent)