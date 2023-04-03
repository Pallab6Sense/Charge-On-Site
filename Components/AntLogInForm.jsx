import React, { useEffect, useState } from 'react';
import { Button, Input, Spin, Typography, notification } from 'antd';
const { Text } = Typography;
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/Redux/actions';

function AntLogInForm() {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      description: 'Please provide a valid email and password',
      placement,
      className: 'ant-notification',
      closeIcon: '',
    });
  };

  const router = useRouter();

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const type = 'email';

  const handleClick = () => {
    email === 'jo@email.com' && password === '2&57DyhUTH1c' && type === 'email'
      ? router.push('/welcome')
      : openNotification('top');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email,
      password,
      type,
    };
    dispatch(login(credentials));
  };

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="email">
          <Text>Email</Text>
          <Input
            size="large"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="password">
          <Text>password</Text>
          <Input
            size="large"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="frgt-pass">
          <p>Forget Password?</p>
        </div>

        <Button className="ant-btn" onClick={handleClick} htmlType="submit">
          Log In
        </Button>
      </form>
    </>
  );
}

export default AntLogInForm;
