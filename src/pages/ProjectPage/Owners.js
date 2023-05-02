import { useState } from "react";
import axios from "axios";

import TeamMembers from "../../components/TeamMember";
import EditOwnersModal from "./EditOwnersModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersGear } from "@fortawesome/free-solid-svg-icons";

const Owners = ({ item_id, teamMembers, owners, setOwners }) => {
  const [hover, setHover] = useState(false);
  const [showEditOwner, setShowEditOwner] = useState(false);

  const addOwners = async (ownerArr) => {
    try {
      const {
        data: { owners },
      } = await axios.post(`projectItems/owners/${item_id}`, ownerArr);
      setOwners((prev) => [...prev, ...owners]);
    } catch (error) {
      if (error.response) console.log(error.response.data.message);
      else {
        console.log(error.message);
      }
    }
  };

  const removeOwners = async (owner) => {
    try {
      const { data } = await axios.put(`projectItems/owners/${item_id}`, owner);
      setOwners((prev) => prev.filter((user) => !owner.includes(user.email)));
      console.log(data.message);
    } catch (error) {
      if (error.response) console.log(error.response.data.message);
      else {
        console.log(error.message);
      }
    }
  };

  return (
    <td
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="d-flex justify-content-between">
        {showEditOwner && (
          <EditOwnersModal
            owners={owners?.map((owner) => owner.email)}
            teamMembers={teamMembers}
            setShowEditOwner={setShowEditOwner}
            showEditOwner={showEditOwner}
            addOwners={addOwners}
            removeOwners={removeOwners}
          />
        )}
        <span>
          {owners?.map((owner, index) => (
            <span key={index}>
              <TeamMembers member_id={owner._id} />
            </span>
          ))}
        </span>
        <FontAwesomeIcon
          className="mt-2"
          icon={faUsersGear}
          onClick={() => setShowEditOwner(true)}
          style={{ cursor: "pointer", color: !hover && "#d0d8e7" }}
        />
      </span>
    </td>
  );
};

export default Owners;
