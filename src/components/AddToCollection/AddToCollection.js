import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import favLogo from "../../images/favBtn.png";
import * as Color from "../layout/Color.js";
import Swal from "sweetalert2";
import { swalLoginModal } from "../../utils/swalModal";

export default function AddToCollection({ uid, movieId }) {
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const [collected, setCollected] = useState(false);

  useEffect(() => {
    uid &&
      userRef
        .doc(uid)
        .get()
        .then((doc) => {
          setCollected(doc.data().user_collection?.includes(movieId));
        });
  }, [uid]);

  function clickAdd(movieId) {
    if (!uid) {
      return swalLoginModal("add to favorites!");
    }
    if (collected) {
      // remove
      userRef.doc(uid).update({
        user_collection: firebase.firestore.FieldValue.arrayRemove(movieId),
      });
      setCollected(false);
      Swal.fire( {
        title:"Removed from favorites!",
        icon: "success",
        button: false,
        timer: 1500,
        background: 'radial-gradient( farthest-side at 73% 21%, transparent, rgb(26,29,41) )',
      });
    } else {
      // add
      userRef.doc(uid).update({
        user_collection: firebase.firestore.FieldValue.arrayUnion(movieId),
      });
      setCollected(true);
      Swal.fire({
        title: "Added to favorites!",
        icon: "success",
        button: false,
        timer: 1500,
        background: 'radial-gradient( farthest-side at 73% 21%, transparent, rgb(26,29,41) )',
      });
    }
  }

  return (
    <>
      <Icon
        src={favLogo}
        onClick={() => clickAdd(movieId)}
        collected={collected}
      />
    </>
  );
}



const Icon = styled.img`
  color: ${(props) => (props.collected ? Color.Main : Color.Content)};
  filter: ${(props) => (props.collected ? 'drop-shadow(0 0 5px rgba(255, 0, 0, 1))' : 'drop-shadow(1px 1px 10px rgba(0, 0, 0, .5))')};
  font-size: 2rem;
  cursor: pointer;
  transition: .3s ease;
  &:hover {
    webkitFilter: drop-shadow(0 0 5px rgba(255, 0, 0, 1));
    filter: drop-shadow(0 0 5px rgba(255, 0, 0, 1));
  }
`;
