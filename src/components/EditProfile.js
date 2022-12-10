import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import PasswordRetypeModal from "./PasswordRetypeModal";

const EditProfile = ({ setError, setNotify, setInfo }) => {
  const {
    auth: { user, accessToken },
    setAuth,
  } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    retypePassword: "",
  });

  const [editPassword, setEditPassword] = useState(false);
  const [retypePwdModal, setRetypePwdModal] = useState(false);

  const { firstName, lastName, username, password, retypePassword } = formData;

  const bearerToken = `Bearer ${accessToken}`;

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

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({ show: false });
    setNotify({ show: false });

    if (!firstName && !lastName && !username && !password && !retypePassword) return setError({ text: "No fields were filled in"});

    if (password !== retypePassword)
      return setError({ text: "Passwords do not match!" });

    const result = await fetch(`http://localhost:5000/api/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    if (result.status === 200) {
      setNotify({
        text: password
          ? `Your password has been updated`
          : `Profile details successfully updated`,
      });
    }
    const { editedUser } = await result.json();
    setAuth((auth) => {
      return { ...auth, user: editedUser };
    });
    localStorage.setItem("user", JSON.stringify(editedUser));
    navigate("/profile");
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
          onChange={onChange}
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
        editPassword={editPassword}
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
          <Button variant="primary" onClick={onSubmit}>
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
