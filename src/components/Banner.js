import { useState } from "react";
import "./Banner.css";
import infoLogo from "../images/info_circle_outline.png";
import Loading from "./loading/Loading";

function Banner({ movieData, trailerKey }) {
  console.log(movieData, trailerKey);
  return (
    <>
      {movieData ? (
        <div className="banner">
          <img
            id="banner-bg"
            src={`https://image.tmdb.org/t/p/w1280/${movieData.backdrop_path}`}
          />
          <h2 id="movie-title">{movieData.title}</h2>
          <h3 id="movie-release-date">{movieData.release_date}</h3>
          <div id="banner-btn">
            <img src={infoLogo} />
            <p>More Info</p>
          </div>
        </div>
      ) : (
        // temporary banner loading
        <Loading />
      )}
    </>
  );
}

export default Banner;
