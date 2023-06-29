import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import Category from "./Category";
import {
  fetchCategoriesAndItems,
  createItem,
  updateItem,
  removeItem,
} from "../../services/projectItem";

import {
  addCategory,
  updateCategory,
  removeCategory,
} from "../../services/category";

import { Button, Chip, Typography, useTheme } from "@mui/material";
import { Add, ControlPoint } from "@mui/icons-material";
import { tokens } from "../../theme";

const Tables = ({ completion_date }) => {
  const [categories, setCategories] = useState([]);
  const [projectItems, setProjectItems] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [item, setItem] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const { project_id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    updateCategory(
      id,
      setCategories,
      categoryTitle,
      setCategoryTitle,
      project_id
    );
  };

  const deleteCategory = async (category_id) => {
    removeCategory(category_id, setCategories, setProjectItems, project_id);
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

  const projectHeaders = [
    "Project Item",
    "Owners",
    "Deadline",
    "Status",
    "Notes",
  ];

  return (
    <>
      {!showForm && (
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => setShowForm(true)}
          sx={{ my: 2.5, bgcolor: colors.greenAccent[600], borderRadius: 3 }}
        >
          <Typography variant="h6">Add a Category</Typography>
        </Button>
      )}

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
            }}
          />
        </div>
      ))}
    </>
  );
};

export default Tables;
