import { fetchCompanies } from '@/Redux/AdvanceFilter/Company/companyAction';
import { Button, Drawer, Select } from 'antd';
import debounce from 'lodash.debounce';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';

export const AdvancePropertyFilterRedux = () => {
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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(
      fetchCompanies({ accessToken, searchText, pageSize, currentPage })
    );
  }, [accessToken, dispatch,searchText]);
  const companyData = state?.reducer?.company?.companyData;
  const totalDataCount =
    state?.reducer?.company?.companyData?.count?.scannedCount;

  const status = state?.reducer?.company?.status;
  const loadMore = () => {
    if (pageSize > totalDataCount) {
      return;
    }

    if (pageSize <= totalDataCount) {
      setPageSize(pageSize + 20);
      dispatch(
        fetchCompanies({ accessToken, searchText, pageSize, currentPage })
      );
    }
  };

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollHeight - scrollTop === clientHeight) {
      loadMore();
    }
  };

  const handleSearch = debounce((value = '') => {
    dispatch(
      fetchCompanies({ accessToken, searchText:value, pageSize, currentPage })
    );
  }, 500);

  const handleOnClear = () => {
    setPageSize(20);
    setSearchText('');
    dispatch(
      fetchCompanies({ accessToken, searchText, pageSize, currentPage })
    );
  };

  const handleOnchange = (value) => {
    console.log("onChange");
    if (value.length <= 0) {
      setPageSize(20);
      setSearchText('');
      dispatch(
        fetchCompanies({ accessToken, searchText, pageSize, currentPage })
      );
    }
  };
  const handleOnMouseLeave = () => {
    setPageSize(20);
    setSearchText('');
    dispatch(
      fetchCompanies({ accessToken, searchText, pageSize, currentPage })
    );
  };
  const customCloseIcon = (
    <div style={{ position: 'absolute', top: 20, right: 12 }}>
      <CloseOutlined onClick={onClose} />
    </div>
  );
  return (
    <div>
      <Button className="load-more-btn" onClick={showDrawer}>
        Add Advance Filter
      </Button>
      <Drawer
        title="Advanced Filter"
        placement="right"
        onClose={onClose}
        open={drawerOpen}
        width={800}
        className="advance-filter-drawer"
        closeIcon={customCloseIcon}
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
            loading={status}
            onClear={handleOnClear}
            onChange={handleOnchange}
            maxTagCount={3}
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
