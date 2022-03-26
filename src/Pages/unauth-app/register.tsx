import { Form, Input, Button, message } from "antd";
import { useAuth } from "context/auth-context";

import { memo } from "react";
const RegisterScreen = memo(() => {
  const { register } = useAuth();
  const handleRegister = (values: { username: string; password: string }) => {
    register(values)
      .then((res) => {
        message.success("注册成功");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  return (
    <div>
      <Form onFinish={handleRegister}>
        <Form.Item
          label="Username"
          name={"username"}
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="用户名" type={"text"} id="username"></Input>
        </Form.Item>
        <Form.Item
          label="Password"
          name={"password"}
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input placeholder="密码" type={"password"} id="password"></Input>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type={"primary"} htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default RegisterScreen;
