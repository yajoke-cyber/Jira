import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'Pages/auth-app/project-list';
import  { FormEvent, memo } from 'react'
const RegisterScreen = memo(({changeScreen}:{changeScreen:Function}) => {
  const {login,user}=useAuth();
    const handleLogin=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
        const password =(e.currentTarget.elements[1] as HTMLInputElement).value;
       login({username,password})
       
    }
  return (
    <div>{
    user?<ProjectListScreen/>:
    <form onSubmit={handleLogin}>
            <div>
                <label htmlFor='username'>用户名</label>
                <input type={'text'} id="username"></input>
            </div>
            <div> <label htmlFor='password'>密码</label>
            <input type={'password'} id="password"></input>
            </div>
            <button type='submit'>注册</button>
            <button onClick={()=>{changeScreen()}}>切换</button>
        </form>}
        
    </div>
  )
})

export default RegisterScreen