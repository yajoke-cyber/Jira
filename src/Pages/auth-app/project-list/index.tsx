import { useEffect, useState } from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import {  cleanObj,useMount, useDebounce, useHttp } from 'utils'
import { useAuth } from 'context/auth-context'
// 使用 JS 的同学，大部分的错误都是在runtime（运行时）的时候发现的
// 我们希望在静态代码中就能找到其中一些错误欧 ---》 强类型
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const {logout}=useAuth()
  const [users,setUsers]= useState(null);
  const [list, setList] = useState([])
  const debounceParam = useDebounce(param, 1000)
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

  return <div style={{"display":"flex","alignItems":"center","flexDirection":"column"}}>
    <button onClick={()=>{logout()}}>登出</button>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={list}></List>
  </div>
}