import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Form from "./components/Form";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Form} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
