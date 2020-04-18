import React from "react";
import {BrowserRouter as Router, Link, Route, useLocation} from "react-router-dom";
import SearchComponent from "../components/SearchComponent.js";
import ResultsPageComponent from "../components/ResultsPageComponent.js"
import BiteComponent from "../components/BiteComponent.js"
class HomeContainer extends React.Component{
    state={
        showSearch: false,
        loggedIn: false
    }

    useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }


    render(){
        var query = "hello"
        return(
            <div className="background">
            <Router>
            <Route path="/"
                   exact={true}
                   render={(props)=>
                        <SearchComponent/>}
                        />
            <Route path="/search"
                   exact={true}
                   render={(props)=>
                        <SearchComponent/>}/>
            <Route path="/search/query/:keyword"
                   exact = {true}
                   render={(props)=>
                        <ResultsPageComponent
                            {...props}
                            keyword = {props.match.params.keyword}
                        />}
            />
            <Route path="/bites/:biteId"
                   exact= {true}
                   render ={(props)=>
                        <BiteComponent
                            {...props}
                            biteId= {props.match.params.biteId}
                        />}
            />
            </Router>
            </div>
        )
    }

}

export default HomeContainer