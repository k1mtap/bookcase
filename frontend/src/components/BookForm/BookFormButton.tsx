import { Button } from "../Common";

interface Props {
  title: string;
  handleOnClick: () => void;
}

export const BookFormButton: React.FC<Props> = ({ title, handleOnClick }) => {
  return (
    <Button
      onClick={handleOnClick}
      data-testid={`form-button-${title.toLowerCase().replace(" ", "-")}`}
    >
      {title}
    </Button>
  );
};
