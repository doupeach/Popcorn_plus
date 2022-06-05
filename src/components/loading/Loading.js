import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css";

const Loading = (props) => (
  <div id="loading-container">
    <ReactLoading
      id="loading-gif"
      type={"cylon"}
      color={"#FF0000"}
      height={props.height ? 200 : props.height}
      width={props.width ? 200 : props.width}
    />
  </div>
);

export default Loading;
