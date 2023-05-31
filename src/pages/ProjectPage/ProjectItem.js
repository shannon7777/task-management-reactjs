import Owners from "./Owners";
import Item from "./Item";
import Notes from "./Notes";
import Deadline from "./Deadline";
import Status from "./Status";

import { useState, useEffect } from "react";
import { getOwners } from "../../services/projectItem";
import { useParams } from "react-router-dom";

const ProjectItem = ({
  projectItem,
  teamMembers,
  editItem,
  deleteItem,
  completion_date,
}) => {
  const [owners, setOwners] = useState([]);
  useEffect(() => {
    fetchOwners();
  }, [teamMembers]);

  const { project_id } = useParams();

  const fetchOwners = async () => {
    // let projectItems = JSON.parse(localStorage.getItem(`projectItems-${project_id}`))
    // let item = projectItems.filter(item => item._id === projectItem._id)
    getOwners(projectItem._id, setOwners, project_id);
  };

  return (
    <tbody>
      <tr>
        <Item
          projectItem={projectItem}
          editItem={editItem}
          deleteItem={deleteItem}
        />
        <Owners
          item_id={projectItem?._id}
          teamMembers={teamMembers}
          owners={owners}
          setOwners={setOwners}
          project_id={project_id}
        />
        <Deadline
          projectItem={projectItem}
          editItem={editItem}
          completion_date={completion_date}
        />
        <Status
          progress={projectItem?.progress}
          editItem={editItem}
          item_id={projectItem?._id}
        />
        <Notes
          projectItem={projectItem}
          editItem={editItem}
          owners={owners}
        />
      </tr>
    </tbody>
  );
};
export default ProjectItem;
