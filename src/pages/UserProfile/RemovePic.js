import { Collapse, Button } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

const RemovePic = ({
  showDeletePic,
  setShowDeletePic,
  setNotify,
  setError,
}) => {
  const {
    auth: { user, accessToken },
    setAuth,
  } = useAuth();

  const bearerToken = `Bearer ${accessToken}`;

  const removeDisplayPic = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("userImg")) {
      setShowDeletePic(!showDeletePic);
      return setNotify({
        text: `You do not have a display picture, please upload one`,
      });
    }

    try {
      const result = await fetch(
        `http://localhost:5000/api/users/img/${user._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: bearerToken,
          },
          credentials: "include",
        }
      );
      const { message, updatedUser } = await result.json();
      if (result.status === 400) {
        throw Error(message);
      }
      localStorage.removeItem("userImg");
      setNotify({ text: message });
      setShowDeletePic(!showDeletePic);
    } catch (error) {
      setError({ text: error.message });
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
