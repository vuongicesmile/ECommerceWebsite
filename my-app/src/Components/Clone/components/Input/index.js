import React, { useState, useRef, useEffect } from 'react';
import './input.less';
import eye from './asset/openEyes.svg';
import Highlighter from 'react-highlight-words';
import eye2 from './asset/closeEyes.svg';
import up from './asset/upIcon.svg';
import down from './asset/down.svg';
import clearIcon from './asset/clear.svg';
import { InputNumber, Checkbox, Space, Row, Col } from 'antd';
import { lowerCase } from 'lodash';
import { createPortal } from 'react-dom';

const input = {
  highLight: ({ search, value }) => {
    return (
      <Highlighter
        highlightClassName="highlight-class"
        searchWords={[search]}
        autoEscape={true}
        textToHighlight={value}
      />
    );
  },
  large: React.forwardRef(
    (
      {
        value,
        placeholder,
        type = 'text',
        required = false,
        onChange,
        blur,
        onFocus,
        status,
        prefix,
        suffix,
      },
      ref,
    ) => {
      return (
        <div className={`input-component ${status ? status : 'normal'} `}>
          <Row className="h-100 d-flex align-items-center">
            <Col flex={prefix ? '15px' : '0px'}>
              <span>{prefix}</span>
            </Col>
            <Col flex="auto">
              <input
                onFocus={onFocus}
                onBlur={blur}
                value={value}
                onChange={onChange}
                ref={ref}
                type={type}
                style={{ height: '100%', width: '100%', border: 'none' }}
                // className={`input-component ${status ? status : 'normal'} `}
                placeholder={placeholder}
                required={required}
              ></input>
            </Col>
            <Col flex={suffix ? '15px' : '0px'}>
              <span>{suffix}</span>
            </Col>
          </Row>
        </div>
      );
    },
  ),
  checkboxAll: React.forwardRef(
    (
      {
        value,
        onClick,
        placeholder,
        type = 'text',
        required = false,
        onChange,
        blur,
        onFocus,
        style,
        status,
        prefix,
        suffix,
        checked,
        className,
        id,
        checkAll = false,
      },
      ref,
    ) => {
      return (
        <input
          style={style}
          id={id}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={blur}
          checked={checked}
          value={value}
          onChange={() => {
            onChange ? onChange() : undefined;
          }}
          ref={ref}
          type="checkbox"
          required={required}
          className={`${className} ${checkAll ? '' : 'checkboxall'} `}
        ></input>
      );
    },
  ),
  checkboxAllv2: React.forwardRef(
    (
      {
        data,
        value,
        onClick,
        placeholder,
        type = 'text',
        required = false,
        onChange,
        blur,
        onFocus,
        style,
        status,
        prefix,
        suffix,
        checked,
        className,
        id,
        checkAll = false,
      },
      ref,
    ) => {
      return (
        <input
          style={style}
          id={id}
          onClick={() => {
            let a = data?.filter((i) => i?.checked == true).length == data?.length ? true : false;
            let arr = [...data];
            arr.map((i) => {
              i.checked = !a;
            });
            onClick(arr);
          }}
          onFocus={onFocus}
          onBlur={blur}
          checked={
            checked ? checked : data?.filter((i) => i?.checked == true).length > 0 ? true : false
          }
          value={value}
          onChange={() => {
            onChange ? onChange() : undefined;
          }}
          ref={ref}
          type="checkbox"
          required={required}
          className={`${className} ${
            checkAll || data?.filter((i) => i?.checked == true).length == data?.length
              ? ''
              : 'checkboxall'
          } `}
        ></input>
      );
    },
  ),
  checkbox: React.forwardRef(
    (
      {
        value,
        onClick,
        placeholder,
        type = 'text',
        required = false,
        onChange,
        blur,
        onFocus,
        style,
        status,
        prefix,
        suffix,
        disabled,
        defaultChecked,
        checked,
        className,
        id,
        children,
      },
      ref,
    ) => {
      return (
        <input
          style={style}
          id={id}
          onClick={onClick}
          disabled={disabled}
          onFocus={onFocus}
          defaultChecked={defaultChecked}
          onBlur={blur}
          checked={checked}
          value={value}
          onChange={(e) => {
            onChange ? onChange(e) : undefined;
          }}
          ref={ref}
          type="checkbox"
          required={required}
          className={className}
        >
          {children}
        </input>
      );
    },
  ),
  // medium: React.forwardRef(
  //   (
  //     {
  //       value,
  //       styleInput,
  //       readOnly = false,
  //       placeholder,
  //       type = 'text',
  //       required = false,
  //       onChange,
  //       clearAll = true,
  //       blur,
  //       onFocus,
  //       autoFocus,
  //       max,
  //       key,
  //       min,
  //       onKeyDown,
  //       status,
  //       className,
  //       style,
  //       defaultValue,
  //       prefix,
  //       suffix,
  //       onKeyPress,
  //       onClick,
  //     },
  //     ref,
  //   ) => {
  //     const [isClear, setIsClear] = useState(false);
  //     const inputRef = useRef();
  //     return (
  //       <div
  //         key={key}
  //         style={{ ...style, height: '30px' }}
  //         className={` ${readOnly ? 'input-disalbed' : ''} ${
  //           required && !readOnly ? 'input-required' : ''
  //         } input-component normal ${className} ${status ? status : 'normal'} `}
  //         onMouseEnter={() => {
  //           setIsClear(true);
  //         }}
  //         onMouseLeave={() => {
  //           setIsClear(false);
  //         }}
  //       >
  //         <Row
  //           className={`d-flex align-items-center ${prefix ? 'ps-2' : ''} ${suffix ? 'pe-2' : ''}`}
  //           style={{ height: '100%', columnGap: '5px' }}
  //           wrap={false}
  //         >
  //           <Col flex={prefix ? '22px' : 'none'}>{prefix}</Col>
  //           <Col
  //             flex="auto"
  //             className={`
  //              d-flex align-items-center justify-content-between position-relative`}
  //           >
  //             <input
  //               autoFocus={autoFocus}
  //               onClick={onClick}
  //               max={max}
  //               defaultValue={defaultValue}
  //               min={min}
  //               onKeyDown={onKeyDown}
  //               disabled={readOnly}
  //               className="medium"
  //               onFocus={onFocus}
  //               onKeyPress={onKeyPress}
  //               onBlur={blur}
  //               value={value}
  //               onChange={(e) => {
  //                 !readOnly ? (onChange ? onChange(e) : undefined) : undefined;
  //               }}
  //               style={{
  //                 height: '100%',
  //                 width: `${styleInput ? styleInput : clearAll ? 'calc(100% - 21px)' : '100%'}`,
  //                 border: 'none',
  //                 cursor: `${readOnly ? 'not-allowed' : ''}`,
  //               }}
  //               ref={ref ? ref : inputRef}
  //               type={type}
  //               placeholder={placeholder}
  //               required={required}
  //             ></input>
  //             {clearAll && isClear && (value || defaultValue) && !readOnly && (
  //               <img
  //                 className="cursor-pointer position-absolute"
  //                 style={{ right: 0 }}
  //                 onClick={() => {
  //                   const e = { target: { value: '' } };
  //                   onChange(e);
  //                   if (ref) {
  //                     ref.current.focus();
  //                   } else {
  //                     inputRef.current.value = '';
  //                     inputRef.current.focus();
  //                   }
  //                 }}
  //                 src={clearIcon}
  //               ></img>
  //             )}
  //           </Col>
  //           <Col
  //             className="h-100  d-flex align-items-center "
  //             style={{ justifyContent: 'center' }}
  //             flex={suffix ? '8%' : 'none'}
  //           >
  //             {suffix}
  //           </Col>
  //         </Row>
  //       </div>
  //     );
  //   },
  // ),
  textarea: React.forwardRef(
    ({
      value,
      styleInput,
      readOnly = false,
      onPaste,
      placeholder,
      type = 'text',
      required = false,
      onChange,
      clearAll = true,
      blur,
      onFocus,
      autoFocus,
      max,
      onGet,
      render,
      key,
      min,
      onKeyDown,
      dataIndex,
      status,
      list,
      className,
      style,
      defaultValue,
      prefix,
      suffix,
      onKeyPress,
      onClick,
    }) => {
      const refcomponent = useRef();

      const ref = useRef(false);
      const [data2, setData2] = useState('');
      useEffect(() => {
        if (value) {
          setData2(value);
        }
      }, [value]);

      const reff = useRef();
      const [data, setData] = useState(list);
      const [search, setSearch] = useState('');
      const [isClear, setIsClear] = useState(false);
      const inputRef = useRef();
      useEffect(() => {
        if (reff.current && refcomponent.current) {
          let rect = reff.current.getBoundingClientRect();
          let a = window.innerHeight - rect.bottom - 200;
          refcomponent.current.style.minWidth = reff.current.style.width + 'px';
          refcomponent.current.style.transform = `translate(${rect.left}px,${
            a > 0 ? rect.bottom : rect.bottom - 235
          }px)`;
        }
      }, [search]);
      useEffect(() => {
        document.addEventListener('click', () => {
          setSearch('');
        });
        document.removeEventListener('click', () => {
          setSearch('');
        });
      }, []);
      return (
        <div
          ref={reff}
          key={key}
          style={{ ...style, height: '30px' }}
          className={` ${readOnly ? 'input-disalbed' : ''} ${
            required && !readOnly ? 'input-required' : ''
          } input-component normal ${className} ${status ? status : 'normal'} `}
          onMouseEnter={() => {
            setIsClear(true);
          }}
          onMouseLeave={() => {
            setIsClear(false);
          }}
        >
          <Row
            className={`d-flex align-items-center ${prefix ? 'ps-2' : ''} ${suffix ? 'pe-2' : ''}`}
            style={{ height: '100%', columnGap: '5px' }}
            wrap={false}
          >
            <Col flex={prefix ? '22px' : 'none'}>{prefix}</Col>
            <Col
              flex="auto"
              className={`
               d-flex align-items-center justify-content-between position-relative`}
            >
              <textarea
                autoFocus={autoFocus}
                onClick={onClick}
                max={max}
                onPaste={() => {
                  ref.current = true;
                }}
                rows={1}
                defaultValue={defaultValue}
                min={min}
                onKeyDown={onKeyDown}
                disabled={readOnly}
                className="medium"
                onFocus={onFocus}
                onKeyPress={onKeyPress}
                onBlur={(e) => {
                  blur ? blur(e) : undefined;
                }}
                value={data2}
                onChange={(e) => {
                  setSearch(e.target.value);

                  if (!readOnly) {
                    if (ref.current == true) {
                      onPaste(e);
                    } else {
                      let a = e.target.value.split('\n')[0];
                      setData2(a);
                      onChange(a);
                    }
                  }
                }}
                style={{
                  height: '100%',
                  width: `${styleInput ? styleInput : clearAll ? 'calc(100% - 21px)' : '100%'}`,
                  border: 'none',
                  cursor: `${readOnly ? 'not-allowed' : ''}`,
                }}
                ref={ref ? ref : inputRef}
                type={type}
                placeholder={placeholder}
                required={required}
              ></textarea>

              {/* {clearAll && isClear && (value || defaultValue) && !readOnly && (
                <img
                  className="cursor-pointer position-absolute"
                  style={{ right: 0 }}
                  onClick={() => {
                    const e = { target: { value: '' } };
                    onChange(e);
                    if (ref) {
                      ref.current.focus();
                    } else {
                      inputRef.current.value = '';
                      inputRef.current.focus();
                    }
                  }}
                  src={clearIcon}
                ></img>
              )} */}
            </Col>

            <Col
              className="h-100  d-flex align-items-center "
              style={{ justifyContent: 'center' }}
              flex={suffix ? '8%' : 'none'}
            >
              {suffix}
            </Col>
          </Row>
          {search != '' &&
          list &&
          data.filter((i) => lowerCase(i[dataIndex[0]]).includes(lowerCase(search))).length > 0
            ? createPortal(
                <div ref={refcomponent} className="dropInputcomponent">
                  {data
                    .filter((i) => lowerCase(i[dataIndex[0]]).includes(lowerCase(search)))
                    ?.map((i, index) => (
                      <div
                        onClick={() => {
                          onGet ? onGet(i) : undefined;
                          setSearch('');
                        }}
                        key={index}
                        className={
                          render ? 'item-dropInputcomponent-render' : 'item-dropInputcomponent'
                        }
                      >
                        {render ? (
                          render(i, search)
                        ) : (
                          <>
                            {' '}
                            <div>
                              Name:{' '}
                              <strong>
                                <Highlighter
                                  highlightClassName="highlight-class"
                                  searchWords={[search]}
                                  autoEscape={true}
                                  textToHighlight={i[dataIndex[0]]}
                                />
                              </strong>
                            </div>
                            <div>{i[dataIndex[1]]}</div>
                          </>
                        )}
                      </div>
                    ))}
                </div>,
                document.getElementById('root'),
              )
            : undefined}
        </div>
      );
    },
  ),

  medium: React.forwardRef(
    (
      {
        value,
        styleInput,
        readOnly = false,
        onPaste,
        placeholder,
        type = 'text',
        required = false,
        onChange,
        clearAll = true,
        blur,
        onFocus,
        autoFocus,
        max,
        onGet,
        render,
        key,
        min,
        onKeyDown,
        dataIndex,
        status,
        list,
        className,
        style,
        defaultValue,
        prefix,
        suffix,
        onKeyPress,
        onClick,
      },
      ref,
    ) => {
      const refcomponent = useRef();
      const reff = useRef();
      const [data, setData] = useState(list);
      const [search, setSearch] = useState('');
      const [isClear, setIsClear] = useState(false);
      const inputRef = useRef();

      useEffect(() => {
        document.addEventListener('click', () => {
          setSearch('');
        });
        document.removeEventListener('click', () => {
          setSearch('');
        });
      }, []);
      useEffect(() => {
        if (reff.current && refcomponent.current) {
          let rect = reff.current.getBoundingClientRect();
          let a = window.innerHeight - rect.bottom - 200;

          refcomponent.current.style.transform = `translate(${rect.left}px,${
            a > 0 ? rect.bottom : rect.bottom - 235
          }px)`;

          refcomponent.current.style.minWidth = reff.current.offsetWidth + 'px';
        }
      }, [search]);
      return (
        <div
          ref={reff}
          key={key}
          style={{ ...style, height: '30px' }}
          className={` ${readOnly ? 'input-disalbed' : ''} ${
            required && !readOnly ? 'input-required' : ''
          } input-component normal ${className} ${status ? status : 'normal'} `}
          onMouseEnter={() => {
            setIsClear(true);
          }}
          onMouseLeave={() => {
            setIsClear(false);
          }}
        >
          <Row
            className={`d-flex align-items-center ${prefix ? 'ps-2' : ''} ${suffix ? 'pe-2' : ''}`}
            style={{ height: '100%', columnGap: '5px' }}
            wrap={false}
          >
            <Col flex={prefix ? '22px' : 'none'}>{prefix}</Col>
            <Col
              flex="auto"
              className={`
               d-flex align-items-center justify-content-between position-relative`}
            >
              <input
                onPaste={onPaste}
                autoFocus={autoFocus}
                onClick={onClick}
                max={max}
                defaultValue={defaultValue}
                min={min}
                onKeyDown={onKeyDown}
                disabled={readOnly}
                className="medium"
                onFocus={onFocus}
                onKeyPress={onKeyPress}
                onBlur={(e) => {
                  blur ? blur(e) : undefined;
                }}
                value={value}
                onChange={(e) => {
                  setSearch(e.target.value);
                  !readOnly ? onChange(e) : undefined;
                }}
                style={{
                  height: '100%',
                  width: `${styleInput ? styleInput : clearAll ? 'calc(100% - 21px)' : '100%'}`,
                  border: 'none',
                  cursor: `${readOnly ? 'not-allowed' : ''}`,
                }}
                ref={ref ? ref : inputRef}
                type={type}
                placeholder={placeholder}
                required={required}
              ></input>

              {clearAll && isClear && (value || defaultValue) && !readOnly && (
                <img
                  className="cursor-pointer position-absolute"
                  style={{ right: 0 }}
                  onClick={() => {
                    const e = { target: { value: '' } };
                    onChange(e);
                    if (ref) {
                      ref.current.focus();
                    } else {
                      inputRef.current.value = '';
                      inputRef.current.focus();
                    }
                  }}
                  src={clearIcon}
                ></img>
              )}
            </Col>

            <Col
              className="h-100  d-flex align-items-center "
              style={{ justifyContent: 'center' }}
              flex={suffix ? '8%' : 'none'}
            >
              {suffix}
            </Col>
          </Row>
          {search != '' &&
          list &&
          data.filter((i) => lowerCase(i[dataIndex[0]]).includes(lowerCase(search))).length > 0
            ? createPortal(
                <div ref={refcomponent} className="dropInputcomponent">
                  {data
                    .filter((i) => lowerCase(i[dataIndex[0]]).includes(lowerCase(search)))
                    ?.map((i, index) => (
                      <div
                        onClick={() => {
                          onGet ? onGet(i) : undefined;
                          setSearch('');
                        }}
                        key={index}
                        className={
                          render ? 'item-dropInputcomponent-render' : 'item-dropInputcomponent'
                        }
                      >
                        {render ? (
                          render(i, search)
                        ) : (
                          <>
                            {' '}
                            <div>
                              Name:{' '}
                              <strong>
                                <Highlighter
                                  highlightClassName="highlight-class"
                                  searchWords={[search]}
                                  autoEscape={true}
                                  textToHighlight={i[dataIndex[0]]}
                                />
                              </strong>
                            </div>
                            <div>{i[dataIndex[1]]}</div>
                          </>
                        )}
                      </div>
                    ))}
                </div>,
                document.getElementById('root'),
              )
            : undefined}
        </div>
      );
    },
  ),

  number: React.forwardRef(
    (
      {
        readOnly,
        placeholder,
        value,
        onChange,
        blur,
        className,
        style,
        required = false,
        max,
        min,
        formatter,
        suffix,
        prefix,
        step,
        addonAfter,
        defaultValue,
        autoFocus = false,
        onKeyDown,
      },
      ref,
    ) => {
      return (
        <InputNumber
          autoFocus={autoFocus}
          disabled={readOnly}
          min={min}
          defaultValue={defaultValue}
          max={max}
          placeholder={placeholder}
          formatter={formatter}
          step={step}
          addonAfter={addonAfter}
          onBlur={blur}
          value={value}
          prefix={prefix}
          onChange={onChange}
          ref={ref}
          onKeyDown={onKeyDown}
          style={{
            ...style,
            width: '100%',
            height: '30px',
            backgroundColor: readOnly ? '#efefef' : 'white',
          }}
          className={`${required ? 'input-required' : ''} ${className} `}
          interface={{
            color: 'red',
          }}
          controls={{ upIcon: <img src={up}></img>, downIcon: <img src={down}></img> }}
        ></InputNumber>
      );
    },
  ),

  comment: React.forwardRef(
    (
      {
        style,
        className,
        value,
        readOnly = false,
        placeholder,
        blur,
        required = false,
        onChange,
        rows = 2,
      },
      ref,
    ) => {
      return (
        <textarea
          ref={ref}
          style={{ ...style, cursor: `${readOnly ? 'not-allowed' : 'unset'}` }}
          disabled={readOnly}
          rows={rows}
          className={`text-component ${className} ${required && !readOnly ? 'input-required' : ''}`}
          onBlur={blur}
          value={value}
          onChange={(e) => {
            if (onChange) {
              !readOnly ? onChange(e) : undefined;
            }
          }}
          placeholder={placeholder}
          required={required}
        ></textarea>
      );
    },
  ),

  pass: ({ value, placeholder, blur, required = false, onChange, status }) => {
    const [hiden, setHiden] = useState(true);
    return (
      <div className="pass-input">
        <input
          onBlur={blur}
          value={value}
          onChange={onChange}
          type={hiden ? 'password' : 'text'}
          className={`input-component ${status ? status : 'normal'} `}
          placeholder={placeholder}
          required={required}
        ></input>
        <img
          onClick={() => {
            setHiden(!hiden);
          }}
          src={hiden ? eye2 : eye}
        ></img>
      </div>
    );
  },
};

export { input };
