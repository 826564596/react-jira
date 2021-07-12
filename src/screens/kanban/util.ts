import { useMemo } from "react";
import { useLocation } from "react-router";
import { useUrlQueryParam } from "utils/url";
import { useProject } from "utils/useProjects";

/**从url中获取项目id */
export const useProjectIdInUrl = () => {
    const { pathname } = useLocation();
    const id = pathname.match(/projects\/(\d+)/)?.[1];
    return Number(id);
};

/**使用项目id获取项目列表 */
export const useProjectInUrl = () => {
    return useProject(useProjectIdInUrl());
};

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbanQuerykey = () => ["kanbans", useKanbanSearchParams()];

export const useTaskSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);
    const projectId = useProjectIdInUrl();
    return useMemo(() => {
        return {
            projectId: projectId,
            typeId: Number(param.typeId) || undefined,
            processorId: Number(param.processorId) || undefined,
            tagId: Number(param.tagId) || undefined,
            name: param.name,
        };
    }, [projectId, param]);
};
export const useTaskQueryKey = () => ["tasks", useTaskSearchParams()];
