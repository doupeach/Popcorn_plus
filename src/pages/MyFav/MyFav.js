import React, { useState, useEffect } from "react";
import "./MyFav.css";
import { Link } from "react-router-dom";
import noCastPhoto from "../../images/cast-default-photo.png";
import Loading from "../../components/Loading/Loading";

function MyFav({ favInfo, currentUserInfo, uid }) {
  const [favs, setFavs] = useState(favInfo);

  useEffect(() => {
    if (favInfo) {
      setFavs(favInfo);
    }
  }, [favInfo]);

  return (
    <>
      {!favInfo ? (
        <Loading />
      ) : (
        <>
          {favs?.length !== 0 ? (
            <div className="myfav-result-container">
              <h2 id="myfav-main-title">
                Favorites of "{currentUserInfo.name}"
              </h2>

              <div className="myfav-result">
                {favs
                  ?.slice(0)
                  .reverse()
                  .map((result) => {
                    const url = result.poster_path
                      ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                      : noCastPhoto;
                    return (
                      <Link to={`/movie/${result.id}`} key={result.id}>
                        <div className="myfav-card">
                          <img className="myfav-poster" src={url} alt="" />
                          <div className="myfav-title">
                            {result.original_title}
                          </div>
                          <div className="myfav-rating">
                            {result.vote_average}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="myfav-result-container">
              <div className="no-list-movie">
                <div>It seems you haven't liked any movies yet.</div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MyFav;
