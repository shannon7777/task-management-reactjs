import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProjectSelectionList = ({ projects, project_id, params }) => {
  return (
    <div
      className="my-2 shadow rounded"
      style={{ height: 230, overflow: "auto" }}
    >
      {projects.map((project) => (
        <Card
          bg={project._id === project_id ? "dark" : null}
          className={`${
            project_id === project._id ? "text-white" : null
          } shadow m-2 p-1`}
          key={`project-${project._id}`}
        >
          <Link className="project-link p-2" to={`/${params}/${project._id}`}>
            <Card.Title>{project.title}</Card.Title>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default ProjectSelectionList;
