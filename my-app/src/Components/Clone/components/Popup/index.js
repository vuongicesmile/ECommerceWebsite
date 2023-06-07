import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { buttonList } from '../Button';
import { label } from '../Label';
import { Row, Col, Form } from 'antd';
import './popup.less';
import { createPortal } from 'react-dom';
import loading from './asset/loading.svg';

const ButtonGroup = ({ children }) => {
  return (
    <div
      style={{ gap: '10px' }}
      className="footer d-flex justify-content-end align-items-center pt-3"
    >
      {children}
    </div>
  );
};

export default function Modal({
  visible,
  onClose,
  size,
  children,
  groupButton,
  isbutton = true,
  title,
  isVisibleCancel = true,
  height,
  className,
  disableOk = false,
  Widht1,
  width,
  okTitle,
  cancelTitle,
  onOK,
  okIcon,
  thirdIcon,
  loadingOK = false,
  visibleOK = true,
  toRoot = false,
  thirdButton = false,
  thirdButtonTitle,
  onThirdButtonClick,
  disableCancel = false,
  isPopupConfirm = false,
}) {
  const sizeList = {
    s: {
      xs: { span: 22 },
      sm: { span: 11 },
      md: { span: 9 },
      lg: { span: 7 },
      xl: { span: 6 },
      xxl: { span: 5 },
    },
    xs: {
      xs: { span: 22 },
      sm: { span: 14 },
      md: { span: 10 },
      lg: { span: 8 },
      xl: { span: 7 },
      xxl: { span: 6 },
    },
    sm: {
      xs: { span: 22 },
      sm: { span: 16 },
      md: { span: 12 },
      lg: { span: 10 },
      xl: { span: 9 },
      xxl: { span: 8 },
    },
    md: {
      xs: { span: 22 },
      sm: { span: 18 },
      md: { span: 14 },
      lg: { span: 12 },
      xl: { span: 11 },
      xxl: { span: 10 },
    },
    lg: {
      xs: { span: 22 },
      sm: { span: 20 },
      md: { span: 16 },
      lg: { span: 14 },
      xl: { span: 13 },
      xxl: { span: 12 },
    },
    xl: {
      xs: { span: 22 },
      sm: { span: 22 },
      md: { span: 18 },
      lg: { span: 16 },
      xl: { span: 15 },
      xxl: { span: 14 },
    },
    xxl: {
      xs: { span: 22 },
      sm: { span: 22 },
      md: { span: 20 },
      lg: { span: 18 },
      xl: { span: 17 },
      xxl: { span: 16 },
    },
    xxxl: {
      xs: { span: 22 },
      sm: { span: 22 },
      md: { span: 22 },
      lg: { span: 22 },
      xl: { span: 22 },
      xxl: { span: 22 },
    },
  };
  const [ref, setRef] = useState();
  const popuptMainRef = useRef();
  const onmouseDown = useRef(false);
  const popuptRef = useRef();
  const onCLick = (e) => {
    if (!popuptRef.current.contains(e.target) && visible && onClose) {
      onClose();
    }
  };
  let [position2, setposition2] = useState({
    x: 0,
    y: 0,
  });
  let [position, setposition] = useState({
    x: 0,
    y: 0,
  });
  const refWidth = useRef(0);
  const thisSize = sizeList[size];

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      let positon22 = { x1: position2.x, y1: position2.y };
      if (onmouseDown.current) {
        popuptRef.current.style.width = refWidth.current + 'px';
        popuptRef.current.style.userSelect = 'none';
        popuptRef.current.style.left = e.clientX - (positon22.x1 - position.x) + 'px';
        popuptRef.current.style.top = e.clientY - (positon22.y1 - position.y) + 'px';
      }
    });
    window.removeEventListener('mousemove', (e) => {
      let positon22 = { x1: position2.x, y1: position2.y };
      if (onmouseDown.current) {
        popuptRef.current.style.width = refWidth.current + 'px';
        popuptRef.current.style.userSelect = 'none';
        popuptRef.current.style.left = e.clientX - (positon22.x1 - position.x) + 'px';
        popuptRef.current.style.top = e.clientY - (positon22.y1 - position.y) + 'px';
      }
    });
    window.addEventListener('mouseup', (e) => {
      onmouseDown.current = false;
    });
    window.removeEventListener('mouseup', (e) => {
      onmouseDown.current = false;
    });
    popuptMainRef.current.addEventListener('mouseleave', (e) => {
      onmouseDown.current = false;
    });
    popuptMainRef.current.removeEventListener('mouseleave', (e) => {
      onmouseDown.current = false;
    });
  }, []);
  useLayoutEffect(() => {
    if (ref) {
      if (ref && window.innerHeight - ref.scrollHeight < -2) {
        ref.style.alignItems = 'unset';
      } else {
        ref.style.alignItems = 'center';
      }
      window.addEventListener('resize', () => {
        if (ref && window.innerHeight - ref.scrollHeight < -2) {
          ref.style.alignItems = 'unset';
        } else {
          ref.style.alignItems = 'center';
        }
      });
      return window.removeEventListener('resize', () => {
        if (ref && window.innerHeight - ref.scrollHeight < -2) {
          ref.style.alignItems = 'unset';
        } else {
          ref.style.alignItems = 'center';
        }
      });
    }
  }, [ref]);

  const modalElement = (
    <div ref={popuptMainRef} className={` modal-component ${visible ? 'd-flex' : 'd-none'} `}>
      <Row
        ref={(el) => {
          setRef(el);
          // if (el) {
          //   if (window.innerHeight - el.scrollHeight < -2) {
          //     el.style.alignItems = 'unset';
          //   } else {
          //     el.style.alignItems = 'center';
          //   }
          // }
        }}
        className={className + ' modal-component'}
      >
        <Col
          ref={(el) => {
            popuptRef.current = el;
          }}
          style={{ width: Widht1, maxWidth: `${width ? width : ''}`, position: 'absolute' }}
          className={`modal-container`}
          {...thisSize}
        >
          <div
            onMouseDown={(e) => {
              refWidth.current = popuptRef.current.offsetWidth;
              position.x = popuptRef.current.getBoundingClientRect().left;
              position.y = popuptRef.current.getBoundingClientRect().top;
              position2.x = e.clientX;
              position2.y = e.clientY;
              onmouseDown.current = true;
            }}
            className="header d-flex justify-content-between align-items-center"
          >
            <div className="modal-group-title">
              <label.titlexxl>{title}</label.titlexxl>
            </div>
            <div>
              {isVisibleCancel && <buttonList.closeModal onClick={onClose}></buttonList.closeModal>}
            </div>
          </div>
          <div className="body" style={{ minHeight: 100, maxHeight: `${height ? height : '90%'}` }}>
            {children}
          </div>
          {isbutton ? (
            <div className="footer d-flex justify-content-end align-items-center pt-3">
              {groupButton ? (
                groupButton
              ) : (
                <>
                  {isPopupConfirm && !disableCancel ? (
                    <buttonList.normal className="me-2" onClick={onClose} title={cancelTitle} />
                  ) : !disableCancel ? (
                    <buttonList.cancel className="me-2" onClick={onClose} title={cancelTitle} />
                  ) : (
                    <></>
                  )}
                  {thirdButton && visibleOK && !loadingOK ? (
                    <div className="d-flex" style={{ gap: 4 }}>
                      <buttonList.normal
                        title={thirdButtonTitle && thirdButtonTitle}
                        onClick={onThirdButtonClick && onThirdButtonClick}
                        img={thirdIcon}
                      />
                      {isPopupConfirm ? (
                        <buttonList.normal
                          title={okTitle}
                          readOnly={disableOk}
                          onClick={onOK}
                          img={okIcon}
                        />
                      ) : (
                        <buttonList.submit
                          title={okTitle}
                          disabled={disableOk}
                          onClick={onOK}
                          img={okIcon}
                        />
                      )}
                    </div>
                  ) : visibleOK && !loadingOK ? (
                    isPopupConfirm ? (
                      <buttonList.normal
                        title={okTitle}
                        readOnly={disableOk}
                        onClick={onOK}
                        img={okIcon}
                      />
                    ) : (
                      <buttonList.submit
                        title={okTitle}
                        disabled={disableOk}
                        onClick={onOK}
                        img={okIcon}
                      />
                    )
                  ) : loadingOK ? (
                    <buttonList.icon className="btn-loading-ok" img={loading} />
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          ) : undefined}
        </Col>
      </Row>
    </div>
  );

  return toRoot ? createPortal(modalElement, document.getElementById('root')) : modalElement;
}

export { ButtonGroup };
