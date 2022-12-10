import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const result = await fetch(`http://localhost:5000/api/auth/refresh`, {
      credentials: "include",
    });
    const data = await result.json();
    setAuth((auth) => {
      return { ...auth, accessToken: data.accessToken };
    });
  };
  return refresh;
};

export default useRefreshToken;
