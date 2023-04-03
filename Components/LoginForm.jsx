/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {Typography } from 'antd';
import AntLogInForm from './AntLogInForm';
const { Title, Text } = Typography;
function LoginForm() {

  return (
    <>
      <div className="form-div">

        <div className="content">
          <div className="img">
            <img src="cosLogo3.png" alt="" />
          </div>

          <div className="description">
            <Title level={3}>Log IN</Title>
            <Text className="ant-text">
              Please Provide your login and password to access your portal
            </Text>
          </div>

          <div className="ant-form">
            <AntLogInForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
