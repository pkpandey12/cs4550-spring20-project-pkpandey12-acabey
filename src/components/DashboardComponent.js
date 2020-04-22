import React from "react";
import {Link, withRouter} from 'react-router-dom'
import {withCookies} from 'react-cookie'
import {getBitesByUser, deleteBite} from "../services/BiteService"
import {updateUser, removeUser} from "../services/UserService"
import "../styles/DashboardComponent.css"

class DashboardComponent extends React.Component {
    state = {
        bites: [],
        usernameFld: '',
        passwordFld: '',
        firstname: '',
        lastname: '',
        sure: false
    }
    componentDidMount = async() => {
        if(this.props.cookies.get('currentUser')){
        this.setState({
            bites: await getBitesByUser(this.props.cookies.get('currentUser')._id),
            usernameFld: this.props.cookies.get('currentUser').username,
            passwordFld: '',
            firstname: this.props.cookies.get('currentUser').first,
            lastname: this.props.cookies.get('currentUser').last
        })
        console.log(this.state.bites)
    }
    }
    updateForm = (newState) => {
        this.setState(newState)
    }
    handleUpdate = async() => {
        var update = {
            username: this.state.usernameFld,
            password: (this.state.passwordFld)?this.state.passwordFld:this.props.cookies.get('currentUser').password,
            first: this.state.firstname,
            last: this.state.lastname
        }
        var response = await updateUser(this.props.cookies.get('currentUser')._id, update);
        this.props.cookies.set('currentUser', response, { path: '/', maxAge: 3600 });
        console.log(response);
    }
    handleDelete = async() => {
        const response = await removeUser(this.props.cookies.get('currentUser')._id)
        console.log(response)
        alert("User deleted")
        this.props.cookies.remove('currentUser', { path: '/', maxAge: 3600 });
        this.props.history.push(`/`)
    }
    render(){
        const user = this.props.cookies.get('currentUser')
        return(
            <div>
            {!(user)&&
                <div className="alert alert-warning">
                    <span>Create an account or login to access this page</span>    
                    <button className="btn btn-warning">
                        <Link to={'/'}>
                            Go back to home
                        </Link>
                    </button>
                </div>
            }
            {(user)&&
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
                        Dashboard
                    </div>
                    <h5 className="card-body">
                        {user.first} {user.last}'s Dashboard
                    </h5>
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
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" 
                                   className="form-control" 
                                   placeholder="Enter first name"
                                   onChange={(e) => this.updateForm({
                                    firstname: e.target.value
                                   })}
                                   value={this.state.firstname}
                                   />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" 
                                   className="form-control" 
                                   placeholder="Enter last name"
                                   onChange={(e) => this.updateForm({
                                    lastname: e.target.value
                                   })}
                                   value={this.state.lastname}
                                   />
                        </div>
                    <button className = "btn btn-success centerer" onClick={this.handleUpdate}>Update Profile</button>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                        <li className="list-group-item list-group-item-success">
                                    Saved Bites:
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
                                        <li className="list-group-item d-flex justify-content-between">
                                            <Link to={`/bites/`+t.name}>          
                                                {t.name}
                                            </Link>
                                            <button className="btn btn-danger" onClick={()=>{
                                                    deleteBite(t._id)
                                                    window.location.reload(false);
                                                }}>
                                                Delete
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        
                        </ul>
                    </div>
                    <div class="card-footer">
                            <button className="btn btn-danger" onClick={()=>this.updateForm({sure: true})}>Delete This Account</button>
                    </div>
                    {(this.state.sure)&&
                    <div class="alert alert-danger">
                        Are you absolutely sure you want to delete this account? 
                        <button className="btn btn-danger" onClick={this.handleDelete}>Yes</button>
                        <button className="btn btn-success" onClick={()=>this.updateForm({sure: false})}>No</button>
                    </div>
                    }
                </div>
            </div>}
            </div>
        )
    }
}

export default withCookies(withRouter(DashboardComponent))