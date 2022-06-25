import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import firebase from "../../utils/firebase";
import ReactLoading from "react-loading";
import { BiTimer, BiNotepad } from "react-icons/bi";
import { SubmitButton } from "./components/Signin";
import {
  HeaderH1,
  HeaderH2,
  ImgWrap,
  SimplePreviewImage,
} from "../MemberAndLogin/components/SubElements";
import { userLogout, getUserPhotoRef } from "../../utils/firebaseActions";
import favLogo from "../../images/favBtn.png";
import Loading from "../../components/Loading/Loading";
import listBtn from "../../images/listBtn.png";
import { useSelector } from "react-redux";

function Member({ uid }) {
  const db = firebase.firestore();
  const userRef = db.collection("users");

  // const [currentUser, setCurrentUser] = useState(null);
  const currentUser = useSelector((state) => state.currentUserInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const history = useHistory();
  const defaultUserPhotoUrl = `https://firebasestorage.googleapis.com/v0/b/popcorn-plus.appspot.com/o/NFT-CAT.png?alt=media&token=752f151d-026e-451b-a61f-b9ff78180767`;

  // 對currentUser的doc作監聽
  // useEffect(() => {
  //   if (uid) {
  //     const unsubscribe = userRef.doc(uid).onSnapshot((doc) => {
  //       setCurrentUser(doc.data());
  //     });
  //     return () => {
  //       unsubscribe();
  //     };
  //   }
  // }, [uid]);

  const previewUrl = () => {
    if (file) {
      return URL.createObjectURL(file);
    } else if (currentUser.photoUrl !== null) {
      return currentUser.photoUrl;
    } else {
      return defaultUserPhotoUrl;
    }
  };

  const toLogOut = () => {
    setIsLoading(true);
    userLogout();
    setIsLoading(false);
    history.push("/");
  };

  function onSubmit() {
    setIsLoading(true);
    const fileRef = getUserPhotoRef("user-photos/", currentUser);
    const metadata = {
      contentType: file?.type,
    };
    fileRef.put(file, metadata).then(() => {
      fileRef.getDownloadURL().then((imageUrl) => {
        userRef
          .doc(uid)
          .update({
            photoUrl: imageUrl,
          })
          .then(() => {
            setIsLoading(false);
            setFile(null);
          });
      });
    });
  }

  return (
    <>
      {currentUser ? (
        <MemberDiv>
          <ProfileCardDiv flexDirection={"column"}>
            <ProfileImgWrap width={"200px"}>
              <ProfileImage src={previewUrl()} />
            </ProfileImgWrap>
            <ChangePhotoLabel>
              Change photo
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              ></input>
            </ChangePhotoLabel>
            {file && (
              <>
                <ConfirmBtnDiv justifyContent={"center"}>
                  <ConfirmChangePhoto background={"#de6932"} onClick={onSubmit}>
                    Confirm
                  </ConfirmChangePhoto>
                  <ConfirmChangePhoto onClick={() => setFile(null)}>
                    Nope
                  </ConfirmChangePhoto>
                </ConfirmBtnDiv>
              </>
            )}
          </ProfileCardDiv>
          <ProfileCardDiv
            flexDirection={"column"}
            justifyContent={"space-evenly"}
          >
            <HeaderH1
              className="welcome-title"
              fontSize={"2rem"}
              color={"#cacaca"}
              marginbottom={"20px"}
              margintop={"20px"}
            >
              Welcome Back!
            </HeaderH1>

            <HeaderH2
              fontSize={"1.5rem"}
              color={"#fff"}
              margin={"5px auto 1%;"}
            >
              Hello, {currentUser.name} !
            </HeaderH2>

            <CardBtnDiv justifyContent={"center"}>
              <Link to="/myfav">
                {
                  <GlowTitle>
                    <MemberPageButton
                      backgroundColor={"transparent"}
                      padding={"0px"}
                    >
                      <img src={favLogo} style={{ width: "35px" }} />
                    </MemberPageButton>
                    <HeaderH2 margin={"2% 20px 1% 5px;"} color={"#cacaca"}>
                      Favorites
                    </HeaderH2>
                  </GlowTitle>
                }
              </Link>

              <Link to="/mylist">
                <GlowTitle filter={"drop-shadow(0 0 5px rgba(245, 130, 0, 1))"}>
                  <MemberPageButton
                    backgroundColor={"transparent"}
                    padding={"0px"}
                    filter={"drop-shadow(0 0 5px rgba(245, 130, 0, 1))"}
                  >
                    <img src={listBtn} style={{ width: "35px" }} />
                  </MemberPageButton>
                  <HeaderH2 margin={"2% 20px 1% 5px;"} color={"#cacaca"}>
                    My List
                  </HeaderH2>
                </GlowTitle>
              </Link>
            </CardBtnDiv>
          </ProfileCardDiv>
          <LogoutButton
            color={"transparent"}
            style={{ borderColor: "#fff" }}
            onClick={toLogOut}
          >
            Logout
          </LogoutButton>

          {isLoading ? (
            <ReactLoading color="#Ff0000" type="spinningBubbles" />
          ) : (
            <></>
          )}
        </MemberDiv>
      ) : (
        <div style={{ marginTop: "-102px" }}>
          <Loading />
        </div>
      )}
    </>
  );
}

const MemberDiv = styled.div`
  font-family: "Poppins", sans-serif;
  background-image: radial-gradient(
    farthest-side at 73% 21%,
    transparent,
    rgb(26, 29, 41)
  );
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);

  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  max-width: 768px;
  min-height: 63vh;

  color: #001a3a;
  transition: transform 0.6s ease-in-out;
  transform: ${(props) =>
    props.active ? ` translateX(50%)` : `translateX(0)`};

  margin: 70px auto 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-content: center;
    padding-bottom: 30px;
    min-height: 500px;
  }
`;

const ProfileCardDiv = styled.div`
  position: relative;
  width: 50%;
  min-height: 40vh;
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  flex-direction: ${(props) => props.flexDirection};
  @media (max-width: 768px) {
    min-height: 20vh;
  }
  @media (max-width: 425px) {
    width: 90%;
  }
  @media (max-width: 375px) {
    .welcome-title {
      font-size: 1.35rem;
      margin: 15px auto 15px;
    }
  }
`;

const CardBtnDiv = styled.div`
  display: flex;
  width: 100%;
  margin: 10px auto;
  align-items: center;
  justify-content: ${(props) => props.justifyContent};
  @media (max-width: 768px) {
    justify-content: space-evenly;
  }
  ${
    "" /* @media (max-width: 375px) {
    width: 320px;
  } */
  }
`;

const ConfirmBtnDiv = styled(CardBtnDiv)`
  position: absolute;
  margin-top: 250px;
  align-self: ${(props) => props.alignSelf};
  @media (max-width: 768px) {
    margin-top: 100px;
  }
  @media (max-width: 375px) {
    margin-top: 70px;
  }
`;

const MemberPageButton = styled(SubmitButton)`
  background-color: ${(props) => props.backgroundColor};
  padding: ${(props) => (props.padding ? props.padding : "3px 8px")};
  border: none;

  &:hover {
    background-color: transparent;
    webkitfilter: ${(props) =>
      props.filter ? props.filter : "drop-shadow(0 0 5px rgba(255, 0, 0, 1))"};
    filter: ${(props) =>
      props.filter ? props.filter : "drop-shadow(0 0 5px rgba(255, 0, 0, 1))"};
  }
`;

const ChangePhotoLabel = styled.label`
  padding: 4px 10px;
  border-radius: 50px;
  border: 1px solid #ffb75e;
  cursor: pointer;
  color: #cacaca;
  font-size: 12px;
  font-weight: bold;
  margin-top: 10px;
`;
const ConfirmChangePhoto = styled(ChangePhotoLabel)`
  margin: 5px;
  background: ${(props) => props.background};
`;

const ProfileImage = styled(SimplePreviewImage)`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
  @media (max-width: 375px) {
    width: 100px;
    height: 100px;
  }
`;

const ProfileImgWrap = styled(ImgWrap)`
  margin-bottom: 10px;
  padding-right: 0;
`;

const LogoutButton = styled(SubmitButton)`
  position: absolute;
  bottom: 12%;
  background: rgba(26, 29, 41, 1);
  &:hover {
    background: rgba(64, 64, 64, 1);
  }
  @media (max-width: 768px) {
    bottom: 8%;
  }
  @media (max-width: 768px) {
    bottom: 20px;
  }
`;

const GlowTitle = styled(HeaderH2)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0;

  &:hover {
    webkitfilter: ${(props) =>
      props.filter ? props.filter : "drop-shadow(0 0 5px rgba(255, 0, 0, 1))"};
    filter: ${(props) =>
      props.filter ? props.filter : "drop-shadow(0 0 5px rgba(255, 0, 0, 1))"};
  }
`;

export default Member;
