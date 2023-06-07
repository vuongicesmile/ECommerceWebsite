import React, { useState, useEffect } from 'react';
import { useIntl, FormattedMessage, setLocale, getLocale, history, useModel } from 'umi';
import Cookies from 'js-cookie';
import ChangePass from '@/pages/login/changePass';
import Lang from '@/components/lang';
import './header.less';
import dropDown from './asset/drop.svg';

import House from './asset/Housekeeping';
import Reser from './asset/Reservation';
import Reception from './asset/Reception';
import SystemAdmin from './asset/SystemAdmin';
import EI from './asset/EI';
import bell from './asset/bell.svg';
import { ListMenu } from '../ListMenu';
import { icon } from '@/components/Icon';
import { datepicker } from '../DatepickerMui/datepickerV2';
import { input } from '@/components/Input';
import { label } from '../Label';
import userImg from './asset/user.svg';
import Logo, { logoComponent } from '@/pages/modules/logo';
import Popup from '@/components/Popup';
import { dropdown } from '@/components/Select';
import ChangeShift from './changeShift';
import DateTime from './datetime';
import { createPortal } from 'react-dom';
import { useFetch } from '../Fetch/useFetch';
import LoginPopup from '../LoginPopup';
import Modal from '@/components/Popup';
import moment from 'moment';
import { notification } from '../Notification';
import { LoadingNoBG } from '../LoadingLogo';
import { buttonList } from '../Button';

