import React from 'react';
import { Button, Input, Typography } from 'antd';
const { Title, Text } = Typography;
import { useRouter } from 'next/router';

function AntLogInForm() {
  const router = useRouter();
  const redirect = () => {
    router.push('/welcome');
  };

  return (
    <form action="">
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
      <Button className="ant-btn" onClick={redirect}>
        Log In
      </Button>
    </form>
  );
}

export default AntLogInForm;
