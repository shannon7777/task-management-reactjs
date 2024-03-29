import { useState } from "react";
import { inviteOwners, deleteOwners } from "../../services/projectItem";

import TeamMembers from "../../components/TeamMember";
import EditOwnersModal from "./EditOwnersModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersGear } from "@fortawesome/free-solid-svg-icons";
import { Stack, TableCell } from "@mui/material";

const Owners = ({ item_id, teamMembers, owners, setOwners, project_id }) => {
  const [hover, setHover] = useState(false);
  const [showEditOwner, setShowEditOwner] = useState(false);

  const addOwners = async (ownerArr) => {
    inviteOwners(ownerArr, setOwners, item_id, project_id);
  };

  const removeOwners = async (owner) => {
    deleteOwners(owner, setOwners, item_id, project_id);
  };

  return (
    <TableCell
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ maxWidth: 5 }}
    >
      <span className="d-flex justify-content-between">
        {showEditOwner && (
          <EditOwnersModal
            owners={owners}
            teamMembers={teamMembers}
            setShowEditOwner={setShowEditOwner}
            showEditOwner={showEditOwner}
            addOwners={addOwners}
            removeOwners={removeOwners}
          />
        )}
        <Stack direction="row">
          {owners?.map((owner, index) => (
            <TeamMembers key={index} member={owner} width={25} height={25} />
          ))}
        </Stack>
        <FontAwesomeIcon
          className="mt-2"
          icon={faUsersGear}
          onClick={() => setShowEditOwner(true)}
          style={{ cursor: "pointer", color: !hover && "#d0d8e7" }}
        />
      </span>
    </TableCell>
  );
};

export default Owners;
