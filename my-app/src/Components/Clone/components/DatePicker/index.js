import React, { useState, useEffect, useRef } from 'react';
import { select } from '../Select';
import { label } from '../Label';
import { input } from '../Input';
import { useModel, useIntl } from 'umi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './datePicker.less';
import calendarIcon from './assets/calendar.svg';
import { buttonList } from '../Button';
import { datepicker as datepickerV2 } from '../DatepickerMui/datepickerV2';
import moment from 'moment';
import { Switch } from '../Switch';
import { datePicker } from '@/components/DatepickerMui';
import applyIcon from './assets/apply.svg';

const DatePickerBooking = ({ dateValue, onChange, switchValue, onDateTypeChange }) => {
  const format = 'DD/MM/YYYY';
  const { systemDate } = useModel('systemdate');
  const intl = useIntl();
  const today = new Date(systemDate);
  today.setHours(0, 0, 0, 0);
  const [value, setValue] = useState([today, today]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activeStartDate, setActiveStartDate] = useState(value[0]);
  const [rangeValue, setRangeValue] = useState(
    intl.formatMessage({
      id: 'component.datepicker.range.today',
    }),
  );
  const [dateTypeValue, setDateTypeValue] = useState(switchValue);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [titleDate, setTitleDate] = useState();
  const [offsetLeft, setOffsetLeft] = useState(0);
  const dropDownRef = useRef();
  const selectRef = useRef();
  const datepickerRef = useRef();
  const firstTimeRef = useRef(true);
  const getDateFromNow = (dayNum) => {
    const date = new Date(systemDate);
    date.setDate(new Date(systemDate).getDate() - dayNum);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  useEffect(() => {
    const onClick = (e) => {
      if (!dropDownRef.current?.contains(e.target) && !selectRef.current?.contains(e.target)) {
        if (onChange) {
          onChange(
            moment(startDate, format).format('YYYY-MM-DD'),
            moment(endDate, format).format('YYYY-MM-DD'),
          );
        }
        onDateTypeChange(dateTypeValue);
        setIsPopupOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [startDate, endDate, dateTypeValue]);

  useEffect(() => {
    if (isPopupOpen && firstTimeRef.current) {
      setOffsetLeft(datepickerRef.current?.getBoundingClientRect().left);
      firstTimeRef.current = false;
    }
    setDateTypeValue(switchValue);
    if (!isPopupOpen) {
      setStartDate(moment(value[0]).format(format));
      setEndDate(moment(value[1]).format(format));
    }
  }, [isPopupOpen]);

  useEffect(() => {
    const beginDate = moment(dateValue[0]).toDate();
    const endDate = moment(dateValue[1]).toDate();
    beginDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const find = rangeList.find((item) => {
      return (
        item.value[0].getTime() == beginDate.getTime() &&
        item.value[1].getTime() == endDate.getTime()
      );
    });
    if (find) {
      setRangeValue(find.name);
      setTitleDate(find.name);
    } else {
      setRangeValue('Custom');
      setTitleDate(
        rangeValue !== 'Custom'
          ? rangeValue
          : dateValue[0] == dateValue[1]
          ? moment(dateValue[0]).format(format)
          : `${moment(dateValue[0]).format(format)} - ${moment(dateValue[1]).format(format)}`,
      );
    }
    setValue([beginDate, endDate]);
  }, [dateValue]);

  useEffect(() => {
    const find = rangeList.find(
      (item) =>
        item.value[0].getTime() == value[0].getTime() &&
        item.value[1].getTime() == value[1].getTime(),
    );
    if (find) setRangeValue(find.name);
    setStartDate(moment(value[0]).format(format));
    setEndDate(moment(value[1]).format(format));
    setActiveStartDate(value[0]);
  }, [value]);
  const rangeList = [
    {
      name: intl.formatMessage({
        id: 'component.datepicker.range.today',
      }),
      onClick: () => {
        setValue([today, today]);
      },
      value: [today, today],
    },
    {
      name: intl.formatMessage({
        id: 'component.datepicker.range.yesterday',
      }),
      onClick: () => {
        const yesterday = new Date(getDateFromNow(1));
        setValue([yesterday, yesterday]);
      },
      value: [new Date(getDateFromNow(1)), new Date(getDateFromNow(1))],
    },
    {
      name: intl.formatMessage({
        id: 'component.datepicker.range.tomorrow',
      }),
      onClick: () => {
        const tomorrow = new Date(getDateFromNow(-1));
        setValue([tomorrow, tomorrow]);
      },
      value: [new Date(getDateFromNow(-1)), new Date(getDateFromNow(-1))],
    },
    {
      name: intl.formatMessage({
        id: 'component.datepicker.range.last7days',
      }),
      onClick: () => {
        const startDate = new Date(getDateFromNow(8));
        const endDate = new Date(getDateFromNow(1));
        setValue([startDate, endDate]);
      },
      value: [new Date(getDateFromNow(8)), new Date(getDateFromNow(1))],
    },
    {
      name: intl.formatMessage({
        id: 'component.datepicker.range.next7days',
      }),
      onClick: () => {
        const startDate = new Date(getDateFromNow(-1));
        const endDate = new Date(getDateFromNow(-8));
        setValue([startDate, endDate]);
      },
      value: [new Date(getDateFromNow(-1)), new Date(getDateFromNow(-8))],
    },
    {
      name: intl.formatMessage({
        id: 'component.datepicker.range.last30days',
      }),
      onClick: () => {
        const startDate = new Date(getDateFromNow(31));
        const endDate = new Date(getDateFromNow(1));
        setValue([startDate, endDate]);
      },
      value: [new Date(getDateFromNow(31)), new Date(getDateFromNow(1))],
    },
    {
      name: intl.formatMessage({
        id: 'component.datepicker.range.next30days',
      }),
      onClick: () => {
        const startDate = new Date(getDateFromNow(-1));
        const endDate = new Date(getDateFromNow(-31));
        setValue([startDate, endDate]);
      },
      value: [new Date(getDateFromNow(-1)), new Date(getDateFromNow(-31))],
    },
  ];

  return (
    <>
      <div className="position-relative datepicker-container" ref={dropDownRef}>
        <div
          className="d-flex align-items-center datepicker-component-toggle-button px-2 cursor-pointer justify-content-between"
          onClick={() => {
            setIsPopupOpen(!isPopupOpen);
          }}
        >
          <label.titlemd>{titleDate}</label.titlemd>
          <img
            style={{
              width: '20px',
              filter:
                'invert(48%) sepia(79%) saturate(2476%) hue-rotate(190deg) brightness(118%) contrast(119%)',
            }}
            src={calendarIcon}
          />
        </div>
        <div
          ref={datepickerRef}
          className={`position-absolute datepicker-content p-2 ${
            isPopupOpen ? 'd-block' : 'd-none'
          }`}
          style={{ right: offsetLeft < 0 ? 'unset' : '0%', left: offsetLeft < 0 ? '0%' : 'unset' }}
        >
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ gap: '40px' }}
          >
            <div className="w-50">
              <label.titlelg>
                {intl.formatMessage({
                  id: 'component.datepicker.daterange',
                })}
              </label.titlelg>
              <select.group
                maxHeight="360px"
                ref={selectRef}
                allowClear={false}
                value={rangeValue}
                onChange={(value) => {
                  setRangeValue(value);
                }}
              >
                {rangeList.map((item) => {
                  return (
                    <select.option value={item.name} key={item.name} onOptionClick={item.onClick}>
                      {item.name}
                    </select.option>
                  );
                })}
                <select.option className="d-none" value="Custom">
                  {intl.formatMessage({
                    id: 'component.datepicker.range.custom',
                  })}
                </select.option>
              </select.group>
            </div>
            <div className="w-50">
              <label.titlelg>
                {intl.formatMessage({
                  id: 'component.datepicker.datetype',
                })}
              </label.titlelg>
              <Switch
                value={dateTypeValue}
                onClick={(value) => {
                  setDateTypeValue(value);
                }}
                title1={intl.formatMessage({
                  id: 'component.datepicker.arrival',
                })}
                title2={intl.formatMessage({
                  id: 'component.datepicker.create',
                })}
              />
            </div>
          </div>
          <div
            className="d-flex align-items-center justify-content-between mt-2"
            style={{ gap: '40px' }}
          >
            <div className="w-50">
              <datePicker.datePicker
                onRoot={false}
                placeholder={intl.formatMessage({
                  id: 'component.datepicker.starting',
                })}
                value={moment(startDate, 'DD/MM/YYYY')}
                onChange={(e) => {
                  setRangeValue('Custom');
                  setStartDate(moment(e).format('DD/MM/YYYY'));
                }}
              />
            </div>
            <div className="w-50">
              <datePicker.datePicker
                onRoot={false}
                placeholder={intl.formatMessage({
                  id: 'component.datepicker.ending',
                })}
                value={moment(endDate, 'DD/MM/YYYY')}
                onChange={(e) => {
                  setRangeValue('Custom');
                  setEndDate(moment(e).format('DD/MM/YYYY'));
                }}
              />
            </div>
          </div>
          {/* <div className="mt-2" style={{ width: '500px' }}>
            <Calendar
              activeStartDate={activeStartDate}
              onActiveStartDateChange={(info) => {
                if (Array.isArray(info.value) || info.action === 'next' || info.action === 'prev') {
                  setActiveStartDate(info.activeStartDate);
                }
              }}
              onClickDay={(value, event) => {
                setRangeValue('Custom');
              }}
              returnValue="range"
              onChange={(value) => {
                value[0].setHours(0, 0, 0, 0);
                value[1].setHours(0, 0, 0, 0);
                setValue([value[0], value[1]]);
              }}
              value={value}
              showFixedNumberOfWeeks={false}
              selectRange={true}
              showDoubleView={true}
              minDetail="month"
              showNeighboringMonth={false}
            />
          </div> */}
          <hr />
          <div className="d-flex align-items-center justify-content-end" style={{ gap: '10px' }}>
            {/* <buttonList.cancel
              className="datepicker-button-cancel"
              onClick={() => {
                setValue(
                  dateValue.map((item) => {
                    return new Date(item);
                  }),
                );
                setIsPopupOpen(false);
              }}
            /> */}
            <buttonList.normal
              onClick={() => {
                setIsPopupOpen(false);
                onDateTypeChange(dateTypeValue);
                if (onChange) {
                  onChange(
                    moment(startDate, format).format('YYYY-MM-DD'),
                    moment(endDate, format).format('YYYY-MM-DD'),
                  );
                }
              }}
              title={intl.formatMessage({
                id: 'component.datepicker.apply',
              })}
              img={applyIcon}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const DatePicker = React.forwardRef(
  ({ dateValue, onChange, minDate, isReport = true, isFromLeft = false }, ref = undefined) => {
    const format = 'DD/MM/YYYY';
    const { systemDate } = useModel('systemdate');
    const intl = useIntl();
    const today = new Date(systemDate);
    today.setHours(0, 0, 0, 0);
    const [value, setValue] = useState([today, today]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [rangeValue, setRangeValue] = useState(
      intl.formatMessage({
        id: 'component.datepicker.range.today',
      }),
    );
    const [activeStartDate, setActiveStartDate] = useState(value[0]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [titleDate, setTitleDate] = useState();
    const dropDownRef = useRef();
    const datepickerRef = useRef();
    const selectRef = useRef();
    const firstTimeRef = useRef(true);
    const getDateFromNow = (dayNum) => {
      const date = new Date(systemDate);
      date.setDate(new Date(systemDate).getDate() - dayNum);
      date.setHours(0, 0, 0, 0);
      return date;
    };

    // useEffect(() => {
    //   const onClick = (e) => {
    //     if (
    //       !dropDownRef.current?.contains(e.target) &&
    //       !selectRef.current?.contains(e.target) &&
    //       (!ref || !ref.current?.contains(e.target))
    //     ) {
    //       if (onChange) {
    //         onChange(
    //           moment(startDate, format).format('YYYY-MM-DD'),
    //           moment(endDate, format).format('YYYY-MM-DD'),
    //         );
    //       }
    //       setIsPopupOpen(false);
    //     }
    //   };

    //   document.addEventListener('mousedown', onClick);
    //   return () => document.removeEventListener('mousedown', onClick);
    // }, [startDate, endDate]);

    useEffect(() => {
      if (isPopupOpen && firstTimeRef.current) {
        setOffsetLeft(datepickerRef.current?.getBoundingClientRect().left);
        firstTimeRef.current = false;
      }
      if (!isPopupOpen) {
        setStartDate(moment(value[0]).format(format));
        setEndDate(moment(value[1]).format(format));
      }
    }, [isPopupOpen]);
    const [date, setDate] = useState({ from: '', to: '' });
    useEffect(() => {
      const beginDate = moment(dateValue[0]).toDate();
      const endDate = moment(dateValue[1]).toDate();
      beginDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      const find = rangeList
        .filter((i) => i)
        .find((item) => {
          return (
            item.value[0].getTime() == beginDate.getTime() &&
            item.value[1].getTime() == endDate.getTime()
          );
        });
      if (find) {
        setRangeValue(find.name);
        setTitleDate(find.name);
      } else {
        setRangeValue('Custom');
        setTitleDate(
          rangeValue !== 'Custom'
            ? rangeValue
            : dateValue[0] == dateValue[1]
            ? moment(dateValue[0]).format(format)
            : `${moment(dateValue[0]).format(format)} - ${moment(dateValue[1]).format(format)}`,
        );
      }
      date.from = beginDate;
      date.to = endDate;
      setValue([beginDate, endDate]);
    }, [dateValue]);

    useEffect(() => {
      setStartDate(moment(value[0]).format(format));
      setEndDate(moment(value[1]).format(format));
      const find = rangeList
        .filter((i) => i)
        .find(
          (item) =>
            item.value[0].getTime() == value[0].getTime() &&
            item.value[1].getTime() == value[1].getTime(),
        );
      if (find) setRangeValue(find.name);
      setActiveStartDate(value[0]);
    }, [value]);

    const rangeList = [
      {
        name: intl.formatMessage({
          id: 'component.datepicker.range.today',
        }),
        onClick: () => {
          setValue([today, today]);
        },
        value: [today, today],
      },
      {
        name: intl.formatMessage({
          id: 'component.datepicker.range.thisweek',
        }),
        onClick: () => {
          const startDate = moment(systemDate).startOf('isoWeek').toDate();
          const endDate = moment(systemDate)
            .endOf('isoWeek')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate();
          setValue([startDate, endDate]);
        },
        value: [
          moment(systemDate).startOf('isoWeek').toDate(),
          moment(systemDate)
            .endOf('isoWeek')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate(),
        ],
      },
      {
        name: intl.formatMessage({
          id: 'component.datepicker.range.thismonth',
        }),
        onClick: () => {
          const startDate = moment(systemDate).startOf('month').toDate();
          const endDate = moment(systemDate)
            .endOf('month')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate();
          setValue([startDate, endDate]);
        },
        value: [
          moment(systemDate).startOf('month').toDate(),
          moment(systemDate)
            .endOf('month')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate(),
        ],
      },
      isReport && {
        name: intl.formatMessage({
          id: 'component.datepicker.range.thisquarter',
        }),
        onClick: () => {
          const startDate = moment(systemDate).startOf('quarter').toDate();
          const endDate = moment(systemDate)
            .endOf('quarter')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate();
          setValue([startDate, endDate]);
        },
        value: [
          moment(systemDate).startOf('quarter').toDate(),
          moment(systemDate)
            .endOf('quarter')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate(),
        ],
      },
      isReport && {
        name: intl.formatMessage({
          id: 'component.datepicker.range.thisyear',
        }),
        onClick: () => {
          const startDate = moment(systemDate).startOf('year').toDate();
          const endDate = moment(systemDate)
            .endOf('year')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate();
          setValue([startDate, endDate]);
        },
        value: [
          moment(systemDate).startOf('year').toDate(),
          moment(systemDate)
            .endOf('year')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate(),
        ],
      },
      {
        name: intl.formatMessage({
          id: 'component.datepicker.range.tomorrow',
        }),
        onClick: () => {
          const tomorrow = new Date(getDateFromNow(-1));
          setValue([tomorrow, tomorrow]);
        },
        value: [new Date(getDateFromNow(-1)), new Date(getDateFromNow(-1))],
      },
      {
        name: intl.formatMessage({
          id: 'component.datepicker.range.next7days',
        }),
        onClick: () => {
          const startDate = moment(systemDate).add(1, 'weeks').startOf('isoWeek').toDate();
          const endDate = moment(systemDate)
            .add(1, 'week')
            .endOf('isoWeek')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate();
          setValue([startDate, endDate]);
        },
        value: [
          moment(systemDate).add(1, 'weeks').startOf('isoWeek').toDate(),
          moment(systemDate)
            .add(1, 'week')
            .endOf('isoWeek')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate(),
        ],
      },
      {
        name: intl.formatMessage({
          id: 'component.datepicker.range.next30days',
        }),
        onClick: () => {
          const startDate = moment(systemDate).add(1, 'months').startOf('month').toDate();
          const endDate = moment(systemDate)
            .add(1, 'month')
            .endOf('month')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate();
          setValue([startDate, endDate]);
        },
        value: [
          moment(systemDate).add(1, 'months').startOf('month').toDate(),
          moment(systemDate)
            .add(1, 'month')
            .endOf('month')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate(),
        ],
      },
      isReport && {
        name: intl.formatMessage({
          id: 'component.datepicker.range.nextquarter',
        }),
        onClick: () => {
          const startDate = moment(systemDate).add(1, 'quarters').startOf('quarter').toDate();
          const endDate = moment(systemDate)
            .add(1, 'quarters')
            .endOf('quarter')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate();
          setValue([startDate, endDate]);
        },
        value: [
          moment(systemDate).add(1, 'quarters').startOf('quarter').toDate(),
          moment(systemDate)
            .add(1, 'quarters')
            .endOf('quarter')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate(),
        ],
      },
      isReport && {
        name: intl.formatMessage({
          id: 'component.datepicker.range.nextyear',
        }),
        onClick: () => {
          const startDate = moment(systemDate).add(1, 'years').startOf('year').toDate();
          const endDate = moment(systemDate)
            .add(1, 'years')
            .endOf('year')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate();
          setValue([startDate, endDate]);
        },
        value: [
          moment(systemDate).add(1, 'years').startOf('year').toDate(),
          moment(systemDate)
            .add(1, 'years')
            .endOf('year')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate(),
        ],
      },
      {
        name: intl.formatMessage({
          id: 'component.datepicker.range.yesterday',
        }),
        onClick: () => {
          const yesterday = new Date(getDateFromNow(1));
          setValue([yesterday, yesterday]);
        },
        value: [new Date(getDateFromNow(1)), new Date(getDateFromNow(1))],
      },
      {
        name: intl.formatMessage({
          id: 'component.datepicker.range.last7days',
        }),
        onClick: () => {
          const startDate = moment(systemDate).subtract(1, 'weeks').startOf('isoWeek').toDate();
          const endDate = moment(systemDate)
            .subtract(1, 'week')
            .endOf('isoWeek')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate();
          setValue([startDate, endDate]);
        },
        value: [
          moment(systemDate).subtract(1, 'weeks').startOf('isoWeek').toDate(),
          moment(systemDate)
            .subtract(1, 'week')
            .endOf('isoWeek')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate(),
        ],
      },
      {
        name: intl.formatMessage({
          id: 'component.datepicker.range.last30days',
        }),
        onClick: () => {
          const startDate = moment(systemDate).subtract(1, 'months').startOf('month').toDate();
          const endDate = moment(systemDate)
            .subtract(1, 'months')
            .endOf('month')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate();
          setValue([startDate, endDate]);
        },
        value: [
          moment(systemDate).subtract(1, 'months').startOf('month').toDate(),
          moment(systemDate)
            .subtract(1, 'months')
            .endOf('month')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate(),
        ],
      },
      isReport && {
        name: intl.formatMessage({
          id: 'component.datepicker.range.lastquarter',
        }),
        onClick: () => {
          const startDate = moment(systemDate).subtract(1, 'quarters').startOf('quarter').toDate();
          const endDate = moment(systemDate)
            .subtract(1, 'quarters')
            .endOf('quarter')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate();
          setValue([startDate, endDate]);
        },
        value: [
          moment(systemDate).subtract(1, 'quarters').startOf('quarter').toDate(),
          moment(systemDate)
            .subtract(1, 'quarters')
            .endOf('quarter')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate(),
        ],
      },
      isReport && {
        name: intl.formatMessage({
          id: 'component.datepicker.range.lastyear',
        }),
        onClick: () => {
          const startDate = moment(systemDate).subtract(1, 'years').startOf('year').toDate();
          const endDate = moment(systemDate)
            .subtract(1, 'years')
            .endOf('year')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate();
          setValue([startDate, endDate]);
        },
        value: [
          moment(systemDate).subtract(1, 'years').startOf('year').toDate(),
          moment(systemDate)
            .subtract(1, 'years')
            .endOf('year')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toDate(),
        ],
      },
    ];
    return (
      <>
        <div className="position-relative datepicker-container" ref={dropDownRef}>
          <div
            className="d-flex align-items-center datepicker-component-toggle-button px-2 cursor-pointer justify-content-between"
            onClick={() => {
              setIsPopupOpen(!isPopupOpen);
            }}
          >
            <label.titlemd>{titleDate}</label.titlemd>
            <img
              style={{
                width: '20px',
                filter:
                  'invert(48%) sepia(79%) saturate(2476%) hue-rotate(190deg) brightness(118%) contrast(119%)',
              }}
              src={calendarIcon}
            />
          </div>
          <div
            ref={datepickerRef}
            className={`position-absolute datepicker-content p-2 ${
              isPopupOpen ? 'd-block' : 'd-none'
            }`}
            style={{
              right: isFromLeft ? 'unset' : offsetLeft < 0 ? 'unset' : '0%',
              left: isFromLeft ? '0%' : offsetLeft < 0 ? '0%' : 'unset',
            }}
          >
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ gap: '40px' }}
            >
              <div className="w-100">
                <label.titlelg>
                  {intl.formatMessage({
                    id: 'component.datepicker.daterange',
                  })}
                </label.titlelg>
                <select.group
                  maxHeight="360px"
                  allowClear={false}
                  value={rangeValue}
                  ref={ref ?? selectRef}
                  onChange={(value) => {
                    setRangeValue(value);
                  }}
                >
                  {rangeList
                    .filter((i) => i)
                    .map((item) => {
                      return (
                        <select.option
                          value={item.name}
                          key={item.name}
                          onOptionClick={item.onClick}
                        >
                          {item.name}
                        </select.option>
                      );
                    })}
                  <select.option className="d-none" value="Custom">
                    {intl.formatMessage({
                      id: 'component.datepicker.range.custom',
                    })}
                  </select.option>
                </select.group>
              </div>
            </div>
            <div
              className="d-flex align-items-center justify-content-between mt-2"
              style={{ gap: '40px' }}
            >
              <div className="w-100">
                <datepickerV2.rangePicker
                  onRoot={false}
                  value={[moment(startDate, 'DD/MM/YYYY'), moment(endDate, 'DD/MM/YYYY')]}
                  onChange={(e) => {
                    setRangeValue('Custom');
                    // if (moment(e).diff(moment(endDate, 'DD/MM/YYYY'), 'days') > 0) {
                    //   setEndDate(moment(e).format('DD/MM/YYYY'));
                    // }

                    date.from = e.from;
                    date.to = e.to;
                    setEndDate(moment(e.to).format('DD/MM/YYYY'));
                    setStartDate(moment(e.from).format('DD/MM/YYYY'));
                    onChange(date.from, date.to);
                  }}
                ></datepickerV2.rangePicker>

                {/* <datePicker.datePicker
                  minDate={minDate}
                  onRoot={false}
                  placeholder={intl.formatMessage({
                    id: 'component.datepicker.starting',
                  })}
                  value={moment(startDate, 'DD/MM/YYYY')}
                  onChange={(e) => {
                    setRangeValue('Custom');
                    if (moment(e).diff(moment(endDate, 'DD/MM/YYYY'), 'days') > 0) {
                      setEndDate(moment(e).format('DD/MM/YYYY'));
                    }
                    setStartDate(moment(e).format('DD/MM/YYYY'));
                    // if (onChange) {
                    //   onChange(
                    //     moment(moment(e).format('DD/MM/YYYY'), format).format('YYYY-MM-DD'),
                    //     moment(endDate, format).format('YYYY-MM-DD'),
                    //   );
                    // }
                    // onChange(
                    //   moment(moment(e).format('DD/MM/YYYY'), format).format('YYYY-MM-DD'),
                    //   moment(endDate, format).format('YYYY-MM-DD'),
                    // );
                    // const date = moment(e, format);
                    // const dayOfMonth = date.date();
                    // const month = date.month() + 1;
                    // const year = date.year();
                    // if (minDate && date < moment(minDate)) {
                    //   if (e.target.selectionStart == 10) {
                    //     if (date > value[1]) {
                    //       setValue([minDate, minDate]);
                    //     } else {
                    //       setValue([minDate, value[1]]);
                    //     }
                    //   }
                    //   return;
                    // }
                    // if (dayOfMonth && month && year && e.target.value.length == 10) {
                    //   if (date > value[1]) {
                    //     setValue([date.toDate(), date.toDate()]);
                    //   } else {
                    //     setValue([date.toDate(), value[1]]);
                    //   }
                    // }
                  }}
                ></datePicker.datePicker> */}
                {/* <label.titlelg>
                {intl.formatMessage({
                  id: 'component.datepicker.starting',
                })}
              </label.titlelg> */}
                {/* <input.medium
                value={startDate}
                onClick={(e) => {
                  if (e.target.selectionStart >= 0 && e.target.selectionStart <= 2) {
                    e.target.selectionStart = 0;
                    e.target.selectionEnd = 2;
                  }
                  if (e.target.selectionStart >= 3 && e.target.selectionStart <= 5) {
                    e.target.selectionStart = 3;
                    e.target.selectionEnd = 5;
                  }
                  if (e.target.selectionStart >= 6 && e.target.selectionStart <= 10) {
                    e.target.selectionStart = 6;
                    e.target.selectionEnd = 10;
                  }
                }}
                onKeyPress={(evt) => {
                  evt = evt ? evt : window.event;
                  var charCode = evt.which ? evt.which : evt.keyCode;
                  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    evt.returnValue = false;
                    if (evt.preventDefault) evt.preventDefault();
                  }
                }}
                onChange={(e) => {
                  if (
                    (e.target.value.length == 2 && !e.target.value.includes('/')) ||
                    (e.target.value.length == 5 &&
                      e.target.value.includes('/') &&
                      e.target.value.split('/').length == 2)
                  ) {
                    e.target.value += '/';
                  }
                  if (e.target.value.length >= 8 && !e.target.value.includes('/')) {
                    let mess = e.target.value.slice(0, 8);
                    e.target.value =
                      mess.slice(0, 2) + '/' + mess.slice(2, 4) + '/' + mess.slice(4, 8);
                  }
                  if (e.target.value.length <= 10) {
                    setStartDate(e.target.value);
                  }
                  if (e.target.selectionStart == 2) {
                    e.target.selectionStart = 3;
                    e.target.selectionEnd = 5;
                  }
                  if (e.target.selectionStart == 5) {
                    e.target.selectionStart = 6;
                    e.target.selectionEnd = 10;
                  }
                  setRangeValue('Custom');
                  const date = moment(e.target.value, format);
                  const dayOfMonth = date.date();
                  const month = date.month() + 1;
                  const year = date.year();
                  if (minDate && date < moment(minDate)) {
                    if (e.target.selectionStart == 10) {
                      if (date > value[1]) {
                        setValue([minDate, minDate]);
                      } else {
                        setValue([minDate, value[1]]);
                      }
                    }
                    return;
                  }
                  if (dayOfMonth && month && year && e.target.value.length == 10) {
                    if (date > value[1]) {
                      setValue([date.toDate(), date.toDate()]);
                    } else {
                      setValue([date.toDate(), value[1]]);
                    }
                  }
                }}
              ></input.medium> */}
              </div>
              <div className="w-50">
                {/* <datepickerV2.datepicker
                  onRoot={false}
                  minDate={moment(startDate, 'DD/MM/YYYY')}
                  value={moment(endDate, 'DD/MM/YYYY')}
                  onChange={(e) => {
                    setRangeValue('Custom');
                    setEndDate(moment(e).format('DD/MM/YYYY'));
                  }}
                ></datepickerV2.datepicker> */}
                {/* <datePicker.datePicker
                  onRoot={false}
                  placeholder={intl.formatMessage({
                    id: 'component.datepicker.ending',
                  })}
                  minDate={moment(startDate, 'DD/MM/YYYY')}
                  value={moment(endDate, 'DD/MM/YYYY')}
                  onChange={(e) => {
                    setRangeValue('Custom');
                    setEndDate(moment(e).format('DD/MM/YYYY'));
                    // onChange(
                    //   moment(startDate, format).format('YYYY-MM-DD'),
                    //   moment(moment(e).format('DD/MM/YYYY'), format).format('YYYY-MM-DD'),
                    // );
                    // setRangeValue('Custom');
                    // const date = moment(e, format);
                    // const dayOfMonth = date.date();
                    // const month = date.month() + 1;
                    // const year = date.year();
                    //  if (minDate && date < moment(minDate)) {
                    //   if (e.target.selectionStart == 10) {
                    //     if (date < value[0]) {
                    //       setValue([minDate, minDate]);
                    //     } else {
                    //       setValue([value[0], minDate]);
                    //     }
                    //   }
                    //   return;
                    // }
                    // if (minDate && date < moment(minDate)) {
                    //   if (e.target.selectionStart == 10) {
                    //     if (date < value[0]) {
                    //       setValue([minDate, minDate]);
                    //     } else {
                    //       setValue([value[0], minDate]);
                    //     }
                    //   }
                    //   return;
                    // }
                    // if (dayOfMonth && month && year && e.target.value.length == 10) {
                    //   if (date < value[0]) {
                    //     setValue([date.toDate(), date.toDate()]);
                    //   } else {
                    //     setValue([value[0], date.toDate()]);
                    //   }
                    // }
                  }}
                ></datePicker.datePicker> */}
                {/* <label.titlelg>
                {intl.formatMessage({
                  id: 'component.datepicker.ending',
                })}
              </label.titlelg>
              <input.medium
                onKeyPress={(evt) => {
                  evt = evt ? evt : window.event;
                  var charCode = evt.which ? evt.which : evt.keyCode;
                  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    evt.returnValue = false;
                    if (evt.preventDefault) evt.preventDefault();
                  }
                }}
                onClick={(e) => {
                  if (e.target.selectionStart >= 0 && e.target.selectionStart <= 2) {
                    e.target.selectionStart = 0;
                    e.target.selectionEnd = 2;
                  }
                  if (e.target.selectionStart >= 3 && e.target.selectionStart <= 5) {
                    e.target.selectionStart = 3;
                    e.target.selectionEnd = 5;
                  }
                  if (e.target.selectionStart >= 6 && e.target.selectionStart <= 10) {
                    e.target.selectionStart = 6;
                    e.target.selectionEnd = 10;
                  }
                }}
                value={endDate}
                onChange={(e) => {
                  if (
                    (e.target.value.length == 2 && !e.target.value.includes('/')) ||
                    (e.target.value.length == 5 &&
                      e.target.value.includes('/') &&
                      e.target.value.split('/').length == 2)
                  ) {
                    e.target.value += '/';
                  }
                  if (e.target.value.length >= 8 && !e.target.value.includes('/')) {
                    let mess = e.target.value.slice(0, 8);
                    e.target.value =
                      mess.slice(0, 2) + '/' + mess.slice(2, 4) + '/' + mess.slice(4, 8);
                  }
                  if (e.target.value.length <= 10) {
                    setEndDate(e.target.value);
                  }
                  if (e.target.selectionStart == 2) {
                    e.target.selectionStart = 3;
                    e.target.selectionEnd = 5;
                  }
                  if (e.target.selectionStart == 5) {
                    e.target.selectionStart = 6;
                    e.target.selectionEnd = 10;
                  }
                  setRangeValue('Custom');
                  const date = moment(e.target.value, format);
                  const dayOfMonth = date.date();
                  const month = date.month() + 1;
                  const year = date.year();
                  if (minDate && date < moment(minDate)) {
                    if (e.target.selectionStart == 10) {
                      if (date < value[0]) {
                        setValue([minDate, minDate]);
                      } else {
                        setValue([value[0], minDate]);
                      }
                    }
                    return;
                  }
                  if (dayOfMonth && month && year && e.target.value.length == 10) {
                    if (date < value[0]) {
                      setValue([date.toDate(), date.toDate()]);
                    } else {
                      setValue([value[0], date.toDate()]);
                    }
                  }
                }}
              ></input.medium> */}
              </div>
            </div>
            {/* <div className="mt-2" style={{ width: '550px' }}>
            <Calendar
              minDate={minDate ?? undefined}
              activeStartDate={activeStartDate}
              onActiveStartDateChange={(info) => {
                if (Array.isArray(info.value) || info.action === 'next' || info.action === 'prev') {
                  setActiveStartDate(info.activeStartDate);
                }
              }}
              className="custom-calendar"
              onClickDay={(val) => {
                setRangeValue('Custom');
              }}
              returnValue="range"
              onChange={(value) => {
                value[0].setHours(0, 0, 0, 0);
                value[1].setHours(0, 0, 0, 0);
                setValue([value[0], value[1]]);
              }}
              value={value}
              showFixedNumberOfWeeks={false}
              selectRange={true}
              showDoubleView={true}
              minDetail="month"
              showNeighboringMonth={false}
            />
          </div> */}
            <hr />
            <div className="d-flex align-items-center justify-content-end" style={{ gap: '10px' }}>
              {/* <buttonList.cancel
              className="datepicker-button-cancel"
              onClick={() => {
                setValue(
                  dateValue.map((item) => {
                    return new Date(item);
                  }),
                );
                setIsPopupOpen(false);
              }}
            /> */}
              <buttonList.normal
                onClick={() => {
                  setIsPopupOpen(false);
                  if (onChange) {
                    onChange(
                      moment(startDate, format).format('YYYY-MM-DD'),
                      moment(endDate, format).format('YYYY-MM-DD'),
                    );
                  }
                }}
                title={intl.formatMessage({
                  id: 'component.datepicker.apply',
                })}
                img={applyIcon}
              />
            </div>
          </div>
        </div>
      </>
    );
  },
);

export { DatePickerBooking, DatePicker };
