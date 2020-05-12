import React from 'react';
import {BrowserRouter,Route } from 'react-router-dom';             //Browser Router for routing to different pages e.g. About,shop,etc(it will show the data based on the url path )
import Home from './pages/Home';
import contact from './pages/Contact';
import Header from './Header.js';
import Chatbot from './chatbot/Chatbot.js'

const App = () => {
        return ( <div> <BrowserRouter>     
        <div className="container">
                <Header/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/Chatbot" component={Chatbot}/>
                <Route exact path="/contact" component={contact}/>
         </div> 
          </BrowserRouter>
            </div>) }  
export default App;