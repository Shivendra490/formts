import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
