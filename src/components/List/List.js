import { useEffect, useState } from "react";
import "./List.css";
import plusBtn from "../../images/plusBTN.png";
import AddToList from "../AddToList/AddToList";
import popcornBtn from "../../images/popcornBTN.png";
import AddToCollection from "../AddToCollection/AddToCollection";
import playBtn from "../../images/playBTN.png";
import { BsPlayCircle, BsPlayCircleFill } from "react-icons/bs";
import ModalVideo from "react-modal-video";
import { fetchMovie } from "../../utils/api";
import { Link } from "react-router-dom";

function List({ listGenre, listData, collectionInfo, uid }) {
  const [isOpen, setOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("L61p2uyiMSo");
  const [dataArr, setDataArr] = useState();

  const handleClickPlay = (id) => {
    setOpen(true);
    fetchMovie(id).then((res) => {
      setTrailerKey(res.videos.results[0]?.key || "L61p2uyiMSo");
    });
  };

  useEffect(() => {
    collectionInfo
      ? setDataArr(collectionInfo.slice(0).reverse())
      : listData && setDataArr(listData?.results);
  }, [collectionInfo, listData]);

  return (
    <div className="list-container">
      <div id="list-name">{listGenre}</div>
      <div className="list">
        {dataArr?.map((data) => (
          <div key={data.id}>
            <div id="card">
              <Link to={`/movie/${data.id}`}>
                <img
                  id="card-img"
                  src={
                    data.image
                      ? data.image
                      : `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
                  }
                />
              </Link>

              <div className="card-title">{data.title}</div>

              <div id="hover-card">
                <div id="hover-btns">
                  <div id="plusBtn">
                    <AddToList uid={uid} movieId={parseInt(data?.id, 10)} />
                  </div>
                  <div id="popcornBtn">
                    <AddToCollection
                      uid={uid}
                      movieId={parseInt(data?.id, 10)}
                    />
                  </div>
                  <div id="playBtn" onClick={() => handleClickPlay(data.id)}>
                    <BsPlayCircle color={"#FFF"} size={"30px"} id="bs-play" />
                    <BsPlayCircleFill
                      color={"#FFF"}
                      size={"32.5px"}
                      id="bs-play-fill"
                    />
                  </div>
                </div>
                <Link to={`/movie/${data.id}`}>
                  <p>{data.title}</p>
                </Link>

                <h4>{data.vote_average}</h4>
              </div>
            </div>
          </div>
        ))}
        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId={trailerKey}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
}

export default List;
