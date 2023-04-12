import { Button, Drawer, Input, Select } from 'antd';
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
  }, [currentPage, searchText, accessToken]);

  const loadMore = () => {
    if (pageSize > companyData?.count?.scannedCount) {
      return;
    }
    setIsLoading(true);

    console.log('page size', pageSize);
    if (pageSize <= companyData?.count?.scannedCount) {
      setPageSize(pageSize + 20);
    }
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
        setCompanyData([...companyData, ...response?.data]);
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
    setPageSize(companyData?.count?.scannedCount);
  }, 1000);

  const handleOnClear = () => {
    console.log('Clear');
    setPageSize(20);
    setSearchText('');
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
  };

  const handleOnchange = (value) => {
    console.log('onchange', value);
    
    if (value.length <= 0) {
      console.log('onchange api call');
      setPageSize(20);
    setSearchText('');
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
    }
  };
  const handleOnMouseLeave =() => {
    console.log('onMouseLeave');
    

      setPageSize(20);
    setSearchText('');
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
    
  };

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
        width={800}
        className="advance-filter-drawer"
      >
        <div className="property-info">
          <p>Company</p>
          <Select
            mode="multiple"
            allowClear
            placeholder="Select"
            style={{ width: '85%' }}
            onSearch={handleSearch}
            onPopupScroll={handleScroll}
            loading={isLoading}
            onClear={handleOnClear}
            onChange={handleOnchange}
            // maxTagCount={3}
            virtual={false}
            onMouseLeave={handleOnMouseLeave}
          >
            {companyData?.data?.map((item) => {
              return (
                <Select.Option
                  key={item?.id}
                  value={item?.name}
                ></Select.Option>
              );
            })}
          </Select>

          
        </div>
      </Drawer>
    </div>
  );
};
