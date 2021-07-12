import { Task } from "types/task";
import { useHttp } from "./http";
import { useQuery } from "react-query";

/**获取任务列表Hook */
export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp();
    return useQuery<Task[], Error>(["tasks", param], () => client(`tasks`, { data: param }));
};
