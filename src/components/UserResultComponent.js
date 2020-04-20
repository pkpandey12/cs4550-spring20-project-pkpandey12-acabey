import React from "react";
import {Link, BrowserRouter as Router} from "react-router-dom";
import "../styles/ResultComponent.css"
const UserResultComponent = ({test}) => 
<li className="list-group-item">
    <Link to={`/users/`+test._id}>          
        {test.first} {test.last}
    </Link>
    <br></br>
</li>

export default UserResultComponent