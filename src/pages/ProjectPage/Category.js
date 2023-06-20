import { useState } from "react";

import ProjectItem from "./ProjectItem";
import ProjectItemForm from "./ProjectItemForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@emotion/react";
import { disableNewlines } from "./ProjectPage";

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
} from "@mui/material";
import { tokens } from "../../theme";
import { Add } from "@mui/icons-material";

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
  const [showForm, setShowForm] = useState(false);
  const [hover, setHover] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
              color={colors.greenAccent[500]}
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
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteCategory(category._id)}
            sx={{ height: "fit-content" }}
          >
            Delete
          </Button>
        )}
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {projectHeaders.map((header, index) => (
                <TableCell key={`header-${index}`}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>

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
        </Table>
      </TableContainer>

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
      {!showForm && (
        <span className="d-flex m-3">
          <FontAwesomeIcon
            icon={faSquarePlus}
            size="xl"
            style={{ cursor: "pointer" }}
            onClick={() => setShowForm(true)}
          />
          <p className="mx-2">Add Item</p>
        </span>
      )}
    </>
  );
};

export default Category;
