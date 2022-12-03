import styled from "styled-components";

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
  border: 0.5px solid #6a6d6a;
`;

export const Button = styled.button`
  font-size: inherit;
  color: inherit;
  width: 100px;
  height: 30px;
  border: 1px solid #6a6d6a;
  background: #5e7483;
  &:hover {
    border-color: #afb9ac;
    cursor: pointer;
  }
  &:active {
    background: #889aa7;
  }
`;

export const Label = styled.label`
  font-weight: bold;
`;
