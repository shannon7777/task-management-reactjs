import { useState, useRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { IoIosTimer } from "react-icons/io";
import { FcCheckmark } from "react-icons/fc";
import { BsExclamationCircle } from "react-icons/bs";

const TaskIconSignal = ({ progress, dateToComplete }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const toggleShow = () => setShow((prev) => !prev);

  const dueToday = dateToComplete === new Date().toDateString();

  const checkOverdue = (dateToComplete) => {
    let dateToday = new Date().setHours(0, 0, 0, 0);
    const incomplete = progress !== "Completed";
    const overdue = dateToComplete < dateToday;
    return overdue && incomplete;
  };

  const iconDueToday = dueToday && !progress === "Completed" && (
    <>
      <span
        ref={target}
        className="mx-auto"
        onMouseOver={toggleShow}
        onMouseOut={toggleShow}
      >
        <IoIosTimer size={25} />
      </span>
      <Overlay target={target.current} show={show} placement="right">
        <Tooltip>This task is due today</Tooltip>
      </Overlay>
    </>
  );

  const iconOverdue = checkOverdue(new Date(dateToComplete)) && (
    <>
      <span
        className="mx-auto"
        ref={target}
        onMouseOver={toggleShow}
        onMouseOut={toggleShow}
      >
        <BsExclamationCircle size={20} color="red" />
      </span>
      <Overlay target={target.current} show={show} placement="right">
        <Tooltip>This task is overdue!</Tooltip>
      </Overlay>
    </>
  );

  const iconCompleted = progress === "Completed" && (
    <>
      <span
        className="mx-auto"
        ref={target}
        onMouseOver={toggleShow}
        onMouseOut={toggleShow}
      >
        <FcCheckmark color="green" size={20} />
      </span>
      <Overlay target={target.current} show={show} placement="top">
        <Tooltip>Task Completed!</Tooltip>
      </Overlay>
    </>
  );

  return (
    <>
      {iconDueToday}
      {iconOverdue}
      {iconCompleted}
    </>
  );
};
export default TaskIconSignal;
