import './datepickerV2.less';
import moment from 'moment';
import { buttonList } from '../Button';
import { useState, useEffect } from 'react';
import { icon } from '@/components/Icon';
import iconSvg from './asset/date.svg';
const Calendar = ({ date, value, onChange, minDate, isRange, valueRange, from, maxDate, img }) => {
  const [monthYear, setMonthYear] = useState(moment().format('MM/YYYY'));
  const listdays = [...moment()._locale._weekdaysMin];
  useEffect(() => {
    if (date) {
      setMonthYear(date);
    }
  }, [date]);
  const [dataRef] = useState({ listM: [], listY: [] });
  return (
    <div className="Calendar-contaner">
      <div className="Calendar-header">
        <buttonList.Dropdown
          onClick={() => {
            if (!dataRef.slMonth && !dataRef.days) return;
            dataRef.slMonth.style.maxHeight = dataRef.days.offsetHeight + 'px';
            dataRef.slMonth.style.display =
              dataRef.slMonth.style.display == 'grid' ? 'none' : 'grid';

            let list = dataRef.y.querySelectorAll('.item-month');
            for (let i = 0; i < list.length; i++) {
              // console.log(list[i].className);
              if (list[i].className?.includes('ischoose')) {
                if (
                  dataRef.y.offsetHeight - list[i]?.getBoundingClientRect().top < 0 &&
                  list[i]?.getBoundingClientRect().top - dataRef.y?.getBoundingClientRect().top >
                    dataRef.y.offsetHeight
                ) {
                  dataRef.y.scrollTop +=
                    list[i]?.getBoundingClientRect().top - dataRef.y?.getBoundingClientRect().top;
                }
                if (
                  list[i]?.getBoundingClientRect().top - dataRef.y?.getBoundingClientRect().top <
                  0
                ) {
                  dataRef.y.scrollTop -=
                    dataRef.y?.getBoundingClientRect().top - list[i]?.getBoundingClientRect().top;
                }
                break;
              }
            }
            let listMonth = dataRef.m.querySelectorAll('.item-month');
            for (let i = 0; i < listMonth.length; i++) {
              if (listMonth[i].className?.includes('ischoose')) {
                if (
                  dataRef.m.offsetHeight - listMonth[i]?.getBoundingClientRect().top < 0 &&
                  listMonth[i]?.getBoundingClientRect().top -
                    dataRef.m?.getBoundingClientRect().top >
                    dataRef.m.offsetHeight
                ) {
                  dataRef.m.scrollTop +=
                    listMonth[i]?.getBoundingClientRect().top -
                    dataRef.m?.getBoundingClientRect().top;
                }
                if (
                  listMonth[i]?.getBoundingClientRect().top -
                    dataRef.m?.getBoundingClientRect().top <
                  0
                ) {
                  dataRef.m.scrollTop -=
                    dataRef.m?.getBoundingClientRect().top -
                    listMonth[i]?.getBoundingClientRect().top;
                }
                break;
              }
            }
          }}
          styleDrop={{
            overflow: 'unset',
          }}
          onRoot={false}
        >
          <div className="selectmonth-bt">
            {monthYear}
            <img src={icon.dropdow}></img>
          </div>
        </buttonList.Dropdown>
      </div>
      <div className="Calendar-component" ref={(e) => (dataRef.days = e)}>
        {listdays.map((i) => (
          <div
            className={`itemCalendar itemCalendar-head2 ${
              moment().format('MM/YYYY') == monthYear &&
              moment().format('dd').startsWith(i) &&
              'today'
            }`}
            key={i}
          >
            {i}
          </div>
        ))}
        {listdays.findIndex(
          (i) =>
            moment(monthYear, 'MM/YYYY').startOf('Month').format('dd').startsWith(i) &&
            i != moment()._locale._weekdaysMin[0],
        ) > 0 && (
          <div
            style={{
              gridColumn:
                '1 / span ' +
                listdays.findIndex((i) =>
                  moment(monthYear, 'MM/YYYY').startOf('Month').format('dd').startsWith(i),
                ),
            }}
            className={`itemCalendar`}
          ></div>
        )}
        {new Array(parseInt(moment(monthYear, 'MM/YYYY').endOf('month').format('DD')))
          .fill(null)
          .map((i, index) => {
            let getDay = index + 1 < 10 ? '0' + (index + 1) : index + 1;
            let valueClick = getDay + '/' + monthYear;

            return (
              <div
                onClick={() => {
                  if (onChange) onChange(valueClick);
                }}
                className={`${
                  ((minDate && moment(valueClick, 'DD/MM/YYYY').isBefore(moment(minDate))) ||
                    (maxDate && moment(valueClick, 'DD/MM/YYYY').isAfter(moment(maxDate)))) &&
                  'minmax'
                } itemCalendar ${
                  (isRange &&
                    valueRange &&
                    moment(valueClick, 'DD/MM/YYYY').isBetween(
                      moment(from ? value : valueRange, from ? 'DD/MM/YYYY' : 'YYYY-MM-DD').add(
                        -1,
                        'days',
                      ),
                      moment(from ? valueRange : value, from ? 'YYYY-MM-DD' : 'DD/MM/YYYY').add(
                        1,
                        'days',
                      ),
                    )) ||
                  valueClick == value
                    ? 'ischoose'
                    : ''
                }`}
                key={index}
              >
                {getDay}
              </div>
            );
          })}
      </div>
      <div className="selectmonth" ref={(e) => (dataRef.slMonth = e)}>
        <div className="group" ref={(e) => (dataRef.m = e)}>
          {new Array(12).fill(null).map((i, index) => {
            let item = (index + 1 < 10 ? '0' : '') + (index + 1);

            return (
              <div
                ref={(e) => dataRef.listM.push(e)}
                className={`item-month ${item + '' == monthYear.split('/')[0] ? 'ischoose' : ''}`}
                onClick={() => {
                  setMonthYear(item + '/' + monthYear.split('/')[1]);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="group" ref={(el) => (dataRef.y = el)}>
          {new Array(200).fill(null).map((i, index) => {
            let item = 1900 + index;
            return (
              <div
                ref={(el) => {
                  // setTimeout(() => {
                  //   if (index == 100 && el && dataRef.y) {
                  //     dataRef.y.scrollTop = 1000;
                  //     console.log(dataRef.y.scrollTop);
                  //   }
                  // }, 500);
                  dataRef.listY.push(el);
                  // if (el && dataRef.y) {
                  //   dataRef.y.scrollTop = 100;
                  // }
                }}
                className={`item-month ${item == monthYear.split('/')[1] ? 'ischoose' : ''}`}
                onClick={() => {
                  setMonthYear(monthYear.split('/')[0] + '/' + item);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const datepicker = {
  datepicker: ({
    value,
    disabled,
    img,
    onChange,

    minDate,
    onRoot = true,
    isRange = false,
    valueRange,
    from,
    maxDate,
  }) => {
    const [date, setDate] = useState({
      day: value ? moment(value).format('DD') : '',
      month: value ? moment(value).format('MM') : '',
      year: value ? moment(value).format('YYYY') : '',
    });
    const [minMax] = useState({});
    const [dateRef] = useState({
      day: null,
      month: null,
      year: null,
    });

    const setData = (dataIndex, value1) => {
      if (value1 == '' || value1.slice(-1) == 0 || 0 / value1.slice(-1) == 0) {
        data[dataIndex] = value1;
        setDate({ ...date, [dataIndex]: value1.trim() });
      }
    };
    const [data] = useState({
      day: value ? moment(value).format('DD') : '',
      month: value ? moment(value).format('MM') : '',
      year: value ? moment(value).format('YYYY') : '',
    });
    useEffect(() => {
      if (value) {
        console.log(value);
        setDate({
          day: value ? moment(value).format('DD') : '',
          month: value ? moment(value).format('MM') : '',
          year: value ? moment(value).format('YYYY') : '',
        });
        data.day = value ? moment(value).format('DD') : '';
        data.month = value ? moment(value).format('MM') : '';
        data.year = value ? moment(value).format('YYYY') : '';
      }
    }, [value]);
    useEffect(() => {
      if (minDate) minMax.min = minDate;
      if (minDate) minMax.max = maxDate;
    }, [minDate, maxDate]);
    return (
      <buttonList.Dropdown
        focusEvent={isRange && !img}
        readOnly={disabled}
        onRoot={onRoot}
        autoWidth
        onClickClose={() => {
          if (
            !onChange &&
            ((minMax.min &&
              moment([data.day, data.month, data.year].join('/'), 'DD/MM/YYYY').isBefore(
                moment(minMax.min),
              )) ||
              Object.keys(data).find((i) => data[i] == '' || !data[i]) ||
              data.year < 1900 ||
              !moment(data.day + '/' + data.month + '/' + data.year, 'DD/MM/YYYY')._isValid)
          ) {
            data.day = '';
            data.month = '';
            data.year = '';

            setDate({
              day: '',
              month: '',
              year: '',
            });
          } else {
            if (onChange) {
              if (
                minMax.min &&
                moment([data.year, data.month, data.day].join('-')).isBefore(moment(minMax.min))
              )
                onChange(moment(minMax.min).format('YYYY-MM-DD'));
              else if (
                minMax.max &&
                moment([data.year, data.month, data.day].join('-')).isAfter(moment(minMax.max))
              )
                onChange(moment(minMax.max).format('YYYY-MM-DD'));
              else onChange([data.year, data.month, data.day].join('-'));
            }
          }
        }}
        isClickClose={false}
        content={() => {
          return (
            <Calendar
              maxDate={maxDate}
              isRange={isRange}
              from={from}
              valueRange={valueRange}
              minDate={minDate}
              onChange={(e) => {
                data.day = e.split('/')[0];
                data.month = e.split('/')[1];
                data.year = e.split('/')[2];
                setDate({
                  day: e.split('/')[0],
                  month: e.split('/')[1],
                  year: e.split('/')[2],
                });
              }}
              value={
                // date.year < 1000 ||
                !moment(date.day + '/' + date.month + '/' + date.year, 'DD/MM/YYYY')._isValid
                  ? null
                  : date.day +
                    '/' +
                    (date.month.length < 2 ? '0' + date.month : date.month) +
                    '/' +
                    date.year
              }
              date={
                date.year < 1000 ||
                Object.keys(data).find((i) => i != 'day' && (data[i] == '' || !data[i])) ||
                !moment(date.month + '/' + date.year, 'MM/YYYY')._isValid
                  ? null
                  : date.month + '/' + date.year
              }
            ></Calendar>
          );
        }}
      >
        <div className="DatepickerV2">
          <input
            onClick={(e) => {
              setTimeout(() => {
                e.target.select();
              }, 50);
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            ref={(e) => (dateRef.day = e)}
            style={{
              width: '20px',
            }}
            maxLength={2}
            value={date.day}
            onBlur={(e) => {
              if (e.target.value.length == 1) {
                setData('day', '0' + e.target.value);
              }
            }}
            onChange={(e) => {
              setData('day', e.target.value);
              if (data.day.length == 2) {
                dateRef.month.focus();
              }
            }}
          ></input>
          /
          <input
            onClick={(e) => {
              setTimeout(() => {
                e.target.select();
              }, 50);
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            ref={(e) => (dateRef.month = e)}
            style={{
              width: '20px',
            }}
            onBlur={(e) => {
              if (e.target.value.length == 1) {
                setData('month', '0' + e.target.value);
              }
            }}
            maxLength={2}
            value={date.month}
            onChange={(e) => {
              setData('month', e.target.value);
              if (data.month.length == 2) {
                dateRef.year.focus();
              }
            }}
          ></input>
          /
          <input
            onClick={(e) => {
              setTimeout(() => {
                e.target.select();
              }, 50);
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            ref={(e) => (dateRef.year = e)}
            style={{
              width: '45px',
            }}
            maxLength={4}
            value={date.year}
            onChange={(e) => {
              setData('year', e.target.value);
            }}
          ></input>
          {!img && <img height={20} src={iconSvg}></img>}
        </div>
      </buttonList.Dropdown>
    );
  },

  rangePicker: ({ disabled = false, value, onRoot, onChange }) => {
    const [valueRange, setValueRange] = useState({});
    const [data] = useState({});
    useEffect(() => {
      if (value) {
        data.from = moment(value[0]).format('YYYY-MM-DD');
        data.to = moment(value[1]).format('YYYY-MM-DD');

        setValueRange({ ...data });
      }
    }, [value]);

    return (
      <div className={'datepickerV2-range ' + (disabled == true ? 'disabledRange' : '')}>
        <datepicker.datepicker
          from
          isRange
          onRoot={onRoot}
          img
          value={valueRange?.from}
          valueRange={valueRange?.to}
          onChange={(e) => {
            if (e == data.from) return;
            if (moment(e).isAfter(moment(data.from))) data.to = e;
            data.from = e;

            if (onChange) onChange(data);
            if (!value) setValueRange({ ...data });
          }}
        ></datepicker.datepicker>
        ~
        <datepicker.datepicker
          onRoot={onRoot}
          minDate={valueRange?.from}
          value={valueRange?.to}
          isRange
          valueRange={valueRange?.from}
          onChange={(e) => {
            if (e == data.to) return;
            data.to = e;
            if (onChange) onChange(data);
            if (!value) setValueRange({ ...data });
          }}
        ></datepicker.datepicker>
      </div>
    );
  },
};
export { datepicker };
