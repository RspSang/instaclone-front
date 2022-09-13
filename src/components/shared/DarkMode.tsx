import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

export default function DarkMode() {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
      <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg" />
    </DarkModeBtn>
  );
}
