import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { tokens } from "../../theme";
import {
  Button,
  TableCell,
  TableRow,
  TextField,
  useTheme,
} from "@mui/material";

const ProjectItemForm = ({
  deadline,
  setDeadline,
  createProjectItem,
  setShowForm,
  item,
  setItem,
  category_id,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const onSubmit = (e) => {
    e.preventDefault();
    createProjectItem(category_id);
    setShowForm((prev) => !prev);
  };

  return (
    <TableRow>
      <TableCell sx={{ maxWidth: 100 }}>
        <TextField
          label="Create Item"
          variant="standard"
          size="small"
          name="item"
          onChange={(e) => setItem(e.target.value)}
          value={item}
          fullWidth
        />
      </TableCell>
      <TableCell sx={{ maxWidth: 100 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="mt-3"
            label="Set a deadline"
            value={dayjs(deadline)}
            onChange={(date) => setDeadline(date)}
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
      </TableCell>
      <TableCell sx={{ maxWidth: 100 }}>
        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{ bgcolor: colors.blueAccent[700] }}
        >
          Save
        </Button>

        <Button
          onClick={() => setShowForm(false)}
          sx={{ mx: 2, bgcolor: colors.redAccent[700] }}
          variant="contained"
        >
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProjectItemForm;
