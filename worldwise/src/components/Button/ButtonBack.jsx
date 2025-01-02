import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack({ path = -1 }) {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(path);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
