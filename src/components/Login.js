import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Register from "./Register";

const Login = ({ setNotify, setError }) => {
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setNotify({ show: false });
    setError({ show: false });
    const { email, password } = formData;
    if (!email || !password) {
      setError({ text: `Please type in your email or password!` });
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (res.status === 400) {
        throw Error(`password does not match!`);
      } else if (res.status === 401) {
        throw Error(`${email} does not exist!`);
      }

      const { user, accessToken } = await res.json();
      setAuth({ user, accessToken });
      localStorage.setItem("user", JSON.stringify(user));
      navigate(from, { replace: true });
      setFormData({ email: "", password: "" });
      setNotify({
        text: `You have successfully logged in! Welcome ${user.firstName}`,
      });
    } catch (error) {
      setError({ text: error.message });
    }
  };

  return (
    <>
      <Form className="border border-secondary shadow p-4 m-5 rounded">
        <h2 className="pb-2">Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="shadow"
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={onChange}
          />
          <Form.Text muted>Type in your email to log in.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="shadow"
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
          />
        </Form.Group>

        <Button variant="outline-success" type="submit" onClick={onSubmit}>
          Login
        </Button>
        <p>
          <br />
          Need an Account? Sign up here <br />
          <span>
            <Link to="/register" element={<Register />}>
              Sign Up
            </Link>
          </span>
        </p>
      </Form>
    </>
  );
};

export default Login;
