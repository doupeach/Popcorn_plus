import "./List.css";
import "./ListHover.css";
import plusBtn from "../images/plusBTN.png";
import popcornBtn from "../images/popcornBTN.png";
import playBtn from "../images/playBTN.png";

function ListHover({ listData }) {
  return (
    <div className="list-hover-container">
      <div className="list-hover">
        {listData?.results.map((data) => (
          <div key={data.id} id="hover-card">
            <img
              src={
                data.image
                  ? data.image
                  : `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
              }
            ></img>
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
        ))}
      </div>
    </div>
  );
}

export default ListHover;
