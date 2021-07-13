import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";
import { CreateKanban } from "./createKanban";
import { KanbanColumn } from "./kanbanColumn";
import { SearchPanel } from "./searchPanel";
import { TaskModal } from "./taskModal";
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from "./util";

export const KanbanScreen = () => {
    useDocumentTitle("看板列表");
    const { data: currentProject } = useProjectInUrl();
    const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams());
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
    const isLoading = kanbanIsLoading || taskIsLoading;
    return (
        <ScreenContainer>
            <h1>{currentProject?.name}看板</h1>
            <SearchPanel />
            {isLoading ? (
                <Spin size={"large"} />
            ) : (
                <ColumnsContainer>
                    {kanbans?.map((kanban) => {
                        return <KanbanColumn key={kanban.id} kanban={kanban} />;
                    })}

                    <CreateKanban />
                </ColumnsContainer>
            )}
            <TaskModal />
        </ScreenContainer>
    );
};

export const ColumnsContainer = styled.div`
    display: flex;
    overflow-y: hidden;
    flex: 1;
`;
