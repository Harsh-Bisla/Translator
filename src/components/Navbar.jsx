import React, { useContext, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { store } from "../context/LanguageContext";
import { IoCloseOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const { mode, setMode } = useContext(store);
  const [sidebar, setSidebar] = useState(false);

  const changeMode = () => {
    setMode(mode ? false : true);
    localStorage.setItem("mode", mode ? false : true);
  };

console.log(mode)
  const openSidear = () => {
    setSidebar(true);
  };

  const closeSidebar = () => {
    setSidebar(false);
  };

  return (
    <div className={`navbar ${mode ? "navbar-light" : ""}`}>
      <div className={`logo-box ${mode ? "logo-box-light" : ""}`}>
        <h4>Text Translator</h4>
        <div className="options" style={{ right: sidebar ? "0px" : "-100%" }}>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/"
          >
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <IoCloseOutline onClick={closeSidebar} className="close-btn" />
        </div>
      </div>
      <div className={`serach-box`}>
        <div
          onClick={changeMode}
          className={`dot-box ${mode ? "dot-box-light" : ""}`}
        >
          <div
            style={{ left: mode ? "0" : "25px" }}
            className={`dot ${mode ? "dot-light" : ""}`}
          >
            {mode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </div>
        </div>
        <input
          style={{ backgroundColor: mode ? "white" : "black" }}
          type="text"
          placeholder="Search"
        />
        <button className="search-btn">Search</button>
      </div>
      <FiMenu onClick={openSidear} className="menu-btn" />
    </div>
  );
};

export default Navbar;
