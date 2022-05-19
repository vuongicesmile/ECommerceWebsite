import react from "react";

import React, { useState,useEffect } from "react";
import { Modal, Button, Row, Col, Input, Select, Tabs } from "antd";
import { Typography } from "antd";
import { Divider } from "antd";
import "./Currency.scss";

import { Switch } from "antd";

import cambodia from "../../images/prefix.svg";
import cny from "../../images/address.svg";
import rub from "../../images/phone1.svg";
import email from "../../images/email.svg";
import dola from "../../images/dola.svg";
import thaiBaht from "../../images/dola.svg";
import vnd from "../../images/vnd.svg";
import up from "../../images/up.svg";
import check from "../../images/check.svg";


const { Text } = Typography;

function AddCompany() {
  const key = "upstopable";
  const [popupVisible, setpopupVisible] = useState(false);
  const [checkSelectedVisible, setcheckSelectedVisible] = useState(false);

  const [listFlag, setListFlag] = useState([
    {
      id: 'vn-flag',
      flag: vnd,
      name: 'Vietnamese Dong',
      label: 'VND - ₫',
      className: 'currency-content p-2',
    },
    {
      id: 'cny-flag',
      flag: cny,
      name: 'Chinese Yuan',
      label: 'CNY - ¥',
      className: 'currency-content p-2',
    },
    {
      id: 'rub-flag',
      flag: rub,
      name: 'Russian Ruble',
      label: 'RUB - ₽',
      className: 'currency-content p-2',
    },
    {
      id: 'dola-flag',
      flag: dola,
      name: 'United States Dollar',
      label: 'USD - $',
      className: 'currency-content p-2',
    },
    {
      id: 'thaiBaht-flag',
      flag: thaiBaht,
      name: 'Thai Baht',
      label: 'THB - ฿',
      className: 'currency-content p-2',
    },
    {
      id: 'cambodia-flag',
      flag: cambodia,
      name: 'Cambodian Riel',
      label: 'Riel - ៛',
      className: 'currency-content p-2',
    },
  ]);

  const handleActive = (flag) => {
    let activeItem = { id: '', flag: null, name: '', label: '', className: '' };
    activeItem = { ...flag, className: 'currency-content p-2 selected' };

    let newArray = [];
    listFlag.map((item) => {
      if (item.id == activeItem.id) {
        item.className = 'currency-content p-2 selected';
        newArray.push(item);
      } else {
        item.className = 'currency-content p-2';
        newArray.push(item);
      }
    });
    setListFlag(newArray);
  };

  useEffect(() => {
    //console.log(listFlag);
  }, [listFlag]);

  const showModal = () => {
    setpopupVisible(true);
  };

  const handleOk = () => {
    setpopupVisible(false);
  };

  const handleCancel = () => {
    setpopupVisible(false);
  };



  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Add Company"
        visible={popupVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ paddingTop: "0px" }}
        closable={true}
        closeIcon={<image src={email} alt="" />}
        width={648}
        footer={[
          <Col className="container" key={key}>
            <Row gutter={10}>
              <Col offset={12} span={6}>
                <Button
                  key="Cancel"
                  block={true}
                  type="ghost"
                  size="large"
                  shape="round"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Col>
              <Col span={6}>
                <Button
                  key="Add"
                  block={true}
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={handleOk}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Col>,
        ]}
      >
        <div className="container">
          <Col span={24}>
            <p className="m-0 title-label">Popular currencies</p>
          </Col>
        </div>
        <Row gutter={[2, 2]}>
          
          {listFlag.map((item, index) => {
            console.log(item.className);
            console.log("re render");
            return (
              <Col
                xl={12}
                xxl={12}
                lg={12}
                md={12}
                sm={24}
                xs={24}
                className="d-flex justify-content-between cursor-pointer"
                key={item.id}
              >
                <div
                  className={item.className}
                  onClick={() => handleActive(item)}
                >
                  <Row gutter={10}>
                    <Col className="d-flex align-items-center">
                      <img id={item.id} src={item.flag} alt=""></img>
                    </Col>
                    <Col className="d-flex flex-column justify-content-around">
                      <span>{item.name}</span>
                      <span className="currency-label">{item.label}</span>
                    </Col>
                    {item.className == 'currency-content p-2 selected' && (
                      <div className="currency-check">
                        <img src={check}></img>
                      </div>
                    )}
                  </Row>
                </div>
              </Col>
            );
          })}
        </Row>
      </Modal>
    </>
  );
}

export default AddCompany;
