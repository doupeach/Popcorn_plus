import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./List.css";
import plusBtn from "../images/plusBTN.png";
import popcornBtn from "../images/popcornBTN.png";
import playBtn from "../images/playBTN.png";

function List({ listGenre, listData }) {
  console.log(listData);
  return (
    <div className="list-container">
      <div id="list-name">{listGenre}</div>
      <div className="list">
        {listData?.results.map((data) => (
          <>
            <div key={data.id} id="card">
              <img
                id="card-img"
                src={
                  data.image
                    ? data.image
                    : `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
                }
              ></img>
              <div className="card-title">{data.title}</div>

              <div key={data.id} id="hover-card">
                <div id="hover-btns">
                  <div id="plusBtn">
                    <img src={plusBtn} />
                  </div>
                  <div id="popcornBtn">
                    <img src={popcornBtn} />
                  </div>
                  <div id="playBtn">
                    <img src={playBtn} />
                  </div>
                </div>
                <p>{data.title}</p>
                <h4>{data.vote_average}</h4>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default List;
