import  { memo, useState } from 'react';
import LoginScreen from 'Pages/unauth-app/login';
import RegisterScreen from 'Pages/unauth-app/register';
import styled from 'styled-components';
import {  Card, Divider } from 'antd';
 const UnauthApp = memo(() => {
   const [isLogin,setIsLogin] =useState(true);
  return (
    <Container>
      <ShadowCard> 
        <Title>{isLogin?'请登录':'请注册'} </Title>
        {isLogin?<LoginScreen/>:<RegisterScreen/>} 
      <Divider/>
      <a href='/#' onClick={()=>{ setIsLogin(!isLogin)}} >{isLogin?'没有账号？注册新账号':"已经有帐号了？直接登录"}</a>
      </ShadowCard>
     
    </Container>
  )
})
export default UnauthApp;
const Container = styled.div`
 display:flex;
 justify-content:center;
 align-items: center;
`;
const Title = styled.h2`
 color: grey;
`;
const ShadowCard = styled(Card)`
display: flex;
align-items: center;
justify-content: center;
 height: 46rem;
 width: 34rem;
 border-radius:0.3rem ;
 box-sizing: border-box;
 box-shadow: rgba(0,0,0,0.1) 0 0 10px;
text-align: center;
 margin-top: 10rem;
`;
// const Container = styled.div`
//  display:flex;
//  justify-content:center;
// `;