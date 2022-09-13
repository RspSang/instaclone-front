import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

export const FatText = styled.span`
  font-weight: 600;
`;

export const ScrollBox = styled.div`
  &::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${(props) => props.theme.grayColor};
    &:hover {
      background-color: gray;
    }
    &:active {
      background-color: gray;
    }
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.bgContainerColor};
  }
`;

export const Button = styled.button`
  width: 100%;
  border: none;
  margin-top: 3px;
  margin-bottom: 8px;
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) =>
    props.disabled ? props.theme.inactiveColor : props.theme.activeColor};
`;

export const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
`;
