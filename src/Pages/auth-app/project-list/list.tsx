import { Table, TableProps } from "antd";
import Pin from "components/pin";
import { Link } from "react-router-dom";
import { useHttp } from "utils";
import { User } from "./search-panel";

export interface Project {
  id: number;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  users: User[] | null;
}
export const List = ({ users, ...props }: ListProps) => {
  const client = useHttp();
  return (
    <Table
      loading
      pagination={false}
      columns={[
        //localcompare可以用来比较中文字符
        {
          key: "6",
          title: <Pin checked={true} />,
          render(value) {
            return (
              <Pin
                checked={value.pin}
                // 这个垃圾serviceworker出问题了，每次就返回一个请求，气死
                onCheckedChange={(data) => {
                  client(`projects/${value.id}`, {
                    method: "PATCH",
                    data: !value.pin,
                  }).then((res) => {
                    console.log(res);
                  });
                }}
              />
            );
          },
        },
        {
          key: "1",
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value) {
            return <Link to={`/projects/${value.id}`}>{value?.name}</Link>;
          },
        },
        {
          key: "2",
          title: "负责人",
          render(value) {
            return (
              <span>
                {users?.find((user) => user.id === value?.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        { key: "3", title: "部门", dataIndex: "organization" },
        {
          title: "创建时间",
          render(value) {
            return <span>{value.created} </span>;
          },
        },
      ]}
      {...props}
    ></Table>
  );
};
