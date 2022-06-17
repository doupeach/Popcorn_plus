import React, { useState, useEffect } from "react";
import "./PersonalList.css";
import { Link, useParams } from "react-router-dom";
import noCastPhoto from "../../images/cast-default-photo.png";
import Loading from "../../components/Loading/Loading";
import { getDocumentRef } from "../../utils/firebaseActions";
import { fetchCollectionMovies } from "../../utils/api";

function PersonalList() {
  const { id } = useParams();
  const [lists, setLists] = useState();
  const [listData, setListData] = useState();
  const [owner, setOwner] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDocumentRef("lists", id).onSnapshot((doc) => {
      setLists(doc.data());
    });
  }, []);

  useEffect(() => {
    if (lists) {
      fetchCollectionMovies(lists.list_data).then((movies) => {
        setListData(movies);
        setIsLoading(false);
      });
      getDocumentRef("users", lists.owner)
        .get()
        .then((doc) => {
          setOwner(doc.data());
        });
    }
  }, [lists]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {listData.length !== 0 && owner ? (
            <div className="search-result-container">
              <h2 id="query">{lists.list_name}</h2>
              <div className="profile">
                <img
                  className="owner-photo"
                  src={owner?.photoUrl}
                  alt="owner-photo"
                />
                <h2 id="owner">{owner?.name}</h2>
              </div>
              <div className="search-result">
                {listData.map((result) => {
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
              <h2 id="query">{lists.list_name}</h2>
              <div className="no-list-movie">
                <div>There's no any movie in the list.</div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default PersonalList;
