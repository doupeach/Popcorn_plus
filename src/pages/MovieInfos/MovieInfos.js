import React, { useEffect, useState } from "react";
import "./MovieInfos.css";
import playBtn from "../../images/playBTN.png";
import noCastPhoto from "../../images/cast-default-photo.png";
import ModalVideo from "react-modal-video";
import { fetchMovie, fetchCast } from "../../utils/api";
import { useParams, useHistory } from "react-router-dom";
import AddToList from "../../components/AddToList/AddToList";
import AddToCollection from "../../components/AddToCollection/AddToCollection";
import Shares from "../../components/Shares/Shares";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";

function MovieInfos() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState();
  const [castInfo, setCastInfo] = useState();
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState();
  const currentUserInfo = useSelector((state) => state.currentUserInfo);
  const uid = currentUserInfo?.uid

  function getDirector() {
    let directorName = "";
    castInfo.crew.forEach((crew) => {
      if (crew.job === "Director") {
        directorName = crew.name;
      }
    });
    return directorName;
  }

  function getDirectorImage() {
    let directorImg = "";
    castInfo.crew.forEach((crew) => {
      if (crew.job === "Director") {
        directorImg = crew.profile_path
          ? `https://image.tmdb.org/t/p/w500${crew.profile_path}`
          : noCastPhoto;
      }
    });
    return directorImg;
  }

  useEffect(() => {
    let isMount = true;
    if (movieDetail && isMount) {
      if (movieDetail.videos?.results.length > 0) {
        setTrailerKey(movieDetail.videos.results[0].key);
      } else {
        setTrailerKey(undefined);
      }
      return () => {
        isMount = false; // 清除fetchAPI
      };
    }
  }, [movieDetail]);

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      fetchMovie(id).then((res) => {
        if (res.status_code === 34 || res.adult) {
          history.push("/movienotfound");
        } else {
          setMovieDetail(res);
        }
      });
    }
    return () => {
      isMount = false; // 清除fetchAPI
    };
  }, [id]);

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      fetchCast(id).then((res) => {
        if (res.status_code === 34) {
          return;
        } else {
          setCastInfo(res);
        }
      });
    }
    return () => {
      isMount = false; // 清除fetchAPI
    };
  }, [id]);

  return (
    <>
      {movieDetail ? (
        <>
          <div className="movie-infos">
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w1280/${
                movieDetail.backdrop_path || movieDetail.poster_path
              }`}
              alt=""
            />
            <div className="information">
              <div className="movie-title">{movieDetail.title}</div>
              <div className="movie-date">{movieDetail.release_date}</div>
              <div className="action-btns">
                {trailerKey && (
                  <div id="trailerBtn" onClick={() => setOpen(true)}>
                    <img id="detail-playBtn" src={playBtn} alt="" />
                    TRAILER
                  </div>
                )}

                <div id="infoPlus">
                  <AddToList uid={uid} movieId={parseInt(movieDetail.id, 10)} />
                </div>

                <div id="infoPopcorn">
                  <AddToCollection
                    uid={uid}
                    movieId={parseInt(movieDetail.id, 10)}
                  />
                </div>

                <Shares id="sns-shares"/>
              </div>

              <div className="movie-story">{movieDetail.overview}</div>
            </div>
            {castInfo?.crew.length !== 0 && (
              <div className="director-title">Director</div>
            )}
            {castInfo && (
              <div className="cast-card director-wrap">
                <img className="cast-img" src={getDirectorImage()} alt="" />
                <div className="director">{getDirector()}</div>
              </div>
            )}
            {castInfo?.cast.length !== 0 && (
              <div className="cast-title">Cast</div>
            )}
            <div className="cast-list">
              {castInfo?.cast?.map((member) => {
                const url = member.profile_path
                  ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                  : noCastPhoto;
                return (
                  <div key={member.cast_id} className="cast-card">
                    <img className="cast-img" src={url} alt="" />
                    <p className="cast-name">{member.name}</p>
                    <p className="cast-character">{member.character}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <ModalVideo
            channel="youtube"
            isOpen={isOpen}
            videoId={trailerKey}
            onClose={() => setOpen(false)}
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default MovieInfos;
