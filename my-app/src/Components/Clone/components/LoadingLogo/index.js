import React, { useEffect } from 'react';
import './loading.less';
import logo from './asset/logoiconpms_mt.svg';
function LoadingLogo({ style }) {
  return (
    <div className="testmodule" style={style}>
      {/* <div className="loadingDemo">
        <path
          className="cls-1"
          d="M4.73,168.84c3.82-3.65,7.66-7.27,11.45-10.96,3.03-2.95,6.12-5.85,8.94-8.98,1.72-1.91,3.58-2.49,6.08-2.47,24.38,.08,48.75,.07,73.13,.03,14.64-.03,26.07-9.57,28.8-23.89,3.01-15.82-9.64-32.05-25.74-32.99-1.29-.08-2.59-.12-4.58-.21,2.72-2.74,5.02-5.05,7.31-7.36,3.63-3.64,7.3-7.23,10.86-10.93,1.32-1.37,2.42-1.68,4.3-.9,18.73,7.78,31.44,26.71,31.59,47.27,.21,29.01-22.86,52.3-51.88,52.31-32.42,.02-64.83,0-97.26-.01h-2.45c-.19-.3-.38-.6-.58-.9"
        />
        <path
          className="cls-4"
          d="M113.49,74.91c-5.11,5.04-9.67,9.6-14.32,14.06-.5,.47-1.53,.55-2.31,.55-13.09,.03-26.18,.04-39.27,0-4.59-.01-8.01-3.21-8.03-7.37-.02-4.23,3.29-7.39,7.95-7.4,17.81-.03,35.62-.02,53.43-.02,.56,0,1.12,.07,2.55,.18"
        />
        <path
          className="cls-1"
          d="M157.84,30.08c-.84,1-1.27,1.58-1.77,2.08-6.73,6.75-13.43,13.53-20.28,20.16-.92,.89-2.59,1.42-3.92,1.43-25.03,.09-50.07,.02-75.1,.1-13.37,.04-25.07,9.74-27.54,22.58-3.36,17.45,9.26,33.32,27.03,33.99,.87,.03,1.75,0,2.62,0l.52,.9c-2.46,2.27-4.98,4.5-7.38,6.84-3.92,3.82-7.8,7.67-11.6,11.61-.99,1.02-1.8,1.12-3.02,.56-19.72-8.91-31.2-24-32.24-45.7-1.06-22.28,9.27-38.63,28.81-49.12,6.97-3.75,14.59-5.4,22.51-5.41,33.07-.02,66.51-1.13,99.21-.02h2.12"
        />
        <path
          className="cls-4"
          d="M49.31,124.09c1.09-.83,2.29-1.55,3.26-2.5,3.25-3.18,6.39-6.48,9.68-9.63,.69-.66,1.82-1.2,2.75-1.21,13.25-.08,26.49-.07,39.74-.06,3.37,0,6.04,1.87,7.1,4.82,1.03,2.86,.39,6.08-2.11,7.8-1.47,1.01-3.48,1.71-5.24,1.72-15.98,.13-31.96,.06-47.93,.06-2.19,0-4.39,0-6.58,0-.22-.34-.44-.67-.66-1.01"
        />
      </div> */}

      <div className="loadingDemo">
        <div className="loadingContainer">
          <div className="testmodule-item1">
            <img height={15} src={logo}></img>
          </div>
          <div className="testmodule-item2"></div>
          <div className="testmodule-item3"></div>
          <div className="testmodule-item4"></div>
        </div>
      </div>
      {/* <div className="loading22 ">
        <div className="d1 classnameAnimation2"></div>
        <div className="d1 classnameAnimation"></div>
        <div style={{ animationDelay: '0.1s' }} className="d1 classnameAnimation2"></div>
        <div style={{ animationDelay: '0.1s' }} className="d1 classnameAnimation "></div>
        <div style={{ animationDelay: '0.2s' }} className="d1 classnameAnimation2"></div>
        <div style={{ animationDelay: '0.2s' }} className="d1 classnameAnimation"></div>
        <div style={{ animationDelay: '0.1s' }} className="d1 classnameAnimation2"></div>
        <div style={{ animationDelay: '0.1s' }} className="d1 classnameAnimation"></div>
        <div style={{ animationDelay: '0.3s' }} className="d1 classnameAnimation2"></div>
        <div style={{ animationDelay: '0.3s' }} className="d1 classnameAnimation"></div>
      </div> */}
    </div>
  );
}
const LoadingButton = () => {
  return (
    <div className="content-loadingbutton ">
      <div
        style={{
          display: 'flex',

          justifyContent: 'center',
          alignItems: 'center',
          transform: 'scale(0.4)',
        }}
        className="scaleLoading"
      >
        <div className="dot0"></div>
        <div className="dot1"></div>
        <div className="dot2"></div>
        <div className="dot3"></div>
        <div className="dot4"></div>
      </div>
    </div>
  );
};
// const LoadingDemo = () => {
//   return (
//     <div className="lddemo">
//       <div className="dotstar"></div>
//       <div className="star"></div>
//     </div>
//   );
// };
const LoadingNoBGv2 = ({ style }) => {
  // let a=document.querySelectorAll('.d1');
  // for(let i=0;i<a.length;i++)
  // {
  //   setTimeout(() => {

  //     a[i].classList.add(i%2==0?'classnameAnimation2':'classnameAnimation')
  //   }, 100*i);

  // }

  return (
    <div className="testmodule" style={{ ...style }}>
      <div className="loadingDemo">
        <div className="loadingContainer">
          <div className="testmodule-item1">
            <img height={15} src={logo}></img>
          </div>
          <div className="testmodule-item2"></div>
          <div className="testmodule-item3"></div>
          <div className="testmodule-item4"></div>
        </div>
        {/* <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 817.09 221.61"
        >
          <path
            className="cls-1"
            d="M4.73,168.84c3.82-3.65,7.66-7.27,11.45-10.96,3.03-2.95,6.12-5.85,8.94-8.98,1.72-1.91,3.58-2.49,6.08-2.47,24.38,.08,48.75,.07,73.13,.03,14.64-.03,26.07-9.57,28.8-23.89,3.01-15.82-9.64-32.05-25.74-32.99-1.29-.08-2.59-.12-4.58-.21,2.72-2.74,5.02-5.05,7.31-7.36,3.63-3.64,7.3-7.23,10.86-10.93,1.32-1.37,2.42-1.68,4.3-.9,18.73,7.78,31.44,26.71,31.59,47.27,.21,29.01-22.86,52.3-51.88,52.31-32.42,.02-64.83,0-97.26-.01h-2.45c-.19-.3-.38-.6-.58-.9"
          />
          <path
            className="cls-4"
            d="M113.49,74.91c-5.11,5.04-9.67,9.6-14.32,14.06-.5,.47-1.53,.55-2.31,.55-13.09,.03-26.18,.04-39.27,0-4.59-.01-8.01-3.21-8.03-7.37-.02-4.23,3.29-7.39,7.95-7.4,17.81-.03,35.62-.02,53.43-.02,.56,0,1.12,.07,2.55,.18"
          />
          <path
            className="cls-1"
            d="M157.84,30.08c-.84,1-1.27,1.58-1.77,2.08-6.73,6.75-13.43,13.53-20.28,20.16-.92,.89-2.59,1.42-3.92,1.43-25.03,.09-50.07,.02-75.1,.1-13.37,.04-25.07,9.74-27.54,22.58-3.36,17.45,9.26,33.32,27.03,33.99,.87,.03,1.75,0,2.62,0l.52,.9c-2.46,2.27-4.98,4.5-7.38,6.84-3.92,3.82-7.8,7.67-11.6,11.61-.99,1.02-1.8,1.12-3.02,.56-19.72-8.91-31.2-24-32.24-45.7-1.06-22.28,9.27-38.63,28.81-49.12,6.97-3.75,14.59-5.4,22.51-5.41,33.07-.02,66.51-1.13,99.21-.02h2.12"
          />
          <path
            className="cls-4"
            d="M49.31,124.09c1.09-.83,2.29-1.55,3.26-2.5,3.25-3.18,6.39-6.48,9.68-9.63,.69-.66,1.82-1.2,2.75-1.21,13.25-.08,26.49-.07,39.74-.06,3.37,0,6.04,1.87,7.1,4.82,1.03,2.86,.39,6.08-2.11,7.8-1.47,1.01-3.48,1.71-5.24,1.72-15.98,.13-31.96,.06-47.93,.06-2.19,0-4.39,0-6.58,0-.22-.34-.44-.67-.66-1.01"
          />
        </svg> */}
      </div>
      {/* <div className="loading22 ">
        <div className="d1 classnameAnimation2"></div>
        <div className="d1 classnameAnimation"></div>
        <div style={{ animationDelay: '0.1s' }} className="d1 classnameAnimation2"></div>
        <div style={{ animationDelay: '0.1s' }} className="d1 classnameAnimation "></div>
        <div style={{ animationDelay: '0.2s' }} className="d1 classnameAnimation2"></div>
        <div style={{ animationDelay: '0.2s' }} className="d1 classnameAnimation"></div>
        <div style={{ animationDelay: '0.1s' }} className="d1 classnameAnimation2"></div>
        <div style={{ animationDelay: '0.1s' }} className="d1 classnameAnimation"></div>
        <div style={{ animationDelay: '0.3s' }} className="d1 classnameAnimation2"></div>
        <div style={{ animationDelay: '0.3s' }} className="d1 classnameAnimation"></div>
      </div> */}
    </div>
  );
};
const LoadingNoBGDemo = ({ style }) => {
  return (
    <div style={{ ...style }} className="testmodule">
      <div className="loadingDemo">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 817.09 221.61"
        >
          <path
            className="cls-1"
            d="M4.73,168.84c3.82-3.65,7.66-7.27,11.45-10.96,3.03-2.95,6.12-5.85,8.94-8.98,1.72-1.91,3.58-2.49,6.08-2.47,24.38,.08,48.75,.07,73.13,.03,14.64-.03,26.07-9.57,28.8-23.89,3.01-15.82-9.64-32.05-25.74-32.99-1.29-.08-2.59-.12-4.58-.21,2.72-2.74,5.02-5.05,7.31-7.36,3.63-3.64,7.3-7.23,10.86-10.93,1.32-1.37,2.42-1.68,4.3-.9,18.73,7.78,31.44,26.71,31.59,47.27,.21,29.01-22.86,52.3-51.88,52.31-32.42,.02-64.83,0-97.26-.01h-2.45c-.19-.3-.38-.6-.58-.9"
          />
          <path
            className="cls-4"
            d="M113.49,74.91c-5.11,5.04-9.67,9.6-14.32,14.06-.5,.47-1.53,.55-2.31,.55-13.09,.03-26.18,.04-39.27,0-4.59-.01-8.01-3.21-8.03-7.37-.02-4.23,3.29-7.39,7.95-7.4,17.81-.03,35.62-.02,53.43-.02,.56,0,1.12,.07,2.55,.18"
          />
          <path
            className="cls-1"
            d="M157.84,30.08c-.84,1-1.27,1.58-1.77,2.08-6.73,6.75-13.43,13.53-20.28,20.16-.92,.89-2.59,1.42-3.92,1.43-25.03,.09-50.07,.02-75.1,.1-13.37,.04-25.07,9.74-27.54,22.58-3.36,17.45,9.26,33.32,27.03,33.99,.87,.03,1.75,0,2.62,0l.52,.9c-2.46,2.27-4.98,4.5-7.38,6.84-3.92,3.82-7.8,7.67-11.6,11.61-.99,1.02-1.8,1.12-3.02,.56-19.72-8.91-31.2-24-32.24-45.7-1.06-22.28,9.27-38.63,28.81-49.12,6.97-3.75,14.59-5.4,22.51-5.41,33.07-.02,66.51-1.13,99.21-.02h2.12"
          />
          <path
            className="cls-4"
            d="M49.31,124.09c1.09-.83,2.29-1.55,3.26-2.5,3.25-3.18,6.39-6.48,9.68-9.63,.69-.66,1.82-1.2,2.75-1.21,13.25-.08,26.49-.07,39.74-.06,3.37,0,6.04,1.87,7.1,4.82,1.03,2.86,.39,6.08-2.11,7.8-1.47,1.01-3.48,1.71-5.24,1.72-15.98,.13-31.96,.06-47.93,.06-2.19,0-4.39,0-6.58,0-.22-.34-.44-.67-.66-1.01"
          />
        </svg>
      </div>
    </div>
  );
};
const LoadingNoBG = ({ style }) => {
  // let a=document.querySelectorAll('.d1');
  // for(let i=0;i<a.length;i++)
  // {
  //   setTimeout(() => {

  //     a[i].classList.add(i%2==0?'classnameAnimation2':'classnameAnimation')
  //   }, 100*i);

  // }

  return (
    <div className="content-loading22" style={{ ...style }}>
      {/* <div className="loadingDemo">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 817.09 221.61"
        >
          <path
            className="cls-1"
            d="M4.73,168.84c3.82-3.65,7.66-7.27,11.45-10.96,3.03-2.95,6.12-5.85,8.94-8.98,1.72-1.91,3.58-2.49,6.08-2.47,24.38,.08,48.75,.07,73.13,.03,14.64-.03,26.07-9.57,28.8-23.89,3.01-15.82-9.64-32.05-25.74-32.99-1.29-.08-2.59-.12-4.58-.21,2.72-2.74,5.02-5.05,7.31-7.36,3.63-3.64,7.3-7.23,10.86-10.93,1.32-1.37,2.42-1.68,4.3-.9,18.73,7.78,31.44,26.71,31.59,47.27,.21,29.01-22.86,52.3-51.88,52.31-32.42,.02-64.83,0-97.26-.01h-2.45c-.19-.3-.38-.6-.58-.9"
          />
          <path
            className="cls-4"
            d="M113.49,74.91c-5.11,5.04-9.67,9.6-14.32,14.06-.5,.47-1.53,.55-2.31,.55-13.09,.03-26.18,.04-39.27,0-4.59-.01-8.01-3.21-8.03-7.37-.02-4.23,3.29-7.39,7.95-7.4,17.81-.03,35.62-.02,53.43-.02,.56,0,1.12,.07,2.55,.18"
          />
          <path
            className="cls-1"
            d="M157.84,30.08c-.84,1-1.27,1.58-1.77,2.08-6.73,6.75-13.43,13.53-20.28,20.16-.92,.89-2.59,1.42-3.92,1.43-25.03,.09-50.07,.02-75.1,.1-13.37,.04-25.07,9.74-27.54,22.58-3.36,17.45,9.26,33.32,27.03,33.99,.87,.03,1.75,0,2.62,0l.52,.9c-2.46,2.27-4.98,4.5-7.38,6.84-3.92,3.82-7.8,7.67-11.6,11.61-.99,1.02-1.8,1.12-3.02,.56-19.72-8.91-31.2-24-32.24-45.7-1.06-22.28,9.27-38.63,28.81-49.12,6.97-3.75,14.59-5.4,22.51-5.41,33.07-.02,66.51-1.13,99.21-.02h2.12"
          />
          <path
            className="cls-4"
            d="M49.31,124.09c1.09-.83,2.29-1.55,3.26-2.5,3.25-3.18,6.39-6.48,9.68-9.63,.69-.66,1.82-1.2,2.75-1.21,13.25-.08,26.49-.07,39.74-.06,3.37,0,6.04,1.87,7.1,4.82,1.03,2.86,.39,6.08-2.11,7.8-1.47,1.01-3.48,1.71-5.24,1.72-15.98,.13-31.96,.06-47.93,.06-2.19,0-4.39,0-6.58,0-.22-.34-.44-.67-.66-1.01"
          />
        </svg>
      </div> */}
      <div style={{ ...style }} className="testmodule">
        <div className="loadingDemo">
          <div className="loadingContainer">
            <div className="testmodule-item1">
              <img height={15} src={logo}></img>
            </div>
            <div className="testmodule-item2"></div>
            <div className="testmodule-item3"></div>
            <div className="testmodule-item4"></div>
          </div>
        </div>
      </div>
      {/* <div className="loading22 ">
        <div className="d1 classnameAnimation2"></div>
        <div className="d1 classnameAnimation"></div>
        <div style={{ animationDelay: '0.1s' }} className="d1 classnameAnimation2"></div>
        <div style={{ animationDelay: '0.1s' }} className="d1 classnameAnimation "></div>
        <div style={{ animationDelay: '0.2s' }} className="d1 classnameAnimation2"></div>
        <div style={{ animationDelay: '0.2s' }} className="d1 classnameAnimation"></div>
        <div style={{ animationDelay: '0.1s' }} className="d1 classnameAnimation2"></div>
        <div style={{ animationDelay: '0.1s' }} className="d1 classnameAnimation"></div>
        <div style={{ animationDelay: '0.3s' }} className="d1 classnameAnimation2"></div>
        <div style={{ animationDelay: '0.3s' }} className="d1 classnameAnimation"></div>
      </div> */}
    </div>
  );
};
export { LoadingNoBG, LoadingButton, LoadingNoBGDemo };
export default LoadingLogo;
