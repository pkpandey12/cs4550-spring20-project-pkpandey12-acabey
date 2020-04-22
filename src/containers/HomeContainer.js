import React from "react";
import {BrowserRouter as Router, Link, Route, useLocation} from "react-router-dom";
import { withCookies } from 'react-cookie';
import SearchComponent from "../components/SearchComponent.js";
import ResultsPageComponent from "../components/ResultsPageComponent.js"
import BiteComponent from "../components/BiteComponent.js"
import LoginComponent from "../components/LoginComponent.js";
import RegisterComponent from "../components/RegisterComponent.js"
import DashboardComponent from "../components/DashboardComponent.js"
import {getProfile} from "../services/UserService.js"
import ProfileComponent from "../components/ProfileComponent.js";
class HomeContainer extends React.Component{
    state={
        showSearch: false,
        loggedIn: false
    }

    useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    componentDidMount = () => {
        this.setState({
            loggedIn: function(){ if(getProfile()) {return true} else {return false} }
        })
        console.log(this.state.loggedIn)
    }


    render(){
        var query = "hello"
        return(
            <div className="background">
            <Router>
            <Route  path="/"
                    exact = {true}
                    render={(props)=>
                    <SearchComponent/>}
                    />
            <Route path="/login"
                   exact={true}
                   render={(props)=>
                        <LoginComponent
                            cookies={this.props.cookies}
                        />}
                        />
            <Route path="/register"
                   exact={true}
                   render={(props)=>
                        <RegisterComponent
                            cookies={this.props.cookies}
                        />}
                        />
            <Route path="/profile"
                   exact={true}
                   render={(props)=>
                        <DashboardComponent
                            cookies={this.props.cookies}
                        />}
                        />
            <Route path="/search"
                   exact={true}
                   render={(props)=>
                        <SearchComponent
                            cookies={this.props.cookies}
                        />}/>
            <Route path="/search/query/:keyword"
                   exact = {true}
                   render={(props)=>
                        <ResultsPageComponent
                            {...props}
                            cookies={this.props.cookies}
                            keyword = {props.match.params.keyword}
                        />}
            />
            <Route path="/search/query/:keyword/:tab"
                   exact = {true}
                   render={(props)=>
                        <ResultsPageComponent
                            {...props}
                            cookies={this.props.cookies}
                            keyword = {props.match.params.keyword}
                            tab={props.match.params.tab}
                        />}
            />
            <Route path="/bites/:biteId"
                   exact= {true}
                   render ={(props)=>
                        <BiteComponent
                            {...props}
                            cookies={this.props.cookies}
                            biteId= {props.match.params.biteId}
                        />}
            />
            <Route path="/user/:userId"
                    exact ={true}
                    render = {(props)=>
                    <ProfileComponent
                        {...props}
                        userId = {props.match.params.userId}
                        />}/>
            </Router>
            </div>
        )
    }

}

export default withCookies(HomeContainer)