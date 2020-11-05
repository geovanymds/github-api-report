import React, {createContext} from 'react'

export const GlobalContext = createContext();

export const GlobalStorage = ({children,...globals}) => {
  return (
    <GlobalContext.Provider value={{...globals}}>
      {children}
    </GlobalContext.Provider>
  )
}


