import React, { useState, useEffect, useRef } from 'react';
import Setting from './asset/setting.svg';
import './FilterColumn.less';
import { input } from '@/components/Input';
import { createPortal } from 'react-dom';
import SortableList, { SortableItem } from 'react-easy-sort';
import { useModel } from 'umi';
function FilterColumn({
  column,
  onFilter,
  colunmfilter,
  id,
  value,
  className,
  showAll = false,
  onchange,
}) {
  const [filtercolumn, setFiltercolumn] = useState([]);
  const [data, setData] = useState(column);
  const refclick = useRef();
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [open, setOpen] = useState(false);
  const [positionY, setPositionY] = useState();
  const popup = useRef();
  const doneRef = useRef(false);
  const { updateSettingUser, settingUser } = useModel('systemuser');
  const onCLick = (e) => {
    if (popup.current && refclick.current) {
      if (!popup.current.contains(e.target) && !refclick.current.contains(e.target)) {
        setOpen(false);
      }
    }
  };
  let showfull = showAll;
  useEffect(() => {
    doneRef.current = false;
    setData(column);
  }, [id, onchange]);

  useEffect(() => {
    if (showfull) {
      setFiltercolumn([]);
    } else {
      if (settingUser && doneRef.current == false) {
        // if (!settingUser.find((x) => x.id === id)) {
        //   setFiltercolumn([]);
        // } else
        if (
          !settingUser.find(
            (x) =>
              x.id === id ||
              (settingUser.find((x) => x.id === id)?.value.split('+')[1] &&
                column.length !=
                  settingUser
                    .find((x) => x.id === id)
                    ?.value.split('+')[1]
                    .split(',').length),
          ) ||
          (settingUser.find((x) => x.id === id)?.value.split('+').length > 1 &&
            settingUser
              .find((x) => x.id === id)
              ?.value.split('+')[1]
              ?.split(',')
              .filter((i) => i == settingUser.find((x) => x.id === id)?.value.split(',')[1])
              .length > 1)
          //      ||
          // settingUser
          //   .find((x) => x.id === id)
          //   ?.value?.split(',')
          //   .filter((i) => i == settingUser.find((x) => x.id === id)?.value.split(',')[1]).length >
          //   1
        ) {
          let string = '';
          column.map((i) => (string == '' ? (string += '+' + i.key) : (string += ',' + i.key)));
          setFiltercolumn(column);

          updateSettingUser(id, `${string}`);
        } else {
          if (
            settingUser.find((x) => x.id === id) &&
            settingUser.find((x) => x.id === id).value.split('+')
          ) {
            let userValue = settingUser.find((x) => x.id === id);
            let columns = [];
            if (userValue.value.split('+') && userValue.value.split('+')[0] != '') {
              let arr = [];
              userValue.value
                .split('+')[0]
                .split(',')
                .map((i) => {
                  arr.push(column.find((j) => j.key == i));
                });
              let arr2 = [];
              arr.map((i, index) => {
                i ? (i.key != arr[index - 1] ? arr2.push(i) : undefined) : undefined;
              });
              setData(arr2);
            }
            column.map((i) => {
              if (userValue.value.split('+') && userValue.value.split('+')[1]) {
                userValue.value
                  .split('+')[1]
                  .split(',')
                  .map((j) => {
                    if (j == i.key && j != '' && !columns.find((o) => o.key == j)) {
                      columns.push(i);
                    }
                  });
              } else {
                userValue.value.split(',').map((j) => {
                  j == i.key && j != '' ? columns.push(i) : undefined;
                });
              }
              setFiltercolumn(columns);
            });
          }
          // else {
          //   let columns = [];
          //   column.map((i) => {
          //     columns.push(i);
          //   });
          //   setFiltercolumn(columns);
          // }
        }

        doneRef.current = true;
      }
    }
  }, [settingUser, id]);

  useEffect(() => {
    if (!showfull) {
      let columns = [];
      let arr = '';
      filtercolumn
        ? filtercolumn.map((y) => {
            arr = `${arr},${y.key}`;
          })
        : undefined;
      if (settingUser.find((x) => x.id === id)) {
        let userValue = settingUser.find((x) => x.id === id).value;
        let arr1 = userValue.split('+')[0];
        if (userValue.split('+')) {
          arr != '' ? updateSettingUser(id, `${arr1}+${arr}`) : '';
        } else {
          arr != '' ? updateSettingUser(id, `+${arr}`) : '';
        }
      } else {
        data
          ? data.map((y) => {
              arr = `${arr},${y.key}`;
            })
          : undefined;

        updateSettingUser(id, `+${arr}`);
      }

      column.map((i) => {
        arr.split(',').map((j) => {
          j == i.key ? columns.push(i) : '';
        });
      });

      onFilter ? onFilter({ id: id, columns: [...new Set(columns)] }) : '';
    } else {
      let columns = [];
      let arr = '';
      filtercolumn
        ? filtercolumn.map((y) => {
            arr = `${arr},${y.key}`;
          })
        : undefined;

      column.map((i) => {
        arr.split(',').map((j) => {
          j == i.key ? columns.push(i) : '';
        });
      });

      onFilter ? onFilter({ id: id, columns: columns }) : '';
    }
  }, [filtercolumn]);
  //////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    document.addEventListener('mousedown', onCLick);
    return () => document.removeEventListener('mousedown', onCLick);
  }, []);
  //////////////////////////////////////////////////////////////////////////////////////////
  const onSortEnd = (oldIndex, newIndex) => {
    let arr = [...data];
    let a1 = arr[oldIndex];
    let a2 = arr[newIndex];
    arr[oldIndex] = a2;
    arr[newIndex] = a1;
    setData(arr);
    let arr2 = '';
    arr.map((i) => (i ? (arr2 == '' ? (arr2 = i.key) : (arr2 = arr2 + ',' + i.key)) : undefined));
    if (settingUser && settingUser.find((x) => x.id === id)) {
      let userValue = settingUser.find((x) => x.id === id).value;
      let arr1 = userValue.split('+')[1];

      if (userValue.split('+')) {
        updateSettingUser(id, `${arr2}+${arr1}`);
      } else {
        updateSettingUser(id, `${arr2}+`);
      }
    } else {
      updateSettingUser(id, `${arr2}+`);
    }
  };
  useEffect(() => {
    let rect = popup.current?.getBoundingClientRect();

    setPosition({
      x: rect.left - refclick.current?.offsetWidth + 30,
      y: rect.bottom,
    });
    setTimeout(() => {
      if (refclick.current) {
        refclick.current.style.opacity = 1;
      }
    }, 100);
  }, [open]);

  return (
    <div
      onMouseLeave={() => {}}
      ref={popup}
      className={`${className} FilterColumn-component d-flex align-items-center`}
      style={{ cursor: 'pointer' }}
    >
      <div
        onClick={(event) => {
          {
            setOpen(!open);
            localStorage.setItem('idUser', id);
            setPositionY(event.clientY);
          }
        }}
      >
        <img className={open ? 'animation' : undefined} src={Setting}></img>
      </div>
      {open
        ? createPortal(
            <div
              ref={refclick}
              style={{
                opacity: '0',
                position: 'absolute',
                transform: `translate(${position.x}px,${position.y}px)`,
              }}
              className={`${positionY < 550 ? 'position' : 'position2'} dropdow-column`}
            >
              {showfull ? (
                column ? (
                  data.map((i, index) =>
                    i ? (
                      <div key={index} className={` filter-column-i`}>
                        <input.checkbox
                          checked={filtercolumn.filter((a) => a.key == i.key) != 0 ? true : false}
                          onChange={(event) => {
                            event.target.checked == true
                              ? setFiltercolumn([...filtercolumn, i])
                              : setFiltercolumn(filtercolumn.filter((a) => a.key != i.key));
                          }}
                          id={i.key}
                        ></input.checkbox>
                        <label htmlFor={i.key}>{i.title || i.label}</label>
                      </div>
                    ) : undefined,
                  )
                ) : (
                  ''
                )
              ) : (
                <SortableList onSortEnd={onSortEnd} draggedItemClassName="dragg">
                  {column
                    ? data.map((i, index) =>
                        i ? (
                          <SortableItem key={index}>
                            <div className={` filter-column-i`}>
                              <input.checkbox
                                checked={
                                  filtercolumn.filter((a) => a.key == i.key) != 0 ? true : false
                                }
                                onChange={(event) => {
                                  event.target.checked == true
                                    ? setFiltercolumn([...filtercolumn, i])
                                    : setFiltercolumn(filtercolumn.filter((a) => a.key != i.key));
                                }}
                                id={i.key}
                              ></input.checkbox>
                              <label htmlFor={i.key}>{i.title || i.label}</label>
                            </div>
                          </SortableItem>
                        ) : undefined,
                      )
                    : ''}
                </SortableList>
              )}
            </div>,
            document.getElementById('root'),
          )
        : undefined}
    </div>
  );
}

