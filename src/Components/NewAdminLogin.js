import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const NewAdminLogin = () => {
    const { push } = useHistory();

    const onFinish = (values) => {
        axiosWithAuth()
            .post("/users/login", values)
            .then((res) => {
                console.log("admin login page data: ", res);
                localStorage.setItem("token", res.data.payload);
                push("/admin");
            })
            .catch((err) => console.log("this is the error from login: ", err));
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="not-checked"
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NewAdminLogin;
