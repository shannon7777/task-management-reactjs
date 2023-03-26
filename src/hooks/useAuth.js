import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

// creating a custom react Hook to be able to use the useContext hook of the AuthContext that was created
const useAuth = () => {
  return useContext(AuthContext);
}

export default useAuth;
