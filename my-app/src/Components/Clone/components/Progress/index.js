import './index.less';
import React, { useEffect, useRef } from 'react';
import { height } from 'devexpress-reporting/scopes/reporting-designer-bands-metadata';
export default function Progress() {
  const load = useRef();
  let numberPersen = 0;
  useEffect(() => {
    // setInterval(() => {
    //   load.current.style.width = numberPersen + '%';
    //   numberPersen++;
    // }, 100);
    // if (numberPersen == 100) {
    //   clearInterval(() => {
    //     load.current.style.width = numberPersen + '%';
    //     numberPersen++;
    //   });
    // }
  }, []);
  return (
    <div className="ProgressComponent">
      <div className="loadBar">
        <div ref={load} className="loadnumber"></div>
      </div>
    </div>
  );
}
