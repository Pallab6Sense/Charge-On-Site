import { Dropdown, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/Redux/User/userSlice';
const { Text } = Typography;
import { useRouter } from 'next/router';

function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((state) => state);

  const [fName,setFName]=useState();
  const [lName,setLName]=useState();
  useEffect(() => {
    setFName(state?.reducer?.user?.fetchedData?.fname);
    setLName(state?.reducer?.user?.fetchedData?.lname);
   
  }, [state]);
  const items = [
    {
      label: (
        <Text
          onClick={() => {
            dispatch(logOut());
            router.push('/');
          }}
        >
          Log Out
        </Text>
      ),
      key: '0',
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={['click']}
    >
      <Text>
        <Space>
          <strong>
            {fName}
            {lName}
          </strong>
          <DownOutlined />
        </Space>
      </Text>
    </Dropdown>
  );
}

export default Logout;
