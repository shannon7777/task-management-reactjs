import { useState } from "react";
import EditTask from "./EditTask";
import SelectTaskStatus from "../../components/SelectTaskStatus";
// import { Card, Row, Col, Badge } from "react-bootstrap";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { FaRegEdit } from "react-icons/fa";
// import { TbChecks } from "react-icons/tb";
// import { TiDeleteOutline } from "react-icons/ti";
// import { IoIosArrowDropdown } from "react-icons/io";
// import { BsFillCalendarCheckFill } from "react-icons/bs";
// import { GoCheck } from "react-icons/go";
import TaskIconSignal from "../../components/TaskIconSignal";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useTheme,
  IconButton,
  Box,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import { Delete, Edit, Event, ExpandMore } from "@mui/icons-material";
import { tokens } from "../../theme";

const Task = ({
  task,
  deleteTask,
  editTask,
  taskProgressColors,
  formData,
  setFormData,
  onChange,
}) => {
  const [showEditTask, setShowEditTask] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [status, setStatus] = useState(0);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onSubmit = (e) => {
    e.preventDefault();
    const completedDate =
      status === "Completed" ? new Date().toDateString() : "";
    editTask(task._id, { progress: e.target.value, completedDate });
  };

  const selectOptions = ["New Task", "In progress", "Stuck", "Completed"];

  return (
    <>
      <Accordion
        variant="elevation"
        sx={{
          background: colors.primary[400],
          my: 1,
          "&.MuiAccordion-root": {
            borderRadius: 5,
          },
          "&.MuiAccordion-root:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          id={`accordion-${task._id}`}
          sx={{
            height: "75px",
          }}
        >
          <Typography variant="h5" color={colors.greenAccent[400]}>
            {task.text}
          </Typography>

          <TaskIconSignal
            progress={task.progress}
            dateToComplete={task.dateToComplete}
          />
        </AccordionSummary>
        <AccordionDetails
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => {
            setIsHovering(false);
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            {task.description}
          </Typography>

          <Divider />

          <Stack mt={2} direction="row" gap={2}>
            <Box mt={1} display="flex" gap={1}>
              <Event />
              <Typography variant="h5" color={colors.greenAccent[500]}>
                {task.dateToComplete}
              </Typography>
            </Box>

            {isHovering ? (
              <SelectTaskStatus
                selectOptions={selectOptions}
                onChange={onSubmit}
                progress={task.progress}
                label="Progress"
              />
            ) : (
              <Chip
                label={task.progress}
                sx={{
                  bgcolor: taskProgressColors[task.progress],
                  width: 100,
                }}
              />
            )}

            {isHovering && (
              <Box m="auto" mr={1} display="flex" gap={3}>
                <IconButton onClick={() => setShowEditTask((prev) => !prev)}>
                  <Edit />
                </IconButton>

                <Divider
                  variant="middle"
                  color="grey"
                  orientation="vertical"
                  flexItem
                />

                <IconButton onClick={() => deleteTask(task._id)}>
                  <Delete />
                </IconButton>
              </Box>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
      {showEditTask && (
        <EditTask
          setShowEditTask={setShowEditTask}
          showEditTask={showEditTask}
          editTask={editTask}
          task={task}
          formData={formData}
          setFormData={setFormData}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Task;
