import React, { useState } from 'react';
import './radio.less';
import { Radio } from 'antd';

function RadioComponent({ onChange, className, options, value }) {
  const [listData, setListData] = useState([
    {
      label: 'arpp',
      value: 'afpp',
    },
    {
      label: 'arpp',
      value: 'app',
    },
    {
      label: 'aprp',
      value: 'afpưp',
    },
    {
      label: 'appe',
      value: 'afppư',
    },
  ]);

  return (
    <Radio.Group
      className={className}
      onChange={onChange}
      options={options}
      value={value}
    ></Radio.Group>
  );
}

export default RadioComponent;
