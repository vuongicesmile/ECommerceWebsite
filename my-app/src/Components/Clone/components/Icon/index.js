import booker from './asset/booker.svg';
import stoketake from './asset/stoketake.svg';
import statistic from './asset/statistic.svg';
import idcard from './asset/idcard.svg';
import refund from './asset/refund.svg';
import info from './asset/info.svg';
import clock from './asset/clock.svg';
import edit from './asset/edit.svg';
import arrow from './asset/arrow.svg';
import scanpassport from './asset/scanpassport.svg';
import './index.less';
import alert from './asset/alert.svg';
import dropdow from './asset/dropdow.svg';
const icon = {
  clockAnimation: () => {
    return (
      <div className="clockHH">
        <div className="clockHH1"></div>
        <div className="clockHH2"></div>
        <div className="clockHH3"></div>
        <div className="clockHH4"></div>
      </div>
    );
  },
  dropdow: dropdow,
  alert: alert,
  arrow: arrow,
  booker: booker,
  stoketake: stoketake,
  statistic: statistic,
  edit: edit,
  clock: clock,
  idcard: idcard,
  info: info,
  refund: refund,
  scanpassport: scanpassport,
};

export { icon };
