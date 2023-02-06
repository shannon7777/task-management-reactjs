import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RegisterForm from "./RegisterForm";

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
      if (res.status === 408) {
        throw setError({ text: message });
      }
      setNotify({ show: true, text: message });
      navigate("/login");
    } catch (error) {
      setError({ text: error.message });
    }
  };

  return (
    <RegisterForm onChange={onChange} onSubmit={onSubmit} navigate={navigate} />
  );
};

export default Register;
