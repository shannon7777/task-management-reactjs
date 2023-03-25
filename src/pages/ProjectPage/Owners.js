import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import TeamMembers from "../../components/TeamMember";
import EditOwnersModal from "./EditOwnersModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersLine } from "@fortawesome/free-solid-svg-icons";

const Owners = ({ item_id, teamMembers }) => {
  const [owners, setOwners] = useState([]);
  const [hover, onHover] = useState(false);
  const [showEditOwner, setShowEditOwner] = useState(false);
  const {
    auth: { accessToken },
  } = useAuth();

  const fetchOwners = async () => {
    try {
      const result = await fetch(
        `http://localhost:5000/api/projectItems/owners/${item_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        }
      );
      if (result.status === 400) return;
      const { owners } = await result.json();
      return setOwners(owners);
    } catch (error) {}
  };

  const addOwners = async (ownerArr) => {
    try {
      const result = await fetch(
        `http://localhost:5000/api/projectItems/owners/${item_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ownerArr),
          credentials: "include",
        }
      );
      if (result.status === 400) return;
      const { owners } = await result.json();
      if (result.status === 200) setOwners((prev) => [...prev, ...owners]);
    } catch (error) {}
  };

  const removeOwners = async (owner) => {
    setOwners([]);
    try {
      const result = await fetch(
        `http://localhost:5000/api/projectItems/owners/${item_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(owner),
          credentials: "include",
        }
      );
      const { message } = await result.json();
      if (result.status === 400) return console.log(message);
      if (result.status === 200) console.log(message);
      //   setOwners((prev) => prev.filter((user) => !owner.includes(user.email)));
      const filteredOwners = owners.filter((user) => user.email !== owner[0]);
      setOwners(filteredOwners);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

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
