import React, { useState, useEffect } from "react";
import "./SearchResult.css";
import { Link, useParams } from "react-router-dom";
import { fetchSearch } from "../../utils/api";
import noCastPhoto from "../../images/cast-default-photo.png";
import Loading from "../../components/Loading/Loading";

function SearchResult() {
  const { query } = useParams();
  const [searchInfo, setSearchInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchSearch(query).then((res) => {
        setSearchInfo(res);
        setIsLoading(false);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {searchInfo?.results.length > 0 ? (
            <div className="search-result-container">
              <h2 id="query">Search result of "{query}"</h2>

              <div className="search-result">
                {searchInfo?.results.map((result) => {
                  const url = result.poster_path
                    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                    : noCastPhoto;
                  return (
                    <Link to={`/movie/${result.id}`}>
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
            <div className="search-not-found">
              <div>Your search for "{query}" did not have any matches.</div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SearchResult;
