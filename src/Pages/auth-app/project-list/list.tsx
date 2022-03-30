import { Button, Table, TableProps } from "antd";
import Pin from "components/pin";
import { Link } from "react-router-dom";
import { useHttp } from "utils";
import { User } from "./search-panel";
import {
  useDeleteProject,
  useProjectModal,
  useProjectStar,
} from "utils/project";
import dayjs from "dayjs";
import { useUrlQueryParam } from "utils/url";

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
  const [searchParams] = useUrlQueryParam(["name", "personId"]);
  const queryKey = ["projects", searchParams];
  const { startEdit } = useProjectModal();
  const { mutateAsync: handleStar } = useProjectStar(queryKey);
  const { mutateAsync: deleteProject } = useDeleteProject(queryKey);

  //redux版本
  //const dispatch = useDispatch();
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
                onCheckedChange={() => {
                  console.log(value);

                  handleStar(value);
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
            return <span>{dayjs(value.created).format("YYYY-MM-DD")} </span>;
          },
        },
        {
          title: "编辑",
          render(value) {
            return (
              <>
                {" "}
                <Button
                  onClick={() => {
                    startEdit(value.id);
                  }}
                >
                  编辑
                </Button>
                <Button
                  onClick={() => {
                    deleteProject(value);
                  }}
                  danger
                  style={{ marginLeft: "2rem" }}
                >
                  删除
                </Button>
              </>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
};
