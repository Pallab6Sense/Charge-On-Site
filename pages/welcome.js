/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Button, Spin, Table, Typography } from 'antd';
import { wrapper } from '@/Redux/store';
import { useDispatch, useSelector } from 'react-redux';
const { Title } = Typography;
import Cookies from 'js-cookie';
import { fetchUserData } from '@/Redux/User/actions';
import { useRouter } from 'next/router';

function welcome() {
  const getAccesTokenFromCookie = Cookies.get('AccessToken');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData(getAccesTokenFromCookie));
  }, [dispatch, getAccesTokenFromCookie]);

  const state = useSelector((state) => state);

 
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    setAccessToken(state?.reducer?.user?.data?.accessToken);
  }, [state]);

  Cookies.set('AccessToken', accessToken, {
    expires: 7,
  });

  const [fetchEmail, setFetchEmail] = useState(null);
  const [fetchFName, setFetchFName] = useState(null);
  const [fetchLName, setFetchLName] = useState(null);
  const [fetchUserType, setFetchUserType] = useState(null);
  const [fetchId, setFetchId] = useState(null);
  const [fetchPhone, setFetchPhone] = useState(null);

  useEffect(() => {
    setFetchEmail(state?.reducer?.user?.fetchedData?.email);
    setFetchFName(state?.reducer?.user?.fetchedData?.fname);
    setFetchLName(state?.reducer?.user?.fetchedData?.lname);
    setFetchUserType(state?.reducer?.user?.fetchedData?.userType);
    setFetchId(state?.reducer?.user?.fetchedData?.id);
    setFetchPhone(state?.reducer?.user?.fetchedData?.phone);
  }, [state]);

  const data = {
    fetchId,
    fetchEmail,
    fetchFName,
    fetchLName,
    fetchUserType,
    fetchPhone,
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'fname',
      key: 'fname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lname',
      key: 'lname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'mail',
    },
    {
      title: 'UserType',
      dataIndex: 'userType',
      key: 'userType',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];
  const dataSource = [
    {
      key: data.fetchId,
      fname: data.fetchFName,
      lname: data.fetchLName,
      email: data.fetchEmail,
      userType: data.fetchUserType,
      phone: data.fetchPhone,
    },
  ];

  const router = useRouter();

  const handleClick = () => {
    Cookies.remove('AccessToken');
    router.push('/')
  };
  return (
    <>
      <div className="welcome-div">
        <Title style={{ fontSize: '55px', color: 'blue' }}>Welcome User</Title>

        {data !== 'undefined' ? (
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            size="large"
          />
        ) : (
          <Spin></Spin>
        )}

        <Button className="ant-btn" onClick={handleClick}>
          Logout
        </Button>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => {});

export default welcome;
