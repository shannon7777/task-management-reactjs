import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
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

  const {
    auth: { accessToken },
  } = useAuth();
  const { project_id } = useParams();

  const fetchProjectItems = async () => {
    try {
      const result = await fetch(
        `http://localhost:5000/api/projectItems/${project_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        }
      );
      const { projectItems } = await result.json();
      setProjectItems(projectItems);
    } catch (error) {}
  };

  const createProjectItem = async (item) => {
    try {
      const result = await fetch(
        `http://localhost:5000/api/projectItems/${project_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
          credentials: "include",
        }
      );
      const { projectItem } = await result.json();
      console.log(projectItem);
      setProjectItems([...projectItems, projectItem]);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProjectItems();
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.item) return;
    createProjectItem({
      ...formData,
      deadline: formData.deadline.toDateString(),
    });
    setShowAddProjectItem((prev) => !prev);
    setFormData({ item: "", deadline: "" });
  };

  const editItem = async (editedObj, id) => {
    console.log(editedObj, id);
    const res = await fetch(`http://localhost:5000/api/projectItems/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedObj),
      credentials: "include",
    });

    const {
      updatedItem: { item, deadline, progress, notes },
    } = await res.json();
    setProjectItems(
      projectItems.map((projectItem) => {
        if (projectItem._id === id) {
          projectItem.item = item ? item : projectItem.item;
          projectItem.deadline = deadline ? deadline : projectItem.deadline;
          projectItem.progress = progress ? progress : projectItem.progress;
          projectItem.notes = notes ? notes : projectItem.notes;
        }
        return projectItem;
      })
    );
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
        {projectItems?.map((projectItem, index) => (
          <ProjectItem
            key={index}
            projectItem={projectItem}
            teamMembers={teamMembers}
            editItem={editItem}
          />
        ))}
      </Table>

      {showAddProjectItem && (
        <ProjectItemForm
          setShowAddProjectItem={setShowAddProjectItem}
          onSubmit={onSubmit}
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
