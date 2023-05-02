import { useState } from "react";
import { Table } from "react-bootstrap";

import ProjectItem from "./ProjectItem";
import ProjectItemForm from "./ProjectItemForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faEdit } from "@fortawesome/free-solid-svg-icons";

const Category = ({
  category,
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
  return (
    <>
      <h5 className="" key={`category-${category._id}`}>
        {category.title}
      </h5>
      <Table
        key={`table-${category._id}`}
        className=" shadow"
        style={{ borderRadius: "10px" }}
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
