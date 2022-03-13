import { useEffect, useState } from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import {  cleanObj,useMount, useDebounce, useHttp } from 'utils'
import { useAuth } from 'context/auth-context'
import {  Dropdown, Menu } from 'antd'
import styled from 'styled-components'
import { Row } from 'components/lib'
// 使用 JS 的同学，大部分的错误都是在runtime（运行时）的时候发现的
// 我们希望在静态代码中就能找到其中一些错误欧 ---》 强类型
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const {logout,user}=useAuth()
  const [users,setUsers]= useState(null);
  const [list, setList] = useState([])
  const debounceParam = useDebounce(param, 100)
  const client = useHttp();

  useEffect(() => {
    client('projects',{data:cleanObj(param)}).then(res=>{
      setList(res)
    }) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam])

  useMount(() => {
    client('users').then(res=>{
      setUsers(res)
    }) 
  })

  return <Container>
    <Header between={true}>
      <HeaderLeft gap={true}>
        <h2>logo</h2>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={
          <Menu>
            <Menu.Item key={'logout'}>
             <a href='/#' onClick={logout}>登出</a>
          </Menu.Item>
          </Menu>
        }> 
         <a href='/#' style={{'fontSize':'18px'}}>Hi,{user?.name}</a>
          </Dropdown> 
      </HeaderRight>
      </Header>
    <Nav></Nav>
    <Main>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={list}></List></Main>
    <Aside></Aside>
    <Footer></Footer>
  </Container>
  
}
const Container = styled.div`
height: 100vh;
display: grid;
grid-template-columns: 6rem 1fr 6rem;
grid-template-rows:6rem 1fr 6rem ;
  grid-template-areas:
  "header header header"
  "nav main aside"
  "footer footer footer";
  grid-gap: 10rem;

  `;
  const HeaderLeft=styled(Row)`
    
  `
  const HeaderRight=styled.div``
  const Header = styled(Row)`
    padding :3.2rem;
    grid-area:header;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    z-index: 1;
  `;
  const Nav = styled.nav`grid-area:nav`;
  const Main = styled.main`grid-area:main`;
  const Aside = styled.aside`grid-area:aside`;
  const Footer = styled.footer`grid-area:footer`;