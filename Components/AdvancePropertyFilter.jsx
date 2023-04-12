import { Button, Drawer, Select } from 'antd';
import axios from 'axios';
import debounce from 'lodash.debounce';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const AdvancePropertyFilter = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const accessToken = useSelector(
    (state) => state?.reducer?.user?.data?.accessToken
  );
  const showDrawer = () => {
    setDrawerOpen(true);
  };
  const onClose = () => {
    setDrawerOpen(false);
  };

  const [companyData, setCompanyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchText, setSearchText] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    console.log('----', searchText);
    axios
      .get(
        `https://test-api.chargeonsite.com/company?pageSize=${pageSize}&current=${currentPage}&search=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setCompanyData(response?.data);
        setHasMore(response.data.pages > currentPage);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [currentPage, pageSize, searchText, accessToken]);

  const loadMore = () => {
    if (pageSize > companyData?.count?.scannedCount) {
      return;
    }
    setIsLoading(true);

    if (pageSize <= companyData?.count?.scannedCount)
      setPageSize(pageSize + 20);
    axios
      .get(
        `https://test-api.chargeonsite.com/company?pageSize=${pageSize}&current=${currentPage}&search=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setCompanyData([...data, ...response.data.list]);
        setHasMore(response.data.pages > currentPage + 1);
        setCurrentPage(currentPage + 1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollHeight - scrollTop === clientHeight) {
      loadMore();
    }
  };
  const handleSearch = debounce((value = '') => {
    console.log('search', value);
    setSearchText(value);
    // setCurrentPage(1);
  }, 2000);
  return (
    <div>
      <Button className="load-more-btn" onClick={showDrawer}>
        Add Advance Filter
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={drawerOpen}
        width={600}
        className="advance-filter-drawer"
      >
        <div className="property-info">
          <Select
            mode="multiple"
            allowClear
            placeholder="Select"
            style={{ width: '100%' }}
            onSearch={handleSearch}
            onPopupScroll={handleScroll}
          >
            {companyData?.data?.map((item) => (
              <Select.Option key={item?.count?.scannedCount}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Drawer>
    </div>
  );
};
