import {
  Modal,
  Button,
  Form,
  Col,
  Row,
  Badge,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useState } from "react";

const EditMembersModal = ({
  owner_email,
  addMember,
  removeMember,
  project_id,
  setShowEditMember,
  showEditMember,
  teamMembers,
}) => {
  const [email, setEmail] = useState("");
  const [membersToAdd, setMembersToAdd] = useState([]);

  const [membersList, setMembersList] = useState(teamMembers);
  const [membersToRemove, setMembersToRemove] = useState([]);

  // --- INSIDE INVITE MEMBERS TAB ---

  const onInvite = (e) => {
    e.preventDefault();
    if (membersToAdd.length === 0 && !email) return;
    addMember(membersToAdd, project_id);
    setShowEditMember((prev) => !prev);
    setEmail("");
  };

  const add = (email) => {
    if (!email) return;
    if (membersToAdd.includes(email)) {
      return setEmail("");
    }
    setMembersToAdd((prev) => [...prev, email]);
    setEmail("");
  };

  const remove = (email) => {
    setMembersToAdd((prev) => prev.filter((member) => member !== email));
  };

  const membersToBeInvited = membersToAdd?.map((email, index) => (
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

  // --- INSIDE REMOVE MEMBERS TAB ---

  const onRemove = (e) => {
    e.preventDefault();
    removeMember(membersToRemove, project_id);
    setShowEditMember((prev) => !prev);
  };

  const removeFromCurrentMembersArr = (email) => {
    setMembersList((prev) => prev.filter((member) => member !== email));
    setMembersToRemove((prev) => [...prev, email]);
  };

  const removeFromArr = (email) => {
    setMembersToRemove((prev) => prev.filter((member) => member !== email));
    setMembersList((prev) => [...prev, email]);
  };

  const currentMembersList = membersList
    ?.filter((member) => member !== owner_email)
    .map((member, index) => (
      <Badge bg="dark" key={`member-${index}`}>
        {member}{" "}
        <Badge
          bg="danger"
          className="mx-1"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            removeFromCurrentMembersArr(member);
          }}
        >
          X
        </Badge>
      </Badge>
    ));

  const membersToBeRemoved = membersToRemove.map((email, index) => (
    <Badge bg="danger" key={`member-${index}`}>
      {email}{" "}
      <Badge
        bg="dark"
        className="mx-1"
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.preventDefault();
          removeFromArr(email);
        }}
      >
        X
      </Badge>
    </Badge>
  ));

  return (
    <>
      <Modal
        centered
        show={showEditMember}
        onHide={() => setShowEditMember((prev) => !prev)}
      >
        <Tabs className="justify-content-center">
          <Tab eventKey="tab-invite" title="Invite Members">
            <Modal.Header>
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
                    <Col>{membersToBeInvited}</Col>
                  </Row>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => setShowEditMember(!showEditMember)}
              >
                Cancel
              </Button>
              {membersToAdd.length > 0 && (
                <Button
                  variant="outline-success"
                  type="submit"
                  onClick={onInvite}
                >
                  Invite
                </Button>
              )}
            </Modal.Footer>
          </Tab>
          <Tab eventKey="tab-remove" title="Remove Members">
            <Modal.Header>
              <Modal.Title>Remove Members from This Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="d-flex">
                <Col>
                  <span>Current Team Members: </span>
                  {currentMembersList}
                </Col>
                <div className="vr" />
                <Col className="mx-3">
                  <span>To Be Removed:</span>
                  {membersToBeRemoved}
                </Col>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => setShowEditMember((prev) => !prev)}
              >
                Cancel
              </Button>
              {membersToRemove.length > 0 && (
                <Button onClick={onRemove}>Remove</Button>
              )}
            </Modal.Footer>
          </Tab>
        </Tabs>
      </Modal>
    </>
  );
};

export default EditMembersModal;
