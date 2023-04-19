import Owners from "./Owners";
import Item from "./Item";
import Notes from "./Notes";
import Deadline from "./Deadline";
import Status from "./Status";

import { useState, useEffect } from "react";
import axios from "axios";

const ProjectItem = ({
  projectItem,
  teamMembers,
  editItem,
  deleteItem,
  onChange,
}) => {
  const [owners, setOwners] = useState([]);
  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const {
        data: { owners },
      } = await axios(`projectItems/owners/${projectItem._id}`);
      return setOwners(owners);
    } catch (error) {
      if (error.response) console.log(error.response.data.message);
      else {
        console.log(error.message);
      }
    }
  };
  return (
    <tbody>
      <tr>
        <Item
          projectItem={projectItem}
          editItem={editItem}
          deleteItem={deleteItem}
          onChange={onChange}
        />
        <Owners
          item_id={projectItem?._id}
          teamMembers={teamMembers}
          owners={owners}
          setOwners={setOwners}
        />
        <Deadline
          deadline={projectItem?.deadline}
          editItem={editItem}
          item_id={projectItem?._id}
        />
        <Status
          progress={projectItem?.progress}
          editItem={editItem}
          item_id={projectItem?._id}
        />
        <Notes
          projectItem={projectItem}
          editItem={editItem}
          ownerIds={owners.map((owner) => owner._id)}
        />
      </tr>
    </tbody>
  );
};
export default ProjectItem;
