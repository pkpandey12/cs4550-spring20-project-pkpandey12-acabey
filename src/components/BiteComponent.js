import React from "react";
import {Link, BrowserRouter as Router} from "react-router-dom";
import "../styles/BiteComponent.css"
import { getPageExtract, getCategories, findSearchBytes } from "../services/BiteService"
class BiteComponent extends React.Component{
    state = {
        categories : [],
        bite : {},
        pageId : 0,
        extract: ""
    }
    componentDidMount = async() =>{
        this.setState({
            pageId: (await findSearchBytes(this.props.biteId)).query.search[0].pageid
        })
        this.setState({
            bite : (await getPageExtract(this.props.biteId)).query.pages[this.state.pageId],
            categories : (await getCategories(this.props.biteId)).query.pages[this.state.pageId].categories
        })
        this.setState({
            extract: this.state.bite.extract
        })
        console.log(this.props.biteId)
        console.log(this.state.bite)
        console.log(this.state.categories)
    }
    render() {
        const biteName = this.props.biteId.replace(/ /g, "%20")
        return(
        <div className="container">
                <Link to={`/search/query/${biteName}`}>
                    <button className="btn btn-danger go-back-link"> Back to Search Results </button>
                </Link>
            <div className="card">
                <div className="card-heading heading">
                    {this.state.bite.title}
                </div>
                <div className="card-body"> {this.state.extract.split('\n')[0] } </div>
                <ul className="list-group">
                    {(Array.isArray(this.state.categories) && this.state.categories.length) &&
                    <li className="list-group-item list-group-item-success">
                        Relevant Categories
                    </li>}
                    {
                        this.state.categories.map(function(t, index){
                            return(
                                <li className="list-group-item">
                                    {t.title.substring(9)}
                                </li>
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

export default BiteComponent