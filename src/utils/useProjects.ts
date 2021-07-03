import { useEffect } from "react";
import { Project } from "screens/projectList/List";
import { clearObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
/**获取项目列表的hook */
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<Project[]>();
    const fetchProjects = () => client(`projects`, { data: clearObject(param || {}) });
    //didUpdate
    useEffect(() => {
        run(fetchProjects(), { retry: fetchProjects });
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param]);
    return result;
};

/**编辑project数据，不定义参数是为了让Hook再最外层使用,返回mutate让该函数可以在最内层调用 */
export const useEditProject = () => {
    const { run, ...asyncResult } = useAsync();
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
        return run(
            client(`projects/${params.id}`, {
                data: params,
                method: "PATCH",
            })
        );
    };
    return {
        mutate,
        ...asyncResult,
    };
};
/**添加project数据，不定义参数是为了让Hook再最外层使用,返回mutate让该函数可以在最内层调用 */
export const useAddProject = () => {
    const { run, ...asyncResult } = useAsync();
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
        return run(
            client(`project/${params.id}`, {
                data: params,
                method: "POST",
            })
        );
    };
    return {
        mutate,
        ...asyncResult,
    };
};
