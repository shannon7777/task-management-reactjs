import { useRef, useState, useEffect } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import axios from "axios";

const TeamMembers = ({ member_id }) => {
  const [user, setUser] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const target = useRef(null);
  const placeholderPic = `https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg`;

  const fetchTeamMember = async () => {
    if (!member_id) return;
    try {
      const [imageResponse, userResponse] = await Promise.all([
        axios(`users/img/${member_id}`),
        axios(`users/${member_id}`),
      ]);
      setImageUrl(imageResponse.data.imageUrl);
      setUser(userResponse.data.user);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchTeamMember();
  }, [member_id]);

  return (
    <>
      <span
        ref={target}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <img
          alt="user"
          className="teamMemberpic"
          src={imageUrl || placeholderPic}
        />
      </span>
      <Overlay target={target.current} show={isHovering} placement="right">
        {(props) => <Tooltip {...props}>{user.username}</Tooltip>}
      </Overlay>
    </>
  );
};

export default TeamMembers;
