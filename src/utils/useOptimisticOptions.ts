import { QueryKey, useQueryClient } from "react-query";
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
