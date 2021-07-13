import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from "react-query";
import { useAddConfig, useDeleteConfig } from "./useOptimisticOptions";

/**获取看板列表Hook */
export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHttp();
    return useQuery<Kanban[], Error>(["kanbans", param], () => client(`kanbans`, { data: param }));
};

/**
 * 用户添加看板
 * @param queryKey
 * @returns
 */
export const useAddKanban = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Kanban>) =>
            client(`kanbans`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey)
    );
};

/**删除看板 */
export const useDeleteKanban = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Kanban>) =>
            client(`kanbans/${params.id}`, {
                data: params,
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
};
