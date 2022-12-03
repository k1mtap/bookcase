import styled from "styled-components";
import { Container, Label } from "./Common";

const Input = styled.input`
  font-size: inherit;
  color: inherit;
  border: 1px solid #6a6d6a;
  background: #5e7483;
  height: 30px;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border: 1px solid #afb9ac;
    background: #889aa7;
  }
`;

interface Props {
  label: string;
  value: string;
  onChange: (text: string) => void;
}

export const BookInputField: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <Container data-testid="book-input-field">
      <Label>{label}</Label>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </Container>
  );
};
