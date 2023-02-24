import Owners from "./Owners";

const ProjectItem = ({ projectItem, teamMembers }) => {
  return (
    <tbody>
      <tr>
        <td>{projectItem.item}</td>
        <Owners projectItem_id={projectItem._id} teamMembers={teamMembers} />
        <td>{projectItem.deadline}</td>
        <td>{projectItem.notes}</td>
        <td>{projectItem.progress}</td>
      </tr>
    </tbody>
  );
};
export default ProjectItem;
