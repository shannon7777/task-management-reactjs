import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Modal, Button, ProgressBar } from "react-bootstrap";
import AddMemberModal from "./AddMemberModal";
import TeamMembers from "./TeamMember";
import useAuth from "../../hooks/useAuth";

import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const addProjectModal = showInviteForm && (
    <AddMemberModal
      project_id={project._id}
      addMember={addMember}
      showInviteForm={showInviteForm}
      setShowInviteForm={setShowInviteForm}
    />
  );

  return (
    <Card
      className="project p-3 my-3 shadow"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <Row>
        <Col md={10}>
          <Link className="project-link" to={`/team-projects/${project._id}`}>
            <section>
              <Card.Title>{project.title}</Card.Title>
              <span className="d-flex">
                <FontAwesomeIcon
                  size="lg"
                  icon={faCalendarCheck}
                  className="m-1"
                />
                <p className="m-1">{`${project.completion_date}`}</p>
              </span>
              <Row className="my-2">
                <span>
                  <ProgressBar
                    className="w-50"
                    animated
                    now={45}
                    variant="success"
                  />
                </span>
              </Row>

              <span>
                {teamMembers.map((member, index) => (
                  <span key={index}>
                    <TeamMembers className="profilePicNavbar" member={member} />
                  </span>
                ))}
              </span>
            </section>
          </Link>
        </Col>

        <Col md={2} className="d-flex align-items-end flex-column">
          {isHovering && (
            <>
              <FontAwesomeIcon
                icon={faTrashCan}
                className="trashcan m-1"
                onClick={() => {
                  setShowDeleteProject((prev) => !prev);
                }}
                style={{ cursor: "pointer" }}
                size="lg"
              />
              <FontAwesomeIcon
                icon={faUserPlus}
                className="adduser mt-auto"
                onClick={() => setShowInviteForm((prev) => !prev)}
                style={{ cursor: "pointer" }}
              />
            </>
          )}
          {addProjectModal}
          {deleteProjectModal}
        </Col>
      </Row>
    </Card>
  );
};

export default Project;
