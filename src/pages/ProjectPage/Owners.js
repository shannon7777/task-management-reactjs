import { useEffect, useState } from "react";
import axios from "axios";

import TeamMembers from "../../components/TeamMember";
import EditOwnersModal from "./EditOwnersModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersLine } from "@fortawesome/free-solid-svg-icons";

const Owners = ({ item_id, teamMembers }) => {
  const [owners, setOwners] = useState([]);
  const [hover, onHover] = useState(false);
  const [showEditOwner, setShowEditOwner] = useState(false);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const {
        data: { owners },
      } = await axios(`projectItems/owners/${item_id}`);
      return setOwners(owners);
    } catch (error) {
      if (error.response) console.log(error.response.data.message);
      else {
        console.log(error.message);
      }
    }
  };

  const addOwners = async (ownerArr) => {
    try {
      const {
        data: { owners },
      } = await axios.post(`projectItems/owners/${item_id}`, ownerArr);
      setOwners((prev) => [...prev, ...owners]);
      console.log(owners);
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
    <td onMouseOver={() => onHover(true)} onMouseOut={() => onHover(false)}>
      {hover && (
        <span>
          <FontAwesomeIcon
            icon={faUsersLine}
            onClick={() => setShowEditOwner(true)}
            style={{ cursor: "pointer" }}
          />
        </span>
      )}
      <span className="">
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
      </span>
      {owners?.map((owner, index) => (
        <span key={index}>
          <TeamMembers member_id={owner._id} />
        </span>
      ))}
    </td>
  );
};

export default Owners;
