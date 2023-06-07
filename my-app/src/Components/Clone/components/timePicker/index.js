import { DatabaseFilled } from '@ant-design/icons';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import './index.less';
import { icon } from '@/components/Icon';
import moment from 'moment';
import { createPortal } from 'react-dom';
import { onMouseMoveWidthRef } from '@/components/Note';
const timePicker = {
  timePicker: ({
    autofocus = false,
    onBlur,
    value,
    onChange,
    min = '00:00',
    max = '23:59',
    disabled = false,
  }) => {
    const [data, setData] = useState({ hh: '12', mm: '00' });

    const ref1 = useRef();
    let abc = useRef(false);
    let abc2 = useRef(false);
    const [scroll, setScroll] = useState(false);
    const ref2 = useRef();
    const refInput = useRef();
    const refhh = useRef([]);
    const refmm = useRef([]);
    const refScroll = useRef([]);
    useEffect(() => {
      if (value) {
        setData({
          hh: moment(value, 'HH:mm').format('HH'),
          mm: moment(value, 'HH:mm').format('mm'),
        });
      }
    }, [value]);
    const [list, setList] = useState({
      hh: [],
      mm: [],
    });
    useEffect(() => {
      if (!value) {
        onChange ? onChange(moment(12 + ':00', 'HH:mm').format('HH:mm')) : undefined;
      }
      let hh = [];
      let mm = [];
      for (let i = 0; i <= 59; i++) {
        i <= 23 ? hh.push(i < 10 ? '0' + i : i) : undefined;
        mm.push(i < 10 ? '0' + i : i);
      }
      setList({ hh: hh, mm: mm });
    }, []);

    const clickRoll = (aa) => {
      if (
        (abc.current == false || abc2.current == false) &&
        refhh.current[parseInt(data.hh)] &&
        refmm.current[parseInt(data.mm)] &&
        refScroll.current[1].scrollTop !=
          refhh.current[parseInt(data.hh)].getBoundingClientRect().top
      ) {
        let a = refhh.current[parseInt(data.hh)].getBoundingClientRect().top;
        let b = refScroll.current[1].getBoundingClientRect().top;
        let d = refScroll.current[2].getBoundingClientRect().top;
        let c = refmm.current[parseInt(data.mm)].getBoundingClientRect().top;
        refScroll.current[1].scrollTop += a - b;
        refScroll.current[2].scrollTop += c - d;
        abc.current = true;
      }
    };
    const formatNumber = (e, max, min) => {
      abc2.current = false;
      let value = '';
      e.split('').map((i, index) => {
        if (!isNaN(i)) {
          value += i;
        }
      });
      return parseInt(value) > parseInt(max) ? max : value;
    };
    useEffect(() => {
      if (abc2.current == false) {
        clickRoll();
        abc2.current = true;
      }
    }, [data]);
    const das = (a, b) => {
      if (a && b) {
        currenat.current = moment(a + ':' + b, 'HH:mm').format('HH:mm');
        onChange ? onChange(moment(a + ':' + b, 'HH:mm').format('HH:mm')) : undefined;
      } else {
        currenat.current = moment(data.hh + ':' + data.mm, 'HH:mm').format('HH:mm');
        onChange ? onChange(moment(data.hh + ':' + data.mm, 'HH:mm').format('HH:mm')) : undefined;
      }
    };

    const handleMouseDown = (e) => {
      if (ref2.current && !ref1.current.contains(e.target) && !ref2.current.contains(e.target)) {
        setScroll(!scroll);

        if (ref2.current.style.display == 'flex') {
          console.log(currenat.current);
          // onChange? onChange(currenat.current):undefined
        }

        onBlur ? onBlur() : undefined;
        onMouseMoveWidthRef(ref1.current, ref2.current, false);
        abc.current = false;
      }
    };

    let currenat = useRef(moment(data.hh + ':' + data.mm, 'HH:mm').format('HH:mm'));
    useEffect(() => {
      autofocus ? clickRoll() : undefined;

      //

      window.addEventListener('mousedown', (e) => {
        handleMouseDown(e);
      });
      window.removeEventListener('mousedown', (e) => {
        handleMouseDown(e);
      });
    }, []);

    return (
      <div
        ref={ref1}
        onClick={() => {
          onMouseMoveWidthRef(ref1.current, ref2.current, true, clickRoll);
        }}
        className={`${disabled ? 'onDisable' : ''} timePicker-component`}
      >
        <div>
          <input
            autoFocus={autofocus}
            maxLength={2}
            onChange={(e) => {
              setData({ ...data, hh: '' + formatNumber(e.target.value, 23) });
              e.target.value.split('').length == 2 ? refInput.current.focus() : undefined;
            }}
            onClick={(e) => e.target.select()}
            onBlur={(e) => {
              if (e.target.value.split('').length == 1) {
                if (
                  moment(e.target.value + ':' + data.mm, 'HH:mm').isBefore(moment(min, 'HH:mm')) ||
                  moment(e.target.value + ':' + data.mm, 'HH:mm').isAfter(moment(max, 'HH:mm'))
                ) {
                  setData({
                    mm: `${moment(min, 'HH:mm').format('mm')}`,
                    hh: `${moment(min, 'HH:mm').format('HH')}`,
                  });
                  das(`${moment(min, 'HH:mm').format('HH')}`, moment(min, 'HH:mm').format('mm'));
                } else {
                  setData({ ...data, hh: `0${formatNumber(e.target.value, 23)}` });
                  das(`0${formatNumber(e.target.value, 23)}`, data.mm);
                }
              } else {
                if (
                  moment(e.target.value + ':' + data.mm, 'HH:mm').isBefore(moment(min, 'HH:mm')) ||
                  moment(e.target.value + ':' + data.mm, 'HH:mm').isAfter(moment(max, 'HH:mm'))
                ) {
                  setData({
                    mm: `${moment(min, 'HH:mm').format('mm')}`,
                    hh: `${moment(min, 'HH:mm').format('HH')}`,
                  });
                  das(`${moment(min, 'HH:mm').format('HH')}`, moment(min, 'HH:mm').format('mm'));
                } else {
                  das(formatNumber(e.target.value, 23), data.mm);
                }
              }
            }}
            value={data.hh}
            onFocus={(e) => e.target.select()}
          ></input>
          :
          <input
            maxLength={2}
            ref={refInput}
            onChange={(e) => {
              {
                setData({ ...data, mm: '' + formatNumber(e.target.value, 59) });
              }
              if (e.target.value.split('').length == 2) {
                das(data.hh, formatNumber(e.target.value, 59));
                e.target.blur();
              }
            }}
            //   onBlur={(e)=>{
            //     if( e.target.value.split('').length==1)
            //     {  if(moment(data.hh+':'+e.target.value,'HH:mm').isBefore(moment(min,'HH:mm'))||moment(data.hh+':'+e.target.value,'HH:mm').isAfter(moment(max,'HH:mm')))
            //  {  das(data.hh,moment(min,'HH:mm').format('mm'))
            //         setData({...data,mm:moment(min,'HH:mm').format('mm')})}

            //         else{
            //             das(data.hh,`0${data.mm}`)
            //         setData({...data,mm:`0${data.mm}`})
            //         }

            //     }
            //     else{
            //         if(moment(data.hh+':'+e.target.value,'HH:mm').isBefore(moment(min,'HH:mm'))||moment(data.hh+':'+e.target.value,'HH:mm').isAfter(moment(max,'HH:mm')))
            //  {  das(data.hh,moment(min,'HH:mm').format('mm'))
            //         setData({...data,mm:moment(min,'HH:mm').format('mm')})}

            //         else{
            //             setData({...data,mm:`${formatNumber(e.target.value,59)}`});
            //             das()
            //         }

            //     }

            // }}
            onClick={(e) => e.target.select()}
            value={data.mm}
            onFocus={(e) => e.target.select()}
          ></input>
        </div>
        <icon.clockAnimation />
        {createPortal(
          <div ref={ref2} className="timepickerDropComponent">
            <div
              ref={(e) => {
                refScroll.current[1] = e;
              }}
              className="dropitemTime"
            >
              {list.hh.map((i, index) => (
                <div
                  ref={(el) => {
                    refhh.current[index] = el;
                  }}
                  onClick={() => {
                    if (
                      moment(i + ':' + data.mm, 'HH:mm').isBefore(moment(min, 'HH:mm')) ||
                      moment(i + ':' + data.mm, 'HH:mm').isAfter(moment(max, 'HH:mm'))
                    ) {
                      setData({ mm: moment(min, 'HH:mm').format('mm'), hh: '' + i });
                      das(i, moment(min, 'HH:mm').format('mm'));
                    } else {
                      setData({ ...data, hh: '' + i });
                      das(i, data.mm);
                    }
                  }}
                  className={`${
                    moment(min, 'HH:mm').isAfter(moment(max, 'HH:mm'))
                      ? parseInt(i) < moment(min, 'HH:mm').format('HH') &&
                        parseInt(i) > moment(max, 'HH:mm').format('HH')
                        ? 'onDisable'
                        : ''
                      : parseInt(i) < moment(min, 'HH:mm').format('HH') ||
                        parseInt(i) > moment(max, 'HH:mm').format('HH')
                      ? 'onDisable'
                      : ''
                  } ${parseInt(data.hh) == parseInt(i) ? 'onSelectDate' : ''} dropitemtimeItem`}
                  key={index}
                >
                  {i}
                </div>
              ))}
            </div>
            <div
              ref={(e) => {
                refScroll.current[2] = e;
              }}
              className="dropitemTime"
            >
              {list.mm.map((i, index) => (
                <div
                  ref={(el) => {
                    refmm.current[index] = el;
                  }}
                  className={`${
                    moment(min, 'HH:mm').isAfter(moment(max, 'HH:mm'))
                      ? moment(data.hh + ':' + i, 'HH:mm').isBefore(moment(min, 'HH:mm')) &&
                        moment(data.hh + ':' + i, 'HH:mm').isAfter(moment(max, 'HH:mm'))
                        ? 'onDisable'
                        : ''
                      : moment(data.hh + ':' + i, 'HH:mm').isBefore(moment(min, 'HH:mm')) ||
                        moment(data.hh + ':' + i, 'HH:mm').isAfter(moment(max, 'HH:mm'))
                      ? 'onDisable'
                      : ''
                  } ${parseInt(data.mm) == parseInt(i) ? 'onSelectDate' : ''} dropitemtimeItem`}
                  onClick={() => {
                    das(data.hh, i);
                    setData({ ...data, mm: '' + i });
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
  range: ({ value, onChange, disabled = false, min = '00:00', max = '23:59' }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
      if (value) {
        setData([
          moment(value[0], 'HH:mm').format('HH:mm'),
          moment(value[1], 'HH:mm').format('HH:mm'),
        ]);
      }
    }, [value]);

    // useEffect(()=>{
    // //    :''
    // },[data])

    return (
      <div className={`${disabled ? 'onDisable' : ''} timepickerRange`}>
        <div className="timepickerRange-item">
          {' '}
          <timePicker.timePicker
            disabled={disabled}
            min={min}
            onChange={(e) => {
              let arr = [...data];
              arr[0] = e;

              arr[0] && arr[1] ? setData(arr) : undefined;
              arr[0] && arr[1] && onChange ? onChange(arr) : undefined;
            }}
            value={data[0]}
          ></timePicker.timePicker>
          ~
          <timePicker.timePicker
            max={max}
            disabled={disabled}
            onChange={(e) => {
              let arr = [...data];
              arr[1] = e;

              arr[0] && arr[1] ? setData(arr) : undefined;
              arr[0] && arr[1] && onChange ? onChange(arr) : undefined;
            }}
            value={data[1]}
          ></timePicker.timePicker>
        </div>
        <icon.clockAnimation></icon.clockAnimation>
      </div>
    );
  },
};

export { timePicker };
