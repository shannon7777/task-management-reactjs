import { Link } from "react-router-dom";
import TeamMembers from "../../components/TeamMember";

const MemberSelectionList = ({ teamMembers, setSelectedUser }) => {
  return (
    <div
      className="m-2 border rounded"
      style={{ overflow: "auto", height: "230px" }}
    >
      {teamMembers &&
        teamMembers.map((member) => (
          <div
            key={member._id}
            className="d-flex border p-1 shadow m-1"
            onClick={() => setSelectedUser(member)}
            // style={{  }}
          >
            <p>
              <strong>{member.username}</strong>
            </p>
            <span>
              <TeamMembers
                member={member}
                className="member-dashboard"
              />
            </span>
          </div>
        ))}
    </div>
  );
};

export default MemberSelectionList;
