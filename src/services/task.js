import axios from "axios";

const fetchAllTasks = async (user, setTasks) => {
  try {
    const { status, data } = await axios.get(`/tasks/${user}`);
    if (status === 200) setTasks(data.tasks);
    localStorage.setItem("tasks", JSON.stringify(data.tasks));
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (
  { formData, dateToComplete, setTasks, setFormData },
  { setNotify, setInfo, setError }
) => {
  if (!formData.text)
    throw setInfo({
      text: `Fill in the task form in order to add a task`,
    });
  try {
    const task = {
      ...formData,
      dateToComplete: dateToComplete
        ? dateToComplete.toDateString()
        : `No completion date has been set`,
    };
    const { data } = await axios.post("/tasks", task);
    setTasks((prev) => [...prev, data.newTask]);
    setNotify({ text: data.message });
    setFormData({ text: "", description: "", progress: "" });
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(data.newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    if (error.response) setError(error.response.data.message);
    else {
      setError(error.message);
    }
  }
};

const removeTask = async (id, { setTasks }, { setNotify, setError }) => {
  try {
    const {
      data: { message },
      status,
    } = await axios.delete(`tasks/${id}`);
    if (status === 401) throw setError({ text: message });
    setNotify({ text: message });
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let filteredTasks = tasks.filter((task) => task._id !== id);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  } catch (error) {
    if (error.response) setError(error.response.data.message);
    else {
      setError(error.message);
    }
  }
};

const updateTask = async (
  id,
  editedTask,
  { setTasks },
  { setError, setNotify }
) => {
  try {
    const {
      status,
      data: { updatedTask, message },
    } = await axios.put(`/tasks/${id}`, editedTask);
    if (status === 400) throw setError({ text: message });
    setNotify({ text: message });
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const updatedTasks = tasks.map((task) =>
      task._id === id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  } catch (error) {
    if (error.response) setError(error.response.data.message);
    else {
      setError(error.message);
    }
  }
};

export { fetchAllTasks, createTask, removeTask, updateTask };
