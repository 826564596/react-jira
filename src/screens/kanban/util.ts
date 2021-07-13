import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useDebounce } from "utils";
import { useTask } from "utils/task";
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

/**kanban的queryKey */
export const useKanbanQuerykey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
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
/**task的query缓存 */
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

/**管理modal的状态 */
export const useTasksModal = () => {
    const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(["editingTaskId"]);
    //获取当前点击的Task数据
    const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
    /**打开modal */
    const startEdit = useCallback(
        (id: number) => {
            setEditingTaskId({ editingTaskId: id });
        },
        [setEditingTaskId]
    );
    /**关闭modal */
    const close = useCallback(() => {
        setEditingTaskId({ editingTaskId: "" });
    }, [setEditingTaskId]);
    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading,
    };
};
