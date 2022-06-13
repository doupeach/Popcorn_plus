import React, { useState } from "react";
import "./NewListModal.css";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { getCreatedAt } from "../../utils/firebaseActions";
import Swal from "sweetalert2";

const db = firebase.firestore();
const userRef = db.collection("users");
const listRef = db.collection("lists");
const firestore = firebase.firestore();

function NewListModal({ uid ,close}) {
  const [isLoading, setIsLoading] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const history = useHistory();

  function handleClearInput() {
    setNewListTitle("");
  }

  function handleTitleInput(e) {
    setNewListTitle(e.target.value);
  }

  function keyPressCreate(e) {
    if (e.key === "Enter") {
      setNewListTitle(e.target.value);
      createNewList();
    }
  }

  function handleCreate() {
    createNewList();
  }

  function createNewList() {
    setIsLoading(true);
    const dataObj = {
      created_time: getCreatedAt(),
      owner: uid,
      list_name: newListTitle,
      list_data: [],
    };
    if (!newListTitle) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter list name.",
        background:
          "radial-gradient( farthest-side at 73% 21%, transparent, rgb(26,29,41) )",
      });
      setIsLoading(false);
      return;
    }

    listRef
      .doc()
      .set(dataObj)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Awesome!",
          text: "You've created a new list!",
          background:
            "radial-gradient( farthest-side at 73% 21%, transparent, rgb(26,29,41) )",
        });
        close();
        setIsLoading(false);
        history.push("/mylist/");
      });
  }

  return (
    <div className="new-list-modal">
      <div className="create-new-list">Give your new list a name</div>
      <input
        className="new-list-input"
        type="text"
        placeholder="Enter list name..."
        value={newListTitle}
        onChange={handleTitleInput}
        onKeyPress={keyPressCreate}
        // onBlur={handleClearInput}
        onClick={handleClearInput}
      />
      <div
        className="new-list-create"
        onClick={() => {
          handleCreate();
        }}
      >
        Create
      </div>
    </div>
  );
}

export default NewListModal;
