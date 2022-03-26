import { Form, Input } from "antd";
import IdSelect from "components/id-select";
import { Project } from "./list";
export interface User {
  id: number;
  name: string;
  personId: string;
  organization: string;
  created: string;
  token: string;
}
interface SearchPanelProps {
  //这里的对应的param应该对应project对应的值，所以用pick跟随是最好的=>挑选
  users: User[] | null;
  param: Pick<Project, "name" | "personId">;
  // setParam: (param: SearchPanelProps['param']) => void;
  setParam: (param: any) => void;
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form layout="inline">
      <Input
        style={{ width: "80%" }}
        type="text"
        value={param.name}
        onChange={(e) => {
          setParam({
            ...param,
            name: e.target.value,
          });
        }}
      />
      {/* 服务器默认给我们的是number类型的id结果用户修改的是用的string类型的param，就会导致类型出现问题，使得select显示出现问题 ，所以我们可以完善一下这个部分*/}

      {/* <Select
        value={param.personId}
        onChange={(value) =>
          setParam({
            ...param,
            personId: value,
          })
        }
      >
        <Select.Option value={""}>负责人</Select.Option>
        {users?.map((user) => (
          <Select.Option key={user.name} value={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </Select> */}
      {/* 这里就可以随便你传数字或者字符串，如果穿的为空也会给你传为数字0 */}
      <IdSelect
        value={param.personId}
        defaultOptionName="全部"
        onChange={(value) =>
          setParam({
            ...param,
            personId: value,
          })
        }
        options={users || []}
      ></IdSelect>
    </Form>
  );
};
