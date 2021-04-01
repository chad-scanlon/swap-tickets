import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
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

const NewSwapForm = () => {
    const onFinish = (values) => {
        axiosWithAuth()
            .post("/admin-create-ticket", values)
            .then((res) => {
                console.log("swap submit: ", res);
                alert("Thanks for playing!");
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
                label="Salesperson"
                name="salesperson"
                rules={[
                    {
                        required: true,
                        message: "Please input your name!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Year"
                name="year"
                rules={[
                    {
                        required: false,
                        message: "Please input a model year!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Model"
                name="model"
                rules={[
                    {
                        required: true,
                        message: "Please input a model!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Body"
                name="body"
                rules={[
                    {
                        required: false,
                        message: "Please input a body code or type!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="PEP"
                name="pep"
                rules={[
                    {
                        required: false,
                        message: "Please input a pep code!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Exterior"
                name="ext"
                rules={[
                    {
                        required: false,
                        message: "Please input an exterior color!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Interior"
                name="int"
                rules={[
                    {
                        required: false,
                        message: "Please input an interior color!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Options"
                name="options"
                rules={[
                    {
                        required: false,
                        message: "Please input any packages or options!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Notes"
                name="notes"
                rules={[
                    {
                        required: false,
                        message: "Please input any additional notes!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                {...tailLayout}
                name="isActive"
                valuePropName="not-checked"
                rules={[
                    {
                        required: true,
                        message: "Please check box to finalize swap request",
                    },
                ]}
            >
                <Checkbox>Finalize</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NewSwapForm;
