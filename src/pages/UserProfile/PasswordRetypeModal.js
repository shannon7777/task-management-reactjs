import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

const PasswordRetypeModal = ({
  setEditPassword,
  editPassword,
  setError,
  setInfo,
  retypePwdModal,
  setRetypePwdModal,
}) => {
  const [retypePwd, setRetypePwd] = useState("");
  const {
    auth: { user, accessToken },
  } = useAuth();
  const bearerToken = `Bearer ${accessToken}`;

  const onSubmitRetypePassword = async (e) => {
    e.preventDefault();
    setError({ show: false });

    try {
      const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
        body: JSON.stringify({ retypePwd }),
      });

      if (res.status === 401) {
        setRetypePwdModal(!retypePwdModal);
        setRetypePwd("");
        throw Error(`You have typed in the wrong password, please try again.`);
      } else if (res.status === 200) {
        setInfo({ text: "Please type in your new password" });
        setRetypePwdModal(!retypePwdModal);
        setEditPassword(!editPassword);
        setRetypePwd("");
        setError({ show: false });
      }
    } catch (error) {
      setError({ text: error.message });
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
            onClick={onSubmitRetypePassword}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PasswordRetypeModal;
