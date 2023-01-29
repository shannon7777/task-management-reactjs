import { Row, Col, Card } from "react-bootstrap";
import AddMemberModal from "./AddMemberModal";
import { useState } from "react";

import { RiDeleteBin5Line } from "react-icons/ri";
import { TiUserAdd } from "react-icons/ti";

const Project = ({ project, deleteProject, editProject, addMember, members }) => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  // console.log(members);
  return (
    <Card className="">
      <Row>
        <Col md={6} className="">
          <Card.Title>{project.title}</Card.Title>
          <p>{project.description}</p>
          <p>{`Completion Date: ${project.completion_date}`}</p>
        </Col>

        <Col md={3} className="border">
          <span>
          {/* {members?.filter(member => !project.members.includes(member?._id)).map((member, index) => (
            <span key={`member-${index}`}>{member?.username}</span>
          ))} */}
          </span>
        </Col>

        <Col className="d-flex align-items-end flex-column m-3">
          <RiDeleteBin5Line
            onClick={() => deleteProject(project._id)}
            size={20}
            style={{ cursor: "pointer" }}
          />
          <TiUserAdd
            className="mt-auto"
            onClick={() => setShowInviteForm((prev) => !prev)}
            style={{ cursor: "pointer" }}
            size={20}
          />
          {showInviteForm && (
            <AddMemberModal
              project_id={project._id}
              addMember={addMember}
              showInviteForm={showInviteForm}
              setShowInviteForm={setShowInviteForm}
            />
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default Project;
