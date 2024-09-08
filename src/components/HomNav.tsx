import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// type styleprops={
//   style:React.CSSProperties
// }

const HomeNav = () => {
  const logoutHandler=()=>{
    localStorage.removeItem("tokenKey")
  }
  return (
    <header className="header-wrapper">
      <Link to="/homeplan"> Home </Link>
      <Link to="/login" onClick={logoutHandler}> Logout</Link>
      
     
    </header>
  );
};

export default HomeNav;
