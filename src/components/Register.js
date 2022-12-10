import { Form, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setError, setNotify, setInfo }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordRetype: "",
  });

  const navigate = useNavigate();

  const { email, firstName, lastName, username, password, passwordRetype } =
    formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !email ||
        !firstName ||
        !lastName ||
        !username ||
        !password ||
        !passwordRetype
      ) {
        setInfo({ text: "Please fill in all the fields" });
        return;
      }

      if (password !== passwordRetype) {
        setError({
          text: "Please make sure both password fields match!",
        });
        return;
      }

      const res = await fetch(`http://localhost:5000/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const { message } = await res.json();
      if (res.status === 409) {
        throw Error(message);
      }
      setNotify({ show: true, text: message });
      navigate("/login");
    } catch (error) {
      setError({ text: error.message });
    }
  };

  return (
    <>
      <Form className="border border-secondary shadow rounded m-5 p-4">
        <h2 className="pb-2">Registration</h2>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                className="shadow"
                type="text"
                name="firstName"
                placeholder="first name"
                onChange={onChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                className="shadow"
                type="text"
                name="lastName"
                placeholder="last name"
                onChange={onChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="shadow"
            type="email"
            placeholder="Enter email"
            onChange={onChange}
            name="email"
          />
          <Form.Text className="text-muted">
            Your email is kept private.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className="shadow"
            type="text"
            name="username"
            placeholder="username"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="shadow"
            type="password"
            placeholder="Password"
            onChange={onChange}
            name="password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRetypePassword">
          <Form.Label>Re-type your password</Form.Label>
          <Form.Control
            className="shadow"
            type="password"
            placeholder="Password"
            onChange={onChange}
            name="passwordRetype"
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button variant="outline-primary" type="submit" onClick={onSubmit}>
            Register
          </Button>
          <Button variant="outline-danger" onClick={() => navigate("/login")}>
            Cancel
          </Button>
        </div>
        <br />
        <Form.Label className="m-2">
          Already have an account? Log in here
        </Form.Label>

        <Link to="/login">Sign in</Link>
      </Form>
    </>
  );
};

export default Register;
