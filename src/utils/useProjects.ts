import { useEffect } from "react";
import { Project } from "screens/projectList/List";
import { clearObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
/**获取项目列表的hook */
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<Project[]>();
    //didUpdate
    useEffect(() => {
        run(client(`projects`, { data: clearObject(param || {}) }));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param]);
    return result;
};
