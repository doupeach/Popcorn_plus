import { useState } from "react";
import "./Banner.css";
import infoLogo from "../../images/info_circle_outline.png";
import Loading from "../Loading/Loading";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import BannerHoverCard from "../BannerHoverCard/BannerHoverCard";

const contentStyle = { background: 'rgb(22, 21, 21)' ,border: '1px solid rgb(22, 21, 21)' ,padding:"0"};
const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
const arrowStyle = { color: '#000' }; // style for an svg element


function Banner({ movieData, trailerKey }) {
  // console.log(movieData, trailerKey);
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
            <Popup
              trigger={ <p className="button"> More Info</p>}
              modal
              nested
              {...{ contentStyle, overlayStyle, arrowStyle }}
            >
              {(close) => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="content">
                    <BannerHoverCard movieData={movieData} trailerKey={trailerKey} />
                  </div>
                  
                </div>
              )}
            </Popup>
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
