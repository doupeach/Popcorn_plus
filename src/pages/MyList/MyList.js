import React, { useEffect, useState } from "react";
import "./MyList.css";
import { Link } from "react-router-dom";
import { fetchCollectionMovies } from "../../utils/api";
import { getMyCollections } from "../../utils/firebaseActions";
import Popup from "reactjs-popup";
import { GrChapterAdd } from "react-icons/gr";
import { BiAddToQueue } from "react-icons/bi";
import Loading from "../../components/Loading/Loading";
import noCastPhoto from "../../images/cast-default-photo.png";
import NewListModal from "../../components/NewListModal/NewListModal";
import SubList from "../../components/SubList/SubList";

const contentStyle = {
  background: "rgb(22, 21, 21)",
  border: "1px solid rgb(22, 21, 21)",
  padding: "0",
};
const overlayStyle = { background: "rgba(0,0,0,0.5)" };
const arrowStyle = { color: "#000" }; // style for an svg element

function MyList({ uid, currentUserInfo, collectionInfo }) {
  const [collections, setCollections] = useState(collectionInfo);
  const [lists, setLists] = useState();
  const [listsData, setListsData] = useState();

  useEffect(() => {
    if (collectionInfo) {
      setCollections(collectionInfo);
    }
  }, [collectionInfo]);

  useEffect(() => {
    if (uid) {
      const unsub = getMyCollections("lists", uid, setLists);
      return unsub;
    }
  }, [uid]);

  useEffect(() => {
    if (lists) {
      let listIds = lists?.map((data) => data.id);
      let listNames = lists?.map((data) => data.list_name);
      let listDataIds = lists?.map((data) => data.list_data);
      let requests = lists?.map((data) =>
        fetchCollectionMovies(data.list_data)
      );
      Promise.all(requests).then((res) => {
        let newResults = Object.assign(
          {},
          { name: listNames, data: res, id: listIds, dataId: listDataIds }
        );
        setListsData(newResults);
      });
    }
  }, [lists]);

  return (
    <>
      {!collectionInfo ? (
        <Loading />
      ) : (
        <>
          {collections?.length > 0 ? (
            <div className="mylist-container">
              <div className="mylist-new-list">
                <h2 id="mylist-name">List of "{currentUserInfo.name}"</h2>
                <Popup
                  trigger={
                    <BiAddToQueue
                      id="new-list-btn"
                      color={"white"}
                      size={"35px"}
                    />
                  }
                  modal
                  nested
                  {...{ contentStyle, overlayStyle, arrowStyle }}
                >
                  {(close) => (
                    <div className="new-list-modal">
                      <button className="new-list-close" onClick={close}>
                        &times;
                      </button>
                      <div className="new-list-content">
                        <NewListModal uid={uid} close={close} />
                      </div>
                    </div>
                  )}
                </Popup>
              </div>

              <SubList
                listsData={listsData}
                noCastPhoto={noCastPhoto}
                uid={uid}
                collectionInfo={collections}
              />

              <h2 id="mylist-name">All</h2>
              <div className="mylist-result">
                {collections
                  ?.slice(0)
                  .reverse()
                  .map((result) => {
                    const url = result.poster_path
                      ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                      : noCastPhoto;
                    return (
                      <Link to={`/movie/${result.id}`} key={result.id}>
                        <div className="mylist-card">
                          <img className="mylist-poster" src={url} alt="" />
                          <div className="mylist-title">
                            {result.original_title}
                          </div>
                          <div className="mylist-rating">
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
