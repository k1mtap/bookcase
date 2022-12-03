import styled from "styled-components";
import { Container, Label } from "./Common";

const TextArea = styled.textarea`
  font-size: inherit;
  color: inherit;
  border: 1px solid #6a6d6a;
  background: #5e7483;
  height: 4em;
  resize: none;
  font-family: inherit;
  margin-bottom: 20px;
  &:focus {
    outline: none;
    border: 1px solid #afb9ac;
    background: #889aa7;
  }
`;

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export const BookTextArea: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Container data-testid="book-text-area">
      <Label>Description</Label>
      <TextArea
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Container>
  );
};
