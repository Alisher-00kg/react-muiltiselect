import ArrowUp from "./arrow-up.svg?react";
import ArrowDown from "./arrow-down.svg?react";
import DeleteX from "./delete.svg?react";
import styled from "styled-components";

const Styled24 = (Component) => styled(Component)`
  width: 24px;
  height: 24px;
`;
export const Icons = {
  ArrowUp: Styled24(ArrowUp),
  ArrowDown: Styled24(ArrowDown),
  DeleteX: Styled24(DeleteX),
};
