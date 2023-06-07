import React, { useState, useEffect, useRef } from 'react';
import { select } from '@/components/Select';
import { label } from '@/components/Label';

import { useModel, useIntl } from 'umi';
import 'react-calendar/dist/Calendar.css';
import './datePickerSearchBill.less';
import { buttonList } from '@/components/Button';
import moment from 'moment';
import applyIcon from './assets/apply.svg';
import { datePicker } from '@/components/DatepickerMui';
const DatePickerSearchBill = React.forwardRef(({ dateValue, onChange, setShowSelect }, ref) => {
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
      id: 'component.datepicker.range.lastyear',
    }),
  );

  const [titleDate, setTitleDate] = useState();
  // const datepickerRef = useRef();
  const firstTimeRef = useRef(true);
  const getDateFromNow = (dayNum) => {
    const date = new Date(systemDate);
    date.setDate(new Date(systemDate).getDate() - dayNum);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const dateNow = getDateFromNow(0);
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
          ? moment(value[0]).format(format)
          : `${moment(value[0]).format(format)} - ${moment(value[1]).format(format)}`,
      );
    }
    setValue([beginDate, endDate]);
  }, [dateValue]);

  useEffect(() => {
    setStartDate(moment(value[0]).format(format));
    setEndDate(moment(value[1]).format(format));
    const find = rangeList.find(
      (item) =>
        item.value[0].getTime() == value[0].getTime() &&
        item.value[1].getTime() == value[1].getTime(),
    );
    if (find) setRangeValue(find.name);
  }, [value]);
  const rangeList = [
    // {
    //   name: intl.formatMessage({
    //     id: 'component.datepicker.range.yesterday',
    //   }),
    //   onClick: () => {
    //     const yesterday = new Date(getDateFromNow(1));
    //     setValue([yesterday, dateNow]);
    //   },
    //   value: [new Date(getDateFromNow(1)), new Date(dateNow)],
    // },
    // {
    //   name: intl.formatMessage({
    //     id: 'component.datepicker.range.lastweek',
    //   }),
    //   onClick: () => {
    //     const startDate = new Date(getDateFromNow(8));
    //     const endDate = new Date(dateNow);
    //     setValue([startDate, endDate]);
    //   },
    //   value: [new Date(getDateFromNow(8)), new Date(dateNow)],
    // },
    // {
    //   name: intl.formatMessage({
    //     id: 'component.datepicker.range.lastmonth',
    //   }),
    //   onClick: () => {
    //     const startDate = new Date(getDateFromNow(31));
    //     const endDate = new Date(dateNow);
    //     setValue([startDate, endDate]);
    //   },
    //   value: [new Date(getDateFromNow(31)), new Date(dateNow)],
    // },
    // {
    //   name: intl.formatMessage({
    //     id: 'component.datepicker.range.lastyear',
    //   }),
    //   onClick: () => {
    //     const startDate = new Date(getDateFromNow(365));
    //     const endDate = new Date(dateNow);
    //     setValue([startDate, endDate]);
    //   },
    //   value: [new Date(getDateFromNow(365)), new Date(dateNow)],
    // },

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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    <div className="date-picker-search-bill-container">
      <div
        className="datepicker-content p-2"
        style={{ right: offsetLeft < 0 ? 'unset' : '0%', left: offsetLeft < 0 ? '0%' : 'unset' }}
      >
        <div className="d-flex align-items-center justify-content-between" style={{ gap: '40px' }}>
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
              ref={ref}
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
                if (onChange) {
                  onChange(
                    moment(moment(e).format('DD/MM/YYYY'), format).format('YYYY-MM-DD'),
                    moment(endDate, format).format('YYYY-MM-DD'),
                  );
                }
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
            ></datePicker.datePicker>
            {/* <label.titlelg>
              {intl.formatMessage({
                id: 'component.datepicker.starting',
              })}
            </label.titlelg>
            <input.medium
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
              value={startDate}
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
            <datePicker.datePicker
              onRoot={false}
              placeholder={intl.formatMessage({
                id: 'component.datepicker.ending',
              })}
              value={moment(endDate, 'DD/MM/YYYY')}
              onChange={(e) => {
                setRangeValue('Custom');
                setEndDate(moment(e).format('DD/MM/YYYY'));
                onChange(
                  moment(startDate, format).format('YYYY-MM-DD'),
                  moment(moment(e).format('DD/MM/YYYY'), format).format('YYYY-MM-DD'),
                );
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
            ></datePicker.datePicker>
            {/* <label.titlelg>
              {intl.formatMessage({
                id: 'component.datepicker.ending',
              })}
            </label.titlelg>
            <input.medium
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
        <div className="mt-2" style={{ width: '500px' }}>
          {/* <Calendar
            onClickDay={() => {
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
          /> */}
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-end" style={{ gap: '10px' }}>
          <buttonList.cancel
            className="datepicker-button-cancel"
            onClick={() => {
              setValue(
                dateValue.map((item) => {
                  return new Date(item);
                }),
              );
              setShowSelect(false);
            }}
          />
          <buttonList.normal
            onClick={() => {
              setShowSelect(false);
              if (onChange) {
                onChange(
                  moment(startDate, format).format('MM/DD/YYYY'),
                  moment(endDate, format).format('MM/DD/YYYY'),
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
  );
});

export { DatePickerSearchBill };
