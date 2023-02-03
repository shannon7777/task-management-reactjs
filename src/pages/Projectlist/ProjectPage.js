import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProjectPage = () => {
  const [project, setProject] = useState([]);
  const {
    auth: { accessToken },
  } = useAuth();
  const { project_id } = useParams();
  const bearerToken = `Bearer ${accessToken}`;

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

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <Card className="m-3">
      <h2><Card.Header className="text-center text-uppercase">{project.title}</Card.Header></h2>
      <Card.Body>{project.description}</Card.Body>
    </Card>
  );
};

export default ProjectPage;