const Filter = (column, filtercolumn, settingUserG) => {
  let settingUser2 = [];
  if (settingUserG) {
    settingUser2 = settingUserG;
  } else {
    var { updateSettingUser, settingUser } = useModel('systemuser');
    settingUser2 = settingUser;
  }

  if (filtercolumn.id) {
    let id = filtercolumn.id;

    if (settingUser2.length > 0 && settingUser2.find((x) => x.id === id)) {
      if (settingUser2.find((x) => x.id === id).value.split('+')[0] != '') {
        let index = [];
        settingUser2
          .find((x) => x.id === id)
          .value.split('+')[0]
          .split(',')
          .map((i) =>
            i
              ? index.push(filtercolumn.columns.find((j) => (j ? j.key == i : undefined)))
              : undefined,
          );
        if (index[0]) {
          filtercolumn.columns = index;
        }
      }
    }

    let abc = filtercolumn.columns.filter((x) =>
      Array.isArray(column.columns)
        ? column.columns.some((s) => (s && x ? s.key == x.key : undefined))
        : undefined,
    );
    let abc2 = [];
    abc.map((i, index) =>
      index != 0 ? (i.key != abc[index - 1].key ? abc2.push(i) : undefined) : abc2.push(i),
    );
    return abc2.filter((x) => column.columns.some((s) => (s && x ? s.key == x.key : undefined)))
      ? abc2.filter((x) => column.columns.some((s) => (s && x ? s.key == x.key : undefined)))
      : filtercolumn.columns;
  } else {
    let id = localStorage.getItem('idUser');
    if (settingUser2.find((x) => x.id === id)) {
      if (settingUser2.find((x) => x.id === id).value.split('+')[0] != '') {
        let index = [];
        settingUser2
          .find((x) => x.id === id)
          .value.split('+')[0]
          .split(',')
          .map((i) =>
            i ? index.push(filtercolumn.find((j) => (j ? j.key == i : undefined))) : undefined,
          );
        if (index[0]) {
          filtercolumn = index;
        }
      }
    }
    let abc = filtercolumn.filter((x) =>
      column.some
        ? column?.some((s) => (s && x ? s.key == x.key : undefined))
        : column.columns?.some((s) => (s && x ? s.key == x.key : undefined)),
    );
    let abc2 = [];
    abc.map((i, index) =>
      index != 0 ? (i.key != abc[index - 1].key ? abc2.push(i) : undefined) : abc2.push(i),
    );
    if (id)
      return abc2.filter((x) =>
        column.some
          ? column?.some((s) => (s && x ? s.key == x.key : undefined))
          : column.columns?.some((s) => (s && x ? s.key == x.key : undefined)),
      )
        ? abc2.filter((x) =>
            column.some
              ? column?.some((s) => (s && x ? s.key == x.key : undefined))
              : column.columns?.some((s) => (s && x ? s.key == x.key : undefined)),
          )
        : column;
  }
};

export { Filter, FilterColumn };
