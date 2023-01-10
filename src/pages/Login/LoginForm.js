import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Register from "../Register";

const LoginForm = ({ onChange, onSubmit }) => {
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

export default LoginForm;
