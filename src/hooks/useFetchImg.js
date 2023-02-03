import useAuth from "./useAuth";

const useFetchImg = () => {
  const {
    setAuth,
    auth: { user, accessToken },
  } = useAuth();
  const bearerToken = `Bearer ${accessToken}`;

  const fetchImg = async () => {
    try {
      const result = await fetch(
        `http://localhost:5000/api/users/img/${user._id}`,
        {
          headers: {
            Authorization: bearerToken,
          },
          credentials: "include",
        }
      );
      const { imageUrl, message } = await result.json();
      if (!imageUrl) return;
      if (result.status === 401) {
        throw new Error(message);
      }
      // setAuth((prev) => {
      //   return {
      //     ...prev,
      //     user: { ...prev.user, imgUrl: imageUrl },
      //   };
      // });
      localStorage.setItem("userImg", JSON.stringify(imageUrl));
    } catch (error) {
      console.log(error.message);
    }
  };
  return fetchImg;
};

export default useFetchImg;
