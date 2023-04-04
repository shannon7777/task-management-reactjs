import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const PasswordRetypeModal = ({
  setEditPassword,
  setError,
  setInfo,
  retypePwdModal,
  setRetypePwdModal,
}) => {
  const [retypePwd, setRetypePwd] = useState("");
  const {
    auth: { user },
  } = useAuth();

  const editPassword = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { message },
      } = await axios.post(`users/${user._id}`, { retypePwd: retypePwd });

      if (message) {
        setInfo({ text: "Please type in your new password" });
        setRetypePwdModal((prev) => !prev);
        setEditPassword((prev) => !prev);
        setRetypePwd("");
      }
    } catch (error) {
      if (error.response) {
        setError({ text: error.response.data.message });
        setRetypePwdModal((prev) => !prev);
        setRetypePwd("");
      } else {
        setError({ text: error.message });
      }
    }
  };

  return (
    <>
      <Modal
        centered
        show={retypePwdModal}
        onHide={() => setRetypePwdModal(!retypePwdModal)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Please type in your current password before proceeding.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="retypePwd"
                value={retypePwd}
                placeholder="password"
                onChange={(e) => setRetypePwd(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={() => setRetypePwdModal(!retypePwdModal)}
          >
            Close
          </Button>
          <Button
            variant="outline-success"
            type="submit"
            onClick={editPassword}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PasswordRetypeModal;
