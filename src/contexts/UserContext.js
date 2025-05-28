import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState()

  useEffect(() => {
    fetchUserInfo()
  }, [])

  async function fetchUserInfo() {
    try {
      const res = await fetch('', {
        method: 'GET',
        credentials: 'include'
      })
      if (res.ok) {
        const resData = await res.json()
        setUser(resData)
      } else {
        setUser(null)
      }
    } catch (err) {
      console.log('載入失敗: ' + err.message)
      setUser(null)
    }
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}