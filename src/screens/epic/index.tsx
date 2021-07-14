import { Row, ScreenContainer } from "components/lib";
import React from "react";
import { useProjectInUrl } from "screens/kanban/util";
import { Button, List, Modal } from "antd";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useEpicQuerykey, useEpicSearchParams } from "./util";
import dayjs from "dayjs";
import { useTasks } from "utils/task";
import { Link } from "react-router-dom";
import { CreateEpic } from "./createEpic";
import { useState } from "react";
import { Epic } from "types/epic";
export const EpicScreen = () => {
    const { data: currentProject } = useProjectInUrl();
    const { data: epics } = useEpics(useEpicSearchParams());
    const { data: tasks } = useTasks({ projectId: currentProject?.id });
    const { mutate: deleteEpic } = useDeleteEpic(useEpicQuerykey());
    const [epicCreateOpen, setEpicCreateOpen] = useState(false);
    const startDelete = (epic: Epic) => {
        Modal.confirm({
            okText: "确定",
            cancelText: "取消",
            title: `确定删除任务组：${epic.name}`,
            onOk() {
                deleteEpic({ id: epic.id });
            },
        });
    };
    return (
        <ScreenContainer>
            <Row between={true}>
                <h1>{currentProject?.name}任务组</h1>
                <Button onClick={() => setEpicCreateOpen(true)} type={"link"}>
                    创建任务组
                </Button>
            </Row>

            <List
                style={{ overflowY: "scroll", overflowX: "hidden" }}
                dataSource={epics}
                itemLayout={"vertical"}
                renderItem={(epic) => {
                    return (
                        <List.Item>
                            <List.Item.Meta
                                title={
                                    <Row between={true}>
                                        <span>{epic.name}</span>
                                        <Button onClick={() => startDelete(epic)} type={"link"}>
                                            刪除
                                        </Button>
                                    </Row>
                                }
                                description={
                                    <div>
                                        <div>开始時间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                                        <div>开始時间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                                    </div>
                                }
                            />
                            <div>
                                {tasks
                                    ?.filter((task) => task.epicId === epic.id)
                                    .map((task) => {
                                        return (
                                            <div>
                                                <Link to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`} key={task.id}>
                                                    {task.name}
                                                </Link>
                                            </div>
                                        );
                                    })}
                            </div>
                        </List.Item>
                    );
                }}
            />
            <CreateEpic onClose={() => setEpicCreateOpen(false)} visible={epicCreateOpen} />
        </ScreenContainer>
    );
};
