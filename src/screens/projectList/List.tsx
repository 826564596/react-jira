import React from "react";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/useProjects";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal, useProjectQueryKey } from "./utils";
import { Project } from "types/project";
import { User } from "types/user";

//这样可以将Table里的所有属性暴露给List,通过在使用List的时候传Table的属性就可以了
//List新增users属性
interface ListProps extends TableProps<Project> {
    users: User[];
}
//将传入的props先给users赋值，剩下的传给props
function List({ users, ...props }: ListProps) {
    const { mutate } = useEditProject(useProjectQueryKey());
    const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());
    const { startEdit } = useProjectModal();

    //柯里化
    const pinProject = (id: number) => (pin: boolean) => mutate({ id: id, pin });
    const editProject = (id: number) => startEdit(id);
    const comfirmDeleteProject = (id: number) => {
        Modal.confirm({
            title: "确定删除这个项目吗？",
            content: "点击确定删除",
            okText: "确定",
            cancelText: "取消",
            onOk() {
                deleteProject({ id });
            },
        });
    };
    return (
        <div>
            <Table
                // rowKey={(record) => record.id}
                pagination={false}
                columns={[
                    {
                        title() {
                            return <Pin checked={true}></Pin>;
                        },
                        render(value, record) {
                            return <Pin checked={record.pin} onCheckedChange={pinProject(record.id)}></Pin>;
                        },
                    },
                    {
                        title: "名称",
                        sorter: (a, b) => a.name.localeCompare(b.name),
                        render(value, record) {
                            // Link to会默认用户访问当前路由的子路由
                            return <Link to={String(record.id)}>{record.name}</Link>;
                            // return <Link to={`/projects/${record.id}`}>{record.name}</Link>;
                        },
                    },
                    { title: "部门", dataIndex: "organization" },
                    {
                        title: "负责人",
                        render(value, record) {
                            return <span>{users.find((user) => user.id === record.personId)?.name || "未知"}</span>;
                        },
                    },

                    {
                        title: "创建时间",
                        render(value, record) {
                            return <span>{record.created ? dayjs(record.created).format("YYYY-MM-DD") : "无"}</span>;
                        },
                    },
                    {
                        render(value, record) {
                            return (
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item key={"edit"} onClick={() => editProject(record.id)}>
                                                编辑
                                            </Menu.Item>
                                            <Menu.Item key={"delete"} onClick={() => comfirmDeleteProject(record.id)}>
                                                删除
                                            </Menu.Item>
                                        </Menu>
                                    }
                                >
                                    <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
                                </Dropdown>
                            );
                        },
                    },
                ]}
                {...props} //将剩下的props赋值给Table
            />
        </div>
    );
}

export default List;
