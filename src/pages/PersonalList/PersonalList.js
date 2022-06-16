import React, { useState, useEffect } from "react";
import "./PersonalList.css";
import { Link, useParams, useLocation } from "react-router-dom";
import noCastPhoto from "../../images/cast-default-photo.png";
import Loading from "../../components/Loading/Loading";

function PersonalList() {
  const {
    state: { data },
  } = useLocation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setIsLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data.data.length !== 0 ? (
            <div className="search-result-container">
              <h2 id="query">{data.name}</h2>

              <div className="search-result">
                {data.data.map((result) => {
                  const url = result.poster_path
                    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                    : noCastPhoto;
                  return (
                    <Link to={`/movie/${result.id}`} key={result.id}>
                      <div className="search-card">
                        <img className="search-poster" src={url} alt="" />
                        <div className="search-title">
                          {result.original_title}
                        </div>
                        <div className="search-rating">
                          {result.vote_average}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="search-result-container">
              <h2 id="query">{data.name}</h2>
              <div className="no-list-movie">
                <div>Your did not have any movie in the list.</div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default PersonalList;
