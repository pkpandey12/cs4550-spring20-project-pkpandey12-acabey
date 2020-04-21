import React from "react";
import {Link, BrowserRouter as Router} from "react-router-dom";
import "../styles/ResultComponent.css"
const CategoryResultComponent = ({test}) => 
<li className="list-group-item">
    <Link to={`/bites/`+test.title}>          
        {test.title}
    </Link>
    <br></br>
</li>

export default CategoryResultComponent