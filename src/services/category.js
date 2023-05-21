import axios from "axios";

const fetchCategories = async (project_id, setCategories) => {
  try {
    const { data } = await axios(`projectItems/category/${project_id}`);
    setCategories(data.categories);
    localStorage.setItem(
      `categories-${project_id}`,
      JSON.stringify(data.categories)
    );
  } catch (error) {
    if (error.response) console.log(error.response.data.message);
    else {
      console.log(error.message);
    }
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
    let categories = JSON.parse(
      localStorage.getItem(`categories-${project_id}`)
    );
    let newCategories = [...categories, data.newCategory];
    setCategories(newCategories);
    localStorage.setItem(
      `categories-${project_id}`,
      JSON.stringify(newCategories)
    );
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
  setCategoryTitle,
  project_id
) => {
  try {
    if (!categoryTitle) return;
    const { data, status } = await axios.put(`projectItems/category/${id}`, {
      title: categoryTitle,
    });
    if (status === 400) throw console.log(`Could not update category`);
    let categories = JSON.parse(
      localStorage.getItem(`categories-${project_id}`)
    );
    let updatedCategories = categories.map((category) =>
      category._id === id ? data.updatedCategory : category
    );
    setCategories(updatedCategories);
    localStorage.setItem(
      `categories-${project_id}`,
      JSON.stringify(updatedCategories)
    );
    setCategoryTitle("");
  } catch (error) {
    if (error.response) console.log(error.response.data.message);
    else {
      console.log(error.message);
    }
  }
};

const removeCategory = async (
  category_id,
  setCategories,
  setProjectItems,
  project_id
) => {
  try {
    const { data, status } = await axios.delete(
      `/projectItems/category/${category_id}`
    );
    if (status === 400) throw console.log(data.message);

    let categories = JSON.parse(
      localStorage.getItem(`categories-${project_id}`)
    );
    let filteredCategories = categories.filter(
      (category) => category._id !== category_id
    );
    localStorage.setItem(
      `categories-${project_id}`,
      JSON.stringify(filteredCategories)
    );

    let projectItems = JSON.parse(
      localStorage.getItem(`projectItems-${project_id}`)
    );
    let filteredProjectItems = projectItems.filter(
      (item) => category_id !== item.category_id
    );
    localStorage.setItem(
      `projectItems-${project_id}`,
      JSON.stringify(filteredProjectItems)
    );

    setCategories(filteredCategories);
    setProjectItems(filteredProjectItems);
  } catch (error) {
    if (error.response) console.log(error.response.data.message);
    else {
      console.log(error.message);
    }
  }
};

export { addCategory, updateCategory, removeCategory };
