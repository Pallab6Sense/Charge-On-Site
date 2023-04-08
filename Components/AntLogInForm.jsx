import { useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/Redux/User/actions';
import { getCredentials } from '@/Axios/interceptors';

const AntLogInForm = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const type = 'email';
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: `${message}`,
      duration: 1,
      closeIcon: '',
      placement,
      className:'notification',
    });
  };
  const handleClick = () => {
    if (
      email === 'jo@email.com' &&
      password === '2&57DyhUTH1c' &&
      type === 'email'
    ) {
      openNotification('top', 'Logged In successfully');
      router.push('/welcome');
    } else {
      openNotification('top', 'Check Email and Password');
    }
  };

  let sendCredentials = getCredentials;

  sendCredentials({ email, password, type });

  const onFinish = (e) => {
    e.preventDefault;

    dispatch(login());
  };
  const loading = useSelector((state) => state?.reducer?.user?.loading);

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <div className="frgt-pass">
            <p style={{ color: 'rgb(6, 70, 6)' }}>Forget Password?</p>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            className="ant-btn"
            htmlType="submit"
            onClick={handleClick}
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AntLogInForm;
