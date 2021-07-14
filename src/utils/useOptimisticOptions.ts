import { QueryKey, useQueryClient } from "react-query";
import { Task } from "types/task";
import { reorder } from "./reorder";
/**
 * 用于react-query optimistic update的配置
 * @param queryKey
 * @param callback
 */
export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
    const queryClient = useQueryClient();
    return {
        //会在上面useMutation发生就调用
        async onMutate(target: any) {
            //保存前一个值
            const previousItems = queryClient.getQueryData(queryKey);
            //对比乐观更新为新值
            queryClient.setQueryData(queryKey, (old?: any[]) => {
                // console.log(old)
                return callback(target, old);
            });
            //返回前一个值，可以用于失败回滚，保存到context中
            return { previousItems };
        },
        onSuccess: (data: any, variables: any, context: any) => {
            console.log("onSuccess");
        },
        onError(error: any, newItem: any, context: any) {
            //api请求失败，从context中获取旧值，回滚
            queryClient.setQueryData(queryKey, context.previousItems);
        },
        onSettled() {
            queryClient.invalidateQueries(queryKey);
        },
    };
};

/**mutation的删除配置 */
export const useDeleteConfig = (queryKey: QueryKey) => {
    return useConfig(queryKey, (target, old) => {
        return old?.filter((item) => target.id !== item.id) || [];
    });
};
/**mutation的编辑配置 */
export const useEditConfig = (queryKey: QueryKey) => {
    return useConfig(queryKey, (target, old) => {
        const array = old?.map((item) => (target.id === item.id ? { ...item, ...target } : item));
        return array || [];
    });
};
/**mutation的添加配置 */
export const useAddConfig = (queryKey: QueryKey) => {
    return useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
};
/**kanban排序的相关配置 */
export const useReorderKanbanConfig = (queryKey: QueryKey) => {
    return useConfig(queryKey, (target, old) => {
        return reorder({ list: old, ...target }) || [];
    });
};
/**Task排序的相关配置 */
export const useReorderTaskConfig = (queryKey: QueryKey) => {
    return useConfig(queryKey, (target, old) => {
        const orderList = reorder({ list: old, ...target }) as Task[];
        //匹配id,不管有没有跨看板都重新设置kanbanId
        return orderList.map((item) => {
            return item.id === target.fromId ? { ...item, kanbanId: target.toKanbanId } : item;
        });
    });
};
