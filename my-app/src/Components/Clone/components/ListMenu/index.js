import { useRef, useEffect, useState } from 'react';
import './index.less';
import down from './down.svg';
import { FormattedMessage, setLocale, history, useIntl, useModel } from 'umi';
const ListMenu = ({ item, edit }) => {
  const { permission } = useModel('systemuser');
  const ref = useRef([]);
  const ref2 = useRef();
  const menu = useRef();
  const [arr, setArr] = useState([]);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
  });
  const [newFilter, setNewFilter] = useState([]);
  useEffect(() => {
    if (permission) {
      setNewFilter(permission);
    }
  }, [permission]);

  const onMouseUp = () => {
    menu.current.style.display = 'flex';
  };

  const closeDrop = () => {
    menu.current.style.display = 'none';
  };
  const resize = () => {
    if (arr && ref.current && ref2.current) {
      let a = [...item];
      a.map((i) => {
        i.status = true;
      });
      setArr(a);
      for (let i = 0; i < ref.current.length; i++) {
        if (
          ref.current[i] &&
          (document.querySelector('body').offsetWidth -
            600 -
            ref.current[i].getBoundingClientRect().left <
            0 ||
            ref.current[i].getBoundingClientRect().left -
            ref2.current.getBoundingClientRect().left <
            0)
        ) {
          a[i] ? (a[i].status = false) : undefined;
          setArr(a);
        } else {
          a[i] ? (a[i].status = true) : undefined;
        }
      }
      a.filter((i) => i.status == false).length != 0 ? setVisible(true) : setVisible(false);
    }
  };
  const noneLink = useRef(false);
  useEffect(() => {
    if (Array.isArray(newFilter.data)) {
      newFilter.data?.filter((i) => i.isView == true).length == 0
        ? (noneLink.current = true)
        : (noneLink.current = false);
    }
  }, [newFilter]);
  useEffect(() => {
    setTimeout(() => {
      resize();
    }, 100);
    window.addEventListener('resize', function () {
      resize();
    });
    let arrr = [...item];

    arrr.map((i) => {
      onselect = false;
      i.status = true;
    });
    setArr(arrr);
    return window.removeEventListener('resize', function () {
      resize();
    });
  }, []);
  return (
    <div className={`ListMenu-container ${edit == 2 ? 'readonlyGroup' : ''}`}>
      <div ref={ref2} className="content">
        <div className="menu-parent">
          {noneLink.current && newFilter.role != 'Admin' ? (
            <>Please check permission!</>
          ) : (
            arr
              .filter((i) => i.status == true)
              .map((i, index) =>
                i.link && Array.isArray(newFilter.data) ? (
                  (i.link.includes('/setting') && newFilter.role == 'Admin') ||
                    (newFilter.data.find((j) => i.link.includes(j.path)) &&
                      newFilter.data.find((j) => i.link.includes(j.path))?.isView) ? (
                    <a
                      className="dropItem"
                      href={i.link}
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        color: 'white',
                        width: 'max-content',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      key={index}
                      ref={(el) => (ref.current[index] = el)}
                    >
                      {i.button}
                    </a>
                  ) : (
                    <></>
                  )
                ) : (
                  <span
                    className="dropItem drop1"
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      width: 'max-content',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onClick={i.onClick}
                    key={index}
                    ref={(el) => (ref.current[index] = el)}
                  >
                    {i.button}
                    {i.children ? <Dropgroup data={i.children} /> : undefined}
                  </span>
                ),
              )
          )}
        </div>
      </div>
      {visible ? (
        <div
          className="showMoreMenu"
          onMouseLeave={closeDrop}
          onClick={() => {
            onMouseUp();
          }}
        >
          More
          <div ref={menu} className="Menu-drop">
            {arr
              .filter((i) => i.status == false)
              .map((i, index) =>
                i.link ? (
                  <a className="dropItem" style={{ color: 'black' }} key={index} href={i.link}>
                    {i.button}
                  </a>
                ) : (
                  <span onClick={i.onClick} className="dropItem drop1" key={index}>
                    {i.button}
                    {i.children ? <Dropgroup2 data={i.children} /> : undefined}
                  </span>
                ),
              )}
          </div>
        </div>
      ) : undefined}
    </div>
  );
};

const Dropgroup = ({ data }) => {
  return (
    <div className="dropHover">
      {data.map((i, index) => (
        <span className="dropItem dropItemDrop " onClick={i.onClick} key={index}>
          {i.title}
          {i.children ? <Dropgroup3 data={i.children} /> : undefined}
          {i.children ? <img src={down}></img> : undefined}
        </span>
      ))}
    </div>
  );
};
const Dropgroup2 = ({ data }) => {
  return (
    <div className="dropHover2">
      {data.map((i, index) => (
        <span className="dropItem dropItemDrop" key={index} onClick={i.onClick}>
          {i.title}
          {i.children ? <Dropgroup3 data={i.children} /> : undefined}
          {i.children ? <img src={down}></img> : undefined}
        </span>
      ))}
    </div>
  );
};
const Dropgroup3 = ({ data }) => {
  return (
    <div className="dropHover3">
      {data.map((i, index) => (
        <span className="dropItem" onClick={i.onClick} key={index}>
          {i.title}
        </span>
      ))}
    </div>
  );
};

export { ListMenu };
