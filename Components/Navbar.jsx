import { Button } from 'antd';
import React from 'react'

function Navbar() {
    return (
        <div className="navbar">
          <Button type="link" className="ant-btn-nav">
            Home
          </Button>
          <Button type="link" className="ant-btn-nav">
            Property
          </Button>
        </div>
      );
}

export default Navbar