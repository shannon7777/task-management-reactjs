import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Row, Col, Card, Modal, Button, ProgressBar } from "react-bootstrap";
import TeamMembers from "./TeamMember";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faStar,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const Project = ({ project, deleteProject, setError, setNotify, setInfo }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  const [hoverOverDiv, setHoverOverDiv] = useState(false);
  const [rating, setRating] = useState(0);
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
      if (result.status === 400) return;
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

  const isOverdue = () => {
    let today = new Date();
    let completion_date = new Date(project.completion_date);
    return completion_date < today;
  };

  const overdueIcon = isOverdue() && (
    <FontAwesomeIcon className="mx-2" icon={faTriangleExclamation} size="lg" />
  );

  const timelineBar = () => {
    let totalDays =
      (new Date(project.completion_date) - new Date(project.createdAt)) /
      1000 /
      60 /
      60 /
      24;
    let daysPassed =
      (new Date() - new Date(project.createdAt)) / 1000 / 60 / 60 / 24;
    let percentage = (daysPassed / totalDays) * 100;
    if (percentage < 0) return 100;
    return Math.round(percentage);
  };

  const progressDateColors = () => {
    if (timelineBar() <= 25) return "primary";
    if (timelineBar() > 25 && timelineBar() <= 50) return "info";
    if (timelineBar() > 50 && timelineBar() <= 75) return "warning";
    if (timelineBar() > 75) return "danger";
  };

  const completionBar = () => {};

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
                <span className="d-flex">
                  <ProgressBar
                    className="w-50"
                    animated
                    now={timelineBar()}
                    variant={progressDateColors()}
                  />
                  {overdueIcon}
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
            </>
          )}
          {deleteProjectModal}
        </Col>
      </Row>
    </Card>
  );
};

export default Project;

const ratingColors = {
  1: "grey",
  2: "brown",
  3: "blue",
  4: "green",
  5: "red",
};
