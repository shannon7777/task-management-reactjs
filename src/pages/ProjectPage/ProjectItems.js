import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CategoryForm from "./CategoryForm";
import Category from "./Category";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const ProjectItems = ({ teamMembers, completion_date }) => {
  const [categories, setCategories] = useState([]);
  const [projectItems, setProjectItems] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [item, setItem] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [hover, setHover] = useState(false);
  const { project_id } = useParams();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [fetchedProjectItems, fetchedCategories] = await Promise.all([
        axios(`projectItems/${project_id}`),
        axios(`projectItems/category/${project_id}`),
      ]);
      setCategories(fetchedCategories.data.categories);
      setProjectItems(fetchedProjectItems.data.projectItems);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const createCategory = async () => {
    try {
      const { data } = await axios.post(`projectItems/category/${project_id}`, {
        title: categoryTitle,
      });
      setCategories((prev) => [...prev, data.newCategory]);
      setShowForm((prev) => !prev);
      setCategoryTitle("");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const createProjectItem = async (category_id) => {
    console.log(category_id);
    if (!item) return;
    const createdItem = {
      item,
      deadline: deadline.toDateString(),
      category_id,
    };
    try {
      const { data } = await axios.post(
        `projectItems/${project_id}`,
        createdItem
      );
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

  // const completionPercentage = (projectItems) => {
  //   let completedItems = projectItems?.filter(
  //     (item) => item.progress === "Completed"
  //   ).length;
  //   let totalItems = projectItems.length;
  //   let percentage = Math.round((completedItems / totalItems) * 100);
  //   if (!completedItems) return 0;
  //   return percentage;
  // };

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const projectHeaders = [
    "Project Item",
    "Owners",
    "Deadline",
    "Status",
    "Notes",
  ];

  return (
    <>
      <div
      className="my-5"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon
          icon={faCirclePlus}
          style={{
            color: !hover && "rgb(192,191,191)",
          }}
          size="xl"
          onClick={() => setShowForm(true)}
        />
        <span className="mx-2">Create Category</span>
      </div>
      {showForm && (
        <CategoryForm
          {...{ createCategory, setShowForm, setCategoryTitle, categoryTitle }}
        />
      )}

      {categories.map((category) => (
        <div key={`category-${category._id}`}>
          <Category
            {...{
              category,
              projectItems,
              teamMembers,
              createProjectItem,
              completion_date,
              editItem,
              deleteItem,
              projectHeaders,
              item,
              setItem,
              deadline,
              setDeadline,
            }}
          />
        </div>
      ))}
    </>
  );
};

export default ProjectItems;
