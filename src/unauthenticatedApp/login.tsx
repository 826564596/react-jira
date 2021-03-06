import React from "react";
import { useAuth } from "context/authContext";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticatedApp";
import { useAsync } from "utils/useAsync";
interface LoginScreenProps {
    onError: (error: Error) => void;
}
/**登录页面 */
const LoginScreen = ({ onError }: LoginScreenProps) => {
    const { login } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true }); //用于登录按钮的状态
    const handleSubmit = (values: { username: string; password: string }) => {
        run(login(values)).catch((e) => {
            onError(e);
        });
    };
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={"username"} rules={[{ required: true, message: "请输入用户名" }]}>
                <Input placeholder={"用户名"} type="text" id={"username"} />
            </Form.Item>
            <Form.Item name={"password"} rules={[{ required: true, message: "请输入密码" }]}>
                <Input placeholder={"密码"} type="password" id={"password"} />
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
                    登录
                </LongButton>
            </Form.Item>
        </Form>
    );
};

export default LoginScreen;
