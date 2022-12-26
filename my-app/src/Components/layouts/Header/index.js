import React from "react";
import { Menu } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: <HomeFilled />,
      key: "home",
    },
    {
      label: "Men",
      key: "men",
      children: [
        {
          label: "Men's Shirts",
          key: "mens-shirts",
        },
        {
          label: "Women's Shirts",
          key: "womens-shirts",
        },
        {
          label: "Men's Watches",
          key: "mens-watches",
        },
      ],
    },
    {
      label: "Woman",
      key: "women",
    },
    {
      label: "Accessories",
      key: "accessories",
    },
  ];

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };

  return (
    <div className="app-header">
      <Menu onClick={onMenuClick} mode="horizontal" items={items} />
    </div>
  );
};

export default AppHeader;
