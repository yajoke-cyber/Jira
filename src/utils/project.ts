import { Project } from "Pages/auth-app/project-list/list";
import { useCallback } from "react";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useHttp } from "utils";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./optimistic";
import { useUrlQueryParam } from "./url";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
  //通过useQuery去创建一个缓存区，然后后续使用useMuation来指定对象对缓存区数据进行修改
};
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, { method: "PATCH", data: params }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
        //在这里回去匹配projects进而去重新刷新数据
      },
    }
  );
};
export const useProjectStar = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: { ...params, pin: !params.pin },
      }),
    useEditConfig(queryKey)
  );
};
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, { method: "POST", data: params }),
    useAddConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  //这里是对单个project的具体读取
  const client = useHttp();
  return useQuery<Project[]>(
    ["projects", { id }],
    () => {
      return client("projects", { data: { id } });
    },
    { enabled: !!id }
    //当id存在时才能触发，不然不触发
  );
  //通过useQuery去创建一个缓存区，然后后续使用useMuation来指定对象对缓存区数据进行修改
  //当id为undefined的时候，就不需要重新再请求，做一个类型判断
};

export const useProjectModal = (param?: Partial<Project>) => {
  const [{ projectCreate, edingProjectId }, setProjectCreate] =
    useUrlQueryParam(["projectCreate", "edingProjectId"]);
  const { data: handlingProject, isLoading } = useProject(
    Number(edingProjectId)
  );
  const open = useCallback(() => {
    setProjectCreate({ projectCreate: true, edingProjectId: undefined });
  }, [setProjectCreate]);
  const close = useCallback(() => {
    setProjectCreate({ projectCreate: undefined, edingProjectId: undefined });
  }, [setProjectCreate]);
  const startEdit = useCallback(
    (id: number) =>
      setProjectCreate({ projectCreate: undefined, edingProjectId: id }),
    [setProjectCreate]
  );
  //其为undefined就不会在url上面显示
  return {
    projectModalOpen: projectCreate === "true" || !!edingProjectId, //使用url取出来的都是boolen值
    open,
    close,
    startEdit,
    isLoading,
    edingProjectId,
    handlingProject: handlingProject,
  };
};
//在这里如果修改成功改了就要对数据进行刷新
