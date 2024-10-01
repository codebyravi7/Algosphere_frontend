import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("jwt")) || null
  );
  // console.log("authuser::",authUser)
  const token = authUser?.token;

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser,token }}>
      {children}
    </AuthContext.Provider>
  );
};
