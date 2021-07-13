import { Card, Input } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
    const [name, setName] = useState("");
    const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
    const projectId = useProjectIdInUrl();
    const [inputMode, setInputMode] = useState(false);

    const submit = async () => {
        await addTask({ projectId, name, kanbanId });
        setInputMode(false);
        setName("");
    };
    /**切换显示的输入状态 */
    const toggle = () => {
        setInputMode((mode) => {
            return !mode;
        });
    };
    useEffect(() => {
        if (!inputMode) {
            setName("");
        }
    }, [inputMode]);
    if (!inputMode) {
        return <div onClick={toggle}>+创建事务</div>;
    }
    return (
        <Card>
            <Input onPressEnter={submit} onBlur={toggle} placeholder={"需要做些什么"} autoFocus={true} value={name} onChange={(evt) => setName(evt.target.value)} />
        </Card>
    );
};
