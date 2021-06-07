import { createContext, useEffect, useState } from 'react'

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: -1,
    username: '',
    newU:false
  })
  const obj = JSON.parse(localStorage.getItem('loggedIn'));
  useEffect(() => {
    if (obj != null)
      setUser({
        id: obj.id,
        username: obj.username,
        newU:obj.newU
      })
  }, [])

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  )
}

export default UserProvider;