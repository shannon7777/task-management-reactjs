import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TeamMembers from "./TeamMember";
import AddMemberModal from "./AddMemberModal";

import { Card } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faPeopleGroup,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const ProjectPage = ({ setError, setNotify, setInfo }) => {
  const [project, setProject] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const {
    auth: { user, accessToken },
  } = useAuth();

  const { project_id } = useParams();
  const bearerToken = `Bearer ${accessToken}`;
  const navigate = useNavigate();

  const fetchProject = async () => {
    const result = await fetch(
      `http://localhost:5000/api/projects/one/${project_id}`,
      {
        headers: { Authorization: bearerToken },
        credentials: "include",
      }
    );
    const [project] = await result.json();
    setProject(project);
  };

  const addMember = async (membersArr, project_id) => {
    console.log(membersArr, project_id);
    try {
      const result = await fetch(
        `http://localhost:5000/api/projects/${project_id}`,
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
      if (result.status === 202) throw setError({ text: message });
      if (result.status === 200) setNotify({ text: message });

      setTeamMembers([...teamMembers, ...users]);
    } catch (error) {
      setError({ text: error.message });
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

  const addProjectModal = showInviteForm && (
    <AddMemberModal
      project_id={project_id}
      addMember={addMember}
      showInviteForm={showInviteForm}
      setShowInviteForm={setShowInviteForm}
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
        <Card.Header className="d-flex text-uppercase">
          <FontAwesomeIcon
            className="back-button p-2"
            icon={faCircleArrowLeft}
            onClick={() => navigate("/team-projects")}
            style={{ cursor: "pointer" }}
          />
          <h6 className="p-3">projects list</h6>
          <p className="mx-auto">{project.title}</p>
        </Card.Header>
      </h2>

      <Card.Header className="d-flex mb-3">
        <FontAwesomeIcon className=" p-2" icon={faPeopleGroup} size="xl" />
        <span className="p-2">
          {teamMembers.map((member, index) => (
            <span key={index}>
              <TeamMembers className="profilePicNavbar" member={member} />
            </span>
          ))}
        </span>
        <FontAwesomeIcon
          className="p-2 mt-1"
          icon={faUserPlus}
          onClick={() => setShowInviteForm((prev) => !prev)}
          style={{ cursor: "pointer" }}
        />
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
