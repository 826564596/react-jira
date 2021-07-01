import React from "react";
import { User } from "./SearchPanel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
export interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created: number;
}
//这样可以将Table里的所有属性暴露给List,通过在使用List的时候传Table的属性就可以了
//List新增users属性
interface ListProps extends TableProps<Project> {
    users: User[];
}
//将传入的props先给users赋值，剩下的传给props
function List({ users, ...props }: ListProps) {
    return (
        <div>
            <Table
                rowKey={"id"}
                pagination={false}
                columns={[
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
                ]}
                {...props} //将剩下的props赋值给Table
            />
        </div>
    );
}
export default List;
