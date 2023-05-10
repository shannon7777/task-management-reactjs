import useAuth from "./useAuth";
import axios from "axios";

const useFetchImg = () => {
  const {
    auth: { user },
  } = useAuth();

  const fetchImg = async () => {
    try {
      // if userImg exists, return 
      if (localStorage.getItem("userImg")) return;
      const {
        data: { imageUrl },
      } = await axios(`users/img/${user._id}`);
      localStorage.setItem("userImg", JSON.stringify(imageUrl));
    } catch (error) {
      if (error.response) console.log(error.response.data);
      else {
        console.log(error.message);
      }
    }
  };
  return fetchImg;
};

export default useFetchImg;
