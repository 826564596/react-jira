import React from "react";
import { Input, Select } from "antd";
import { Form } from "antd";

export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}
interface SearchPanelProps {
    users: User[];
    param: {
        name: string;
        personId: string;
    };
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
                <Select
                    value={param.personId}
                    onChange={(value) => {
                        setParam({ ...param, personId: value });
                    }}
                >
                    <Select.Option value={""}>负责人</Select.Option>
                    {users.map((item) => {
                        return (
                            <Select.Option key={item.id} value={item.id.toString()}>
                                {item.name}
                            </Select.Option>
                        );
                    })}
                </Select>
            </Form.Item>
        </Form>
    );
}
export default SearchPanel;
