import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
    <hr />
      <footer>
        <p>© 2023 Support Desk, Inc. </p>
        <h6>Support Desk</h6>
        <ul>
          <li>Terms</li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>Services</li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
