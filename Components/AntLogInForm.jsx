import React, { useEffect } from 'react';
import { Button, Input, Typography } from 'antd';
const { Text } = Typography;
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/Redux/actions';

function AntLogInForm() {
  const router = useRouter();
  const redirect = () => {
    router.push('/welcome');
  };

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.user);

  const email = 'jo@email.com';
  const password = '2&57DyhUTH1c';
  const type = 'email';

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
    <form onSubmit={handleSubmit}>
      <div className="email">
        <Text>Email</Text>
        <Input placeholder="Email" />
      </div>

      <div className="password">
        <Text>password</Text>
        <Input placeholder="Password" />
      </div>

      <div className="frgt-pass">
        <p>Forget Password?</p>
      </div>

      <Button className="ant-btn" onClick={redirect} htmlType="submit">
        Log In
      </Button>
      
    </form>
  );
}

export default AntLogInForm;
