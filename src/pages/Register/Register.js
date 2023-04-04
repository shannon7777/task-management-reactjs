import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

      const {
        data: { message },
      } = await axios.post(`http://localhost:5000/api/users/`, formData);

      setNotify({ text: message });
      navigate("/login");
    } catch (error) {
      if (error.response) setError({ text: error.response.data.message });
      else {
        setError({ text: error.message });
      }
    }
  };

  return (
    <RegisterForm onChange={onChange} onSubmit={onSubmit} navigate={navigate} />
  );
};

export default Register;
