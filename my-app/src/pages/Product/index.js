import {
  List,
  Card,
  Image,
  Typography,
  Badge,
  Rate,
  Button,
  message,
  Spin,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory } from "./../../API/index";
import { useLocation } from "react-router-dom";
import CartFeaure from "../Cart/index";
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from "../Cart/cartSlice";

function Product() {
  const [item, setItem] = useState([]);
  const params = useLocation();
  const [loading, setLoading] = useState(false);
  const [cartRedux, setCartRedux] = useState(false);



  const [sortOrder, setSortOrder] = useState("az");




  useEffect(() => {
    if (params.pathname.split("/")[1] == "home") {
      setLoading(true);
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((json) => {
          setLoading(false);
          setItem(json.products);
        });
    } else if (params.pathname.split("/")[1] == "cart") {
      console.log('vo day');
      setCartRedux(true)
    }

    else {
      setLoading(true);
      fetch(
        `https://dummyjson.com/products/category/${params.pathname.split("/")[1]
        }`
      )
        .then((res) => res.json())
        .then((json) => {
          setItem(json.products);
          setLoading(false);
        });
    }
  }, [params]);

  const getSortedItems = () => {
    const sortedITems = [...item];
    sortedITems?.sort((a, b) => {
      if (sortOrder == "az") {
        return a.title > b.titile ? 1 : a.titile === b.title ? 0 : -1;
      } else if (sortOrder == "za") {
        return a.title < b.titile ? 1 : a.titile === b.title ? 0 : -1;
      } else if (sortOrder == "lowhigh") {
        return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
      } else if (sortOrder == "highlow") {
        return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
      }

    });
    return sortedITems;
  };

  if (loading) {
    return <Spin spinning />;
  }
  return (
    <>
      {cartRedux ? <CartFeaure /> :
        <div>
          <div>
            <Typography.Text> View Items Sorted By :</Typography.Text>
            <Select
              defaultValue={"az"}
              onChange={(value) => {
                setSortOrder(value);
              }}
              options={[
                {
                  label: "Aphabelically a-z",
                  value: "az",
                },
                {
                  label: "Aphabelically z-a",
                  value: "za",
                },
                {
                  label: "Price Low to Hight",
                  value: "lowhigh",
                },
                {
                  label: "Price Hight to Low a-z",
                  value: "highlow",
                },
              ]}
            ></Select>
          </div>

          <List
            grid={{ column: 3 }}
            dataSource={getSortedItems()}
            renderItem={(product, index) => {
              return (
                <Badge.Ribbon
                  text={product.price}
                  color="pink"
                  className="itemCardBadge"
                >
                  <Card
                    className="itemCard"
                    title={product.title}
                    key={index}
                    cover={
                      <Image
                        className="itemCardImage"
                        src={product.thumbnail}
                      ></Image>
                    }
                    actions={[
                      <Rate allowHalf value={product.rating}></Rate>,
                      <AddToCartButton item={product} />,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Typography.Paragraph>
                          Price : ${product.price + " "}
                          <Typography.Text delete type="danger">
                            $
                            {parseFloat(
                              product.price +
                              (
                                product.price * product.discountPencentage
                              ).toFixed(2)
                            )}
                          </Typography.Text>
                        </Typography.Paragraph>
                      }
                      description={
                        <Typography.Paragraph
                          ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                        >
                          {product.description}
                        </Typography.Paragraph>
                      }
                    ></Card.Meta>
                  </Card>
                </Badge.Ribbon>
              );
            }}
          ></List>
        </div>
      }
    </>
  );
}



function AddToCartButton({ item }) {
  const dispatch = useDispatch()


  const handleAddToCartToSubmit = (formValue) => {
    console.log('formValue', formValue);
    const action = addToCart();
    console.log(action);
    dispatch(action);
  }
  const [loading, setLoading] = useState(false);
  const addProductToCart = () => {
    setLoading(true);
    fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        products: [
          {
            id: item.id,
            quantity: 1,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then(console.log)
      .then((res) => {
        message.success(`${item.title} has been added to cart`);
        setLoading(false);
      });
  };

  return (
    <Button
      type="link"
      onClick={() => {
        // addProductToCart();
        handleAddToCartToSubmit()


      }}
      loading={loading}
    >
      Add To Card
    </Button>
  );
}

export default Product;
