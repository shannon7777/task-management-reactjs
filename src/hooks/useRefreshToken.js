import useAuth from "./useAuth";
import axios from "axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const {
      data: { accessToken },
    } = await axios(`http://localhost:5000/api/auth/refresh`);
    setAuth((auth) => {
      return { ...auth, accessToken: accessToken };
    });
  };
  return refresh;
};

export default useRefreshToken;
