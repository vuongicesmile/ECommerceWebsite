import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import { useIntl, FormattedMessage, setLocale, getLocale, history, useModel } from 'umi';
import menu from './menu.svg';
import './down.svg';
import { dropdown } from '@/components/Select';

export default function Menu({ data }) {
  const [sl, setSL] = useState();
  const logout = () => {
    Cookies.remove('userlogin');
    if (!history) return;

    history.push('/login/');
  };

  const [numberShow, setNumberShow] = useState(data ? data.length : 6);
  const resize = () => {
    if (window.innerWidth > 1419) {
      setNumberShow(data ? data.length : 6);
    }

    if (window.innerWidth < 1419) {
      setNumberShow(data ? data.length - 1 : 5);
    }
    if (window.innerWidth < 1330) {
      setNumberShow(data ? data.length - 2 : 4);
    }

    if (window.innerWidth < 1250) {
      setNumberShow(data ? data.length - 3 : 3);
    }
    if (window.innerWidth < 1155) {
      setNumberShow(data ? data.length - 4 : 2);
    }
    if (window.innerWidth < (data ? 900 : 830)) {
      setNumberShow(data ? data.length - 5 : 1);
    }
    if (window.innerWidth < 800) {
      setNumberShow(data ? data.length - 6 : 1);
    }
    if (window.innerWidth < 660) {
      setNumberShow(data ? data.length - 7 : 1);
    }
    if (window.innerWidth < 650) {
      setNumberShow(data ? data.length - 8 : 1);
    }
  };

  useEffect(() => {
    let href = window.location.href.split('/');
    localStorage.setItem('select', href[href.length - 1]);
    setSL(href[href.length - 1]);
    resize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      className="d-flex justify-content-center "
      style={{
        background: 'white',
        width: '100vw',
        fontSize: '12px',
        overflow: 'hidden',
      }}
    >
      {window.innerWidth > 625
        ? data
          ? data.slice(0, numberShow).map((i, index) => (
              <div className={`buttonReception`} key={index} href={i.link}>
                {' '}
                {i.name}
              </div>
            ))
          : ''
        : ''}

      {numberShow < (data ? data.length : undefined) ? (
        <dropdown.normal
          content={<img src={menu}></img>}
          className="menu-respon"
          contentDrop={
            <>
              {data
                ? data.slice(numberShow, data ? data.length : folder.length).map((i, index) => (
                    <a
                      className="buttonReception"
                      style={{
                        background: 'black',
                        padding: '20px',
                      }}
                      key={index}
                    >
                      {' '}
                      {i.icon} {i.name}
                    </a>
                  ))
                : ''}
            </>
          }
        ></dropdown.normal>
      ) : (
        ''
      )}
    </div>
  );
}