import { useClearCacheCtx } from 'react-clear-cache';
const UpdateVersion = ({ onClose }) => {
  const { config } = useModel('defaultdata');
  const intl = useIntl();
  const handleOkButton = () => {
    useFetch(
      '/api/Defines/CreateUpdateConfig',
      'POST',
      'application/json',
      JSON.stringify({
        ...config.find((i) => i.parameter == 'Version'),
        value: parseInt(config.find((i) => i.parameter == 'Version').value) + 1 + '',
      }),
      (res) => {
        if (res.success == 1) {
          notification.success(
            intl.formatMessage({
              id: res.mess,
            }),
          );
          onClose();
        } else if (res.success == 0) {
          notification.warning(
            intl.formatMessage({
              id: res.mess,
            }),
            res.mess,
          );
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };
  const [data] = useState({});

  return (
    <Modal
      thirdButtonTitle={'Update Version'}
      onThirdButtonClick={handleOkButton}
      thirdButton
      onOK={() => {
        useFetch(
          '/api/Defines/CreateNotification',
          'POST',
          'application/json',
          JSON.stringify(data),
          (res) => {
            if (res.success == '1') {
              notification.success(intl.formatMessage({ id: res.mess }));
              onClose();
            } else {
              notification.warning(intl.formatMessage({ id: res.mess }));
            }
          },
          (error) => {
            console.log(error);
          },
        );
      }}
      title={'Add Notificaiton'}
      visible={true}
      onClose={onClose}
    >
      <div className="modalVersion">
        <label.titlelg>{intl.formatMessage({ id: 'pages.modules.tenthongbao' })}</label.titlelg>
        <input.medium
          autoFocus
          onChange={(e) => {
            data.title = e.target.value;
          }}
        ></input.medium>
        <label.titlelg>{intl.formatMessage({ id: 'pages.modules.note' })}</label.titlelg>
        <input.comment
          onChange={(e) => {
            data.content = e.target.value;
          }}
        ></input.comment>
      </div>
    </Modal>
  );
};
const Logout = ({ onOk }) => {
  const [time, setTime] = useState(10);

  useEffect(() => {
    let counter = time;
    const interval = setInterval(() => {
      if (counter == 0) {
        clearInterval(interval);
        onOk();
      } else {
        setTime((time) => time - 1);
        counter--; // local variable that this closure will see
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Modal
      isVisibleCancel={false}
      groupButton={
        <>
          <buttonList.normal onClick={onOk} title={`Logout(${time})`}></buttonList.normal>
        </>
      }
      visible={true}
      title="Thông Báo"
    >
      <div style={{ padding: '10px' }}>Tài khoản đã được đăng nhập ở một nơi khác!</div>
    </Modal>
  );
};
const getSNN = (data, snn = {}) => {
  data.map((i) => {
    if (snn.id) {
      if (snn.id < i.id) {
        snn = i;
      }
    } else {
      snn = i;
    }
  });
  return snn;
};
const NotifiContent = ({ data, newVersion = false, className }) => {
  const { isLatestVersion, emptyCacheStorage } = useClearCacheCtx();
  const intl = useIntl();
  const { getNofiti } = useModel('defaultdata');
  const { updateVersion } = useModel('defaultdata');
  const Update = () => {
    if (newVersion) {
      localStorage.setItem('version', updateVersion.version);
      window.location.href = window.location.href;
      emptyCacheStorage();
      // var versionUpdate = new Date().getTime();
      // let allScript = document.querySelectorAll('script');
      // {
      //   for (let i = 0; i < allScript.length; i++) {
      //     var script = document.createElement('script');
      //     script.type = 'text/javascript';
      //     if (allScript[i]?.getAttribute('src')?.includes('umi.js')) {
      //       script.setAttribute('src', allScript[i].getAttribute('src') + '?v=' + versionUpdate);
      //       // allScript[i].setAttribute('src', allScript[i].getAttribute('src') + '?v=' + versionUpdate);
      //       script.src = allScript[i].getAttribute('src') + '?v=' + versionUpdate;
      //       document.body.appendChild(script);
      //     }
      //   }
      // }
    }
    let formdata = new FormData();
    formdata.append('id', data.id);
    useFetch(
      '/api/Defines/UpdateNotification',
      'POST',
      null,
      formdata,
      (res) => {
        if (res.success == 1) {
          getNofiti();
        } else if (res.success == 0) {
          notification.warning(intl.formatMessage({ id: res.mess }));
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };
  return (
    <div onClick={Update} className={'NotifiContent ' + className}>
      <div className="NotifiContent-header">
        <div
          style={{
            fontWeight: !(data.userSeen || '').includes(JSON.parse(Cookies.get('userlogin'))?.ssid)
              ? 'bold'
              : '',
          }}
        >
          #{data.title}
        </div>
        <span>{moment(data.time).format('DD/MM/YYYY HH:mm')}</span>
      </div>
      <div className="NotifiContent-body">
        <div
          style={{
            fontWeight: !(data.userSeen || '').includes(JSON.parse(Cookies.get('userlogin'))?.ssid)
              ? 'bold'
              : '',
          }}
        >
          {data.content}
        </div>
      </div>
    </div>
  );
};
const SapXep = (data, newData = []) => {
  let data2 = data;
  data.map((i) => {
    newData.push(getSNN(data2));
    data2 = data2.filter((j) => j.id != getSNN(data2).id);
  });

  return newData;
};
export default function Header({ data, hidden = false }) {
  const intl = useIntl();
  const [openLogout, setOpenLogout] = useState();
  const { receiveLoginUser, receiveNotifi } = useModel('receivesocket');
  const [isChangeShiftOpen, setIsChangeShiftOpen] = useState(false);
  const [allowChangeShift, setAllowChangeShift] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { currentShift } = useModel('systemuser');
  const { shift } = useModel('hoteldata');
  const { branch, updateVersion, updateUpdateVersion, config, notifi, setNotifi } =
    useModel('defaultdata');
  const user = Cookies.get('userlogin') ? JSON.parse(Cookies.get('userlogin')) : undefined;
  useEffect(() => {
    if (receiveNotifi) setNotifi([...notifi, { ...receiveNotifi.notification, userSeen: '' }]);
  }, [receiveNotifi]);
  const onChangePass = () => {
    setOpen({
      ...open,
      changepass: true,
    });
  };
  const close = () => {
    setOpen({
      ...open,
      changepass: false,
    });
  };

  const [sl, setSL] = useState();
  const logout = () => {
    Cookies.remove('userlogin');
    Cookies.remove('currentshift');
    Cookies.remove('idabc');
    // Cookies.remove('branchList');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('ssid');
    if (!history) return;

    history.push('/login');
  };

  useEffect(() => {
    if (Cookies.get('userlogin')) {
      let formdata = new FormData();
      formdata.append('loginToken', JSON.parse(Cookies.get('userlogin'))?.loginToken);
      useFetch('/api/User/GetCurrentLoginTokenByUser', 'POST', '', formdata, (e) => {
        if (!e) {
          setOpenLogout(true);
        }
      });
    }
  }, [receiveLoginUser]);

  const [open, setOpen] = useState({
    changepass: false,
  });
  const { systemUser } = useModel('systemuser');

  const [folder, setFolder] = useState(
    [
      config.find((item) => item.parameter == 'hotel_02')?.value == '0' && {
        id: 2,

        icon: <Reser />,
        button: intl.formatMessage({
          id: 'pages.modules.reservation',
          default: 'not found',
        }),
        link: '/reservation/roommap',
      },
      {
        admin: true,

        id: 1,
        icon: <Reception />,
        button: intl.formatMessage({
          id:
            config.find((item) => item.parameter == 'hotel_02')?.value == '0'
              ? 'pages.modules.reception'
              : 'pages.modules.reception02',
          default: 'not found',
        }),
        link: '/reception/roommap',
      },
      config.find((item) => item.parameter == 'hotel_02')?.value == '0' && {
        id: 3,
        icon: <House />,

        button: intl.formatMessage({
          id: 'pages.modules.housekeeping',
          default: 'not found',
        }),
        admin: true,
        link: '/housekeeping',
      },
      {
        admin: true,
        id: 4,

        link: '/modules',
        icon: <EI />,
        button: intl.formatMessage({
          id: 'pages.modules.manage',
          default: 'not found',
        }),
        link: '/manage',
      },
      {
        admin: true,
        id: 5,
        icon: <SystemAdmin />,
        link: '/setting',
        button: intl.formatMessage({
          id: 'pages.modules.setting',
          default: 'not found',
        }),
      },
    ].filter(Boolean),
  );
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

  function clearCacheData() {
    useFetch(
      '/api/Defines/GetVersion',
      'GET',
      'application/json',
      null,
      (res) => {
        if (localStorage.getItem('version')) {
          if (res != localStorage.getItem('version')) {
            updateUpdateVersion(true, res);

            setTimeout(() => {
              notification.warning('Đã có phiên bản mới!');
            }, 500);
          }
        } else {
          localStorage.setItem('version', res);
        }
      },
      (error) => {
        console.log(error);
      },
    );
    // setInterval(() => {
    //   useFetch(
    //     '/api/Defines/GetVersion',
    //     'GET',
    //     'application/json',
    //     null,
    //     (res) => {
    //       if (localStorage.getItem('version')) {
    //         if (res != localStorage.getItem('version')) {
    //           updateUpdateVersion(true, res);
    //           setTimeout(() => {
    //             notification.warning('Đã có phiên bản mới!');
    //           }, 500);
    //         }
    //       } else {
    //         localStorage.setItem('version', res);
    //       }
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //   );
    // }, 60000);
  }

  useEffect(() => {
    clearCacheData();
    let href = window.location.href.split('/');
    localStorage.setItem('select', href[href.length - 1]);
    setSL(href[href.length - 1]);
    resize();
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.keyCode == 38) {
        setOpenModal(true);
      }
    });
    return window.removeEventListener('keydown', (e) => {
      if (e.ctrlKey && e.keyCode == 38) {
        setOpenModal(true);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resize);
    useFetch(
      '/api/User/GetInfoUser',
      'GET',
      'application/json',
      null,
      (res) => {
        setAllowChangeShift(res[0].changeShift);
      },
      (err) => {
        console.log(err);
      },
    );
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);
  useEffect(() => {
    if (!loginPopupVisible && Cookies.get('userlogin')) {
      const currentUser = JSON.parse(Cookies.get('userlogin'));
      setTimeout(() => {
        Cookies.remove('userlogin');
        Cookies.remove('currentshift');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('ssid');
        setLoginPopupVisible(true);
      }, moment(currentUser.expires).diff(moment()));
    }
  }, [loginPopupVisible]);

  return (
    <div className="headerComponent">
      {/* <Modal visible={true}>
        <datepicker.rangePicker></datepicker.rangePicker>
      </Modal> */}
      {openLogout && <Logout onOk={logout} />}
      {openModal && <UpdateVersion onClose={() => setOpenModal(false)} />}
      {/* {createPortal(
        <div
          style={{ display: updateVersion.reload ? 'flex' : 'none' }}
          className="updateVersionButton"
        >
          <div>
            <img
              className="imgupdateVersionButton"
              onClick={() => {
                let a = document.querySelector('.updateVersionButton');
                let b = document.querySelector('.imgupdateVersionButton');
                if (a.style.transform == 'translateX(170px)') {
                  b.style.transform = 'rotate(-90deg)';
                  a.style.transform = 'translateX(0px)';
                } else {
                  b.style.transform = 'rotate(90deg)';
                  a.style.transform = 'translateX(170px)';
                }
              }}
              src={icon.arrow}
            />
          </div>
          <div
            className="buttonupdate"
            onClick={() => {
              localStorage.setItem('version', updateVersion.version);
              location.reload();
            }}
          >
            Update new Version!
          </div>
        </div>,
        document.getElementById('root'),
      )} */}
      <LoginPopup
        visible={loginPopupVisible}
        setModalLoginVisible={() => setLoginPopupVisible(false)}
      />
      <div className="logo">
        <logoComponent.header></logoComponent.header>
      </div>

      <div className="logo itemHead2">
        {hidden == false ? <ListMenu item={data ? data : folder}></ListMenu> : undefined}
      </div>

      <div className="logo itemHead3">
        {hidden == false && user && user.currentAgency && user.agencyList.length > 1 && (
          <dropdown.normal
            content={
              <div className="userID">
                <span className="username">
                  {
                    branch.find(
                      (item) => item.maChiNhanh == window.sessionStorage.getItem('currentAgency'),
                    )?.tenChiNhanh
                  }
                </span>
                <img
                  height="10%"
                  style={{
                    color: 'white',
                  }}
                  src={dropDown}
                ></img>
              </div>
            }
            contentDrop={
              <>
                {branch
                  .filter((i) => {
                    var branchList = user.agencyList;
                    if (branchList && branchList.some((childItem) => childItem == i.maChiNhanh)) {
                      return true;
                    }
                    return false;
                  })
                  .map((item) => {
                    return (
                      <div
                        onClick={() => {
                          let cookies = JSON.parse(Cookies.get('userlogin'));
                          window.sessionStorage.setItem('currentAgency', item.maChiNhanh);
                          const formData = new FormData();
                          formData.append('ssid', sessionStorage.getItem('ssid'));
                          formData.append('newBranch', item.maChiNhanh);
                          useFetch('/api/User/UpdateUserInfo', 'POST', null, formData, (res) => {
                            // Cookies.remove('userlogin');
                            Cookies.set('userlogin', JSON.stringify({ ...cookies, ...res }), {
                              expires: moment(cookies.expires).diff(moment()) / 86400000,
                            });
                            sessionStorage.setItem('role', res.role);
                            sessionStorage.setItem('ssid', res.ssid);
                            notification.success(
                              intl.formatMessage({ id: 'systemalert.changebranch.success' }),
                            );
                            window.location.href = window.location.href;
                            // location.reload();
                            // history.go();
                          });
                          // Cookies.remove('userlogin');
                          // Cookies.set(
                          //   'userlogin',
                          //   JSON.stringify({ ...cookies, currentAgency: item.maChiNhanh }),
                          //   {
                          //     expires: moment(cookies.expires).diff(moment()) / 86400000,
                          //   },
                          // );
                        }}
                        key={item.maChiNhanh}
                      >
                        {item.tenChiNhanh}
                      </div>
                    );
                  })}
              </>
            }
          ></dropdown.normal>
        )}
        <buttonList.Dropdown
          content={() => (
            <div className="bellNotifi">
              {notifi.length + (updateVersion.reload ? 1 : 0) == 0 && (
                <div className="bellNotifiHeader">Bạn không có thông báo mới</div>
              )}
              <div className="bellNotifiBody">
                {updateVersion.reload && (
                  <NotifiContent
                    newVersion
                    className={'newVersion'}
                    data={{
                      title: 'Update new version!',
                      content: 'Nhấn để update!',
                    }}
                  ></NotifiContent>
                )}
                {SapXep(notifi).map((i, index) => (
                  <NotifiContent key={index} data={i}></NotifiContent>
                ))}
              </div>
            </div>
          )}
        >
          <div className="notifi-button">
            {notifi.filter((i) => !i.userSeen?.includes(JSON.parse(Cookies.get('userlogin'))?.ssid))
              .length +
              (updateVersion.reload ? 1 : 0) >
              0 && (
              <div className="notifi-number">
                {notifi.filter(
                  (i) => !(i.userSeen || '').includes(JSON.parse(Cookies.get('userlogin'))?.ssid),
                ).length + (updateVersion.reload ? 1 : 0)}
              </div>
            )}
            <img height="19px" src={bell}></img>
          </div>
        </buttonList.Dropdown>
        <dropdown.normal
          hidden={hidden}
          content={
            <div className="userID">
              <img height="19px" src={userImg}></img>
              <span className="username">{systemUser.name}</span>
              <img
                height="10%"
                style={{
                  color: 'white',
                }}
                src={dropDown}
              ></img>
            </div>
          }
          contentDrop={
            <>
              {allowChangeShift && (
                <div
                  onClick={() => {
                    setIsChangeShiftOpen(true);
                  }}
                >
                  {intl.formatMessage({
                    id: 'pages.modules.changeshift',
                    defaultMessage: 'Change shift',
                  })}
                </div>
              )}
              <div onClick={onChangePass}>
                {intl.formatMessage({
                  id: 'pages.modules.changepass',
                  default: 'not found',
                })}
              </div>
              <div onClick={logout}>
                {intl.formatMessage({
                  id: 'pages.modules.logout',
                  default: 'not found',
                })}
              </div>
            </>
          }
        ></dropdown.normal>
        <div className="me-3">
          <label.titlemd>
            {intl.formatMessage({ id: 'pages.modules.shift' })}: {currentShift}
          </label.titlemd>
        </div>
        <DateTime />
        <Lang className="lang-module" />
      </div>
      {allowChangeShift && isChangeShiftOpen && (
        <ChangeShift visible={true} setVisible={setIsChangeShiftOpen} />
      )}
      <Popup state={false}></Popup>
      {open.changepass ? <ChangePass state={open} close={close} /> : ''}
    </div>
    // <Row className="Header-component" style={{ zIndex: '27' }}>
    //   {/* <Clock></Clock> */}
    //   <Col span={24} className="module-head-form   ">
    //     <Col className="module-head  " xxl={3} xl={2} lg={5} sm={5} xs={8}>
    //       <Logo className="module-logo "></Logo>
    //     </Col>

    //     <Col className="module-head modules-group">
    //       {window.innerWidth > 625
    //         ? data
    //           ? data.slice(0, numberShow).map((i, index) => (
    //               <div
    //                 className={`a1 cursor-pointer header-div ${
    //               sl == i.link.split('/')[i.link.split('/').length - 1] ? 'onSelect' : ''
    //             }`}
    //             key={index}
    //             href={i.link}
    //           >
    //             {' '}
    //             {i.icon} {i.button}
    //             <div className="dropheader">
    //               {i.children
    //                 ? i.children.map((j, index) => (
    //                     <div className="item-parent" key={index} onClick={j.onClick}>
    //                       {j.title}
    //                       {j.children ? (
    //                         <div className="dropheader4">
    //                           {j.children.map((p, index) => (
    //                             <div className="itemDrop" key={index} onClick={p.onClick}>
    //                               {p.title}
    //                             </div>
    //                           ))}
    //                         </div>
    //                       ) : undefined}
    //                     </div>
    //                   ))
    //                 : undefined}
    //             </div>
    //           </div>
    //         ))
    //       : folder.slice(0, numberShow).map((i, index) => (
    //           <a
    //             className={`a1 ${
    //               sl == i.link.split('/')[i.link.split('/').length - 1] ? 'onSelect' : ''
    //             }`}
    //             key={index}
    //             href={i.link}
    //           >
    //             {' '}
    //             {i.icon} {i.button}
    //             <div className="dropheader">
    //               {i.children
    //                 ? i.children.map((j, index) => <div key={index}>{j.title}ấ</div>)
    //                 : undefined}
    //             </div>
    //           </a>
    //         ))
    //     : ''}

    //   {numberShow < (data ? data.length : 6) ? (
    //     <dropdown.normal
    //       content={<img src={menu}></img>}
    //       className="menu-respon"
    //       contentDrop={
    //         <>
    //           {data
    //             ? data.slice(numberShow, data.length).map((i, index) => (
    //                 <div
    //                   className="drop-menu-item"
    //                   style={{
    //                     padding: '20px',
    //                   }}
    //                   key={index}
    //                   href={i.link}
    //                 >
    //                   {i.icon} {i.button}
    //                   {i.children ? (
    //                     <div className="dropheader3">
    //                       {i.children.map((j, index) => (
    //                         <div className="item-parent" key={index} onClick={j.onClick}>
    //                           {j.title}
    //                           {j.children ? (
    //                             <div className="dropheader4">
    //                               {j.children.map((p, index) => (
    //                                 <div className="itemDrop" key={index} onClick={j.onClick}>
    //                                   {p.title}
    //                                 </div>
    //                               ))}
    //                             </div>
    //                           ) : undefined}
    //                         </div>
    //                       ))}
    //                     </div>
    //                   ) : undefined}
    //                 </div>
    //               ))
    //             : folder.slice(numberShow, folder.length).map((i, index) => (
    //                 <a
    //                   className="drop-menu-item"
    //                   style={{
    //                     padding: '20px',
    //                   }}
    //                   key={index}
    //                   href={i.link}
    //                 >
    //                   {i.icon} {i.button}
    //                   {i.children ? (
    //                     <div className="dropheader3">
    //                       {i.children.map((j, index) => (
    //                         <div className="item-parent" key={index}>
    //                           {j.title}
    //                           {j.children ? (
    //                             <div className="dropheader4">
    //                               {j.children.map((p, index) => (
    //                                 <div className="itemDrop" key={index} onClick={j.onClick}>
    //                                   {p.title}
    //                                 </div>
    //                               ))}
    //                             </div>
    //                           ) : undefined}
    //                         </div>
    //                       ))}
    //                     </div>
    //                   ) : undefined}
    //                 </a>
    //               ))}
    //         </>
    //       }
    //     ></dropdown.normal>
    //   ) : (
    //     ''
    //   )}
    // </Col>

    // <Col className="module-head " style={{ position: 'absolute', right: '0' }}>
    //   <div>
    //     <img src={bell}></img>
    //   </div>
    //   <dropdown.normal
    //     content={
    //       <div className="userID">
    //         <img src={user}></img> {systemUser.name}
    //         <img src={dropDown}></img>
    //       </div>
    //     }
    //     contentDrop={
    //       <>
    //         {allowChangeShift && (
    //           <div
    //             onClick={() => {
    //               setIsChangeShiftOpen(true);
    //             }}
    //           >
    //             {intl.formatMessage({
    //               id: 'pages.modules.changeshift',
    //               defaultMessage: 'Change shift',
    //             })}
    //           </div>
    //         )}
    //         <div onClick={onChangePass}>
    //           {intl.formatMessage({
    //             id: 'pages.modules.changepass',
    //             default: 'not found',
    //           })}
    //         </div>
    //         <div onClick={logout}>
    //           {intl.formatMessage({
    //             id: 'pages.modules.logout',
    //             default: 'not found',
    //           })}
    //         </div>
    //       </>
    //         }
    //       ></dropdown.normal>
    //       <DateTime />
    //       <Lang className="lang-module" />
    //     </Col>
    //   </Col>
    //   {allowChangeShift && (
    //     <ChangeShift visible={isChangeShiftOpen} setVisible={setIsChangeShiftOpen} />
    //   )}
    //   <Popup state={false}></Popup>
    //   {open.changepass ? <ChangePass state={open} close={close} /> : ''}
    // </Row>
  );
}
