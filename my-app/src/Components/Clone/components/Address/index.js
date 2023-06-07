import React from 'react';
import { select } from '../Select';
import { useModel } from 'umi';

export const address = {
  province: ({ onChange, value, readOnly = false }) => {
    const { provinces } = useModel('defaultdata');

    return (
      <select.group
        readOnly={readOnly}
        value={value}
        onChange={(value) => (onChange ? onChange(value) : undefined)}
      >
        {provinces.map((i) => (
          <select.option key={i.id} value={i.id}>
            {i.name}
          </select.option>
        ))}
      </select.group>
    );
  },
  wards: ({ filter = '', onChange, value, readOnly = false }) => {
    const { wards } = useModel('defaultdata');

    return (
      <select.group
        readOnly={readOnly}
        value={value}
        onChange={(value) => (onChange ? onChange(value) : undefined)}
      >
        {wards
          .filter((i) => i.districtId == filter)
          .map((i) => (
            <select.option key={i.id} value={i.id}>
              {i.name}
            </select.option>
          ))}
      </select.group>
    );
  },
  districs: ({ filter = '', onChange, value, readOnly = false }) => {
    const { districs } = useModel('defaultdata');

    return (
      <select.group
        readOnly={readOnly}
        value={value}
        onChange={(value) => (onChange ? onChange(value) : undefined)}
      >
        {districs
          .filter((i) => i.provinceId == filter)
          .map((i) => (
            <select.option key={i.id} value={i.id}>
              {i.name}
            </select.option>
          ))}
      </select.group>
    );
  },
};
