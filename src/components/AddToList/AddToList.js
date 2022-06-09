import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import { IoHeartCircleSharp } from "react-icons/io5";
import plusLogo from "../../images/plusBTN.png";
import * as Color from "../layout/Color.js";
import Swal from "sweetalert2";
import { swalLoginModal } from "../../utils/swalModal";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function AddToList({ uid, movieId }) {
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const [collected, setCollected] = useState(false);


  useEffect(() => {
    uid &&
      userRef
        .doc(uid)
        .get()
        .then((doc) => {
          setCollected(doc.data().my_list?.includes(movieId));
        });
  }, [uid]);

  function clickAdd(movieId) {
    if (!uid) {
      return swalLoginModal("add to my list!");
    }
    if (collected) {
      // remove
      userRef.doc(uid).update({
        my_list: firebase.firestore.FieldValue.arrayRemove(movieId),
      });
      setCollected(false);
      Swal.fire({
        title: "Removed from my list!",
        icon: "success",
        button: false,
        timer: 1500,
        background:
          "radial-gradient( farthest-side at 73% 21%, transparent, rgb(26,29,41) )",
      });
    } else {
      // add
      userRef.doc(uid).update({
        my_list: firebase.firestore.FieldValue.arrayUnion(movieId),
      });
      setCollected(true);
      Swal.fire({
        title: "Added to my list!",
        icon: "success",
        button: false,
        timer: 1500,
        background:
          "radial-gradient( farthest-side at 73% 21%, transparent, rgb(26,29,41) )",
      });
    }
  }
  // console.log(uid);
  // console.log(movieId);
  // console.log(collected);

  return (
    <>
      {collected ? (
        <BsFillCheckCircleFill
          size={"35px"}
          color={"#ffffff"}
          style={{
            cursor: "pointer",
            filter: "drop-shadow(0 0 5px rgba(255, 0, 0, 1))",
            marginRight: "10px",
          }}
          onClick={() => clickAdd(movieId)}
        />
      ) : (
        <Icon
          width={"35px"}
          src={plusLogo}
          onClick={() => clickAdd(movieId)}
          collected={collected}
        />
      )}
    </>
  );
}

const Icon = styled.img`
  filter: ${(props) =>
    props.collected
      ? "drop-shadow(0 0 5px rgba(255, 0, 0, 1))"
      : "drop-shadow(1px 1px 10px rgba(0, 0, 0, .5))"};
  font-size: 2rem;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    webkitfilter: drop-shadow(0 0 5px rgba(255, 0, 0, 1));
    filter: drop-shadow(0 0 5px rgba(255, 0, 0, 1));
  }
`;
