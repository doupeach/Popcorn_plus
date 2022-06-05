import { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../../utils/firebase";
import styled from "styled-components";
import Swal from "sweetalert2";
import { SiGoogle } from "react-icons/si";
import ReactLoading from "react-loading";
import { HeaderH1 } from "./SubElements";
import {
  SocialContainer,
  StyledForm,
  StyledInput,
  SubmitButton,
} from "./Signin";
import {
  googleProvider,
  signUpWithEmailPassword,
  socialMediaAuth,
} from "../../../utils/firebaseActions";

const Signup = ({ toggle }) => {
  const history = useHistory();
  const db = firebase.firestore();
  const userRef = db.collection("users");

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveUserToFirebase(user) {
    let users = [];
    userRef.get().then((snapshot) => {
      snapshot.forEach((user) => {
        users.push(user.data().uid);
      });
      const hasUser = users.includes(user.uid);
      if (!hasUser) {
        userRef
          .doc(user.uid)
          .set({
            uid: user.uid,
            email: user.email,
            name: user.displayName || "user",
            photoURL:
              user.photoURL ||
              "https://firebasestorage.googleapis.com/v0/b/popcorn-plus.appspot.com/o/default-profile-photo.png?alt=media&token=5722bb5f-1789-4305-8d43-afcd89a0437c",
            my_list: [],
            user_collection: [],
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      }
    });
  }

  async function socialMediaClick(provider) {
    setIsLoading(true);
    const response = await socialMediaAuth(provider);
    saveUserToFirebase(response);
    setIsLoading(false);
    history.push("/");
  }

  const onSignUp = (e) => {
    setIsLoading(true);
    signUpWithEmailPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // 創建一個新 user 到 firebase firestore
        userRef.doc(user.uid).set({
          uid: user.uid,
          email: user.email,
          name: displayName || "user",
          photoURL:
            user.photoURL ||
            "https://firebasestorage.googleapis.com/v0/b/popcorn-plus.appspot.com/o/default-profile-photo.png?alt=media&token=5722bb5f-1789-4305-8d43-afcd89a0437c",
          my_list: [],
          user_collection: [],
        });
        setIsLoading(false);
        Swal.fire("Awesome!", "You've created an account!", "success");
        history.push("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMessage("Email already exists");
            break;
          case "auth/invalid-email":
            setErrorMessage("Invalid email");
            break;
          case "auth/weak-password":
            setErrorMessage("Weak password, at least six characters");
            break;
          default:
        }
        setIsLoading(false);
      });
  };

  return (
    <SignupContainer avtive={toggle}>
      <StyledForm>
        <HeaderH1>Create Account</HeaderH1>
        <SocialContainer>
          <div>
            <SiGoogle onClick={() => socialMediaClick(googleProvider)} />
          </div>
        </SocialContainer>
        <StyledSpan>or use your email for registration</StyledSpan>
        <StyledInput
          type="text"
          placeholder="Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <StyledInput
          type="email"
          placeholder="Email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setErrorMessage("")}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setErrorMessage("")}
        />
        <SubmitButton color={"#ff0000"} onClick={(e) => onSignUp(e)}>
          Sign Up
        </SubmitButton>
        {errorMessage && <h5>{errorMessage}</h5>}
        {isLoading ? (
          <ReactLoading color="#FBD850" type="spinningBubbles" />
        ) : (
          <></>
        )}
      </StyledForm>
    </SignupContainer>
  );
};

const SignupContainer = styled.div`
  font-family: "Poppins", sans-serif;
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 50%;
  width: 50%;
  transform: ${(props) => props.active && `translateX(100%)`};
  opacity: ${(props) => (props.active ? `0` : `1`)};
  z-index: ${(props) => (props.active ? `5` : `1`)};
  animation: ${(props) => props.active && `show 0.6s`};

  @keyframes show {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }
`;

export const StyledSpan = styled.span`
  font-size: 12px;
  font-weight: 450;
  color: #646464;

  @media (max-width: 425px) {
    color: #ffffff;
  }
`;

export default Signup;
