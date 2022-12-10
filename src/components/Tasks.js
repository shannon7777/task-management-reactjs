import Task from "./Task";
import { useState } from "react";

const Tasks = ({ tasks, deleteTask, editTask }) => {
  const [active, setActive] = useState(null);
  return (
    <>
      {tasks.map((task, index) => (
        <Task
          key={index}
          active={active}
          setActive={setActive}
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </>
  );
};

export default Tasks;
