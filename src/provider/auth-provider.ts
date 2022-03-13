import {User} from "Pages/auth-app/project-list/search-panel"

const localStorageKey ='__auth_provider_token__'

export const getToken=()=>window.localStorage.getItem(localStorageKey)
export const handleUserResponse =({user}:{user:User})=>{
    window.localStorage.setItem(localStorageKey,user.token||'')
    return user;
}
const API = process.env.REACT_APP_API_URL
export const login=(data:{username:string,password:string})=>{
   return fetch(`${API}/login`,{method:'POST',
   headers:{'Content-Type':"application/json"},
   body:JSON.stringify(data)}).then(async res=>{
    const data= await res.json()
        if(res.ok){
          return handleUserResponse(data)
        }else{
          return Promise.reject(data)
        }
      })
}
export const register=(data:{username:string,password:string})=>{
  return fetch(`${API}/register`,{method:'POST',
  headers:{'Content-Type':"application/json"},
  body:JSON.stringify(data)}).then(async res=>{
   const data= await res.json()
       if(res.ok){
         return handleUserResponse(await res.json())
       }else{
         return Promise.reject(data)
       }
     })
}
export const logout =async ()=>window.localStorage.removeItem(localStorageKey)