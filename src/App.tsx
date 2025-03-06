import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import HomePlan from "./components/HomePlan";
import HomeNav from "./components/HomNav";

function App() {
  return (
    <BrowserRouter>
      
      
      <Routes>
        <Route path="/" element={<Form />} />
        <Route  path="/login" element={<Login />} />
        <Route path="/homeplan" element={<HomePlan />} />
        {/* <Route><HomePlan /></Route> */}
      
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
