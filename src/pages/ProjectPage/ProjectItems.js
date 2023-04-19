import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProjectItem from "./ProjectItem";
import ProjectItemForm from "./ProjectItemForm";

import { Table } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const ProjectItems = ({ teamMembers }) => {
  const [projectItems, setProjectItems] = useState([]);
  const [showAddProjectItem, setShowAddProjectItem] = useState(false);
  const [item, setItem] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const { project_id } = useParams();

  useEffect(() => {
    fetchProjectItems();
  }, []);

  const fetchProjectItems = async () => {
    try {
      const { data } = await axios(`projectItems/${project_id}`);
      setProjectItems(data.projectItems);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const createProjectItem = async (e) => {
    e.preventDefault();
    if (!item) return;
    const createdItem = {
      item,
      deadline: deadline.toDateString(),
    };
    try {
      const { data } = await axios.post(
        `projectItems/${project_id}`,
        createdItem
      );
      setShowAddProjectItem((prev) => !prev);
      setItem("");
      setDeadline(new Date());
      setProjectItems([...projectItems, data.projectItem]);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const editItem = async (id, editedItem) => {
    console.log(editedItem);
    try {
      const {
        data: { updatedItem },
      } = await axios.put(`projectItems/${id}`, editedItem);
      setProjectItems(
        projectItems.map((item) => (item._id === id ? updatedItem : item))
      );
      setItem("");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const deleteItem = async (item_id) => {
    try {
      const { data } = await axios.delete(`/projectItems/${item_id}`);
      setProjectItems(projectItems.filter((item) => item._id !== item_id));
      console.log(data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const projectHeaders = [
    "Project Item",
    "Owners",
    "Deadline",
    "Notes",
    "Status",
  ];

  return (
    <>
      <Table className="mt-5 border rounded" variant="" striped bordered hover>
        <thead className="w-auto mw-100">
          <tr>
            {projectHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        {projectItems &&
          projectItems?.map((projectItem, index) => (
            <ProjectItem
              key={index}
              projectItem={projectItem}
              teamMembers={teamMembers}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          ))}
      </Table>

      {showAddProjectItem && (
        <ProjectItemForm
          setShowAddProjectItem={setShowAddProjectItem}
          onSubmit={createProjectItem}
          deadline={deadline}
          setDeadline={setDeadline}
          item={item}
          setItem={setItem}
        />
      )}
      <span className="d-flex m-3">
        <FontAwesomeIcon
          icon={faSquarePlus}
          size="xl"
          style={{ cursor: "pointer" }}
          onClick={() => setShowAddProjectItem(true)}
        />
        <p className="mx-2">Add Item</p>
      </span>
    </>
  );
};

export default ProjectItems;
