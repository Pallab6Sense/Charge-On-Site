import { useState } from 'react';
import { Button, Input, Typography } from 'antd';
const { Text } = Typography;
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '@/Redux/actions';

function AntLogInForm() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const type = 'email';

  const handleClick = () => {
    email === 'jo@email.com' && password === '2&57DyhUTH1c' && type === 'email'
      ? router.push('/welcome')
      : null;
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="email">
          <Text className='ant-txt'>Email</Text>
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
          <Text className='ant-txt'>password</Text>
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
