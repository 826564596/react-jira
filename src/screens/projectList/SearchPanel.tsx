import React from "react";
import { Input } from "antd";
import { Form } from "antd";
import { Project } from "./list";
import { UserSelect } from "components/userSelect";

export interface User {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}
interface SearchPanelProps {
    users: User[];
    param: Partial<Pick<Project, "name" | "personId">>;
    // param: {
    //     name: string;
    //     personId: number;
    // };
    setParam: (param: SearchPanelProps["param"]) => void;
}
function SearchPanel({ param, setParam, users }: SearchPanelProps) {
    return (
        <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
            <Form.Item>
                <Input
                    placeholder={"项目名"}
                    type="text"
                    value={param.name}
                    onChange={(event) => {
                        setParam({ ...param, name: event.target.value });
                    }}
                ></Input>
            </Form.Item>
            <Form.Item>
                <UserSelect
                    defaultOptionName={"负责人"}
                    value={param.personId}
                    onChange={(value) => {
                        setParam({
                            ...param,
                            personId: value,
                        });
                    }}
                />
            </Form.Item>
        </Form>
    );
}
export default SearchPanel;
