import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import { Project } from "./Project";
import AddProjectForm from "./AddProjectForm";
import {
  addProject,
  getProjects,
  removeProject,
} from "../../services/projectDetail";

const ProjectList = ({
  projects,
  setProjects,
  setNotify,
  setError,
  setInfo,
}) => {
  const {
    auth: { user },
  } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completion_date: new Date(),
    user_id: user._id,
  });
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    getProjects(setProjects, user._id, setError);
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    addProject(
      formData,
      setFormData,
      setProjects,
      rating,
      user,
      setRating,
      setInfo,
      setNotify,
      setError
    );
  };

  const deleteProject = async (id) => {
    removeProject(setProjects, id, setNotify, setError);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Card className="p-3 m-4 shadow">
        <h1>
          <Badge bg="dark">Projects List</Badge>
        </h1>
        <Button onClick={() => setShowProjectForm((prev) => !prev)}>
          Create
        </Button>
        {showProjectForm && (
          <AddProjectForm
            onChange={onChange}
            setFormData={setFormData}
            createProject={createProject}
            formData={formData}
            rating={rating}
            setRating={setRating}
            ratingColors={ratingColors}
          />
        )}

        <Row>
          {projects.map((project) => (
            <Col key={`project-${project._id}`} md={6}>
              <Project
                project={project}
                deleteProject={deleteProject}
                setError={setError}
                setNotify={setNotify}
                setInfo={setInfo}
                ratingColors={ratingColors}
              />
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default ProjectList;

const ratingColors = {
  1: "grey",
  2: "brown",
  3: "blue",
  4: "green",
  5: "red",
};
