import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
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
