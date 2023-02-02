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
    user_id: user._id,
  });
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [completionDate, setCompletionDate] = useState(new Date());

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

  // Updating the teamMembers state to include new added member after firing addMember()
  //

  // const addMember = async (email, project_id) => {
  //   try {
  //     const result = await fetch(
  //       `http://localhost:5000/api/projects/${project_id}/${email}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: bearerToken,
  //         },
  //         credentials: "include",
  //       }
  //     );
  //     const { message, user } = await result.json();
  //     if (result.status === 401) throw setError({ text: message });
  //     if (result.status === 400) throw setError({ text: message });
  //     if (result.status === 201) throw setInfo({ text: message });
  //     if (result.status === 200) setNotify({ text: message });

  //     setProjects((prev) =>
  //       prev.map((project) => {
  //         if (project._id === project_id) {
  //           project.members = [...project.members, user._id];
  //         }
  //         return project;
  //       })
  //     );
  //   } catch (error) {
  //     setError({ text: error.message });
  //   }
  // };

  const editProject = async (updatedObj) => {};

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
      completion_date: completionDate.toDateString(),
    });
    setFormData({ title: "", description: "", user_id: user._id });
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
            completionDate={completionDate}
            setCompletionDate={setCompletionDate}
            createProject={createProject}
            formData={formData}
          />
        )}

        {projects.map((project) => (
          <Project
            key={`project-${project._id}`}
            project={project}
            deleteProject={deleteProject}
            editProject={editProject}
            setError={setError}
            setNotify={setNotify}
            setInfo={setInfo}
            // addMember={addMember}
            // teamMembers={teamMembers}
            // setTeamMembers={setTeamMembers}
          />
        ))}
      </Card>
    </div>
  );
};

export default ProjectList;
