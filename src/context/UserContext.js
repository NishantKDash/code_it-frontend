import jwtDecode from "jwt-decode";
import React, {createContext, useContext, useState} from "react";

const UserContext = createContext()

export const useUser = () =>{
    return useContext(UserContext)
};

export const  UserProvider = (props) => {
    const [name , setName] = useState('User');
    const [role , setRole] = useState('PUBLIC');

    // if(localStorage.getItem("token") != null)
    // {
    //     const token = localStorage.getItem("token")
    //     const token_dec = jwtDecode(token)
    //     const currentTimestamp = Math.floor(Date.now() / 1000);
    //     if(token_dec.exp > currentTimestamp)
    //     {
    //         setName(token.username)
    //         setRole(token.authorities)
    //     }
    // }

    return(
        <UserContext.Provider value = {{role,setRole , name ,setName}}>
          {props.children}
        </UserContext.Provider> 
    )
}