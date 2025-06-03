import { createContext } from "react";

export const ReviewContext = createContext(null)

export function ReviewProvider({ children, value }) {

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  )
}