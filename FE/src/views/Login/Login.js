import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { COOKIE_USER_TOKEN, LOCAL_STOGRATE_USER_INFOR } from '../../contants';
import { setCookie } from '../../helpers/cookie';

const Login = (props) => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    login(values)
      .then((res) => {
        setCookie(COOKIE_USER_TOKEN, res.data.token, 1);
        localStorage.setItem(LOCAL_STOGRATE_USER_INFOR, JSON.stringify(res.data));
        window.location.href = '/';
      })
      .catch((err) => {
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
            Login
          </Button>
          <span className="cursor-pointer text-blue-600 ml-5" onClick={() => navigate('/register')}>
            Register here!
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};

Login.propTypes = {};

export default Login;
