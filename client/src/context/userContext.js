import React,{useState} from 'react'

export const UserContext = React.createContext();

export default function UserProvider(Props) {
    const [userData, setUserData] = useState({
        name:undefined,
        email:undefined,
        token:undefined
    })
    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {Props.children}
        </UserContext.Provider>
    )
}
