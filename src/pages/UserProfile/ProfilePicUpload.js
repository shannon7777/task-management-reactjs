import { useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useFetchImg from "../../hooks/useFetchImg";
import { Form, Button } from "react-bootstrap";
import { FcCancel } from "react-icons/fc";

const ProfilePicUpload = ({ setShowUpload, setNotify, setError }) => {
  const [file, setFile] = useState();
  const {
    auth: { user },
  } = useAuth();
  const inputRef = useRef(null);
  const fetchImg = useFetchImg();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const img = new FormData();
      if (file) {
        img.append("image", file);
      } else return;
      // for posting images via fetch(), remove "Content-Type": "multipart/form-data" header!
      const { data } = await axios.post(`users/img/${user._id}`, img);
      await fetchImg();
      setNotify({ text: data.message });
      setShowUpload((prev) => !prev);
      setFile(null);
    } catch (error) {
      if (error.response) setError({ text: error.response.data.message });
      else {
        setError({ text: error.message });
      }
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
            <FcCancel
              size={25}
              onClick={clearFileInput}
              style={{ cursor: "pointer" }}
            />
          </>
        )}
      </Form.Group>
    </>
  );
};

export default ProfilePicUpload;
