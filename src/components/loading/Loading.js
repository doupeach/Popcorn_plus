import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css";

const Loading = () => (
  <div id="loading-container">
    <ReactLoading
      id="loading-gif"
      type={"cylon"}
      color={"#FF0000"}
      height={200}
      width={200}
    />
  </div>
);

export default Loading;
