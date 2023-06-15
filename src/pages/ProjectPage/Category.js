import { useState } from "react";
import { Button, Table } from "react-bootstrap";

import ProjectItem from "./ProjectItem";
import ProjectItemForm from "./ProjectItemForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@emotion/react";
import { disableNewlines } from "./ProjectPage";

const Category = ({
  category,
  editCategory,
  deleteCategory,
  setCategoryTitle,
  projectItems,
  createProjectItem,
  teamMembers,
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

  return (
    <>
      <h6
        className="category"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <p
          className="blackbadge"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={(e) => setCategoryTitle(e.target.innerHTML)}
          onBlur={() => editCategory(category._id)}
          style={{ cursor: "pointer" }}
          onKeyDown={disableNewlines}
        >
          {category.title}
        </p>
        {hover && (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => deleteCategory(category._id)}
            style={{ height: "fit-content" }}
          >
            Delete
          </Button>
        )}
      </h6>
      <Table
        key={`table-${category._id}`}
        className="shadow"
        style={{ borderRadius: "10px" }}
        variant={theme.palette.mode === "dark" && "dark"}
        hover
      >
        <thead className="w-auto mw-100">
          <tr>
            {projectHeaders.map((header, index) => (
              <th key={`header-${index}`}>{header}</th>
            ))}
          </tr>
        </thead>
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
