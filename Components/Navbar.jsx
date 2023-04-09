/* eslint-disable @next/next/no-html-link-for-pages */
import { Breadcrumb, Button, Dropdown, Space, Typography } from 'antd';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logOut } from '@/Redux/User/userSlice';
import Logout from './Logout';
const { Text } = Typography;
function Navbar({ fname, lname }) {
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
