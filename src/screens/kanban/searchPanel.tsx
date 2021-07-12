import { Input } from "antd";
import { Button } from "antd/lib/radio";
import { Row } from "components/lib";
import { TaskTypeSelect } from "components/taskTypeSelect";
import { UserSelect } from "components/userSelect";
import React from "react";
import { useSetUrlSearchParams } from "utils/url";
import { useTaskSearchParams } from "./util";
export const SearchPanel = () => {
    const searchParams = useTaskSearchParams();
    const setSearchParams = useSetUrlSearchParams();
    const reset = () => {
        setSearchParams({
            typeId: undefined,
            processorId: undefined,
            tagId: undefined,
            name: undefined,
        });
    };
    return (
        <Row marginBottom={4} gap={true}>
            <Input style={{ width: "10rem" }} placeholder={"任务名称"} value={searchParams.name} onChange={(evt) => setSearchParams({ name: evt.target.value })}></Input>
            <UserSelect
                defaultOptionName={"经办人"}
                value={searchParams.processorId}
                onChange={(value) => {
                    setSearchParams({ processorId: value });
                }}
            />
            <TaskTypeSelect
                defaultOptionName={"类型"}
                value={searchParams.typeId}
                onChange={(value) =>
                    setSearchParams({
                        typeId: value,
                    })
                }
            />
            <Button type={""} onClick={reset}>
                清除筛选器
            </Button>
        </Row>
    );
};
