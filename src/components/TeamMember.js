import { useState, useEffect } from "react";
import { Tooltip, Zoom, Avatar, Typography } from "@mui/material";
import axios from "axios";

const TeamMembers = ({ member, width, height }) => {
  const [imageUrl, setImageUrl] = useState("");
  const placeholderPic = `https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg`;

  const fetchTeamMember = async () => {
    if (!member) return;
    try {
      let image = JSON.parse(localStorage.getItem(`memberImg-${member._id}`));
      if (image) return setImageUrl(image);
      const { data } = await axios(`users/img/${member._id}`);
      setImageUrl(data.imageUrl);
      localStorage.setItem(
        `memberImg-${member._id}`,
        JSON.stringify(data.imageUrl)
      );
    } catch (error) {
      if (error.response) console.log(error.response.data.message);
      else {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    fetchTeamMember();
  }, [member]);

  return (
    <Tooltip
      title={<Typography fontSize={15}>{member?.username}</Typography>}
      TransitionComponent={Zoom}
      arrow
    >
      <Avatar
        alt="user"
        src={imageUrl || placeholderPic}
        sx={{ width, height }}
      />
    </Tooltip>
  );
};

export default TeamMembers;
