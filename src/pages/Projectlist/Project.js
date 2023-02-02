import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import AddMemberModal from "./AddMemberModal";
import TeamMembers from "./TeamMember";
import useAuth from "../../hooks/useAuth";

import { RiDeleteBin5Line } from "react-icons/ri";
import { TiUserAdd } from "react-icons/ti";

const Project = ({
  project,
  deleteProject,
  editProject,
  setError,
  setNotify,
  setInfo,
  // addMember,
  // teamMembers,
  // setTeamMembers,
}) => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
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
  }

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
    <Card className="">
      <Row>
        <Col md={6} className="">
          <Card.Title>{project.title}</Card.Title>
          <p>{project.description}</p>
          <p>{`Completion Date: ${project.completion_date}`}</p>
        </Col>

        <Col md={3} className="border">
          {/* {teamMembers
            .filter((member) => project.members?.includes(member._id))
            .map((member, index) => (
              <span key={index}>
                <TeamMembers className="profilePicNavbar" member={member} />
              </span>
            ))} */}
          {teamMembers.map((member, index) => (
            <span key={index}>
              <TeamMembers className="profilePicNavbar" member={member} />
            </span>
          ))}
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
