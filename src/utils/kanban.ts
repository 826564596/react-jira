import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useQuery } from "react-query";

/**获取看板列表Hook */
export const useKanBans = (param?: Partial<Kanban>) => {
    const client = useHttp();
    return useQuery<Kanban[], Error>(["kanbans", param], () => client(`kanbans`, { data: param }));
};
