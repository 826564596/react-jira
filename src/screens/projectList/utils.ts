import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";
import { useProject } from "utils/useProjects";
import { useSearchParams } from "react-router-dom";
/**项目列表搜索的参数 */
export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(["name", "personId"]);
    return [
        useMemo(() => {
            return { ...param, personId: Number(param.personId) || undefined };
        }, [param]),
        setParam,
    ] as const;
};

/**使用url来管理ProjectModal的状态  */
export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(["projectCreate"]);
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(["editingProjectId"]);
    const { data: editingProject, isLoading } = useProject(Number(editingProjectId));

    const [_, setUrlParams] = useSearchParams();
    const open = () => setProjectCreate({ projectCreate: true });
    const close = () => {
        //将控制projectModal的参数设置为空
        setUrlParams({ projectCreate: "", editingProjectId: "" });
    };
    const startEdit = (id: number) => {
        setEditingProjectId({ editingProjectId: id });
    };
    return {
        projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading,
    };
};

export const useProjectQueryKey = () => {
    const [searchParams] = useProjectSearchParams();

    return ["projects", searchParams];
};
