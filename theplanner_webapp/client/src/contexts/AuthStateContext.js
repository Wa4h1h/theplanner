import { useState,createContext } from "react";

export const AuthStateContext = createContext()

const AuthState = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userId') > 0)

  return (<AuthStateContext.Provider value={{loggedIn,setLoggedIn}}>
    {children}
  </AuthStateContext.Provider>)
}

export default AuthState;