import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import Project from "./Project";
import AddProjectForm from "./AddProjectForm";
import axios from "axios";

const ProjectList = ({ setNotify, setError, setInfo }) => {
  const {
    auth: { user },
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

  const fetchProjects = async () => {
    const {
      data: { projects },
    } = await axios(`projects/${user._id}`);
    setProjects(projects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createProject = async (e) => {
    e.preventDefault();
    const project = {
      ...formData,
      completion_date: formData.completion_date.toDateString(),
      rating,
    };
    if (!formData.title || !formData.description)
      return setInfo({ text: `Please fill in all fields` });
    try {
      const {
        data: { newProject, message },
      } = await axios.post(`projects`, project);
      setNotify({ text: message });
      setRating(0);
      setFormData({ title: "", description: "", user_id: user._id });
      setProjects((prev) => [...prev, newProject]);
    } catch (error) {
      if (error.response.status === 400)
        throw setError({ text: error.response.data.message });
    }
  };

  const deleteProject = async (id) => {
    try {
      const { data } = await axios.delete(`projects/${id}`);
      setNotify({ text: data.message });
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      if (error.response.status === 400)
        throw setError({ text: error.response.data.message });
    }
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
