import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import Category from "./Category";
import {
  fetchCategoriesAndItems,
  addCategory,
  updateCategory,
  createItem,
  updateItem,
  removeItem,
} from "../../services/projectItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const Tables = ({ teamMembers, completion_date }) => {
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
    fetchCategoriesAndItems(setCategories, setProjectItems, project_id);
  };

  const createCategory = async () => {
    addCategory(
      setCategories,
      setShowForm,
      categoryTitle,
      setCategoryTitle,
      project_id
    );
  };

  const editCategory = async (id) => {
    updateCategory(id, setCategories, categoryTitle, setCategoryTitle, project_id);
  };

  const createProjectItem = async (category_id) => {
    createItem(
      item,
      deadline,
      category_id,
      project_id,
      setItem,
      setDeadline,
      setProjectItems
    );
  };

  const editItem = async (id, editedItem) => {
    updateItem(id, editedItem, setProjectItems, setItem, project_id);
  };

  const deleteItem = async (item_id) => {
    removeItem(item_id, setProjectItems, project_id);
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
              editCategory,
              setCategoryTitle,
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

export default Tables;
