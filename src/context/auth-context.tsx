
import React,{ Dispatch, ReactNode, useState} from 'react';
import * as Auth from 'provider/auth-provider';
import { User } from 'Pages/auth-app/project-list/search-panel';
import { http } from 'utils';
const AuthContext=React.createContext<undefined|{
    user:User|null,
    login:(form:UserForm)=>Promise<void>,
    register:(form:UserForm)=>Promise<void>,
    logout:()=>Promise<void>,
    setUser:Dispatch<User|null>
}>(undefined);
AuthContext.displayName='AuthContext'
interface UserForm{username:string,password:string}

export const AuthProvider =({children}:{children:ReactNode})=>{
    const [user,setUser] =useState<User|null>(null);
    const login =(data:UserForm)=>Auth.login(data).then(setUser);
    const register =(data:UserForm)=>Auth.register(data).then(setUser);
    const logout =()=>Auth.logout().then(()=>{setUser(null)});
    return <AuthContext.Provider children={children} value={{user,login,register,logout,setUser}}/>
}
export const useAuth=()=>{
    const context =React.useContext(AuthContext);
    if(!context){
        throw new Error('useAuth必须在AuthContext环境下使用!');
    }
    return context;
}
export const initUser = async()=>{
    let user=null;
    const token=  Auth.getToken();
    console.log(token);
    
    if(token){
        const data = await http('me',{token});
        user = data.user; 
    }
    return user;
}