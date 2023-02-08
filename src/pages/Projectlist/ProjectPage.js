import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TeamMembers from "./TeamMember";
import AddMemberModal from "./AddMemberModal";

import { Card, Col } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faUserPlus,
  faPenToSquare,
  faUsersLine,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

const ProjectPage = ({ setError, setNotify, setInfo }) => {
  const [project, setProject] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [showEditMember, setShowEditMember] = useState(false);
  const [hoveringOverTitle, setHoveringOverTitle] = useState(false);
  const [hoveringOverUsers, setHoveringOverUsers] = useState(false);
  const {
    auth: { user, accessToken },
  } = useAuth();

  const { project_id } = useParams();
  const bearerToken = `Bearer ${accessToken}`;
  const navigate = useNavigate();

  const fetchProject = async () => {
    try {
      const result = await fetch(
        `http://localhost:5000/api/projects/one/${project_id}`,
        {
          headers: { Authorization: bearerToken },
          credentials: "include",
        }
      );
      if (result.status === 400) {
        navigate("/team-projects");
        throw setError({ text: `Project does not exist` });
      }
      const [project] = await result.json();
      setProject(project);
    } catch (error) {
      throw setError({ text: error.message });
    }
  };

  const addMember = async (membersArr, project_id) => {
    console.log(membersArr, project_id);
    try {
      const result = await fetch(
        `http://localhost:5000/api/projects/members/${project_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearerToken,
          },
          body: JSON.stringify(membersArr),
          credentials: "include",
        }
      );
      const { message, users } = await result.json();
      if (result.status === 400) throw setError({ text: message });
      if (result.status === 401) throw setError({ text: message });
      if (result.status === 403) throw setInfo({ text: message });
      if (result.status === 200) setNotify({ text: message });

      setTeamMembers([...teamMembers, ...users]);
    } catch (error) {
      //   setError({ text: error });
    }
  };

  const removeMember = async (membersArr, project_id) => {
    console.log(membersArr);
    try {
      const result = await fetch(
        `http://localhost:5000/api/projects/${project_id}`,
        {
          method: "",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearerToken,
          },
          body: JSON.stringify(membersArr),
          credentials: "include",
        }
      );

      const { message } = await result.json();
      if (result.status === 200) setNotify({ text: message });
      if (result.status === 400) setError({ text: message });
      setTeamMembers((prev) =>
        prev.filter((member) => !membersArr.includes(member))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getMembers = async () => {
    try {
      const result = await fetch(
        `http://localhost:5000/api/projects/members/${project_id}`,
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
      //   setError({ text: error.message });
    }
  };

  const addProjectModal = showEditMember && (
    <AddMemberModal
      project_id={project_id}
      addMember={addMember}
      removeMember={removeMember}
      showEditMember={showEditMember}
      setShowEditMember={setShowEditMember}
      teamMembers={teamMembers.map((member) => member.email)}
    />
  );

  useEffect(() => {
    fetchProject();
    getMembers();
  }, []);

  const [projectOwner] = teamMembers
    ?.filter((member) => member._id === project.creator)
    .map((member) => (
      <TeamMembers className="profilePicNavbar" member={member} />
    ));

  return (
    <Card className="m-3">
      <h2>
        <Card.Header
          className="d-flex"
          onMouseOver={() => setHoveringOverTitle(true)}
          onMouseOut={() => setHoveringOverTitle(false)}
        >
          <Col className="d-flex text-uppercase">
            <FontAwesomeIcon
              className="back-button p-2"
              icon={faCircleArrowLeft}
              onClick={() => navigate("/team-projects")}
              style={{ cursor: "pointer" }}
            />
            <h6 className="p-3">projects list</h6>
          </Col>
          <Col className="d-flex mx-auto">
            <p className="">
              {project.title}{" "}
              {hoveringOverTitle && (
                <FontAwesomeIcon
                  className="edit-project-button"
                  icon={faPenToSquare}
                  size="sm"
                />
              )}
            </p>
          </Col>
        </Card.Header>
      </h2>

      <Card.Header
        className="d-flex mb-3"
        onMouseOver={() => setHoveringOverUsers(true)}
        onMouseOut={() => setHoveringOverUsers(false)}
      >
        <FontAwesomeIcon className="p-2" icon={faUsersLine} size="xl" />
        <span className="p-2">
          {teamMembers.map((member, index) => (
            <span key={index}>
              <TeamMembers className="profilePicNavbar" member={member} />
            </span>
          ))}
        </span>
        {hoveringOverUsers && (
          <FontAwesomeIcon
            className="p-2 mt-1"
            icon={faUserGear}
            onClick={() => setShowEditMember((prev) => !prev)}
            style={{ cursor: "pointer" }}
            // size="lg"
          />
        )}
        {addProjectModal}
        <p className="ms-auto">
          <strong>Project Owner:</strong> {projectOwner}{" "}
          {projectOwner?.props.member._id === user._id && "(You)"}
        </p>
      </Card.Header>

      <Card.Body>{project.description}</Card.Body>
    </Card>
  );
};

export default ProjectPage;
