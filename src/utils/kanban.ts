import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "utils";

export const useKanbans = (params?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(["kanbans", params], () =>
    client("kanbans", { data: params })
  );
  //通过useQuery去创建一个缓存区，然后后续使用useMutation来指定对象对缓存区数据进行修改
};
