import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Badge, Col } from "react-bootstrap";

import ProjectSelectionList from "../ProjectDashboard/ProjectSelectionList";
import BarChartMembers from "./BarChartMembers";
import MemberSelectionList from "./MemberSelectionList";
import PieChartUser from "./PieChartUser";
import UserProjectItems from "./UserProjectItems";

import { progressTypesObj } from "../ProjectDashboard/ProjectDashboard";

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

  const progressTypes = {};
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
      <Row>
        <Col>
          <ProjectSelectionList
            project_id={project_id}
            projects={projects}
            params="members-dashboard"
          />
        </Col>

        <Col>
          {teamMembers && (
            <MemberSelectionList
              teamMembers={teamMembers}
              setSelectedUser={setSelectedUser}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          {teamMembers && projectItems && (
            <BarChartMembers
              teamMembers={teamMembers}
              projectItems={projectItems}
              progressTypes={progressTypes}
            />
          )}
        </Col>
      </Row>

      <Row>
        {selectedUser && projectItems && (
          <>
            <Col>
              <PieChartUser user={selectedUser} projectItems={projectItems} />
            </Col>

            <Col>
              <UserProjectItems
                user={selectedUser}
                projectItems={projectItems}
                progressTypes={progressTypes}
              />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default MemberDashboard;
