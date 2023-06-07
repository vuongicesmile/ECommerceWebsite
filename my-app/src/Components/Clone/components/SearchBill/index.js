import { useFetch } from '@/components/Fetch/useFetch';
import { input } from '@/components/Input';
import { label } from '@/components/Label';
import searchIcon from '@/pages/booking/bookingSearch/asset/search.svg';
import { Col, Radio, Row } from 'antd';
import moment from 'moment';
import { useEffect, useMemo, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useModel } from 'umi';
import { DatePickerSearchBill } from './DatePickerSearchBill';
import './searchBill.less';
//svg
import { groupBy, mapByKey, removeVietnameseTones } from '@/e2e/extensionMethod';
import selectIcon from './assets/select.svg';

const SearchBill = ({
  onOld,
  onChange,
  onTimeChange,
  onRowSelected,
  resetServicePaymentSelect,
  getTypeSearch,
  dataSetTypeSearch,
  rowActive,
}) => {
  const { currentBill } = useModel('bookingdata');
  const { systemDate } = useModel('systemdate');
  const { hotelData } = useModel('hoteldata');
  const searchBillStatus = [
    {
      title: 'Current',
      value: 'current',
    },
    {
      title: 'Old Booking',
      value: 'old',
    },
    {
      title: 'Virtual Room',
      value: 'virtual',
    },
  ];

  const getDateFromNow = (dayNum) => {
    const date = new Date(systemDate);
    date.setDate(new Date(systemDate).getDate() - dayNum);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const firstUpdate = useRef(true);
  const [showSelect, setShowSelect] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBillType, setSelectedBillType] = useState('current');
  const [title, setTitle] = useState('');
  const [numberShow, setNumberShow] = useState(25);
  const [searchCondition, setSearchCondition] = useState({
    searchInfo: '',
    from: '',
    to: '',
    typeSearch: selectedBillType,
  });
  const [dataSearch, setDataSearch] = useState([]);
  const { handleGetServicePayment } = useModel('foliofilterBillScreen');
  const searchBillRef = useRef();
  const containerInnerRef = useRef();
  const radioButtonRef = useRef();
  const selectRef = useRef();
  const { receiveData, receiveServicePayment, setReceiveServicePayment, setReceiveData } =
    useModel('receivesocket');

  const onScroll = () => {
    if (containerInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerInnerRef.current;
      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        dataSearch.length > 25 &&
        numberShow < dataSearch.length
      ) {
        setNumberShow(numberShow + 25);
      }
    }
  };

  const fetchData = (success, bookingId = '') => {
    let data = new FormData();
    data.append('searchInfo', searchCondition.searchInfo);
    data.append('from', searchCondition.from);
    data.append('to', searchCondition.to);
    data.append('typeSearch', searchCondition.typeSearch);
    data.append('bookingId', bookingId);

    useFetch(
      '/api/Bill/SearchBill',
      'POST',
      '',
      data,
      (res) => {
        let filterCheckoutGuest = res;

        if (
          searchCondition.from &&
          searchCondition.to &&
          moment(searchCondition.from) &&
          moment(searchCondition.to) &&
          searchCondition.typeSearch == 'current'
        )
          success(
            filterCheckoutGuest.filter((i) => {
              return (
                moment(i.ArrivalDate).isSameOrAfter(moment(searchCondition.from)) &&
                moment(i.ArrivalDate).isSameOrBefore(moment(searchCondition.to))
                // &&
                // moment(i.DepartureDate).isSameOrAfter(moment(searchCondition.from)) &&
                // moment(i.DepartureDate).isSameOrBefore(moment(searchCondition.to))
              );
            }),
          );
        else success(filterCheckoutGuest);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const receiveChangeServicePayment = (data) => {
    // const find = data.commonCustomerId.find((item) => item.bookingId == rowActive.CommonCustomerId);
    // if (find) {
    //   handleGetServicePayment(rowActive.CommonCustomerId);
    // }
    if (data.action != 'splitpayment' && data.action != 'splitbill') {
      let arrayBookingId = mapByKey(data.commonCustomerId, 'bookingId');
      if (searchCondition.typeSearch != 'old') {
        fetchData((res) => {
          if (rowActive) {
            let dataSourceSearch = res.filter((item) => item.BookingId == rowActive.BookingId);
            if (dataSourceSearch.length) onChange(dataSourceSearch);
          }
          // let dataFillter = res.filter((x) => !arrayBookingId.some((s) => s == x.bookingId));
          let temp = dataSearch.filter((item) => arrayBookingId.every((s) => s != item.BookingId));
          if (temp.length == 0) {
            setReceiveServicePayment(null);
            return;
          }
          // console.log(temp);
          setDataSearch(
            [...temp, ...res].sort((a, b) => {
              return b.BookingId - a.BookingId;
            }),
          );
          setReceiveServicePayment(null);
        }, arrayBookingId.join());
      }
    }
  };

  const receiveChangeSearchBill = (data) => {
    // if (searchCondition.typeSearch == 'current') {
    if (
      data.action == 'checkin' ||
      data.action == 'recheckin' ||
      data.action == 'update' ||
      data.action == 'create'
    ) {
      let arrayBookingId = mapByKey(data.rooms, 'bookingId');
      if (arrayBookingId.length && arrayBookingId[0] && searchCondition.typeSearch != 'old') {
        fetchData((res) => {
          if (rowActive) {
            let dataSourceSearch = res.filter((item) => item.BookingId == rowActive.BookingId);
            if (dataSourceSearch.length) onChange(dataSourceSearch);
          }
          let temp = dataSearch.filter((item) => arrayBookingId.every((s) => s != item.BookingId));
          if (temp.length == 0) {
            setReceiveData(null);
            return;
          }
          setDataSearch(
            [...temp, ...res].sort((a, b) => {
              return b.BookingId - a.BookingId;
            }),
          );
          setReceiveData(null);
        }, arrayBookingId.join());
        // fetchData((res) => {
        //   setDataSearch(res);
        // });
      }
    } else if (data.action == 'checkout' || data.action == 'recheckout') {
      fetchData((res) => {
        setDataSearch(res);
        // setReceiveData(null);
      });
    }
    // }
  };

  useEffect(() => {
    if (dataSetTypeSearch) {
      setSelectedBillType(dataSetTypeSearch);
    }
  }, [dataSetTypeSearch]);

  const sortData = useMemo(() => {
    let data = groupBy(
      dataSearch
        ?.filter((item) => {
          return (
            item.Room?.toLowerCase().includes(searchCondition.searchInfo.toLocaleLowerCase()) ||
            removeVietnameseTones(item.Guest)
              .toLowerCase()
              .includes(searchCondition.searchInfo.toLocaleLowerCase()) ||
            item.Guest.toLowerCase().includes(searchCondition.searchInfo.toLocaleLowerCase()) ||
            `#${item.BookingId}`
              ?.toString()
              .toLowerCase()
              .includes(searchCondition.searchInfo.toLocaleLowerCase()) ||
            removeVietnameseTones(item.BookingName)
              .toLowerCase()
              .includes(searchCondition.searchInfo.toLocaleLowerCase()) ||
            item.BookingName.toLowerCase().includes(searchCondition.searchInfo.toLocaleLowerCase())
          );
        })
        .slice(0, numberShow),
      'BookingId',
    );
    return Object.entries(data).sort((a, b) => b[0] - a[0]);
  }, [dataSearch, searchCondition.searchInfo, numberShow]);
  useEffect(() => {
    let titleSelect = searchBillStatus.find((x) => x.value == selectedBillType).title;
    setTitle(titleSelect);
    if (selectedBillType !== 'old') {
      setSearchCondition({ ...searchCondition, from: '', to: '', typeSearch: selectedBillType });
    } else {
      setSearchCondition({
        ...searchCondition,
        from: moment(new Date(getDateFromNow(365))).format('YYYY-MM-DD'),
        to: moment(new Date(getDateFromNow(0))).format('YYYY-MM-DD'),
        typeSearch: selectedBillType,
      });
    }

    if (getTypeSearch) {
      getTypeSearch(selectedBillType);
    }
  }, [selectedBillType]);

  useEffect(() => {
    setDataSearch(currentBill);

    const onClick = (e) => {
      if (!searchBillRef.current?.contains(e.target)) {
        containerInnerRef.current?.scrollTo(0, 0);
        setNumberShow(25);
        setIsDropdownOpen(false);
      }
      if (!radioButtonRef.current?.contains(e.target) && !selectRef.current?.contains(e.target)) {
        setShowSelect(false);
      }
    };
    document.addEventListener('mousedown', onClick);

    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  }, [currentBill]);

  useEffect(() => {
    if (!isDropdownOpen) {
      setSearchCondition({ ...searchCondition, searchInfo: '' });
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    fetchData((res) => {
      if (res) {
        setDataSearch(res);
      } else {
        setDataSearch([]);
      }
    });
  }, [searchCondition.from, searchCondition.to, searchCondition.typeSearch]);

  useEffect(() => {
    if (receiveData) receiveChangeSearchBill(receiveData);
  }, [receiveData]);

  useEffect(() => {
    if (receiveServicePayment) receiveChangeServicePayment(receiveServicePayment);
  }, [receiveServicePayment]);

  const handleSelectRow = (item, rowSelect) => {
    containerInnerRef.current?.scrollTo(0, 0);
    setIsDropdownOpen(false);
    if (item[0] !== 'null') {
      let filData = dataSearch.filter((x) => x.BookingId == item[0]);
      if (onChange) {
        onChange(filData);
      }
      if (onRowSelected) {
        handleGetServicePayment(rowSelect?.CommonCustomerId);
        onRowSelected(rowSelect);
      }
    } else {
      if (onChange) {
        onChange(item[1]);
      }
      if (onRowSelected) {
        handleGetServicePayment(rowSelect?.CommonCustomerId);
        onRowSelected(rowSelect);
      }
    }
  };

  useEffect(() => {
    // onChange([])
  }, [selectedBillType]);
  return (
    <div className="search-bill-component-container">
      <Row gutter={[16, 0]} style={{ marginBottom: '1px' }}>
        <Col xl={12} lg={15} md={16} sm={17} xs={18} ref={searchBillRef}>
          <div
            className="search-input"
            onClick={() => {
              setIsDropdownOpen(true);
            }}
          >
            <input.medium
              placeholder="Search"
              prefix={<img src={searchIcon} />}
              style={{
                borderRadius: isDropdownOpen ? '5px 5px 0 0' : '5px',
              }}
              value={searchCondition.searchInfo}
              onChange={(e) => {
                setSearchCondition({ ...searchCondition, searchInfo: e.target.value });
                containerInnerRef.current?.scrollTo(0, 0);
                setNumberShow(25);
              }}
            />

            <div
              ref={containerInnerRef}
              onScroll={onScroll}
              className={`dropdown-search-bill-container ${isDropdownOpen ? 'd-block' : 'd-none'}`}
              style={{
                height: '395px',
              }}
            >
              <div className="search-content">
                {dataSearch?.length === 0 ? (
                  <div
                    className="text-center p-3"
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}
                  >
                    No Data
                  </div>
                ) : dataSearch?.filter((item) => {
                    return (
                      item.Room?.toLowerCase().includes(
                        searchCondition.searchInfo.toLocaleLowerCase(),
                      ) ||
                      removeVietnameseTones(item.Guest)
                        .toLowerCase()
                        .includes(searchCondition.searchInfo.toLocaleLowerCase()) ||
                      `#${item.BookingId}`
                        ?.toString()
                        .toLowerCase()
                        .includes(searchCondition.searchInfo.toLocaleLowerCase()) ||
                      (removeVietnameseTones(item.BookingName)
                        .toLowerCase()
                        .includes(searchCondition.searchInfo.toLocaleLowerCase()) &&
                        item.GuestStatus !== 2) ||
                      item.Guest.toLowerCase().includes(
                        searchCondition.searchInfo.toLocaleLowerCase(),
                      ) ||
                      (item.Guest.toLowerCase().includes(
                        searchCondition.searchInfo.toLocaleLowerCase(),
                      ) &&
                        item.GuestStatus !== 2) ||
                      `#${item.BookingName}`
                        ?.toString()
                        .toLowerCase()
                        .includes(searchCondition.searchInfo.toLocaleLowerCase()) ||
                      (item.BookingName.toLowerCase().includes(
                        searchCondition.searchInfo.toLocaleLowerCase(),
                      ) &&
                        item.GuestStatus !== 2)
                    );
                  }).length === 0 ? (
                  <div
                    className="text-center p-3"
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}
                  >
                    No Data
                  </div>
                ) : (
                  sortData.map((item, index) => {
                    return (
                      <div key={index}>
                        {!item[1][0].Room && !item[1][0].Guest && (
                          <div
                            className="bkk-line d-flex align-items-center justify-content-start cursor-pointer"
                            style={{
                              background:
                                item[1][0].Status == 1 && selectedBillType == 'old'
                                  ? '#ffd6d6'
                                  : '',
                              borderBottom: '1px solid #ececec',
                              gap: '5px',
                              height: '40px',
                            }}
                            onMouseDown={() => handleSelectRow(item, item[1][0])}
                          >
                            <Row className="w-100">
                              <Col xl={2} lg={2} md={2} xs={3}>
                                <label.titlelg>BKK:</label.titlelg>
                              </Col>
                              <Col xl={3} lg={2} md={3} xs={4} style={{ paddingLeft: '10px' }}>
                                <label.titlelg>
                                  <Highlighter
                                    highlightClassName="highlight-class"
                                    searchWords={[searchCondition.searchInfo]}
                                    autoEscape={true}
                                    textToHighlight={
                                      (hotelData.prefixBookingId ? hotelData.prefixBookingId : '') +
                                      item[0]
                                    }
                                    highlightStyle={{ background: '#FFC069' }}
                                  />
                                </label.titlelg>
                              </Col>
                              <Col md={1} sm={0}></Col>
                              <Col xl={18} lg={19} md={18} xs={17}>
                                <label.titlelg>
                                  <Highlighter
                                    highlightClassName="highlight-class"
                                    searchWords={[searchCondition.searchInfo]}
                                    autoEscape={true}
                                    textToHighlight={item[1][0].BookingName}
                                    highlightStyle={{ background: '#FFC069' }}
                                  />
                                </label.titlelg>
                              </Col>
                            </Row>
                          </div>
                        )}
                        {item[1]
                          ?.filter((x) =>
                            selectedBillType == 'old' ? x.GuestStatus == 2 : x.GuestStatus != 2,
                          )
                          ?.map((childItem, childIndex) => {
                            return (
                              <div
                                className={`room-guest-line d-flex align-items-center justify-content-start cursor-pointer ${
                                  !childItem.Room && !childItem.Guest ? 'd-none' : 'd-block'
                                }`}
                                style={{
                                  borderBottom: '1px solid #ececec',
                                  gap: '10px',
                                  height: '40px',
                                  paddingLeft: '50px',
                                }}
                                key={childIndex}
                                onMouseDown={() => {
                                  handleSelectRow(
                                    item,
                                    item[1][
                                      selectedBillType == 'old' ? childIndex + 1 : childIndex
                                    ],
                                  );
                                }}
                              >
                                <Row className="w-100">
                                  <Col
                                    xl={3}
                                    lg={2}
                                    md={3}
                                    xs={4}
                                    className="d-flex justify-content-center align-items-center search-bill-label"
                                  >
                                    <label.titlelg>
                                      <Highlighter
                                        highlightClassName="highlight-class"
                                        searchWords={[searchCondition.searchInfo]}
                                        autoEscape={true}
                                        textToHighlight={childItem.Room ? childItem.Room : ''}
                                        highlightStyle={{ background: '#FFC069' }}
                                      />
                                    </label.titlelg>
                                  </Col>
                                  <Col span={2}>
                                    <div> | </div>
                                  </Col>
                                  <Col
                                    xl={19}
                                    lg={20}
                                    md={19}
                                    xs={18}
                                    className="d-flex justify-content-start align-items-center search-bill-label"
                                  >
                                    <label.titlelg>
                                      <Highlighter
                                        highlightClassName="highlight-class"
                                        searchWords={[searchCondition.searchInfo]}
                                        autoEscape={true}
                                        textToHighlight={childItem.Guest ? childItem.Guest : ''}
                                        highlightStyle={{
                                          background: '#FFC069',
                                        }}
                                      />
                                    </label.titlelg>
                                  </Col>
                                </Row>
                              </div>
                            );
                          })}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </Col>

        <Col xl={3} lg={4} md={5} sm={7} xs={6}>
          <div
            className={'search-select-radio w-100 h-100 ' + (showSelect ? 'border-active' : '')}
            onClick={() => {
              setShowSelect(!showSelect);
            }}
          >
            <span className="select-title">{title}</span>
            <span className="select-title">
              <img src={selectIcon}></img>
            </span>
          </div>
        </Col>
      </Row>

      <div
        ref={radioButtonRef}
        className={
          'content-search-container ' +
          (showSelect && selectedBillType == 'old'
            ? 'display-old-booking'
            : showSelect && selectedBillType != 'old'
            ? 'display'
            : 'd-none')
        }
      >
        <div className="d-flex justify-content-center mb-1">
          <Radio.Group
            buttonStyle="solid"
            value={selectedBillType}
            onChange={({ target: { value } }) => {
              setSelectedBillType(value);
              onChange([]);
              resetServicePaymentSelect(true);
              if (value == 'virtual') {
                setShowSelect(false);

                onOld ? onOld(false) : undefined;
              } else {
                onOld ? onOld(true) : undefined;
              }
            }}
          >
            {searchBillStatus.map((item, index) => {
              return (
                <Radio.Button value={item.value} key={index}>
                  {item.title}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </div>

        <div
          className={'content-old-booking ' + (selectedBillType != 'virtual' ? 'display' : 'hide')}
        >
          <DatePickerSearchBill
            ref={selectRef}
            dateValue={[searchCondition.from, searchCondition.to]}
            onChange={(start, end) => {
              let from = start ? moment(start).format('YYYY-MM-DD') : null;
              let to = end ? moment(end).format('YYYY-MM-DD') : null;
              setSearchCondition({ ...searchCondition, from: from, to: to });
              if (onTimeChange) onTimeChange(from, to);
            }}
            setShowSelect={setShowSelect}
          />
        </div>
      </div>
    </div>
  );
};
export default SearchBill;
