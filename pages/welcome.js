import React from 'react';
import { Typography } from 'antd';
const { Title } = Typography;
function welcome() {
  return (
    <>
      <div className="welcome-div">
        <Title style={{ fontSize: '50px' }}>Welcome User</Title>
      </div>
    </>
  );
}

export default welcome;
