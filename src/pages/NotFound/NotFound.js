import React from "react";

const notFoundStyle = {
  color: "#cacaca",
  fontSize: "50px",
  height: "calc(100vh - 155px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

function NotFound() {
  return (
    <div style={notFoundStyle}>
      <p>404</p>
      <h2>Not Found</h2>
    </div>
  );
}

export default NotFound;
