import React from 'react'
import './Home.css'
import {Link} from "react-router-dom";



function Client() {
    return (
        <div className= "links">
           <Link to="Form" className="client-link">Client Portal</Link>  
           <Link to="Dashboard" className="Admin-link">Admin Hub</Link>            
        </div>
        
    )
}

export default Client
