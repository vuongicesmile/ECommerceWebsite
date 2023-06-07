import React, { useState, useEffect, useRef } from 'react';
import './button.less';
import addbt from './asset/add.svg';
import undoSvg from './asset/undo.svg';
import editSvg from './asset/edit.svg';
import delSvg from './asset/delete.svg';
import saveSvg from './asset/save.svg';
import create from './asset/create.svg';
import closeSvg from './asset/close.svg';
import closeModal from './asset/closeModal.svg';
import closeIcon from './asset/closeIcon.svg';
import { createPortal } from 'react-dom';
import tang from './asset/tang.svg';
import cancelSVG from './asset/cancel.svg';
import giam from './asset/giam.svg';
import recover from './asset/recover.svg';
import ex from './asset/ex.svg';
import moon from './asset/moon.svg';
import tableadd from './asset/tableadd.svg';
import transportation from './asset/transportions.svg';
import depositsvg from './asset/deposit.svg';
import printSvg from './asset/print.svg';
import ghim from './asset/ghim.svg';
import alertSvg from './asset/alert.svg';
import backSvg from './asset/back.svg';
import nextSvg from './asset/next.svg';
import filter from './asset/filter.svg';
import { useModel, history, useIntl } from 'umi';
import { select } from '@/components/Select';
import { label } from '../Label';
import { check } from 'prettier';
import LoadingLogo, { LoadingButton } from '../LoadingLogo';

