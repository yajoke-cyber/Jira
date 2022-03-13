import { Table } from 'antd'
import { User } from './search-panel'

interface Project {
  id: string,
  name: string,
  personId: string,
  pin: boolean,
  organization: string
}
interface ListProps {
  list: Project[],
  users: User[]|null
}
export const List = ({ list, users }: ListProps) => {
  return <Table pagination={false} columns={[
    //localcompare可以用来比较中文字符
   { title:'名称', dataIndex:'name',sorter:(a,b)=>a.name.localeCompare(b.name)},
   {
     title:'负责人',
    render(value,project){
       return list.map((project,index) =>
          <span key={index}>{users?.find(user => user.id === project.personId)?.name || '未知'}</span>
      )
     }
   },
   { title:'部门', dataIndex:'organization'}

  ]} dataSource={list}>
  </Table>
}