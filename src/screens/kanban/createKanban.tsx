import { Input } from "antd";
import { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { Container } from "./kanbanColumn";
import { useKanbanQuerykey, useProjectIdInUrl } from "./util";

export const CreateKanban = () => {
    const [name, setName] = useState("");
    const projectId = useProjectIdInUrl();
    const { mutateAsync: addKanban } = useAddKanban(useKanbanQuerykey());
    const submit = async () => {
        await addKanban({ name, projectId });
        setName("");
    };
    return (
        <Container>
            <Input size={"large"} placeholder={"新建看板名称"} value={name} onChange={(evt) => setName(evt.target.value)} onPressEnter={submit}></Input>
        </Container>
    );
};
