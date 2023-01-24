import React, { useEffect, useState } from "react";
import { Drawer, Menu, Typography, Badge, Table, InputNumber, Button, Form , Input, Checkbox, message } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";

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
      <div style={{ minWidth: "330px" }}>
        <Menu 
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal" 
        items={items} />
      </div>
      <Typography.Title>NQV Store</Typography.Title>
      <AppCart />
    </div>
  );
};

function AppCart() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/carts/1")
      .then((res) => res.json())
      .then((res) => {
        setCartItems(res.products);
      });
  }, []);

  const onConfirmOrder = (values) => {
    console.log(values);
    setCartDrawerOpen(false);
    setCheckoutDrawerOpen(false);
    message.success("Your order has been successfully")
  }

  

  return (
    <div>
      <Badge
        count={7}
        className="shoppingcarticon"
        onClick={() => {
          setCartDrawerOpen(true);
        }}
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer visible={checkoutDrawerOpen}
        onClose={() => {
          setCheckoutDrawerOpen(false)
        }}
        >

          <Form
          onFinish={onConfirmOrder}
          >
            <Form.Item label="Full Name" name="full_name">
              <Input placeholder="Enter your full name" />
            </Form.Item>
            <Form.Item label="Email Name" name="your_mail">
              <Input placeholder="Enter your full Email" />
            </Form.Item>
            <Form.Item label="Address Name" name="your_address">
              <Input placeholder="Enter your full address" />
            </Form.Item>
            <Form.Item>
              <Checkbox
              defaultChecked
              disabled
              > Cash on Delivery</Checkbox>
            </Form.Item>
            <Typography.Paragraph type="secondary">More Method cooming soon</Typography.Paragraph>
            <Button type="primary" htmlType="submit">Confirm Order </Button>
          </Form>

        </Drawer>
      <Drawer
        visible={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        title="Your Cart"
        contentWrapperStyle={{ width: 600 }}
      >
        <Table
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (val) => {
                return <span> ${val}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    min={0}
                    value={cartItems.find((item) => item.id == record.id).quantity}
                    onChange={(value) => {
                      setCartItems((pre) => pre.map((cart) => {
                          if (record.id === cart.id) {
                            cart.total = cart.price * value;
                            cart.quantity = value;
                          }
                          console.log(cart);
                          return cart;
                        })
                        
                      )
                      
                      
                    }}
                  />
                );
              },
            },
            {
              title: "Total",
              dataIndex: "total",
              render : (value) => {
                return <span>${value}</span>
              }
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total;
            }, 0);

            return <span> Total : {total} </span>;
          }
        
        }
        />
        <Button type="primary"
        onClick={() => {
          setCheckoutDrawerOpen(true)
        }}
        > Checkout Your Cart</Button>
      </Drawer>

      

    </div>
  );
}

export default AppHeader;
