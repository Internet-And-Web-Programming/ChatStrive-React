import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#8585F6",
  fontColor: "#000",
  linkColor: "#241A40",
  buttonColor: "#B59CE6",
  buttonHoverColor: "#9C64E6",
  Usrbtn: "#D395F5",
  UsrbtnHover: "#720FAB",
  bodyAlternative: "#DE579A",
};

export const darkTheme = {
  body: "#302278",
  fontColor: "#fff",
  linkColor: "#D8D3ED",
  buttonColor: "#3A27B3",
  buttonHoverColor: "#5745B3",
  Usrbtn: "#720FAB",
  UsrbtnHover: "#D395F5",
  bodyAlternative: "#913965",
};

// const ReadMode = {
//   body: "#C7AB3C",
//   fontColor: "#fff",
// };

export const GlobalStyles = createGlobalStyle`
  body{
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.fontColor};
  }
  a{
    color: ${(props) => props.theme.linkColor};
  }
  button{
    background-color: ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.fontColor};
    transition: all 0.2s ease-in-out;
  }
  button:hover{
    background-color: ${(props) => props.theme.buttonHoverColor};
  }
  #main > article section{
    background-color: ${(props) => props.theme.body};
  }
  #main > aside section {
    background-color: ${(props) => props.theme.body};
  }

  #main > aside section main .messageWindow{
    background-image: linear-gradient(135deg, ${(props) =>
      props.theme.buttonColor}, ${(props) => props.theme.buttonHoverColor});
  }
  #main > article section main .Connections .btn{
    background-color: ${(props) => props.theme.Usrbtn};
  }
  #main > article section main .Connections .btn:hover {
    background-color: ${(props) => props.theme.UsrbtnHover};
  }

  .box{
    background-color: ${(props) => props.theme.bodyAlternative};
  }
`;
