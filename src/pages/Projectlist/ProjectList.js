import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
// import Header from "../Home/Header";
import useAuth from "../../hooks/useAuth";

import Project from "./Project";
import AddProjectForm from "./AddProjectForm";

const ProjectList = ({ setNotify, setError, setInfo }) => {
  const {
    auth: { user, accessToken },
  } = useAuth();
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completion_date: new Date(),
    user_id: user._id,
  });
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [rating, setRating] = useState(0);

  const bearerToken = `Bearer ${accessToken}`;

  const fetchProjects = async () => {
    const result = await fetch(
      `http://localhost:5000/api/projects/${user._id}`,
      {
        headers: { Authorization: bearerToken },
        credentials: "include",
      }
    );
    const { projects } = await result.json();
    setProjects(projects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createProject = async (project) => {
    console.log(project);
    if (!formData.title || !formData.description)
      return setError({ text: `Please fill in all fields` });
    try {
      const result = await fetch(`http://localhost:5000/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
        credentials: "include",
        body: JSON.stringify(project),
      });
      const { newProject, message } = await result.json();
      if (result.status === 200) setNotify({ text: message });
      if (result.status === 400) throw setError({ text: message });
      setProjects((prev) => [...prev, newProject]);
    } catch (error) {
      setError({ text: error.message });
    }
  };

  const deleteProject = async (id) => {
    try {
      const result = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: bearerToken },
      });
      const { message } = await result.json();

      if (result.status === 400) throw setError({ text: message });
      if (result.status === 200) setNotify({ text: message });

      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      setError({ text: error.message });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProject({
      ...formData,
      completion_date: formData.completion_date.toDateString(),
      rating
    });
    setFormData({ title: "", description: "", user_id: user._id });
    setRating(0)
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
            onSubmit={onSubmit}
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
