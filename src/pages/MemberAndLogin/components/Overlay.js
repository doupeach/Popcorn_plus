import styled from "styled-components";
import { SubmitButton } from "./Signin";
import { HeaderH1 } from "./SubElements";

const Overlay = ({ toggle, setToggle }) => {
  return (
    <OverlayContainer active={toggle}>
      <OverlayDiv active={toggle}>
        <OverlayPanelLeft active={toggle}>
          <HeaderH1 color={"#FFFFFF"}>Hello, There!</HeaderH1>
          <OverlayParagraph>Press the button to continue</OverlayParagraph>
          <OverlayBtn onClick={() => setToggle(!toggle)}>Sign In</OverlayBtn>
        </OverlayPanelLeft>
        <OverlayPanelRight active={toggle}>
          <HeaderH1 color={"#FFFFFF"}>Join Us!</HeaderH1>
          <OverlayParagraph>Don't be shy!</OverlayParagraph>
          <OverlayBtn onClick={() => setToggle(!toggle)}>Sign Up</OverlayBtn>
        </OverlayPanelRight>
      </OverlayDiv>
    </OverlayContainer>
  );
};

const OverlayContainer = styled.div`
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  transform: ${(props) => props.active && ` translateX(-100%);`};
  @media (max-width: 425px) {
    display: none;
  }
`;

export const OverlayDiv = styled.div`
  background-color: #d3d3d3;
  background-image: linear-gradient(315deg, #d3d3d3 0%, #57606f 74%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transition: transform 0.6s ease-in-out;
  transform: ${(props) =>
    props.active ? ` translateX(50%)` : `translateX(0)`};
`;

const OverlayPanelLeft = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 100%;
  width: 50%;
  transition: transform 0.6s ease-in-out;
  transform: ${(props) =>
    props.active ? `translateX(0)` : `translateX(-20%)`};
`;

const OverlayPanelRight = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 100%;
  width: 50%;
  transition: transform 0.6s ease-in-out;
  right: 0;
  transform: ${(props) => (props.active ? `translateX(20%)` : `translateX(0)`)};
`;

const OverlayParagraph = styled.p`
  font-size: 14px;
  font-weight: 150;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const OverlayBtn = styled(SubmitButton)`
  background-color: transparent;
  border-color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    border: 1px dashed #ffffff;
  }
`;

export default Overlay;
