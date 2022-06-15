import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import "./AddFromListModal.css";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { getCollectionsFieldUpdate } from "../../utils/firebaseActions";
import Swal from "sweetalert2";
import AddFromList from "../AddFromList.js/AddFromList";

function AddFromListModal({ uid, close, data, collectionInfo, noCastPhoto }) {
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const listRef = db.collection("lists");
  const firestore = firebase.firestore();
  const [isLoading, setIsLoading] = useState(false);
  const [newCollectionInfo, setNewCollectionInfo] = useState();
  const [movieIdArr, setMovieIdArr] = useState([...data.dataId]);
  const history = useHistory();

  // console.log("movieIdArr", movieIdArr);
  // console.log(collectionInfo);
  // console.log(newCollectionInfo);
  return (
    <div className="new-list-modal">
      <div className="create-new-list">Add movie from your list</div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {collectionInfo?.length > 0 ? (
              <div
                id="AF-search-result-container"
                className="search-result-container"
              >
                <div className="movie-from-mylist">
                  {collectionInfo
                    ?.slice(0)
                    .reverse()
                    .map((result) => {
                      const url = result.poster_path
                        ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                        : noCastPhoto;
                      return (
                        <div
                          id="AF-search-card"
                          className="search-card"
                          key={result.id}
                        >
                          <Link to={`/movie/${result.id}`}>
                            <img className="search-poster" src={url} alt="" />
                            <div id="AF-search-title" className="search-title">
                              {result.original_title}
                            </div>
                          </Link>
                          <AddFromList
                            uid={uid}
                            data={data}
                            movieId={result.id}
                          />
                        </div>
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
      </div>
      {/* <div
        className="new-list-create"
        onClick={() => {
          handleAdd();
        }}
      >
        Add
      </div> */}
    </div>
  );
}

export default AddFromListModal;
