import { Tabs, Tab } from "react-bootstrap";
import { useState } from "react";
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  TextField,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { GroupAdd, GroupRemove } from "@mui/icons-material";
import { tokens } from "../../theme";

const EditMembersModal = ({
  owner_email,
  addMember,
  removeMember,
  setShowEditMember,
  showEditMember,
  teamMembers,
}) => {
  const [email, setEmail] = useState("");
  const [membersToAdd, setMembersToAdd] = useState([]);

  const [membersList, setMembersList] = useState(teamMembers);
  const [membersToRemove, setMembersToRemove] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // --- INSIDE INVITE MEMBERS TAB ---

  const onInvite = (e) => {
    e.preventDefault();
    if (membersToAdd.length === 0 && !email) return;
    addMember(membersToAdd);
    setShowEditMember((prev) => !prev);
    setEmail("");
  };

  const add = (email) => {
    if (!email) return;
    if (membersToAdd.includes(email)) {
      return setEmail("");
    }
    setMembersToAdd((prev) => [...prev, email]);
    setEmail("");
  };

  const remove = (email) => {
    setMembersToAdd((prev) => prev.filter((member) => member !== email));
  };

  const membersToBeInvited = membersToAdd?.map((email, index) => (
    <Chip
      key={`member-${index}`}
      sx={{ my: "5px", mx: "5px" }}
      size="medium"
      variant="filled"
      color="success"
      label={email}
      onDelete={() => remove(email)}
    />
  ));

  // --- INSIDE REMOVE MEMBERS TAB ---

  const onRemove = (e) => {
    e.preventDefault();
    removeMember(membersToRemove);
    setShowEditMember((prev) => !prev);
  };

  const removeFromCurrentMembersArr = (email) => {
    setMembersList((prev) => prev.filter((member) => member !== email));
    setMembersToRemove((prev) => [...prev, email]);
  };

  const removeFromArr = (email) => {
    setMembersToRemove((prev) => prev.filter((member) => member !== email));
    setMembersList((prev) => [...prev, email]);
  };

  const currentMembersList = membersList
    ?.filter((member) => member !== owner_email)
    .map((member, index) => (
      <Chip
        key={`member-${index}`}
        sx={{ my: "5px", mx: "5px" }}
        size="medium"
        variant="filled"
        color="primary"
        label={member}
        onDelete={() => removeFromCurrentMembersArr(member)}
      />
    ));

  const membersToBeRemoved = membersToRemove.map((email, index) => (
    <Chip
      key={`member-${index}`}
      sx={{ my: "5px", mx: "5px" }}
      size="medium"
      variant="filled"
      color="warning"
      label={email}
      onDelete={() => removeFromArr(email)}
    />
  ));

  return (
    <>
      <Dialog
        open={showEditMember}
        onClose={() => setShowEditMember((prev) => !prev)}
      >
        <Tabs
          className="justify-content-center"
          style={{ backgroundColor: colors.primary[400] }}
        >
          <Tab
            eventKey="tab-invite"
            title="Invite Members"
            style={{ backgroundColor: colors.primary[400] }}
          >
            <DialogContent sx={{ minWidth: 400 }}>
              <div className="d-flex">
                <TextField
                  type="email"
                  name="email"
                  value={email}
                  variant="standard"
                  placeholder="Add a team member/s"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  fullWidth
                />

                <Button
                  variant="contained"
                  onClick={() => add(email)}
                  sx={{
                    height: "fit-content",
                    bgcolor: "darkgreen",
                    color: "white",
                    ml: 2,
                  }}
                >
                  Add
                </Button>
              </div>

              <Divider color="grey" sx={{ my: 2 }} />

              {membersToBeInvited}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              {membersToAdd.length > 0 && (
                <Button
                  startIcon={<GroupAdd />}
                  variant="contained"
                  onClick={onInvite}
                  sx={{
                    height: "fit-content",
                    bgcolor: "darkgreen",
                    color: "white",
                  }}
                >
                  Invite
                </Button>
              )}

              <Button
                variant="contained"
                onClick={() => setShowEditMember(false)}
                sx={{
                  height: "fit-content",
                  bgcolor: "darkred",
                  color: "white",
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Tab>

          <Tab
            eventKey="tab-remove"
            title="Remove Members from Project"
            style={{ backgroundColor: colors.primary[400] }}
          >
            <DialogContent sx={{ display: "flex" }}>
              <div>
                <Typography>Current Members: </Typography>
                {currentMembersList}
              </div>
              <Divider
                sx={{ mx: 2 }}
                orientation="vertical"
                color="grey"
                flexItem
              />
              <div>
                <Typography>To be Removed: </Typography>
                {membersToBeRemoved}
              </div>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              {membersToRemove.length > 0 && (
                <Button
                  variant="contained"
                  endIcon={<GroupRemove />}
                  onClick={() => add(email)}
                  sx={{
                    height: "fit-content",
                    bgcolor: "Darkred",
                    color: "white",
                    ml: 2,
                  }}
                >
                  Remove
                </Button>
              )}
              <Button
                variant="contained"
                onClick={() => setShowEditMember(false)}
                sx={{
                  height: "fit-content",
                  bgcolor: "grey",
                  color: "white",
                  ml: 2,
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Tab>
        </Tabs>
      </Dialog>
    </>
  );
};

export default EditMembersModal;
