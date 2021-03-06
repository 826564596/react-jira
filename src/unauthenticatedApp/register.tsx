import React from "react";
import { useAuth } from "context/authContext";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticatedApp";
import { useAsync } from "utils/useAsync";
interface RegisterScreenProps {
    onError: (error: Error) => void; //向外部抛出错误
}
/**注册页面 */
const RegisterScreen = ({ onError }: RegisterScreenProps) => {
    const { register } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true }); //用于注册按钮的状态
    const handleSubmit = ({ cpassword, ...values }: { username: string; password: string; cpassword: string }) => {
        if (cpassword !== values.password) {
            onError(new Error("请确认两次密码输入相同"));
            return;
        }
        run(register(values)).catch((e) => {
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

            <Form.Item name={"cpassword"} rules={[{ required: true, message: "请确认密码" }]}>
                <Input placeholder={"请确认密码"} type="password" id={"cpassword"} />
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
                    注册
                </LongButton>
            </Form.Item>
        </Form>
    );
};

export default RegisterScreen;
