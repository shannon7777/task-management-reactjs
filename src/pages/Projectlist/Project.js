import { Row, Col, Card } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiUserAdd } from "react-icons/ti";

import AddMemberModal from "./AddMemberModal";

const Project = ({
  project,
  deleteProject,
  editProject,
  addMember,
  showInviteForm,
  setShowInviteForm,
}) => {
  return (
    <Card className="">
      <Row>
        <Col className="border">
          <Card.Title>{project.title}</Card.Title>
          <p>{project.description}</p>
          <p>{`Completion Date: ${project.completion_date}`}</p>
        </Col>

        <Col className="d-flex align-items-end flex-column m-3">
          <RiDeleteBin5Line
            onClick={() => deleteProject(project._id)}
            size={20}
            style={{ cursor: "pointer" }}
          />
          <TiUserAdd
            className="mt-auto"
            onClick={() => {
              setShowInviteForm((prev) => !prev);
              console.log("clicked", project._id);
            }}
            style={{ cursor: "pointer" }}
            size={20}
          />
        </Col>
        {showInviteForm && (
          <AddMemberModal
            project_id={project._id}
            addMember={addMember}
            showInviteForm={showInviteForm}
            setShowInviteForm={setShowInviteForm}
          />
        )}
      </Row>
    </Card>
  );
};

export default Project;
