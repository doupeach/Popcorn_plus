import styled from "styled-components";

export const HeaderH1 = styled.h1`
  font-weight: bold;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "2rem")};
  text-align: center;
  margin: 0;
  margin-bottom: ${(props) => props.marginbottom};
  margin-top: ${(props) => props.margintop};
  color: ${(props) => (props.color ? props.color : "#000000")};
`;

export const HeaderH2 = styled(HeaderH1)`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.2rem")};
  margin: ${(props) => (props.margin ? props.margin : "2% auto")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
  height: ${(props) => props.height};
`;

export const SimplePreviewImage = styled.img`
  max-width: 100%;
`;

export const ImgWrap = styled.div`
  width: ${(props) => (props.width ? props.width : "160px")};
  height: auto;
  display: flex;
  justify-content: center;
  padding-right: ${(props) =>
    props.paddingRight ? props.paddingRight : "10%"};
  @media (max-width: 375px) {
    width: 110px;
  }
`;