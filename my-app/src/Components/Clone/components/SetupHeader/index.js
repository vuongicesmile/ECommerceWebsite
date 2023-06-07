import { Steps } from 'antd';
import React from 'react';

import './setupHeader.less';

const { Step } = Steps;
const description = 'This is a description.';

const SetupHeader = ({ active = 0 }) => {
  return (
    <div className="setup-header">
      <Steps current={active}>
        <Step title="Hotel Info" description={description} />
        <Step title="Room Define" description={description} />
        <Step title="Hotel Service" description={description} />
        <Step title="Payment Method" description={description} />
        <Step title="User Define" description={description} />
      </Steps>
    </div>
  );
};

export default SetupHeader;
