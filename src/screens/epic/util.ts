import { useProjectIdInUrl } from "screens/kanban/util";

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });

/**Epic的queryKey */
export const useEpicQuerykey = () => ["epics", useEpicSearchParams()];
