import React, { useState, useRef, useEffect } from 'react';
import { Tabs } from 'antd';
import { useIntl, history } from 'umi';
import './manageReport.less';
import SalesByInvoiceReport from './saleByInvoiceReport';
import SalesByProductReport from './saleByIProductsReport';
import { mapByKey } from '@/e2e/extensionMethod';
import CashierShiftReport from './cashierShiftReport';
import ArrivalRoomList from './arrivalRoomListReport';
import DepartureRoomList from './departureRoomListReport';
import InHouseRoomList from './inHouseRoomListReport';
import BillDetailReport from './billDetailReport';
import TotalRevenue from './totalRevenue';
import BreakfastVoucherReport from './BreakfastVoucherReport';
import BreakfastGuestReport from './breakfastGuestReport';
import BillPaymentByRoomReport from './BillPaymentByRoomReport'
import TypeBillReport from './TypeBillReport'
import Listemployeeinoutgate from './listEmployeeInOutGateReport';

function ManageReport() {
  if (!history) return;
  const { query } = history.location;
  const intl = useIntl();
  const [activeKey, setActiveKey] = useState([]);
  const [panes, setPanes] = useState([]);

  // dat chieu cao cho tat ca report
  const fixedHeight = 100;
  const { TabPane } = Tabs;

  const onChange = (key) => {
    setActiveKey(key);
  };
  useEffect(() => {
    let customRP = document.getElementsByClassName('report-children');
    customRP[0].style.padding = '0';
    customRP[0].style.height = 'calc( 100vh - 44px)';
  }, []);
  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };
  const remove = (targetKey) => {
    const targetIndex = panes.findIndex((pane) => pane.key === targetKey);
    const newPanes = panes.filter((pane) => pane.key !== targetKey);

    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }

    setPanes(newPanes);

    newPanes.length > 0 && setActiveKey(newPanes.slice(-1)[0].key);

    const jsonPanes = JSON.stringify(mapByKey(newPanes, 'uniqueTitle'));
    localStorage.setItem('panesNamePOS', jsonPanes);
  };

  useEffect(() => {
    let i = 0;
    let newPanes = [];

    let panesName =
      JSON.parse(localStorage.getItem('panesNamePOS'))?.length > 0
        ? JSON.parse(localStorage.getItem('panesNamePOS'))
        : [];

    panesName.forEach((item, index) => {
      switch (item) {
        case 'SalesByInvoiceReport':
          newPanes.push({
            title: intl.formatMessage({
              id: 'pages.report.salesbyinvoice',
            }),
            uniqueTitle: item,
            content: <SalesByInvoiceReport fixedHeight={fixedHeight} />,
            key: `newTab${i}`,
          });
          i++;
          break;
        case 'SalesByProductReport':
          newPanes.push({
            title: intl.formatMessage({
              id: 'pages.report.salesbyproduct',
            }),
            uniqueTitle: item,
            content: <SalesByProductReport fixedHeight={fixedHeight} />,
            key: `newTab${i}`,
          });
          i++;
          break;
        case 'CashierShiftReport':
          newPanes.push({
            title: intl.formatMessage({
              id: 'pages.report.cashiershift',
            }),
            uniqueTitle: item,
            content: <CashierShiftReport fixedHeight={fixedHeight} />,
            key: `newTab${i}`,
          });
          i++;
          break;
        case 'ArrivalRoomListReport':
          newPanes.push({
            title: intl.formatMessage({
              id: 'pages.report.arrivalroomlist',
            }),
            uniqueTitle: item,
            content: <ArrivalRoomList fixedHeight={fixedHeight} />,
            key: `newTab${i}`,
          });
          i++;
          break;
        case 'DepartureRoomListReport':
          newPanes.push({
            title: intl.formatMessage({
              id: 'pages.report.departureroomlist',
            }),
            uniqueTitle: item,
            content: <DepartureRoomList fixedHeight={fixedHeight} />,
            key: `newTab${i}`,
          });
          i++;
          break;
        case 'InHouseRoomListReport':
          newPanes.push({
            title: intl.formatMessage({
              id: 'pages.report.inhouseroomlist',
            }),
            uniqueTitle: item,
            content: <InHouseRoomList fixedHeight={fixedHeight} />,
            key: `newTab${i}`,
          });
          i++;
          break;
        case 'BillDetailReport':
          newPanes.push({
            title: intl.formatMessage({
              id: 'pages.report.billdetail',
            }),
            uniqueTitle: item,
            content: <BillDetailReport fixedHeight={fixedHeight} />,
            key: `newTab${i}`,
          });
          i++;
          break;
        case 'TotalRevenueReport':
          newPanes.push({
            title: intl.formatMessage({
              id: 'pages.report.totalrevenue',
            }),
            uniqueTitle: item,
            content: <TotalRevenue fixedHeight={fixedHeight} />,
            key: `newTab${i}`,
          });
          i++;
          break;
        case 'breakfastvoucher':
          newPanes.push({
            title: intl.formatMessage({
              id: 'pages.report.breakfastvoucher',
            }),
            uniqueTitle: item,
            content: <BreakfastVoucherReport fixedHeight={fixedHeight} />,
            key: `newTab${i}`,
          });
          i++;
          break;
        case 'breakfastguestreport':
          newPanes.push({
            title: intl.formatMessage({
              id: 'pages.report.breakfastguestreport',
            }),
            uniqueTitle: item,
            content: <BreakfastGuestReport fixedHeight={fixedHeight} />,
            key: `newTab${i}`,
          });
          i++;
          break;

        case 'billpaymentbyroomreport':
          newPanes.push({
            title: intl.formatMessage({
              id: 'pages.report.billpaymentbyroomreport',
            }),
            uniqueTitle: item,
            content: <BillPaymentByRoomReport fixedHeight={fixedHeight} />,
            key: `newTab${i}`,
          });
          i++;
          break;
        case 'typebillreport':
          newPanes.push({
            title: intl.formatMessage({
              id: 'pages.report.typebillreport',
            }),
            uniqueTitle: item,
            content: <TypeBillReport fixedHeight={fixedHeight} />,
            key: `newTab${i}`,
          });
          i++;
          break;

        case 'listemployeeinoutgate':
          newPanes.push({
            title: intl.formatMessage({
              id: 'pages.report.listemployeeinoutgate',
            }),
            uniqueTitle: item,
            content: <Listemployeeinoutgate fixedHeight={fixedHeight} />,
            key: `newTab${i}`,
          });
          i++;
          break;
      }
    });

    switch (query.name) {

      case 'listemployeeinoutgate':
        newPanes.push({
          title: intl.formatMessage({
            id: 'pages.report.listemployeeinoutgate',
          }),
          uniqueTitle: query.name,
          content: <Listemployeeinoutgate fixedHeight={fixedHeight} />,
          key: `newTab${i}`,
        });
        i++;
        break;
      case 'SalesByInvoiceReport':
        newPanes.push({
          title: intl.formatMessage({
            id: 'pages.report.salesbyinvoice',
          }),
          uniqueTitle: query.name,
          content: <SalesByInvoiceReport fixedHeight={fixedHeight} />,
          key: `newTab${i}`,
        });
        i++;
        break;
      case 'SalesByProductReport':
        newPanes.push({
          title: intl.formatMessage({
            id: 'pages.report.salesbyproduct',
          }),
          uniqueTitle: query.name,
          content: <SalesByProductReport fixedHeight={fixedHeight} />,
          key: `newTab${i}`,
        });
        i++;
        break;
      case 'CashierShiftReport':
        newPanes.push({
          title: intl.formatMessage({
            id: 'pages.report.cashiershift',
          }),
          uniqueTitle: query.name,
          content: <CashierShiftReport fixedHeight={fixedHeight} />,
          key: `newTab${i}`,
        });
        i++;
        break;
      case 'ArrivalRoomListReport':
        newPanes.push({
          title: intl.formatMessage({
            id: 'pages.report.arrivalroomlist',
          }),
          uniqueTitle: query.name,
          content: <ArrivalRoomList fixedHeight={fixedHeight} />,
          key: `newTab${i}`,
        });
        i++;
        break;
      case 'DepartureRoomListReport':
        newPanes.push({
          title: intl.formatMessage({
            id: 'pages.report.departureroomlist',
          }),
          uniqueTitle: query.name,
          content: <DepartureRoomList fixedHeight={fixedHeight} />,
          key: `newTab${i}`,
        });
        i++;
        break;
      case 'InHouseRoomListReport':
        newPanes.push({
          title: intl.formatMessage({
            id: 'pages.report.inhouseroomlist',
          }),
          uniqueTitle: query.name,
          content: <InHouseRoomList fixedHeight={fixedHeight} />,
          key: `newTab${i}`,
        });
        i++;
        break;
      case 'BillDetailReport':
        newPanes.push({
          title: intl.formatMessage({
            id: 'pages.report.billdetail',
          }),
          uniqueTitle: query.name,
          content: <BillDetailReport fixedHeight={fixedHeight} />,
          key: `newTab${i}`,
        });
        i++;
        break;
      case 'TotalRevenueReport':
        newPanes.push({
          title: intl.formatMessage({
            id: 'pages.report.totalrevenue',
          }),
          uniqueTitle: query.name,
          content: <TotalRevenue fixedHeight={fixedHeight} />,
          key: `newTab${i}`,
        });
        i++;
        break;
      case 'breakfastvoucher':
        newPanes.push({
          title: intl.formatMessage({
            id: 'pages.report.breakfastvoucher',
          }),
          uniqueTitle: query.name,
          content: <BreakfastVoucherReport fixedHeight={fixedHeight} />,
          key: `newTab${i}`,
        });
        i++;
        break;
      case 'breakfastguestreport':
        newPanes.push({
          title: intl.formatMessage({
            id: 'pages.report.breakfastguestreport',
          }),
          uniqueTitle: query.name,
          content: <BreakfastGuestReport fixedHeight={fixedHeight} />,
          key: `newTab${i}`,
        });
        i++;
        break;

      case 'billpaymentbyroomreport':
        newPanes.push({
          title: intl.formatMessage({
            id: 'pages.report.billpaymentbyroomreport',
          }),
          uniqueTitle: query.name,
          content: <BillPaymentByRoomReport fixedHeight={fixedHeight} />,
          key: `newTab${i}`,
        });
        i++;
        break;
      case 'typebillreport':
        newPanes.push({
          title: intl.formatMessage({
            id: 'pages.report.typebillreport',
          }),
          uniqueTitle: query.name,
          content: <TypeBillReport fixedHeight={fixedHeight} />,
          key: `newTab${i}`,
        });
        i++;
        break;
    }
    // filter duplicates
    newPanes = newPanes.filter((v, i, a) => a.findIndex((v2) => v2.title === v.title) === i);
    const jsonPanes = JSON.stringify(mapByKey(newPanes, 'uniqueTitle'));
    localStorage.setItem('panesNamePOS', jsonPanes);

    setPanes(newPanes);
    let find = newPanes.find((x) => x.uniqueTitle == query.name);
    if (find) {
      setActiveKey(find.key);
    } else {
      newPanes.length > 0 && setActiveKey(newPanes.slice(-1)[0].key);
    }
  }, [query.name]);

  return (
    <div className="sales-revenue-container mt-1">
      <Tabs onChange={onChange} activeKey={activeKey} onEdit={onEdit} type="editable-card" hideAdd>
        {panes?.map((pane) => (
          <TabPane tab={pane.title} key={pane.key}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default ManageReport;
