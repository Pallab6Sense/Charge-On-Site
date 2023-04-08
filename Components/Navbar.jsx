import { Breadcrumb, Button } from 'antd';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Navbar() {
  const router = useRouter();

  function handleClick() {
    router.push('/propertyList');
  }
  return (
    <div className="navbar">
      <div className="welcome-breadcrumb">
        <Breadcrumb
          items={[{ title: <Link href="/welcome">Home</Link> }]}
        ></Breadcrumb>
      </div>
      <div className="nav-btn">
        <Button type="link" className="ant-btn-nav">
          Home
        </Button>
        <Button type="link" className="ant-btn-nav" onClick={handleClick}>
          Property
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
