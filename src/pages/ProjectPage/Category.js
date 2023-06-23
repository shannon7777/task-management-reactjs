import { useState } from "react";

import ProjectItem from "./ProjectItem";
import ProjectItemForm from "./ProjectItemForm";

import { disableNewlines } from "./ProjectPage";
import { useTheme } from "@mui/material";

import { useParams } from "react-router-dom";

import {
  Table,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Chip,
  Stack,
  TableBody,
  IconButton,
} from "@mui/material";
import { tokens } from "../../theme";
import { DeleteForever, Edit, LibraryAdd } from "@mui/icons-material";

const Category = ({
  category,
  editCategory,
  deleteCategory,
  setCategoryTitle,
  projectItems,
  createProjectItem,
  completion_date,
  editItem,
  deleteItem,
  projectHeaders,
  item,
  setItem,
  deadline,
  setDeadline,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showForm, setShowForm] = useState(false);
  const [hover, setHover] = useState(false);
  const { project_id } = useParams();
  let teamMembers = JSON.parse(
    localStorage.getItem(`teamMembers-${project_id}`)
  );

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <Chip
          sx={{ borderRadius: 1, mb: 2 }}
          label={
            <Typography
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
              variant="h5"
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={(e) => setCategoryTitle(e.target.innerHTML)}
              onBlur={() => editCategory(category._id)}
              onKeyDown={disableNewlines}
              sx={{
                "&:focus": {
                  outline: "none",
                  border: "none",
                },
                cursor: "pointer",
              }}
            >
              {category.title}
            </Typography>
          }
        />
        {hover && (
          <>
            <Edit sx={{ mx: 2, mt: 0.5 }} />
            <Button
              endIcon={<DeleteForever />}
              variant="contained"
              onClick={() => deleteCategory(category._id)}
              sx={{
                height: "fit-content",
                bgcolor: colors.redAccent[700],
                color: "white",
                ml: "auto",
              }}
            >
              Delete
            </Button>
          </>
        )}
      </Stack>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {projectHeaders.map((header, index) => (
                <TableCell key={`header-${index}`}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {projectItems
              ?.filter((item) => item.category_id === category._id)
              .map((item, index) => (
                <ProjectItem
                  key={index}
                  projectItem={item}
                  teamMembers={teamMembers}
                  editItem={editItem}
                  deleteItem={deleteItem}
                  completion_date={completion_date}
                />
              ))}
            {showForm && (
              <ProjectItemForm
                setShowForm={setShowForm}
                createProjectItem={createProjectItem}
                deadline={deadline}
                setDeadline={setDeadline}
                item={item}
                setItem={setItem}
                category_id={category._id}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!showForm && (
        <Stack direction="row" gap={2} my={2}>
          <IconButton onClick={() => setShowForm(true)}>
            <LibraryAdd sx={{ color: colors.greenAccent[400] }} />
          </IconButton>
          <Typography my={1} color={colors.grey[400]}>
            Add a project item
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default Category;
