import { createContext, useState } from "react";
// setting a global auth state so that the user data is available throughout the app

// here we create a context bv using React.createContext()
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  // const [persistLogin, setPersistLogin] = useState(JSON.parse(localStorage.getItem("persistLogin")))

  return (
    // passing the 2 states in value prop so that it will be available in the global scope
    // Wrap AuthContext.Provider around the app in index.js so that all the children will be able to access to this context
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
