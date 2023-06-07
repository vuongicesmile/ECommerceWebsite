import { DatePicker } from 'antd';
import { useMemo } from 'react';
import './daterange.less';

const DateRange = ({ disabledDate, disabled, onChange, format, value, placeholder, required }) => {
  const { RangePicker } = DatePicker;
  const abc = useMemo(() => {
    return (
      <RangePicker
        className={`${required && !disabled ? 'date-range-required' : ''}`}
        disabledDate={disabledDate}
        disabled={disabled}
        onChange={onChange}
        format={format}
        value={value}
        placeholder={placeholder}
      />
    );
  }, [value]);
  return abc;
};

export { DateRange };
