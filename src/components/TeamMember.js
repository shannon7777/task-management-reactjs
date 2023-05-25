import { useRef, useState, useEffect } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import axios from "axios";

const TeamMembers = ({ member, className }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const target = useRef(null);
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
    <>
      <span
        ref={target}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <img
          alt="user"
          className={className}
          src={imageUrl || placeholderPic}
        />
      </span>
      <Overlay target={target.current} show={isHovering} placement="right">
        {(props) => <Tooltip {...props}>{member.username}</Tooltip>}
      </Overlay>
    </>
  );
};

export default TeamMembers;
