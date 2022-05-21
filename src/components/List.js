import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './List.css';
import {data} from './mockData'

function List() {

  return (
    <div className="list-container">
      <div id="list-name">My List</div>
      <div className="list">
        {data.map(
        data => 
          <div key={data.image}>
            <img src={data.image}></img>
          </div>
        ) }
      </div>
    </div>
  );
}

export default List;
