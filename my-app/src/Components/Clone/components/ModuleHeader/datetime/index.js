import { label } from '@/components/Label';
import moment from 'moment';
import { useModel, getLocale } from 'umi';
import { useState, useEffect } from 'react';

const DateTime = () => {
  const [clock, setClock] = useState(moment().locale(getLocale()).format('h:mm A'));
  const { systemDate } = useModel('systemdate');
  const { formatDate } = useModel('defaultdata');

  useEffect(() => {
    const loop = setInterval(() => {
      setClock(moment().locale(getLocale()).format('h:mm A'));
    }, 1000);

    return function cleanup() {
      clearInterval(loop);
    };
  }, []);

  return (
    <div className="d-flex align-items-center me-4" style={{ gap: '10px' }}>
      <label.titlemd>{moment(systemDate).locale(getLocale()).format(formatDate)}</label.titlemd>
      <label.titlemd>{clock}</label.titlemd>
    </div>
  );
};

export default DateTime;
