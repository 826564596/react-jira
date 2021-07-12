import { TaskType } from "types/taskType";
import { useHttp } from "./http";
import { useQuery } from "react-query";

/**获取任务列表Hook */
export const useTaskTypes = (param?: Partial<TaskType>) => {
    const client = useHttp();
    return useQuery<TaskType[], Error>(["taskTypes", param], () => client(`taskTypes`));
};
