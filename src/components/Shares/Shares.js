import React, { useState } from "react";
import styled from "styled-components";
import { FiShare2 } from "react-icons/fi";
import { BiLinkAlt } from "react-icons/bi";
import {
  FacebookShareButton,
  LineShareButton,
  FacebookIcon,
  LineIcon,
} from "react-share";
import Swal from "sweetalert2";

function Shares() {
  const [isShareClick, setIsShareClick] = useState(false);
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    Swal.fire({
      title: "Go share now!",
      text: "You've copied the URL!",
      icon: "success",
      button: false,
      timer: 1500,
      background:
        "radial-gradient( farthest-side at 73% 21%, transparent, rgb(26,29,41) )",
    });
    setIsShareClick((prev) => !prev);
  };

  const onShareWindowClose = () => {
    Swal.fire({
      title: "Awesome!",
      text: "Let's share more movie!",
      icon: "success",
      button: false,
      //   timer: 1500,
      background:
        "radial-gradient( farthest-side at 73% 21%, transparent, rgb(26,29,41) )",
    });
    setIsShareClick((prev) => !prev);
  };

  return (
    <StyledIconDiv>
      <FiShare2
        color={"white"}
        size={"30px"}
        onClick={() => setIsShareClick((prev) => !prev)}
        style={
          isShareClick
            ? {
                webkitFilter: "drop-shadow(0 0 5px rgba(255, 0, 0, 1))",
                filter: "drop-shadow(0 0 5px rgba(255, 0, 0, 1))",
              }
            : ""
        }
      />
      {isShareClick && (
        <ShareBtnDiv>
          <FacebookShareButton
            url={window.location.href}
            quote={"I've found some awesome movie. Let's watch!"}
            hashtag={["Popcorn+", "YourBestMoviePal"]}
            onShareWindowClose={onShareWindowClose}
          >
            <FacebookIcon size={25} round />
          </FacebookShareButton>
          <LineShareButton
            url={window.location.href}
            title={"I've found some awesome movie. Let's watch!"}
            onShareWindowClose={onShareWindowClose}
          >
            <LineIcon size={25} round />
          </LineShareButton>
          <BiLinkAlt size={25} color={"#FFFFFF"} onClick={handleCopyUrl} />
        </ShareBtnDiv>
      )}
    </StyledIconDiv>
  );
}

export const StyledIconDiv = styled.div`
  color: #ffffff;
  cursor: pointer;
  background: transparent;
  border: none;
  width: 120px;
  margin-left: 10px;
  position: relative;
`;

export const ShareBtnDiv = styled(StyledIconDiv)`
  top: 5px;
  left: 25px;
  width: 120px;
  position: absolute;
  svg {
    margin-left: 15px;
  }
  @media (max-width: 767px) {
    width: 20px;
    left: 20px;
    margin-top: 25px;
    svg {
      margin-left: 10px;
      margin-top: 15px;
    }
  }

  @media (max-width: 400px) {
    width: 30px;
    left: -15px;
    margin-top: 35px;
    svg {
      margin-left: 10px;
      margin-top: 20px;
    }
  }
`;

export default Shares;
