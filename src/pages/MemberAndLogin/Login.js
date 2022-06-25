import { useState } from "react";
import styled from "styled-components";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Overlay from "./components/Overlay";

function Login() {
  const [toggle, setToggle] = useState(true);

  return (
    <LoginBody>
      <LoginContainer toggle={toggle}>
        <Signin toggle={toggle} />
        <Signup toggle={toggle} />
        <Overlay toggle={toggle} setToggle={setToggle} />
      </LoginContainer>
    </LoginBody>
  );
}

const LoginContainer = styled.div`
  background-color: grey;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  margin: 10px 0;
`;

const LoginBody = styled.div`
  font-family: "Poppins", sans-serif;
  background-image: radial-gradient(
    farthest-side at 73% 21%,
    transparent,
    rgb(26, 29, 41)
  );
  margin:70px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: -10%;
    margin: 20px auto;
  }
`;

export default Login;
