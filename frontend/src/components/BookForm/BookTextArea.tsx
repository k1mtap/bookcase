import styled from "styled-components";
import { Container, SharedFormStyles, Label } from "../Common";

const TextArea = styled.textarea`
  ${SharedFormStyles}
  height: 4em;
  resize: none;
  font-family: inherit;
  margin-bottom: 20px;
`;

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export const BookTextArea: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Container data-testid="book-text-area">
      <Label>
        Description
        <TextArea
          name="description"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </Label>
    </Container>
  );
};
