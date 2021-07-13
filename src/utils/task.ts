import { Task } from "types/task";
import { useHttp } from "./http";
import { useQuery, QueryKey, useMutation } from "react-query";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./useOptimisticOptions";
import { useDebounce } from "utils";

/**获取任务列表Hook */
export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp();
    const debouncedParam = { ...param, name: useDebounce(param?.name, 200) };
    return useQuery<Task[], Error>(["tasks", param], () => client(`tasks`, { data: debouncedParam }));
};

/**
 * 添加Task
 * @param queryKey
 * @returns
 */
export const useAddTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Task>) =>
            client(`tasks`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey)
    );
};

/**获取task详情 */
export const useTask = (id: number) => {
    const client = useHttp();
    return useQuery(["task", { id }], () => client(`tasks/${id}`), {
        enabled: Boolean(id),
    });
};

/**编辑task */
export const useEditTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Task>) =>
            client(`tasks/${params.id}`, {
                data: params,
                method: "PATCH",
            }),
        useEditConfig(queryKey)
    );
};
/**删除task */
export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Task>) =>
            client(`tasks/${params.id}`, {
                data: params,
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
};
