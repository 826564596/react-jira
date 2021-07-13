import { useForm } from "antd/lib/form/Form";
import { Button, Form, Input } from "antd";
import { Modal } from "antd";
import { useEffect } from "react";
import { useDeleteTask, useEditTask } from "utils/task";
import { useTasksQueryKey, useTasksModal } from "./util";
import { UserSelect } from "components/userSelect";
import { TaskTypeSelect } from "components/taskTypeSelect";
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export const TaskModal = () => {
    const [form] = useForm();
    const { editingTaskId, editingTask, close } = useTasksModal();
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey());
    const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());
    /**model取消 */
    const onCancel = () => {
        form.resetFields();
        close();
    };
    /**modal确定 */
    const onOk = async () => {
        await editTask({ ...editingTask, ...form.getFieldsValue() });
        close();
    };
    /**删除当前task */
    const startDelete = () => {
        Modal.confirm({
            okText: "确定",
            cancelText: "取消",
            title: "确定删除任务吗",
            onOk() {
                deleteTask({ id: Number(editingTaskId) });
            },
        });
    };
    useEffect(() => {
        form.setFieldsValue(editingTask);
    }, [form, editingTask]);
    return (
        <Modal forceRender={true} onCancel={onCancel} onOk={onOk} visible={!!editingTaskId} title={"编辑任务"} confirmLoading={editLoading} okText={"确认"} cancelText={"取消"}>
            <Form {...layout} initialValues={editingTask} form={form}>
                <Form.Item label={"任务名称"} name={"name"} rules={[{ required: true, message: "请输入任务名称" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label={"经办人"} name={"processorId"}>
                    <UserSelect defaultOptionName={"经办人"} />
                </Form.Item>
                <Form.Item label={"类型"} name={"typeId"}>
                    <TaskTypeSelect />
                </Form.Item>
            </Form>
            <div style={{ textAlign: "right" }}>
                <Button onClick={startDelete} style={{ fontSize: "14px" }} size={"small"}>
                    删除
                </Button>
            </div>
        </Modal>
    );
};
