import { useParams } from "react-router-dom";
import { Badge, Row } from "react-bootstrap";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import ProgressAndTimeline from "./ProgressAndTimeline";
import ProjectSelectionList from "./ProjectSelectionList";
import ItemList from "./ItemList";
import BarChartDeadline from "./BarChartDeadline";
import Calendar from "./Calendar";

const ProjectDashboard = () => {
  const { project_id } = useParams();
  let projects = JSON.parse(localStorage.getItem(`projects`));
  let project =
    projects && projects.filter((project) => project._id === project_id);
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
    <>
      <h4>
        <Badge bg="dark" className="my-2">
          Current Projects
        </Badge>
      </h4>
      <Row>
        <ProjectSelectionList projects={projects} project_id={project_id} />
        {projectItems && (
          <ProgressAndTimeline
            projectItems={projectItems}
            project={project[0]}
          />
        )}
      </Row>
      {projectItems && (
        <>
          <Row>
            <PieChart
              projectItems={projectItems}
              progressTypes={progressTypes}
            />
            <BarChart
              project_id={project_id}
              projectItems={projectItems}
              progressTypes={progressTypes}
            />
          </Row>
          <Row>
            <ItemList
              projectItems={projectItems}
              progressTypes={progressTypes}
            />
            <BarChartDeadline
              projectItems={projectItems}
              progressTypes={progressTypes}
            />
          </Row>
          <Row>
            <Calendar
              projectItems={projectItems}
              progressTypes={progressTypes}
            />
          </Row>
        </>
      )}
    </>
  );
};

export default ProjectDashboard;
