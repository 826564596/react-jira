import { QueryKey, useQueryClient } from "react-query";
/**
 * 用于react-query optimistic update的配置
 * @param queryKey
 * @param callback
 */
export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
    const queryClient = useQueryClient();
    return {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        //会在上面useMutation发生就调用
        async onMutate(target: any) {
            const previousItems = queryClient.getQueryData(queryKey);
            queryClient.setQueryData(queryKey, (old?: any[]) => {
                return callback(target, old);
            });
            return { previousItems };
        },
        onError(error: any, newItem: any, context: any) {
            queryClient.setQueryData(queryKey, context.previousItems);
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
        const a = old?.map((item) => (target.id !== item.id ? { ...item, ...target } : item));
        return a || [];
    });
};
/**mutation的添加配置 */
export const useAddConfig = (queryKey: QueryKey) => {
    return useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
};
