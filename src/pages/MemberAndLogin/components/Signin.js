import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import firebase from "../../../utils/firebase";
import ReactLoading from "react-loading";
import { SiGoogle } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { HeaderH1 } from "./SubElements";
import { StyledSpan } from "./Signup";
import {
  googleProvider,
  signUpWithEmailPassword,
  signInWithEmailPassword,
  socialMediaAuth,
} from "../../../utils/firebaseActions";

const Signin = ({ toggle, handleOnClick }) => {
  const history = useHistory();

  const db = firebase.firestore();
  const userRef = db.collection("users");
  const [activeItem, setActiveItem] = useState(true); //true = Login、false = Sign Up
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("test@email.com");
  const [password, setPassword] = useState("test123");
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
            photoUrl:
              user.photoUrl ||
              "https://firebasestorage.googleapis.com/v0/b/popcorn-plus.appspot.com/o/NFT-CAT.png?alt=media&token=752f151d-026e-451b-a61f-b9ff78180767",
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
          photoUrl:
            user.photoUrl ||
            "https://firebasestorage.googleapis.com/v0/b/popcorn-plus.appspot.com/o/NFT-CAT.png?alt=media&token=752f151d-026e-451b-a61f-b9ff78180767",
          my_list: [],
          user_collection: [],
        });
        setIsLoading(false);
        Swal.fire({
          title: "Awesome!",
          text: "You've created an account!",
          type: "success",
          background:
            "radial-gradient( farthest-side at 73% 21%, transparent, rgb(26,29,41) )",
        });
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

  const onSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailPassword(email, password)
      .then(() => {
        setIsLoading(false);
        Swal.fire({
          title: "Hello!",
          text: "You've logged in!",
          type: "success",
          background:
            "radial-gradient( farthest-side at 73% 21%, transparent, rgb(26,29,41) )",
        });
        history.push("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage("User not found");
            break;
          case "auth/user-not-found":
            setErrorMessage("Invalid email");
            break;
          case "auth/wrong-password":
            setErrorMessage("Wrong password");
            break;
          default:
        }
        setIsLoading(false);
      });
  };

  return (
    <SigninContainer avtive={toggle}>
      <StyledForm>
        <HeaderSingin>Welcome!</HeaderSingin>
        <SocialContainer>
          <div>
            <FcGoogle size={'25px'} onClick={() => socialMediaClick(googleProvider)} />
          </div>
        </SocialContainer>
        <StyledSpan>press buttons above or use email to sign in</StyledSpan>
        <StyledInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setErrorMessage("")}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setErrorMessage("")}
        />
        <SubmitButton color={"rgba(220,0,0,.7)"} onClick={(e) => onSignIn(e)}>
          Sign In
        </SubmitButton>
        <SignupButton color={"rgba(220,0,0,.7)"} onClick={(e) => onSignUp(e)}>
          Sign Up
        </SignupButton>
        {errorMessage && <h5>{errorMessage}</h5>}
        {isLoading ? (
          <ReactLoading color="#FF0000" type="spinningBubbles" />
        ) : (
          <></>
        )}
      </StyledForm>
    </SigninContainer>
  );
};

export const SigninContainer = styled.div`
  font-family: "Poppins", sans-serif;
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  transform: ${(props) => props.active && `translateX(100%)`};
  @media (max-width: 425px) {
    width: 100%;
  }
`;

export const StyledForm = styled.form`
  background-color: #d3d3d3;
  background-image: linear-gradient(135deg, #d3d3d3 0%, #57606f 74%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  @media (max-width: 425px) {
    background-color: #d3d3d3;
    background-image: linear-gradient(135deg, #d3d3d3 0%, #57606f 74%);
  }
`;

const HeaderSingin = styled(HeaderH1)`
  @media (max-width: 425px) {
    color: #ffffff;
  }
`;

export const SocialContainer = styled.div`
  margin: 20px 0;
  div {
    border: 1.5px solid #cacaca;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    height: 40px;
    width: 40px;
    text-decoration: none;
    color: black;
    cursor: pointer;
    @media (max-width: 425px) {
      color: white;
    }
    div:visited {
      color: black;
    }
  }
`;

export const SocialLoginButton = styled.i`
  margin-right: 1rem;
`;

export const StyledInput = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 5px;
`;

export const SubmitButton = styled.div`
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid #de6932;
  border-color: ${(props) => props.color || "#de6932"};
  background-color: ${(props) => props.color || "#de6932"};
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
  padding: 12px 45px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
  align-self: ${(props) => props.alignSelf};
  &:hover {
    background-color: rgba(220, 0, 0, 0.5);
    border-color: rgba(220, 0, 0, 0.6);
  }
`;

export const SignupButton = styled(SubmitButton)`
  display: none;
  margin-top: 8px;
  background-color: rgba(245, 180, 0, 0.7);
  border-color: rgba(245, 180, 0, 0.7);
  padding: 12px 43px;
  &:hover {
    background-color: rgba(245, 130, 0, 0.5);
    border-color: rgba(245, 130, 0, 0.6);
  }
  @media (max-width: 425px) {
    display: block;
    padding: 12px 41px;
  }
`;

export default Signin;
