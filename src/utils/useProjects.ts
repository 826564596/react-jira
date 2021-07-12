import { clearObject } from "utils";
import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from "react-query";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./useOptimisticOptions";
import { Project } from "types/project";
/**获取项目列表的hook */
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();

    return useQuery<Project[], Error>(["projects", param], () => client(`projects`, { data: clearObject(param || {}) }));
};

export const useText = (param?: Partial<Project>) => {
    const client = useHttp();
    return useQuery<Project[], Error>(["test", 5], () => client(`projects/1`));
};

/**编辑project数据，不定义参数是为了让Hook再最外层使用,返回mutate让该函数可以在最内层调用 */
export const useEditProject = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects/${params.id}`, {
                data: params,
                method: "PATCH",
            }),
        useEditConfig(queryKey)
    );
};
/**添加project数据，不定义参数是为了让Hook再最外层使用,返回mutate让该函数可以在最内层调用 */
export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey)
    );
};
/**删除project */
export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        ({ id }: { id: number }) =>
            client(`projects/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
};
/**
 * 获取项目的详情
 * @param id 项目的id
 */
export const useProject = (id?: number) => {
    const client = useHttp();
    return useQuery<Project>(["project", { id }], () => client(`projects/${id}`), {
        enabled: Boolean(id),
    });
};
