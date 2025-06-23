import React from "react";
import "./Footer.css";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";

const Footer = () => {
  return (
    <section className="footer">
      <p>© 2025 Harsh Bisla, Inc</p>
      <div className="icons">
        <FaInstagram />
        <CiLinkedin />
        <CiTwitter />
      </div>
    </section>
  );
};

export default Footer;
