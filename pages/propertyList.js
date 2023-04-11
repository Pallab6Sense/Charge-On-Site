/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  fetchProperties,
  getCurrent,
} from '@/Redux/PropertyList/propertyAction';
import { Breadcrumb, Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Logout from '@/Components/Logout';
function propertyList() {
  const accessToken = useSelector(
    (state) => state?.reducer?.user?.data?.accessToken
  );

  let [current, setCurrent] = useState(3);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProperties(accessToken));
  }, [accessToken, dispatch, current]);

  const state = useSelector((state) => state);
  let propertyList = state?.reducer?.property?.propertyData?.data;
  const loading = state?.reducer?.property?.status;

  const [data, setData] = useState();
  useEffect(() => {
    setData(propertyList);
  }, [propertyList]);

  let sendCurrent = getCurrent;
  sendCurrent(current);
  function handleLoadMore() {
    setCurrent(current + 3);
    sendCurrent(current);
  }

  const columns = [
    {
      title: 'Property Name',
      dataIndex: 'propertyName',
      key: 'propertyName',
      render: (_, record) => {
        return (
          <>
            <div className="property-name">
              <img src={record?._source?.companyLogo?.path} alt="" />
              {record?._source?.name}
            </div>{' '}
          </>
        );
      },
      width: '20%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (_, record) => {
        return <>{record?._source?.address}</>;
      },
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (_, record) => {
        return <>{record?._source?.currentCompanyName}</>;
      },
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Entity',
      dataIndex: 'entity',
      key: 'entity',
      render: (_, record) => {
        return <>{record?._source?.currentEntityName}</>;
      },
    },
    {
      title: 'Locations',
      dataIndex: 'locations',
      key: 'locations',
      render: (_, record) => {
        return <>{record?._source?.locationCount}</>;
      },
    },
    {
      title: 'Chargers',
      dataIndex: 'chargers',
      key: 'Chargers',
      render: (_, record) => {
        return <>{record?._source?.chargersCount}</>;
      },
    },
  ];

  return <>
    <div className="ant-table-property">
      <div className="property-navbar">
        
        <Breadcrumb
          items={[
            { title: <Link href="/welcome">Home</Link> },
            { title: <Link href="/propertyList">Property</Link> },
          ]}
        ></Breadcrumb>
        <div className="logout">
          <Logout />
        </div>
      </div>
      <div className="ant-table">
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          // loading={loading}
        ></Table>
      </div>
      <div className="load-more">
        <Button
          className="load-more-btn"
          onClick={handleLoadMore}
          loading={loading}
        >
          Load More
        </Button>
      </div>
    </div>
  </>;
}

export default propertyList;
