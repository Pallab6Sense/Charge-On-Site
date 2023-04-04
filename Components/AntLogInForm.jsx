import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '@/Redux/User/actions';

const AntLogInForm = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const type = 'email';
  const envEmail = process.env.envEmail;
  const envPassword = process.env.envPassword;
  const envType = process.env.envType;

  const handleClick = () => {
    email === envEmail && password === envPassword && type === envType
      ? router.push('/welcome')
      : null;
  };
  const onFinish = (e) => {
    e.preventDefault;
    const credentials = {
      email,
      password,
      type,
    };
    dispatch(login(credentials));
  };

  return (
    <>
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
          <Button className="ant-btn" htmlType="submit" onClick={handleClick}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AntLogInForm;
