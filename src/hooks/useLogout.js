import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await fetch(`http://localhost:5000/api/auth/logout`, {
        credentials: "include",
      });
      setAuth({});
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return logout;
};

export default useLogout;
