import { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
// import DatePicker from "react-datepicker";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const EditTask = ({
  task,
  editTask,
  showEditTask,
  setShowEditTask,
  formData,
  setFormData,
  onChange,
}) => {
  const [dateToComplete, setDateToComplete] = useState(
    task.dateToComplete === "No completion date has been set"
      ? null
      : new Date(task.dateToComplete)
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const editedObj = Object.fromEntries(
      Object.entries(formData).filter((value) => value[1] !== "")
    );
    editTask(task._id, {
      ...editedObj,
      dateToComplete: dateToComplete
        ? dayjs(dateToComplete).toDate().toDateString()
        : `No completion date has been set`,
    });
    setShowEditTask((prev) => !prev);
    setFormData({ text: "", description: "", progress: "" });
  };

  return (
    <>
      <Dialog open={showEditTask} onClose={() => setShowEditTask(false)}>
        <Typography m={3} mb={0} variant="h4">
          Edit This Task
        </Typography>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            name="text"
            type="text"
            margin="dense"
            label="Task"
            variant="filled"
            onChange={onChange}
            value={formData.text}
          />
          <TextField
            autoFocus
            fullWidth
            multiline
            name="description"
            type="text"
            margin="dense"
            label="Description"
            variant="outlined"
            rows={4}
            onChange={onChange}
            value={formData.description}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="mt-3"
              label={
                dateToComplete
                  ? "Edit the completion date"
                  : "Please set a completion date"
              }
              value={dayjs(dateToComplete)}
              onChange={(date) => setDateToComplete(date)}
            />
          </LocalizationProvider>
          {dateToComplete && (
            <IconButton
              onClick={() => setDateToComplete(null)}
              sx={{ mt: 3, ml: 1, color: "red" }}
            >
              <Delete />
            </IconButton>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setShowEditTask(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={onSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditTask;
