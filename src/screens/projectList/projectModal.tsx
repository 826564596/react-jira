import styled from "@emotion/styled";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/userSelect";
import React from "react";
import { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/useProjects";
import { useProjectModal } from "./utils";
export const ProjectModal = () => {
    const { projectModalOpen, close, editingProject, isLoading } = useProjectModal();
    const useMutateProject = editingProject ? useEditProject : useAddProject;
    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
    const [form] = Form.useForm();
    /**表单提交 */
    const onFinish = (values: any) => {
        mutateAsync({ ...editingProject, ...values }).then(() => {
            form.resetFields();
            close();
        });
    };
    /**关闭drawer */
    const closeModal = () => {
        form.resetFields();
        close();
    };
    const title = editingProject ? "编辑项目" : "创建项目";
    //当editingProject改变时
    useEffect(() => {
        //将editingProject赋值给表单
        form.setFieldsValue(editingProject);
    }, [editingProject, form]);
    return (
        <Drawer forceRender={true} onClose={closeModal} visible={projectModalOpen} width={"100%"}>
            <Container>
                {isLoading ? <Spin size={"large"} /> : <h1>{title}</h1>}
                <ErrorBox error={error} />
                <Form form={form} layout={"vertical"} style={{ width: "40rem" }} onFinish={onFinish}>
                    <Form.Item label={"名称"} name={"name"} rules={[{ required: true, message: "请输入项目名称" }]}>
                        <Input placeholder={"请输入项目名称"} />
                    </Form.Item>
                    <Form.Item label={"部门"} name={"organization"} rules={[{ required: true, message: "请输入部门名称" }]}>
                        <Input placeholder={"请输入部门名称"} />
                    </Form.Item>
                    <Form.Item label={"负责人"} name={"personId"}>
                        <UserSelect defaultOptionName={"负责人"} />
                    </Form.Item>
                    <Form.Item style={{ textAlign: "right" }}>
                        <Button loading={mutateLoading} type={"primary"} htmlType={"submit"}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Container>
        </Drawer>
    );
};

const Container = styled.div`
    display: flex;
    height: 80vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
