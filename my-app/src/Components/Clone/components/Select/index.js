import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Empty } from 'antd';
import './select.less';
import dropsvg from './asset/dropdow.svg';
import closeIcon from './asset/close.svg';
import addIcon from './asset/add.svg';
import { useModel } from 'umi';
import { createPortal } from 'react-dom';

const SelectComponent = ({ listSL, className }) => {
  const [open, setOpen] = useState(false);
  const [sl, setSl] = useState('Select');
  const selectRef = useRef();
  const onCLick = (e) => {
    if (!selectRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onCLick);
    return () => document.removeEventListener('mousedown', onCLick);
  }, []);

  return (
    <div
      className={`component-select ${className}`}
      ref={selectRef}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <div
        className="d-flex align-items-center"
        style={{
          border: '1px solid #3E5C76',
          height: '50px',
          borderRadius: `${open ? '10px 10px 0px 0px' : '10px'}`,

          paddingLeft: '5px',
        }}
      >
        {sl}
      </div>
      <div className={`dropDown-component ${open ? 'd-block' : 'd-none'}`}>
        {listSL &&
          listSL.map((i, index) => (
            <div
              onClick={() => {
                setSl(i);
              }}
              key={index}
            >
              {i}
            </div>
          ))}
      </div>
    </div>
  );
};

