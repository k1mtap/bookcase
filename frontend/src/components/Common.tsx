import styled, { css } from "styled-components";

export const colors = {
  fontColor: "#1d1f1e",
  bgBody: "#6b6c6a",
  bgMain: "#396380",
  bgForm: "#5e7483",
  bgFormFocus: "#889aa7",
  borderMain: "#404040",
  border: "#afb9ac",
  borderForm: "#6a6d6a",
  divider: "#929292",
};

const InputFocus = css`
  &:focus {
    outline: none;
    border: 1px solid ${colors.border};
    background: ${colors.bgFormFocus};
  }
`;
const CommonFormStyles = css`
  font-size: inherit;
  color: inherit;
  border: 1px solid ${colors.borderForm};
  background: ${colors.bgForm};
`;

export const SharedFormStyles = css`
  ${CommonFormStyles}
  ${InputFocus}
`;

export const Container = styled.div<{
  direction?: "row" | "col";
  justifyContent?: "space-between";
}>`
  width: 100%;
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "column")};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "unset"};
`;

export const Header = styled.h1<{
  size: number;
  textDecoration?: string;
  align?: string;
}>`
  font-size: ${({ size }) => `${size}em`};
  text-align: ${({ align }) => (align ? align : "center")};
  text-decoration: ${({ textDecoration }) =>
    textDecoration ? textDecoration : "none"};
`;

export const Divider = styled.hr`
  width: 100%;
  border: 0.5px solid ${colors.divider};
`;

export const Button = styled.button`
  ${CommonFormStyles}
  width: 100px;
  height: 30px;
  &:hover {
    border-color: ${colors.border};
    cursor: pointer;
  }
  &:active {
    background: ${colors.bgFormFocus};
  }
`;

export const Label = styled.label`
  font-weight: bold;
`;
