import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import plusLogo from "../../images/plusBTN.png";
import * as Color from "../layout/Color.js";
import Swal from "sweetalert2";
import { swalLoginModal } from "../../utils/swalModal";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function AddFromList({ uid, data, movieId }) {
  const db = firebase.firestore();
  const listRef = db.collection("lists");
  const [collected, setCollected] = useState(false);

  useEffect(() => {
    if (!uid) {
      return swalLoginModal("add to my list!");
    }
    data?.id &&
      listRef
        .doc(data.id)
        .get()
        .then((doc) => {
          setCollected(doc.data().list_data?.includes(movieId));
        });
  }, [data]);

  function clickAdd(movieId) {
    if (!uid) {
      return swalLoginModal("add to favorites!");
    }
    if (collected) {
      // remove
      listRef.doc(data.id).update({
        list_data: firebase.firestore.FieldValue.arrayRemove(movieId),
      });
      setCollected(false);
      Swal.fire({
        title: "Removed from the list!",
        icon: "success",
        button: false,
        timer: 1500,
        background:
          "radial-gradient( farthest-side at 73% 21%, transparent, rgb(26,29,41) )",
      });
    } else {
      // add
      listRef.doc(data.id).update({
        list_data: firebase.firestore.FieldValue.arrayUnion(movieId),
      });
      setCollected(true);
      Swal.fire({
        title: "Added to the list!",
        icon: "success",
        button: false,
        timer: 1500,
        background:
          "radial-gradient( farthest-side at 73% 21%, transparent, rgb(26,29,41) )",
      });
    }
  }
//   console.log(uid);
//   console.log(data.id);
//   console.log(movieId);
//   console.log(collected)
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
