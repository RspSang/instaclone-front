import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    borderColor?: string;
    fontColor?: string;
    accent?: string;
    bgColor?: string;
    buttonFontColor?: string;
    grayColor?: string;
  }
}
