import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Modal, Button, ProgressBar } from "react-bootstrap";
import TeamMembers from "./TeamMember";
import StarRating from "./StarRating";
import useAuth from "../../hooks/useAuth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Project = ({ project, deleteProject, setError, setNotify, setInfo }) => {
  // const [showEditMember, setShowEditMember] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  const [hoverOverDiv, setHoverOverDiv] = useState(false);
  const [rating, setRating] = useState(0);
  const {
    auth: { accessToken },
  } = useAuth();

  const bearerToken = `Bearer ${accessToken}`;

  const ratingColors = {
    1: "grey",
    2: "brown",
    3: "blue",
    4: "green",
    5: "red",
  };

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
    setRating(project.priority);
  }, []);

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

  // const editMembersModal = editMembersModal && (
  //   <EditMembersModal
  //     project_id={project._id}
  //     addMember={addMember}
  //     showEditMember={showEditMember}
  //     setShowEditMember={setShowEditMember}
  //   />
  // );

  return (
    <Card
      className="project p-3 my-3 shadow"
      onMouseOver={() => setHoverOverDiv(true)}
      onMouseOut={() => setHoverOverDiv(false)}
    >
      <Row>
        <Col md={8}>
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

        <Col className="" md={3}>
          {[...Array(rating)].map((star, index) => (
            <FontAwesomeIcon
              icon={faStar}
              key={index}
              color={ratingColors[rating]}
            />
          ))}
        </Col>

        <Col md={1} className="d-flex align-items-end flex-column">
          {hoverOverDiv && (
            <>
              <FontAwesomeIcon
                icon={faTrashCan}
                className="trashcan m-1 mt-auto"
                onClick={() => {
                  setShowDeleteProject((prev) => !prev);
                }}
                style={{ cursor: "pointer" }}
                size="lg"
              />
              {/* <FontAwesomeIcon
                icon={faUserPlus}
                className="adduser mt-auto"
                onClick={() => setShowEditMember((prev) => !prev)}
                style={{ cursor: "pointer" }}
              /> */}
            </>
          )}
          {/* {editMembersModal} */}
          {deleteProjectModal}
        </Col>
      </Row>
    </Card>
  );
};

export default Project;
