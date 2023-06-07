import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import './switch.less';
function Switch({ onClick, value = false, readOnly = false, title1, title2, children }) {
  const [status, setStatus] = useState(true);
  const [scroll, setScroll] = useState(0);
  const ref = useRef();
  const scrollref = useRef(0);

  useEffect(() => {
    setStatus(value);
    setScroll(ref.current ? ref.current.offsetWidth : 0);
  }, []);

  useEffect(() => {
    setStatus(value);
    scrollref.current = ref.current ? ref.current.offsetWidth : 0;
    setScroll(ref.current ? ref.current.offsetWidth : 0);
  }, [value]);

  useEffect(() => {
    scrollref.current = ref.current ? ref.current.offsetWidth : 0;
    setScroll(ref.current ? ref.current.offsetWidth : 0);
  }, [status]);
  return (
    <div
      ref={ref}
      style={{
        userSelect: 'none',
        width: `${(title1 && title2) || children ? 'max-content' : ''}`,
        padding: `${
          (title1 && title2) || children ? (status ? '0px 30px 0px 10px' : '0px 10px 0px 30px') : ''
        }`,
      }}
      onClick={() => {
        if (!readOnly) {
          setStatus(!status);
          onClick ? onClick(!status) : '';
        }
      }}
      className={`${readOnly ? 'switchOnReadOnly' : ''}  switchComponent  ${
        status ? 'switchComponenton' : 'switchComponentoff'
      }`}
    >
      <div>{title1 && title2 ? (status ? title2 : title1) : children ? children : ''}</div>

      <div
        className={` ${readOnly ? 'switchOnReadOnly' : ''} switchDot ${
          status ? (children ? '' : 'switchDoton') : 'switchDotoff'
        }`}
        style={{
          left: `${
            (title1 && title2) || children
              ? status
                ? ref.current?.offsetWidth - 23 > 0
                  ? ref.current?.offsetWidth - 23 + 'px'
                  : ref.current?.offsetWidtht + 'px'
                : 3 + 'px'
              : ''
          }`,
        }}
      ></div>
    </div>
  );
}

export { Switch };
