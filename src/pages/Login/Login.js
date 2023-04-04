import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

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
      const {
        data: { user, accessToken, message },
      } = await axios.post("auth", formData);
      setAuth({ user, accessToken });
      localStorage.setItem("user", JSON.stringify(user));
      navigate(from, { replace: true });
      setFormData({ email: "", password: "" });
      setNotify({ text: message });
    } catch (error) {
      if (error.response) setError({ text: error.response.data.message });
      else {
        setError({ text: error.message });
      }
    }
  };

  return <LoginForm onSubmit={onSubmit} onChange={onChange} />;
};

export default Login;
