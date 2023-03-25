import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="not-found">
      <h1>OOOPS!</h1>
      <h5>
        <span>404</span> Page not found
      </h5>
      <Link to="/">Back to Home <FaHome /> </Link>
    </section>
  );
};

export default NotFound;
