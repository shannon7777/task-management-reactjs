import { useState } from "react";
import EditTask from "./EditTask";
import SelectTaskStatus from "./SelectTaskStatus";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { TbChecks } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosArrowDropdown } from "react-icons/io";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { GoCheck } from "react-icons/go";
import TaskIconSignal from "../../components/TaskIconSignal";

const Task = ({
  active,
  setActive,
  task,
  deleteTask,
  editTask,
  colorStatus,
}) => {
  const [showEditTask, setShowEditTask] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [status, setStatus] = useState(0);
  const [confirmStatus, setConfirmStatus] = useState(false);

  const onChange = (e) => {
    setStatus(e.target.value);
    setConfirmStatus(true);
  };

  const onCancel = (e) => {
    e.preventDefault();
    setConfirmStatus(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const completedDate =
      status === "Completed" ? new Date().toDateString() : "";
    editTask(task._id, { progress: status, completedDate: completedDate });
    setConfirmStatus((prev) => !prev);
  };

  const selectOptions = [
    { value: "New Task", label: "New Task" },
    { value: "In progress", label: "In progress" },
    { value: "Stuck", label: "Stuck" },
    { value: "Completed", label: "Completed" },
  ];

  return (
    <div
      className="task"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <div
        className="accordion-header shadow text-white"
        onClick={() =>
          active && task._id === active ? setActive(null) : setActive(task._id)
        }
        style={{ cursor: "pointer" }}
      >
        {task.text}
        <TaskIconSignal
          progress={task.progress}
          dateToComplete={task.dateToComplete}
        />
        <span className={`arrow ${active === task._id && "rotate"}`}>
          {<IoIosArrowDropdown size={25} />}
        </span>
      </div>

      <div
        className={`accordion-body ${active === task._id && "show"}`}
        style={{ background: colorStatus[task.progress] }}
      >
        <Row>
          <Col md="6">
            <Card.Body className="p-2">
              {showEditTask && (
                <EditTask
                  setShowEditTask={setShowEditTask}
                  showEditTask={showEditTask}
                  editTask={editTask}
                  task={task}
                />
              )}

              <p>{task.description ? task.description : "-"}</p>

              <p className="completion-date">
                <span className="mx-2">
                  <BsFillCalendarCheckFill color="white" size={20} />
                </span>
                Due date:{" "}
                <Badge
                  className="border shadow"
                  bg={
                    task.dateToComplete === `No completion date has been set`
                      ? `warning`
                      : `primary`
                  }
                >
                  {task.dateToComplete}
                </Badge>
              </p>
              {task.completedDate && (
                <p className="completion-date">
                  <span>
                    <GoCheck color="black" size={20} />
                  </span>
                  Completed on:{" "}
                  <Badge className="border shadow" bg="success">
                    {task.completedDate}
                  </Badge>
                </p>
              )}
            </Card.Body>
          </Col>

          <Col className="d-flex align-content-center flex-wrap text-center">
            <Card.Body>
              <Card.Title className="text-white">{task.progress}</Card.Title>
              {isHovering && !confirmStatus && (
                <SelectTaskStatus
                  selectOptions={selectOptions}
                  onChange={onChange}
                  onSubmit={onSubmit}
                  progress={task.progress}
                />
              )}
              {confirmStatus && (
                <>
                  <p>{`Change task status to "${status}" ?`}</p>
                  <TiDeleteOutline
                    onClick={onCancel}
                    size={30}
                    color="darkred"
                  />
                  <TbChecks onClick={onSubmit} size={30} color="green" />{" "}
                </>
              )}
            </Card.Body>
          </Col>

          <Col className="d-flex align-items-end flex-column m-3">
            {isHovering && (
              <>
                <FaRegEdit
                  className="edit-button"
                  color="black"
                  onClick={() => setShowEditTask((prev) => !prev)}
                  size={25}
                  style={{ cursor: "pointer" }}
                />
                <RiDeleteBin5Line
                  className="delete-button mt-auto"
                  color="darkred"
                  onClick={() => deleteTask(task._id)}
                  style={{ cursor: "pointer" }}
                  size={25}
                />
              </>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Task;
