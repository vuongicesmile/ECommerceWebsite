import { Button, notification } from 'antd';
import React from 'react';
import { useIntl, useModel, history, location } from 'umi';

function getNotification(alert, id, data) {
  let placement = 'bottomRight';
  if (id) {
    return alert
      .filter((i) => i.bookingId == id.booking || (i.room && i.room.includes(id.room)))
      .map((i, index) => {
        notification.open({
          message: i.booking
            ? `Booking ${id.booking}`
            : id.room
            ? `Room: ${
                data && data.find((i) => i.ma == id.room)
                  ? data.find((i) => i.ma == id.room)?.room
                    ? data.find((i) => i.ma == id.room)?.room
                    : id.room
                  : id.room
              } - Booking: ${i.bookingId}`
            : `Room: ${
                data && data.find((j) => j.ma == i.room)
                  ? data.find((j) => j.ma == i.room)?.room
                    ? data.find((j) => j.ma == i.room)?.room
                    : i.room
                  : i.room
              } - Booking: ${i.bookingId}`,
          description: i.description,
          placement,
        });
      });
  }
}

export { getNotification };
