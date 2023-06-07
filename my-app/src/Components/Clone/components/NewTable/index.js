import React, { useEffect, useState, useRef, useMemo } from 'react';
import './index.less';
import { label } from '@/components/Label';
import { buttonList } from '../Button';
import emtySVG from './emty.svg';
import { LoadingNoBG } from '../LoadingLogo';
import { render } from 'enzyme';
const Table = ({
  isMemo = true,
  edit = false,
  groupV3,
  groupName1,
  groupName2,
  rowStyle,
  rowRender,
  loading = false,
  rowDoubleclick,
  columns,
  data = [],
  autoGroup = false,
  dataIndexGroup,
  dataGroupV2,
  dataIndexGroupMulti,
  groupName,
  groupV4,
  rowClick,
  rowHover,
}) => {
  const [group, setGroup] = useState([]);
  const [group2, setGroup2] = useState([]);
  const [group3, setGroup3] = useState({});
  const [dataTable2, setData2] = useState([]);
  const data2 = useRef([]);
  const setgr = (arrFilter, index) => {
    let arr = [];
    arrFilter?.map((i) => {
      let item = {};
      if (!arr.find((b) => b.label == i[groupV4[index].dataIndex])) {
        let arrFilter2 = arrFilter?.filter(
          (a) => a[groupV4[index].dataIndex] == i[groupV4[index].dataIndex],
        );
        item.label = i[groupV4[index].dataIndex];
        item.dataIndex = groupV4[index].dataIndex;
        let index2 = index + 1;
        if (groupV4[index2]) {
          item.children = setgr(arrFilter2, index2);
        } else {
          let dieuKien = true;
          groupV4[index].dieuKien ? (dieuKien = groupV4[index].dieuKien(arrFilter2)) : undefined;
          item.children = dieuKien ? [...arrFilter2] : [];
        }
        arr.push(item);
      }
    });
    return [...arr];
  };
  const disableClick = (a, value, ischild = false) => {
    if (a.ref) {
      if (value == 'none') {
        a.ref.style.display = 'none';
      } else {
        a.ref.style.display = value;
      }
    }
    if (a.children) {
      a.children.map((i) => {
        if (value == 'none') {
          disableClick(i, value, false);
        } else {
          disableClick(i, a.ref2 || 'revert', true);
        }
      });
    }
  };
  const [count, setCount] = useState(0);
  const renderTable = (a, indexx, className, ref, index2 = 0) => {
    let arr = className ? className.split(' ') : [];
    let indexs = index2;
    arr.push(`child${a.dataIndex}${a.label}${indexx}`);
    let arr2 = [];
    return [
      a.children ? (
        <tbody ref={(el) => (a.ref = el)} key={indexx} className={className}>
          <tr>
            <td colSpan={columns.length}>
              <span
                style={{
                  paddingLeft: 10 * (indexs + 1) + 'px',
                  display: 'grid',
                  gridTemplateColumns: '20px auto',
                  gap: '10px',
                  alignItems: 'center',
                }}
              >
                {a.children.length > 0 ? (
                  <buttonList.tableOpen2
                    onClick={(e) => {
                      console.log(e);
                      a.ref2 = e;
                      a.children.map((i) => {
                        disableClick(i, e);
                      });
                    }}
                  ></buttonList.tableOpen2>
                ) : (
                  <div></div>
                )}
                <strong>
                  {groupV4[indexs]?.title
                    ? groupV4[indexs].title(
                        a.children.find((aa) => aa[a.dataIndex] == a.label),
                        data.find((aa) => aa[a.dataIndex] == a.label),
                      )
                    : a.label || 'Group Child: '}
                </strong>
              </span>
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody ref={(el) => (a.ref = el)} key={indexx} className={className}>
          <TR
            edit={edit}
            data={a}
            // className={`${classnamee.split(' ')[classnamee.split(' ').length - 1]} `}
            rowRender={rowRender}
            onDoubleClick={(e) => (rowDoubleclick ? rowDoubleclick(a, e) : undefined)}
            onMouseMove={(e) => {
              rowHover ? rowHover(a, e) : undefined;
            }}
            onClick={(e) => {
              rowClick ? rowClick(a, e) : undefined;
            }}
            key={indexx}
          >
            {columns.map((q, indexq) => (
              <TD
                style={{
                  paddingLeft: 10 * (indexs + 1) + 'px',
                }}
                isMemo={isMemo}
                dataIndex={q.dataIndex}
                edit={edit}
                data={a}
                columns={q}
                key={indexq}
              >
                {q.render ? q.render(a[q.dataIndex], a) : a[q.dataIndex]}
              </TD>
            ))}
          </TR>
        </tbody>
      ),
      a.children
        ? a.children.map((i) => {
            return renderTable(
              i,
              indexx + 1,
              className
                ? `${className} child${a.dataIndex}${a.label}${indexx}`
                : `child${a.dataIndex}${a.label}${indexx}`,
              arr2,
              indexs + 1,
            );
          })
        : undefined,
    ];
  };
  useEffect(() => {
    if (groupV4) {
      let arr = [];
      data.map((i) => {
        let index = 0;
        let arrFilter = [...data];
        let item = {};
        if (!arr.find((a) => a.label == i[groupV4[index].dataIndex])) {
          arrFilter = arrFilter.filter(
            (a) => a[groupV4[index].dataIndex] == i[groupV4[index].dataIndex],
          );
          item.label = i[groupV4[index].dataIndex];
          item.dataIndex = groupV4[index].dataIndex;
          let index2 = index + 1;

          if (groupV4[index2]) {
            item.children = setgr(arrFilter, index2);
          } else {
            item.children = [...arrFilter];
          }

          arr.push(item);
        }
      });
      setData2(arr);
      // let renderr = [];
      // arr?.map((a, index) => {
      //   if (a.children) {
      //     renderr.push(isrender(a, index));
      //   }
      // });
      // setData(renderr);
      // let arr = {};
      // groupV3.map((item) => {
      //   arr[item] = [];
      //   data.map((i) => {
      //     if (arr[item].length == 0 || arr[item].some((v) => v.value == i[item]) == false) {
      //       arr[item].push({
      //         value: i[item],
      //         dataIndex: item,
      //       });
      //     }
      //   });
      // });
      // setGroup3(arr);
    }
    if (groupV3) {
      let arr = {};
      groupV3.map((item) => {
        arr[item] = [];
        data.map((i) => {
          if (arr[item].length == 0 || arr[item].some((v) => v.value == i[item]) == false) {
            arr[item].push({
              value: i[item],
              dataIndex: item,
            });
          }
        });
      });
      setGroup3(arr);
    }
    if (dataGroupV2) {
      let arr = [];
      dataGroupV2.data.map((i) => {
        if (arr.length == 0 || arr.some((v) => v.value == i[dataGroupV2.dataIndex]) == false) {
          arr.push({
            value: i[dataGroupV2.dataIndex],
            dataIndex: dataGroupV2.dataIndex,
          });
        }
      });

      setGroup2(arr);
    }

    if (data && autoGroup) {
      let arr = [];
      if (dataIndexGroupMulti) {
        data.map((i) => {
          let joingroup = true;
          dataIndexGroupMulti.map((a) => {
            if (joingroup) {
              if (i[a] && i[a] != '') {
                joingroup = false;
                if (arr.length == 0 || arr.some((v) => v.value == i[a]) == false) {
                  arr.push({
                    value: i[a],
                    dataIndex: a,
                  });
                }
              }
            }
          });
        });
      } else {
        data.map((i) => {
          if (arr.length == 0 || arr.some((v) => v.value == i[dataIndexGroup]) == false) {
            arr.push({
              value: i[dataIndexGroup],
              dataIndex: dataIndexGroup,
            });
          }
        });
      }
      setGroup(arr);
    }
  }, [data]);

  return (
    <div className="divTable">
      <table className="tablecomponent">
        <thead>
          <tr>
            {columns
              ? columns.map((i, index) => (
                  <th style={i.styleHead} className={i.className ?? ''} key={index}>
                    {i.label}
                  </th>
                ))
              : undefined}
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td>
                <LoadingNoBG></LoadingNoBG>
              </td>
            </tr>
          </tbody>
        ) : undefined}

        {data?.length == 0 ? (
          <tbody style={{ height: 'inherit', pointerEvents: 'none' }}>
            <tr>
              <td style={{ border: 'none' }} colSpan={columns?.length}>
                <div className="nodata">
                  <img src={emtySVG}></img>
                  <div>No Data</div>
                </div>
              </td>
            </tr>
          </tbody>
        ) : undefined}

        {groupV4 ? (
          dataTable2.map((i, index) => {
            return renderTable(i, index);
          })
        ) : groupV3 ? (
          group3[groupV3[0]]?.map((i, index) => {
            return [
              <tbody key={index}>
                <tr>
                  <td colSpan={columns.length}>
                    <span
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '20px auto',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      {' '}
                      <buttonList.tableOpen2
                        reff2={`.${i.dataIndex}${i.value}${index}`}
                      ></buttonList.tableOpen2>
                      {groupName1
                        ? groupName1(data.filter((v) => v[i.dataIndex] == i.value)[0], i.value)
                        : i.value}
                    </span>
                  </td>
                </tr>
              </tbody>,
              group3[groupV3[1]]?.map((ii, index2) => {
                if (
                  data?.filter((a) => a[ii.dataIndex] == ii.value && a[i.dataIndex] == i.value)
                    .length > 0
                ) {
                  return (
                    <tbody className={`${i.dataIndex}${i.value}${index}`} key={index2}>
                      <tr>
                        <td colSpan={columns.length}>
                          <span
                            style={{
                              paddingLeft: '10px',
                              display: 'grid',
                              gridTemplateColumns: '20px auto',
                              gap: '10px',
                              alignItems: 'center',
                            }}
                          >
                            {' '}
                            <buttonList.tableOpen2
                              reff2={`.child${ii.dataIndex}${ii.value}${index}`}
                            ></buttonList.tableOpen2>
                            {groupName2
                              ? groupName2(
                                  data?.filter(
                                    (a) => a[ii.dataIndex] == ii.value && a[i.dataIndex] == i.value,
                                  )[0],
                                )
                              : ii.value || 'Group'}
                          </span>
                        </td>
                      </tr>

                      {data
                        ?.filter((a) => a[ii.dataIndex] == ii.value && a[i.dataIndex] == i.value)
                        .map((o, indexo) => (
                          <TR
                            className={`child${ii.dataIndex}${ii.value}${index}`}
                            rowRender={rowRender}
                            data={o}
                            onDoubleClick={(e) =>
                              rowDoubleclick ? rowDoubleclick(o, e) : undefined
                            }
                            onMouseMove={(e) => {
                              rowHover ? rowHover(o, e) : undefined;
                            }}
                            onClick={() => {
                              rowClick ? rowClick(o) : undefined;
                            }}
                            key={indexo}
                          >
                            {columns.map((q, indexq) => (
                              <TD
                                isMemo={isMemo}
                                edit={edit}
                                data={o}
                                dataIndex={q.dataIndex}
                                columns={q}
                                key={indexq}
                                rowIndex={`${indexo}${ii.value}`}
                              >
                                {q.render
                                  ? q.render(o[q.dataIndex], o, o.index, indexq, indexo)
                                  : o[q.dataIndex]}
                              </TD>
                            ))}
                          </TR>
                        ))}
                    </tbody>
                  );
                }
              }),
            ];
          })
        ) : dataGroupV2 ? (
          group2.map((i, index) => {
            if (
              dataGroupV2.data
                .filter((q) => q[i.dataIndex] == i.value)
                .some(
                  (ii) =>
                    data?.filter((a) => a[dataGroupV2.dataIndex3] == ii[dataGroupV2.dataIndex2])
                      .length > 0,
                )
            ) {
              return [
                <tbody key={index}>
                  <tr>
                    <td colSpan={columns.length}>
                      <span
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '20px auto',
                          gap: '10px',
                          alignItems: 'center',
                        }}
                      >
                        {' '}
                        <buttonList.tableOpen2
                          reff2={`.${i.dataIndex}${i.value}${index}`}
                        ></buttonList.tableOpen2>
                        {groupName1
                          ? groupName1(dataGroupV2.data.filter((v) => v[i.dataIndex] == i.value)[0])
                          : i.value}
                      </span>
                    </td>
                  </tr>
                </tbody>,
                dataGroupV2.data
                  .filter((q) => q[i.dataIndex] == i.value)
                  .map((ii, indexx) => {
                    if (
                      data?.filter((a) => a[dataGroupV2.dataIndex3] == ii[dataGroupV2.dataIndex2])
                        .length > 0
                    ) {
                      return [
                        <tbody className={`${i.dataIndex}${i.value}${index}`} key={indexx}>
                          <tr>
                            <td colSpan={columns.length}>
                              <span
                                style={{
                                  paddingLeft: '10px',
                                  display: 'grid',
                                  gridTemplateColumns: '20px auto',
                                  gap: '10px',
                                  alignItems: 'center',
                                }}
                              >
                                {' '}
                                <buttonList.tableOpen2
                                  reff={`.child${i.dataIndex}${i.value}${index}`}
                                ></buttonList.tableOpen2>
                                {groupName2 ? groupName2(ii) : 'Group Child' + indexx}
                              </span>
                            </td>
                          </tr>
                        </tbody>,
                        <tbody
                          key={indexx + 1}
                          className={`child${i.dataIndex}${i.value}${index} ${i.dataIndex}${i.value}${index}`}
                        >
                          {data
                            ?.filter((a) => a[dataGroupV2.dataIndex3] == ii[dataGroupV2.dataIndex2])
                            .map((o, indexo) => (
                              <TR
                                rowRender={rowRender}
                                data={o}
                                onDoubleClick={(e) =>
                                  rowDoubleclick ? rowDoubleclick(o, e) : undefined
                                }
                                onMouseMove={(e) => {
                                  rowHover ? rowHover(o, e) : undefined;
                                }}
                                onClick={() => {
                                  rowClick ? rowClick(o) : undefined;
                                }}
                                key={indexo}
                              >
                                {columns.map((q, indexq) => (
                                  <TD
                                    isMemo={isMemo}
                                    dataIndex={q.dataIndex}
                                    data={o}
                                    columns={q}
                                    key={indexq}
                                    rowIndex={indexo}
                                  >
                                    {q.render
                                      ? q.render(o[q.dataIndex], o, o.index, indexq, indexo)
                                      : o[q.dataIndex]}
                                  </TD>
                                ))}
                              </TR>
                            ))}
                        </tbody>,
                      ];
                    }
                  }),
              ];
            }
          })
        ) : autoGroup ? (
          group.map((i, index) => {
            return [
              <tbody key={index}>
                <tr>
                  <td colSpan={columns.length}>
                    <span
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '20px auto',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      {' '}
                      <buttonList.tableOpen2
                        reff={`.${dataIndexGroup}${i.value}${index}`}
                      ></buttonList.tableOpen2>{' '}
                      {groupName
                        ? groupName(data.filter((a) => a[i.dataIndex] == i.value)[0])
                        : i.value}
                    </span>
                  </td>
                </tr>
              </tbody>,
              <tbody key={index + 1} className={`${dataIndexGroup}${i.value}${index}`}>
                {data
                  ?.filter((a) => a[i.dataIndex] == i.value)
                  .map((o, indexo) => (
                    <TR
                      rowRender={rowRender}
                      data={o}
                      onDoubleClick={(e) => (rowDoubleclick ? rowDoubleclick(o, e) : undefined)}
                      onMouseMove={(e) => {
                        rowHover ? rowHover(o, e) : undefined;
                      }}
                      onClick={() => {
                        rowClick ? rowClick(o) : undefined;
                      }}
                      key={indexo}
                    >
                      {columns.map((q, indexq) => (
                        <TD
                          isMemo={isMemo}
                          dataIndex={q.dataIndex}
                          data={o}
                          edit={edit}
                          columns={q}
                          key={indexq}
                          rowIndex={indexo}
                        >
                          {q.render
                            ? q.render(o[q.dataIndex], o, o.index, indexq, indexo)
                            : o[q.dataIndex]}
                        </TD>
                      ))}
                    </TR>
                  ))}
              </tbody>,
            ];
          })
        ) : (
          <tbody>
            {data?.map((o, indexo) => (
              <TR
                rowRender={rowRender}
                data={o}
                onDoubleClick={(e) => (rowDoubleclick ? rowDoubleclick(o, e) : undefined)}
                onMouseMove={(e) => {
                  rowHover ? rowHover(o, e) : undefined;
                }}
                onClick={() => {
                  rowClick ? rowClick(o) : undefined;
                }}
                key={indexo}
              >
                {columns.map((q, indexq) => (
                  <TD
                    isMemo={isMemo}
                    dataIndex={q.dataIndex}
                    edit={edit}
                    data={o}
                    columns={q}
                    key={indexq}
                    rowIndex={indexo}
                  >
                    {q.render ? q.render(o[q.dataIndex], o, o.index, indexq) : o[q.dataIndex]}
                  </TD>
                ))}
              </TR>
            ))}
          </tbody>
        )}
        <tbody style={{ height: 'inherit', pointerEvents: 'none' }}>
          <tr>
            <td style={{ border: 'none' }}></td>
          </tr>
        </tbody>
        {columns?.filter((i) => i.footer != null).length > 0 ? (
          <tfoot>
            <TR>
              {columns.map((i, index) => (
                <TD isMemo={false} edit={edit} key={index}>
                  {i.footer ? i.footer() : undefined}
                </TD>
              ))}
            </TR>
          </tfoot>
        ) : undefined}
      </table>
    </div>
  );
};
const TD = ({ isMemo, edit, children, data, columns, dataIndex, rowIndex }) => {
  const ref = useRef();
  useEffect(() => {
    if (ref.current && columns) {
      columns.background ? columns.background(ref.current, data) : undefined;
    }
  }, [data]);

  const cell = useMemo(() => {
    return (
      <td
        id={`${dataIndex}${rowIndex}`}
        onKeyUp={(e) => {
          var selectElement = ref.current.getElementsByClassName('component-select');
          if (
            ((e.key == 'ArrowDown' || e.key == 'ArrowUp') && !selectElement.length) ||
            e.key == 'ArrowRight' ||
            e.key == 'ArrowLeft'
            //   &&
            // e.target.value == ''
          ) {
            let elementIndex, trIndex, tdIndex;
            let elements = document.getElementsByClassName('Status00');
            elements.forEach((element, eleIndex) => {
              element.children.forEach((tr, trInd) => {
                tr.children.forEach((td, tdInd) => {
                  if (td.isEqualNode(ref.current)) {
                    elementIndex = eleIndex;
                    trIndex = trInd;
                    tdIndex = tdInd;
                  }
                });
              });
            });

            if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
              if (e.key == 'ArrowUp' && trIndex == '1') {
                elementIndex--;
                trIndex = elements[elementIndex]?.children.length - 1;
              } else if (
                e.key == 'ArrowDown' &&
                trIndex == elements[elementIndex]?.children.length - 1
              ) {
                elementIndex++;
                trIndex = 1;
              } else if (e.key == 'ArrowUp') {
                trIndex--;
              } else {
                trIndex++;
              }
            }
            var focusElement =
              elements[elementIndex]?.children[trIndex].children[
                e.key == 'ArrowRight' || e.key == 'ArrowLeft'
                  ? e.key == 'ArrowRight'
                    ? tdIndex + 1
                    : tdIndex - 1
                  : tdIndex
              ].querySelectorAll('[tabindex]');
            if (!focusElement || !focusElement.length) {
              focusElement =
                elements[elementIndex]?.children[trIndex].children[
                  e.key == 'ArrowRight' || e.key == 'ArrowLeft'
                    ? e.key == 'ArrowRight'
                      ? tdIndex + 1
                      : tdIndex - 1
                    : tdIndex
                ].getElementsByTagName('input');
            }
            if (!focusElement || !focusElement.length) {
              focusElement =
                elements[elementIndex]?.children[trIndex].children[
                  e.key == 'ArrowRight' || e.key == 'ArrowLeft'
                    ? e.key == 'ArrowRight'
                      ? tdIndex + 1
                      : tdIndex - 1
                    : tdIndex
                ].getElementsByTagName('textarea');
            }
            if (focusElement && focusElement[0]) focusElement[0].focus();
          }
        }}
        ref={ref}
        style={{
          ...columns?.style,
          whiteSpace: 'break-spaces',
          overflow: 'auto',
          wordBreak: 'break-word',
        }}
      >
        {children}
      </td>
    );
  }, [dataIndex ? data[dataIndex] : data, edit]);
  return isMemo ? (
    cell
  ) : (
    <td
      ref={ref}
      style={{
        ...columns?.style,
        whiteSpace: 'break-spaces',
        overflow: 'auto',
        wordBreak: 'break-word',
      }}
    >
      {children}
    </td>
  );
};
const TR = ({ className, children, onDoubleClick, onMouseMove, onClick, rowRender, data }) => {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      rowRender && data ? rowRender(ref.current, data) : undefined;
    }
  }, [data]);
  return (
    <tr
      className={className}
      ref={ref}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </tr>
  );
};

const componentRow = ({
  className,
  rowRender,
  data,
  onDoubleClick,
  onMouseMove,
  onClick,
  columns,
}) => {
  return (
    <TR
      className={className}
      rowRender={rowRender}
      data={data}
      onDoubleClick={(e) => (onDoubleClick ? onDoubleClick(o, e) : undefined)}
      onMouseMove={(e) => {
        onMouseMove ? onMouseMove(o, e) : undefined;
      }}
      onClick={() => {
        onClick ? onClick(o) : undefined;
      }}
    >
      {columns.map((q, indexq) => (
        <TD data={o} columns={q} key={indexq}>
          {q.render ? q.render(o[q.dataIndex], o, o.index, indexq, indexo) : o[q.dataIndex]}
        </TD>
      ))}
    </TR>
  );
};

export default Table;
