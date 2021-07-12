import { useEffect } from "react";
import { User } from "types/user";
import { clearObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
/**获取用户列表的hook */
export const useUsers = (param?: Partial<User>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<User[]>();
    //didMount
    useEffect(() => {
        run(client(`users`, { data: clearObject(param || {}) }));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param]);
    return result;
};
