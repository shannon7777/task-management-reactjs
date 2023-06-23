import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Modal, Button, ProgressBar } from "react-bootstrap";
import TeamMembers from "../../components/TeamMember";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faStar,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Stack } from "@mui/material";

const Project = ({ project, deleteProject, setError, setNotify, setInfo }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  const [hoverOverDiv, setHoverOverDiv] = useState(false);
  const [rating, setRating] = useState(0);

  const getMembers = async () => {
    try {
      let teamMembers = JSON.parse(
        localStorage.getItem(`teamMembers-${project._id}`)
      );
      if (teamMembers) return setTeamMembers(teamMembers);
      const {
        data: { users },
      } = await axios(`projects/members/${project._id}`);
      localStorage.setItem(`teamMembers-${project._id}`, JSON.stringify(users));
      return setTeamMembers(users);
    } catch (error) {
      if (error.response) setError(error.response.data.message);
      else {
        setError(error.message);
      }
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
          <Link className="project-link" to={`${project._id}`}>
            <section>
              <Card.Title>{project.title}</Card.Title>
              <span className="d-flex">
                <FontAwesomeIcon
                  size="lg"
                  icon={faCalendarCheck}
                  className="m-1"
                />
                <p className="m-1">{`${new Date(
                  project.completion_date
                ).toDateString()}`}</p>
              </span>
              <Row className="my-2">
                <span className="d-flex">
                  <ProgressBar
                    className="w-50"
                    animated
                    now={timelineBar(
                      project.createdAt,
                      project.completion_date
                    )}
                    variant={progressColors(
                      project.createdAt,
                      project.completion_date
                    )}
                  />
                  {overdueIcon}
                </span>
              </Row>

              <Stack direction="row">
                {teamMembers.map((member) => (
                  <TeamMembers
                    key={`member-${member._id}`}
                    height={25}
                    width={25}
                    member={member}
                  />
                ))}
              </Stack>
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

const ratingColors = {
  1: "grey",
  2: "brown",
  3: "blue",
  4: "green",
  5: "red",
};

const timelineBar = (createdAt, completion_date) => {
  let totalDays =
    (new Date(completion_date) - new Date(createdAt)) / 1000 / 60 / 60 / 24;
  let daysPassed = (new Date() - new Date(createdAt)) / 1000 / 60 / 60 / 24;
  let percentage = (daysPassed / totalDays) * 100;
  if (percentage < 0 || percentage > 100) return 100;
  return Math.round(percentage);
};

const progressColors = (createdAt, deadline) => {
  let timeline = timelineBar(createdAt, deadline);
  if (timeline <= 33) return "#c3c6fd";
  if (timeline > 33 && timeline <= 75) return "#4cceac";
  if (timeline > 75) return "#af3f3b";
};

export { Project, timelineBar, progressColors };
