/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Skeleton, Spin, Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
const { Title } = Typography;
import { fetchUserData } from '@/Redux/User/actions';
import Navbar from '@/Components/Navbar';
import { getAccessToken, getRefreshToken } from '@/Axios/interceptors';

function welcome() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state?.reducer?.user?.data?.accessToken
  );
  const refreshToken = useSelector(
    (state) => state?.reducer?.user?.data?.refreshToken
  );
  let sendRefreshToken = getRefreshToken;
  let sendAccesToken = getAccessToken;

  useEffect(() => {
    sendAccesToken(accessToken); //!Sending ACCESS_TOKEN to the axios interceptors
    sendRefreshToken(refreshToken);
  }, [accessToken, refreshToken, sendAccesToken, sendRefreshToken]);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [accessToken, dispatch]);

  const state = useSelector((state) => state);
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

  const loading = useSelector((state) => state?.reducer?.user?.loading);

  return (
    <>
      {loading ? (
        <div className="skeleton">
          <Skeleton active loading={loading}></Skeleton>
        </div>
      ) : (
        <div className="welcome-div">
          <Navbar fname={fetchFName} lname={fetchLName} />

          <Title style={{ fontSize: '55px', color: '#115955' }}>
            Welcome {fetchFName} {fetchLName}
          </Title>

          {data !== 'undefined' ? (
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              size="large"
              loading={loading}
            />
          ) : (
            <Spin></Spin>
          )}
        </div>
      )}
    </>
  );
}

export default welcome;
