import { Modal, Button, Form, Col } from "react-bootstrap";
import { useState } from "react";

const AddMemberModal = ({
  addMember,
  setShowInviteForm,
  showInviteForm,
  project_id,
}) => {
  const [email, setEmail] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    // addMember(email, project_id);
    console.log(project_id);
    setShowInviteForm((prev) => !prev);
    setEmail("");
  };
  return (
    <>
      <Modal
        centered
        show={showInviteForm}
        onHide={() => setShowInviteForm((prev) => !prev)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Invite a Team Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                // placeholder={}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => setShowInviteForm(!showInviteForm)}
          >
            Cancel
          </Button>
          <Button variant="outline-success" type="submit" onClick={onSubmit}>
            Invite
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddMemberModal;
