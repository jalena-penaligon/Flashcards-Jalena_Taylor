import React from "react";
import { Link } from "react-router-dom";

function Navigation({ currentPage, previousPage, previousPageUrl }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">
            <span className="oi oi-home me-1"></span> Home
          </Link>
        </li>
        {previousPage && (
          <li className="breadcrumb-item">
            <Link to={previousPageUrl}>{previousPage}</Link>
          </li>
        )}
        <li className="breadcrumb-item active" aria-current="page">
          {currentPage}
        </li>
      </ol>
    </nav>
  );
}

export default Navigation;
