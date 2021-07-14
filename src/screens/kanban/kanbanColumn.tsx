import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/taskType";
import { useTasksSearchParams, useTasksModal, useKanbanQuerykey } from "./util";
import bugIcon from "assets/bug.svg";
import taskIcon from "assets/task.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./createTask";
import { Task } from "types/task";
import { Mark } from "components/mark";
import { useDeleteKanban } from "utils/kanban";
import { Row } from "components/lib";
import { Drag, Drop, DropChild } from "components/dragAndDrop";

export const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes();
    const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
    if (!name) {
        return null;
    }
    return <img alt={"task-icon"} src={name === "task" ? taskIcon : bugIcon} />;
};

const More = ({ kanban }: KanbanProps) => {
    const { mutateAsync } = useDeleteKanban(useKanbanQuerykey());
    const startEdit = () => {
        Modal.confirm({
            okText: "确定",
            cancelText: "取消",
            title: "确定删除看板吗",
            onOk() {
                mutateAsync({ id: kanban.id });
            },
        });
    };
    const overlay = (
        <Menu>
            <Menu.Item>
                <Button type={"link"} onClick={startEdit}>
                    删除
                </Button>
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={overlay}>
            <Button type={"link"}>...</Button>
        </Dropdown>
    );
};

interface TaskCardProps {
    task: Task;
}
// 使用react.forwardof 对传入KanbanColumn的ref进行透传
const TaskCard = React.forwardRef<HTMLDivElement, TaskCardProps>(({ task, ...props }, ref) => {
    const { startEdit } = useTasksModal();
    const { name: keyWord } = useTasksSearchParams();
    return (
        <div ref={ref} {...props}>
            <Card onClick={() => startEdit(task.id)} style={{ marginBottom: "0.5rem", cursor: "pointer" }} key={task.id}>
                <p>
                    <Mark keyWord={keyWord} name={task.name} />
                </p>
                <TaskTypeIcon id={task.typeId} />
            </Card>
        </div>
    );
});

interface KanbanProps {
    kanban: Kanban;
}
// 使用react.forwardof 对传入KanbanColumn的ref进行透传
export const KanbanColumn = React.forwardRef<HTMLDivElement, KanbanProps>(({ kanban, ...props }, ref) => {
    const { data: allTasks } = useTasks(useTasksSearchParams());
    const tasks = allTasks?.filter((task) => {
        return task.kanbanId === kanban.id;
    });
    return (
        <Container {...props} ref={ref}>
            <Row between>
                <h3>{kanban.name}</h3>
                <More kanban={kanban} key={kanban.id} />
            </Row>

            <TaskContainer>
                <Drop type={"ROW"} droppableId={String(kanban.id)} direction={"vertical"}>
                    <DropChild style={{ minHeight: "5px" }}>
                        {tasks?.map((task, taskIndex) => {
                            return (
                                <Drag index={taskIndex} key={task.id} draggableId={"task" + task.id}>
                                    <TaskCard key={task.id} task={task} />
                                </Drag>
                            );
                        })}
                    </DropChild>
                </Drop>
                <CreateTask kanbanId={kanban.id} />
            </TaskContainer>
        </Container>
    );
});

export const Container = styled.div`
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
