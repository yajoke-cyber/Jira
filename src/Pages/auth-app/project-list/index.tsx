import { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObj, useDebounce, useHttp } from "utils";
import { Typography } from "antd";
import { useAsync } from "utils/use-async";
import { Project } from "./list";
import { useUrlQueryParam } from "utils/url";

// 使用 JS 的同学，大部分的错误都是在runtime（运行时）的时候发现的
// 我们希望在静态代码中就能找到其中一些错误欧 ---》 强类型
export const ProjectListScreen = () => {
  const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  //然后这里也可以使用setKeys然后也可以动态修改params的值
  const [searchParams, setSearchParams] = useUrlQueryParam(keys);
  // setSearchParams({ name: "122" });
  //这里没有约束，导致name2也是可以使用的，约束太弱了所以需要增强,所以需要对传入的函数的参数做约定
  //这里因为arr默认为string数组，所以遍历K获取的全是string，所以这里需要给arr一个特性的类型指定他的每一个元素
  //但是注意这里也可以只改变一个属性因此这里最好限制以下是其参数的子集
  console.log(searchParams.personId);

  const [users, setUsers] = useState(null);
  const debounceParam = useDebounce(searchParams, 100);
  const client = useHttp();
  const { isLoading, isError, run, error, data } = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", { data: cleanObj(searchParams) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);
  // useMount(() => {
  //   client("users").then((res) => {
  //     setUsers(res);
  //   });
  // });
  useEffect(() => {
    client("users").then((res) => {
      setUsers(res);
    });
  }, [client]);
  //使用useEffect引用外部变量会有报错，因为无法取得其外部变量最新的值

  return (
    <>
      <h1>项目列表</h1>
      <SearchPanel
        users={users}
        param={searchParams}
        setParam={setSearchParams}
      ></SearchPanel>
      {isError ? (
        <Typography.Text>{error?.message}</Typography.Text>
      ) : (
        <List loading={isLoading} users={users} dataSource={data || []}></List>
      )}
    </>
  );
};
