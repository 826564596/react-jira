import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/taskType";
import { useTaskSearchParams } from "./util";
import bugIcon from "assets/bug.svg";
import taskIcon from "assets/task.svg";
import styled from "@emotion/styled";
import { Card } from "antd";

interface KanbanColumnProps {
    kanban: Kanban;
}
export const KanbanColumn = ({ kanban }: KanbanColumnProps) => {
    const { data: allTasks } = useTasks(useTaskSearchParams());
    const tasks = allTasks?.filter((task) => {
        return task.id === kanban.id;
    });
    return (
        <Container>
            <h3>{kanban.name}</h3>
            <TaskContainer>
                {tasks?.map((task) => {
                    return (
                        <Card style={{ marginBottom: "0.5rem" }} key={task.id}>
                            <div>{task.name}</div>
                            <TaskTypeIcon id={task.id} />
                        </Card>
                    );
                })}
            </TaskContainer>
        </Container>
    );
};

export const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes();
    const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
    if (!name) {
        return null;
    }
    return <img src={name === "task" ? taskIcon : bugIcon} />;
};

const Container = styled.div`
    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(244, 245, 247);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
    overflow: scroll;
    flex: 1;
    ::-webkit-scrollbar {
        display: none;
    }
`;
