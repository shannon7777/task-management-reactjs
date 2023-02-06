import { Modal, Button, Form, Col, Row, Badge } from "react-bootstrap";
import { useState } from "react";

const AddMemberModal = ({
  addMember,
  setShowInviteForm,
  showInviteForm,
  project_id,
  projectMembers,
}) => {
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (members.length === 0 && !email) return;
    // addMember(email ? members.concat(email) : members, project_id);
    addMember(members, project_id);
    setShowInviteForm((prev) => !prev);
    setEmail("");
  };

  const add = (email) => {
    if (!email) return;
    setMembers((prev) => [...prev, email]);
    setEmail("");
  };

  const remove = (email) => {
    setMembers((prev) => prev.filter((member) => member !== email));
  };

  const memberBadges = members?.map((email, index) => (
    <Badge
      className="m-1"
      key={`member-${index}`}
      pill
      bg="dark"
      style={{ cursor: "pointer" }}
    >
      {email}
      <Badge bg="danger" className="mx-1" onClick={() => remove(email)}>
        X
      </Badge>
    </Badge>
  ));

  return (
    <>
      <Modal
        centered
        show={showInviteForm}
        onHide={() => setShowInviteForm((prev) => !prev)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Invite Team Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Row className="my-3">
                <Col md="10">
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Add a team member/s"
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </Col>
                <Col md="2">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      add(email);
                    }}
                    type="submit"
                  >
                    select
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>{memberBadges}</Col>
              </Row>
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
          {members.length > 0 && (
            <Button variant="outline-success" type="submit" onClick={onSubmit}>
              Invite
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddMemberModal;
