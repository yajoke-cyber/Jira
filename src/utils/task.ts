import { useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "utils";

export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["Tasks", params], () =>
    client("tasks", { data: params })
  );
  //通过useQuery去创建一个缓存区，然后后续使用useMutation来指定对象对缓存区数据进行修改
};
