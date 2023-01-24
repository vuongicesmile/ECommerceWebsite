import React from "react";
import { Typography } from "antd";

const AppFooter = () => {
  return <div className="app-footer"> 
  <Typography.Link href="#">Privancy Policy</Typography.Link>
  <Typography.Link href="#">Term & Conditons</Typography.Link>
  <Typography.Link href="#">Return Policy</Typography.Link>
  <Typography.Link href="#">+123456789</Typography.Link>
  </div>;
};

export default AppFooter;
