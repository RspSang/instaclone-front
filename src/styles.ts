import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  accent: "#0095F6",
  bgColor: "#FAFAFA",
  fontColor: "#262626",
  borderColor: "#DBDBDB",
  buttonFontColor: "#F5F6FA",
  grayColor: "#8F8F8F",
  activeColor: "#0095F6",
  inactiveColor: "#B2DFFC",
  errorColor: "#ED4956",
  bgContainerColor: "white",
  hashtagColor: "#00376B",
};

export const darkTheme: DefaultTheme = {
  accent: "#273c75",
  borderColor: "#3C3C3C",
  fontColor: "white",
  bgColor: "#000000",
  buttonFontColor: "#F5F6FA",
  grayColor: "#8F8F8F",
  activeColor: "#0095F6",
  inactiveColor: "#B2DFFC",
  errorColor: "#ED4956",
  bgContainerColor: "#080808",
  hashtagColor: "#01376B",
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
