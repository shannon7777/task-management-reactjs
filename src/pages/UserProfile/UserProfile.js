import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import ProfilePicUpload from "./ProfilePicUpload";
import { Button, Card, Row, Col } from "react-bootstrap";
import ProfilePic from "./ProfilePic";
import RemovePic from "./RemovePic";

const UserProfile = ({ setError, setNotify }) => {
  const {
    auth: {
      user: { firstName, lastName, email, username, roles, imgUrl },
    },
  } = useAuth();
  const [showUpload, setShowUpload] = useState(false);
  const [showDeletePic, setShowDeletePic] = useState(false);

  const uploadActions = {
    setShowUpload,
    setNotify,
    setError,
  };

  const deleteActions = {
    showDeletePic,
    setShowDeletePic,
    setNotify,
    setError,
  };

  let imageUrl = JSON.parse(localStorage.getItem("userImg"));

  const text = !localStorage.getItem("userImg") ? "Upload a picture" : "Change Picture";

  return (
    <Card className="border border-secondary shadow p-3 m-4 bg-white">
      <Card.Header className="text-uppercase text-center">
        User Profile
      </Card.Header>
      <Row className="m-3">
        <Col>
          <ProfilePic
            className="profilePic border shadow rounded-circle"
            imageUrl={imageUrl}
          />
          {showUpload && <ProfilePicUpload {...uploadActions} />}
        </Col>

        <Col className="d-flex align-items-end flex-column">
          <Button
            variant={showUpload ? "outline-danger" : "outline-success"}
            onClick={() => setShowUpload(!showUpload)}
          >
            {showUpload ? "Cancel" : text}
          </Button>
          {!showUpload && localStorage.getItem("userImg") && (
            <>
              <Button
                className="mt-auto"
                variant={!showUpload && "outline-dark"}
                onClick={() => setShowDeletePic(!showDeletePic)}
              >
                Remove Display Picture
              </Button>
              <RemovePic {...deleteActions} />
            </>
          )}
        </Col>
      </Row>

      <Row className="m-3">
        <Col>
          <Card.Text>
            <strong>Full Name: </strong>
            {firstName} {lastName}
          </Card.Text>
          <Card.Text><strong>E-mail: </strong> {email}</Card.Text>
          <Card.Text>
            <strong>Username: </strong>{username}
          </Card.Text>
          <Card.Text><strong>Role:</strong> {roles}</Card.Text>
        </Col>

        <Col className="d-flex align-items-end flex-column">
          <Link className="" to="/profile/edit" element={<EditProfile />}>
            <Button variant="outline-success text-dark">
              Edit User Details
            </Button>
          </Link>
        </Col>
      </Row>
      <Card.Footer>
        <Link to="/">HomePage</Link>
      </Card.Footer>
    </Card>
  );
};

export default UserProfile;
