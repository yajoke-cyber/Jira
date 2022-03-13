import { Form,Input,Button } from 'antd';
import { useAuth } from 'context/auth-context'
import  {  memo } from 'react'

const LoginScreen = memo(() => {
  const {login}=useAuth();
    const handleLogin=(values:{username:string,password:string})=>{
       login(values);
    }
  return (
    <div>
  
    <Form onFinish={handleLogin}>
            <Form.Item label="Username" name={'username'} rules={[{required:true,message:'用户名不能为空'}]}>
                
            <Input placeholder='用户名' type={'text'} id="username" ></Input>
            </Form.Item>
            <Form.Item label="Password" name={'password'} rules={[{required:true,message:'密码不能为空'}]}> 
            <Input placeholder='密码' type={'password'} id="password"></Input>
            </Form.Item>
            <Form.Item style={{'textAlign':'center'}}>
              <Button type={'primary'} htmlType="submit">登录</Button>
            </Form.Item>
            </Form>

        
    </div>
  )
})

export default LoginScreen