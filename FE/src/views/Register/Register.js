import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { register } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    register(values)
      .then((res) => {
        navigate('/login', {
          state: {
            ...values,
          },
        });
      })
      .catch((err) => {
        console.log('err', err);
        message.error(err.message);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="max-w-[500px] m-auto mt-[100px]">
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" labelCol={{ span: 4 }}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
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
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <span className="cursor-pointer text-blue-600 ml-5" onClick={() => navigate('/login')}>
            Login here!
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};

Register.propTypes = {};

export default Register;
