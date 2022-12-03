import { Button } from "./Common";

interface Props {
  title: string;
  onClick: () => void;
}

export const BookFormButton: React.FC<Props> = ({ title, onClick }) => {
  return (
    <Button onClick={onClick} data-testid={`form-button-${title}`}>
      {title}
    </Button>
  );
};
