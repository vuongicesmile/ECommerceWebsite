// import React, { useState, useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
// import Box from '@mui/material/Box';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import './index.less';
// import moment from 'moment';
// import { useIntl, useModel } from 'umi';
// import { log } from 'lodash-decorators/utils';

// const datePicker = {
//   datePicker: ({
//     defaultValue,
//     minDate,
//     placeholder,
//     onChange,
//     maxDate,
//     value,
//     disabled = false,
//   }) => {
//     const [date, setValue] = useState(defaultValue ? defaultValue : null);
//     const { formatDate } = useModel('defaultdata');
//     return (
//       <div className="datePicker-component">
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <DatePicker
//             minDate={minDate ? new Date(minDate) : undefined}
//             maxDate={maxDate ? new Date(maxDate) : undefined}
//             disabled={disabled}
//             inputFormat={formatDate}
//             label={placeholder}
//             value={value ? value : date}
//             defaultValue={defaultValue}
//             onChange={(newValue) => {
//               onChange ? onChange(newValue) : undefined;
//               setValue(newValue);
//             }}
//             renderInput={(params) => <TextField size="small" {...params} />}
//           />
//         </LocalizationProvider>
//       </div>
//     );
//   },
//   rangePicker: ({
//     minDate,
//     defaultValue,
//     placeholder,
//     onChange,
//     maxDate,
//     value,
//     disabled = false,
//   }) => {
//     const [date, setValue] = useState([null, null]);
//     const { formatDate } = useModel('defaultdata');
//     return (
//       <div className="datePicker-component">
//         {' '}
//         <LocalizationProvider
//           dateAdapter={AdapterDateFns}
//           localeText={placeholder ? placeholder : { start: 'Check-in', end: 'Check-out' }}
//         >
//           <DateRangePicker
//             sx={{
//               height: 30,
//               fontSize: 15,
//             }}
//             defaultValue={defaultValue}
//             minDate={minDate ? new Date(minDate) : undefined}
//             maxDate={maxDate ? new Date(maxDate) : undefined}
//             disabled={disabled}
//             inputFormat={formatDate}
//             value={value ? value : date}
//             onChange={(newValue) => {
//               onChange ? onChange(newValue) : undefined;
//               setValue(newValue);
//             }}
//             renderInput={(startProps, endProps) => (
//               <React.Fragment>
//                 <TextField className={'datepicker'} size="small" {...startProps} />
//                 <Box sx={{ mx: 2 }}> to </Box>
//                 <TextField size="small" {...endProps} />
//               </React.Fragment>
//             )}
//           />
//         </LocalizationProvider>
//       </div>
//     );
//   },
// };

// export { datePicker };
