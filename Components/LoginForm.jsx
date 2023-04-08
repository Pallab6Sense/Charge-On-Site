/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Typography } from 'antd';
import AntLogInForm from './AntLogInForm';
const { Title, Text } = Typography;

const LoginForm = () => {
  return (
    <>
      <div className="form-div">
        <div className="content">
          <div className="img">
            <img src="cosLogo3.png" alt="" />
          </div>

          <div className="description">
            <Title level={3}>Welcome Back</Title>
            <Text className="ant-text">Log in to ChargeOnSite Portal</Text>
          </div>

          <div className="ant-form">
            <AntLogInForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
