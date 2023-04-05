/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { wrapper } from '@/Redux/store';
import { useDispatch, useSelector } from 'react-redux';
const { Title } = Typography;
import Cookies from 'js-cookie';
import { fetchUserData } from '@/Redux/User/actions';

function welcome() {
  const getAccesTokenFromCookie = Cookies.get('AccessToken');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData(getAccesTokenFromCookie));
  }, [dispatch, getAccesTokenFromCookie]);

  const state = useSelector((state) => state);

  const [fetchEmail, setFetchEmail] = useState(null);
  const [fetchFName, setFetchFName] = useState(null);
  const [fetchLName, setFetchLName] = useState(null);
  const [fetchUserType, setFetchUserType] = useState(null);
  useEffect(() => {
    setFetchEmail(state?.reducer?.user?.fetchedData?.email);
    setFetchFName(state?.reducer?.user?.fetchedData?.fname);
    setFetchLName(state?.reducer?.user?.fetchedData?.lname);
    setFetchUserType(state?.reducer?.user?.fetchedData?.userType);
  }, [state]);

  console.log('Email', fetchEmail);
  console.log('F name', fetchFName);
  console.log('L Name', fetchLName);
  console.log('user Type', fetchUserType);

  return (
    <>
      <div className="welcome-div">
        <Title style={{ fontSize: '55px', color: 'blue' }}>Welcome User</Title>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => {});

export default welcome;
