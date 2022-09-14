import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  accent: "#0095f6",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
  borderColor: "rgb(219, 219, 219)",
  buttonFontColor: "#f5f6fa",
  grayColor: "#8F8F8F",
  activeColor: "#0095F6",
  inactiveColor: "#B2DFFC",
  errorColor: "#ed4956",
  bgContainerColor: "white",
};

export const darkTheme: DefaultTheme = {
  accent: "#273c75",
  borderColor: "rgb(219,219,219)",
  fontColor: "white",
  bgColor: "#2c2c2c",
  buttonFontColor: "#f5f6fa",
  grayColor: "#8F8F8F",
  activeColor: "#0095F6",
  inactiveColor: "#B2DFFC",
  errorColor: "#ed4956",
  bgContainerColor: "black",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-size:14px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        color: ${(props) => props.theme.fontColor};
    }
    a {
      text-decoration: none;
      color:inherit;
    }
`;
