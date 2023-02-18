import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ProjectItem from "./ProjectItem";
import ProjectItemForm from "./ProjectItemForm";

// import { Card } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleList,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

const ProjectItems = () => {
  const [projectItems, setProjectItems] = useState([]);
  const [showAddProjectItem, setShowAddProjectItem] = useState(false);
  const [item, setItem] = useState("");

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
    if (!item) return;
    const itemObj = { item: item };
    try {
      const result = await fetch(
        `http://localhost:5000/api/projectItems/${project_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemObj),
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

  const onSubmit = (e) => {
    e.preventDefault();
    createProjectItem(item);
    setShowAddProjectItem((prev) => !prev);
    setItem("");
  };

  return (
    <>
      <span className="d-flex m-3">
        <FontAwesomeIcon className="px-2" icon={faRectangleList} size="xl" />
        <p>Item</p>
      </span>

      {showAddProjectItem && (
        <ProjectItemForm
          setShowAddProjectItem={setShowAddProjectItem}
          onSubmit={onSubmit}
          item={item}
          setItem={setItem}
        />
      )}
      {projectItems?.map((projectItem, index) => (
        <ProjectItem key={index} projectItem={projectItem} />
      ))}
      <span className="border d-flex m-3">
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
