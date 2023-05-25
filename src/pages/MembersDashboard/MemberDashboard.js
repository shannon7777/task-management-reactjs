import { Link, useParams } from "react-router-dom";
import { Row, Badge, Card, Col } from "react-bootstrap";

import ProjectSelectionList from "../ProjectDashboard/ProjectSelectionList";
import TeamMembers from "../../components/TeamMember";
import BarChartMembers from "./BarChartMembers";

const MemberDashboard = () => {
  const { project_id } = useParams();
  const teamMembers = JSON.parse(
    localStorage.getItem(`teamMembers-${project_id}`)
  );
  let projects = JSON.parse(localStorage.getItem(`projects`));

  return (
    <>
      <h4 className="mt-4">
        <Badge bg="dark m-2">Team Members</Badge>
        <Badge>
          <Link
            className="project-link"
            to={`/project-dashboard/${project_id ? project_id : ""}`}
          >
            Project Dashboard
          </Link>
        </Badge>
      </h4>
      <ProjectSelectionList
        project_id={project_id}
        projects={projects}
        params="members-dashboard"
      />
      <Row>
        {teamMembers &&
          teamMembers.map((member) => (
            <Col className="mt-3 m-2 p-2" key={member._id} md={2}>
              <Card>
                <Card.Header>
                  {member.firstName} {member.lastName}
                </Card.Header>
                <Card.Body>
                  <p>{member.username}</p>
                  <span style={{ height: "40px", width: "40px" }}>
                    <TeamMembers member={member} className="member-dashboard" />
                  </span>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <BarChartMembers teamMembers={teamMembers} project_id={project_id}/>
      </Row>
    </>
  );
};

export default MemberDashboard;
