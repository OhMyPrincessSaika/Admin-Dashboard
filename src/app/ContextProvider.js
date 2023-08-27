import React from 'react'

const StateContext = React.createContext();
export const ContextProvider = ({children}) => {
  const [profileImg,setProfileImg] = React.useState('');
  const [coverImg,setCoverImg] = React.useState('');
  const [admin,setAdmin] = React.useState({});
  const [token,setToken] = React.useState('');
  const [notification,setNotification] = React.useState();
  return (
    <StateContext.Provider value={{admin,setAdmin,profileImg,setProfileImg,coverImg,setCoverImg,token,setToken,notification,setNotification}}>
        {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => React.useContext(StateContext);