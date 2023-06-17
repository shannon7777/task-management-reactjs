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
      {/* <Modal
        centered
        show={showEditTask}
        onHide={() => setShowEditTask((prev) => !prev)}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formTask">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                name="text"
                value={formData.text}
                placeholder={task.text}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="description"
                value={formData.description}
                placeholder={task.description}
                onChange={onChange}
                rows={3}
              />
            </Form.Group>

            <Form.Label>
              {dateToComplete
                ? `Edit the date of completion for your task`
                : `Set a date of completion`}{" "}
              :{" "}
            </Form.Label>
            <Form.Group className="d-flex" controlId="datePicker">
              <Col>
                <DatePicker
                  className="btn btn-outline-success shadow"
                  selected={dateToComplete}
                  value={dateToComplete}
                  onChange={(date) => setDateToComplete(date)}
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                  showPopperArrow={false}
                  placeholderText="No completion date set"
                />
              </Col>
              <Col>
                {dateToComplete && (
                  <RiDeleteBin5Line
                    onClick={() => setDateToComplete(null)}
                    style={{ cursor: "pointer" }}
                    size={30}
                    color="black"
                  />
                )}
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              variant="danger"
              onClick={() => setShowEditTask(!showEditTask)}
            >
              Close
            </Button>
            <Button variant="outline-success" type="submit" onClick={onSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal> */}

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
