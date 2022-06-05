import React, { useState, useEffect } from "react";
import plusBtn from "../../images/plusBTN.png";
import popcornBtn from "../../images/popcornBTN.png";
import playBtn from "../../images/playBTN.png";
import ModalVideo from "react-modal-video";
import "./BannerHoverCard.css";
import { fetchCast } from "../../utils/api";
import AddToCollection from "../AddToCollection/AddToCollection";
import AddToList from "../AddToList/AddToList";

function BannerHoverCard({ movieData, trailerKey, uid }) {
  const [isOpen, setOpen] = useState(false);
  const [castInfo, setCastInfo] = useState();

  useEffect(() => {
    fetchCast(movieData.id).then((res) => setCastInfo(res));
  }, []);

  console.log(movieData.id);
  console.log(castInfo);
  return (
    <div id="banner-hover-card">
      <img
        id="banner-info-card-img"
        src={
          movieData.image
            ? movieData.image
            : `https://image.tmdb.org/t/p/w1280/${movieData.backdrop_path}`
        }
      ></img>
      <div id="info-card-hover-btns">
        <div id="info-card-plusBtn">
          <AddToList uid={uid} movieId={parseInt(movieData.id, 10)} />
        </div>
        <div id="info-card-popcornBtn">
          <AddToCollection uid={uid} movieId={parseInt(movieData.id, 10)} />
        </div>
        <div id="info-card-playBtn" onClick={() => setOpen(true)}>
          <img src={playBtn} />
        </div>
      </div>
      <p id="info-card-title">{movieData.title}</p>
      <div className="infos">
        <div className="info-left">
          <h4>Rating {movieData.vote_average}</h4>
          <div className="storyline">{movieData.overview}</div>
        </div>
        <div className="casts">
          <h4>Cast</h4>
          {castInfo?.cast.slice(0, 5).map((member) => {
            return <h5 key={member.name}>{member.name}</h5>;
          })}
        </div>
      </div>

      <ModalVideo
        channel="youtube"
        // youtube={{ autoplay: 1, mute: 1 }}
        isOpen={isOpen}
        videoId={trailerKey}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default BannerHoverCard;
