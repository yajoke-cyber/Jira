import { Project } from "Pages/auth-app/project-list/list";
import { QueryKey, useQueryClient } from "react-query";
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old: any[], context?: any) => {}
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      //这里会有隐式形参问题
      queryClient.setQueryData(queryKey, (old: any) => {
        return callback(target, old || []);
      });
      return { previousItems };
    },
    onError(error: any, newItem: Partial<Project>, context: any) {
      //当报错得时候就会通过缓存并回滚数据
      queryClient.setQueryData(queryKey, context.previousItems);
    },
    //在这里回去匹配projects进而去重新刷新数据
  };
};
export const useDeleteConfig = (querykKey: QueryKey) =>
  useConfig(querykKey, (target: any, old: any[]) =>
    old.filter((item) => item.id !== target.id)
  );
export const useEditConfig = (querykKey: QueryKey) =>
  useConfig(
    querykKey,
    (target: any, old: any[]) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );
export const useAddConfig = (querykKey: QueryKey) =>
  useConfig(querykKey, (target: any, old: any[]) => [...old, target]);
