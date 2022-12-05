import styled from "styled-components";
import { Container, SharedFormStyles, Label } from "../Common";

const Input = styled.input`
  ${SharedFormStyles}
  height: 30px;
  margin-bottom: 10px;
`;

interface Props {
  label: string;
  value: string;
  onChange: (text: string) => void;
}

export const BookInputField: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <Container data-testid={`book-input-field-${label.toLowerCase()}`}>
      <Label>
        {label}
        <Input
          type="text"
          name={label.toLowerCase()}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </Label>
    </Container>
  );
};
