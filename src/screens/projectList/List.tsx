import React from "react";
import { User } from "./SearchPanel";
import { Table } from "antd";
import dayjs from "dayjs";
interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created: number;
}
interface ListProps {
    list: Project[];
    users: User[];
}
function List({ list, users }: ListProps) {
    return (
        <div>
            <Table
                dataSource={list}
                columns={[
                    { title: "名称", dataIndex: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
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
                ]}
            ></Table>
        </div>
    );
}
export default List;
