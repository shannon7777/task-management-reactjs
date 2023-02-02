import { useRef, useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Image } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

const TeamMembers = ({ member }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const target = useRef(null);
  const {
    auth: { accessToken },
  } = useAuth();
  const bearerToken = `Bearer ${accessToken}`;

  const placeholderPic = `https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg`;

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {member.username}
    </Tooltip>
  );

  const fetchImg = async () => {
    const result = await fetch(
      `http://localhost:5000/api/users/img/${member._id}`,
      {
        method: "GET",
        headers: {
          Authorization: bearerToken,
        },
        credentials: "include",
      }
    );
    const { imageUrl } = await result.json();
    setImageUrl((prev) => imageUrl);
  };

  useEffect(() => {
    fetchImg();
  }, []);

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <span
        ref={target}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <Image
          className="teamMemberpic"
          src={imageUrl || placeholderPic}
        ></Image>
      </span>
    </OverlayTrigger>
  );
};

export default TeamMembers;
