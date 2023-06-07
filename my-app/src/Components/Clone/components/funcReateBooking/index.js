import React, { useState, useMemo, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { useFetch } from '@/components/Fetch/useFetch';
import { useIntl, useModel, history } from 'umi';
import { notification } from '@/components/Notification';
import moment from 'moment';

const createBooking = (
  roomDetails,
  intl,
  success,
  error,
  fastCheckin = false,
  bookingInfo = {},
  isSkipSameRoom = false,
) => {
  useFetch(
    '/api/Defines/GetConfig',
    'get',
    '',
    null,
    (config) => {
      useFetch(
        '/api/Defines/GetSystemTime',
        'GET',
        'application/json',
        null,
        (systemDate) => {
          if (roomDetails) {
            let arrivalDate = '';
            let departureDate = '';
            roomDetails.map((i) => {
              let a = moment(i.arrivalDate);
              let b = moment(i.checkoutDate);
              let c = moment(arrivalDate);
              let d = moment(departureDate);
              arrivalDate == ''
                ? (arrivalDate = a.format('YYYY-MM-DD'))
                : a.diff(c, 'days') < 0
                ? (arrivalDate = a.format('YYYY-MM-DD'))
                : (arrivalDate = c.format('YYYY-MM-DD'));
              departureDate == ''
                ? (departureDate = b.format('YYYY-MM-DD'))
                : b.diff(d, 'days') > 0
                ? (departureDate = b.format('YYYY-MM-DD'))
                : (departureDate = d.format('YYYY-MM-DD'));
            });
            let x = moment(arrivalDate).format('YYYY-MM-DD');
            let y = moment(departureDate).format('YYYY-MM-DD');
            let sodate = moment(y).diff(x, 'days');
            // console.log(moment(departureDate).diff(moment(arrivalDate, 'days')));
            let data = {
              ma: 0,
              walkIn: fastCheckin ? true : false,
              provide2: 1 + '',
              bookingName: 'Walkin Guest',
              arrivalDate: moment(arrivalDate).format('YYYY-MM-DD'),
              numOfDays: sodate,
              bookingStatus: config.find((i) => i.parameter == 'StatusBookingDefault').value,
              confirmDate: moment(systemDate).format('YYYY-MM-DD'),
              mau: '',
              bookingDate: moment(departureDate).format('YYYY-MM-DD'),
              travelAgency: config.find((i) => i.parameter == 'CompanyDefault').value,
              sourceCode: 2,
              paymentMethod: null,
              bookingCode: '',
              marketSegment: 2,
              ca: '2',
              salesPerson: null,
              fastCheckin: fastCheckin,
              isSkipSameRoom: isSkipSameRoom,
              ...bookingInfo,
            };
            let format = [];
            roomDetails.map((i) => {
              format.push({
                ...i,
                arrivalDate: moment(i.arrivalDate).format('YYYY-MM-DD'),
                departureDate: moment(i.departureDate).format('YYYY-MM-DD'),
              });
            });
            useFetch(
              `/api/Booking/CreateBooking`,
              'POST',
              'application/json',
              JSON.stringify({
                ...data,
                roomDetails: format,
              }),
              (res) => {
                if (res.success == 1) {
                  notification.success(
                    intl.formatMessage({ id: 'systemalert.reception.booking.add' }),
                  );
                  success(res.id);
                } else if (res.success == 0) {
                  notification.warning(intl.formatMessage({ id: res.mess }), res.mess);
                  error ? error() : undefined;
                }
              },
              (error) => console.log(error),
            );
          }
        },
        (error) => {
          console.log(error);
        },
      );
    },
    (err) => {
      console.log(err);
    },
  );
};

export { createBooking };
