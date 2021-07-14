import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from "react-query";
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from "./useOptimisticOptions";

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

export interface SortProps {
    //要重新排序的item
    fromId: number;
    //目标的位置
    referenceId: number;
    //放的类型，前还是后
    type: "before" | "after";
    //始kanban
    fromKanbanId?: number;
    //终kanban
    toKanbanId?: number;
}
export const useReorderKanban = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation((params: SortProps) => {
        return client(`kanbans/reorder`, {
            data: params,
            method: "POST",
        });
    }, useReorderKanbanConfig(queryKey));
};
