import { User } from "types/user";
import { clearObject } from "utils";
import { useHttp } from "./http";
import { useQuery } from "react-query";
/**获取用户列表的hook */

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp();

    return useQuery<User[], Error>(["users", param], () => client(`users`, { data: clearObject(param || {}) }));
};
