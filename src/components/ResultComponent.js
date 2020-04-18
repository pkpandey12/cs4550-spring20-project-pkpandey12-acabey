import React from "react";
import {Link, BrowserRouter as Router} from "react-router-dom";
import "../styles/ResultComponent.css"
const ResultComponent = ({test}) => 
<li className="list-group-item">
    <Link to={`/bites/`+test.title}>          
        {test.title}
    </Link>
    <br></br>
    <div dangerouslySetInnerHTML={{ __html: test.snippet }} />
</li>

export default ResultComponent