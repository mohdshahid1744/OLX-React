import {createContext,useState} from 'react'

export const PostContext=createContext(null)
export default function Post({children}){
    const [postDetails,setPostdetails]=useState()
    return(
        <PostContext.Provider value={{postDetails,setPostdetails}}>
            {children}
        </PostContext.Provider>
    )
}