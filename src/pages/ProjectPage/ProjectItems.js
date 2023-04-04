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
  const [formData, setFormData] = useState({
    item: "",
    deadline: new Date(),
  });
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
    if (!formData.item) return;
    const item = {
      ...formData,
      deadline: formData.deadline.toDateString(),
    };
    try {
      const { data } = await axios.post(`projectItems/${project_id}`, item);
      setShowAddProjectItem((prev) => !prev);
      setFormData({ item: "", deadline: new Date() });
      setProjectItems([...projectItems, data.projectItem]);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const editItem = async (id) => {
    const editedItem = {
      ...formData,
      deadline: formData.deadline.toDateString(),
    };
    try {
      const {
        data: { updatedItem },
      } = await axios.put(`projectItems/${id}`, editedItem);
      setProjectItems(
        projectItems.map((item) => (item._id === id ? updatedItem : item))
      );
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

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const projectHeaders = [
    { title: "Project Item" },
    { title: "Owners" },
    { title: "Deadline" },
    { title: "Notes" },
    { title: "Status" },
  ];

  return (
    <>
      <Table className="mt-5 border" variant="" striped bordered hover>
        <thead className="w-auto mw-100">
          <tr>
            {projectHeaders.map((header, index) => (
              <th key={index}>{header.title}</th>
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
              onChange={onChange}
            />
          ))}
      </Table>

      {showAddProjectItem && (
        <ProjectItemForm
          setShowAddProjectItem={setShowAddProjectItem}
          onSubmit={createProjectItem}
          onChange={onChange}
          formData={formData}
          setFormData={setFormData}
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
