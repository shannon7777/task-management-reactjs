import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import useAuth from "../../hooks/useAuth";

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

  return <LoginForm onSubmit={onSubmit} onChange={onChange} />;
};

export default Login;
