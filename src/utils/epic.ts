import { Epic } from "types/epic";
import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from "react-query";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./useOptimisticOptions";

/**获取看板列表Hook */
export const useEpics = (param?: Partial<Epic>) => {
    const client = useHttp();
    return useQuery<Epic[], Error>(["epics", param], () => client(`epics`, { data: param }));
};

/**
 * 用户添加任務組
 * @param queryKey
 * @returns
 */
export const useAddEpic = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Epic>) =>
            client(`epics`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey)
    );
};

/**删除任務組 */
export const useDeleteEpic = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Epic>) =>
            client(`epics/${params.id}`, {
                data: params,
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
};
