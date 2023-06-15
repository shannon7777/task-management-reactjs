import { AssignmentLate, Check, WatchLater } from "@mui/icons-material";
import { Box, Tooltip, Typography, Zoom } from "@mui/material";

const TaskIconSignal = ({ progress, dateToComplete }) => {
  const dueToday = dateToComplete === new Date().toDateString();
  const incomplete = progress !== "Completed";

  const checkOverdue = (dateToComplete) => {
    let dateToday = new Date().setHours(0, 0, 0, 0);
    const overdue = dateToComplete < dateToday;
    return overdue && incomplete;
  };

  const iconDueToday = dueToday && incomplete && (
    <Tooltip
      title={<Typography fontSize={15}>Task due today</Typography>}
      TransitionComponent={Zoom}
      arrow
    >
      <WatchLater />
    </Tooltip>
  );

  const iconOverdue = checkOverdue(new Date(dateToComplete)) && (
    <Tooltip
      title={<Typography fontSize={15}>Task is Overdue!</Typography>}
      TransitionComponent={Zoom}
      arrow
    >
      <AssignmentLate sx={{ color: "red" }} />
    </Tooltip>
  );

  const iconCompleted = progress === "Completed" && (
    <Tooltip
      title={<Typography fontSize={15}>Task Completed!</Typography>}
      TransitionComponent={Zoom}
      arrow
    >
      <Check sx={{ color: "green" }} />
    </Tooltip>
  );

  return (
    <Box ml={5}>
      {iconDueToday}
      {iconOverdue}
      {iconCompleted}
    </Box>
  );
};
export default TaskIconSignal;
