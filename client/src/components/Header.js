import React from 'react';
import {Link} from 'react-router-dom';           //Link to reload browser components on click the link eg. about ,shop (it will generate the url path  just as link for other component)
const Header =()=>{
return(
    <nav style={{backgroundColor:'#42a5f5'}} >
        <div  className="nav-wrapper" >
            <Link to={'/'} className="brand-logo" style={{marginLeft:12}}>Info Bot</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to={'/'}>Home</Link></li>
             <li><Link to={'/Chatbot'}>Chatbot</Link></li>
             <li><Link to={'/Contact'}>Contact</Link></li>
        </ul>
        </div>  
    </nav>
)
};

export default Header;