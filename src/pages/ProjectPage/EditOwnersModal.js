import { useState } from "react";

import { Modal, Button, Form, Col, Row, Badge } from "react-bootstrap";

const EditOwnersModal = ({
  showEditOwner,
  setShowEditOwner,
  teamMembers,
  addOwners,
  removeOwners,
  owners,
}) => {
  const [projectMembers, setProjectMembers] = useState(
    teamMembers.filter((member) => !owners.includes(member))
  );
  const [itemOwners, setItemOwners] = useState(owners);

  const addOwner = (email) => {
    setProjectMembers((prev) => prev.filter((member) => member !== email));
    setItemOwners((prev) => [...prev, email]);
    addOwners([email]);
  };

  const removeOwner = (email) => {
    setItemOwners((prev) => prev.filter((owner) => owner !== email));
    setProjectMembers((prev) => [...prev, email]);
    removeOwners([email]);
  };

  const currentProjectMembers = projectMembers?.map((member, index) => (
    <Badge
      key={index}
      className="mx-2 px-2"
      bg="dark"
      pill
      style={{ cursor: "pointer" }}
      onClick={(e) => {
        e.preventDefault();
        addOwner(member);
      }}
    >
      {member}
    </Badge>
  ));

  const itemOwnersArr = itemOwners?.map((owner, index) => (
    <Badge className="mx-2 px-2" pill key={index} bg="success">
      {owner}
      <Badge
        bg="dark"
        className="mx-1"
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.preventDefault();
          removeOwner(owner);
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
        show={showEditOwner}
        onHide={() => setShowEditOwner((prev) => !prev)}
      >
        <Modal.Body className="d-flex m-2">
          <Col md={6}>
            <h5>Select owner/s</h5>
            {currentProjectMembers}
          </Col>
          <div className="mx-2 border border-dark vr" />
          <Col md={6}>
            <h5>Current Owners</h5>
            {itemOwnersArr}
          </Col>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditOwnersModal;
