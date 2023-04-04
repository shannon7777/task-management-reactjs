import useAuth from "./useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios(`auth/logout`);
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
