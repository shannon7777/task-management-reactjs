import { useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import useFetchImg from "../../hooks/useFetchImg";
import { Form, Button } from "react-bootstrap";
import { FcCancel } from "react-icons/fc";

const ProfilePicUpload = ({ setShowUpload, setNotify, setError }) => {
  const [file, setFile] = useState();
  const {
    auth: { user, accessToken, imgUrl },
  } = useAuth();
  const bearerToken = `Bearer ${accessToken}`;
  const inputRef = useRef(null);
  const fetchImg = useFetchImg();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const img = new FormData();
      if (file) {
        img.append("image", file);
      }

      // for posting images via fetch(), remove "Content-Type": "multipart/form-data" header!
      const result = await fetch(
        `http://localhost:5000/api/users/img/${user._id}`,
        {
          method: "POST",
          headers: {
            Authorization: bearerToken,
          },
          body: img,
          credentials: "include",
        }
      );
      const { message } = await result.json();
      if (result.status === 401) {
        throw Error(message);
      }
      setNotify({ text: message });
      setShowUpload((prev) => !prev);
      setFile(null);
      await fetchImg();
    } catch (error) {
      setError({ text: error.message });
    }
  };

  const clearFileInput = () => {
    inputRef.current.value = null;
    setFile(null);
  };

  return (
    <>
      <Form.Group controlId="formFile" className="m-3" style={{ width: 600 }}>
        <Form.Label>Upload your display picture here</Form.Label>
        <Form.Control
          onChange={(e) => setFile(e.target.files[0])}
          name="image"
          type="file"
          accept="image/*"
          ref={inputRef}
        />
        {file && (
          <>
            <Button variant="success" type="submit" onClick={onSubmit}>
              Upload
            </Button>
            <FcCancel size={25} onClick={clearFileInput} style={{ cursor: "pointer"}} />
          </>
        )}
      </Form.Group>
    </>
  );
};

export default ProfilePicUpload;