const select = {
  color: ({ onChange, className, valueIndex, readOnly = false }) => {
    const { colors } = useModel('defaultdata');
    const [colornumber, setColor] = useState(null);
    const [open, setOpen] = useState(false);
    const selectRef = useRef();
    const value = [{ color: 'none' }, ...colors];
    const title = ['none', 'red', 'green', 'yellow', 'purple', 'pink', 'orange', 'black', 'blue'];

    const onCLick = (e) => {
      if (!selectRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', onCLick);
      return () => document.removeEventListener('mousedown', onCLick);
    }, []);

    return (
      <div
        ref={selectRef}
        className={`${className} sl-color d-flex `}
        style={{
          cursor: `${readOnly ? 'not-allowed' : 'pointer'}`,
          background: `${
            valueIndex && valueIndex != null
              ? valueIndex
              : colornumber && value[colornumber].color != 'none'
              ? value[colornumber].color
              : 'conic-gradient(from 180deg at 50% 50%, #D629A5 0deg, #C61F1F 0.68deg, #C58334 39.36deg, #C5B843 73.66deg, #7DC551 112.27deg, #26CE7D 149.12deg, #40D2D2 192.81deg, #3764D6'
          }`,
          gap: '5%',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => {
          readOnly ? undefined : setOpen(!open);
        }}
      >
        <div
          style={{
            top: '120%',
            display: `${open ? 'grid' : 'none'}`,
            position: 'absolute',
            width: ' max-content',
            zIndex: '22',
            gap: '20px',
            maxHeight: '166px',
            border: '0.5px solid rgba(64, 66, 67, 0.2)',
            overflowY: 'overlay',
            background: 'white',
            gridTemplateColumns: 'auto auto auto auto auto',
            padding: '10px',
            boxShadow: '0px 0px 5px rgb(0,0,0,0.3)',
            borderRadius: '10px',
          }}
        >
          {value.map((i, index) => (
            <div
              key={index}
              onClick={() => {
                onChange(value[index].color == 'none' ? null : value[index].color);
                setOpen(!open);
              }}
              className={`d-flex justify-content-center align-items-center ${'color-hover'} `}
              style={{ cursor: 'pointer', gap: '10px', height: '35px', width: '35px' }}
            >
              {index == 0 ? (
                <div
                  className="colorItem"
                  key={index}
                  style={{
                    background: `white`,
                    height: '25px',
                    width: '25px',
                    position: 'relative',
                  }}
                >
                  {i.color}
                </div>
              ) : (
                <div
                  className="colorItem"
                  key={index}
                  style={{
                    background: `${i.color}`,
                    height: '25px',
                    width: '25px',
                    position: 'relative',
                  }}
                >
                  {/* <div className="ghichu">{title[index]}</div> */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },

  option: React.forwardRef(
    ({ value, value2, children, onClick, size, onOptionClick, className, onHover }, ref) => {
      return (
        <div
          className={`${className}`}
          style={{ fontSize: size === 'large' ? '16px' : '14px' }}
          onClick={(e) => {
            onClick(value, children);
            if (onOptionClick) {
              onOptionClick();
            }
          }}
          onMouseEnter={(e) => {
            onHover(value);
          }}
          ref={ref}
        >
          {children}
        </div>
      );
    },
  ),

  group: React.forwardRef(
    (
      {
        onClick2,
        readOnly,
        status,
        className,
        children,
        onClickSetItem,
        imgadd,
        onChange,
        value,
        placeholder,
        render,
        size,
        img,
        allowClear = true,
        showSearch = true,
        defaultValue = null,
        allowAdd,
        onAdd,
        width,
        required = false,
        optionWidth,
        onAddComplete,
        maxHeight,
      },
      ref,
    ) => {
      const defaultPlaceholder = 'Select Value';

      const [isClose, setIsClose] = useState(false);
      const [isSearch, setIsSearch] = useState(false);
      const [open, setOpen] = useState(false);
      const [sl, setSl] = useState(null);
      const [searchValue, setSearchValue] = useState('');
      const [selectWidth, setSelectWidth] = useState(0);
      const [xPosition, setXPosition] = useState(0);
      const [yPostiion, setYPostiion] = useState(0);
      const [optionWidthValue, setOptionWidthValue] = useState(0);
      const [isOptionLargerThanSelect, setIsOptionLargerThanSelect] = useState(true);
      const selectRef = useRef();
      const optionRef = useRef();
      const selectedOptionRef = useRef();
      const optionContainerRef = useRef();
      const inputRef = useRef();
      const getLengthRef = useRef(true);
      const firstUpdate = useRef(true);
      const [selectedValue, setSelectedValue] = useState();

      const onCLick = (e) => {
        if (!selectRef.current?.contains(e.target) && !optionRef.current?.contains(e.target)) {
          setOpen(false);
          setIsSearch(false);
          setSearchValue('');
        }
      };

      const onOptionClick = (value, children) => {
        onClickSetItem ? onClickSetItem(value) : undefined;
        setSl(children);
        if (isSearch) {
          setIsSearch(false);
          setSearchValue('');
        }
        if (onChange) {
          onChange(value);
        }
      };

      const onOptionHover = (value) => {
        setSelectedValue(value);
      };

      const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onClick: onOptionClick,
            onHover: onOptionHover,
            size: size ? size : null,
            className: selectedValue == child.props.value ? 'selected-value' : '',
            ref: selectedValue == child.props.value ? selectedOptionRef : undefined,
          });
        }
        return child;
      });

      const resetData = () => {
        setSl(defaultPlaceholder);
        if (placeholder) {
          setSl(placeholder);

          // setIsSearch(true);
        }
      };
      const setWidth = () => {
        let rect = selectRef.current?.getBoundingClientRect();
        setSelectWidth(selectRef.current?.offsetWidth);
        setXPosition(rect.left);
        setYPostiion(rect.bottom);
        setTimeout(() => {
          if (
            optionRef.current?.getBoundingClientRect().bottom >=
            (window.innerHeight || document.documentElement.clientHeight)
          ) {
            setYPostiion(rect.top - optionRef.current.offsetHeight - 5);
          }
        }, 1);
      };

      useEffect(() => {
        setOpen(false);
        setWidth();
        if (selectRef && selectRef.current && optionWidth) {
          window.addEventListener('resize', setWidth, false);
          return () => {
            window.removeEventListener('resize', setWidth, false);
          };
        }
      }, []);

      useEffect(() => {
        if (open && getLengthRef.current) {
          setOptionWidthValue(optionRef.current.offsetWidth);
          getLengthRef.current = false;
        }
        // if (open && value) {
        //   const index = childrenWithProps.findIndex((item) => {
        //     return item.props.value == value;
        //   });
        //   const { clientHeight } = selectedOptionRef.current;
        //   setTimeout(() => {
        //     for (let i = 0; i <= index; i++) {
        //       console.log(childrenWithProps[i]);
        //     }
        //   }, 50);
        // }
        onClick2 ? onClick2() : undefined;
      }, [open]);

      useEffect(() => {
        if (optionWidthValue) {
          if (selectWidth > optionWidthValue) {
            setIsOptionLargerThanSelect(false);
          } else {
            setIsOptionLargerThanSelect(true);
          }
        }
      }, [selectWidth, optionWidthValue]);

      useEffect(() => {
        if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
        }
        if (onAddComplete) {
          onAddComplete(childrenWithProps[childrenWithProps.length - 1]?.props.value);
        }
      }, [childrenWithProps?.length]);

      useEffect(() => {
        document.addEventListener('mousedown', onCLick);
        window.addEventListener(
          'scroll',
          (e) => {
            if (!optionRef.current?.contains(e.target)) setOpen(false);
          },
          true,
        );
        resetData();
        // setSl(defaultPlaceholder);
        if (value !== null) {
          React.Children.forEach(children, (child) => {
            if (child.props.value == value) {
              setSl(child.props.children);
              setIsSearch(false);
              // if (onChange) {
              //   onChange(child.props.value);
              // }
            }
          });
        } else {
          resetData();
        }
        return () => {
          document.removeEventListener('mousedown', onCLick);
          window.removeEventListener(
            'scroll',
            () => {
              if (!optionRef.current?.contains(e.target)) setOpen(false);
            },
            true,
          );
        };
      }, [value]);

      useEffect(() => {
        isSearch ? inputRef.current?.focus() : undefined;
        onClick2 ? onClick2() : undefined;
      }, [isSearch]);

      useEffect(() => {
        if (showSearch && searchValue !== '') {
          setOpen(true);
        }
        if (childrenWithProps && childrenWithProps.length) {
          let arr = childrenWithProps.filter((item) =>
            item.props.children?.toLowerCase().includes(searchValue.toLowerCase()),
          );
          if (arr.length) setSelectedValue(arr[0].props.value);
        }
      }, [searchValue, children]);

      return (
        <div className={`component-select ${className} `} ref={selectRef}>
          <div
            onMouseEnter={() => {
              if (sl != placeholder && sl != defaultPlaceholder && !readOnly) {
                setIsClose(true);
              }
            }}
            onMouseLeave={() => setIsClose(false)}
            className={`d-flex align-items-center  justify-content-between  select-content ${
              required ? 'select-required' : ''
            } ${readOnly ? 'select-readonly' : ''}`}
            style={{
              border: `0.5px solid ${open ? '#5cbeff' : 'rgba(64, 66, 67, 0.5)'} `,
              height: `${size === 'large' ? '48px' : '30px'}`,
              borderRadius: `5px`,
              width: `${width ? width : '100%'}`,
              maxWidth: '100%',
              border: '0.5px solid rgba(64, 66, 67, 0.2)',
              paddingLeft: '8px',
              fontSize: `${size === 'large' ? '16px' : '14px'}`,
              position: 'relative',
              paddingRight: '8px',
              backgroundColor: 'white',
            }}
          >
            <div
              tabIndex={0}
              className={`d-flex align-items-center ${
                sl == placeholder || sl == defaultPlaceholder ? 'select-placeholder' : ''
              } `}
              style={{
                width: '85%',
              }}
              // onClick={(e) => {
              //   setWidth();
              //   if (!readOnly) {
              //     setOpen(!open);
              //   }
              //   e.stopPropagation();
              // }}
              onFocus={(e) => {
                setWidth();
                if (!readOnly) {
                  setIsSearch(true);
                  setOpen(true);
                }
              }}
              // onBlur={(e)=>{
              //   setIsSearch(false);
              //   setOpen(false);
              // }}
            >
              {status && <div style={{ paddingRight: '10px' }}>{status} </div>}
              {img && <img style={{ paddingRight: '10px' }} src={img}></img>}
              {isSearch ? (
                <input
                  disabled={readOnly}
                  value={searchValue}
                  className={`select-input-search ${required ? 'select-required' : ''} ${
                    size === 'large' ? 'large-placeholer' : ''
                  }`}
                  style={{ width: img ? '72%' : '85%' }}
                  placeholder={sl}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  ref={inputRef}
                  onBlur={(e) => {
                    setIsSearch(false);
                    setTimeout(() => {
                      setOpen(false);
                    }, 200);
                  }}
                  onKeyDown={(e) => {
                    const selectedOptionRect = selectedOptionRef.current?.getBoundingClientRect();
                    const optionContainerRect = optionContainerRef.current?.getBoundingClientRect();
                    const index = childrenWithProps
                      .filter((item) =>
                        item.props.children?.toLowerCase().includes(searchValue.toLowerCase()),
                      )
                      .findIndex((item) => {
                        return item.props.value == selectedValue;
                      });

                    if (e.key == 'ArrowDown') {
                      e.preventDefault();
                      if (
                        index ==
                        childrenWithProps.filter((item) =>
                          item.props.children?.toLowerCase().includes(searchValue.toLowerCase()),
                        ).length -
                          1
                      ) {
                        setSelectedValue(
                          childrenWithProps.filter((item) =>
                            item?.props.children?.toLowerCase().includes(searchValue.toLowerCase()),
                          )[0]?.props.value,
                        );
                        optionContainerRef.current.scrollTop = 0;
                      } else {
                        setSelectedValue(
                          childrenWithProps.filter((item) =>
                            item.props.children?.toLowerCase().includes(searchValue.toLowerCase()),
                          )[index + 1].props.value,
                        );
                        if (
                          selectedOptionRect.top - optionContainerRect.top >=
                          optionContainerRect.height - selectedOptionRect.height
                        )
                          optionContainerRef.current.scrollTop += selectedOptionRect.height;
                      }
                    }
                    if (e.key == 'ArrowUp') {
                      e.preventDefault();
                      if (index == 0) {
                        setSelectedValue(
                          childrenWithProps.filter((item) =>
                            item.props.children?.toLowerCase().includes(searchValue.toLowerCase()),
                          )[
                            childrenWithProps.filter((item) =>
                              item.props.children
                                ?.toLowerCase()
                                .includes(searchValue.toLowerCase()),
                            ).length - 1
                          ].props.value,
                        );
                        optionContainerRef.current.scrollTop =
                          optionContainerRef.current.scrollHeight;
                      } else {
                        setSelectedValue(
                          childrenWithProps.filter((item) =>
                            item.props.children?.toLowerCase().includes(searchValue.toLowerCase()),
                          )[index - 1].props.value,
                        );
                        if (selectedOptionRect.top <= optionContainerRect.top)
                          optionContainerRef.current.scrollTop -= selectedOptionRect.height;
                      }
                    }
                    if (e.key == 'Enter') {
                      // onChange(selectedValue);
                      setOpen(false);
                      setIsSearch(false);
                      setSearchValue('');
                      selectedOptionRef.current.click();
                      setSelectedValue(childrenWithProps[0].props.value);
                    }
                  }}
                />
              ) : (
                <span
                  onClick={() => {
                    if (!readOnly) {
                      setIsSearch(true);
                    }
                  }}
                  style={{
                    paddingLeft: '2px',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                >
                  {render && sl ? render(sl) : sl}
                </span>
              )}
            </div>
            {allowClear && isClose ? (
              <div
                className="img-container"
                style={{
                  right: allowAdd ? '32px' : '12px',
                }}
                onClick={() => {
                  resetData();
                  setOpen(true);
                  setSearchValue('');
                  if (onChange) {
                    onChange(defaultValue);
                  }
                  setIsClose(false);
                  setIsSearch(true);
                }}
              >
                <img
                  style={{
                    width: '10px',
                  }}
                  src={closeIcon}
                ></img>
              </div>
            ) : (
              <img
                style={{
                  position: 'absolute',
                  right: allowAdd ? '32px' : '12px',
                }}
                src={dropsvg}
                onClick={() => {
                  if (!readOnly) {
                    setWidth();
                    setOpen(!open);
                  }
                }}
              ></img>
            )}
            {allowAdd && (
              <img src={imgadd ? imgadd : addIcon} onClick={readOnly ? undefined : onAdd} />
            )}
          </div>
          {open &&
            createPortal(
              <div
                className={`dropDown-component-group d-block cursor-pointer`}
                style={{
                  width: optionWidth
                    ? isOptionLargerThanSelect
                      ? optionWidth
                      : selectWidth
                    : selectWidth,
                  transform: `translate(${xPosition}px,${yPostiion + 2}px)`,
                }}
                ref={(node) => {
                  optionRef.current = node;
                  if (ref) {
                    ref.current = node;
                  }
                }}
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {childrenWithProps?.filter((item) =>
                  item.props.children?.toLowerCase().includes(searchValue.toLowerCase()),
                ).length !== 0 ? (
                  <div
                    className="dropdown-group-inner"
                    style={{ maxHeight: maxHeight ? maxHeight : '168px' }}
                    ref={optionContainerRef}
                  >
                    {childrenWithProps?.filter((item) =>
                      item.props.children?.toLowerCase().includes(searchValue.toLowerCase()),
                    )}
                  </div>
                ) : (
                  <Empty className="empty" />
                )}
              </div>,
              document.getElementById('root'),
            )}
        </div>
      );
    },
  ),
};

const dropdown = {
  normal: ({ className, content, contentDrop }) => {
    const [open, setOpen] = useState(false);
    const selectRef = useRef();
    const onCLick = (e) => {
      if (!selectRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', onCLick);
      return () => document.removeEventListener('mousedown', onCLick);
    }, []);

    return (
      <div
        className={`component-select-dropdow ${className}`}
        ref={selectRef}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        <div
          className="d-flex align-items-center"
          style={{
            height: '50px',
            borderRadius: '10px',

            paddingLeft: '5px',
          }}
        >
          {content}
        </div>
        <div className={`dropDown-component-n ${open ? 'd-block' : 'd-none'}`}>{contentDrop}</div>
      </div>
    );
  },
};

export { dropdown, SelectComponent, select };