const ButtonForm = ({ list, className, onClick, children, img }) => {
  return (
    <button
      onClick={onClick}
      style={{ cursor: 'pointer', gap: '5px', paddingRight: list ? '30px' : '' }}
      className={`${className} buttonForm d-flex justify-content-center align-items-center`}
      type="button"
    >
      <img style={{ height: '20px', width: '20px' }} src={img}></img> {children}
    </button>
  );
};
const clickCreatePortal = (refCLickmenu, refCLickmenu2, right, autoWidth) => {
  if (refCLickmenu.current && refCLickmenu2.current) {
    if (refCLickmenu.current.style.display === 'flex') {
      refCLickmenu.current.style.display = 'none';
    } else {
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;
      refCLickmenu.current.style.display = 'flex';
      if (!autoWidth) {
        refCLickmenu.current.style.minWidth = refCLickmenu2.current.scrollWidth + 'px';
      }
      b =
        window.innerWidth -
        refCLickmenu2.current.scrollWidth -
        refCLickmenu2.current.getBoundingClientRect().x -
        refCLickmenu2.current.scrollWidth;
      c =
        refCLickmenu2.current.getBoundingClientRect().x +
        refCLickmenu2.current.scrollWidth -
        refCLickmenu.current.scrollWidth;
      d =
        window.innerWidth -
        refCLickmenu2.current.getBoundingClientRect().x -
        refCLickmenu.current.scrollWidth;

      if (
        window.innerHeight -
          refCLickmenu2.current.getBoundingClientRect().y -
          refCLickmenu.current.scrollHeight <
        0
      ) {
        a =
          refCLickmenu2.current.getBoundingClientRect().y +
          (window.innerHeight -
            refCLickmenu2.current.getBoundingClientRect().y -
            refCLickmenu.current.scrollHeight);
      } else {
        a = refCLickmenu2.current.getBoundingClientRect().y + refCLickmenu2.current.scrollHeight;
      }
      refCLickmenu.current.style.transform = `translate(${
        refCLickmenu2.current.getBoundingClientRect().x +
        (right ? refCLickmenu.current.offsetWidth : 0) +
        (right ? 0 : refCLickmenu2.current.offsetWidth) -
        refCLickmenu.current.offsetWidth +
        (right === false && b < 0 ? -b : c < 0 ? -c : right && d < 0 ? d : 0)
      }px,${a}px)`;
    }
  }
};
export const buttonList = {
  Dropdown: ({
    isClickClose = true,
    onClose = true,
    render,
    focusEvent,
    blurEvent,
    children,
    styleDrop,
    readOnly,
    content,
    onRoot = true,
    onClickClose,
    autoWidth = false,
    className,
    right = false,
    onClick,
  }) => {
    const ref1 = useRef();
    const ref2 = useRef();
    useEffect(() => {
      window.addEventListener('mousedown', (e) => {
        if (ref2.current && onClose) {
          if (!ref2.current.contains(e.target) && !ref1.current.contains(e.target)) {
            if (onClickClose && ref1.current.style.display == 'flex') onClickClose();
            ref1.current.style.display = 'none';
          }
        }
      });
      return window.removeEventListener('mousedown', (e) => {
        if (ref2.current && onClose) {
          if (ref2.current.contains(e.target) && ref1.current.contains(e.target)) {
            if (onClickClose && ref1.current.style.display == 'flex') onClickClose();
            ref1.current.style.display = 'none';
          }
        }
      });
    }, []);
    return (
      <div className={readOnly ? 'disablebutton' : ''} style={{ position: 'relative' }}>
        <div
          className={className}
          ref={(el) => {
            ref2.current = el;
            if (el && focusEvent) {
              let a = el.querySelectorAll('input');
              if (a[0]) {
                a[0].addEventListener('focus', () => {
                  if (!isClickClose && ref1 && ref1.current.style.display == 'flex') return;
                  if (onRoot) clickCreatePortal(ref1, ref2, right, autoWidth);
                  else {
                    ref1.current.style.display = 'flex';
                  }
                });
              }
            }
          }}
          style={{ cursor: 'pointer', width: 'fit-content', position: 'relative' }}
          onClick={() => {
            if (!isClickClose && ref1 && ref1.current.style.display == 'flex') return;
            if (onRoot) clickCreatePortal(ref1, ref2, right, autoWidth);
            else {
              ref1.current.style.display = 'flex';
            }
            if (onClick) {
              onClick();
            }
          }}
        >
          {children ? children : 'Drop'}
        </div>
        {onRoot ? (
          createPortal(
            <div
              ref={ref1}
              style={{ overflow: !styleDrop ? 'hidden' : '', ...styleDrop }}
              className="dropdownButtonComponent"
            >
              {content
                ? content(() => {
                    ref1.current.style.display = 'none';
                  })
                : undefined}
            </div>,
            document.getElementById('root'),
          )
        ) : (
          <div
            ref={ref1}
            className="dropdownButtonComponent"
            style={{
              overflow: styleDrop && !styleDrop.overflow ? 'hidden' : '',
              ...styleDrop,

              top: '100%',
            }}
          >
            {content
              ? content(() => {
                  ref1.current.style.display = 'none';
                })
              : undefined}
          </div>
        )}
      </div>
    );
  },
  ghim: ({ active = false }) => {
    return (
      <div
        className={active ? 'btGhim' : ''}
        style={{
          height: '40px',
          cursor: 'pointer',
          width: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          background: '#E1EAF6',
        }}
      >
        <img style={{ transition: '0.5s' }} src={ghim}></img>
      </div>
    );
  },
  normal: function ({
    img,
    className,
    style,
    title,
    onClick,
    readOnly = false,
    children,
    loading = false,
    afterContent,
  }) {
    const intl = useIntl();
    const defaultTitle = intl.formatMessage({
      id: 'component.button.normal',
      defaultMessage: 'Save',
    });
    if (!title) title = defaultTitle;

    return (
      <button
        onClick={() => {
          if (!readOnly && !loading) {
            onClick ? onClick() : undefined;
          }
        }}
        style={{ ...style, gap: '10px' }}
        data-content={afterContent && afterContent}
        className={`${
          readOnly ? 'readonlyNormal' : ''
        } ${className} button-component normal-button-component`}
        type="button"
      >
        {children}
        {loading ? <LoadingButton></LoadingButton> : ''}
        {img ? <img style={{ height: '20px' }} src={img}></img> : undefined}
        <label.titlexl>{title}</label.titlexl>
      </button>
    );
  },
  deposit: function ({ img, className, title, onClick, readOnly = false }) {
    return (
      <button
        onClick={!readOnly ? onClick : undefined}
        style={{ gap: '10px' }}
        className={`${
          readOnly ? 'readonly' : ''
        } ${className} button-component normal-button-component `}
        type="button"
      >
        <img src={depositsvg}></img>
        <label.titlexl>{title ?? 'Deposit'}</label.titlexl>
      </button>
    );
  },
  transportation: function ({ img, className, title, onClick, readOnly = false }) {
    return (
      <button
        onClick={!readOnly ? onClick : undefined}
        style={{ gap: '10px' }}
        className={`${
          readOnly ? 'readonly' : ''
        } ${className} button-component normal-button-component `}
        type="button"
      >
        <img src={transportation}></img>
        <label.titlexl>{title ?? 'Transportation'}</label.titlexl>
      </button>
    );
  },
  submit: function ({ className, title, onClick, disabled = false, img }) {
    const intl = useIntl();
    const defaultTitle = intl.formatMessage({
      id: 'component.button.normal',
      defaultMessage: 'Save',
    });
    if (!title) title = defaultTitle;

    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`${className} ${
          disabled ? 'readonly' : ''
        } button-component normal-button-component`}
        type="submit"
        style={{ gap: '10px', width: 'max-content' }}
      >
        <img src={img ? img : saveSvg}></img> <label.titlexl>{title}</label.titlexl>
      </button>
    );
  },
  cancel: function ({ className, title, onClick }) {
    const intl = useIntl();
    const defaultTitle = intl.formatMessage({
      id: 'component.button.cancel',
      defaultMessage: 'Close',
    });
    if (!title) title = defaultTitle;

    return (
      <div
        onClick={onClick}
        style={{ cursor: 'pointer', gap: '10px', width: '100px', minWidth: '100px' }}
        className={
          className +
          ' button-component d-flex justify-content-center align-items-center normal-button-component'
        }
        type="button"
      >
        <img src={closeIcon} />
        <label.titlelg>{title}</label.titlelg>
      </div>
    );
  },
  cancelv2: function ({ className, title, onClick, disabled = false }) {
    const intl = useIntl();
    const defaultTitle = intl.formatMessage({
      id: 'component.button.cancel',
      defaultMessage: 'Cancel',
    });
    if (!title) title = defaultTitle;

    return (
      <div
        onClick={onClick}
        style={{ cursor: 'pointer', gap: '10px', minWidth: '100px' }}
        className={`${className} button-component d-flex justify-content-center align-items-center normal-button-component ${
          disabled ? 'readonly' : ''
        }`}
        type="button"
      >
        <img src={cancelSVG} />
        <label.titlelg>{title}</label.titlelg>
      </div>
    );
  },
  icon: function ({ className, onClick, title, img, disabled, imgComponent, list, style }) {
    const ref = useRef();
    useEffect(() => {
      if (ref.current) {
        ref.current.style.height = '0px';
        ref.current.style.opacity = 0;
      }
    }, []);

    return (
      <button
        onMouseLeave={() => {
          ref.current.style.height = '0px';
          ref.current.style.opacity = 0;
        }}
        onClick={!disabled ? onClick : undefined}
        style={{
          ...style,
          position: 'relative',

          cursor: disabled ? 'not-allowed' : 'pointer',
          pointerEvents: disabled ? 'none' : 'auto',
        }}
        className={`${className} buttonList-icon d-flex justify-content-center align-items-center ${
          disabled ? 'buttonList-icon-disabled' : ''
        }`}
        type="button"
      >
        {img && <img className={disabled ? 'buttonList-icon-item-disabled' : ''} src={img}></img>}
        {title && (
          <div className={disabled ? 'buttonList-icon-item-disabled' : ''}>
            <label.titlelg>{title}</label.titlelg>
          </div>
        )}
        {imgComponent && (
          <div className={disabled ? 'buttonList-icon-disabled' : ''}>{imgComponent}</div>
        )}
        {list ? (
          <div
            className="groupDropDot"
            onMouseMove={() => {
              ref.current.style.height = ref.current.scrollHeight + 'px';
              ref.current.style.opacity = 1;
            }}
          >
            <div className="dotDrop"></div>
            <div className="dotDrop"></div>
            <div className="dotDrop"></div>
          </div>
        ) : undefined}
        <div
          ref={ref}
          className="btDrop"
          onMouseLeave={() => {
            ref.current.style.height = '0px';
            ref.current.style.opacity = 0;
          }}
        >
          {list?.map((i, index) => (
            <div
              key={index}
              onClick={() => {
                i.onClick();

                ref.current.style.height = 0 + 'px';
                ref.current.style.opacity = 0;
              }}
            >
              {i.title}
            </div>
          ))}
        </div>
      </button>
    );
  },
  add: function ({ className, onClick, title, disabled = false }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center ${
          disabled ? 'readonly' : ''
        }`}
        type="button"
      >
        <img src={create}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.add',
            defaultMessage: 'Add',
          })}
        </label.titlelg>
      </button>
    );
  },

  edit: function ({ onMouseDown, className, onClick, title, disabled = false }) {
    const intl = useIntl();

    return (
      <button
        onMouseDown={onMouseDown}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center ${
          disabled ? 'readonly' : ''
        }`}
        type="button"
      >
        <img src={editSvg}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.edit',
            defaultMessage: 'Edit',
          })}
        </label.titlelg>
      </button>
    );
  },
  normalIcon: function ({ img, onMouseDown, className, onClick, children, disabled = false }) {
    const intl = useIntl();

    return (
      <button
        onMouseDown={onMouseDown}
        onClick={onClick}
        style={{ cursor: 'pointer', width: 'max-content' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center ${
          disabled ? 'readonly' : ''
        }`}
        type="button"
      >
        <img src={img}></img> <label.titlelg>{children}</label.titlelg>
      </button>
    );
  },
  undo: function ({ className, onClick, title, disabled = false }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center ${
          disabled ? 'readonly' : ''
        }`}
        type="button"
      >
        <img src={undoSvg}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.undo',
            defaultMessage: 'Undo',
          })}
        </label.titlelg>
      </button>
    );
  },
  save: function ({ className, onClick, title, disabled = false }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center ${
          disabled ? 'readonly' : ''
        }`}
        type="submit"
      >
        <img src={saveSvg}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.save',
            defaultMessage: 'Save',
          })}
        </label.titlelg>
      </button>
    );
  },
  loading: function ({ className, onClick, title, disabled = false }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center ${
          disabled ? 'readonly' : ''
        }`}
        type="submit"
      >
        <LoadingButton></LoadingButton>
      </button>
    );
  },
  tableOpen2: function ({ reff, reff2, refV2, onClick }) {
    const ref = useRef();
    const [onclick, setOnclick] = useState(false);
    useEffect(() => {
      if (refV2) {
        refV2.map((i) => {
          if (document.querySelectorAll('.' + i).length > 0) {
            if (!onclick) {
              for (let j = 0; j < document.querySelectorAll('.' + i).length; j++) {
                document.querySelectorAll('.' + i)[j].style.display = 'revert';
              }
            } else {
              for (let j = 0; j < document.querySelectorAll('.' + i).length; j++) {
                document.querySelectorAll('.' + i)[j].style.display = 'none';
              }
            }
          }
        });
      }
      if (reff2) {
        if (document.querySelectorAll(reff2).length > 0) {
          if (!onclick) {
            for (let i = 0; i < document.querySelectorAll(reff2).length; i++) {
              document.querySelectorAll(reff2)[i].style.display = 'revert';
            }
          } else {
            for (let i = 0; i < document.querySelectorAll(reff2).length; i++) {
              document.querySelectorAll(reff2)[i].style.display = 'none';
            }
          }
        }
      } else {
        if (document.querySelector(reff)) {
          if (!onclick) {
            document.querySelector(reff).style.display = 'revert';
          } else {
            document.querySelector(reff).style.display = 'none';
          }
        }
      }
    }, [onclick]);
    const click = useRef(false);

    return (
      <div
        style={{ transition: '0.5s' }}
        className={`openTab-component`}
        onClick={() => {
          click.current = !click.current;
          onClick ? onClick(click.current ? 'none' : 'revert') : undefined;
          setOnclick(!onclick);
        }}
      >
        <div style={{ transform: onclick ? 'rotate(90deg)' : '' }} ref={ref}></div>
        <div></div>
      </div>
    );
  },
  tableOpen: function ({
    showAll,
    index,
    className,
    showAll2,
    showAll3,
    onClick,
    title,
    value = true,
    style,
    classClose,
  }) {
    const openService = () => {
      let arr = document.querySelectorAll(`.${classClose}`);
      let tableOpenService = document.querySelectorAll(`.table-service-button`);
      if (className) {
        let a = document.querySelectorAll(`.${className}`);
        if (a[index]?.classList.contains('tableOpen1')) {
          a[index]?.classList.remove('tableOpen1');
        } else {
          a[index]?.classList.add('tableOpen1');
        }

        for (let i = 0; i < arr.length; i++) {
          arr[i]?.classList.contains('onshowTable')
            ? arr[i].classList.remove('onshowTable')
            : arr[i].classList.add('onshowTable');
        }
      } else {
        if (tableOpenService[index].classList.contains('tableOpen1')) {
          tableOpenService[index].classList.remove('tableOpen1');
        } else {
          for (let i = 0; i < tableOpenService.length; i++) {
            tableOpenService[index].classList.add('tableOpen1');
          }
        }
        for (let i = 0; i < arr.length; i++) {
          arr[i].classList.contains('onshowTable')
            ? arr[i].classList.remove('onshowTable')
            : arr[i].classList.add('onshowTable');
        }
      }
    };
    const showalll = () => {
      if (document.querySelectorAll(`.${classClose}`)) {
        let arr = document.querySelectorAll(`.${classClose}`);
        let tableOpenService = document.querySelectorAll(`.table-service-button`);
        for (let i = 0; i < arr.length; i++) {
          arr[i].classList.remove('onshowTable');
        }
        setTimeout(() => {
          for (let i = 0; i < document.querySelectorAll(`.${classClose}`).length; i++) {
            document.querySelectorAll(`.${classClose}`)[i].classList.add('onshowTable');
          }
        }, 100);
        for (let i = 0; i < tableOpenService.length; i++) {
          if (!tableOpenService[i].classList.contains('tableOpen1')) {
            tableOpenService[i].classList.add('tableOpen1');
          }
        }
      }
    };
    useEffect(() => {
      showalll();
    }, [showAll, showAll2, showAll3]);
    return (
      <div
        style={style}
        className={` tableOpen`}
        onClick={() => {
          openService();
        }}
      >
        <div className={` ${className} table-service-button`}></div>
        <div></div>
      </div>
    );
  },

  // tableOpen2: function ({ reff, reff2, onChange }) {
  //   const ref = useRef();
  //   const [onclick, setOnclick] = useState(false);
  //   useEffect(() => {
  //     if (reff2) {
  //       if (document.querySelectorAll(reff2).length > 0) {
  //         if (!onclick) {
  //           for (let i = 0; i < document.querySelectorAll(reff2).length; i++) {
  //             document.querySelectorAll(reff2)[i].style.display = 'revert';
  //           }
  //         } else {
  //           for (let i = 0; i < document.querySelectorAll(reff2).length; i++) {
  //             document.querySelectorAll(reff2)[i].style.display = 'none';
  //           }
  //         }
  //       }
  //     } else {
  //       if (document.querySelector(reff)) {
  //         if (!onclick) {
  //           document.querySelector(reff).style.display = 'revert';
  //         } else {
  //           document.querySelector(reff).style.display = 'none';
  //         }
  //       }
  //     }
  //     if (onChange) onChange(onclick);
  //   }, [onclick]);
  //   const close = () => {
  //     if (document.querySelector(reff)) {
  //       document.querySelector(reff).style.display = !onclick ? 'revert' : 'none';
  //       return;
  //     }
  //   };
  //   return (
  //     <div
  //       style={{ transition: '0.5s' }}
  //       className={`openTab-component`}
  //       onClick={() => {
  //         setOnclick(!onclick);
  //       }}
  //     >
  //       <div style={{ transform: onclick ? 'rotate(90deg)' : '' }} ref={ref}></div>
  //       <div></div>
  //     </div>
  //   );
  // },

  close: function ({ className, onClick, title }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList-close d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img src={closeSvg}></img>{' '}
      </button>
    );
  },
  closeModal: function ({ onClick }) {
    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer', borderRadius: '50%' }}
        className="buttonList-closeModal d-flex justify-content-center align-items-center p-1"
        type="button"
      >
        <img src={closeModal}></img>{' '}
      </button>
    );
  },
  print: function ({ className, onClick, disabled = false, title }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center ${
          disabled ? 'readonly' : ''
        }`}
        type="button"
      >
        <img src={printSvg}></img>{' '}
        {title ? (
          title
        ) : (
          <label.titlelg>
            {intl.formatMessage({
              id: 'component.button.print',
              defaultMessage: 'Print',
            })}
          </label.titlelg>
        )}
      </button>
    );
  },
  alert: function ({ className, onClick }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img src={alertSvg}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.alert',
            defaultMessage: 'Alert',
          })}
        </label.titlelg>
      </button>
    );
  },
  importExcel: function ({ className, onClick, title }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ width: 'max-content', cursor: 'pointer' }}
        className={`${className}  buttonList d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img style={{ width: '20px' }} src={ex}></img>
        {title ? <label.titlelg>{title}</label.titlelg> : ''}
      </button>
    );
  },
  back: function ({ className, onClick }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img src={backSvg}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.back',
            defaultMessage: 'back',
          })}
        </label.titlelg>
      </button>
    );
  },
  next: function ({ className, onClick }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center`}
        type="button"
      >
        <img src={nextSvg}></img>{' '}
        <label.titlelg>
          {intl.formatMessage({
            id: 'component.button.next',
            defaultMessage: 'Next',
          })}
        </label.titlelg>
      </button>
    );
  },
  delete: function ({ className, onClick, title, disabled = false }) {
    const intl = useIntl();

    return (
      <button
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={`${className} buttonList d-flex justify-content-center align-items-center ${
          disabled ? 'readonly' : ''
        }`}
        type="button"
      >
        <img src={delSvg}></img>{' '}
        {title ? (
          title
        ) : (
          <label.titlelg>
            {intl.formatMessage({
              id: 'component.button.delete',
              defaultMessage: 'Delete',
            })}
          </label.titlelg>
        )}
      </button>
    );
  },
  form: {
    icon: function ({ className, onClick, children, img, disabled = true }) {
      return (
        <ButtonForm
          className={`${className} ${disabled ? 'readonly' : ''}`}
          onClick={onClick}
          img={img}
        >
          {children}
        </ButtonForm>
      );
    },
    add: function ({
      animation = false,
      className,
      onClick,
      children,
      img,
      disabled = false,
      note = '',
    }) {
      return (
        <ButtonForm
          className={`${animation ? 'animation' : ''} noteBt ${className} ${
            disabled ? 'readonly' : ''
          }`}
          onClick={disabled ? undefined : onClick}
          img={img ? img : addbt}
        >
          {children}
          {note != '' ? <div className="hoverNote">{note}</div> : undefined}
        </ButtonForm>
      );
    },
    recover: function ({
      animation = false,
      className,
      onClick,
      children,
      img,
      disabled = false,
      note = '',
    }) {
      return (
        <ButtonForm
          className={`${animation ? 'animation' : ''} noteBt ${className} ${
            disabled ? 'readonly' : ''
          }`}
          onClick={disabled ? undefined : onClick}
          img={img ? img : recover}
        >
          {children}
          {note != '' ? <div className="hoverNote">{note}</div> : undefined}
        </ButtonForm>
      );
    },
    alert: function ({ className, onClick, children, disabled = false, note = '' }) {
      return (
        <ButtonForm
          className={`${className} noteBt ${disabled ? 'readonly' : ''}`}
          onClick={disabled ? undefined : onClick}
          img={alertSvg}
        >
          {children}
          {note != '' ? <div className="hoverNote">{note}</div> : undefined}
        </ButtonForm>
      );
    },
    undo: function ({ className, onClick, children, disabled = false, note = '' }) {
      return (
        <ButtonForm
          className={`${className} noteBt ${disabled ? 'readonly' : ''}`}
          onClick={disabled ? undefined : onClick}
          img={undoSvg}
        >
          {children}
          {note != '' ? <div className="hoverNote">{note}</div> : undefined}
        </ButtonForm>
      );
    },
    delete: function ({ className, onClick, children, disabled = false, note = '' }) {
      return (
        <ButtonForm
          className={`${className} noteBt ${disabled ? 'readonly' : ''}`}
          onClick={disabled ? undefined : onClick}
          img={delSvg}
        >
          {children}
          {note != '' ? <div className="hoverNote">{note}</div> : undefined}
        </ButtonForm>
      );
    },
    save: function ({
      className,
      onClick,
      children,
      disabled = false,
      note = '',
      loading = false,
    }) {
      const [loading2, setLoading] = useState(false);
      useEffect(() => {
        setLoading(loading);
      }, [loading]);
      return (
        <ButtonForm
          className={`${className} noteBt ${disabled ? 'readonly' : ''}`}
          onClick={disabled || loading2 ? undefined : onClick}
          img={saveSvg}
        >
          {children}
          {loading2 ? <LoadingButton></LoadingButton> : undefined}
          {note != '' ? <div className="hoverNote">{note}</div> : undefined}
        </ButtonForm>
      );
    },

    print: function ({ list, className, onClick, children, disabled = false, note = '' }) {
      const ref = useRef();

      useEffect(() => {
        if (ref.current) {
          ref.current.style.height = '0px';
          ref.current.style.opacity = 0;
        }
      }, []);
      return (
        <div
          className={` allowDropBt ${disabled ? 'readonly' : ''}`}
          style={{
            display: 'flex',
          }}
          onMouseLeave={() => {
            ref.current.style.height = '0px';
            ref.current.style.opacity = 0;
          }}
        >
          <ButtonForm
            list={list}
            className={`allowDropBtComponent ${className} noteBt `}
            onClick={disabled ? undefined : onClick}
            img={printSvg}
          >
            {children}
            {note != '' ? <div className="hoverNote">{note}</div> : undefined}{' '}
            {list ? (
              <div
                className="groupDropDot"
                onMouseMove={() => {
                  ref.current.style.height = ref.current.scrollHeight + 'px';
                  ref.current.style.display = 'revert';
                  let a = ref.current.getBoundingClientRect().left;
                  a < 0 ? (ref.current.style.transform = `translateX(${-a + 50}px)`) : undefined;
                  ref.current.style.opacity = 1;
                  ref.current.style.overflow = 'unset';
                }}
              >
                <div className="dotDrop"></div>
                <div className="dotDrop"></div>
                <div className="dotDrop"></div>
              </div>
            ) : undefined}
          </ButtonForm>

          <div
            ref={ref}
            className="btDrop"
            onMouseLeave={() => {
              ref.current.style.height = '0px';
              ref.current.style.display = 'none';
              ref.current.style.overflow = 'hidden';
            }}
          >
            {list?.map((i, index) => (
              <div
                className="hoverdrop"
                key={index}
                onClick={() => {
                  i.onClick();
                  ref.current.style.height = 0 + 'px';
                  ref.current.style.display = 'none';
                }}
              >
                {i.title}
                {i.children ? (
                  <div className="btDropv2">
                    {i.children.map((j, index2) => (
                      <div
                        key={index2}
                        onClick={() => {
                          j.onClick ? j.onClick() : undefined;
                        }}
                      >
                        {j.title}
                      </div>
                    ))}
                  </div>
                ) : undefined}
              </div>
            ))}
          </div>
        </div>
      );
    },

    ExportMultiExcel: function ({
      list,
      className,
      onClick,
      children,
      disabled = false,
      note = '',
    }) {
      const ref = useRef();
      useEffect(() => {
        if (ref.current) {
          ref.current.style.height = '0px';
          ref.current.style.opacity = 0;
        }
      }, []);
      return (
        <div
          className={` allowDropBt ${disabled ? 'readonly' : ''}`}
          style={{
            display: 'flex',
          }}
          onMouseLeave={() => {
            ref.current.style.height = '0px';
            ref.current.style.opacity = 0;
          }}
        >
          <ButtonForm
            list={list}
            className={`allowDropBtComponent ${className} noteBt `}
            onClick={disabled ? undefined : onClick}
            img={ex}
          >
            {children}
            {note != '' ? <div className="hoverNote">{note}</div> : undefined}{' '}
            {list ? (
              <div
                className="groupDropDot"
                onMouseMove={() => {
                  ref.current.style.height = ref.current.scrollHeight + 'px';
                  ref.current.style.opacity = 1;
                }}
              >
                <div className="dotDrop"></div>
                <div className="dotDrop"></div>
                <div className="dotDrop"></div>
              </div>
            ) : undefined}
          </ButtonForm>

          <div
            ref={ref}
            className="btDrop"
            onMouseLeave={() => {
              ref.current.style.height = '0px';
              ref.current.style.opacity = 0;
            }}
          >
            {list?.map((i, index) => (
              <div
                key={index}
                onClick={() => {
                  i.onClick ? i.onClick() : undefined;
                  ref.current.style.height = 0 + 'px';
                  ref.current.style.opacity = 0;
                }}
              >
                {i.render ? i.render() : i.title}
              </div>
            ))}
          </div>
        </div>
      );
    },

    filter: function ({ list, className, onClick, children, disabled = false, note = '' }) {
      const ref = useRef();
      useEffect(() => {
        if (ref.current) {
          ref.current.style.height = '0px';
          ref.current.style.opacity = 0;
        }
      }, []);
      return (
        <div
          className={` allowDropBt ${disabled ? 'readonly' : ''}`}
          style={{
            display: 'flex',
          }}
          onMouseLeave={() => {
            ref.current.style.height = '0px';
            ref.current.style.opacity = 0;
          }}
        >
          <ButtonForm
            className={`allowDropBtComponent ${className} noteBt `}
            onClick={() => {
              if (ref.current.style.height != '0px') {
                ref.current.style.height = '0px';
                ref.current.style.opacity = 0;
              } else {
                ref.current.style.height = ref.current.scrollHeight + 'px';
                ref.current.style.opacity = 1;
              }
            }}
            img={filter}
          >
            {children}
            {note != '' ? <div className="hoverNote">{note}</div> : undefined}
          </ButtonForm>
          {list ? (
            <div
              className="filterButtonComponent"
              onClick={() => {
                ref.current.style.height != '0px'
                  ? (ref.current.style.height = '0px')
                  : (ref.current.style.height = ref.current.scrollHeight + 'px');
              }}
            >
              <img scr={'https://d2441bdvuxbh7t.cloudfront.net/web/images/grepper_and_logo.jpeg'} />
            </div>
          ) : undefined}
          <div ref={ref} className="btDrop">
            {list?.map((i, index) => (
              <div
                key={index}
                onClick={() => {
                  i.onClick();
                  ref.current.style.height == '0px'
                    ? (ref.current.style.height = ref.current.scrollHeight + 'px')
                    : (ref.current.style.height = '0px');
                }}
              >
                {i.title}
              </div>
            ))}
          </div>
        </div>
      );
    },
    printList: function ({ className, onClick, children, disabled = false, note = '' }) {
      return (
        <div className="printList">
          <div>
            <img src={printSvg}> </img>
          </div>
          <div></div>
        </div>
      );

      // <ButtonForm
      //   className={`${className} noteBt ${disabled ? 'readonly' : ''}`}
      //   onClick={disabled ? undefined : onClick}
      //   img={printSvg}
      // >
      //   {children}
      //   {note != '' ? <div className="hoverNote">{note}</div> : undefined}
      // </ButtonForm>
    },
    edit: function ({ className, onClick, children, disabled = false, note = '' }) {
      return (
        <ButtonForm
          className={`${className} noteBt ${disabled ? 'readonly' : ''}`}
          onClick={disabled ? undefined : onClick}
          img={editSvg}
        >
          {children}
          {note != '' ? <div className="hoverNote">{note}</div> : undefined}
        </ButtonForm>
      );
    },
  },
  selectDay: ({ onChange, className, onClick }) => {
    const [value, setValue] = useState(0);

    return (
      <div className={className + ' selectDay-component'}>
        <img
          onClick={() => {
            value != 0 ? setValue(value - 1) : '';
          }}
          style={{ cursor: 'pointer' }}
          src={giam}
        ></img>
        <div
          style={{
            width: '40%',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <input onChange={onChange ? onChange(value) : ''} value={value}></input>
          <img src={moon}></img>
        </div>

        <img
          onClick={() => {
            setValue(value + 1);
          }}
          style={{ cursor: 'pointer' }}
          src={tang}
        ></img>
      </div>
    );
  },
  selectnumber: ({ onChange, className, onClick, img, value }) => {
    const [values, setValue] = useState(value ? value : 0);
    useEffect(() => {
      onChange ? onChange(values) : undefined;
    }, [values]);
    useEffect(() => {
      setValue(value);
    }, [value]);
    return (
      <div className={className + ' selectDay-component'}>
        <img src={img}></img>
        <img
          onClick={() => {
            values != 0 ? setValue(values - 1) : undefined;
          }}
          style={{ cursor: 'pointer' }}
          src={giam}
        ></img>

        <input onChange={() => {}} value={values}></input>

        <img
          onClick={() => {
            setValue(values + 1);
          }}
          style={{ cursor: 'pointer' }}
          src={tang}
        ></img>
      </div>
    );
  },
};
