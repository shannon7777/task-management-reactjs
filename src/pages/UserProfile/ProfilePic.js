import { Image } from "react-bootstrap";

const ProfilePic = ({ className, imageUrl }) => {
  const placeholderPic = `https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg`;

  return (
    <Image
      className={`${className}`}
      src={imageUrl || placeholderPic}
    />
  );
};

export default ProfilePic;
