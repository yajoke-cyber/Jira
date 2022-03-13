import { Form, Input, Select } from "antd";
export interface User {
  id: string,
  name: string,
  personId: string,
  organization: string,
  created: string,
  token:string
}
interface SearchPanelProps {
  users: User[]|null,
  param: {
    name: string,
    personId: string
  },
  // setParam: (param: SearchPanelProps['param']) => void;
  setParam: (param: any) => void;
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {

  return <Form layout="inline">
    
      <Input style={{'width':"80%"}} type="text" value={param.name} onChange={e => {setParam({
        ...param,
        name: e.target.value
      })
      }} />
      <Select value={param.personId} onChange={value => setParam({
        ...param,
        personId: value
      })}>
        <Select.Option value={''}>负责人</Select.Option>
        {
          users?.map(user => <Select.Option key={user.name} value={user.id}>{user.name}</Select.Option>)
        }
      </Select>
    
  </Form>
}