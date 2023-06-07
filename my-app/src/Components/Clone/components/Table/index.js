import React, { useState, useEffect, useMemo, useRef } from 'react';
import { input } from '../Input';
import { useIntl, useModel } from 'umi';
import { Switch } from '@/components/Switch';
import { buttonList } from '@/components/Button';
import moment from 'moment';
import { notification } from '@/components/Notification';
import ClickMenu from '@/components/RightClickMenu';
import { select } from '../Select';
import { createPortal } from 'react-dom';
import { Slider } from 'antd';
import { useFetch } from '../Fetch/useFetch';
import { formatNumber } from '@/e2e/extensionMethod';
import { inputTable } from './inputTable';
import './table.less';
import { Decimal } from 'decimal.js';
const Table = ({
  selectMultiRoomInhouse,
  listbutton,
  uploadTotal,
  data22,
  clearRoom,
  useGetRoomDetails,
  roomDetails,
  selectMultiRoom,
  numberRoom,
  update,
  showAll,
  search,
  status,
  abc,
  edit,
  bookingNumber,
  column,
  valueFilter,
  onClearRoom,
}) => {
  const intl = useIntl();
  const { systemDate } = useModel('systemdate');
  const { updateSameDay } = useModel('transferdata');
  const numberRef = useRef();
  const refcheckAll = useRef([]);

  const refInhouse = useRef([]);
  const refNoshow = useRef([]);
  const refCheckout = useRef([]);
  const refInhouseColor = useRef([]);
  const refCheckoutColor = useRef([]);
  const refNoshowColor = useRef([]);
  const { rateCode, specialRequest } = useModel('bookingdata');
  const { company } = useModel('companydata');
  const refCheckin = useRef([null]);
  const refCheckinColor = useRef([null]);
  const [data, setData] = useState([]);
  const [checkin, setCheckinall] = useState(0);
  const [rateCodeFilter, setRatecode] = useState();
  const [roomcode, setRoomcode] = useState({
    roomcode: [],
    roomcodeGroup: {
      checkin: [],
      inHouse: [],
      noShow: [],
    },
  });
  const delExtra = (i) => {
    useFetch(
      `/api/Booking/DeleteExtraService`,
      'DELETE',
      'application/json',
      JSON.stringify({
        ...i,
        date: moment(i.date).format('YYYY-MM-DD'),
      }),
      (res) => {
        if (res.success == 1) {
          notification.success(intl.formatMessage({ id: res.mess }));
          update();
        } else if (res.success == 0) {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };
  const [roomNo, setRoomNo] = useState([]);
  const getBlankRoom = (a, b, c, d) => {
    let formData = new FormData();
    formData.append('roomType', `${a}`);
    formData.append('roomKind', `${b}`);
    formData.append('arrival', moment(c).format('YYYY-MM-DD'));
    formData.append('checkout', moment(d).format('YYYY-MM-DD'));

    useFetch(
      '/api/Booking/GetBlankRoom',
      'POST',
      null,
      formData,
      (res) => {
        setRoomNo([{ Ma: 'None' }, ...res]);
      },
      (error) => console.log(error),
    );
  };
  const [groupbooking, setGroupbooking] = useState([
    intl.formatMessage({ id: 'pages.booking.table.group.reservation' }),
    '1',
    intl.formatMessage({ id: 'pages.booking.table.group.inhouse' }),
    '1',
    intl.formatMessage({ id: 'pages.booking.table.group.checkout' }),
    '1',
    intl.formatMessage({ id: 'pages.booking.table.group.delete' }),
    '1',
    intl.formatMessage({ id: 'pages.booking.table.group.noshow' }),
    '1',
    intl.formatMessage({ id: 'pages.booking.table.group.roomchanged' }),
    '1',
  ]);

  const { service } = useModel('hoteldata');
  const columnService = [
    {
      title: intl.formatMessage({ id: 'pages.booking.table.date' }),
      dataIndex: 'date',
      key: 'date',
      render: (a, b, c) => <>{moment(c).format('DD-MM-YYYY')}</>,
    },
    {
      title: intl.formatMessage({ id: 'pages.booking.table.service' }),
      dataIndex: 'serviceId',
      key: 'serviceId',
      render: (a, b, c) => (
        <>
          {service && service.find((i) => i.ma == c)
            ? service.find((i) => i.ma == c).service
            : undefined}
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'pages.booking.table.RoomRate' }),
      dataIndex: 'roomRateCode',
      key: 'roomRateCode',
      render: (a, b, c, d, e, f) => (
        <>
          {a.serviceId == 'RM' &&
          e.status != 2 &&
          e.status != 3 &&
          e.status != 4 &&
          e.status != 5 &&
          moment(a.date).diff(moment(systemDate), 'days') >= 0 ? (
            <select.group
              onChange={(e) => {
                a.roomRateCode = e;
                updateService2(a, b);
              }}
              value={a.roomRateCode}
              width={'200px'}
              placeholder="Rate Code"
            >
              {filterRate(f.roomType, f.roomKind).map((i, index) => (
                <select.option key={index} value={i.ma}>
                  {i.ma}
                </select.option>
              ))}
            </select.group>
          ) : (
            <span>{rateCode.find((i) => i.ma == a.roomRateCode)?.description}</span>
          )}
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'pages.booking.table.soluong' }),
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: intl.formatMessage({ id: 'pages.booking.table.rate' }),
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'GIT/FIT',
      dataIndex: 'isRoom',
      key: 'isRoom',
      render: (a, b, c, d, e) => {
        return (
          <>
            <Switch
              readOnly={
                moment(a.date).diff(moment(systemDate), 'days') >= 0 &&
                e.status != 2 &&
                e.status != 3 &&
                e.status != 5
                  ? false
                  : true
              }
              onClick={(value) => {
                a.isRoom = value ? 1 : 0;
                updateServiceSelect(a, b);
                // setTimeout(() => {
                //   update();
                // }, 400);
              }}
              value={c == 1 ? true : false}
              title1={'GIT'}
              title2={'FIT'}
            ></Switch>
          </>
        );
      },
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',

      render: (a, b, c, d, e) => {
        if (e.status != 2 && e.status != 3 && e.status != 5) {
          return (
            <div
              onClick={() => {
                delExtra(a);
              }}
            >
              Delete
            </div>
          );
        }
      },
    },
  ];
  const [active, setActive] = useState([
    {
      active: false,
      code: 1,
      onCancel: false,
    },
  ]);

  useEffect(() => {
    let arr = [...data];
    let arr2 = [...data];
    if (roomDetails.length < data.length || (edit != 2 && edit != 1)) {
      arr2 = [];
      arr = [];
    }
    setData([]);
    if (roomDetails) {
      roomDetails?.map((i, index) => {
        let total = 0;
        if (i.service) {
          i.service.map((i) => {
            total = new Decimal(i.total).plus(total);
          });
        }
        i.totalRate = total;
        if (index > arr.length - 1)
          arr2.push({
            ...i,
            status: i.status == 100 ? 5 : i.status,
            onEdit: false,
            code: index,
          });

        i.service?.map((j) => {
          j.editRate = false;
          j.editNumber = false;
        });
      });
    }

    search != ''
      ? (arr2 = arr2.filter((i) => (i.room ? i.room.includes(search) : undefined)))
      : undefined;
    if (valueFilter != 0) {
      arr2 = arr2.filter((x) =>
        x.service?.some((i) => valueFilter.split(',').some((j) => j == i.serviceId)),
      );
    }
    arr2.map((i, index) => {
      i.code = index;
      arr.push({
        active: index == numberRef.current ? true : false,
        code: i.code,
        onCancel: false,
      });
    });

    setActive(arr);
    setData(arr2);
  }, [roomDetails, abc, search, valueFilter]);

  const filterRate = (roomType, roomKind) => {
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
            (rate.kindRoomId && rate.kindRoomId == roomKind && rate.roomTypeId == roomType) ||
            (!rate.kindRoomId && rate.roomTypeId == roomType)
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
    }
    return array;
  };

  // const updateServiceRoomRate = (e) => {
  //   useFetch(
  //     '/api/Booking/UpdateServiceRoom',
  //     'post',
  //     'application/json',
  //     JSON.stringify({
  //       ...e,
  //       quantity: parseFloat(e.quantity),
  //       total: parseFloat(e.total),
  //       maHDService: e.maHDService ? parseFloat(e.maHDService) : 0,
  //       detailId: e.detailId ? parseFloat(e.detailId) : 0,
  //     }),
  //     (res) => {
  //       if (res.success == 1) {
  //         notification.success(intl.formatMessage({ id: res.mess }));
  //       } else {
  //         notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
  //       }
  //     },
  //     (error) => console.log(error),
  //   );
  // };
  const updateService2 = (e, index, c) => {
    useFetch(
      '/api/Booking/UpdateServiceRoom',
      'post',
      'application/json',
      JSON.stringify({
        ...e,
        quantity: e.quantity,
        total: rateCode.find((i) => i.ma == e.roomRateCode).rate,
        maHDService: e.maHDService ? parseFloat(e.maHDService) : 0,
        detailId: e.detailId ? parseFloat(e.detailId) : 0,
      }),
      (res) => {
        if (res.success == 1) {
          notification.success(intl.formatMessage({ id: res.mess }));
          update();
        } else {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
          update();
        }
      },
      (error) => console.log(error),
    );
  };
  const updateService = (e, index, c) => {
    useFetch(
      '/api/Booking/UpdateServiceRoom',
      'post',
      'application/json',
      JSON.stringify({
        ...e,
        quantity: e.quantity,
        total: e.total,
        maHDService: e.maHDService ? parseFloat(e.maHDService) : 0,
        detailId: e.detailId ? parseFloat(e.detailId) : 0,
      }),
      (res) => {
        if (res.success == 1) {
          notification.success(intl.formatMessage({ id: res.mess }));
          data[index].service[e.index] = e;
          // uploadTotal();
          setTimeout(() => {
            update();
          }, 200);
        } else {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
        }
      },
      (error) => console.log(error),
    );
  };
  const updateServiceSelect = (e, index) => {
    useFetch(
      '/api/Booking/UpdateServiceRoom',
      'post',
      'application/json',
      JSON.stringify({
        ...e,
        quantity: e.quantity,
        total: e.total,
        maHDService: e.maHDService ? parseFloat(e.maHDService) : 0,
        detailId: e.detailId ? parseFloat(e.detailId) : 0,
      }),
      (res) => {
        if (res.success == 1) {
          notification.success(intl.formatMessage({ id: res.mess }));
          data[index].service[e.index] = e;
        } else {
          notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
          update();
        }
      },
      (error) => console.log(error),
    );
  };

  useEffect(() => {
    updateSameDay();
    edit == 1 ? setData([]) : undefined;
    edit != 0 ? setCheckinall(0) : undefined;
  }, [edit]);

  useEffect(() => {
    refCheckin.current?.map((i, index) => {
      refCheckin.current[index] ? (refCheckin.current[index].checked = false) : undefined;
    });
    refInhouse.current?.map((i, index) => {
      refInhouse.current[index] ? (refInhouse.current[index].checked = false) : undefined;
    });
    refCheckout.current?.map((i, index) => {
      refCheckout.current[index] ? (refCheckout.current[index].checked = false) : undefined;
    });
    refNoshow.current?.map((i, index) => {
      refNoshow.current[index] ? (refNoshow.current[index].checked = false) : undefined;
    });
    roomcode.roomcode = [];
    oncheck();
    let format = [...data];
    format?.map((i) => {
      i.checkoutDate = moment(i.checkoutDate).format('YYYY-MM-DD');
      i.arrivalDate = moment(i.arrivalDate).format('YYYY-MM-DD');
    });
    useGetRoomDetails(data);
    let arr = document.querySelectorAll(`.serviceOpen${bookingNumber}`);
    for (let i = 0; i < arr?.length; i++) {
      arr[i].style.height = '0px';
    }
    refCheckin.current?.map((i) => {
      i ? (i.checked = false) : undefined;
    });
    refNoshow.current?.map((i) => {
      i ? (i.checked = false) : undefined;
    });
    setCheckinall(0);
    updateSameDay();
  }, [data]);

  const oncheck = () => {
    clearRoom();
    selectMultiRoom(roomcode.roomcode.filter((i) => i != undefined));

    let arrDay = [];
    let sameDay = { arrivalDate: '', checkoutDate: '' };
    onClearRoom ? onClearRoom() : undefined;
    if (
      refCheckin.current[0] ||
      refInhouse.current[0] ||
      refNoshow.current[0] ||
      refCheckout.current[0]
    ) {
      let a = 1;
      let b = 1;
      let c = 1;
      let d = 1;
      refCheckin.current?.map((i, index) => {
        if (i && i.checked == true) {
          refCheckinColor.current[index]?.classList.add('onSelect');
        } else {
          refCheckinColor.current[index]?.classList.remove('onSelect');
        }
        i ? (i.checked ? a++ : undefined) : undefined;
        data?.length > 0 && i
          ? i.checked
            ? arrDay.push({
                arrivalDate: data[index].arrivalDate,
                checkoutDate: data[index].checkoutDate,
              })
            : undefined
          : undefined;
      });
      refInhouse.current?.map((i, index) => {
        if (i && i.checked == true) {
          refInhouseColor.current[index]?.classList.add('onSelect');
        } else {
          refInhouseColor.current[index]?.classList.remove('onSelect');
        }
        i ? (i.checked ? b++ : undefined) : undefined;
      });
      refCheckout.current?.map((i, index) => {
        if (i && i.checked == true) {
          refCheckoutColor.current[index]?.classList.add('onSelect');
        } else {
          refCheckoutColor.current[index]?.classList.remove('onSelect');
        }
        i ? (i.checked ? d++ : undefined) : undefined;
      });
      refNoshow.current?.map((i, index) => {
        if (i && i.checked == true) {
          refNoshowColor.current[index]?.classList.add('onSelect');
        } else {
          refNoshowColor.current[index]?.classList.remove('onSelect');
        }
        i ? (i.checked ? c++ : undefined) : undefined;
      });

      if (refcheckAll.current[0]) {
        if (a > 1) {
          if (a == refCheckin.current.filter((i) => i != null)?.length + 1) {
            refcheckAll.current[0].checked = true;
            refcheckAll.current[0].classList.remove('checkboxall');
          } else {
            refcheckAll.current[0].checked = true;
            refcheckAll.current[0].classList.add('checkboxall');
          }
        } else {
          refcheckAll.current[0].checked = false;
          refcheckAll.current[0].classList.add('checkboxall');
        }
      }
      if (refcheckAll.current[1]) {
        if (b > 1) {
          if (b == refInhouse.current.filter((i) => i != null)?.length + 1) {
            refcheckAll.current[1].checked = true;
            refcheckAll.current[1].classList.remove('checkboxall');
          } else {
            refcheckAll.current[1].checked = true;
            refcheckAll.current[1].classList.add('checkboxall');
          }
        } else {
          refcheckAll.current[1].checked = false;
          refcheckAll.current[1].classList.add('checkboxall');
        }
      }
      if (refcheckAll.current[2]) {
        if (c > 1) {
          if (c == refNoshow.current.filter((i) => i != null)?.length + 1) {
            refcheckAll.current[2].checked = true;
            refcheckAll.current[2].classList.remove('checkboxall');
          } else {
            refcheckAll.current[2].checked = true;
            refcheckAll.current[2].classList.add('checkboxall');
          }
        } else {
          refcheckAll.current[2].checked = false;
          refcheckAll.current[2].classList.add('checkboxall');
        }
      }
      if (refcheckAll.current[4]) {
        if (d > 1) {
          if (d == refCheckout.current.filter((i) => i != null)?.length + 1) {
            refcheckAll.current[4].checked = true;
            refcheckAll.current[4].classList.remove('checkboxall');
          } else {
            refcheckAll.current[4].checked = true;
            refcheckAll.current[4].classList.add('checkboxall');
          }
        } else {
          refcheckAll.current[4].checked = false;
          refcheckAll.current[4].classList.add('checkboxall');
        }
      }
    }

    data?.length > 0 ? updateSameDay(sameDay) : undefined;
  };

  const checkAll = (groupNumber) => {
    console.log(groupNumber);
    roomcode.roomcode = [];
    let a =
      groupNumber == 0
        ? refCheckin
        : groupNumber == 1
        ? refInhouse
        : groupNumber == 2
        ? refNoshow
        : groupNumber == 4
        ? refCheckout
        : undefined;
    if (a.current[0]) {
      a.current?.map((i) => {
        i
          ? refcheckAll.current[groupNumber].checked
            ? (i.checked = true)
            : (i.checked = false)
          : undefined;
      });
    }
    let checkin = data.filter((i) => i.status == 0);
    let inhouse = data.filter((i) => i.status == 1);
    let noShow = data.filter((i) => i.status == 4);
    let checkout = data.filter((i) => i.status == 2);

    for (let i = 0; i < refCheckin.current.length; i++) {
      refCheckin.current[i]?.checked == true ? roomcode.roomcode.push(checkin[i]?.ma) : undefined;
    }
    for (let i = 0; i < refInhouse.current.length; i++) {
      refInhouse.current[i]?.checked == true ? roomcode.roomcode.push(inhouse[i]?.ma) : undefined;
    }
    for (let i = 0; i < refCheckout.current.length; i++) {
      refCheckout.current[i]?.checked == true ? roomcode.roomcode.push(checkout[i]?.ma) : undefined;
    }
    for (let i = 0; i < refNoshow.current.length; i++) {
      refNoshow.current[i]?.checked == true ? roomcode.roomcode.push(noShow[i]?.ma) : undefined;
    }

    setTimeout(() => {
      oncheck();
    }, 50);
  };

  const openService = (q, j, value, class2) => {
    let arr3 = [...active];
    let ab = document.querySelectorAll(`.taball`);
    let tableOpenService = document.querySelector(`.${q}`);
    if (arr3[j]) {
      if (arr3[j].active == true) {
        tableOpenService ? tableOpenService.classList.remove('tableOpen1') : undefined;
        arr3[j].active = false;
        setActive(arr3);
      } else {
        for (let i = 0; i < ab?.length; i++) {
          ab[i].classList.remove('tableOpen1');
        }
        tableOpenService.classList.add('tableOpen1');
        arr3[j].active = true;
        setActive(arr3);
      }
    }
    let abc2 = 0;
    arr3?.map((i, index) => {
      if (i.active == true) {
        numberRef.current = j;
        abc2++;
      }
    });
    if (abc2 == 0) {
      numberRef.current = null;
    }
  };
  const selectRange = (value, groupNumber) => {
    let arr = data.filter((i) => i.status == groupNumber);
    let arrIndex = [];
    roomcode.roomcode.map((k) => {
      arrIndex.push(data.findIndex((l) => l.ma == k));
    });
    roomcode.roomcodeGroup.checkin = [];
    roomcode.roomcodeGroup.inHouse = [];
    roomcode.roomcodeGroup.noShow = [];
    roomcode.roomcodeGroup.checkout = [];
    if (groupNumber == 0) {
      arrIndex.map((i) => {
        data[i]?.status != groupNumber
          ? roomcode.roomcodeGroup.checkin.push(data[i].ma)
          : undefined;
      });
    }
    if (groupNumber == 1) {
      arrIndex.map((i) => {
        data[i]?.status != groupNumber
          ? roomcode.roomcodeGroup.inHouse.push(data[i].ma)
          : undefined;
      });
    }
    if (groupNumber == 2) {
      arrIndex.map((i) => {
        data[i]?.status != groupNumber
          ? roomcode.roomcodeGroup.inHouse.push(data[i].ma)
          : undefined;
      });
    }
    if (groupNumber == 4) {
      arrIndex.map((i) => {
        data[i]?.status != groupNumber
          ? roomcode.roomcodeGroup.checkout.push(data[i].ma)
          : undefined;
      });
    }

    for (let i = 0; i < value; i++) {
      groupNumber == 0
        ? roomcode.roomcodeGroup.checkin.push(arr[i].ma)
        : groupNumber == 1
        ? roomcode.roomcodeGroup.inHouse.push(arr[i].ma)
        : groupNumber == 2
        ? roomcode.roomcodeGroup.checkout.push(arr[i].ma)
        : groupNumber == 4
        ? roomcode.roomcodeGroup.noShow.push(arr[i].ma)
        : undefined;
    }
    roomcode.roomcode = [
      ...roomcode.roomcodeGroup.checkin,
      ...roomcode.roomcodeGroup.inHouse,
      ...roomcode.roomcodeGroup.noShow,
      ...roomcode.roomcodeGroup.checkout,
    ];
    let a =
      groupNumber == 0
        ? refCheckin
        : groupNumber == 1
        ? refInhouse
        : groupNumber == 2
        ? refCheckout
        : groupNumber == 4
        ? refNoshow
        : undefined;
    for (let i = 0; i <= a.current?.length; i++) {
      if (a.current[i]) {
        a.current[i].checked = false;
      }
    }
    if (value > 0) {
      let j = 0;
      for (let i = 1; i <= value; i++) {
        if (a.current[i - 1]) {
          a.current[i - 1].checked = true;
          j++;
        }
      }
    }
  };

  const [mouse, setMouse] = useState({
    ok: false,
  });
  useEffect(() => {
    window.addEventListener('mouseup', () => {
      oncheck();
      mouse.ok = false;
    });
    window.removeEventListener('mouseup', () => {
      oncheck();
      mouse.ok = false;
    });
  }, []);

  const onMouseEnter = (index, groupNumber, ma) => {
    let a = groupNumber == 0 ? refCheckin : refInhouse;
    if (refCheckin.current[index] || refInhouse.current[index]) {
      if (mouse.ok && a.current[index]) {
        let index2 = roomcode.roomcode.indexOf(ma);
        a.current[index].checked ? roomcode.roomcode.splice(index2, 1) : roomcode.roomcode.push(ma);
        a.current[index].checked = a.current[index].checked ? false : true;
      }
    }
  };
  let numberTabOpen = 0;
  let numberService = true;
  const [position, setposition] = useState({
    x: 0,
    y: 0,
  });
  const refClick = useRef();
  const refClickContainer = useRef();
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    refClickContainer.current.addEventListener('contextmenu', (e) => {
      if (edit == 0 && status == false) {
        e.preventDefault();

        if (refClick.current) {
          refClick.current.style.display = 'flex';
          let a = window.innerHeight - refClick.current.scrollHeight - e.clientY;

          setposition({
            x: e.clientX,
            y: a >= 0 ? e.clientY : e.clientY + a,
          });
        }
      }
    });

    refClickContainer.current.removeEventListener('contextmenu', (e) => {
      e.preventDefault();

      if (refClick.current) {
        refClick.current.style.display = 'flex';
        let a = window.innerHeight - refClick.current.scrollHeight - e.clientY;

        setposition({
          x: e.clientX,
          y: a >= 0 ? e.clientY : e.clientY + a,
        });
      }
    });
  }, []);
  function getSheetData(data, header) {
    var fields = Object.keys(data[0]);
    var sheetData = data.map(function (row) {
      return fields.map(function (fieldName) {
        return row[fieldName] ? row[fieldName] : '';
      });
    });
    sheetData.unshift(header);
    return sheetData;
  }

  return (
    <div className="table-component" ref={refClickContainer}>
      <ClickMenu
        reff={refClick}
        position={position}
        listbutton={listbutton}
        close={() => {
          if (refClick.current) {
            refClick.current.style.display = 'none';
          }
        }}
      ></ClickMenu>
      {data.length == 0 ? (
        <div className="Nodata">
          {search != '' ? <div>No Data Found</div> : <div>No Rooms</div>}
        </div>
      ) : (
        <table onClick={(e) => {}}>
          <thead className="tableHead">
            <tr>
              <th>{intl.formatMessage({ id: 'pages.booking.getroom.no' })}</th>
              {column
                ? column?.map((i, index) => (
                    <th style={i.style} key={index}>
                      {i.title}
                    </th>
                  ))
                : undefined}
            </tr>
          </thead>

          {groupbooking?.map((i, index) =>
            numberService && data.filter((o) => o.status == Math.floor(index / 2))?.length > 0 ? (
              <tbody
                style={{
                  background:
                    Math.floor(index / 2) == 1
                      ? 'rgb(208 234 255)'
                      : Math.floor(index / 2) == 2 || Math.floor(index / 2) == 5
                      ? 'rgb(203 203 203)'
                      : Math.floor(index / 2) == 3
                      ? 'rgb(229 169 150)'
                      : '',
                }}
                key={index}
              >
                <tr
                  style={{
                    background:
                      Math.floor(index / 2) == 1
                        ? 'rgb(208 234 255)'
                        : Math.floor(index / 2) == 2 || Math.floor(index / 2) == 5
                        ? 'rgb(203 203 203)'
                        : Math.floor(index / 2) == 3
                        ? 'rgb(229 169 150)'
                        : '',
                  }}
                >
                  <td colSpan={column?.length + 1}>
                    <span className="group checkin">
                      <buttonList.tableOpen
                        showAll={abc}
                        showAll2={search}
                        showAll3={valueFilter}
                        className={`checkinMain${bookingNumber}`}
                        index={numberTabOpen}
                        classClose={`groupCheckin${Math.floor(index / 2)}`}
                      ></buttonList.tableOpen>
                      <div style={{ display: 'none' }}>{(numberTabOpen = numberTabOpen + 1)}</div>
                      {edit == 2 || edit == 1 ? undefined : Math.floor(index / 2) == 0 ||
                        Math.floor(index / 2) == 1 ||
                        Math.floor(index / 2) == 2 ||
                        Math.floor(index / 2) == 4 ? (
                        <input
                          onClick={() => {
                            checkAll(
                              Math.floor(index / 2) == 4
                                ? 2
                                : Math.floor(index / 2) == 2
                                ? 4
                                : Math.floor(index / 2),
                            );
                          }}
                          ref={(el) =>
                            (refcheckAll.current[
                              Math.floor(index / 2) == 4
                                ? 2
                                : Math.floor(index / 2) == 2
                                ? 4
                                : Math.floor(index / 2)
                            ] = el)
                          }
                          type="checkbox"
                          className={` `}
                        ></input>
                      ) : undefined}
                      <div>
                        Status:{i} ({data.filter((o) => o.status == Math.floor(index / 2))?.length})
                      </div>
                      {
                        // Math.floor(index / 2) != 2 &&
                        Math.floor(index / 2) != 3 && Math.floor(index / 2) != 5 ? (
                          <Slider
                            style={{ marginLeft: '20px', width: '200px' }}
                            defaultValue={0}
                            max={data.filter((o) => o.status == Math.floor(index / 2))?.length}
                            onChange={(e) => {
                              selectRange(e, Math.floor(index / 2));
                            }}
                          ></Slider>
                        ) : undefined
                      }
                    </span>
                  </td>
                </tr>
                {(numberService = false)}
              </tbody>
            ) : (
              data
                .filter((o) => o.status == Math.floor(index / 2))
                ?.map((i1, index1) => (
                  <tbody
                    className={` row-table groupCheckin${Math.floor(index / 2)} tableService`}
                    key={index1}
                    onMouseEnter={() => {
                      onMouseEnter(index1, Math.floor(index / 2), i1.ma);
                    }}
                  >
                    {(edit == 2 || edit == 1) &&
                    (Math.floor(index / 2) == 0 || Math.floor(index / 2) == 4) ? (
                      <inputTable.Row
                        data22={data22}
                        bookingNumber={bookingNumber}
                        className={`taball tabopen${Math.floor(
                          index / 2,
                        )}${index1}${bookingNumber}`}
                        onClick={() =>
                          openService(
                            `tabopen${Math.floor(index / 2)}${index1}${bookingNumber}`,
                            i1.code,
                          )
                        }
                        column={column}
                        i={i1}
                        index={index1}
                      ></inputTable.Row>
                    ) : (
                      <tr
                        style={{
                          background:
                            i1.userLock != null
                              ? '#cecece'
                              : Math.floor(index / 2) == 1
                              ? 'rgb(208 234 255)'
                              : Math.floor(index / 2) == 2 || Math.floor(index / 2) == 5
                              ? 'rgb(203 203 203)'
                              : Math.floor(index / 2) == 3
                              ? 'rgb(229 169 150)'
                              : '',
                        }}
                        // refNoshowColor
                        ref={(rel) =>
                          Math.floor(index / 2) == 0
                            ? (refCheckinColor.current[index1] = rel)
                            : Math.floor(index / 2) == 1
                            ? (refInhouseColor.current[index1] = rel)
                            : Math.floor(index / 2) == 4
                            ? (refNoshowColor.current[index1] = rel)
                            : undefined
                        }
                        className="hoverTable"
                      >
                        <td>
                          <span className="d-flex" style={{ gap: '20px' }}>
                            {i1.service && i1.service?.length > 0 ? (
                              <div
                                className={` tableOpen  `}
                                style={{ marginLeft: '10px' }}
                                onClick={(value) => {
                                  openService(
                                    `tabopen${Math.floor(index / 2)}${index1}${bookingNumber}`,
                                    i1.code,
                                  );
                                }}
                              >
                                <div
                                  className={`taball tabopen${Math.floor(
                                    index / 2,
                                  )}${index1}${bookingNumber} table-seriver-button${index}${bookingNumber}`}
                                ></div>
                                <div></div>
                              </div>
                            ) : (
                              <div style={{ width: '30px' }}></div>
                            )}
                            <div
                              onMouseDown={(e) => {
                                if (
                                  e.button == 0 &&
                                  e.target.nodeName != 'INPUT' &&
                                  (refCheckin.current[index1] ||
                                    refInhouse.current[index1] ||
                                    refCheckout.current[index1] ||
                                    refNoshow.current[index1])
                                ) {
                                  let a =
                                    Math.floor(index / 2) == 0
                                      ? refCheckin
                                      : Math.floor(index / 2) == 1
                                      ? refInhouse
                                      : Math.floor(index / 2) == 2
                                      ? refCheckout
                                      : Math.floor(index / 2) == 4
                                      ? refNoshow
                                      : undefined;
                                  mouse.ok = true;

                                  let index2 = roomcode.roomcode.indexOf(i1.ma);
                                  a.current[index1].checked
                                    ? roomcode.roomcode.splice(index2, 1)
                                    : roomcode.roomcode.push(i1.ma);
                                  a.current[index1].checked = !a.current[index1].checked
                                    ? true
                                    : false;
                                }
                                document.getElementsByClassName(
                                  `group${Math.floor(index / 2)}`,
                                ).checked = true;
                              }}
                              style={{ position: 'relative' }}
                            >
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '0',
                                  left: '0',
                                  height: '100%',
                                  width: '100%',
                                  zIndex: 20,
                                }}
                              ></div>
                              {edit != 2 &&
                              (Math.floor(index / 2) == 0 ||
                                Math.floor(index / 2) == 1 ||
                                Math.floor(index / 2) == 2 ||
                                Math.floor(index / 2) == 4) ? (
                                <input.checkbox
                                  value={index}
                                  disabled={true}
                                  ref={(rel) =>
                                    Math.floor(index / 2) == 0
                                      ? (refCheckin.current[index1] = rel)
                                      : Math.floor(index / 2) == 1
                                      ? (refInhouse.current[index1] = rel)
                                      : Math.floor(index / 2) == 4
                                      ? (refNoshow.current[index1] = rel)
                                      : Math.floor(index / 2) == 2
                                      ? (refCheckout.current[index1] = rel)
                                      : undefined
                                  }
                                  style={{ height: '20px', width: '20px' }}
                                ></input.checkbox>
                              ) : undefined}
                            </div>
                            {index1 + 1}
                          </span>
                        </td>
                        {column?.map((j, indexx) => (
                          <td
                            style={{ userSelect: j.dataIndex == 'ma' ? '' : 'none' }}
                            key={indexx}
                            onMouseDown={(e) => {
                              if (
                                e.button == 0 &&
                                e.target.nodeName != 'DIV' &&
                                e.target.nodeName != 'INPUT' &&
                                e.target.nodeName != 'IMG' &&
                                !e.target.classList.contains('component-select') &&
                                (refCheckin.current[index1] || refInhouse.current[index1])
                              ) {
                                let a =
                                  Math.floor(index / 2) == 0
                                    ? refCheckin
                                    : Math.floor(index / 2) == 1
                                    ? refInhouse
                                    : Math.floor(index / 2) == 2
                                    ? refCheckout
                                    : Math.floor(index / 2) == 4
                                    ? refNoshow
                                    : undefined;
                                if (a?.current[index1]) {
                                  mouse.ok = true;
                                  let index2 = roomcode.roomcode.indexOf(i1.ma);
                                  a.current[index1].checked
                                    ? roomcode.roomcode.splice(index2, 1)
                                    : roomcode.roomcode.push(i1.ma);
                                  a.current[index1].checked = !a.current[index1].checked
                                    ? true
                                    : false;
                                }
                              }
                            }}
                          >
                            <span className="d-flex" style={{ gap: '20px' }}>
                              {j.render
                                ? j.render(
                                    i1,
                                    index1 + 1,
                                    i1[j.dataIndex],
                                    (a) => {
                                      getBlankRoom(
                                        i1.roomType,
                                        i1.roomKind,
                                        i1.arrivalDate,
                                        i1.checkoutDate,
                                      );
                                      let arrEdit = [...data];
                                      data[i1.code].onEdit = true;

                                      i1.onEdit = true;
                                      setData(arrEdit);
                                    },
                                    roomNo,
                                  )
                                : i1[j.dataIndex]}
                            </span>
                          </td>
                        ))}
                      </tr>
                    )}
                    {active.find((c) => c.code == i1.code)?.active ? (
                      <tr>
                        <TableChild
                          column={column?.length}
                          data={data}
                          onclick={(value) => {
                            setData(value);
                          }}
                          unfocus={(e) => {
                            updateService(e, i1.code);
                          }}
                          active={active[i1.code]}
                          columnService={columnService}
                          index={index}
                          bookingNumber={bookingNumber}
                          i1={i1}
                        ></TableChild>
                      </tr>
                    ) : undefined}

                    {(numberService = true)}
                  </tbody>
                ))
            ),
          )}
          <tbody style={{ height: 'inherit' }}>
            <tr>
              <td style={{ border: 'none' }}></td>
            </tr>
          </tbody>
          <tbody className="footerTable">
            <tr>
              <td>
                <strong>Total</strong>: {numberRoom}
              </td>
              {column?.map((k, index) => (
                <td key={index}>{k.total == 0 ? 0 : k.total ? formatNumber(k.total) : ''}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

const TableChild = ({
  active,
  unfocus,
  columnService,
  bookingNumber,
  i1,
  column,
  onclick,
  data,
}) => {
  const { rateCode } = useModel('bookingdata');
  const component = useMemo(() => {
    return (
      <td
        className={``}
        colSpan={column + 1}
        style={{
          borderBottom: '1px solid transparent',
        }}
      >
        <div style={{ paddingLeft: '20px' }}>
          <table className="tableServiceE">
            <thead>
              <tr className="group2">
                {columnService
                  .filter((i) =>
                    i1.status == 2 || i1.status == 3 || i1.status == 4 || i1.status == 5
                      ? i.title != ''
                      : i.title,
                  )
                  ?.map((o, index) => (
                    <th key={index}>{o.title}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {i1?.service
                ? i1.service?.map((o, index) =>
                    o?.rentalRoomId == i1.ma ? (
                      <tr key={index} className="group2">
                        {columnService?.map((p, indexx) => (
                          <td key={indexx} className={p.dataIndex == 'action' ? 'deleteExtra' : ''}>
                            {p.dataIndex == 'total' ? (
                              <div
                                className={`editTable`}
                                onClick={() => {
                                  if (data && i1.status != 2 && i1.status != 3 && i1.status != 5) {
                                    let arr = [...data];
                                    arr[i1.code].service[index].editRate = true;

                                    onclick(arr);
                                  }
                                }}
                              >
                                {data[i1.code].service[index].editRate &&
                                (!o.roomRateCode ||
                                  o.serviceId != 'RM' ||
                                  rateCode.find((i) => i.ma == o.roomRateCode)?.isEnable) ? (
                                  <input.number
                                    formatter={formatNumber}
                                    autoFocus={true}
                                    defaultValue={o.total}
                                    blur={(e) => {
                                      let arr = [...data];
                                      let total = number(e.target.value);
                                      unfocus({
                                        ...arr[i1.code].service[index],
                                        total: total,
                                        index: index,
                                      });
                                      setTimeout(() => {
                                        if (data) {
                                          let arr = [...data];
                                          arr[i1.code].service[index].editRate = false;

                                          onclick(arr);
                                        }
                                      }, 200);
                                    }}
                                  ></input.number>
                                ) : (
                                  <div>{formatNumber(o.total)}</div>
                                )}
                              </div>
                            ) : p.dataIndex == 'quantity' ? (
                              o.serviceId != 'RM' ? (
                                <div
                                  className={`editTable`}
                                  onClick={() => {
                                    if (
                                      data &&
                                      i1.status != 2 &&
                                      i1.status != 3 &&
                                      i1.status != 5
                                    ) {
                                      let arr = [...data];
                                      arr[i1.code].service[index].editNumber = true;

                                      onclick(arr);
                                    }
                                  }}
                                >
                                  {data[i1.code].service[index].editNumber ? (
                                    <input.number
                                      formatter={formatNumber}
                                      autoFocus={true}
                                      defaultValue={o.quantity}
                                      blur={(e) => {
                                        let arr = [...data];
                                        let soluong = number(e.target.value);
                                        unfocus({
                                          ...arr[i1.code].service[index],
                                          quantity: soluong,
                                          index: index,
                                        });
                                        setTimeout(() => {
                                          if (data) {
                                            let arr = [...data];
                                            arr[i1.code].service[index].editNumber = false;

                                            onclick(arr);
                                          }
                                        }, 200);
                                      }}
                                    ></input.number>
                                  ) : (
                                    <div>{formatNumber(o.quantity)}</div>
                                  )}
                                </div>
                              ) : (
                                <></>
                              )
                            ) : p.render ? (
                              p.render(o, index + 1, o[p.dataIndex], i1.code, i1, data[i1.code])
                            ) : (
                              o[p.dataIndex]
                            )}
                          </td>
                        ))}
                      </tr>
                    ) : undefined,
                  )
                : undefined}
            </tbody>
          </table>{' '}
        </div>
      </td>
    );
  }, [active, data]);
  return active ? active.active ? component : <></> : undefined;
};
const number = (value) => {
  let a = '';
  value.split(',')?.map((i) => {
    i != '' ? (a += i) : undefined;
  });
  return parseFloat(a);
};
export { Table };
