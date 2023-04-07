import { Button } from 'antd';
import React from 'react'
import { useRouter } from 'next/router';

function Navbar() {
  const router = useRouter();
  
  function handleClick(){

    router.push('/propertyList')

  }
    return (
        <div className="navbar">
          <Button type="link" className="ant-btn-nav">
            Home
          </Button>
          <Button type="link" className="ant-btn-nav" onClick={handleClick}>
            Property
          </Button>
        </div>
      );
}

export default Navbar