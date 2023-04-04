import { Collapse, Button } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const RemovePic = ({
  showDeletePic,
  setShowDeletePic,
  setNotify,
  setError,
}) => {
  const {
    auth: { user },
  } = useAuth();

  const removeDisplayPic = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { message },
      } = await axios.put(`users/img/${user._id}`);
      localStorage.removeItem("userImg");
      setNotify({ text: message });
      setShowDeletePic((prev) => !prev);
    } catch (error) {
      if (error.response) throw setError({ text: error.response.data.message });
      else {
        setError({ text: error.message });
      }
    }
  };

  return (
    <>
      <Collapse in={showDeletePic}>
        <div id="collapse-showDeletePic">
          Remove display picture ?{" "}
          <Button variant="outline-danger" onClick={removeDisplayPic}>
            Remove
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => setShowDeletePic(!showDeletePic)}
          >
            Cancel
          </Button>
        </div>
      </Collapse>
    </>
  );
};

export default RemovePic;
