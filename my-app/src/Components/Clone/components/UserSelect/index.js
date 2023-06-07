import { select } from '@/components/Select';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

const UserSelect = ({ value, onChange, optionWidth, readOnly }) => {
  const { users } = useModel('userdata');
  const [values, setValues] = useState();
  useEffect(() => {
    setValues(value);
  }, [value]);
  return (
    <select.group
      readOnly={readOnly}
      value={values}
      onChange={(value) => onChange && onChange(value)}
      optionWidth={optionWidth}
    >
      {users
        ? users
            // .filter((i) => i.department == 'MR' || i.department == 'FO')
            .map((i, index) => (
              <select.option key={index} value={i.username}>
                {i.fullname == '' ? i.fullname : i.username}
              </select.option>
            ))
        : undefined}
    </select.group>
  );
};

export { UserSelect };
