import axios from "axios";

const fetchCategoriesAndItems = async (
  setCategories,
  setProjectItems,
  project_id
) => {
  try {
    let storedCategories = JSON.parse(
      localStorage.getItem(`categories-${project_id}`)
    );
    let storedProjectItems = JSON.parse(
      localStorage.getItem(`projectItems-${project_id}`)
    );
    if (storedCategories && storedProjectItems) {
      setCategories(storedCategories);
      setProjectItems(storedProjectItems);
      return;
    }
    const [fetchedProjectItems, fetchedCategories] = await Promise.all([
      axios(`projectItems/${project_id}`),
      axios(`projectItems/category/${project_id}`),
    ]);
    const {
      data: { projectItems },
    } = fetchedProjectItems;
    const {
      data: { categories },
    } = fetchedCategories;

    setCategories(categories);
    setProjectItems(projectItems);

    localStorage.setItem(
      `categories-${project_id}`,
      JSON.stringify(categories)
    );
    localStorage.setItem(
      `projectItems-${project_id}`,
      JSON.stringify(projectItems)
    );
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
    //  UPDATE CATEGORIES TOO  !!!!
    setItem("");
    setDeadline(new Date());
    let projectItems = JSON.parse(
      localStorage.getItem(`projectItems-${project_id}`)
    );
    let newProjectItems = [...projectItems, data.projectItem];
    setProjectItems(newProjectItems);
    localStorage.setItem(
      `projectItems-${project_id}`,
      JSON.stringify(newProjectItems)
    );
  } catch (error) {
    if (error.response) console.log(error.response.data.message);
    else {
      console.log(error.message);
    }
  }
};

const updateItem = async (
  id,
  editedItem,
  setProjectItems,
  setItem,
  project_id
) => {
  try {
    const {
      data: { updatedItem },
    } = await axios.put(`projectItems/${id}`, editedItem);
    let projectItems = JSON.parse(
      localStorage.getItem(`projectItems-${project_id}`)
    );
    let updatedProjectItems = projectItems.map((item) =>
      item._id === id ? updatedItem : item
    );
    localStorage.setItem(
      `projectItems-${project_id}`,
      JSON.stringify(updatedProjectItems)
    );
    setProjectItems(updatedProjectItems);
    setItem("");
  } catch (error) {
    if (error.response) console.log(error.response.data.message);
    else {
      console.log(error.message);
    }
  }
};

const removeItem = async (item_id, setProjectItems, project_id) => {
  try {
    const { status, data } = await axios.delete(`/projectItems/${item_id}`);
    if (status === 400) throw console.log(data.message);
    let projectItems = JSON.parse(
      localStorage.getItem(`projectItems-${project_id}`)
    );
    let filteredProjectItems = projectItems.filter(
      (item) => item._id !== item_id
    );
    setProjectItems(filteredProjectItems);
    localStorage.setItem(
      `projectItems-${project_id}`,
      JSON.stringify(filteredProjectItems)
    );
    console.log(data.message);
  } catch (error) {
    if (error.response) console.log(error.response.data.message);
    else {
      console.log(error.message);
    }
  }
};

const getOwners = async (item_id, setOwners, project_id) => {
  try {
    let teamMembers = JSON.parse(
      localStorage.getItem(`teamMembers-${project_id}`)
    );
    let projectItem = JSON.parse(
      localStorage.getItem(`projectItems-${project_id}`)
    ).filter((item) => item._id === item_id);

    if (teamMembers)
      return setOwners(
        teamMembers.filter((member) =>
          projectItem[0].owners.includes(member._id)
        )
      );
  } catch (error) {
    if (error.response) console.log(error.response.data.message);
    else {
      console.log(error.message);
    }
  }
};

const inviteOwners = async (ownerArr, setOwners, item_id, project_id) => {
  try {
    const { data } = await axios.post(
      `projectItems/owners/${item_id}`,
      ownerArr
    );

    setOwners((prev) => [...prev, ...data.owners]);
    let projectItems = JSON.parse(
      localStorage.getItem(`projectItems-${project_id}`)
    );

    let updatedProjectItems = projectItems.map((item) => {
      if (item._id === item_id) {
        item.owners.push(data.owners[0]._id);
      }
      return item;
    });

    localStorage.setItem(
      `projectItems-${project_id}`,
      JSON.stringify(updatedProjectItems)
    );
  } catch (error) {
    if (error.response) console.log(error.response.data.message);
    else {
      console.log(error.message);
    }
  }
};

const deleteOwners = async (owner, setOwners, item_id, project_id) => {
  try {
    const { data } = await axios.put(`projectItems/owners/${item_id}`, owner);
    let projectItems = JSON.parse(
      localStorage.getItem(`projectItems-${project_id}`)
    );
    let filteredProjectItems = projectItems.map((item) => {
      if (item_id === item._id) {
        let index = item.owners.indexOf(data.user[0]._id);
        item.owners.splice(index, 1);
      }
      return item;
    });
    setOwners((prev) => prev.filter((o) => owner[0] !== o.email));
    localStorage.setItem(
      `projectItems-${project_id}`,
      JSON.stringify(filteredProjectItems)
    );
    console.log(data.message);
  } catch (error) {
    if (error.response) console.log(error.response.data.message);
    else {
      console.log(error.message);
    }
  }
};

const addNote = async () => {};

export {
  fetchCategoriesAndItems,
  createItem,
  updateItem,
  removeItem,
  getOwners,
  inviteOwners,
  deleteOwners,
};
