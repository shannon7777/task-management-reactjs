import Owners from "./Owners";
import Item from "./Item";
import Notes from "./Notes";

const ProjectItem = ({ projectItem, teamMembers, editItem, id }) => {
  return (
    <tbody>
      <tr>
        <Item
          item={projectItem.item}
          editItem={editItem}
          item_id={projectItem._id}
        />
        <Owners item_id={projectItem._id} teamMembers={teamMembers} />
        <td>{projectItem.deadline}</td>
        <Notes
          notes={projectItem.notes}
          editItem={editItem}
          item_id={projectItem._id}
        />
        <td>{projectItem.progress}</td>
      </tr>
    </tbody>
  );
};
export default ProjectItem;
