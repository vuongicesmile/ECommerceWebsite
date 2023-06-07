import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Popup';
import { Row, Col } from 'antd';
import { FormattedMessage, setLocale, history, useIntl, useModel } from 'umi';
import { select } from '@/components/Select';
import { input } from '@/components/Input';
import { URL_API, SetAPI } from '@/e2e/configSystem';
import './loginPopup.less';
import { useFetch } from '@/components/Fetch/useFetch';
import loading from './asset/loading.svg';
import { notification } from '@/components/Notification';
import Cookies from 'js-cookie';
import moment from 'moment';
import ReCAPTCHA from 'react-google-recaptcha';

export default function index({ visible, setModalLoginVisible }) {
  const { shift } = useModel('hoteldata');
  const { users } = useModel('userdata');
  const { branch } = useModel('defaultdata');
  const { updateSystemUser, setCurrentShift, upadetePermission } = useModel('systemuser');
  const re = useRef();
  const intl = useIntl();
  const [loadingUser, setLoadingUser] = useState(false);
  const [styleUser, setStyleUser] = useState('normal');
  const [stylePass, setStylePass] = useState('normal');
  const [err, setErr] = useState(false);
  const [check, setCheck] = useState(false);
  const [agency, setAgency] = useState(null);
  const [user, setUser] = useState({
    username: '',
    password: '',
    token: '',
  });
  const [showCaptcha, setShowCaptcha] = useState(false);
  const recaptchaRef = useRef();
  const [isDisabled, setIsDisable] = useState({ value: false });
  useEffect(() => {
    if (visible) {
      if (window.sessionStorage.getItem('currentAgency') && branch.length > 1) setCheck(true);
      re.current.focus();
    }
  }, [visible]);

  useEffect(() => {
    const currentAgency = window.sessionStorage.getItem('currentAgency');
    if (currentAgency) {
      setAgency(currentAgency);
    }
  }, []);

  const onLogin = (e) => {
    e.preventDefault();
    if (user.password == '') {
      document.querySelector(`.l-pass label`).style.color = '#A93838';
      setStylePass('err');
    } else {
      document.querySelector(`.l-pass label`).style.color = '#3e5c76';
      setStylePass('normal');
    }
    if (user.username == '') {
      document.querySelector(`.l-user label`).style.color = '#A93838';
      setStyleUser('err');
    } else {
      setStyleUser('normal');
      document.querySelector(`.l-user label`).style.color = '#3e5c76';
    }
    if (user.password == '' || user.username == '') {
      return;
    }
    if (isDisabled.value) {
      return;
    }
    isDisabled.value = true;

    // if (!Cookies.get('currentBranch') && branch.length > 0)
    //   Cookies.set('currentBranch', branch.find((item) => item.isMaster).maChiNhanh ?? null);

    setLoadingUser(!loadingUser);

    useFetch(
      '/api/User/getCurrentUser',
      'POST',
      'application/json',
      JSON.stringify({ ...user, agencyId: agency }),
      (result) => {
        if (result.success == '1') {
          const defaultloginSuccessMessage = intl.formatMessage({
            id: result.mess,
            defaultMessage: 'Login success!',
          });
          notification.success(defaultloginSuccessMessage);
          Cookies.set(
            'idabc',
            users.findIndex((i) => i.username == user.username),
            {
              expires: 1,
            },
          );
          // Cookies.set('branchList', JSON.stringify(result.listMaChiNhanh ?? null));
          Cookies.set(
            'userlogin',
            JSON.stringify({
              ...result.data,
              agencyList: result.listMaChiNhanh,
              currentAgency: agency ?? branch.find((item) => item.isMaster).maChiNhanh,
              expires: moment().add(1, 'days').format(),
            }),
            {
              expires: 1,
            },
          );
          if (!window.sessionStorage.getItem('currentAgency')) {
            window.sessionStorage.setItem(
              'currentAgency',
              branch.find((item) => item.isMaster).maChiNhanh,
            );
          }
          window.sessionStorage.setItem('role', result.data.role);
          window.sessionStorage.setItem('ssid', result.data.ssid);
          upadetePermission();
          updateSystemUser();
          const shiftFound = shift.find((item) => {
            const beginingTime = moment(item.beginTime, 'HH:mm');
            const endTime = moment(item.endTime, 'HH:mm');
            if (beginingTime.isBefore(endTime)) {
              return (
                moment().isBetween(beginingTime, endTime) ||
                moment().format('HH:mm') === beginingTime.format('HH:mm') ||
                moment().format('HH:mm') === endTime.format('HH:mm')
              );
            } else {
              return (
                moment().isBetween(beginingTime, moment('23:59', 'HH:mm')) ||
                moment().isBetween(moment('00:00', 'HH:mm'), endTime) ||
                moment().format('HH:mm') === beginingTime.format('HH:mm') ||
                moment().format('HH:mm') === endTime.format('HH:mm')
              );
            }
          });
          Cookies.set('currentshift', shiftFound.ca);
          setCurrentShift(shiftFound.ca);
          setTimeout(() => {
            setUser({
              username: '',
              password: '',
            });
            isDisabled.value = false;
            setLoadingUser(false);
            setModalLoginVisible();
          }, 500);
        } else if (result.success == '0') {
          const defaultloginErrorMessage = intl.formatMessage({
            id: result.mess,
            defaultMessage: 'Login fail!',
          });
          setErr(true);
          setLoadingUser(false);
          notification.error(defaultloginErrorMessage, 'error');
          isDisabled.value = false;
          if (result.mess === 'systemalert.login.confirm.recaptcha') {
            setShowCaptcha(true);
          }
          if (
            result.mess === 'systemalert.login.timeuporduplicate.recaptcha' ||
            result.mess === 'systemalert.login.validrecaptcha.wrongpassword'
          ) {
            recaptchaRef.current?.reset();
            setUser((prev) => ({ ...prev, token: '' }));
          }
        }
      },
      (error) => {
        console.log(error);
        setTimeout(() => {
          goto();
        }, 500);
      },
    );
  };
  return (
    <Modal visible={visible} isbutton={false}>
      <form onSubmit={onLogin}>
        <Row className="login-popup-container">
          <Col className="login-f" span={24}>
            <Col span={24} className="head">
              {intl.formatMessage({
                id: 'pages.login',
                default: 'not found',
              })}
            </Col>

            <Col span={24} className="l-user">
              <label>
                {intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  default: 'not found',
                })}
              </label>

              <input.large
                status={styleUser}
                blur={() => {
                  if (user.username != '') {
                    setStyleUser('normal');
                    document.querySelector(`.l-user label`).style.color = '#3e5c76';
                  }
                }}
                value={user.username}
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
                ref={re}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  default: 'not found',
                })}
              ></input.large>
            </Col>
            <Col span={24} className="l-pass">
              <label>
                {intl.formatMessage({
                  id: 'pages.login.password',
                  default: 'not found',
                })}
              </label>

              <input.pass
                status={stylePass}
                blur={() => {
                  if (user.password != '') {
                    setStylePass('normal');
                    document.querySelector(`.l-pass label`).style.color = '#3e5c76';
                  }
                }}
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  default: 'not found',
                })}
              ></input.pass>

              {err ? (
                <p style={{ fontSize: '16px', color: '#8F2020', marginBottom: '0' }}>
                  {intl.formatMessage({
                    id: 'pages.login.accountLogin.errorMessage',
                    default: 'not found',
                  })}
                </p>
              ) : (
                ''
              )}
            </Col>
            <Col span={24} className="l-select">
              <div className="d-flex align-items-center" style={{ gap: '5px' }}>
                <input
                  checked={check}
                  id="location"
                  onChange={() => {
                    setCheck(!check);
                  }}
                  type="checkbox"
                ></input>
                <label style={{ cursor: 'pointer' }} htmlFor="location">
                  Location
                </label>
              </div>
            </Col>
            {check && (
              <select.group
                allowClear={false}
                value={agency}
                size="large"
                className="select-login"
                placeholder="Select Location"
                onChange={(value) => {
                  setAgency(value);
                  window.sessionStorage.setItem(
                    'currentAgency',
                    value ?? branch.find((item) => item.isMaster).maChiNhanh,
                  );
                  SetAPI(branch.find((item) => item.maChiNhanh == value).api);
                }}
              >
                {branch.map((item) => {
                  return (
                    <select.option value={item.maChiNhanh} key={item.maChiNhanh}>
                      {item.tenChiNhanh}
                    </select.option>
                  );
                })}
              </select.group>
            )}
            {showCaptcha && (
              <Col span={24} className="re-captcha-login">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeV6T4lAAAAAKLVnCNnT4U6sVEb5pAe5j9KKtut"
                  onChange={(e) => {
                    console.log(e);
                    setUser((prev) => ({
                      ...prev,
                      token: e,
                    }));
                  }}
                ></ReCAPTCHA>
              </Col>
            )}
            <Col span={24} className="l-button d-flex justify-content-center">
              {loadingUser ? (
                <button style={{ background: '#0A8EE5' }}>
                  <img src={loading}></img>
                </button>
              ) : showCaptcha && !user.token ? (
                <div></div>
              ) : (
                <button onSubmit={onLogin} disabled={showCaptcha && !user.token}>
                  {intl.formatMessage({
                    id: 'pages.login.submit',
                    default: 'not found',
                  })}
                </button>
              )}
            </Col>
          </Col>
        </Row>
      </form>
    </Modal>
  );
}
