import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  useHistory,
  NavLink,
} from "react-router-dom";

import Form from "./components/Form";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route exact path="/" component={Form} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>

      {/* <Form/> 
<Login/> */}
    </>
  );
}

export default App;
