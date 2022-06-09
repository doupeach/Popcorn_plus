import React, { useEffect, useState } from "react";
import "./MyList.css";
import { Link } from "react-router-dom";
import { fetchCollectionMovies } from "../../utils/api";
import Loading from "../../components/Loading/Loading";
import noCastPhoto from "../../images/cast-default-photo.png";

function MyList({ uid, currentUserInfo }) {
  const [isLoading, setIsLoading] = useState(true);
  const [collectionInfo, setCollectionInfo] = useState();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      currentUserInfo &&
        fetchCollectionMovies(currentUserInfo.my_list).then((movieInfo) => {
          setCollectionInfo(movieInfo);
          setIsLoading(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [currentUserInfo]);

  console.log(collectionInfo);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {collectionInfo?.length > 0 ? (
            <div className="search-result-container">
              <h2 id="query">My List of "{currentUserInfo.name}"</h2>

              <div className="search-result">
                {collectionInfo?.map((result) => {
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
            <div className="list-not-found">
              <h1>Oops! You don't have any movie in your list.</h1>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MyList;
