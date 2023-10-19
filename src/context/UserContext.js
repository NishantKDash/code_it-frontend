import React, {createContext, useContext, useState} from "react";

const UserContext = createContext()

export const useUser = () =>{
    return useContext(UserContext)
};

export const  UserProvider = (props) => {
    const [name , setName] = useState('User');
    const [role , setRole] = useState('PUBLIC');

    return(
        <UserContext.Provider value = {{role,setRole , name ,setName}}>
          {props.children}
        </UserContext.Provider> 
    )
}