import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();
  const userFound = JSON.parse(localStorage.getItem("user"));

  // when component loads this function will refresh the access token and
  // need to retrieve the user State and details that was saved in the localstorage during login and set it back in the auth state

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        await refresh();
        setAuth((auth) => {
          return { ...auth, user: userFound };
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    !auth?.accessToken ? refreshAccessToken() : setLoading(false);
  }, []);

  return <>{loading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
