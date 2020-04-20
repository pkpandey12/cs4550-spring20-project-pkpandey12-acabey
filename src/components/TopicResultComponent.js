import React from "react";
import {Link, BrowserRouter as Router} from "react-router-dom";
import "../styles/ResultComponent.css"
const TopicResultComponent = ({test}) => 
<li className="list-group-item">
    <Link to={`/topics/`+test.title.substring(9)}>          
        {test.title.substring(9)}
    </Link>
    <br></br>
</li>

export default TopicResultComponent