import React from "react";
import {Link, withRouter} from 'react-router-dom'
import {withCookies} from 'react-cookie'
import {getBitesByUser} from "../services/BiteService"
import {findUserbyId} from "../services/UserService"
import "../styles/DashboardComponent.css"

class ProfileComponent extends React.Component {
    state = {
        bites: [],
        user: {}
    }
    componentDidMount = async() => {
        this.setState({
            bites: await getBitesByUser(this.props.userId),
            user: await findUserbyId(this.props.userId)
        })
        console.log(this.state.bites)
    }
    render(){
        const user = this.state.user
        return(
            <div className="container">
                <div className="pb-2 mt-4 mb-2">
                    <div className="float-left">
                    <Link to={"/search"}>
                        <button className="btn btn-danger go-back-link"> Search for Something?</button>
                    </Link>
                    </div>
                    <div className="float-right">
                    <div className="btn-group" role="group" aria-label="First group">
                            <button className="btn btn-danger">
                                <Link to={"/login"}>
                                    <span className="colerer">Log out</span>
                                </Link>
                            </button>
                    </div>
                    </div>
                </div>
                <div className="card vertical-centerer">
                    <div className="card-header heading">
                        Profile
                    </div>
                    <h5 className="card-body">
                        {user.first} {user.last}'s Profile
                    </h5>
                    <div className="card-body">
                        <ul className="list-group">
                        <li className="list-group-item list-group-item-success">
                                    Saved Bites for this user:
                                </li>
                            {
                                (this.state.bites.length===0) &&
                                <li className="list-group-item list-group-item-success">
                                <Link to={"/search"}>
                                    Hey there! You seem hungry for a byte - go search for some!
                                </Link>
                                </li>
                            }
                            { (this.state.bites) &&
                                this.state.bites.map(function(t,index){
                                    return(
                                        <li className="list-group-item">
                                            <Link to={`/bites/`+t.name}>          
                                                {t.name}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withCookies(withRouter(ProfileComponent))