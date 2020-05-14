import React from 'react';
import { Link } from 'react-router-dom';           //Link to reload browser components on click the link eg. about ,shop (it will generate the url path  just as link for other component)
import { NavLink } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';

const Header = () => {
    return (
        //     <nav style={{ backgroundColor: '#343a40' }} >
        //         <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        //         <div className="nav-wrapper" >
        //             <Link to={'/'} className="brand-logo" style={{ marginLeft: 12 }}>Info Bot</Link>
        //             <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        // -            <ul className="right hide-on-med-and-down">
        //                 <li><Link to={'/'}>Home</Link></li>
        //                 <li><Link to={'/Chatbot'}>Chatbot</Link></li>
        //                 <li><Link to={'/Contact'}>Contact</Link></li>
        //             </ul>
        //         </div>
        //     </nav>
        <Navbar  bg="dark" variant="dark" >
            
            <Navbar.Brand href="/"><h1>InfoBot</h1></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/Chatbot">Chatbot</Nav.Link>
                    <Nav.Link href="/Contact">Contact</Nav.Link>
                </Nav>

        </Navbar>

    )
};

export default Header;