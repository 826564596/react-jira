import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import React, { useCallback } from "react";
import { useDocumentTitle } from "utils";
import { useKanbans, useReorderKanban } from "utils/kanban";
import { useReorderTask, useTasks } from "utils/task";
import { CreateKanban } from "./createKanban";
import { KanbanColumn } from "./kanbanColumn";
import { SearchPanel } from "./searchPanel";
import { TaskModal } from "./taskModal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useKanbanQuerykey, useKanbanSearchParams, useProjectInUrl, useTasksQueryKey, useTasksSearchParams } from "./util";
import { Drop, DropChild, Drag } from "components/dragAndDrop";

export const KanbanScreen = () => {
    useDocumentTitle("看板列表");
    const { data: currentProject } = useProjectInUrl();
    const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams());
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
    const isLoading = kanbanIsLoading || taskIsLoading;

    const onDragEnd = useDragEnd();
    return (
        <DragDropContext
            onDragEnd={({ ...params }) => {
                console.log(params);
                onDragEnd(params);
            }}
        >
            <ScreenContainer>
                <h1>{currentProject?.name}看板</h1>
                <SearchPanel />
                {isLoading ? (
                    <Spin size={"large"} />
                ) : (
                    <ColumnsContainer>
                        <Drop type={"COLUMN"} direction={"horizontal"} droppableId={"kanban"}>
                            <DropChild style={{ display: "flex" }}>
                                {kanbans?.map((kanban, index) => {
                                    return (
                                        <Drag key={kanban.id} draggableId={"kanban" + kanban.id} index={index}>
                                            <KanbanColumn kanban={kanban} key={kanban.id} />
                                        </Drag>
                                    );
                                })}
                            </DropChild>
                        </Drop>
                        <CreateKanban />
                    </ColumnsContainer>
                )}
                <TaskModal />
            </ScreenContainer>
        </DragDropContext>
    );
};
/**捕获onDragEnd的参数对数据进行操作 */
export const useDragEnd = () => {
    //从接口中获取kanban和tasks数据
    const { data: kanbans } = useKanbans(useKanbanSearchParams());
    const { data: allTasks = [] } = useTasks(useTasksSearchParams());

    const { mutate: reorderKanban } = useReorderKanban(useKanbanQuerykey());
    const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());

    // source表示始，destination表示终
    return useCallback(
        ({ source, destination, type }: DropResult) => {
            if (!destination) {
                return;
            }
            //如果是横向排序
            if (type === "COLUMN") {
                const fromId = kanbans?.[source.index].id;
                const toId = kanbans?.[destination.index].id;
                if (!fromId || !toId || fromId === toId) {
                    return;
                }
                const type = destination.index > source.index ? "after" : "before";

                reorderKanban({ fromId, referenceId: toId, type });
            }
            //如果是纵向排序task
            if (type === "ROW") {
                const fromKanbanId = +source.droppableId;
                const toKanbanId = +destination.droppableId;

                //看板排序task
                const fromTask = allTasks.filter((task) => {
                    return task.kanbanId === fromKanbanId;
                })[source.index];
                const toTask = allTasks.filter((task) => {
                    return task.kanbanId === toKanbanId;
                })[destination.index];
                //如果要排序的两个相同，啥都不做
                if (fromTask?.id === toTask?.id) {
                    return;
                }
                const type = destination.index > source.index ? "after" : "before";
                reorderTask({ fromId: fromTask?.id, referenceId: toTask?.id, fromKanbanId, toKanbanId, type: type });
            }
        },
        [allTasks, kanbans, reorderKanban, reorderTask]
    );
};

export const ColumnsContainer = styled("div")`
    display: flex;
    overflow-y: hidden;
    flex: 1;
`;
