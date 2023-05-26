import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Badge, Col } from "react-bootstrap";

import ProjectSelectionList from "../ProjectDashboard/ProjectSelectionList";
import BarChartMembers from "./BarChartMembers";
import MemberSelectionList from "./MemberSelectionList";
import PieChartUser from "./PieChartUser";

const MemberDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { project_id } = useParams();
  const teamMembers = JSON.parse(
    localStorage.getItem(`teamMembers-${project_id}`)
  );
  let projects = JSON.parse(localStorage.getItem(`projects`));
  let projectItems = JSON.parse(
    localStorage.getItem(`projectItems-${project_id}`)
  );

  let progressTypesObj = {
    "Not Started": "#6b7275",
    "In Progress": "#186e99",
    Stuck: "#ad470c",
    "Awaiting Review": "#bf8b08",
    Completed: "#356e19",
  };

  let progressTypes = {};
  let progressArr = [
    ...new Set(projectItems?.map((item) => item.progress)),
  ].map((progress) => {
    progressTypes[progress] = progressTypesObj[progress];
    return progressTypes;
  });

  return (
    <div className="m-2">
      <h4 className="mt-4">
        <Badge bg="dark my-2 px-5" style={{ marginRight: "1rem" }}>
          Team Members
        </Badge>
        <Badge>
          <Link
            className="project-link"
            to={`/project-dashboard/${project_id ? project_id : ""}`}
          >
            Project Dashboard
          </Link>
        </Badge>
      </h4>
      <Row className="">
        <Col>
          <ProjectSelectionList
            project_id={project_id}
            projects={projects}
            params="members-dashboard"
          />
        </Col>

        <Col>
          <MemberSelectionList
            teamMembers={teamMembers}
            setSelectedUser={setSelectedUser}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          {teamMembers && (
            <BarChartMembers
              teamMembers={teamMembers}
              projectItems={projectItems}
              progressTypes={progressTypes}
            />
          )}
        </Col>

        <Col>
          {selectedUser && (
            <PieChartUser
              user={selectedUser}
              projectItems={projectItems}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MemberDashboard;
