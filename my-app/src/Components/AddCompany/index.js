import react from "react";

import React, { useState } from "react";
import { Modal, Button, Row, Col, Input, Select, Tabs } from "antd";
import { Typography } from "antd";
import { Divider } from "antd";
import "./Currency.scss";

import { Switch } from "antd";

import prefix from "../../images/prefix.svg";
import address from "../../images/address.svg";
import phone1 from "../../images/phone1.svg";
import email from "../../images/email.svg";
import dola from "../../images/dola.svg";
import vnd from "../../images/vnd.svg";
import up from "../../images/up.svg";
import check from "../../images/check.svg";
import CloseIcon from "../../images/close.js";

const { Text } = Typography;

function AddCompany() {
  const key = "Unstopable";
  const [popupVisible, setpopupVisible] = useState(false);

  const showModal = () => {
    setpopupVisible(true);
  };

  const handleOk = () => {
    setpopupVisible(false);
  };

  const handleCancel = () => {
    setpopupVisible(false);
  };

  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

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
        <Row gutter={[8, 8]}>
          <Col
            xl={12}
            xxl={12}
            lg={12}
            md={12}
            sm={24}
            xs={24}
            className="d-flex justify-content-start p-3 cursor-pointer currency-content"
          >
            <Row gutter={10}>
              <Col className="d-flex align-items-center">
                <img src={dola}></img>
              </Col>
              <Col className="d-flex flex-column justify-content-around">
                <span>United States Dollar</span>
                <span className="currency-label">USD - $</span>
              </Col>
            </Row>
          </Col>
          <Col
            xl={12}
            xxl={12}
            lg={12}
            md={12}
            sm={24}
            xs={24}
            className="d-flex justify-content-between p-3 cursor-pointer currency-content selected"
          >
            <Row gutter={10}>
              <Col className="d-flex align-items-center">
                <img src={vnd}></img>
              </Col>
              <Col className="d-flex flex-column justify-content-around">
                <span>United States Dollar</span>
                <span className="currency-label">USD - $</span>
              </Col>
            </Row>
            <Col>
              <img src={check}></img>
            </Col>
          </Col>
          <Col
            xl={12}
            xxl={12}
            lg={12}
            md={12}
            sm={24}
            xs={24}
            className="d-flex justify-content-start p-3 cursor-pointer currency-content"
          >
            <Row gutter={10}>
              <Col className="d-flex align-items-center">
                <img src={dola}></img>
              </Col>
              <Col className="d-flex flex-column justify-content-around">
                <span>United States Dollar</span>
                <span className="currency-label">USD - $</span>
              </Col>
            </Row>
          </Col>
          <Col
            xl={12}
            xxl={12}
            lg={12}
            md={12}
            sm={24}
            xs={24}
            className="d-flex justify-content-start p-3 cursor-pointer currency-content"
          >
            <Row gutter={10}>
              <Col className="d-flex align-items-center">
                <img src={dola}></img>
              </Col>
              <Col className="d-flex flex-column justify-content-around">
                <span>United States Dollar</span>
                <span className="currency-label">USD - $</span>
              </Col>
            </Row>
          </Col>
          <Col
            xl={12}
            xxl={12}
            lg={12}
            md={12}
            sm={24}
            xs={24}
            className="d-flex justify-content-start p-3 cursor-pointer currency-content"
          >
            <Row gutter={10}>
              <Col className="d-flex align-items-center">
                <img src={dola}></img>
              </Col>
              <Col className="d-flex flex-column justify-content-around">
                <span>United States Dollar</span>
                <span className="currency-label">USD - $</span>
              </Col>
            </Row>
          </Col>
          <Col
            xl={12}
            xxl={12}
            lg={12}
            md={12}
            sm={24}
            xs={24}
            className="d-flex justify-content-start p-3 cursor-pointer currency-content"
          >
            <Row gutter={10}>
              <Col className="d-flex align-items-center">
                <img src={dola}></img>
              </Col>
              <Col className="d-flex flex-column justify-content-around">
                <span>United States Dollar</span>
                <span className="currency-label">USD - $</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default AddCompany;
