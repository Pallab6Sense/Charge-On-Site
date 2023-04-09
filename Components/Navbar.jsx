/* eslint-disable @next/next/no-html-link-for-pages */
import { Button } from 'antd';
import React from 'react';
import { useRouter } from 'next/router';
import Logout from './Logout';
function Navbar() {
  const router = useRouter();

  function handleClick() {
    router.push('/propertyList');
  }
  return (
    <div className="navbar">
      <div className="nav-btn">
        <Button type="link" className="ant-btn-nav">
          Home
        </Button>
        <Button type="link" className="ant-btn-nav" onClick={handleClick}>
          Property
        </Button>

        <Logout />
      </div>
    </div>
  );
}

export default Navbar;
