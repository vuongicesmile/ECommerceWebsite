import React, { useState, useEffect, useRef } from 'react';
import './index.less';
import dateSvg from './asset/date.svg';
import moment from 'moment';
import { label } from '@/components/Label';
import { useIntl, useModel } from 'umi';
import { createPortal } from 'react-dom';
import closeIcon from './asset/close.svg';
const datePicker = {
  datePicker: ({
    defaultValue,
    isDob = false,
    isExpiredDay = false,
    minDate,
    onRoot = true,
    onflex = false,
    placeholder,
    onChange,
    maxDate,
    value,
    disabled = false,
  }) => {
    const [listday, setListDay] = useState();
    const [minMax, setMinMax] = useState();
    // const [listM,setListM]=useState([]);
    // const [listY,setListY]=useState([]);
    const [slm, setSlm] = useState(31);
    const [position, setPosition] = useState({
      x: 0,
      y: 0,
    });
    let datePicker = {
      d: [],
      m: [],
      y: [],
    };

    const clickDrop = useRef();
    const clickDropscroll = useRef([]);
    const clickDropscrollcontainer = useRef([]);
    const clickDropContainer = useRef();
    const { systemDate } = useModel('systemdate');
    const [dateDefault, setDateDefault] = useState([]);
    useEffect(() => {
      if (moment(value).isValid()) {
        let i = moment(value).format('DD/MM/YYYY').split('/')[1];
        '01,03,05,07,08,10,12'.includes(i)
          ? setSlm(31)
          : '04,06,09,11'.includes(i)
          ? setSlm(30)
          : ('02'.includes(i) &&
              inputref.current[2].value % 4 === 0 &&
              inputref.current[2].value % 100 !== 0 &&
              inputref.current[2].value % 400 !== 0) ||
            ('02'.includes(i) &&
              inputref.current[2].value % 100 === 0 &&
              inputref.current[2].value % 400 === 0)
          ? setSlm(29)
          : '02'.includes(i)
          ? setSlm(28)
          : undefined;
        setDateDefault(moment(value).format('DD/MM/YYYY').split('/'));
      } else {
        setDateDefault('');
        inputref.current[1].value = '';
        inputref.current[2].value = '';
        inputref.current[0].value = '';
      }
      // setDateDefault(moment(systemDate).format('DD/MM/YYYY').split('/'));
    }, [value]);

    // useEffect(() => {
    //   if (dateDefault.length == 3) {
    //     inputref.current[0].value = dateDefault[0];
    //     inputref.current[1].value = dateDefault[1];
    //     inputref.current[2].value = dateDefault[2];
    //   }
    // }, [dateDefault]);
    useEffect(() => {
      for (let i = 1; i <= 31; i++) {
        datePicker.d.push(i < 10 ? '0' + i : i);
        i <= 12 ? datePicker.m.push(i < 10 ? '0' + i : i) : undefined;
      }
      if (isExpiredDay) {
        let year = moment().year() - 40;
        for (let i = 0; i <= 80; i++) {
          datePicker.y.push(year + i);
        }
      } else if (!isDob) {
        let year = moment().year() - 5;
        for (let i = 0; i <= 10; i++) {
          datePicker.y.push(year + i);
        }
      } else {
        for (let i = 1900; i <= moment().format('YYYY'); i++) {
          datePicker.y.push(i);
        }
      }
      setListDay(datePicker);
      document.addEventListener('mousedơwn', (e) => {
        if (clickDrop.current) {
          if (
            !clickDropContainer.current.contains(e.target) &&
            !clickDrop.current.contains(e.target)
          ) {
            onchange();
          }
        }
      });
      document.removeEventListener('mousedơwn', (e) => {
        if (clickDropContainer.current) {
          if (
            !clickDropContainer.current.contains(e.target) &&
            !clickDrop.current.contains(e.target)
          ) {
            onchange();
          }
        }
      });
      document.addEventListener('mouseup', (e) => {
        if (clickDrop.current) {
          if (
            !clickDropContainer.current.contains(e.target) &&
            !clickDrop.current.contains(e.target)
          ) {
            clickDrop.current.style.display = 'none';
          }
        }
      });
      document.removeEventListener('mouseup', (e) => {
        if (clickDropContainer.current) {
          if (
            !clickDropContainer.current.contains(e.target) &&
            !clickDrop.current.contains(e.target)
          ) {
            clickDrop.current.style.display = 'none';
          }
        }
      });
    }, []);
    const onchange = (month = false) => {
      inputref.current[2].value != '' && listday.y[listday.y.length - 1] < inputref.current[2].value
        ? (inputref.current[2].value = listday.y[listday.y.length - 1])
        : inputref.current[2].value != '' && inputref.current[2].value < listday.y[0]
        ? (inputref.current[2].value = listday.y[0])
        : undefined;
      if (inputref.current[1].value != '' && inputref.current[2].value != '') {
        let maxdate = moment(
          '01/' + inputref.current[1].value + '/' + inputref.current[2].value,
          'DD/MM/YYYY',
        )
          .endOf('month')
          .format('DD');
        if (inputref.current[0].value > maxdate) {
          if (month) inputref.current[0].value = '';
          else return (inputref.current[1].value = '');
        }
      }
      let asv = moment(systemDate).format('MM/DD/YYYY').split('/');
      let vv2 =
        inputref.current[2].value +
        '-' +
        inputref.current[1].value +
        '-' +
        inputref.current[0].value;
      let a1 =
        inputref.current[1].value && inputref.current[1].value != ''
          ? inputref.current[1].value
          : asv[1];
      let a2 =
        inputref.current[2].value != null && inputref.current[2].value != ''
          ? inputref.current[2].value
          : asv[2];
      let a0 =
        inputref.current[0].value && inputref.current[0].value != ''
          ? inputref.current[0].value
          : asv[0];
      let vv = a1 + '-' + a0 + '-' + a2;
      // console.log(vv);
      if (
        inputref.current[0].value != '' &&
        inputref.current[1].value != '' &&
        inputref.current[2].value != ''
      ) {
        inputref.current[2].value != '' &&
        listday.y[listday.y.length - 1] < inputref.current[2].value
          ? (inputref.current[2].value = listday.y[listday.y.length - 1])
          : inputref.current[2].value != '' && inputref.current[2].value < listday.y[0]
          ? (inputref.current[2].value = listday.y[0])
          : undefined;
        let asv = moment(systemDate).format('MM/DD/YYYY').split('/');
        let vv2 =
          inputref.current[2].value +
          '-' +
          inputref.current[1].value +
          '-' +
          inputref.current[0].value;
        let a1 =
          inputref.current[1].value && inputref.current[1].value != ''
            ? inputref.current[1].value
            : asv[1];
        let a2 =
          inputref.current[2].value != null && inputref.current[2].value != ''
            ? inputref.current[2].value
            : asv[2];
        let a0 =
          inputref.current[0].value && inputref.current[0].value != ''
            ? inputref.current[0].value
            : asv[0];
        let vv = a1 + '-' + a0 + '-' + a2;
        let vvv = a2 + '-' + a0 + '-' + a1;
        if (
          (minDate && moment(vv2, 'YYYY-MM-DD').diff(moment(minDate), 'days') < 0) ||
          (maxDate && moment(vv2, 'YYYY-MM-DD').diff(moment(maxDate), 'days') > 0)
        ) {
          if (minDate && moment(vv2, 'YYYY-MM-DD').diff(moment(minDate), 'days') < 0) {
            onChange ? onChange(minDate) : undefined;
          }
          if (maxDate && moment(vv2, 'YYYY-MM-DD').diff(moment(maxDate), 'days') > 0) {
            onChange ? onChange(maxDate) : undefined;
          }
        } else {
          onChange ? onChange(vv) : undefined;
        }
      }
    };
    const inputref = useRef([]);
    const formatNumber = (ref, e) => {
      let value = '';
      e.split('').map((i, index) => {
        if (index <= 9 && !isNaN(i)) {
          value += i;
        }
      });
      ref.value = value;
    };
    useEffect(() => {
      if (dateDefault.length == 3) {
        inputref.current[1].value = dateDefault[1];
        inputref.current[2].value = dateDefault[2];
        inputref.current[0].value = dateDefault[0];
      }
      for (let i = 0; i < clickDropscrollcontainer.current.length; i++) {
        if (
          clickDropscrollcontainer.current[i].offsetHeight -
            clickDropscroll.current[i]?.getBoundingClientRect().top <
            0 &&
          clickDropscroll.current[i]?.getBoundingClientRect().top -
            clickDropscrollcontainer.current[i]?.getBoundingClientRect().top >
            clickDropscrollcontainer.current[i].offsetHeight
        ) {
          clickDropscrollcontainer.current[i].scrollTop +=
            clickDropscroll.current[i]?.getBoundingClientRect().top -
            clickDropscrollcontainer.current[i]?.getBoundingClientRect().top;
        }
        if (
          clickDropscroll.current[i]?.getBoundingClientRect().top -
            clickDropscrollcontainer.current[i]?.getBoundingClientRect().top <
          0
        ) {
          clickDropscrollcontainer.current[i].scrollTop -=
            clickDropscrollcontainer.current[i]?.getBoundingClientRect().top -
            clickDropscroll.current[i]?.getBoundingClientRect().top;
        }
      }
    }, [dateDefault]);

    // useEffect(() => {
    //   let vv =
    //     inputref.current[1].value +
    //     '-' +
    //     inputref.current[0].value +
    //     '-' +
    //     inputref.current[2].value;
    //   console.log(moment(vv, 'YYYY-MM-DD'));
    //   console.log(minDate);
    //   // if (moment(vv, 'YYYY-MM-DD').diff(moment(minDate, 'YYYY/MM/DD'), 'days') < 0) {
    //   //   onChange ? onChange(minDate) : undefined;
    //   // }
    // }, [minDate]);
    const clear = useRef();
    return (
      <div
        style={{ width: 'max-content' }}
        onMouseMove={() => {
          if (!disabled) {
            clear.current.style.display = 'revert';
          }
        }}
        onMouseLeave={() => (clear.current.style.display = 'none')}
        className={onflex ? ` datePicker-component2` : ` datePicker-component`}
        id="clickDropContainer"
      >
        {placeholder ? <label.titlesm>{placeholder}</label.titlesm> : undefined}
        <div
          style={{
            position: 'relative',
            width: 'max-content',
          }}
        >
          <div
            onClick={() => {
              onChange('');
            }}
            ref={clear}
            className="clearDate"
          >
            <img src={closeIcon}></img>
          </div>
          <div
            ref={clickDropContainer}
            className={`${disabled ? 'datePickerDisable' : ''} datePicker-handmake`}
            style={placeholder && { width: 'max-content' }}
          >
            <div>
              <input
                defaultValue={dateDefault[0]}
                onFocus={() => {
                  inputref.current[0].select();
                }}
                onClick={() => {
                  setTimeout(() => {
                    inputref.current[0].select();
                  }, 50);
                }}
                onBlur={(e) => {
                  let vv =
                    inputref.current[2].value +
                    '/' +
                    inputref.current[1].value +
                    '/' +
                    e.target.value;

                  e.target.value.split('').length == 1
                    ? (inputref.current[0].value = `0` + e.target.value)
                    : undefined;

                  if (
                    // (e.target.value > 31 && '01,03,05,07,08,10,12'.includes(dateDefault[1] + '')) ||
                    // (e.target.value > 30 && '04,06,09,11'.includes(dateDefault[1] + '')) ||
                    // (e.target.value > 28 && '02'.includes(dateDefault[1] + '')) ||
                    e.target.value > 31 ||
                    e.target.value == '' ||
                    e.target.value == 0 ||
                    (inputref.current[0].value != '' &&
                      inputref.current[1].value != '' &&
                      inputref.current[2].value != '' &&
                      minDate &&
                      moment(vv, 'YYYY/MM/DD').diff(moment(minDate, 'YYYY/MM/DD'), 'days') < 0) ||
                    (inputref.current[0].value != '' &&
                      inputref.current[1].value != '' &&
                      inputref.current[2].value != '' &&
                      maxDate &&
                      moment(vv, 'YYYY/MM/DD').diff(moment(maxDate, 'YYYY/MM/DD'), 'days') > 0)
                  ) {
                    if (minDate) {
                      inputref.current[0].value = moment(minDate).format('DD');
                      inputref.current[1].value = moment(minDate).format('MM');
                      inputref.current[2].value = moment(minDate).format('YYYY');
                    } else if (moment(value).isValid) {
                      inputref.current[0].value = dateDefault[0];
                    } else inputref.current[0].value = '01';
                    onchange();
                  } else {
                    onchange();
                  }
                }}
                onChange={(e) => {
                  formatNumber(inputref.current[0], e.target.value);
                  inputref.current[0].value = e.target.value;
                  e.target.value.split('').length == 2 ? inputref.current[1].focus() : undefined;
                }}
                ref={(el) => (inputref.current[0] = el)}
                maxLength={2}
              ></input>
              /
              <input
                disabled={disabled}
                defaultValue={dateDefault[1]}
                onBlur={(e) => {
                  let number =
                    e.target.value.split('').length == 1 ? `0` + e.target.value : e.target.value;
                  let vv =
                    inputref.current[2].value + '/' + number + '/' + inputref.current[0].value;
                  if (
                    e.target.value > 12 ||
                    e.target.value == '' ||
                    (inputref.current[0].value != '' &&
                      inputref.current[1].value != '' &&
                      inputref.current[2].value != '' &&
                      minDate &&
                      moment(vv, 'YYYY/MM/DD').diff(moment(minDate, 'YYYY/MM/DD'), 'days') < 0) ||
                    (inputref.current[0].value != '' &&
                      inputref.current[1].value != '' &&
                      inputref.current[2].value != '' &&
                      maxDate &&
                      moment(vv, 'YYYY/MM/DD').diff(moment(maxDate, 'YYYY/MM/DD'), 'days') > 0) ||
                    e.target.value == 0
                  ) {
                    if (minDate) {
                      inputref.current[0].value = moment(minDate).format('DD');
                      inputref.current[1].value = moment(minDate).format('MM');
                      inputref.current[2].value = moment(minDate).format('YYYY');
                    } else inputref.current[1].value = '01';
                    onchange(true);
                  } else {
                    if (moment(value).isValid) {
                      e.target.value.split('').length == 1
                        ? (inputref.current[1].value = `0` + e.target.value)
                        : e.target.value.split('').length == 0
                        ? (inputref.current[1].value = dateDefault[1])
                        : undefined;
                      onchange(true);
                    } else {
                      onchange(true);
                    }
                  }
                }}
                onClick={() => {
                  setTimeout(() => {
                    inputref.current[1].select();
                  }, 50);
                }}
                onFocus={() => {
                  inputref.current[1].select();
                }}
                onChange={(e) => {
                  formatNumber(inputref.current[1], e.target.value);
                  inputref.current[1].value = e.target.value;
                  e.target.value.split('').length == 2 ? inputref.current[2].focus() : undefined;
                }}
                ref={(el) => (inputref.current[1] = el)}
                maxLength={2}
              ></input>
              /
              <input
                onFocus={() => {
                  inputref.current[2].select();
                }}
                onClick={() => {
                  setTimeout(() => {
                    inputref.current[2].select();
                  }, 50);
                }}
                disabled={disabled}
                defaultValue={dateDefault[2]}
                onChange={(e) => {
                  formatNumber(inputref.current[2], e.target.value);
                  e.target.value.split('').length == 4 ? inputref.current[2].blur() : undefined;
                }}
                onBlur={(e) => {
                  let vv =
                    e.target.value +
                    '/' +
                    inputref.current[1].value +
                    '/' +
                    inputref.current[0].value;
                  // e.target.value.split('').length < 4
                  //   ? (inputref.current[2].value = dateDefault[2] ? dateDefault[2] : onchange())
                  //   : undefined;
                  if (
                    e.target.value == '' ||
                    e.target.value.split('').length < 4 ||
                    e.target.value > listday.y[listday.y.length - 1] ||
                    e.target.value < listday.y[0] ||
                    (minDate &&
                      moment(vv, 'YYYY/MM/DD').diff(moment(minDate, 'YYYY/MM/DD'), 'days') < 0) ||
                    (maxDate &&
                      moment(vv, 'YYYY/MM/DD').diff(moment(maxDate, 'YYYY/MM/DD'), 'days') > 0)
                  ) {
                    if (minDate) {
                      inputref.current[0].value = moment(minDate).format('DD');
                      inputref.current[1].value = moment(minDate).format('MM');
                      inputref.current[2].value = moment(minDate).format('YYYY');
                    } else inputref.current[2].value = dateDefault[2] ? dateDefault[2] : '';
                  } else {
                    onchange();
                  }
                }}
                ref={(el) => (inputref.current[2] = el)}
                maxLength={4}
              ></input>
            </div>
            <div>
              <img
                onClick={() => {
                  // let promise = new Promise((resolve, reject) => {
                  //   clickDropscroll.current[0]?.scrollIntoView();
                  // });
                  // let promise2 = new Promise((resolve, reject) => {
                  //   clickDropscroll.current[1]?.scrollIntoView();
                  // });
                  let rect = clickDropContainer.current?.getBoundingClientRect();
                  let a = window.innerHeight - rect.bottom - 200;
                  if (clickDrop.current.style.display == 'grid') {
                    clickDrop.current.style.display = 'none';
                  } else {
                    clickDrop.current.style.display = 'grid';
                    onRoot
                      ? (clickDrop.current.style.transform = `translate(${rect.left}px,${
                          a > 0 ? rect.bottom : rect.bottom - 235
                        }px)`)
                      : undefined;
                  }

                  // promise.then(promise2.then(clickDropscroll.current[2]?.scrollIntoView()));
                  for (let i = 0; i < clickDropscrollcontainer.current.length; i++) {
                    if (
                      clickDropscrollcontainer.current[i].offsetHeight -
                        clickDropscroll.current[i]?.getBoundingClientRect().top <
                        0 &&
                      clickDropscroll.current[i]?.getBoundingClientRect().top -
                        clickDropscrollcontainer.current[i]?.getBoundingClientRect().top >
                        clickDropscrollcontainer.current[i].offsetHeight
                    ) {
                      clickDropscrollcontainer.current[i].scrollTop +=
                        clickDropscroll.current[i]?.getBoundingClientRect().top -
                        clickDropscrollcontainer.current[i]?.getBoundingClientRect().top;
                    }
                    if (
                      clickDropscroll.current[i]?.getBoundingClientRect().top -
                        clickDropscrollcontainer.current[i]?.getBoundingClientRect().top <
                      0
                    ) {
                      clickDropscrollcontainer.current[i].scrollTop -=
                        clickDropscrollcontainer.current[i]?.getBoundingClientRect().top -
                        clickDropscroll.current[i]?.getBoundingClientRect().top;
                    }
                  }
                }}
                src={dateSvg}
              ></img>
            </div>
          </div>
        </div>
        {onRoot ? (
          createPortal(
            <div ref={clickDrop} style={{ top: '0' }} className=" dateDropPicker">
              <div
                ref={(el) => (clickDropscrollcontainer.current[0] = el)}
                className="dropitemPicker"
              >
                {listday?.d
                  .filter((i) => i <= slm)
                  .map((i, index) => (
                    <div
                      ref={(el) => {
                        dateDefault[0] == i ? (clickDropscroll.current[0] = el) : undefined;
                      }}
                      className={`${dateDefault[0] == i ? 'onSelectDate' : ''} ${
                        // (minDate &&
                        //   parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[2]) >
                        //     parseInt(dateDefault[2])) ||
                        // (maxDate &&
                        //   moment(maxDate).format('DD/MM/YYYY').split('/')[2] <
                        //     parseInt(dateDefault[2]))
                        //   ? 'disable'
                        //   : (minDate &&
                        //       parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[1]) >
                        //         parseInt(dateDefault[1])) ||
                        //     (maxDate &&
                        //       moment(maxDate).format('DD/MM/YYYY').split('/')[1] <
                        //         parseInt(dateDefault[1]))
                        //   ? 'disable'
                        //   : (minDate &&
                        //       parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[1]) ==
                        //         parseInt(dateDefault[1]) &&
                        //       parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[0]) >
                        //         parseInt(i)) ||
                        //     (maxDate &&
                        //       moment(maxDate).format('DD/MM/YYYY').split('/')[1] ==
                        //         parseInt(dateDefault[1]) &&
                        //       moment(maxDate).format('DD/MM/YYYY').split('/')[0] < parseInt(i))
                        (minDate &&
                          moment(
                            dateDefault[2] + '-' + dateDefault[1] + '-' + i,
                            'YYYY-MM-DD',
                          ).diff(moment(minDate, 'YYYY/MM/DD'), 'days') < 0) ||
                        (maxDate &&
                          moment(
                            dateDefault[2] + '-' + dateDefault[1] + '-' + i,
                            'YYYY-MM-DD',
                          ).diff(moment(maxDate, 'YYYY/MM/DD'), 'days') > 0)
                          ? 'disable'
                          : ''
                      }  `}
                      onClick={() => {
                        inputref.current[0].value = i;
                        onchange();
                      }}
                      key={index}
                    >
                      {i}
                    </div>
                  ))}
              </div>

              <div
                ref={(el) => (clickDropscrollcontainer.current[1] = el)}
                className="dropitemPicker"
              >
                {' '}
                {listday?.m.map((i, index) => (
                  <div
                    ref={(el) => {
                      dateDefault[1] == i ? (clickDropscroll.current[1] = el) : undefined;
                    }}
                    className={`${dateDefault[1] == i ? 'onSelectDate' : ''} ${
                      (minDate &&
                        parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[2]) >
                          parseInt(dateDefault[2])) ||
                      (maxDate &&
                        moment(maxDate).format('DD/MM/YYYY').split('/')[2] <
                          parseInt(dateDefault[2]))
                        ? 'disable'
                        : minDate &&
                          parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[2]) >
                            parseInt(dateDefault[2])
                        ? 'disable'
                        : (minDate &&
                            parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[2]) ==
                              parseInt(dateDefault[2]) &&
                            parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[1]) >
                              parseInt(i)) ||
                          (maxDate &&
                            moment(maxDate).format('DD/MM/YYYY').split('/')[2] ==
                              parseInt(dateDefault[2]) &&
                            moment(maxDate).format('DD/MM/YYYY').split('/')[1] < parseInt(i))
                        ? 'disable'
                        : ''
                    } `}
                    onClick={() => {
                      '01,03,05,07,08,10,12'.includes(i)
                        ? setSlm(31)
                        : '04,06,09,11'.includes(i)
                        ? setSlm(30)
                        : ('02'.includes(i) &&
                            inputref.current[2].value % 4 === 0 &&
                            inputref.current[2].value % 100 !== 0 &&
                            inputref.current[2].value % 400 !== 0) ||
                          ('02'.includes(i) &&
                            inputref.current[2].value % 100 === 0 &&
                            inputref.current[2].value % 400 === 0)
                        ? setSlm(29)
                        : '02'.includes(i)
                        ? setSlm(28)
                        : undefined;
                      inputref.current[1].value = i;
                      onchange();
                    }}
                    key={index}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div
                ref={(el) => (clickDropscrollcontainer.current[2] = el)}
                className="dropitemPicker"
              >
                {listday?.y.map((i, index) => (
                  <div
                    ref={(el) => {
                      dateDefault[2] == i ? (clickDropscroll.current[2] = el) : undefined;
                    }}
                    className={`${dateDefault[2] == i ? 'onSelectDate' : ''} ${
                      (minDate &&
                        parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[2]) >
                          parseInt(i)) ||
                      (maxDate && moment(maxDate).format('DD/MM/YYYY').split('/')[2] < parseInt(i))
                        ? 'disable'
                        : ''
                    } `}
                    onClick={() => {
                      ('02'.includes(inputref.current[1].value) &&
                        i % 4 === 0 &&
                        i % 100 !== 0 &&
                        i % 400 !== 0) ||
                      ('02'.includes(inputref.current[1].value) && i % 100 === 0 && i % 400 === 0)
                        ? setSlm(29)
                        : '02'.includes(inputref.current[1].value)
                        ? setSlm(28)
                        : undefined;
                      inputref.current[2].value = i;
                      onchange();
                    }}
                    key={index}
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>,
            document.getElementById('root'),
          )
        ) : (
          <div ref={clickDrop} style={{ top: '100% ' }} className=" dateDropPicker">
            <div
              ref={(el) => (clickDropscrollcontainer.current[0] = el)}
              className="dropitemPicker"
            >
              {listday?.d
                .filter((i) => i <= slm)
                .map((i, index) => (
                  <div
                    ref={(el) => {
                      dateDefault[0] == i ? (clickDropscroll.current[0] = el) : undefined;
                    }}
                    className={`${dateDefault[0] == i ? 'onSelectDate' : ''} ${
                      (minDate &&
                        moment(dateDefault[2] + '-' + dateDefault[1] + '-' + i, 'YYYY-MM-DD').diff(
                          moment(minDate, 'YYYY/MM/DD'),
                          'days',
                        ) < 0) ||
                      (maxDate &&
                        moment(dateDefault[2] + '-' + dateDefault[1] + '-' + i, 'YYYY-MM-DD').diff(
                          moment(maxDate, 'YYYY/MM/DD'),
                          'days',
                        ) > 0)
                        ? 'disable'
                        : ''
                    }  `}
                    onClick={() => {
                      inputref.current[0].value = i;
                      onchange();
                    }}
                    key={index}
                  >
                    {i}
                  </div>
                ))}
            </div>
            <div
              ref={(el) => (clickDropscrollcontainer.current[1] = el)}
              className="dropitemPicker"
            >
              {' '}
              {listday?.m.map((i, index) => (
                <div
                  ref={(el) => {
                    dateDefault[1] == i ? (clickDropscroll.current[1] = el) : undefined;
                  }}
                  className={`${dateDefault[1] == i ? 'onSelectDate' : ''} ${
                    (minDate &&
                      parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[2]) >
                        parseInt(dateDefault[2])) ||
                    (maxDate &&
                      moment(maxDate).format('DD/MM/YYYY').split('/')[2] < parseInt(dateDefault[2]))
                      ? 'disable'
                      : minDate &&
                        parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[2]) >
                          parseInt(dateDefault[2])
                      ? 'disable'
                      : (minDate &&
                          parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[2]) ==
                            parseInt(dateDefault[2]) &&
                          parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[1]) >
                            parseInt(i)) ||
                        (maxDate &&
                          moment(maxDate).format('DD/MM/YYYY').split('/')[2] ==
                            parseInt(dateDefault[2]) &&
                          moment(maxDate).format('DD/MM/YYYY').split('/')[1] < parseInt(i))
                      ? 'disable'
                      : ''
                  } `}
                  onClick={() => {
                    '01,03,05,07,08,10,12'.includes(i)
                      ? setSlm(31)
                      : '04,06,09,11'.includes(i)
                      ? setSlm(30)
                      : ('02'.includes(i) &&
                          inputref.current[2].value % 4 === 0 &&
                          inputref.current[2].value % 100 !== 0 &&
                          inputref.current[2].value % 400 !== 0) ||
                        ('02'.includes(i) &&
                          inputref.current[2].value % 100 === 0 &&
                          inputref.current[2].value % 400 === 0)
                      ? setSlm(29)
                      : '02'.includes(i)
                      ? setSlm(28)
                      : undefined;
                    inputref.current[1].value = i;
                    onchange();
                  }}
                  key={index}
                >
                  {i}
                </div>
              ))}
            </div>
            <div
              ref={(el) => (clickDropscrollcontainer.current[2] = el)}
              className="dropitemPicker"
            >
              {listday?.y.map((i, index) => (
                <div
                  ref={(el) => {
                    dateDefault[2] == i ? (clickDropscroll.current[2] = el) : undefined;
                  }}
                  className={`${dateDefault[2] == i ? 'onSelectDate' : ''} ${
                    (minDate &&
                      parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[2]) > parseInt(i)) ||
                    (maxDate && moment(maxDate).format('DD/MM/YYYY').split('/')[2] < parseInt(i))
                      ? 'disable'
                      : ''
                  } `}
                  onClick={() => {
                    ('02'.includes(inputref.current[1].value) &&
                      i % 4 === 0 &&
                      i % 100 !== 0 &&
                      i % 400 !== 0) ||
                    ('02'.includes(inputref.current[1].value) && i % 100 === 0 && i % 400 === 0)
                      ? setSlm(29)
                      : '02'.includes(inputref.current[1].value)
                      ? setSlm(28)
                      : undefined;
                    inputref.current[2].value = i;
                    onchange();
                  }}
                  key={index}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            minDate={minDate ? new Date(minDate) : undefined}
            maxDate={maxDate ? new Date(maxDate) : undefined}
            disabled={disabled}
            inputFormat={formatDateMui}
            label={placeholder}
            value={value ? value : date}
            defaultValue={defaultValue}
            onChange={(newValue) => {
              onChange ? onChange(newValue) : undefined;
              setValue(newValue);
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider> */}
      </div>
    );
  },

  onlySelectMonth: ({
    onflex = false,
    defaultValue,
    isDob = false,
    minDate,
    onRoot = true,
    placeholder,
    onChange,
    maxDate,
    value,
    disabled = false,
  }) => {
    const [listday, setListDay] = useState();
    const [minMax, setMinMax] = useState();
    // const [listM,setListM]=useState([]);
    // const [listY,setListY]=useState([]);
    const clickDrop = useRef();
    const clickDropscroll = useRef([]);
    const clickDropscrollcontainer = useRef([]);
    const clickDropContainer = useRef();
    const { systemDate } = useModel('systemdate');
    const [dateDefault, setDateDefault] = useState([]);

    const [slm, setSlm] = useState(31);
    const [position, setPosition] = useState({
      x: 0,
      y: 0,
    });
    let datePicker = {
      m: [],
      y: [moment(systemDate).format('YYYY')],
    };
    const [date, setDate] = useState({
      m: moment(systemDate).format('MM'),
      y: moment(systemDate).format('YYYY'),
    });

    useEffect(() => {
      if (value && value.split('/').length > 0) {
        inputref.current[0].value = value.split('/')[0];
        inputref.current[1].value = value.split('/')[1];
        setDate({
          m: value.split('/')[0],
          y: value.split('/')[1],
        });
      }
    }, []);
    useEffect(() => {
      if (!value || value.split('/').length == 0) {
        onChange ? onChange(moment(systemDate).format('MM') + '/' + date.y) : undefined;
      }
    }, []);
    useEffect(() => {
      for (let i = 1; i <= 12; i++) {
        datePicker.m.push(i < 10 ? '0' + i : i);
      }
      setListDay(datePicker);
      document.removeEventListener('mousedơwn', (e) => {
        if (clickDropContainer.current) {
          if (
            !clickDropContainer.current.contains(e.target) &&
            !clickDrop.current.contains(e.target)
          ) {
            onchange();
          }
        }
      });
      document.addEventListener('mouseup', (e) => {
        if (clickDrop.current) {
          if (
            !clickDropContainer.current.contains(e.target) &&
            !clickDrop.current.contains(e.target)
          ) {
            clickDrop.current.style.display = 'none';
          }
        }
      });
      document.removeEventListener('mouseup', (e) => {
        if (clickDropContainer.current) {
          if (
            !clickDropContainer.current.contains(e.target) &&
            !clickDrop.current.contains(e.target)
          ) {
            clickDrop.current.style.display = 'none';
          }
        }
      });
    }, []);
    const onchange = (e) => {
      setDate({ ...date, m: e });
      inputref.current[0].value = e;
      onChange ? onChange(e + '/' + moment(systemDate).format('YYYY')) : undefined;
    };
    const inputref = useRef([]);
    const formatNumber = (ref, e) => {
      let value = '';
      e.split('').map((i, index) => {
        if (index <= 9 && !isNaN(i)) {
          value += i;
        }
      });
      ref.value = value;
    };

    useEffect(() => {
      // if (dateDefault.length == 3) {
      //   inputref.current[1].value = dateDefault[1];
      //   inputref.current[2].value = dateDefault[2];
      //   inputref.current[0].value = dateDefault[0];
      // }
      for (let i = 0; i < clickDropscrollcontainer.current.length; i++) {
        if (
          clickDropscrollcontainer.current[i].offsetHeight -
            clickDropscroll.current[i]?.getBoundingClientRect().top <
            0 &&
          clickDropscroll.current[i]?.getBoundingClientRect().top -
            clickDropscrollcontainer.current[i]?.getBoundingClientRect().top >
            clickDropscrollcontainer.current[i].offsetHeight
        ) {
          clickDropscrollcontainer.current[i].scrollTop +=
            clickDropscroll.current[i]?.getBoundingClientRect().top -
            clickDropscrollcontainer.current[i]?.getBoundingClientRect().top;
        }
        if (
          clickDropscroll.current[i]?.getBoundingClientRect().top -
            clickDropscrollcontainer.current[i]?.getBoundingClientRect().top <
          0
        ) {
          clickDropscrollcontainer.current[i].scrollTop -=
            clickDropscrollcontainer.current[i]?.getBoundingClientRect().top -
            clickDropscroll.current[i]?.getBoundingClientRect().top;
        }
      }
    }, [dateDefault]);

    return (
      <div
        className={onflex ? ` datePicker-component2` : ` datePicker-component`}
        id="clickDropContainer"
        ref={clickDropContainer}
      >
        <label.titlesm>{placeholder}</label.titlesm>
        <div className={`${disabled ? 'datePickerDisable' : ''} datePicker-handmake`}>
          <input
            disabled={disabled}
            defaultValue={date.m}
            onBlur={(e) => {
              let number =
                e.target.value.split('').length == 1 ? `0` + e.target.value : e.target.value;

              if (e.target.value > 12 || e.target.value == '') {
                inputref.current[0].value = date.m ? date.m : '';
              } else {
                inputref.current[0].value = number;
                onchange(number);
              }
            }}
            onClick={() => {
              setTimeout(() => {
                inputref.current[0].select();
              }, 50);
            }}
            onFocus={() => {
              inputref.current[0].select();
            }}
            onChange={(e) => {}}
            ref={(el) => (inputref.current[0] = el)}
            maxLength={2}
          ></input>
          /
          <input
            style={{ width: '46px' }}
            onFocus={() => {
              inputref.current[1].select();
            }}
            onClick={() => {
              setTimeout(() => {
                inputref.current[1].select();
              }, 50);
            }}
            disabled={true}
            defaultValue={moment(systemDate).format('YYYY')}
            onChange={(e) => {
              formatNumber(inputref.current[1], e.target.value);
              e.target.value.split('').length == 4 ? inputref.current[1].blur() : undefined;
            }}
            onBlur={(e) => {}}
            ref={(el) => (inputref.current[1] = el)}
            maxLength={4}
          ></input>
          <img
            onClick={() => {
              // let promise = new Promise((resolve, reject) => {
              //   clickDropscroll.current[0]?.scrollIntoView();
              // });
              // let promise2 = new Promise((resolve, reject) => {
              //   clickDropscroll.current[1]?.scrollIntoView();
              // });
              let rect = clickDropContainer.current?.getBoundingClientRect();
              let a = window.innerHeight - rect.bottom - 200;
              if (clickDrop.current.style.display == 'grid') {
                clickDrop.current.style.display = 'none';
              } else {
                clickDrop.current.style.display = 'grid';
                onRoot
                  ? (clickDrop.current.style.transform = `translate(${rect.left}px,${
                      a > 0 ? rect.bottom : rect.bottom - 235
                    }px)`)
                  : undefined;
              }

              // promise.then(promise2.then(clickDropscroll.current[2]?.scrollIntoView()));
              for (let i = 0; i < clickDropscrollcontainer.current.length; i++) {
                if (
                  clickDropscrollcontainer.current[i].offsetHeight -
                    clickDropscroll.current[i]?.getBoundingClientRect().top <
                    0 &&
                  clickDropscroll.current[i]?.getBoundingClientRect().top -
                    clickDropscrollcontainer.current[i]?.getBoundingClientRect().top >
                    clickDropscrollcontainer.current[i].offsetHeight
                ) {
                  clickDropscrollcontainer.current[i].scrollTop +=
                    clickDropscroll.current[i]?.getBoundingClientRect().top -
                    clickDropscrollcontainer.current[i]?.getBoundingClientRect().top;
                }
                if (
                  clickDropscroll.current[i]?.getBoundingClientRect().top -
                    clickDropscrollcontainer.current[i]?.getBoundingClientRect().top <
                  0
                ) {
                  clickDropscrollcontainer.current[i].scrollTop -=
                    clickDropscrollcontainer.current[i]?.getBoundingClientRect().top -
                    clickDropscroll.current[i]?.getBoundingClientRect().top;
                }
              }
            }}
            src={dateSvg}
          ></img>
        </div>
        {createPortal(
          <div ref={clickDrop} style={{ top: '0' }} className=" dateDropPicker">
            <div
              ref={(el) => (clickDropscrollcontainer.current[0] = el)}
              className="dropitemPicker"
            >
              {listday?.m.map((i, index) => (
                <div
                  ref={(el) => {
                    date.m == i ? (clickDropscroll.current[0] = el) : undefined;
                  }}
                  className={`${date.m == i ? 'onSelectDate' : ''}  `}
                  onClick={() => {
                    onchange(i);
                  }}
                  key={index}
                >
                  {i}
                </div>
              ))}
            </div>
            <div
              ref={(el) => (clickDropscrollcontainer.current[1] = el)}
              className="dropitemPicker"
            >
              {listday?.y.map((i, index) => (
                <div
                  ref={(el) => {
                    date.y == i ? (clickDropscroll.current[1] = el) : undefined;
                  }}
                  className={`${date.y == i ? 'onSelectDate' : ''} ${
                    (minDate &&
                      parseInt(moment(minDate).format('DD/MM/YYYY').split('/')[2]) > parseInt(i)) ||
                    (maxDate && moment(maxDate).format('DD/MM/YYYY').split('/')[2] < parseInt(i))
                      ? 'disable'
                      : ''
                  } `}
                  onClick={() => {
                    ('02'.includes(inputref.current[1].value) &&
                      i % 4 === 0 &&
                      i % 100 !== 0 &&
                      i % 400 !== 0) ||
                    ('02'.includes(inputref.current[1].value) && i % 100 === 0 && i % 400 === 0)
                      ? setSlm(29)
                      : '02'.includes(inputref.current[1].value)
                      ? setSlm(28)
                      : undefined;
                    inputref.current[2].value = i;
                    onchange();
                  }}
                  key={index}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>,
          document.getElementById('root'),
        )}
      </div>
    );
  },
  rangePicker: ({
    notTo = false,
    minDate,
    defaultValue,
    placeholder,
    onChange,
    onflex = false,
    maxDate,
    isDob = false,
    value,
    disabled = false,
  }) => {
    const [date, setValue] = useState([null, null]);
    const { systemDate } = useModel('systemdate');
    const { formatDate, formatDateMui } = useModel('defaultdata');
    const [dateDefault, setDateDefault] = useState([
      moment(systemDate).format('YYYY-MM-DD'),
      moment(systemDate).format('YYYY-MM-DD'),
    ]);
    useEffect(() => {
      if (value && value.length == 0) {
        onChange ? onChange(dateDefault) : undefined;
      }
    }, []);
    useEffect(() => {
      if (value != null) {
        setDateDefault(value);
      }
      // setDateDefault(moment(systemDate).format('DD/MM/YYYY').split('/'));
    }, [value]);

    return (
      <div className="datePicker-component-handmake">
        <datePicker.datePicker
          onflex={onflex}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          isDob={isDob}
          placeholder={placeholder?.start}
          onChange={(e) => {
            let a = moment(value[1]).format('MM-DD-YYYY');
            if (moment(e).diff(moment(a), 'days') > 0) {
              onChange([moment(e), moment(e)]);
            } else {
              onChange([moment(e), value[1]]);
            }
          }}
          value={dateDefault[0]}
        ></datePicker.datePicker>
        {!notTo ? <div className="toDatepicker">~</div> : undefined}
        <datePicker.datePicker
          onflex={onflex}
          disabled={disabled}
          minDate={dateDefault[0]}
          maxDate={maxDate}
          isDob={isDob}
          placeholder={placeholder?.end}
          onChange={(e) => {
            onChange([dateDefault[0], moment(e)]);
          }}
          value={dateDefault[1]}
        ></datePicker.datePicker>
      </div>
    );
  },
};

export { datePicker };
