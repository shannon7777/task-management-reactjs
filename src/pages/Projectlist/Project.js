import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Modal, Button, Form, Badge } from "react-bootstrap";
import AddMemberModal from "./AddMemberModal";
import TeamMembers from "./TeamMember";
import useAuth from "../../hooks/useAuth";

import { RiDeleteBin5Line } from "react-icons/ri";
import { TiUserAdd } from "react-icons/ti";
import { BsCalendar2Date } from "react-icons/bs";

const Project = ({
  project,
  deleteProject,
  editProject,
  setError,
  setNotify,
  setInfo,
}) => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const {
    auth: { accessToken },
  } = useAuth();

  const bearerToken = `Bearer ${accessToken}`;

  const deleteProjectModal = (
    <Modal
      centered
      show={showDeleteProject}
      onHide={() => setShowDeleteProject((prev) => !prev)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{`Do you want to delete project: ${project.title}?`}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => setShowDeleteProject(!showDeleteProject)}
        >
          Cancel
        </Button>
        <Button
          variant="outline-success"
          type="submit"
          onClick={() => deleteProject(project._id)}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const getMembers = async () => {
    try {
      const result = await fetch(
        `http://localhost:5000/api/projects/members/${project._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: bearerToken,
          },
          credentials: "include",
        }
      );
      const { users } = await result.json();
      return setTeamMembers(users);
    } catch (error) {
      setError({ text: error.message });
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const addMember = async (email, project_id) => {
    try {
      const result = await fetch(
        `http://localhost:5000/api/projects/${project_id}/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearerToken,
          },
          credentials: "include",
        }
      );
      const { message, user } = await result.json();
      if (result.status === 401) throw setError({ text: message });
      if (result.status === 400) throw setError({ text: message });
      if (result.status === 201) throw setInfo({ text: message });
      if (result.status === 200) setNotify({ text: message });

      setTeamMembers([...teamMembers, user]);
    } catch (error) {
      setError({ text: error.message });
    }
  };

  return (
    <Card
      className="project border-dark p-3 my-3"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <Row>
      <Col md={8}>
        <Link className="project-link" to={`/team-projects/${project._id}`}>
          <Card.Title>{project.title}</Card.Title>
          <BsCalendar2Date size={20} className="m-1" />
          {`${project.completion_date}`}
          <Row><p>Priority rating and Progress bar</p></Row>

          <span>
            {teamMembers.map((member, index) => (
              <span key={index}>
                <TeamMembers className="profilePicNavbar" member={member} />
              </span>
            ))}
          </span>
        </Link>
      </Col>

      <Col md={4} className="border d-flex flex-column mr-0">
        {isHovering && (
          <>
            <RiDeleteBin5Line
              onClick={() => setShowDeleteProject((prev) => !prev)}
              size={20}
              style={{ cursor: "pointer" }}
            />
            <TiUserAdd
              className=""
              onClick={() => setShowInviteForm((prev) => !prev)}
              style={{ cursor: "pointer" }}
              size={20}
            />
          </>
        )}
        {showInviteForm && (
          <AddMemberModal
            project_id={project._id}
            addMember={addMember}
            showInviteForm={showInviteForm}
            setShowInviteForm={setShowInviteForm}
          />
        )}
        {deleteProjectModal}
      </Col>
      </Row>
    </Card>
  );
};

export default Project;
