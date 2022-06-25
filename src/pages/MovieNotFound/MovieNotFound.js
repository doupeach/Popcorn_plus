import React from "react";
import './MovieNotFound.css'
import notFoundimg from "../../images/jerrySteal.gif"

function MovieNotFound() {
  return (
    <div className="movie-not-found">
      <img id="notFoundimg" src={notFoundimg} alt="notFoundimg"/>
      <div>Oops! Please try again!</div>
    </div>
  );
}

export default MovieNotFound;
