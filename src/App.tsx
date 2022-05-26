import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link, Switch} from "react-router-dom";

import Form from './components/Form';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';





function App() {
  

  return (
    
    <>
            <BrowserRouter>
            <Navbar/>
       

                <Switch>
                    <Route exact path="/" component={Form}/>
                    <Route  path="/login" component={Login}/>
                    <Route  path="/welcome" component={Welcome}/>
                </Switch>
            </BrowserRouter>
      
            

      




      
    </>
    
  );
}

export default App;
