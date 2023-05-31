import { useState } from "react";
import TeamMembers from "../../components/TeamMember";

const MemberSelectionList = ({ teamMembers, setSelectedUser }) => {
  const [active, setActive] = useState(null);
  const onSelectUser = (member) => {
    setSelectedUser(member);
    setActive(member._id);
  };

  return (
    <div
      className="m-2 border rounded shadow"
      style={{ overflow: "auto", height: "230px" }}
    >
      {
        teamMembers.map((member) => (
          <div
            key={member._id}
            className={`memberSelect shadow ${
              active === member._id && "bg-dark text-white"
            }`}
            onClick={() => onSelectUser(member)}
          >
            <span>
              <TeamMembers member={member} className="member-dashboard" />
            </span>
            <p className="mx-3">
              <strong>{member.username}</strong>
            </p>
          </div>
        ))}
    </div>
  );
};

export default MemberSelectionList;
