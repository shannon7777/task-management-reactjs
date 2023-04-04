import Owners from "./Owners";
import Item from "./Item";
import Notes from "./Notes";
import Deadline from "./Deadline";

const ProjectItem = ({
  projectItem,
  teamMembers,
  editItem,
  deleteItem,
  onChange,
}) => {
  return (
    <tbody>
      <tr>
        <Item
          projectItem={projectItem}
          editItem={editItem}
          deleteItem={deleteItem}
          onChange={onChange}
        />
        <Owners item_id={projectItem._id} teamMembers={teamMembers} />
        <Deadline deadline={projectItem.deadline} />
        <Notes
          projectItem={projectItem}
          // notes={projectItem.notes}
          editItem={editItem}
          // item_id={projectItem._id}
          // itemOwners={projectItem.owners}
        />
        <td>{projectItem.progress}</td>
      </tr>
    </tbody>
  );
};
export default ProjectItem;
