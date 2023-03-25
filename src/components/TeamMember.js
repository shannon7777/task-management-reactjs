import { useRef, useState, useEffect } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

const TeamMembers = ({ member_id }) => {
  const [user, setUser] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const target = useRef(null);
  const {
    auth: { accessToken },
  } = useAuth();
  const bearerToken = `Bearer ${accessToken}`;

  const placeholderPic = `https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg`;

  const fetchImg = async () => {
    const result = await fetch(
      `http://localhost:5000/api/users/img/${member_id}`,
      {
        headers: {
          Authorization: bearerToken,
        },
        credentials: "include",
      }
    );
    const { imageUrl } = await result.json();
    setImageUrl(imageUrl);
  };

  const fetchUser = async () => {
    const result = await fetch(`http://localhost:5000/api/users/${member_id}`, {
      headers: {
        Authorization: bearerToken,
      },
      credentials: "include",
    });
    const { user } = await result.json();
    if (result.status === 200) return setUser(user);
  };

  useEffect(() => {
    fetchUser();
    fetchImg();
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
