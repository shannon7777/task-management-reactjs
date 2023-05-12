import axios from "axios";

const getProjects = async (setProjects, user_id, setError) => {
  try {
    let allProjects = JSON.parse(localStorage.getItem(`projects`));
    if (allProjects) return setProjects(allProjects);
    const {
      data: { projects },
    } = await axios(`projects/${user_id}`);
    setProjects(projects);
    localStorage.setItem(`projects`, JSON.stringify(projects));
  } catch (error) {
    if (error.response) setError(error.response.data.message);
    else {
      setError(error.message);
    }
  }
};

const fetchProjectData = async (
  project_id,
  setProject,
  setTeamMembers,
  setError,
  navigate
) => {
  try {
    let projects = JSON.parse(localStorage.getItem(`projects`));
    let teamMembers = JSON.parse(
      localStorage.getItem(`teamMembers-${project_id}`)
    );
    if (projects && teamMembers) {
      let project = projects.filter((project) => project_id === project._id);
      setProject(project[0]);
      setTeamMembers(teamMembers);
      return;
    }
    const [fetchedProject, fetchedMembers] = await Promise.all([
      axios(`projects/one/${project_id}`),
      axios(`projects/members/${project_id}`),
    ]);
    setProject(fetchedProject.data);
    setTeamMembers(fetchedMembers.data.users);
    localStorage.setItem(
      `teamMembers-${project_id}`,
      JSON.stringify(fetchedMembers.data.users)
    );
  } catch (error) {
    if (error.response) {
      navigate("/team-projects");
      setError(error.response.data.message);
    } else {
      setError(error.message);
    }
  }
};

const addProject = async (
  formData,
  setFormData,
  setProjects,
  rating,
  user,
  setRating,
  setInfo,
  setNotify,
  setError
) => {
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
    let projects = JSON.parse(localStorage.getItem(`projects`));
    projects.push(newProject);
    setProjects((prev) => [...prev, newProject]);
    localStorage.setItem(`projects`, JSON.stringify(projects));
  } catch (error) {
    if (error.response) setError(error.response.data.message);
    else {
      setError(error.message);
    }
  }
};

const removeProject = async (setProjects, id, setNotify, setError) => {
  try {
    const { data, status } = await axios.delete(`projects/${id}`);
    if (status === 400) throw setError({ text: data.message });
    let filteredProjects = JSON.parse(localStorage.getItem(`projects`)).filter(
      (project) => project._id !== id
    );
    setProjects(filteredProjects);
    setNotify({ text: data.message });
    localStorage.setItem(`projects`, JSON.stringify(filteredProjects));
  } catch (error) {
    if (error.response) setError(error.response.data.message);
    else {
      setError(error.message);
    }
  }
};

const updateProject = async (
  project_id,
  formData,
  setFormData,
  setProject,
  setShowEdit,
  setError
) => {
  if (!formData.title && !formData.description && !formData.completion_date)
    return;
  try {
    // let project = JSON.parse(localStorage.getItem(`projects`)).filter(
    //   (project) => project._id === project_id
    // );
    let projects = JSON.parse(localStorage.getItem(`projects`));
    const { data } = await axios.put(`projects/${project_id}`, formData);
    setProject(data.updatedProject);
    setShowEdit((prev) => !prev);
    setFormData({
      title: "",
      description: "",
      completion_date: "",
    });
    let updatedProjects = projects.map((project) =>
      project._id === project_id ? data.updatedProject : project
    );
    localStorage.setItem(`projects`, JSON.stringify(updatedProjects));
  } catch (error) {
    if (error.response) setError(error.response.data.message);
    else {
      setError(error.message);
    }
  }
};

const inviteMembers = async () => {};

const deleteMembers = async () => {};

export {
  getProjects,
  fetchProjectData,
  addProject,
  removeProject,
  updateProject,
};
