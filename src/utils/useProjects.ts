import { Project } from "screens/projectList/list";
import { clearObject } from "utils";
import { useHttp } from "./http";
import { useQuery, useMutation, useQueryClient } from "react-query";
/**获取项目列表的hook */
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    return useQuery<Project[], Error>(["projects", param], () => client(`projects`, { data: clearObject(param || {}) }));
};

/**编辑project数据，不定义参数是为了让Hook再最外层使用,返回mutate让该函数可以在最内层调用 */
export const useEditProject = () => {
    const client = useHttp();
    const queryClient = useQueryClient();
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects/${params.id}`, {
                data: params,
                method: "PATCH",
            }),
        {
            onSuccess: () => queryClient.invalidateQueries("projects"),
        }
    );
};
/**添加project数据，不定义参数是为了让Hook再最外层使用,返回mutate让该函数可以在最内层调用 */
export const useAddProject = () => {
    const client = useHttp();
    const queryClient = useQueryClient();
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects`, {
                data: params,
                method: "POST",
            }),
        {
            onSuccess: () => queryClient.invalidateQueries("projects"),
        }
    );
};

/**
 * 获取项目的详情
 * @param id 项目的id
 */
export const useProject = (id?: number) => {
    const client = useHttp();
    const a = useQuery<Project>(["project", { id }], () => client(`projects/${id}`), {
        enabled: Boolean(id),
    });
    return a;
};
