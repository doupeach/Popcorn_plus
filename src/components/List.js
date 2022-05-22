import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./List.css";

import ListHover from "./ListHover";

function List({ listGenre, listData }) {

  return (
    <div className="list-container">
      <div id="list-name">{listGenre}</div>
      <div className="list">
        {listData?.results.map((data) => (
          <div key={data.id} id="card">
            <img
              src={
                data.image
                  ? data.image
                  : `https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`
              }
            ></img>
          </div>
        ))}
      </div>
        {/* <ListHover listData={listData}/> */}
    </div>
  );
}

export default List;
