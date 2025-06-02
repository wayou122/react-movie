import { useState, useEffect, createContext } from "react";
import { accountAPI } from '../api/api'

export const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUserInfo()
    //setUser({ username: 'happy', email: 'abc@gg.com' })
  }, [])

  async function fetchUserInfo() {
    try {
      const res = await fetch(accountAPI, {
        method: 'GET',
        credentials: 'include'
      })
      if (res.ok) {
        const resData = await res.json()
        setUser(resData.data)
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error('載入失敗: ' + err.message)
      setUser(null)
    }
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}