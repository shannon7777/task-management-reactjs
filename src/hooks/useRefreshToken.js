import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const result = await fetch(`http://localhost:5000/api/auth/refresh`, {
      credentials: "include",
    });
    const { accessToken } = await result.json();
    setAuth((auth) => {
      return { ...auth, accessToken: accessToken };
    });
  };
  return refresh;
};

export default useRefreshToken;
