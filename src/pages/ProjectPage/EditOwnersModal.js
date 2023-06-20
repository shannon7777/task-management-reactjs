import { Cancel } from "@mui/icons-material";
import {
  Avatar,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const EditOwnersModal = ({
  showEditOwner,
  setShowEditOwner,
  teamMembers,
  addOwners,
  removeOwners,
  owners,
}) => {
  const ownersEmailArr = owners.map((owner) => owner.email);
  const [projectMembers, setProjectMembers] = useState(
    teamMembers.filter((member) => !ownersEmailArr?.includes(member.email))
  );
  const [itemOwners, setItemOwners] = useState(owners);

  const addOwner = (owner) => {
    setProjectMembers((prev) =>
      prev.filter((member) => member.email !== owner.email)
    );
    setItemOwners((prev) => [...prev, owner]);
    addOwners([owner.email]);
  };

  const removeOwner = (member) => {
    setItemOwners((prev) =>
      prev.filter((owner) => owner.email !== member.email)
    );
    setProjectMembers((prev) => [...prev, member]);
    removeOwners([member.email]);
  };

  const imgFromStorage = (id) =>
    JSON.parse(localStorage.getItem(`memberImg-${id}`));

  const currentProjectMembers = projectMembers?.map((member, index) => (
    <Chip
      key={index}
      sx={{ my: "5px", mx: "5px" }}
      size="medium"
      variant="filled"
      color="secondary"
      avatar={<Avatar src={imgFromStorage(member?._id)} />}
      label={member.email}
      onClick={() => addOwner(member)}
    />
  ));

  const itemOwnersArr = itemOwners?.map((owner, index) => (
    <Chip
      sx={{ my: "5px", mx: "5px" }}
      size="medium"
      key={index}
      variant="filled"
      color="primary"
      avatar={<Avatar src={imgFromStorage(owner?._id)} />}
      onDelete={() => removeOwner(owner)}
      label={owner.email}
    />
  ));

  return (
    <>
      <Dialog
        open={showEditOwner}
        onClose={() => setShowEditOwner((prev) => !prev)}
      >
        <Typography textAlign="center" m={2} variant="h4">
          Select or remove owners
        </Typography>
        <Divider />
        <DialogContent sx={{ display: "flex" }}>
          <div>
            <Typography>Add</Typography>
            {currentProjectMembers}
          </div>
          <Divider
            sx={{ mx: 2 }}
            orientation="vertical"
            color="grey"
            flexItem
          />
          <div>
            <Typography>Remove</Typography>
            {itemOwnersArr}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditOwnersModal;
