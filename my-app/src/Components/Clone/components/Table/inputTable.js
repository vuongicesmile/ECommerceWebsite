import React, { useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect } from 'react';
import { input } from '../Input';
import { useIntl, useModel } from 'umi';
import { Switch } from '@/components/Switch';
import { buttonList } from '@/components/Button';
import moment from 'moment';
import { timePicker } from '../timePicker';
import { select } from '@/components/Select';
import { DatePicker, TimePicker } from 'antd';
import { useFetch } from '../Fetch/useFetch';
import { formatNumber } from '@/e2e/extensionMethod';
import { datePicker } from '@/components/DatepickerMui';
import { Currency } from '@/components/Currency';
import props from './../../.umi/plugin-setting-drawer/SettingDrawer';
import RoomType from './../../pages/setting/roomDefine/roomTab/roomType';

const inputTable = {
  Row: React.forwardRef(
    (
      {
        onClick,
        column,
        data22,
        i,
        // bookingNumber,
        index,
        // oncheck,
        // onChange,
        className,
        // onload,
        // arrivalDate,
        // checkoutDate,
        // numOfDays,
      },
      ref,
    ) => {
      const rateref = useRef();
      const [disableDay, setDisable] = useState(i.dayUse == '1' ? true : false);
      const [ratedata, setRate] = useState(i.rate);
      const { formatDate } = useModel('defaultdata');
      const { systemDate } = useModel('systemdate');
      const [data3, setI] = useState(i);
      const [onchange, setonchange] = useState(true);
      const refDate = useRef([]);
      const { config } = useModel('defaultdata');
      const { company } = useModel('companydata');
      const { roomType, roomKind, roomTypeRoomKind } = useModel('roomdata');
      const { rateCode, bookingStatus } = useModel('bookingdata');
      const { dateBooking, updateDateBooking } = useModel('transferdata');
      const changeEdit = () => {
        i.addOrEdit == 0 && i.addOrEdit != 1 ? (i.addOrEdit = 2) : undefined;
      };

      const [aa, setAA] = useState({
        roomKind: '',
        roomType: '',
        rateCode: '',
        room: '',
      });
      useEffect(() => {
        setAA({
          roomKind: i.roomKind,
          roomType: i.roomType,
          rateCode: i.roomRateCode,
          room: i.room,
        });
      }, []);

      const refClick = useRef();
      const [filter, setFilter] = useState({
        roomTypeFilter: i.roomType,
        roomKindFilter: i.roomKind,
      });
      const [rateCodeFilter, setRatecode] = useState();
      const filterRate = () => {
        let rateCodeCompany = '';
        if (data22.travelAgency) {
          rateCodeCompany = company.find((item) => item.ma == data22.travelAgency)?.rateCode;
        }
        let array = [];
        if (rateCode) {
          rateCode.map((rate) => {
            if (
              moment(rate.beginDate).diff(moment(systemDate), 'days') <= 0 &&
              moment(rate.endDate).diff(moment(systemDate), 'days') >= 0
            ) {
              // if (
              //   i.kindRoomId == filter.roomKindFilter &&
              //   i.roomTypeId == filter.roomTypeFilter
              // ) {
              //   array.push(i);
              // } else if (
              //   i.kindRoomId == filter.roomKindFilter ||
              //   i.roomTypeId == filter.roomTypeFilter
              // ) {
              //   array.push(i);
              // } else if (i.kindRoomId == null && i.roomTypeId == null) {
              //   array.push(i);
              // }
              if (
                (rate.kindRoomId &&
                  rate.kindRoomId == i.roomKind &&
                  rate.roomTypeId == i.roomType) ||
                (!rate.kindRoomId && rate.roomTypeId == i.roomType)
              ) {
                if (rateCodeCompany) {
                  if (rateCodeCompany == rate.ma) array.push(rate);
                } else {
                  array.push(rate);
                }
              } else if (!rate.kindRoomId && !rate.roomTypeId) {
                array.push(rate);
              }
            }
          });
          setRatecode(array);
        }
      };
      useEffect(() => {
        filterRate();
      }, [filter, data22]);

      const [roomNo, setRoomNo] = useState([]);
      const getBlankRoom = () => {
        let formData = new FormData();
        formData.append('roomType', `${i.roomType}`);
        formData.append('roomKind', `${i.roomKind}`);
        formData.append('arrival', moment(i.arrivalDate).format('YYYY-MM-DD'));
        formData.append('checkout', moment(i.checkoutDate).format('YYYY-MM-DD'));

        useFetch(
          '/api/Booking/GetBlankRoom',
          'POST',
          null,
          formData,
          (res) => {
            let arr = [...res];
            {
              i.room ? arr.push({ Ma: i.room }) : undefined;
            }
            setRoomNo([{ Ma: 'None' }, ...arr]);
          },
          (error) => console.log(error),
        );
      };

      return (
        <tr className="hoverTable" key={index}>
          <td className="d-flex " style={{ gap: '10px' }}>
            {i.service && i.service.length > 0 ? (
              <div
                className={` tableOpen  `}
                style={{ marginLeft: '10px' }}
                onClick={() => onClick()}
              >
                <div className={className}></div>
                <div></div>
              </div>
            ) : undefined}

            {index + 1}
          </td>
          {column.map((j, index) =>
            j.dataIndex == 'roomType' ? (
              <td key={index}>
                {/* <inputTable.selectRoomType
                  onClickSetItem={(e)=>{ 
                    if(e != i.roomType)
                    {
                      setAA({...aa,rateCode:''}); i.roomRateCode=null}}
                    }
           
                  readOnly={i.userLock ? true : false}
                  changeEdit={() => {
                    changeEdit ? changeEdit(i) : undefined;
                  }}
                  value={i.roomType}
                  data={roomTypeRoomKind}
                  onChange={(value) => {
                    setFilter({ ...filter, roomTypeFilter: value });
                    i.roomType = value;
                  }}
                ></inputTable.selectRoomType> */}
                <select.group
                  allowClear={false}
                  readOnly={i.userLock ? true : false}
                  onChange={(value) => {
                    changeEdit ? changeEdit(i) : undefined;
                    i.roomType = value;
                    i.room = null;
                    i.roomKind = roomTypeRoomKind.find((i) => i.ma == value)?.roomKind[0].ma;
                    setAA({
                      ...aa,
                      room: 'Room no',
                      roomType: value,
                      roomKind: roomTypeRoomKind.find((i) => i.ma == value)?.roomKind[0].ma,
                    });
                    filterRate();
                  }}
                  value={aa.roomType}
                  placeholder="Room Type"
                >
                  {roomTypeRoomKind.map((i, index) => (
                    <select.option key={index} value={i.ma}>
                      {i.shortName}
                    </select.option>
                  ))}
                </select.group>
              </td>
            ) : j.dataIndex == 'roomKind' ? (
              <td key={index}>
                <select.group
                  allowClear={false}
                  readOnly={i.userLock ? true : false}
                  value={aa.roomKind}
                  onChange={(value) => {
                    changeEdit ? changeEdit(i) : undefined;

                    i.roomKind = value;

                    setAA({ ...aa, roomKind: value });
                    filterRate();
                  }}
                  placeholder="Room Kind"
                >
                  {config.find((item) => item.parameter == 'ShowAllRoomKind').value == '1'
                    ? roomKind.map((i, index) => (
                        <select.option key={index} value={i.ma}>
                          {i.roomKind}
                        </select.option>
                      ))
                    : roomTypeRoomKind
                        .find((i) => i.ma == aa.roomType)
                        ?.roomKind.map((i, index) => (
                          <select.option key={index} value={i.ma}>
                            {i.roomKind}
                          </select.option>
                        ))}
                </select.group>
                {/* <inputTable.selectRoomKind
                  onClickSetItem={(e)=>{        if(e != i.roomKind)
                    {
                      setAA({...aa,rateCode:''}); i.roomRateCode=null}}
                    }
                  readOnly={i.userLock ? true : false}
                  changeEdit={() => {
                    changeEdit ? changeEdit() : undefined;
                  }}
                  value={aa.roomKind}
                  data={roomTypeRoomKind.find((i) => i.ma == filter.roomTypeFilter)?.roomKind}
                  onChange={(value) => {
                    i.roomKind = value;
                    setFilter({ ...filter, roomKindFilter: value });
                  }}
                ></inputTable.selectRoomKind> */}
              </td>
            ) : j.dataIndex == 'room' ? (
              <td key={index}>
                <select.group
                  readOnly={
                    i.userLock != null ||
                    bookingStatus.find((i) => i.bookingStatusId == data22.bookingStatus)
                      ?.isAvailability == false
                      ? true
                      : false
                  }
                  onClick2={() => {
                    getBlankRoom();
                  }}
                  placeholder={aa.room}
                  value={aa.room}
                  onChange={(value) => {
                    i.room = value;
                    setAA({ ...aa, room: value });
                    changeEdit ? changeEdit() : undefined;
                  }}
                >
                  {roomNo
                    ? roomNo.map((i, index) => (
                        <select.option
                          className={`${i.Used ? 'onSelectRoom' : ''}`}
                          value={i.Ma == 'None' ? null : i.Ma}
                          key={index}
                        >
                          {i.Ma}
                        </select.option>
                      ))
                    : undefined}
                </select.group>
              </td>
            ) : j.dataIndex == 'arrivalDate' ? (
              <td key={index}>
                <datePicker.datePicker
                  // disabled={i.userLock ? true : false}
                  format={formatDate}
                  disabledDate={(d) =>
                    d.isBefore(dateBooking.arrivalDate) || d.isAfter(data3.checkoutDate)
                  }
                  minDate={moment(systemDate).format('YYYY/MM/DD')}
                  // maxDate={moment(data3.checkoutDate).format('YYYY/MM/DD')}
                  onChange={(e) => {
                    changeEdit ? changeEdit() : undefined;
                    i.arrivalDate = moment(e).format('YYYY-MM-DD');
                    if (
                      moment(i.checkoutDate, 'YYYY-MM-DD').diff(moment(e), 'days') < 0 ||
                      disableDay == true
                    ) {
                      i.numOfDays = 0;
                      i.checkoutDate = moment(e).format('YYYY-MM-DD');
                      setI({
                        ...data3,
                        checkoutDate: moment(e).format('YYYY-MM-DD'),
                        arrivalDate: moment(e).format('YYYY-MM-DD'),
                        numOfDays: 0,
                      });
                    } else {
                      i.numOfDays = moment(i.checkoutDate, 'YYYY-MM-DD').diff(moment(e), 'days');
                      setI({
                        ...data3,
                        arrivalDate: moment(e).format('YYYY-MM-DD'),
                        numOfDays: moment(i.checkoutDate, 'YYYY-MM-DD').diff(moment(e), 'days'),
                      });
                    }
                  }}
                  value={moment(data3.arrivalDate)}
                ></datePicker.datePicker>
              </td>
            ) : j.dataIndex == 'checkoutDate' ? (
              <td key={index}>
                <datePicker.datePicker
                  disabled={disableDay == true ? true : false}
                  format={formatDate}
                  minDate={moment(data3.arrivalDate).format('YYYY/MM/DD')}
                  // maxDate={moment(dateBooking.checkoutDate).format('YYYY/MM/DD')}
                  onChange={(e) => {
                    changeEdit ? changeEdit() : undefined;
                    i.checkoutDate = moment(e).format('YYYY-MM-DD');
                    i.numOfDays = moment(e).diff(moment(i.arrivalDate), 'days');
                    setI({
                      ...data3,
                      checkoutDate: moment(e).format('YYYY-MM-DD'),
                      numOfDays: moment(e).diff(moment(i.arrivalDate), 'days'),
                    });
                  }}
                  value={moment(data3.checkoutDate)}
                ></datePicker.datePicker>
              </td>
            ) : j.dataIndex == 'numOfDays' ? (
              <td key={index}>
                <input.number
                  // readOnly={i.userLock ? true : false}
                  min={0}
                  // max={moment(dateBooking.checkoutDate).diff(
                  //   moment(i.arrivalDate).format('YYYY-MM-DD'),
                  //   'days',
                  // )}
                  style={{ maxWidth: '100px' }}
                  clearAll={false}
                  onChange={(e) => {
                    changeEdit ? changeEdit() : undefined;
                    i.numOfDays = e;
                    i.checkoutDate = moment(i.arrivalDate).add(e, 'days').format('YYYY-MM-DD');

                    setI({
                      ...data3,
                      checkoutDate: moment(i.arrivalDate).add(e, 'days').format('YYYY-MM-DD'),
                      numOfDays: e,
                    });
                  }}
                  value={data3.numOfDays}
                ></input.number>
              </td>
            ) : j.dataIndex == 'rate' ? (
              <td key={index}>
                <input.number
                  formatter={formatNumber}
                  min={0}
                  readOnly={
                    rateCode.find((a) => a.ma == aa.rateCode)?.isEnable == false ? true : false
                  }
                  ref={rateref}
                  value={ratedata}
                  clearAll={false}
                  onChange={(e) => {
                    i.rate = e;
                    setRate(e);
                    changeEdit ? changeEdit() : undefined;
                  }}
                ></input.number>

                {/* <inputTable.number
                  changeEdit={() => {
                    changeEdit ? changeEdit() : undefined;
                  }}
                  getValue={i.rate}
                  onChange={(value) => {
                    i.rate = value;
                  }}
                ></inputTable.number> */}
              </td>
            ) : j.dataIndex == 'roomRateCode' ? (
              <td key={index}>
                <select.group
                  value={aa.rateCode}
                  onChange={(value) => {
                    setAA({ ...aa, rateCode: value });
                    i.roomRateCode = value;
                    changeEdit ? changeEdit() : undefined;
                    if (value && rateCode.find((i) => i.ma == value)) {
                      setRate(rateCode.find((i) => i.ma == value)?.rate);
                      i.rate = rateCode.find((i) => i.ma == value)?.rate;
                    }
                    if (!value) {
                      setRate(0);
                      i.rate = 0;
                    }
                  }}
                  placeholder={'Rate Code'}
                >
                  {rateCodeFilter?.map((i, index) => (
                    <select.option key={index} value={i.ma}>
                      {i.ma}
                    </select.option>
                  ))}
                </select.group>
                {/* <inputTable.selectRateCode
                onchange={onchange}
                  changeEdit={() => {
                    changeEdit ? changeEdit() : undefined;
                  }}
                  value={aa.roomRateCode}
                  aa={aa}
                  data={rateCodeFilter}
                  onChange={(value) => {
                    i.roomRateCode = value;

                    if (rateCode.find((i) => i.ma == value)) {
                      setRate(rateCode.find((i) => i.ma == value)?.rate);
                      i.rate = rateCode.find((i) => i.ma == value)?.rate;
                    }
                  }}
                ></inputTable.selectRateCode> */}
              </td>
            ) : j.dataIndex == 'adult' ? (
              <td key={index}>
                <inputTable.number
                  changeEdit={() => {
                    changeEdit ? changeEdit() : undefined;
                  }}
                  getValue={i.adult}
                  onChange={(value) => {
                    i.adult = value;
                  }}
                ></inputTable.number>
              </td>
            ) : j.dataIndex == 'child' ? (
              <td key={index}>
                <inputTable.number
                  changeEdit={() => {
                    changeEdit ? changeEdit() : undefined;
                  }}
                  getValue={i.child}
                  onChange={(value) => {
                    i.child = value;
                  }}
                ></inputTable.number>
              </td>
            ) : j.dataIndex == 'breakfast' ? (
              <td key={index}>
                <inputTable.switch
                  changeEdit={() => {
                    changeEdit ? changeEdit() : undefined;
                  }}
                  value={i.breakfast}
                  onChange={(value) => {
                    i.breakfast = value ? 1 : 0;
                  }}
                ></inputTable.switch>
              </td>
            ) : j.dataIndex == 'extraBed' ? (
              <td key={index}>
                <inputTable.number
                  changeEdit={() => {
                    changeEdit ? changeEdit() : undefined;
                  }}
                  getValue={i.extraBed}
                  onChange={(value) => {
                    i.extraBed = value;
                  }}
                ></inputTable.number>
              </td>
            ) : j.dataIndex == 'extraBedRate' ? (
              <td key={index}>
                <inputTable.number
                  changeEdit={() => {
                    changeEdit ? changeEdit() : undefined;
                  }}
                  getValue={i.extraBedRate}
                  onChange={(value) => {
                    i.extraBedRate = value;
                  }}
                ></inputTable.number>
              </td>
            ) : j.dataIndex == 'dayUse' ? (
              <td key={index}>
                <inputTable.switch
                  changeEdit={() => {
                    changeEdit ? changeEdit() : undefined;
                  }}
                  value={i.dayUse}
                  onChange={(value) => {
                    i.dayUse = value ? '1' : '0';
                    if (value) {
                      setDisable(true);
                      i.checkoutDate = i.arrivalDate;
                      setI({
                        ...data3,
                        checkoutDate: data3.arrivalDate,
                        numOfDays: 0,
                      });
                    } else {
                      setDisable(false);
                    }
                  }}
                ></inputTable.switch>
              </td>
            ) : j.dataIndex == 'specialRequest' ? (
              <td key={index}>
                <buttonList.normal title={'Special Request'}></buttonList.normal>
              </td>
            ) : j.dataIndex == 'arrivalTime' ? (
              <td key={index}>
                <timePicker.timePicker
                  onChange={(e) => {
                    changeEdit ? changeEdit() : undefined;
                    i.arrivalTime = moment(e, 'HH:mm').format('HH:mm');
                  }}
                  format={'HH:mm'}
                  value={moment(i.arrivalTime, 'HH:mm')}
                ></timePicker.timePicker>
              </td>
            ) : j.dataIndex == 'overBook' ? (
              <td key={index}></td>
            ) : j.dataIndex == 'roomStatus' ? (
              <td key={index}></td>
            ) : j.dataIndex == 'ma' ? (
              <td key={index}>{i.ma}</td>
            ) : j.dataIndex == 'totalRate' ? (
              <td key={index}></td>
            ) : undefined,
          )}
        </tr>
      );
    },
  ),

  number: ({ changeEdit, getValue, onChange, suffix, ref }) => {
    const [value, setValue] = useState();

    useEffect(() => {
      setValue(getValue);
    }, []);
    useEffect(() => {
      onChange ? onChange(value) : undefined;
    }, [value]);

    return (
      <input.number
        formatter={formatNumber}
        min={0}
        ref={ref}
        clearAll={false}
        value={value}
        suffix={suffix}
        onChange={(e) => {
          setValue(e);
          changeEdit ? changeEdit() : undefined;
        }}
      ></input.number>
    );
  },
  selectRoomKind: ({ changeEdit, value, onChange, data, readOnly, onClickSetItem }) => {
    const [value2, setValue] = useState('');
    useEffect(() => {
      setValue(value);
    }, []);
    useEffect(() => {
      value2 != '' ? setValue() : undefined;
    }, [data]);
    useEffect(() => {
      onChange ? onChange(value2) : undefined;
    }, [value2]);
    return data ? (
      <>
        <select.group
          onClickSetItem={onClickSetItem}
          readOnly={readOnly}
          value={value2}
          allowClear={false}
          onChange={(e) => {
            setValue(e);
            changeEdit ? changeEdit() : undefined;
          }}
          placeholder="Room Kind"
        >
          {data?.map((i, index) => (
            <select.option key={index} value={i.ma}>
              {i.roomKind}
            </select.option>
          ))}
        </select.group>
      </>
    ) : (
      <></>
    );
  },
  selectRoomType: ({ changeEdit, value, onChange, data, readOnly, onClickSetItem }) => {
    const [value2, setValue] = useState('');

    useEffect(() => {
      setValue(value);
    }, []);

    useEffect(() => {
      onChange ? onChange(value2) : undefined;
    }, [value2]);
    return (
      <>
        <select.group
          onClickSetItem={onClickSetItem}
          readOnly={readOnly}
          allowClear={false}
          value={value2}
          onChange={(e) => {
            setValue(e);

            changeEdit ? changeEdit() : undefined;
          }}
          placeholder="Room type"
        >
          {data?.map((i, index) => (
            <select.option key={index} value={i.ma}>
              {i.roomType}
            </select.option>
          ))}
        </select.group>
      </>
    );
  },
  selectRateCode: ({ changeEdit, value, onChange, data, onchange, aa }) => {
    const [value2, setValue] = useState('');

    return data ? (
      <select.group
        value={aa.roomRateCode}
        onChange={(e) => {
          onChange ? onChange(e) : undefined;

          changeEdit ? changeEdit() : undefined;
        }}
        placeholder={'Rate Code'}
      >
        {data?.map((i, index) => (
          <select.option key={index} value={i.ma}>
            {i.ma}
          </select.option>
        ))}
      </select.group>
    ) : (
      <></>
    );
  },
  switch: ({ changeEdit, value, onChange, data }) => {
    const [value2, setValue] = useState();
    useEffect(() => {
      setValue(value == '0' || value == 0 ? false : value == '1' || value == 1 ? true : value);
    }, []);
    useEffect(() => {
      onChange(value2);
    }, [value2]);

    return (
      <Switch
        onClick={(e) => {
          setValue(e);
          changeEdit ? changeEdit() : undefined;
        }}
        value={value2}
      ></Switch>
    );
  },
  switchNumber: ({ changeEdit, value, onChange, data }) => {
    const [value2, setValue] = useState();

    useEffect(() => {
      setValue(value == '0' ? false : true);
    }, []);
    useEffect(() => {
      onChange(value2);
    }, [value2]);

    return (
      <Switch
        onClick={(e) => {
          setValue(e);
          changeEdit ? changeEdit() : undefined;
        }}
        value={value}
      ></Switch>
    );
  },
  datePicker: ({ changeEdit, value, onChange, data }) => {
    const [value2, setValue] = useState();

    useEffect(() => {
      setValue(value);
    }, []);
    useEffect(() => {
      onChange ? onChange(value2) : undefined;
    }, [value]);

    return (
      <DatePicker
        value={moment(value)}
        onChange={(e) => {
          setValue(moment(e).format('YYYY-MM-DD'));
          changeEdit ? changeEdit() : undefined;
        }}
      ></DatePicker>
    );
  },
};

export { inputTable };
