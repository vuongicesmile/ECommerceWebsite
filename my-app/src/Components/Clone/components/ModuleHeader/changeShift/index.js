import React, { useState, useEffect } from 'react';
import { useModel, useIntl } from 'umi';
import Modal from '@/components/Popup';
import { label } from '@/components/Label';
import { select } from '@/components/Select';
import Cookies from 'js-cookie';
import { notification } from '@/components/Notification';

const ChangeShift = ({ visible, setVisible }) => {
  const intl = useIntl();
  const { shift } = useModel('hoteldata');
  const { currentShift, setCurrentShift } = useModel('systemuser');
  const [changeShiftValue, setChangeShiftValue] = useState(Cookies.get('currentshift'));

  useEffect(() => {
    if (Cookies.get('currentshift')) {
      setChangeShiftValue(Cookies.get('currentshift'));
    } else {
      setChangeShiftValue(currentShift);
    }
  }, [currentShift]);

  return (
    <Modal
      onOK={() => {
        Cookies.set('currentshift', changeShiftValue);
        setCurrentShift(changeShiftValue);
        setVisible(false);
        notification.success(intl.formatMessage({ id: 'systemalert.changeshift.success' }));
      }}
      size="s"
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
      title={intl.formatMessage({
        id: 'pages.modules.changeshift',
        defaultMessage: 'Change shift',
      })}
    >
      <div className="d-flex align-items-center w-100 py-5 px-4">
        <div className="w-25">
          <label.titlemd>
            {intl.formatMessage({
              id: 'pages.modules.shift',
              defaultMessage: 'Shift',
            })}
          </label.titlemd>
        </div>
        <div className="w-75">
          <select.group
            value={changeShiftValue}
            onChange={(value) => {
              setChangeShiftValue(value);
            }}
            placeholder={intl.formatMessage({
              id: 'pages.modules.shift',
              defaultMessage: 'Shift',
            })}
          >
            {shift.map((item) => {
              return (
                <select.option key={item.ca} value={item.ca}>
                  {item.ca}
                </select.option>
              );
            })}
          </select.group>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeShift;
