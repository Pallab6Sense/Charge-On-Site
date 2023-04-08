/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  fetchProperties,
  getCurrent,
} from '@/Redux/PropertyList/propertyAction';
import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (_, record) => {
        return <>{record?._source?.address}</>;
      },
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (_, record) => {
        return <>{record?._source?.currentCompanyName}</>;
      },
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

  return (
    <>
      <div className="ant-table-property">
        <Table dataSource={data} columns={columns} pagination={false}></Table>
        <div className="load-more">
          <Button className="load-more-btn" onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      </div>
    </>
  );
}

export default propertyList;
