import { Box, TextField, Button } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { Cancel, TaskAlt } from "@mui/icons-material";

const CategoryForm = ({
  createCategory,
  setShowForm,
  setCategoryTitle,
  categoryTitle,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box my={4}>
      <TextField
        label="Create Category"
        variant="standard"
        size="small"
        name="item"
        onChange={(e) => setCategoryTitle(e.target.value)}
        value={categoryTitle}
        sx={{ minWidth: 300 }}
      />
      <Button
        endIcon={<TaskAlt />}
        variant="contained"
        onClick={createCategory}
        sx={{ color: colors.greenAccent[500], ml: 2 }}
      >
        Create
      </Button>
      <Button
        variant="contained"
        sx={{ color: colors.redAccent[500], ml: 2 }}
        onClick={() => setShowForm(false)}
        endIcon={<Cancel />}
      >
        cancel
      </Button>
    </Box>
  );
};

export default CategoryForm;
