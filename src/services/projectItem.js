import axios from "axios";

const fetchCategoriesAndItems = async (
  setCategories,
  setProjectItems,
  project_id
) => {
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

const addCategory = async (
  setCategories,
  setShowForm,
  categoryTitle,
  setCategoryTitle,
  project_id
) => {
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

const updateCategory = async (
  id,
  setCategories,
  categoryTitle,
  setCategoryTitle
) => {
  try {
    if (!categoryTitle) {
      console.log(`no title`);
      return setCategories((prev) => prev);
    }

    const editedCategory = {
      title: categoryTitle,
    };
    console.log(editedCategory);
    const { data } = await axios.put(
      `projectItems/category/${id}`,
      editedCategory
    );
    setCategories((prev) =>
      prev.map((category) =>
        id === category._id ? data.updatedCategory : category
      )
    );
    setCategoryTitle("");
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const createItem = async (
  item,
  deadline,
  category_id,
  project_id,
  setItem,
  setDeadline,
  setProjectItems
) => {
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
    setProjectItems((prev) => [...prev, data.projectItem]);
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const updateItem = async (id, editedItem, setProjectItems, setItem) => {
  try {
    const {
      data: { updatedItem },
    } = await axios.put(`projectItems/${id}`, editedItem);
    setProjectItems((prev) =>
      prev.map((item) => (item._id === id ? updatedItem : item))
    );
    setItem("");
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const removeItem = async (item_id, setProjectItems) => {
  try {
    const { data } = await axios.delete(`/projectItems/${item_id}`);
    setProjectItems((prev) => prev.filter((item) => item._id !== item_id));
    console.log(data.message);
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export {
  fetchCategoriesAndItems,
  addCategory,
  updateCategory,
  createItem,
  updateItem,
  removeItem,
};
