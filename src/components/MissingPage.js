import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const MissingPage = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <article style={{ padding: "100px" }}>
      <h1>Sorry!</h1>
      <p>Page Not Found =/</p>
      <div>
        <Link to="/">Visit our Homepage</Link>
        <Button variant="outlined" onClick={goBack}>
          Go back
        </Button>
      </div>
    </article>
  );
};

export default MissingPage;
