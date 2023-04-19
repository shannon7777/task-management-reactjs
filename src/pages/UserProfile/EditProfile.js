import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PasswordRetypeModal from "./PasswordRetypeModal";

const EditProfile = ({ setError, setNotify, setInfo }) => {
  const {
    auth: { user },
    setAuth,
  } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [retypePassword, setRetypePassword] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const [retypePwdModal, setRetypePwdModal] = useState(false);

  const { firstName, lastName, username, password } = formData;

  const onChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const editUser = async (e) => {
    e.preventDefault();
    if (!firstName && !lastName && !username && !password && !retypePassword)
      return setInfo({ text: "No fields were filled in" });
    if (password !== retypePassword)
      return setInfo({ text: "Passwords do not match!" });

    const editedObj = Object.fromEntries(
      Object.entries(formData).filter((value) => value[1] !== "")
    );
    try {
      const { data } = await axios.put(`users/${user._id}`, editedObj);
      setNotify({ text: data.message });
      navigate("/profile");
      if (password) return;
      setAuth((auth) => {
        return { ...auth, user: data.editedUser };
      });
      localStorage.setItem("user", JSON.stringify(data.editedUser));
    } catch (error) {
      if (error.response) setError({ text: error.response.data.message });
      else {
        setError({ text: error.message });
      }
    }
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      retypePassword: "",
    });
  };

  const editPasswordForm = editPassword && (
    <>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Please type in your new password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="New password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formRetypePassword">
        <Form.Label>Retype your new password</Form.Label>
        <Form.Control
          type="password"
          name="retypePassword"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
          placeholder="retype password"
        />
      </Form.Group>
    </>
  );

  const toggleResetPasswordButton = !editPassword && (
    <>
      <Button
        variant="outline-warning"
        onClick={() => setRetypePwdModal(!retypePwdModal)}
      >
        Reset Password
      </Button>
    </>
  );

  const editProfileForm = (
    <>
      <h3> Edit User Info</h3>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={firstName}
          placeholder="Enter first name"
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={lastName}
          placeholder="last Name"
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Username"
          name="username"
          value={username}
          onChange={onChange}
        />
      </Form.Group>
      <PasswordRetypeModal
        setEditPassword={setEditPassword}
        setError={setError}
        setNotify={setNotify}
        setInfo={setInfo}
        retypePwdModal={retypePwdModal}
        setRetypePwdModal={setRetypePwdModal}
      />
    </>
  );

  return (
    <>
      <Form className="border border-secondary rounded shadow p-4 m-4">
        {editPassword ? editPasswordForm : editProfileForm}
        <div className="d-flex justify-content-between">
          <Button variant="primary" onClick={editUser}>
            Submit
          </Button>
          <Button variant="outline-danger" onClick={goBack}>
            Back
          </Button>
          {toggleResetPasswordButton}
          <Button variant="outline-dark" onClick={clearForm}>
            Clear Fields
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditProfile;
