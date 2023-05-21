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
    // fetch all projects and team members from localStorage if they exist
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

    // Else , fetch from API and save to localStorage
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

    // update projects in localStorage & state then save
    let projects = JSON.parse(localStorage.getItem(`projects`));
    projects.push(newProject);
    setProjects(projects);
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

    // filter out deleted project in localStorage and save
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
    const { data } = await axios.put(`projects/${project_id}`, formData);
    setProject(data.updatedProject);
    setShowEdit((prev) => !prev);
    setFormData({
      title: "",
      description: "",
      completion_date: "",
    });

    // update project in localStorage
    let projects = JSON.parse(localStorage.getItem(`projects`));
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

const inviteMembers = async (
  membersArr,
  teamMembers,
  setTeamMembers,
  setInfo,
  setError,
  setNotify,
  project_id
) => {
  // Check for members that already exist in the project
  const newMembersArr = [...membersArr];
  teamMembers.forEach((teamMember) =>
    newMembersArr.forEach((member, index) => {
      if (member === teamMember.email) {
        newMembersArr.splice(index, 1);
      }
      return newMembersArr;
    })
  );
  if (newMembersArr.length < 1) {
    return setInfo({
      text: `${[...membersArr]} is already a team member`,
    });
  }
  try {
    const {
      data: { users, message },
    } = await axios.post(`projects/members/${project_id}`, newMembersArr);

    // grab and update teamMembers from localStorage, update state and save
    let updatedTeamMembers = JSON.parse(
      localStorage.getItem(`teamMembers-${project_id}`)
    );
    updatedTeamMembers.push(...users);
    localStorage.setItem(
      `teamMembers-${project_id}`,
      JSON.stringify(updatedTeamMembers)
    );
    setTeamMembers(updatedTeamMembers);
    setNotify({ text: message });

    // grab projects from localStorage, update and save
    let projects = JSON.parse(localStorage.getItem(`projects`));
    projects.forEach((project) => {
      if (project._id === project_id) {
        project.members = [
          ...project.members,
          ...users.map((user) => user._id),
        ];
      }
      return project;
    });
    localStorage.setItem(`projects`, JSON.stringify(projects));
  } catch (error) {
    if (error.response) setError(error.response.data.message);
    else {
      setError(error.message);
    }
  }
};

const deleteMembers = async (
  membersArr,
  setTeamMembers,
  project_id,
  setNotify,
  setError
) => {
  try {
    const { data } = await axios.put(
      `projects/members/${project_id}`,
      membersArr
    );
    // Grab teamMembers from localStorage, update (state as well) and save them
    let currentMembers = JSON.parse(
      localStorage.getItem(`teamMembers-${project_id}`)
    );
    let filteredTeamMembers = currentMembers.filter(
      (member) => !membersArr.includes(member.email)
    );
    localStorage.setItem(
      `teamMembers-${project_id}`,
      JSON.stringify(filteredTeamMembers)
    );
    setTeamMembers(filteredTeamMembers);
    setNotify({ text: data.message });

    // remove ownerid/s from owners array in projectItems that have been removed
    // from project and save to localStorage
    let projectItems = JSON.parse(
      localStorage.getItem(`projectItems-${project_id}`)
    );
    let teamMembersToRemove = currentMembers
      .filter((member) => membersArr.includes(member.email))
      .map((member) => member._id);
    projectItems.forEach(
      (item) =>
        (item.owners = item.owners.filter(
          (id) => !teamMembersToRemove.includes(id)
        ))
    );
    localStorage.setItem(
      `projectItems-${project_id}`,
      JSON.stringify(projectItems)
    );

    // update project.members in localStorage and save
    let projects = JSON.parse(localStorage.getItem(`projects`));
    let updatedProjects = projects.map((project) => {
      if (project._id === project_id) {
        project.members = project.members.filter(
          (id) => !teamMembersToRemove.includes(id)
        );
      }
      return project;
    });
    localStorage.setItem(`projects`, JSON.stringify(updatedProjects));
  } catch (error) {
    if (error.response) setError(error.response.data.message);
    else {
      setError(error.message);
    }
  }
};

export {
  getProjects,
  fetchProjectData,
  addProject,
  removeProject,
  updateProject,
  inviteMembers,
  deleteMembers,
};
