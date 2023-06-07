import React, { useState, useRef, useEffect } from 'react';
import './multiselect.less';
import { input } from '@/components/Input';
import searchicon from './search.svg';
import dropsvg from './dropdow.svg';
import Highlighter from 'react-highlight-words';
import { buttonList } from '@/components/Button';
const Multiselect = React.forwardRef(
  (
    {
      title = 'Select',
      render2,
      onChange,
      className,
      style,
      width,
      dataSource,
      dataIndex,
      render,
      value,
      img,
      dataIndex2,
    },
    ref = undefined,
  ) => {
    const [filtercolumn, setFiltercolumn] = useState([]);
    const popup = useRef();
    const [search, setSearch] = useState('');
    const [data, setData] = useState(dataSource);
    const [open, setOpen] = useState(false);
    const [ok, setOk] = useState(false);
    const [checkall, setCheckall] = useState(true);
    const [onFill, setonFill] = useState({
      fill: true,
    });
    const refCheck = useRef([]);
    const refok = useRef();
    const [store, setStore] = useState({
      store: '',
    });
    const [abc, setabc] = useState({
      arr: [],
    });
    const onCLick = (e) => {
      if (popup.current && refok && refok.current) {
        if (!popup.current.contains(e.target) || refok.current.contains(e.target)) {
          refok.current.contains(e.target) ? onCLick1() : onCLick2();

          setOpen(false);
        }
      }
      if (popup.current && ref && ref.current) {
        if (!popup.current.contains(e.target) || ref.current.contains(e.target)) {
          ref.current.contains(e.target) ? onCLick1() : onCLick2();
          if (!popup.current.contains(e.target)) setOpen(false);
        }
      }
    };
    const onok = useRef(false);
    useEffect(() => {
      if (onok.current == true) {
        onCLick1();
        onok.current = false;
      } else {
        onCLick2();
      }
    }, [open]);
    const onCLick1 = (e) => {
      onFill.fill = false;
      onSetData();
      setOk(true);
    };
    const clear = (e) => {
      setTimeout(() => {
        setOk(false);
      }, 100);
    };
    const onCLick2 = (e) => {
      let fildata = [];
      store.store
        ? data.map((i) => {
            store.store.split(',').map((j) => {
              i.ma == j ? fildata.push(i) : undefined;
            });
          })
        : '';
      setOk(false);
      setFiltercolumn(fildata);
    };
    useEffect(() => {
      document.addEventListener('mousedown', onCLick);
      return () => document.removeEventListener('mousedown', onCLick);
    }, []);
    const onSetData = () => {
      let arr = '';
      if (abc) {
        abc.arr.map((i) => {
          arr == '' ? (arr = `${i.ma}`) : (arr = `${arr},${i.ma}`);
        });
        onChange ? onChange(arr) : undefined;
      }
    };

    useEffect(() => {
      let arr = '';
      filtercolumn.map((i) => {
        arr == '' ? (arr = `${i.ma}`) : (arr = `${arr},${i.ma}`);
      });
      let number = 0;
      refCheck.current.map((i) => (i ? (i.checked ? number++ : undefined) : undefined));
      number == data.length ? setCheckall(true) : setCheckall(false);
      onFill.fill ? (abc.arr = filtercolumn) : undefined;
    }, [filtercolumn]);

    useEffect(() => {
      setOk(!ok);
    }, [value]);
    useEffect(() => {
      setData(dataSource);
    }, [dataSource]);
    useEffect(() => {
      let fildata = [];
      value
        ? data.map((i) => {
            value.split(',').map((j) => {
              i.ma == j ? fildata.push(i) : undefined;
            });
          })
        : '';

      return () => {
        setFiltercolumn(fildata);
      };
    }, [value, ok]);

    return (
      <div
        ref={popup}
        className={`${className} multiselect-component d-flex align-items-center`}
        style={{ ...style, background: 'white', cursor: 'pointer' }}
        onClick={() => {
          onFill.fill = true;
          // setOpen(true);

          store.store = value;
        }}
      >
        <div
          className="d-grid"
          style={{
            gridTemplateColumns: img ? 'auto 20px 3px' : 'auto 4px',
            gap: '5px',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div
            className="select-i"
            style={{ width: width }}
            onClick={() => {
              setOpen(!open);
            }}
          >
            {filtercolumn.length == 1
              ? dataIndex2 && filtercolumn[0][dataIndex2]
                ? filtercolumn[0][dataIndex2]
                : dataIndex
                ? filtercolumn[0][dataIndex]
                : filtercolumn[0].department
                ? filtercolumn[0].department
                : undefined
              : ` ${title}: ${filtercolumn.length}`}
          </div>
          <img
            onClick={() => {
              setOpen(!open);
            }}
            style={{ transform: `rotate(${open ? '180deg' : '0deg'})` }}
            src={dropsvg}
          ></img>
          {img ? (
            <img
              height={'18px'}
              src={img}
              onClick={() => {
                setOpen(!open);
              }}
            ></img>
          ) : (
            ''
          )}
        </div>
        {open ? (
          <div className="dropdow-columnComponent">
            <div className="d-flex flex-column" style={{ gap: '2%' }}>
              <input.medium
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                suffix={
                  <>
                    <img src={searchicon}></img>
                  </>
                }
              ></input.medium>
            </div>

            <div className="filter-column-i">
              <input.checkbox
                id="filterChex"
                className={`${!checkall ? 'checkboxall' : ''}`}
                checked={filtercolumn.length > 0 ? true : false}
                onChange={(e) => {
                  data.length != filtercolumn.length
                    ? setFiltercolumn(data)
                    : setFiltercolumn(filtercolumn.filter((i) => i.ma == ''));
                }}
              ></input.checkbox>
              <label htmlFor="filterChex">Check All</label>
            </div>
            <div className="scrollselect">
              {data &&
                data
                  .filter((i) =>
                    (i[dataIndex2 || dataIndex || 'department'] || '')
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                  )
                  .map((i, index) => (
                    <div className="filter-column-i" key={index}>
                      <input.checkbox
                        ref={(el) => (refCheck.current[index] = el)}
                        checked={filtercolumn.filter((a) => a.ma == i.ma) != 0 ? true : false}
                        onChange={(event) => {
                          event.target.checked == true
                            ? setFiltercolumn([...filtercolumn, i])
                            : setFiltercolumn(filtercolumn.filter((a) => a.ma != i.ma));
                        }}
                        id={i.ma}
                      ></input.checkbox>
                      <label htmlFor={i.ma}>
                        {render ? (
                          render(i, search)
                        ) : (
                          <Highlighter
                            highlightClassName="highlight-class"
                            searchWords={[search]}
                            autoEscape={true}
                            textToHighlight={
                              render2 || i[dataIndex2] || i[dataIndex] || i.department || ''
                            }
                          />
                        )}
                      </label>
                    </div>
                  ))}
              {/* i.department
                  ? (i.department || '').toLowerCase().includes(search.toLowerCase())
                  : i[dataIndex2]
                  ? (i[dataIndex2] || '').toLowerCase().includes(search.toLowerCase())
                  : (i[dataIndex] || '').toLowerCase().includes(search.toLowerCase()), */}
              {data.filter((i) =>
                (i[dataIndex2 || dataIndex || 'department'] || '')
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              ).length == 0 ? (
                <div className="filter-select-nodata">No data</div>
              ) : (
                ''
              )}
            </div>
            <div ref={ref ?? refok}>
              {' '}
              <buttonList.normal
                onClick={() => {
                  onok.current = true;
                  setOpen(false);
                }}
              ></buttonList.normal>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  },
);

export { Multiselect };
