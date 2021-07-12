import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
import React from "react";
import { useDocumentTitle } from "utils";
import { useKanBans } from "utils/kanban";
import { KanbanColumn } from "./kanbanColumn";
import { SearchPanel } from "./searchPanel";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

export const KanbanScreen = () => {
    useDocumentTitle("看板列表");
    const { data: currentProject } = useProjectInUrl();
    const { data: kanbans } = useKanBans(useKanbanSearchParams());
    return (
        <ScreenContainer>
            <h1>{currentProject?.name}看板</h1>
            <SearchPanel />

            <ColumnsContainer>
                {kanbans?.map((kanban) => {
                    return <KanbanColumn key={kanban.id} kanban={kanban} />;
                })}
            </ColumnsContainer>
        </ScreenContainer>
    );
};

const ColumnsContainer = styled.div`
    display: flex;
    overflow-y: hidden;
    flex: 1;
`;
